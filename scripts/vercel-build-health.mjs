#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = new Set(process.argv.slice(2));
const modeArg = [...args].find((a) => a.startsWith("--mode="));
const mode = modeArg?.split("=")[1] ?? "local"; // local | ci | vercel

const root = process.cwd();
const ok = (msg) => console.log(`✅ ${msg}`);
const warn = (msg) => console.warn(`⚠️  ${msg}`);
const fail = (msg) => {
  console.error(`❌ ${msg}`);
  process.exitCode = 1;
};

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
}

function majorNode() {
  return Number(process.versions.node.split(".")[0]);
}

function checkNode() {
  const major = majorNode();
  if (major !== 20) {
    fail(`Node.js must be 20.x. Detected ${process.versions.node}.`);
  } else {
    ok(`Node.js version OK (${process.versions.node}).`);
  }
}

function checkViteArtifacts() {
  const forbidden = [
    "vite.config.ts",
    "vite.config.js",
    "index.html",
    "tsconfig.app.json",
  ];
  const found = forbidden.filter(exists);
  if (found.length) {
    fail(`Vite artifacts found: ${found.join(", ")}. Remove them (Phase 1 invariant).`);
  } else {
    ok("No Vite artifacts found.");
  }
}

function checkPackageJson() {
  if (!exists("package.json")) return fail("package.json missing.");
  const pkg = readJson("package.json");
  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };

  const forbiddenDeps = ["vite", "vite-plugin-pwa", "vite-plugin-sitemap", "@vitejs/plugin-react", "react-router-dom"];
  const present = forbiddenDeps.filter((d) => deps[d]);

  if (present.length) {
    fail(`Forbidden deps present: ${present.join(", ")}. Remove (Phase 1 invariant).`);
  } else {
    ok("package.json dependency set OK (no Vite / react-router-dom).");
  }

  // Build command sanity
  const build = pkg.scripts?.build;
  if (!build) fail(`package.json scripts.build missing.`);
  else ok(`scripts.build present: "${build}"`);
}

function checkManifest() {
  const candidates = ["app/manifest.ts", "src/app/manifest.ts"];
  const manifestPath = candidates.find(exists);
  if (!manifestPath) {
    fail(`Missing manifest.ts. Expected one of: ${candidates.join(" or ")}.`);
    return;
  }
  ok(`Found ${manifestPath}.`);

  // Icons should exist (repo-specific)
  const iconA = "public/icons/icon-192.png";
  const iconB = "public/icons/icon-512.png";
  if (!exists(iconA) || !exists(iconB)) {
    warn(`Expected PWA icons missing: ${!exists(iconA) ? iconA : ""} ${!exists(iconB) ? iconB : ""}`.trim());
  } else {
    ok("PWA icons present.");
  }
}

function checkEnvVars() {
  // For CI we don't require DB env vars, but for Vercel we usually do.
  const requiredForVercel = ["DATABASE_URL", "DIRECT_DATABASE_URL"];
  const missing = requiredForVercel.filter((k) => !process.env[k]);

  if (mode === "vercel") {
    if (missing.length) {
      fail(
        `Missing required env vars for Vercel build: ${missing.join(", ")}. ` +
          `Set DATABASE_URL (pooled) + DIRECT_DATABASE_URL (direct for migrations).`
      );
    } else {
      ok("Required DB env vars present (DATABASE_URL + DIRECT_DATABASE_URL).");
    }
  } else {
    if (missing.length) {
      warn(`DB env vars not set (${missing.join(", ")}). This is OK for ${mode} if running in safe-mode / no DB build.`);
    } else {
      ok("DB env vars present.");
    }
  }

  // External APIs: should be server-only
  const apiVars = ["COURTLISTENER_API_KEY", "REGULATIONS_GOV_API_KEY"];
  const missingApi = apiVars.filter((k) => !process.env[k]);
  if (missingApi.length) warn(`Optional API env vars missing: ${missingApi.join(", ")} (required only when enabling widgets).`);
  else ok("API env vars present (CourtListener / Regulations).");

  // Safe-mode flag detection
  if (process.env.FRESH_DB_SAFE_MODE === "1") {
    warn("FRESH_DB_SAFE_MODE=1 enabled: build should avoid DB-backed SSG.");
  }
}

async function checkDbSchema() {
  // Only run when:
  // - mode is "vercel" OR CHECK_DB_SCHEMA=1
  // - AND DIRECT_DATABASE_URL is present
  // Note: FRESH_DB_SAFE_MODE=1 still runs the check but only warns (doesn't fail)
  const shouldCheck =
    (mode === "vercel" || process.env.CHECK_DB_SCHEMA === "1") &&
    process.env.DIRECT_DATABASE_URL;

  if (!shouldCheck) {
    if (!process.env.DIRECT_DATABASE_URL) {
      ok("DB schema check skipped (DIRECT_DATABASE_URL not set).");
    } else {
      ok("DB schema check skipped (not in vercel mode and CHECK_DB_SCHEMA not set).");
    }
    return;
  }

  const dbUrl = process.env.DIRECT_DATABASE_URL;
  const isSafeMode = process.env.FRESH_DB_SAFE_MODE === "1";

  // Try to import pg
  let pg;
  try {
    pg = await import("pg");
  } catch (err) {
    fail(`pg package not found. Install with: npm install pg`);
    return;
  }

  const { Client } = pg.default || pg;
  const client = new Client({
    connectionString: dbUrl,
    connectionTimeoutMillis: 5000, // 5 second timeout
    statement_timeout: 5000, // 5 second query timeout
  });

  try {
    await client.connect();
    ok("DB connection established (DIRECT_DATABASE_URL).");

    // Check for required tables
    const requiredTables = ["attorneys", "practice_areas", "payload_migrations"];
    const tableCheckQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = ANY($1::text[])
    `;

    const result = await client.query(tableCheckQuery, [requiredTables]);
    const foundTables = result.rows.map((row) => row.table_name);
    const missingTables = requiredTables.filter((t) => !foundTables.includes(t));

    if (missingTables.length) {
      const msg = `DB schema missing (tables not found): ${missingTables.join(", ")}. Run \`payload migrate\` against DIRECT_DATABASE_URL.`;
      if (isSafeMode) {
        warn(msg);
      } else {
        fail(msg);
      }
    } else {
      ok(`DB schema OK (all required tables present: ${requiredTables.join(", ")}).`);
    }
  } catch (err) {
    const msg = `DB connection/query failed: ${err.message}. DB reachability is required to build when SSG depends on DB.`;
    if (isSafeMode) {
      warn(msg);
    } else {
      fail(msg);
    }
  } finally {
    try {
      await client.end();
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

async function main() {
  console.log(`\n=== Vercel Build Health Check (mode: ${mode}) ===\n`);
  checkNode();
  checkViteArtifacts();
  checkPackageJson();
  checkManifest();
  checkEnvVars();
  await checkDbSchema();

  if (process.exitCode === 1) {
    console.error("\nBuild Health: FAILED (fix issues above).\n");
    process.exit(1);
  } else {
    console.log("\nBuild Health: PASS\n");
  }
}

main().catch((err) => {
  console.error("Fatal error in health check:", err);
  process.exit(1);
});
