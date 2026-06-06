// Netlify Function — serves AI-generated articles from Blobs
import { getStore } from "@netlify/blobs";

export default async function handler(req) {
  const url = new URL(req.url);
  const slug   = url.searchParams.get("slug");
  const section = url.searchParams.get("section");
  const limit  = parseInt(url.searchParams.get("limit") || "10");

  const store = getStore("ai-articles");

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=300",
  };

  try {
    // Single article by slug
    if (slug) {
      // slug format: ai-{section}-{date}-{title}
      const parts = slug.split('-');
      if (parts[0] === 'ai' && parts.length >= 3) {
        const sec = parts[1];
        const date = `${parts[2]}-${parts[3]}-${parts[4]}`;
        const article = await store.get(`${sec}/${date}`, { type: "json" });
        if (article && article.slug === slug) {
          return new Response(JSON.stringify({ article }), { headers });
        }
      }
      return new Response(JSON.stringify({ article: null }), { headers });
    }

    // List articles — collect recent days across all sections
    const SECTIONS = section
      ? [section]
      : ["politics","business","technology","sports","health","world","entertainment","opinion"];

    const articles = [];
    const today = new Date();

    for (const sec of SECTIONS) {
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const date = d.toISOString().split("T")[0];
        try {
          const article = await store.get(`${sec}/${date}`, { type: "json" });
          if (article) articles.push(article);
        } catch { /* no article for this day */ }
        if (articles.length >= limit) break;
      }
      if (!section && articles.length >= limit) break;
    }

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    return new Response(JSON.stringify({ articles: articles.slice(0, limit) }), { headers });

  } catch (err) {
    console.error("get-articles error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
