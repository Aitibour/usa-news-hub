import { getStore } from "@netlify/blobs";

const SECTIONS = ["politics","business","technology","sports","health","world","entertainment","opinion"];
const BASE = "https://americapulse.live";
const TODAY = new Date().toISOString().split("T")[0];

const STATIC_PAGES = [
  { loc: `${BASE}/`,                  lastmod: TODAY,        changefreq: "hourly",  priority: "1.0" },
  { loc: `${BASE}/latest.html`,       lastmod: TODAY,        changefreq: "always",  priority: "0.95" },
  ...SECTIONS.map(s => ({
    loc: `${BASE}/${s}.html`,         lastmod: TODAY,        changefreq: "hourly",  priority: "0.9"
  })),
  { loc: `${BASE}/search.html`,       lastmod: TODAY,        changefreq: "monthly", priority: "0.5" },
  { loc: `${BASE}/history.html`,      lastmod: TODAY,        changefreq: "weekly",  priority: "0.6" },
  { loc: `${BASE}/saved.html`,        lastmod: TODAY,        changefreq: "monthly", priority: "0.4" },
  { loc: `${BASE}/privacy.html`,      lastmod: TODAY,        changefreq: "yearly",  priority: "0.3" },
];

function urlTag({ loc, lastmod, changefreq, priority }) {
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export default async function handler(req) {
  const store = getStore("ai-articles");
  const urls = [...STATIC_PAGES];

  // Collect AI articles from last 30 days
  const today = new Date();
  for (const sec of SECTIONS) {
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const date = d.toISOString().split("T")[0];
      try {
        const article = await store.get(`${sec}/${date}`, { type: "json" });
        if (article && article.slug) {
          urls.push({
            loc: `${BASE}/article.html?slug=${encodeURIComponent(article.slug)}`,
            lastmod: article.date || date,
            changefreq: "never",
            priority: "0.8",
          });
        }
      } catch { /* no article */ }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(urlTag).join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
