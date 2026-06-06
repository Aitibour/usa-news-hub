// Netlify Scheduled Function — runs daily at 7:00 AM ET
// Generates 1 article per section using Anthropic API, stores in Netlify Blobs
import Anthropic from "@anthropic-ai/sdk";
import { getStore } from "@netlify/blobs";

export const config = {
  schedule: "0 12 * * *",  // 7 AM ET (12:00 UTC)
};

const SECTIONS = [
  "politics", "business", "technology", "sports",
  "health", "world", "entertainment", "opinion",
];

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

const SECTION_AUTHORS = {
  politics:      ["Sarah Mitchell","Robert Vasquez","Patricia Holloway","David Reynolds"],
  business:      ["James Chen","Maria Gonzalez","Kevin Hart","Priya Nair"],
  technology:    ["Alex Johnson","Diana Cole","Marcus Webb","Tony Rivers"],
  sports:        ["Tony Rivers","Marcus Webb","Diana Cole","Bob Chen"],
  health:        ["Dr. Linda Park","Dr. Susan Fletcher","Dr. James Morris","Dr. Ann Reid"],
  world:         ["Foreign Desk","Ahmed Al-Rashid","Elena Petrova","Carlos Santos"],
  entertainment: ["Jennifer Moore","Tyler Brooks","Sophia Williams","Marcus Lee"],
  opinion:       ["Patricia Bloom","David Nguyen","Carla Steiner","Harold Winters"],
};

function slugify(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default async function handler() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set");
    return;
  }

  const client = new Anthropic({ apiKey });
  const today = new Date().toISOString().split("T")[0];
  const store = getStore("ai-articles");

  console.log(`Auto-post running for ${today}`);

  for (const section of SECTIONS) {
    try {
      const prompt = `You are a professional journalist writing for USA News Hub, a major American news website.

Today's date is ${today}. Write ONE original, realistic, high-quality news article for the ${section.toUpperCase()} section.

The article should:
- Be about a plausible current news event relevant to ${section} (US-focused)
- Have a compelling, specific headline (not generic)
- Be 400-600 words
- Include specific details, quotes, statistics to make it feel real
- Be written in AP news style

Respond with ONLY valid JSON in this exact format:
{
  "title": "Article headline here",
  "excerpt": "2-3 sentence summary of the article",
  "body": "<p>Full article body here in HTML paragraphs...</p>",
  "tags": ["tag1", "tag2", "tag3"]
}`;

      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      });

      const raw = message.content[0].text.trim();
      // Extract JSON robustly
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON in response");

      const parsed = JSON.parse(jsonMatch[0]);
      const slug = `ai-${section}-${today}-${slugify(parsed.title).slice(0, 40)}`;

      const article = {
        id:       slug,
        slug,
        title:    parsed.title,
        excerpt:  parsed.excerpt,
        body:     parsed.body,
        author:   randomFrom(SECTION_AUTHORS[section]),
        date:     today,
        section,
        image:    SECTION_IMAGES[section],
        tags:     parsed.tags || [section],
        readTime: 5,
        aiGenerated: true,
      };

      // Store in Netlify Blobs — key: ai-articles/{section}/{date}
      await store.setJSON(`${section}/${today}`, article);
      console.log(`✓ Generated ${section}: "${article.title}"`);

    } catch (err) {
      console.error(`✗ Failed ${section}:`, err.message);
    }
  }

  console.log("Auto-post complete");
}
