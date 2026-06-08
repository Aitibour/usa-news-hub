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
function authorLink(name) {
  return `<a class="author-link" href="author.html?name=${encodeURIComponent(name)}" onclick="event.stopPropagation()">${esc(name)}</a>`;
}
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
<span>${authorLink(article.author)}</span>
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
<span>${authorLink(article.author)}</span>
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
const PAGE_SIZE = 12; // articles shown initially / per load-more batch
async function renderSectionPage(sectionId) {
const container = document.getElementById('section-articles');
if (!container) return;
container.innerHTML = '<p class="loading-msg">Loading latest stories…</p>';
const color = SECTION_COLORS[sectionId];
const staticArts = getArticlesBySection(sectionId);
if (staticArts.length) {
renderSectionContent(container, staticArts, sectionId, color);
}
const liveArts = await fetchLiveArticles(sectionId, 10);
if (liveArts.length) {
const articles = mergeArticles(staticArts, liveArts);
renderSectionContent(container, articles, sectionId, color);
}
}
function renderSectionContent(container, allArticles, sectionId, color) {
if (!allArticles.length) {
container.innerHTML = '<p class="no-articles">No articles yet. Check back soon.</p>';
return;
}
const [feat, second, third, ...rest] = allArticles;
const featSlug = safeSlug(feat.slug);
const featImg  = esc(resolveArticleImage(feat));
let html = `<div class="hero-lead" style="margin-bottom:32px">
<div class="hero-card hero-main" data-slug="${featSlug}" style="cursor:pointer">
<div class="hero-img-wrap">
<img src="${featImg}" alt="${esc(feat.title)}" loading="eager" fetchpriority="high" onerror="this.src='https://picsum.photos/seed/'+encodeURIComponent(this.alt.slice(0,20))+'/900/600'" />
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
const initial = rest.slice(0, PAGE_SIZE);
const overflow = rest.slice(PAGE_SIZE);
if (initial.length) {
html += `
<div class="section-header" style="margin-bottom:20px">
<h2 class="section-title"><span class="section-accent" style="background:${color}">${capitalize(sectionId)} Archive</span></h2>
<span class="article-count">${allArticles.length} stories</span>
</div>
<div class="cards-row four-col" id="section-grid" style="margin-bottom:32px">
${initial.map(a => renderCard(a, 'sm')).join('')}
</div>`;
}
if (overflow.length) {
html += `<div class="load-more-wrap">
<button class="load-more-btn" id="load-more-btn" data-loaded="${initial.length + 3}">Load More Stories</button>
<p class="load-more-count">${initial.length + 3} of ${allArticles.length} stories</p>
</div>`;
}
container.innerHTML = html;
// Wire Load More
if (overflow.length) {
const btn = document.getElementById('load-more-btn');
const grid = document.getElementById('section-grid');
const countEl = btn.nextElementSibling;
let loaded = initial.length + 3; // 3 = hero + 2 secondary
btn.addEventListener('click', function() {
btn.disabled = true;
btn.textContent = 'Loading…';
const next = rest.slice(loaded - 3, loaded - 3 + PAGE_SIZE);
grid.insertAdjacentHTML('beforeend', next.map(a => renderCard(a, 'sm')).join(''));
loaded += next.length;
countEl.textContent = `${loaded} of ${allArticles.length} stories`;
if (loaded - 3 >= rest.length) {
btn.closest('.load-more-wrap').remove();
} else {
btn.disabled = false;
btn.textContent = 'Load More Stories';
}
});
}
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
// Track view in localStorage
trackView(article.slug);
const color = SECTION_COLORS[article.section] || '#C8102E';
document.title = `${esc(article.title)} — AmericaPulse.live`;
const artImg = resolveArticleImage(article);
const canonEl = document.getElementById('canonical-url');
if (canonEl) canonEl.href = `https://americapulse.live/article.html?slug=${encodeURIComponent(article.slug)}`;
const ogT = document.getElementById('og-title'); if (ogT) ogT.content = article.title;
const ogD = document.getElementById('og-desc'); if (ogD) ogD.content = article.excerpt || '';
const ogI = document.getElementById('og-image'); if (ogI) ogI.content = artImg;
// Twitter Cards
const twT = document.getElementById('twitter-title'); if (twT) twT.content = article.title;
const twD = document.getElementById('twitter-desc'); if (twD) twD.content = article.excerpt || '';
const twI = document.getElementById('twitter-image'); if (twI) twI.content = artImg;
// Article meta
const aPub = document.getElementById('article-published'); if (aPub) aPub.content = article.date;
const aAut = document.getElementById('article-author'); if (aAut) aAut.content = article.author || '';
const aSec = document.getElementById('article-section'); if (aSec) aSec.content = capitalize(article.section || '');
// Rich JSON-LD: NewsArticle + BreadcrumbList + Speakable
const artUrl = `https://americapulse.live/article.html?slug=${encodeURIComponent(article.slug)}`;
const wordCount = (article.body||'').split(/\s+/).filter(Boolean).length;
const ldEl = document.createElement('script'); ldEl.type = 'application/ld+json';
ldEl.textContent = JSON.stringify({"@context":"https://schema.org","@graph":[
  {"@type":"NewsArticle",
   "@id": artUrl + '#article',
   "mainEntityOfPage": artUrl,
   "headline": article.title,
   "description": article.excerpt || '',
   "image": {"@type":"ImageObject","url":artImg,"width":900,"height":600},
   "author": {"@type":"Person","name": article.author, "url": `https://americapulse.live/search.html?q=${encodeURIComponent(article.author||'')}`},
   "publisher": {"@type":"Organization","@id":"https://americapulse.live/#organization","name":"AmericaPulse.live","url":"https://americapulse.live"},
   "datePublished": article.date,
   "dateModified": article.date,
   "articleSection": capitalize(article.section||''),
   "wordCount": wordCount || undefined,
   "url": artUrl,
   "isPartOf": {"@id":"https://americapulse.live/#website"},
   "speakable": {"@type":"SpeakableSpecification","cssSelector":[".article-title",".article-excerpt"]}
  },
  {"@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Home","item":"https://americapulse.live/"},
    {"@type":"ListItem","position":2,"name":capitalize(article.section||''),"item":`https://americapulse.live/${article.section}.html`},
    {"@type":"ListItem","position":3,"name":article.title,"item":artUrl}
  ]}
]});
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
<span class="author-meta">By <strong>${authorLink(article.author)}</strong></span>
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
${(article.tags||[]).map(t => `<a class="article-tag" href="search.html?q=${encodeURIComponent(t)}">${esc(t)}</a>`).join('')}
</div>
<div class="article-share">
<span class="share-label">Share</span>
<a class="share-btn share-x" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://americapulse.live/article.html?slug='+article.slug)}" target="_blank" rel="noopener" aria-label="Share on X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> X</a>
<a class="share-btn share-fb" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://americapulse.live/article.html?slug='+article.slug)}" target="_blank" rel="noopener" aria-label="Share on Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</a>
<button class="share-btn share-copy" onclick="(function(){try{navigator.clipboard.writeText(location.href);this.textContent='Copied!';setTimeout(function(){},1500)}catch(e){}}).call(this)" aria-label="Copy link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy link</button>
<button class="share-btn save-btn" id="save-article-btn" aria-label="Save for later"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg> <span id="save-label">${isSaved(article.slug) ? 'Saved' : 'Save'}</span></button>
</div>`;
// Wire save button
const saveBtn = document.getElementById('save-article-btn');
const saveLabel = document.getElementById('save-label');
if (saveBtn) {
  if (isSaved(article.slug)) saveBtn.classList.add('save-active');
  saveBtn.addEventListener('click', function() {
    const nowSaved = toggleSave(article.slug);
    saveLabel.textContent = nowSaved ? 'Saved' : 'Save';
    saveBtn.classList.toggle('save-active', nowSaved);
  });
}

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
// --- Bookmarks ---
const SAVED_KEY = 'ap_saved';
function getSaved() {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); } catch(e) { return []; }
}
function setSaved(arr) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(arr)); } catch(e) {}
  updateBookmarkBadge();
}
function isSaved(slug) { return getSaved().includes(slug); }
function toggleSave(slug) {
  const saved = getSaved();
  const idx = saved.indexOf(slug);
  if (idx === -1) { saved.unshift(slug); } else { saved.splice(idx, 1); }
  setSaved(saved);
  return idx === -1;
}
function updateBookmarkBadge() {
  const count = getSaved().length;
  document.querySelectorAll('.saved-badge').forEach(el => {
    el.textContent = count || '';
    el.style.display = count ? 'inline-flex' : 'none';
  });
}


const VIEW_KEY = 'ap_views';
const VIEW_MAX = 200;
function trackView(slug) {
  try {
    const raw = JSON.parse(localStorage.getItem(VIEW_KEY) || '{}');
    raw[slug] = (raw[slug] || 0) + 1;
    // Prune to top VIEW_MAX by count
    const entries = Object.entries(raw).sort((a,b) => b[1]-a[1]).slice(0, VIEW_MAX);
    localStorage.setItem(VIEW_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch(e) {}
}
function getMostRead(limit) {
  try {
    const raw = JSON.parse(localStorage.getItem(VIEW_KEY) || '{}');
    return Object.entries(raw)
      .sort((a,b) => b[1]-a[1])
      .slice(0, limit)
      .map(([slug]) => slug);
  } catch(e) { return []; }
}

async function renderTrending(containerId) {
const el = document.getElementById(containerId);
if (!el) return;
const mostRead = getMostRead(8);
let arts;
if (mostRead.length >= 3) {
  const all = getAllArticles(0);
  const bySlug = new Map(all.map(a => [a.slug, a]));
  arts = mostRead.map(s => bySlug.get(s)).filter(Boolean);
  // Pad with latest if fewer than 8
  if (arts.length < 8) {
    const seen = new Set(arts.map(a => a.slug));
    for (const a of all) { if (!seen.has(a.slug)) { arts.push(a); if (arts.length >= 8) break; } }
  }
} else {
  arts = getAllArticles(8);
}
el.innerHTML = arts.slice(0,8).map((a, i) => `
<li>
<span class="trend-num">${String(i+1).padStart(2,'0')}</span>
<div class="trend-body">
<a href="article.html?slug=${encodeURIComponent(safeSlug(a.slug))}">${esc(a.title)}</a>
<time>${timeAgo(a.date)}</time>
</div>
</li>`).join('');
}