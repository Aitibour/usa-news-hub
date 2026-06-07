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

// Fallback images per section (used only if keyword image fetch fails)
const SECTION_IMAGES = {
  politics:      "https://images.unsplash.com/photo-1555374018-13a8994ab246?w=900&q=80",
  business:      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
  technology:    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  sports:        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=900&q=80",
  health:        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&q=80",
  world:         "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=900&q=80",
  entertainment: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80",
  opinion:       "https://images.unsplash.com/photo-1503551723145-6c040742065b?w=900&q=80",
};

// Keyword → Unsplash photo ID pools (no API key, no duplicates across runs)
// We rotate by day-of-year so each day gets a different image
const UNSPLASH_POOLS = {
  politics:      ["1555374018-13a8994ab246","1503551723145-6c040742065b","1605810230434-7631ac76ec81","1543286386-713bdd548da4","1529107386315-e1a2ed48a620"],
  business:      ["1611532736597-de2d4265fba3","1460925895917-afdab827c52f","1504384308090-c894fdcc538d","1611974789855-9c2a0a7236a3","1559526324-4b87b5e36e44"],
  technology:    ["1677442135703-1787eea5ce01","1486312338219-ce68d2c6f44d","1620712943543-bcc4688e7485","1518770660439-4636190af475","1550751827-4bd374c3f58b"],
  sports:        ["1566577739112-5180d4bf9390","1546519638-68e109498ffc","1504450758481-7338eba7524a","1541534741688-7078f1b56a9b","1579952363873-27f3bade9f55"],
  health:        ["1587854692152-cbe660dbde88","1559757148-5f50d97bb8f6","1576671081837-49000212a370","1505751172876-fa1923c5c528","1519824145371-1efc74edd2c8"],
  world:         ["1523292562811-8fa7962a78c8","1577083552431-6e5fd01988ec","1524492412937-b28074a5d7da","1589254065878-42c9da997008","1451187580459-43490279c0fa"],
  entertainment: ["1489599849927-2ee91cede3ba","1511671782779-c97d3d27a1d4","1574375927938-d5a98e8ffe85","1536440136628-849c177e76a1","1521967906867-14ec9d64bee8"],
  opinion:       ["1503551723145-6c040742065b","1455849318743-b2233052fcff","1434030216411-0b793f4b6f1a","1471107191679-f26174d2d41e","1499750310107-5fef28a66643"],
};

// Pick a unique image for today using day-of-year rotation
function pickDailyImage(section) {
  const pool = UNSPLASH_POOLS[section] || UNSPLASH_POOLS.politics;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const id = pool[dayOfYear % pool.length];
  return `https://images.unsplash.com/photo-${id}?w=900&q=80`;
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

// Extract image from RSS item, fall back to unique daily Unsplash image
function extractImage(item, section) {
  const media = item.match(/media:content[^>]+url="([^"]+)"/i)
    || item.match(/media:thumbnail[^>]+url="([^"]+)"/i)
    || item.match(/<enclosure[^>]+url="([^"]+jpg[^"]*|[^"]+png[^"]*|[^"]+jpeg[^"]*)"/i)
    || item.match(/<img[^>]+src="([^"]+)"/i);
  // Use RSS image if present and not a 1x1 tracker pixel
  if (media && media[1] && !media[1].includes("1x1") && media[1].length > 30) {
    return media[1];
  }
  // Use daily-rotated Unsplash image so every article looks different
  return pickDailyImage(section);
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
      const image = extractImage(item, section);

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
        image,
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
