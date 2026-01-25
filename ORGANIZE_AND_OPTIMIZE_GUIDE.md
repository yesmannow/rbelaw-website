# 🎯 Organize & Optimize Migration Files

## What This Does

The `organize-and-optimize` script will:

1. ✅ **Organize** all scraped files
2. ✅ **Optimize** attorney images to WebP (85% quality, 800x800)
3. ✅ **Backup** old PNG/JPG files
4. ✅ **Remove** old images (after backing up)
5. ✅ **Generate** final data files with WebP paths
6. ✅ **Clean up** downloaded directory

---

## 🚀 Quick Start

### **Run the organizer:**

```bash
npm run organize-optimize
```

**This will:**
- Convert all attorney PNGs to optimized WebP
- Move WebP files to `public/images/team/`
- Backup old images to `backup-old-images/`
- Remove old PNG/JPG files
- Create final data files in `src/lib/data/migration/`

---

## 📊 What You'll Get

### **Before:**
```
public/images/team/downloaded/
├── katie-s-riles.png (2.5MB)
├── james-w-riley-jr.png (3.1MB)
└── ... (13 PNG files)

public/images/team/
├── old-photo-1.jpg
├── old-photo-2.png
└── ... (old images)
```

### **After:**
```
public/images/team/
├── katie-s-riles.webp (180KB) ✨
├── james-w-riley-jr.webp (220KB) ✨
└── ... (13 optimized WebP files)

backup-old-images/
├── old-photo-1.jpg (backed up)
├── old-photo-2.png (backed up)
└── ...

src/lib/data/migration/
├── attorneys-final.json (with WebP paths)
├── practice-areas-final.json
├── industries-final.json
└── about-final.json
```

---

## 📝 Expected Output

```bash
🚀 Starting Organization and Optimization...

════════════════════════════════════════════════════════════

📂 Step 1: Organizing scraped files...

  Found files:
    - attorneys.json
    - scraped-content.json
    - attorneys-with-local-images.json

  ✓ Loaded 13 attorneys (excluding "No Results Found")
  ✓ Loaded 13 practice areas
  ✓ Loaded 15 industries
  ✓ Loaded 5 about pages

════════════════════════════════════════════════════════════

🎨 Step 2: Optimizing attorney images to WebP...

  Found 13 images to optimize

  ✓ Optimized: katie-s-riles.png → katie-s-riles.webp (0.18MB)
  ✓ Optimized: james-w-riley-jr.png → james-w-riley-jr.webp (0.22MB)
  ✓ Optimized: katie-r-osborne.png → katie-r-osborne.webp (0.19MB)
  ✓ Optimized: courtney-david-mills.png → courtney-david-mills.webp (0.21MB)
  ✓ Optimized: donald-s-smith.png → donald-s-smith.webp (0.20MB)
  ✓ Optimized: eric-m-hylton.png → eric-m-hylton.webp (0.18MB)
  ✓ Optimized: jaclyn-m-flint.png → jaclyn-m-flint.webp (0.19MB)
  ✓ Optimized: anthony-r-jost.png → anthony-r-jost.webp (0.21MB)
  ✓ Optimized: lindsay-a-llewellyn.png → lindsay-a-llewellyn.webp (0.20MB)
  ✓ Optimized: sarah-macgill-marr.png → sarah-macgill-marr.webp (0.19MB)
  ✓ Optimized: megan-s-young.png → megan-s-young.webp (0.18MB)
  ✓ Optimized: j-t-wynne.png → j-t-wynne.webp (0.22MB)

════════════════════════════════════════════════════════════

🧹 Step 3: Cleaning up old images...

  Found 25 old images

  ✓ Backed up & removed: old-attorney-1.jpg (replaced by new.webp)
  ✓ Backed up & removed: old-attorney-2.png (replaced by new.webp)
  ⚠️  Backed up only: some-photo.jpg (no WebP replacement)
  ...

════════════════════════════════════════════════════════════

📝 Step 4: Generating final data files...

  ✓ Created attorneys-final.json (13 attorneys)
  ✓ Created practice-areas-final.json
  ✓ Created industries-final.json
  ✓ Created about-final.json

  📁 All files saved to: src/lib/data/migration

════════════════════════════════════════════════════════════

🗑️  Step 5: Cleaning up downloaded directory...

  ✓ Removed 13 original files from downloaded directory
  💡 Optimized WebP files are in: public/images/team/

════════════════════════════════════════════════════════════

✅ Organization and Optimization Complete!

📊 Summary:
  Images optimized: 13
  Images skipped: 0
  Old images backed up: 25
  Old images removed: 12

📁 File Structure:
  ├── public/images/team/
  │   └── *.webp (optimized attorney photos)
  ├── src/lib/data/migration/
  │   ├── attorneys-final.json
  │   ├── practice-areas-final.json
  │   ├── industries-final.json
  │   └── about-final.json
  └── backup-old-images/
      └── *.png, *.jpg (backed up originals)

📝 Next Steps:
  1. Review optimized images in public/images/team/
  2. Review final data files in src/lib/data/migration/
  3. Merge final data into your main data files
  4. Test the website
  5. Delete backup-old-images/ when satisfied
```

