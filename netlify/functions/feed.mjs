import { getStore } from "@netlify/blobs";

const SECTIONS = ["politics","business","technology","sports","health","world","entertainment","opinion"];
const BASE = "https://americapulse.live";
const SCAN_DAYS = 14;
const MAX_ITEMS = 20;

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toUTCString().replace("GMT", "+0000");
}

function itemTag(article) {
  const url = `${BASE}/article.html?slug=${encodeURIComponent(article.slug)}`;
  const img = article.image
    ? `\n    <media:content url="${esc(article.image)}" medium="image" />`
    : "";
  return `  <item>
    <title>${esc(article.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${esc(article.excerpt || "")}</description>
    <author>${esc(article.author || "AmericaPulse Staff")}</author>
    <category>${esc(article.section ? article.section.charAt(0).toUpperCase() + article.section.slice(1) : "")}</category>
    <pubDate>${rfc822(article.date)}</pubDate>${img}
  </item>`;
}

export default async function handler() {
  const store = getStore("ai-articles");
  const articles = [];
  const today = new Date();

  for (const sec of SECTIONS) {
    for (let i = 0; i < SCAN_DAYS; i++) {
      if (articles.length >= MAX_ITEMS) break;
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const date = d.toISOString().split("T")[0];
      try {
        const article = await store.get(`${sec}/${date}`, { type: "json" });
        if (article) articles.push(article);
      } catch { /* no article */ }
    }
    if (articles.length >= MAX_ITEMS) break;
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const items = articles.slice(0, MAX_ITEMS);
  const buildDate = new Date().toUTCString().replace("GMT", "+0000");
  const lastBuild = items.length ? rfc822(items[0].date) : buildDate;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>AmericaPulse.live</title>
    <link>${BASE}</link>
    <description>Breaking news, politics, business, technology, sports, health, world affairs and entertainment.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE}/icon-192.png</url>
      <title>AmericaPulse.live</title>
      <link>${BASE}</link>
    </image>
${items.map(itemTag).join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
}
