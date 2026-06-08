// Netlify Function — serves AI-generated articles from Blobs
import { getStore } from "@netlify/blobs";

const VALID_SECTIONS = new Set([
  "politics","business","technology","sports","health","world","entertainment","opinion"
]);
const SLUG_RE = /^[a-z0-9-]+$/;
const MAX_LIMIT = 20;

// Restrict CORS to own origin in production
function corsHeaders(req) {
  const origin = req.headers.get("origin") || "";
  const allowed = origin.endsWith("netlify.app") || origin.endsWith("americapulse.live") || origin === "";
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowed ? origin || "*" : "https://americapulse.live",
    "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    "Vary": "Origin",
  };
}

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }

  const url = new URL(req.url);
  const slugParam    = url.searchParams.get("slug")    || "";
  const sectionParam = url.searchParams.get("section") || "";
  const limitParam   = parseInt(url.searchParams.get("limit") || "10", 10);

  // Input validation
  const limit = Math.min(Math.max(1, isNaN(limitParam) ? 10 : limitParam), MAX_LIMIT);
  const section = VALID_SECTIONS.has(sectionParam) ? sectionParam : "";
  const slug = SLUG_RE.test(slugParam) ? slugParam : "";

  const headers = corsHeaders(req);
  const store = getStore("ai-articles");

  try {
    // Single article by slug
    if (slug) {
      const parts = slug.split('-');
      if (parts[0] === 'ai' && parts.length >= 5) {
        const sec = parts[1];
        const date = `${parts[2]}-${parts[3]}-${parts[4]}`;
        if (VALID_SECTIONS.has(sec) && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
          const article = await store.get(`${sec}/${date}`, { type: "json" });
          if (article && article.slug === slug) {
            return new Response(JSON.stringify({ article }), { headers });
          }
        }
      }
      return new Response(JSON.stringify({ article: null }), { headers });
    }

    // List articles — scan only last 14 days (reduced from 30) per section
    const SECTIONS = section ? [section] : [...VALID_SECTIONS];
    const articles = [];
    const today = new Date();
    const SCAN_DAYS = 14;

    for (const sec of SECTIONS) {
      for (let i = 0; i < SCAN_DAYS; i++) {
        if (articles.length >= limit) break;
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const date = d.toISOString().split("T")[0];
        try {
          const article = await store.get(`${sec}/${date}`, { type: "json" });
          if (article) articles.push(article);
        } catch { /* no article for this day */ }
      }
      if (!section && articles.length >= limit) break;
    }

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    return new Response(JSON.stringify({ articles: articles.slice(0, limit) }), { headers });

  } catch (err) {
    console.error("get-articles error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers });
  }
}