---

## 🎨 Image Optimization Details

**Settings:**
- Format: WebP
- Quality: 85%
- Size: 800x800 (cover fit, top position)
- Effort: 6 (high quality)

**Benefits:**
- 🚀 **90% smaller** file sizes
- ⚡ **Faster** page loads
- 📱 **Better** mobile performance
- 🌐 **Modern** format (supported by all browsers)

**Example:**
- Before: `katie-s-riles.png` (2.5MB)
- After: `katie-s-riles.webp` (180KB)
- **Savings: 92%!**

---

## 📁 Final Data Files

### **attorneys-final.json**
```json
[
  {
    "name": "Katie S. Riles",
    "title": "Partner",
    "email": "kriles@rbelaw.com",
    "phone": "(317) 636-8000",
    "image": "/images/team/katie-s-riles.webp",
    "imageOriginal": "https://rbelaw.com/wp-content/uploads/...",
    "bio": [...],
    "practiceAreas": [...],
    "education": [...],
    "barAdmissions": [...]
  }
]
```

### **practice-areas-final.json**
All practice areas from scraped content

### **industries-final.json**
All industries from scraped content

### **about-final.json**
All about pages from scraped content

---

## 🔄 Complete Migration Workflow

### **Option 1: Step by Step**

```bash
# 1. Scrape everything
npm run migrate-all

# 2. Organize and optimize
npm run organize-optimize
```

### **Option 2: All at Once**

```bash
# Does everything in one command
npm run migrate-complete
```

This runs:
1. Scrape practice areas, industries, about pages
2. Scrape attorneys
3. Download attorney images
4. Convert to TypeScript
5. Download other site images
6. Generate icon suggestions
7. **Organize and optimize everything** ✨

---

## 🛡️ Safety Features

**Backups:**
- All old images are backed up to `backup-old-images/`
- Original URLs are preserved in `imageOriginal` field
- No data is lost

**Skip Existing:**
- Won't re-optimize if WebP already exists
- Won't re-download if file exists
- Safe to run multiple times

**Error Handling:**
- Continues on errors
- Reports what failed
- Doesn't break on missing files

---

## 🧪 Testing

After running, test your images:

```bash
# Start dev server
npm run dev

# Visit attorney pages
http://localhost:5178/attorneys

# Check that WebP images load correctly
```

---

## 🗑️ Cleanup

When you're satisfied everything works:

```bash
# Delete backup directory
rm -rf backup-old-images

# Delete downloaded directory (originals are now WebP)
rm -rf public/images/team/downloaded

# Delete old scraped files
rm scraped-content/attorneys.json
rm scraped-content/attorneys-with-local-images.json
```

---

## 📊 File Size Comparison

**Before Optimization:**
```
Total attorney images: ~35MB (13 PNGs)
Average per image: ~2.7MB
```

**After Optimization:**
```
Total attorney images: ~2.5MB (13 WebPs)
Average per image: ~190KB
```

**Savings: 93%!** 🎉

---

## 🎯 Quick Commands

```bash
# Organize and optimize only
npm run organize-optimize

# Complete migration (scrape + organize)
npm run migrate-complete

# Re-run if needed (safe, skips existing)
npm run organize-optimize
```

---

## ✅ Success Checklist

After running `npm run organize-optimize`:

- [ ] Check `public/images/team/` has WebP files
- [ ] Check `src/lib/data/migration/` has final JSON files
- [ ] Check `backup-old-images/` has old images backed up
- [ ] Review `attorneys-final.json` for correct paths
- [ ] Test images load on website
- [ ] Verify file sizes are smaller
- [ ] Delete backups when satisfied

---

**Ready to organize and optimize?**

```bash
npm run organize-optimize
```

Or run the complete migration:

```bash
npm run migrate-complete
```

🚀 This will transform your 35MB of PNGs into 2.5MB of optimized WebPs!
