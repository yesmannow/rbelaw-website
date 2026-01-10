# 📰 Blog Scraper Guide

## 🎯 What It Does

The blog scraper will:

1. ✅ Find all blog post URLs from `/blog/` page
2. ✅ Paginate through all blog pages
3. ✅ Scrape each blog post with:
   - Title
   - Date
   - Author
   - Categories
   - Tags
   - Featured image
   - Excerpt
   - Full content
4. ✅ Save to `scraped-content/blog-posts.json`

---

## 🚀 How to Use

```bash
npm run scrape-blog
```

---

## 📊 Expected Output

```bash
📰 Starting Blog Scraper...

════════════════════════════════════════════════════════════

🔍 Finding blog post URLs...

  Checking page 1: https://rbelaw.com/blog/
  ✓ Found 10 posts on page 1
  Checking page 2: https://rbelaw.com/blog/page/2/
  ✓ Found 10 posts on page 2
  Checking page 3: https://rbelaw.com/blog/page/3/
  ✓ Found 8 posts on page 3
  Checking page 4: https://rbelaw.com/blog/page/4/
  ⚠️  Page 4 not found, stopping

  📊 Total unique blog posts found: 28

════════════════════════════════════════════════════════════

📄 Scraping blog posts...

  Scraping: Understanding Construction Liens in Indiana
  Scraping: New Employment Law Changes for 2024
  Scraping: Estate Planning Essentials
  ...

  Progress: 10/28 posts scraped

  Scraping: Business Formation Guide
  ...

  Progress: 20/28 posts scraped

  Scraping: Recent Court Decisions
  ...

════════════════════════════════════════════════════════════

✅ Blog scraping complete!
📁 Results saved to: scraped-content/blog-posts.json

📊 Statistics:
  - Total blog posts scraped: 28
  - With images: 25
  - With authors: 28
  - With categories: 28
  - With tags: 20

📂 Categories found: Construction Law, Employment Law, Estate Planning, Business Law, Real Estate

📅 Date range: 2022-01-15 to 2024-12-20

📝 Next steps:
  1. Review blog-posts.json
  2. Convert to TypeScript format
  3. Download blog images
  4. Add to your blog section
```

---

## 📁 Output Format

**File:** `scraped-content/blog-posts.json`

```json
[
  {
    "title": "Understanding Construction Liens in Indiana",
    "date": "2024-12-15",
    "author": "Katie R. Osborne",
    "categories": ["Construction Law", "Business Law"],
    "tags": ["liens", "construction", "indiana"],
    "image": "https://rbelaw.com/wp-content/uploads/.../construction-lien.jpg",
    "excerpt": "Construction liens are a powerful tool for contractors...",
    "content": [
      {
        "type": "paragraph",
        "text": "Full paragraph content..."
      },
      {
        "type": "heading",
        "level": "H2",
        "text": "What is a Construction Lien?"
      },
      {
        "type": "paragraph",
        "text": "A construction lien is..."
      },
      {
        "type": "list",
        "items": [
          "First item",
          "Second item"
        ]
      },
      {
        "type": "quote",
        "text": "Important quote..."
      }
    ],
    "url": "https://rbelaw.com/blog/understanding-construction-liens-indiana/",
    "slug": "understanding-construction-liens-indiana"
  }
]
```

---

## 🎯 What Gets Scraped

### **Metadata:**
- ✅ Title
- ✅ Publication date
- ✅ Author name
- ✅ Categories
- ✅ Tags
- ✅ Featured image URL
- ✅ Excerpt/summary
- ✅ Post URL and slug

### **Content:**
- ✅ Paragraphs
- ✅ Headings (H2, H3, H4)
- ✅ Lists (ordered and unordered)
- ✅ Blockquotes
- ✅ Preserves content structure

---

## 📝 Next Steps After Scraping

### **1. Review the data:**

```bash
# View first blog post (PowerShell)
Get-Content scraped-content/blog-posts.json | ConvertFrom-Json | Select-Object -First 1

# Or open in VS Code
code scraped-content/blog-posts.json
```

### **2. Convert to TypeScript:**

Create a converter or manually format the data for your blog component.

### **3. Download blog images:**

```bash
# Use the image downloader to get blog images
npm run download-site-images
```

### **4. Add to your site:**

Integrate the blog posts into your blog section/component.

---

## 🔍 Troubleshooting

### **No blog posts found:**

The site might not have a `/blog/` page. Check these URLs:
- `https://rbelaw.com/blog/`
- `https://rbelaw.com/news/`
- `https://rbelaw.com/insights/`
- `https://rbelaw.com/articles/`

Update the `BASE_URL` in the script if needed.

### **Different blog structure:**

If the blog uses a different structure, you may need to adjust the selectors in the script.

---

## 🎨 Integration Example

After scraping, you can create a blog component:

```typescript
// src/pages/Blog.tsx
import { blogPosts } from '@/lib/data/blog-posts';

export function Blog() {
  return (
    <div className="blog-grid">
      {blogPosts.map(post => (
        <BlogCard
          key={post.slug}
          title={post.title}
          date={post.date}
          author={post.author}
          excerpt={post.excerpt}
          image={post.image}
          slug={post.slug}
        />
      ))}
    </div>
  );
}
```

---

## 📊 Statistics You'll Get

- **Total posts:** Number of blog posts scraped
- **Date range:** Oldest to newest post
- **Categories:** All unique categories found
- **Tags:** All unique tags found
- **Authors:** All unique authors
- **Images:** How many posts have featured images

---

## 🚀 Quick Commands

```bash
# Scrape blog posts
npm run scrape-blog

# View results
code scraped-content/blog-posts.json

# Download blog images
npm run download-site-images
```

---

## ✅ Success Checklist

After running `npm run scrape-blog`:

- [ ] Check `scraped-content/blog-posts.json` exists
- [ ] Verify blog posts have titles and content
- [ ] Check that dates are formatted correctly
- [ ] Review categories and tags
- [ ] Note which posts have images
- [ ] Plan how to integrate into your site

---

**Ready to scrape the blog?**

```bash
npm run scrape-blog
```

This will scrape all blog posts from the RBE website! 📰
