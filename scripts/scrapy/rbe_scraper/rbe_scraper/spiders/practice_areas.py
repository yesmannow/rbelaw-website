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
    for src in response.css('img::attr(src)').getall():
      if not src:
        continue
      abs_url = response.urljoin(src)
      if abs_url in seen_imgs:
        continue
      seen_imgs.add(abs_url)
      image_urls.append(abs_url)

    yield {
      'url': response.url,
      'slug': slug,
      'name': title,
      'description': description,
      'content': content,
      'image_urls': image_urls,
    }
