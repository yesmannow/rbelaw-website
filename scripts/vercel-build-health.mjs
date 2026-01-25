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
  // External APIs: should be server-only
  const apiVars = ["COURTLISTENER_API_KEY", "REGULATIONS_GOV_API_KEY"];
  const missingApi = apiVars.filter((k) => !process.env[k]);
  if (missingApi.length) warn(`Optional API env vars missing: ${missingApi.join(", ")} (required only when enabling widgets).`);
  else ok("API env vars present (CourtListener / Regulations).");
}


async function main() {
  console.log(`\n=== Vercel Build Health Check (mode: ${mode}) ===\n`);
  checkViteArtifacts();
  checkPackageJson();
  checkManifest();
  checkEnvVars();

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
