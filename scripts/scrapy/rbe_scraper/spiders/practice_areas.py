import scrapy
from urllib.parse import urlparse


class PracticeAreasSpider(scrapy.Spider):
  name = "practice_areas"
  allowed_domains = ["rbelaw.com", "www.rbelaw.com"]
  start_urls = [
    "https://rbelaw.com/practice-areas/",
  ]

  custom_settings = {
    # Keep crawl constrained
    "DEPTH_LIMIT": 2,
  }

  def parse(self, response: scrapy.http.Response):
    # Collect practice area links from the index page
    seen = set()
    for href in response.css('a::attr(href)').getall():
      if not href:
        continue
      url = response.urljoin(href)
      parsed = urlparse(url)
      if parsed.netloc not in ("rbelaw.com", "www.rbelaw.com"):
        continue
      path = parsed.path.rstrip('/')
      if not path.startswith('/practice-areas'):
        continue
      if path == "/practice-areas":
        continue
      if url in seen:
        continue
      seen.add(url)
      yield scrapy.Request(url, callback=self.parse_detail)

  def parse_detail(self, response: scrapy.http.Response):
    slug = response.url.rstrip('/').split('/')[-1]
    title = (response.css('h1::text').get() or '').strip() or slug.replace('-', ' ').title()

    # Description: first non-empty paragraph near the top of the main content
    paragraphs = [p.strip() for p in response.css('p::text').getall() if p and p.strip()]
    description = paragraphs[0] if paragraphs else ''

    content = []

    # Find structured sections by headings and following siblings
    headings = response.xpath('//h2 | //h3 | //h4')

    for h in headings:
      level = (h.xpath('name()').get() or 'h2').lower()
      heading_text = ' '.join([t.strip() for t in h.xpath('.//text()').getall() if t.strip()])
      block = {
        'heading': heading_text,
        'level': 'h' + level[-1],
        'content': []
      }

      # iterate following siblings until next heading
      for sib in h.xpath('following-sibling::*'):
        tag = (sib.xpath('name()').get() or '').lower()
        if tag in ('h2', 'h3', 'h4'):
          break
        if tag == 'p':
          text = ' '.join([t.strip() for t in sib.xpath('.//text()').getall() if t.strip()])
          if text:
            block['content'].append(text)
        elif tag in ('ul', 'ol'):
          items = []
          for li in sib.xpath('.//li'):
            li_text = ' '.join([t.strip() for t in li.xpath('.//text()').getall() if t.strip()])
            if li_text:
              items.append(li_text)
          if items:
            block['content'].append({'type': 'list', 'items': items})

      if block['heading'] or block['content']:
        content.append(block)

    # Collect images on the page
    image_urls = []
    seen_imgs = set()
    preferred = ('-1024x284', '-2048x568', '-1920x', '-1536x')
    small = ('-24x24', '-32x32', '-48x48', '-64x64', '-96x96', '-150x150', '-150x', '-200x', '-300x', '-400x400')
    def _wp(u: str) -> bool: return '/wp-content/uploads/' in u
    def _small(u: str) -> bool: u=u.lower(); return any(s in u for s in small)
    def _icon(u: str) -> bool: u=u.lower(); return any(k in u for k in ('logo','icon','favicon','sprite'))
    candidates = []
    for img in response.css('img'):
      src = (img.attrib.get('src') or '').strip()
      srcset = (img.attrib.get('srcset') or '').strip()
      urls = []
      if src:
        urls.append(response.urljoin(src))
      if srcset:
        for part in srcset.split(','):
          ref = part.strip().split(' ')[0]
          if ref:
            urls.append(response.urljoin(ref))
      for u in urls:
        if not u or u in seen_imgs:
          continue
        seen_imgs.add(u)
        if _wp(u) and not _small(u) and not _icon(u):
          candidates.append(u)
    heroes = [u for u in candidates if any(p in u for p in preferred)]
    if heroes:
      image_urls = heroes
    elif candidates:
      image_urls = [candidates[0]]

    yield {
      'url': response.url,
      'slug': slug,
      'name': title,
      'description': description,
      'content': content,
      'image_urls': image_urls,
    }
