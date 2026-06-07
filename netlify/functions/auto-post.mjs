// Netlify Scheduled Function — runs daily at 7:00 AM ET
// Fetches 1 article per section from free RSS feeds, stores in Netlify Blobs
// NO API KEY REQUIRED — uses public RSS feeds from major news sources

import { getStore } from "@netlify/blobs";

export const config = {
  schedule: "0 12 * * *", // 7 AM ET (12:00 UTC)
};

// Free RSS feeds by section — no API key needed
const SECTION_FEEDS = {
  politics: [
    "https://feeds.bbci.co.uk/news/politics/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
    "https://www.npr.org/rss/rss.php?id=1014",
  ],
  business: [
    "https://feeds.bbci.co.uk/news/business/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
    "https://www.cnbc.com/id/10001147/device/rss/rss.html",
  ],
  technology: [
    "https://feeds.bbci.co.uk/news/technology/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "https://www.wired.com/feed/rss",
  ],
  sports: [
    "https://feeds.bbci.co.uk/sport/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml",
    "https://www.espn.com/espn/rss/news",
  ],
  health: [
    "https://feeds.bbci.co.uk/news/health/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml",
    "https://www.npr.org/rss/rss.php?id=1128",
  ],
  world: [
    "https://feeds.bbci.co.uk/news/world/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    "https://www.npr.org/rss/rss.php?id=1004",
  ],
  entertainment: [
    "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml",
    "https://www.npr.org/rss/rss.php?id=1008",
  ],
  opinion: [
    "https://rss.nytimes.com/services/xml/rss/nyt/Opinion.xml",
    "https://feeds.bbci.co.uk/news/rss.xml",
    "https://www.npr.org/rss/rss.php?id=1057",
  ],
};

// Generate a consistent picsum image from slug — no external CDN issues
function pickImage(slug) {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/900/600`;
}

// Extract keywords from title to build a more relevant image query
function titleKeywords(title) {
  const stopWords = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","from","is","are","was","were","be","been","has","have","had","will","would","could","should","may","might","that","this","these","those","it","its","as","up","out","if","about","who","which","when","what","how"]);
  return title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w))
    .slice(0, 3)
    .join(",");
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// Extract text from XML tag
function extractTag(xml, tag) {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"),
  ];
  for (const re of patterns) {
    const m = xml.match(re);
    if (m && m[1]) return m[1].trim();
  }
  return "";
}

// Always use picsum derived from slug — reliable, no hotlink/CSP issues
function extractImage(item, slug) {
  return pickImage(slug);
}

// Strip HTML tags from text
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Format body — wrap plain text in paragraphs
function formatBody(description, content) {
  const text = content || description;
  const clean = stripHtml(text);
  if (!clean) return "<p>Full article available at the source.</p>";
  // Split into paragraphs of ~150 words
  const words = clean.split(" ");
  const paras = [];
  for (let i = 0; i < words.length; i += 80) {
    const chunk = words.slice(i, i + 80).join(" ");
    if (chunk.trim()) paras.push(`<p>${chunk}</p>`);
  }
  return paras.join("\n") || `<p>${clean}</p>`;
}

async function fetchFeed(url, section) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "USA-News-Hub/1.0 (RSS reader; +https://usanewswebsit.netlify.app)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const xml = await res.text();

    // Parse items
    const itemMatches = xml.matchAll(/<item[\s>]([\s\S]*?)<\/item>/gi);
    const items = [...itemMatches].map(m => m[1]);
    if (!items.length) return null;

    // Pick first item with a title and description
    for (const item of items) {
      const title = stripHtml(extractTag(item, "title"));
      const description = extractTag(item, "description");
      const content = extractTag(item, "content:encoded") || extractTag(item, "content");
      const link = extractTag(item, "link") || extractTag(item, "guid");
      const author = extractTag(item, "dc:creator") || extractTag(item, "author") || "News Desk";
      const pubDate = extractTag(item, "pubDate") || new Date().toISOString();

      if (!title || title.length < 10) continue;

      const excerpt = stripHtml(description).slice(0, 300)
        + (stripHtml(description).length > 300 ? "…" : "");

      const today = new Date().toISOString().split("T")[0];
      const slug = `rss-${section}-${today}-${slugify(title).slice(0, 40)}`;

      return {
        id: slug,
        slug,
        title,
        excerpt: excerpt || title,
        body: formatBody(description, content),
        author: stripHtml(author).slice(0, 60) || "News Desk",
        date: today,
        section,
        image: pickImage(slug),
        tags: [section],
        readTime: Math.max(2, Math.ceil((content || description).split(" ").length / 200)),
        sourceUrl: link || url,
        sourceName: new URL(url).hostname.replace("www.", "").replace("feeds.", ""),
        autoGenerated: true,
      };
    }
    return null;
  } catch (err) {
    clearTimeout(timeout);
    console.warn(`Feed ${url} failed: ${err.message}`);
    return null;
  }
}

export default async function handler() {
  const store = getStore("ai-articles");
  const today = new Date().toISOString().split("T")[0];
  console.log(`RSS auto-post running for ${today}`);

  const results = {};

  for (const [section, feeds] of Object.entries(SECTION_FEEDS)) {
    let article = null;

    // Try each feed until one works
    for (const feedUrl of feeds) {
      article = await fetchFeed(feedUrl, section);
      if (article) break;
    }

    if (!article) {
      console.warn(`✗ No article found for ${section}`);
      continue;
    }

    try {
      await store.setJSON(`${section}/${today}`, article);
      results[section] = article.title;
      console.log(`✓ ${section}: "${article.title}"`);
    } catch (err) {
      console.error(`✗ Store failed for ${section}: ${err.message}`);
    }
  }

  const count = Object.keys(results).length;
  console.log(`Auto-post complete: ${count}/8 sections updated`);
  return new Response(JSON.stringify({ date: today, count, articles: results }), {
    headers: { "Content-Type": "application/json" },
  });
}
