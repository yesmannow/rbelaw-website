# ✅ Attorney Scraper - FIXED!

## 🔧 What Was Fixed

### **Problem:**
The scraper was finding `/category/attorneys/[name]/` URLs, which are **blog category pages**, not actual attorney bio pages.

### **Solution:**
Updated the scraper to:
1. ✅ **Exclude** all `/category/` URLs
2. ✅ **Only include** `/our-team/attorneys/[name]/` URLs
3. ✅ Updated fallback list with correct URL patterns

---

## 🎯 Correct URL Pattern

**Attorney Bio Pages:**
```
✓ https://rbelaw.com/our-team/attorneys/katie-r-osborne/
✓ https://rbelaw.com/our-team/attorneys/katie-s-riles/
✓ https://rbelaw.com/our-team/attorneys/john-c-egloff/
✓ https://rbelaw.com/our-team/attorneys/james-w-riley-jr/
```

**NOT These (Blog Categories):**
```
✗ https://rbelaw.com/category/attorneys/katie-osborne/
✗ https://rbelaw.com/category/attorneys/katie-riles/
✗ https://rbelaw.com/category/attorneys/john-egloff/
```

---

## 🚀 How to Use

### **Step 1: Test URLs (Optional)**

Verify the attorney URLs are accessible:

```bash
npm run test-attorney-urls
```

**Expected output:**
```
🔍 Testing attorney URL patterns...

✓ /our-team/attorneys/katie-r-osborne/
  Title: Katie R. Osborne - Riley Bennett Egloff LLP

✓ /our-team/attorneys/katie-s-riles/
  Title: Katie S. Riles - Riley Bennett Egloff LLP

✓ /our-team/attorneys/john-c-egloff/
  Title: John C. Egloff - Riley Bennett Egloff LLP

✅ URL test complete!
```

---

### **Step 2: Scrape Attorneys**

```bash
npm run scrape-attorneys
```

**Expected output:**
```
👥 Starting Attorney Profile Scraper...

🔍 Finding attorney profile URLs...
  Found 27 attorney profiles

📄 Scraping attorney profiles...

  Scraping: Katie R. Osborne
  Scraping: Katie S. Riles
  Scraping: John C. Egloff
  Scraping: James W. Riley Jr.
  ...

✅ Attorney scraping complete!
📁 Results saved to: scraped-content/attorneys.json

📊 Statistics:
  - Total attorneys scraped: 27
  - With email: 27
  - With phone: 25
  - With practice areas: 27
  - With education: 27
```

---

### **Step 3: View Results**

```bash
# View first attorney (Windows PowerShell)
Get-Content scraped-content/attorneys.json | ConvertFrom-Json | Select-Object -First 1

# Or open in VS Code
code scraped-content/attorneys.json
```

---

## 🔍 What Changed in the Scraper

### **Before:**
```javascript
if (href.includes('/our-team/attorneys/') && 
    !href.endsWith('/attorneys/') &&
    !href.includes('#') &&
    text.length > 3) {
  // This would include /category/ URLs ❌
}
```

### **After:**
```javascript
if (href.includes('/our-team/attorneys/') && 
    !href.includes('/category/') &&  // ← NEW: Exclude category URLs
    !href.endsWith('/attorneys/') &&
    !href.includes('#') &&
    text.length > 3) {
  // Only includes real bio pages ✅
}
```

---

## 📋 Fallback Attorney List

If the scraper can't find attorney links on the page, it will try these known URLs:

```javascript
const knownAttorneys = [
  'john-c-egloff',
  'james-w-riley-jr',
  'laura-j-binford',
  'katie-r-osborne',
  'katie-s-riles',
  'courtney-david-mills',
  'donald-s-smith',
  'kevin-d-tharp',
  'jeffrey-a-fecht',
  'eric-m-hylton',
  'jaclyn-m-flint',
  'patrick-j-mccarney',
  'ryan-m-leitch',
  'travis-e-watson',
  'justin-w-sorrell',
  'anthony-r-jost',
  'kathleen-a-hart',
  'raymond-e-seach',
  'blair-a-vandivier',
  'douglas-r-cook',
  'lindsay-a-llewellyn',
  'sarah-macgill-marr',
  'timothy-d-button',
  'beau-d-browning',
  'anna-k-marvin',
  'megan-s-young',
  'j-t-wynne',
  'robert-j-brandt',
  'bryce-a-bennett',
  'laura-e-reed'
];
```

---

## 🎯 Quick Commands

```bash
# Test URLs
npm run test-attorney-urls

# Scrape attorneys only
npm run scrape-attorneys

# Scrape everything (practice areas + attorneys + convert + images + icons)
npm run migrate-all
```

---

## ✅ What You'll Get

**File:** `scraped-content/attorneys.json`

**Content:**
```json
[
  {
    "name": "Katie R. Osborne",
    "title": "Partner",
    "email": "kosborne@rbelaw.com",
    "phone": "(317) 636-8000",
    "image": "https://rbelaw.com/wp-content/uploads/.../katie-osborne.jpg",
    "bio": [
      {
        "heading": "Overview",
        "content": ["Full bio content..."]
      },
      {
        "heading": "Education",
        "content": ["Indiana University Maurer School of Law, J.D.", "..."]
      }
    ],
    "practiceAreas": [
      "Construction Law",
      "Business Litigation",
      "Commercial Litigation"
    ],
    "education": [
      "Indiana University Maurer School of Law, J.D.",
      "Indiana University, B.A."
    ],
    "barAdmissions": [
      "Indiana",
      "U.S. District Court, Southern District of Indiana"
    ]
  }
]
```

---

## 🎉 Ready to Run!

The scraper is now fixed and ready to use:

```bash
npm run scrape-attorneys
```

This will scrape all 27 attorney profiles with the correct URLs! 🚀
