const SECTION_COLORS = {
politics:'#C8102E', business:'#0B6E4F', technology:'#2563EB',
sports:'#EA580C', health:'#7C3AED', world:'#0891B2',
entertainment:'#DB2777', opinion:'#92400E'
};
function sectionLabel(s) { return capitalize(s); }
function esc(str) {
if (typeof str !== 'string') return '';
return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
.replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
function safeSlug(slug) {
return typeof slug === 'string' ? slug.replace(/[^a-zA-Z0-9-]/g, '') : '';
}
function safeUrl(url) {
if (typeof url !== 'string') return '#';
return /^https?:\/\//i.test(url) ? url : '#';
}
function formatDate(dateStr) {
const d = new Date(dateStr + 'T12:00:00');
return d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
}
function timeAgo(dateStr) {
const now = new Date();
const then = new Date(dateStr + 'T12:00:00');
const diff = Math.floor((now - then) / 1000);
if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
const days = Math.floor(diff/86400);
if (days < 7) return `${days}d ago`;
return formatDate(dateStr);
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function goArticle(slug) {
const safe = safeSlug(slug);
if (safe) window.location.href = `article.html?slug=${encodeURIComponent(safe)}`;
}
document.addEventListener('click', function(e) {
const card = e.target.closest('[data-slug]');
if (card) { e.preventDefault(); goArticle(card.dataset.slug); }
});
function sortByDate(arr) {
return [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));
}
const _liveCache = new Map();
async function fetchLiveArticles(section, limit = 10) {
const key = `${section}:${limit}`;
if (_liveCache.has(key)) return _liveCache.get(key);
try {
const ctrl = new AbortController();
const tid = setTimeout(() => ctrl.abort(), 3000);
const url = section
? `/.netlify/functions/get-articles?section=${encodeURIComponent(section)}&limit=${limit}`
: `/.netlify/functions/get-articles?limit=${limit}`;
const r = await fetch(url, { signal: ctrl.signal });
clearTimeout(tid);
if (r.ok) {
const d = await r.json();
const arts = d.articles || [];
_liveCache.set(key, arts);
return arts;
}
} catch(e) {}
return [];
}
function mergeArticles(staticArts, liveArts) {
const seen = new Set();
const merged = [];
for (const a of [...liveArts, ...staticArts]) {
if (!seen.has(a.slug)) { seen.add(a.slug); merged.push(a); }
}
return sortByDate(merged);
}
function renderCard(article, size = 'sm') {
const color = SECTION_COLORS[article.section] || '#C8102E';
const slug  = safeSlug(article.slug);
const rawImg = resolveArticleImage(article);
const img   = safeUrl(rawImg) !== '#' ? esc(rawImg) : '';
if (size === 'lg') {
return `
<article class="news-card card-featured" data-slug="${slug}" style="cursor:pointer">
<div class="card-img-wrap">
<img src="${img}" alt="${esc(article.title)}" loading="lazy" onerror="this.src='https://picsum.photos/seed/'+encodeURIComponent(this.alt.slice(0,20))+'/900/600'" />
</div>
<div class="card-body">
<span class="card-tag" style="background:${color}">${sectionLabel(article.section)}</span>
<h3 class="card-title">${esc(article.title)}</h3>
<p class="card-excerpt">${esc(article.excerpt)}</p>
<div class="card-meta">
<span>${esc(article.author)}</span>
<time>${formatDate(article.date)}</time>
<span>${article.readTime || 5} min read</span>
</div>
</div>
</article>`;
}
return `
<article class="news-card-sm" data-slug="${slug}" style="cursor:pointer">
<div class="card-img-wrap">
<img src="${img}" alt="${esc(article.title)}" loading="lazy" onerror="this.src='https://picsum.photos/seed/'+encodeURIComponent(this.alt.slice(0,20))+'/900/600'" />
</div>
<div class="card-body">
<span class="card-tag" style="background:${color}">${capitalize(article.section)}</span>
<h3 class="card-title-sm">${esc(article.title)}</h3>
<div class="card-meta">
<span>${esc(article.author)}</span>
<time title="${formatDate(article.date)}">${timeAgo(article.date)}</time>
</div>
</div>
</article>`;
}
function renderListItem(article) {
const color = SECTION_COLORS[article.section] || '#C8102E';
const slug  = safeSlug(article.slug);
const rawImg = resolveArticleImage(article);
const img   = safeUrl(rawImg) !== '#' ? esc(rawImg) : '';
return `
<article class="news-list-item" data-slug="${slug}" style="cursor:pointer">
<div class="list-img"><img src="${img}" alt="${esc(article.title)}" loading="lazy" onerror="this.src='https://picsum.photos/seed/'+encodeURIComponent(this.alt.slice(0,20))+'/900/600'" /></div>
<div class="list-body">
<span class="card-tag" style="background:${color}">${capitalize(article.section)}</span>
<h4>${esc(article.title)}</h4>
<time title="${formatDate(article.date)}">${timeAgo(article.date)}</time>
</div>
</article>`;
}
const PAGE_SIZE = 10; // articles per page (1 hero + 2 secondary + 7 grid)
async function renderSectionPage(sectionId) {
const container = document.getElementById('section-articles');
if (!container) return;
container.innerHTML = '<p class="loading-msg">Loading latest stories…</p>';
const color = SECTION_COLORS[sectionId];
const page = Math.max(1, parseInt(new URLSearchParams(window.location.search).get('page') || '1', 10));
const staticArts = getArticlesBySection(sectionId);
if (staticArts.length) {
renderSectionContent(container, staticArts, sectionId, color, page);
}
const liveArts = await fetchLiveArticles(sectionId, 10);
if (liveArts.length) {
const articles = mergeArticles(staticArts, liveArts);
renderSectionContent(container, articles, sectionId, color, page);
}
}
function renderSectionContent(container, allArticles, sectionId, color, page) {
if (!allArticles.length) {
container.innerHTML = '<p class="no-articles">No articles yet. Check back soon.</p>';
return;
}
const totalPages = Math.ceil(allArticles.length / PAGE_SIZE);
const safePage   = Math.min(Math.max(1, page), totalPages);
const start      = (safePage - 1) * PAGE_SIZE;
const articles   = allArticles.slice(start, start + PAGE_SIZE);
const [feat, second, third, ...rest] = articles;
const featSlug = safeSlug(feat.slug);
const featImg  = esc(resolveArticleImage(feat));
let html = `<div class="hero-lead" style="margin-bottom:32px">
<div class="hero-card hero-main" data-slug="${featSlug}" style="cursor:pointer">
<div class="hero-img-wrap">
<img src="${featImg}" alt="${esc(feat.title)}" loading="eager" onerror="this.src='https://picsum.photos/seed/'+encodeURIComponent(this.alt.slice(0,20))+'/900/600'" />
<span class="hero-category-tag" style="background:${color}">${sectionLabel(sectionId)}</span>
</div>
<div class="hero-body">
<h1 class="hero-title">${esc(feat.title)}</h1>
<p class="hero-excerpt">${esc(feat.excerpt)}</p>
<div class="hero-meta">
<span class="author">${esc(feat.author)}</span>
<span class="dot">•</span>
<time>${formatDate(feat.date)}</time>
<span class="dot">•</span>
<span>${feat.readTime||5} min read</span>
</div>
</div>
</div>
<div class="hero-side">
${[second, third].filter(Boolean).map(a => {
const s = safeSlug(a.slug);
const i = esc(resolveArticleImage(a));
return `
<div class="hero-card hero-secondary" data-slug="${s}" style="cursor:pointer">
<div class="hero-img-wrap">
<img src="${i}" alt="${esc(a.title)}" loading="lazy" onerror="this.src='https://picsum.photos/seed/'+encodeURIComponent(this.alt.slice(0,20))+'/900/600'" />
<span class="hero-category-tag" style="background:${color}">${sectionLabel(sectionId)}</span>
</div>
<div class="hero-body">
<h2 class="hero-title-sm">${esc(a.title)}</h2>
<div class="hero-meta">
<span class="author">${esc(a.author)}</span>
<span class="dot">•</span>
<time>${timeAgo(a.date)}</time>
</div>
</div>
</div>`;
}).join('')}
</div>
</div>`;
if (rest.length) {
html += `
<div class="section-header" style="margin-bottom:20px">
<h2 class="section-title"><span class="section-accent" style="background:${color}">${capitalize(sectionId)} Archive</span></h2>
<span class="article-count">${allArticles.length} stories</span>
</div>
<div class="cards-row four-col" style="margin-bottom:32px">
${rest.map(a => renderCard(a, 'sm')).join('')}
</div>`;
}
if (totalPages > 1) {
const base = `${sectionId}.html`;
let pageButtons = '';
const lo = Math.max(1, safePage - 4);
const hi = Math.min(totalPages, lo + 9);
if (lo > 1) pageButtons += `<a href="${base}?page=1" class="pg-btn">1</a><span class="pg-ellipsis">…</span>`;
for (let p = lo; p <= hi; p++) {
pageButtons += `<a href="${base}?page=${p}" class="pg-btn${p === safePage ? ' pg-active' : ''}">${p}</a>`;
}
if (hi < totalPages) pageButtons += `<span class="pg-ellipsis">…</span><a href="${base}?page=${totalPages}" class="pg-btn">${totalPages}</a>`;
html += `<nav class="pagination" aria-label="Page navigation">${pageButtons}</nav>`;
}
container.innerHTML = html;
window.scrollTo({ top: 0, behavior: 'smooth' });
}
async function renderArticlePage() {
const params = new URLSearchParams(window.location.search);
const rawSlug = params.get('slug') || '';
const slug = safeSlug(rawSlug);
if (!slug) { window.location.href = 'index.html'; return; }
let article = getArticleBySlug(slug);
if (!article) {
try {
const ctrl = new AbortController();
const tid = setTimeout(() => ctrl.abort(), 4000);
const r = await fetch(`/.netlify/functions/get-articles?slug=${encodeURIComponent(slug)}`, { signal: ctrl.signal });
clearTimeout(tid);
if (r.ok) { const d = await r.json(); article = d.article || null; }
} catch(e) {}
}
const el = document.getElementById('article-content');
if (!article) {
el.innerHTML = '<p class="no-articles">Article not found. <a href="index.html">← Home</a></p>';
return;
}
const color = SECTION_COLORS[article.section] || '#C8102E';
document.title = `${esc(article.title)} — AmericaPulse.live`;
const artImg = resolveArticleImage(article);
const canonEl = document.getElementById('canonical-url');
if (canonEl) canonEl.href = `https://americapulse.live/article.html?slug=${encodeURIComponent(article.slug)}`;
const ogT = document.getElementById('og-title'); if (ogT) ogT.content = article.title;
const ogD = document.getElementById('og-desc'); if (ogD) ogD.content = article.excerpt || '';
const ogI = document.getElementById('og-image'); if (ogI) ogI.content = artImg;
const ldEl = document.createElement('script'); ldEl.type = 'application/ld+json';
ldEl.textContent = JSON.stringify({
  "@context":"https://schema.org","@type":"NewsArticle",
  "headline": article.title,
  "description": article.excerpt || '',
  "image": artImg,
  "author": {"@type":"Person","name": article.author},
  "datePublished": article.date,
  "publisher": {"@type":"Organization","name":"AmericaPulse.live","url":"https://americapulse.live"},
  "url": `https://americapulse.live/article.html?slug=${encodeURIComponent(article.slug)}`
});
document.head.appendChild(ldEl);
const rawBody = article.body || '';
const bodyHTML = article.aiGenerated
? `<p>${esc(rawBody)}</p>`
: rawBody.includes('<')
  ? rawBody
  : rawBody.split('\n').map(p => p ? `<p>${p}</p>` : '').join('');
const sourceLine = (article.sourceName && safeUrl(article.sourceUrl) !== '#')
? `<a href="${safeUrl(article.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="source-link">Source: ${esc(article.sourceName)}</a>`
: '';
el.innerHTML = `
<div class="article-header">
<div class="article-breadcrumb">
<a href="index.html">Home</a> /
<a href="${esc(article.section)}.html">${capitalize(article.section)}</a>
</div>
<span class="card-tag" style="background:${color}">${capitalize(article.section)}</span>
<h1 class="article-title">${esc(article.title)}</h1>
<p class="article-excerpt">${esc(article.excerpt)}</p>
<div class="article-meta">
<span class="author-meta">By <strong>${esc(article.author)}</strong></span>
<span class="dot">•</span>
<time>${formatDate(article.date)}</time>
<span class="dot">•</span>
<span>${article.readTime||5} min read</span>
${sourceLine}
</div>
</div>
<div class="article-hero-img">
<img src="${esc(resolveArticleImage(article))}" alt="${esc(article.title)}" />
</div>
<div class="article-body">${bodyHTML}</div>
<div class="article-tags">
${(article.tags||[]).map(t => `<span class="article-tag" data-tag="${esc(t)}">${esc(t)}</span>`).join('')}
</div>`;
const liveRelated   = await fetchLiveArticles(article.section, 6);
const staticRelated = getArticlesBySection(article.section).filter(a => a.slug !== slug);
const related = mergeArticles(staticRelated, liveRelated.filter(a => a.slug !== slug)).slice(0, 4);
if (related.length) {
const relEl = document.getElementById('related-articles');
if (relEl) {
relEl.innerHTML = `
<div class="section-header">
<h2 class="section-title"><span class="section-accent" style="background:${color}">More in ${capitalize(article.section)}</span></h2>
</div>
<div class="cards-row four-col">${related.map(a => renderCard(a,'sm')).join('')}</div>`;
}
}
}
async function renderTrending(containerId) {
const el = document.getElementById(containerId);
if (!el) return;
const staticArts = getAllArticles(8);
el.innerHTML = staticArts.map((a, i) => `
<li>
<span class="trend-num">${String(i+1).padStart(2,'0')}</span>
<div class="trend-body">
<a href="article.html?slug=${encodeURIComponent(safeSlug(a.slug))}">${esc(a.title)}</a>
<time>${timeAgo(a.date)}</time>
</div>
</li>`).join('');
}