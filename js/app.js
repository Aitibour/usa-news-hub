// USA News Hub — Shared App Engine

const SECTION_COLORS = {
  politics:'#C8102E', business:'#0B6E4F', technology:'#2563EB',
  sports:'#EA580C', health:'#7C3AED', world:'#0891B2',
  entertainment:'#DB2777', opinion:'#92400E'
};

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ---- Article card HTML ----
function renderCard(article, size = 'md') {
  const color = SECTION_COLORS[article.section] || '#C8102E';
  const tagStyle = `background:${color}`;
  if (size === 'lg') {
    return `
    <article class="news-card card-featured" onclick="goArticle('${article.slug}')">
      <div class="card-img-wrap">
        <img src="${article.image}" alt="${article.title}" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-tag" style="${tagStyle}">${capitalize(article.section)}</span>
        <h3 class="card-title">${article.title}</h3>
        <p class="card-excerpt">${article.excerpt}</p>
        <div class="card-meta">
          <span>${article.author}</span>
          <time>${formatDate(article.date)}</time>
          <span>${article.readTime || 5} min read</span>
        </div>
      </div>
    </article>`;
  }
  return `
  <article class="news-card-sm" onclick="goArticle('${article.slug}')">
    <div class="card-img-wrap"><img src="${article.image}" alt="${article.title}" loading="lazy" /></div>
    <div class="card-body">
      <span class="card-tag" style="${tagStyle}">${capitalize(article.section)}</span>
      <h3 class="card-title-sm">${article.title}</h3>
      <div class="card-meta"><span>${article.author}</span><time>${formatDate(article.date)}</time></div>
    </div>
  </article>`;
}

function renderListItem(article) {
  const color = SECTION_COLORS[article.section] || '#C8102E';
  return `
  <article class="news-list-item" onclick="goArticle('${article.slug}')">
    <div class="list-img"><img src="${article.image}" alt="${article.title}" loading="lazy" /></div>
    <div class="list-body">
      <span class="card-tag" style="background:${color}">${capitalize(article.section)}</span>
      <h4>${article.title}</h4>
      <time>${formatDate(article.date)}</time>
    </div>
  </article>`;
}

function goArticle(slug) {
  window.location.href = `article.html?slug=${slug}`;
}

// ---- Section page renderer ----
function renderSectionPage(sectionId) {
  const articles = getArticlesBySection(sectionId);
  const color = SECTION_COLORS[sectionId];
  const container = document.getElementById('section-articles');
  if (!container) return;

  if (!articles.length) {
    container.innerHTML = '<p class="no-articles">No articles yet. Check back soon.</p>';
    return;
  }

  // Featured + list layout for top, grid below
  const [featured, second, ...rest] = articles;

  let html = `<div class="hero-lead" style="margin-bottom:32px">
    <div class="hero-card hero-main" onclick="goArticle('${featured.slug}')" style="cursor:pointer">
      <div class="hero-img-wrap">
        <img src="${featured.image}" alt="${featured.title}" loading="lazy" />
        <span class="hero-category-tag" style="background:${color}">${capitalize(sectionId)}</span>
      </div>
      <div class="hero-body">
        <h1 class="hero-title">${featured.title}</h1>
        <p class="hero-excerpt">${featured.excerpt}</p>
        <div class="hero-meta">
          <span class="author">${featured.author}</span>
          <span class="dot">•</span>
          <time>${formatDate(featured.date)}</time>
          <span class="dot">•</span>
          <span>${featured.readTime || 5} min read</span>
        </div>
      </div>
    </div>`;

  if (second) {
    html += `<div class="hero-side">
      <div class="hero-card hero-secondary" onclick="goArticle('${second.slug}')" style="cursor:pointer">
        <div class="hero-img-wrap">
          <img src="${second.image}" alt="${second.title}" loading="lazy"/>
          <span class="hero-category-tag" style="background:${color}">${capitalize(sectionId)}</span>
        </div>
        <div class="hero-body">
          <h2 class="hero-title-sm">${second.title}</h2>
          <div class="hero-meta">
            <span class="author">${second.author}</span>
            <span class="dot">•</span>
            <time>${formatDate(second.date)}</time>
          </div>
        </div>
      </div>`;

    // Third article in side
    const third = articles[2];
    if (third) {
      html += `<div class="hero-card hero-secondary" onclick="goArticle('${third.slug}')" style="cursor:pointer">
        <div class="hero-img-wrap">
          <img src="${third.image}" alt="${third.title}" loading="lazy"/>
          <span class="hero-category-tag" style="background:${color}">${capitalize(sectionId)}</span>
        </div>
        <div class="hero-body">
          <h2 class="hero-title-sm">${third.title}</h2>
          <div class="hero-meta">
            <span class="author">${third.author}</span>
            <span class="dot">•</span>
            <time>${formatDate(third.date)}</time>
          </div>
        </div>
      </div>`;
    }
    html += `</div>`;
  }
  html += `</div>`;

  // All remaining articles as grid
  if (rest.length > 2) {
    const remaining = articles.slice(3);
    html += `<div class="section-header" style="margin-bottom:20px">
      <h2 class="section-title"><span class="section-accent" style="background:${color}">${capitalize(sectionId)} Archive</span></h2>
    </div>
    <div class="cards-row four-col" style="margin-bottom:32px">`;
    remaining.forEach(a => { html += renderCard(a, 'sm'); });
    html += `</div>`;
  }

  container.innerHTML = html;
}

// ---- Article detail page renderer ----
async function renderArticlePage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) { window.location.href = 'index.html'; return; }

  // Try static DB first
  let article = getArticleBySlug(slug);

  // Fall back to Netlify function (AI-generated articles)
  if (!article) {
    try {
      const resp = await fetch(`/.netlify/functions/get-articles?slug=${encodeURIComponent(slug)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.article) article = data.article;
      }
    } catch(e) { /* offline or function unavailable */ }
  }

  if (!article) {
    document.getElementById('article-content').innerHTML = '<p>Article not found.</p>';
    return;
  }

  const color = SECTION_COLORS[article.section] || '#C8102E';
  document.title = `${article.title} — USA News Hub`;

  const el = document.getElementById('article-content');
  el.innerHTML = `
    <div class="article-header">
      <div class="article-breadcrumb">
        <a href="index.html">Home</a> /
        <a href="${article.section}.html">${capitalize(article.section)}</a>
      </div>
      <span class="card-tag" style="background:${color}">${capitalize(article.section)}</span>
      <h1 class="article-title">${article.title}</h1>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-meta">
        <span class="author-meta">By <strong>${article.author}</strong></span>
        <span class="dot">•</span>
        <time>${formatDate(article.date)}</time>
        <span class="dot">•</span>
        <span>${article.readTime || 5} min read</span>
      </div>
    </div>
    <div class="article-hero-img">
      <img src="${article.image}" alt="${article.title}" />
    </div>
    <div class="article-body">
      ${article.body}
    </div>
    <div class="article-tags">
      ${(article.tags || []).map(t => `<span class="article-tag">${t}</span>`).join('')}
    </div>`;

  // Related articles
  const related = getArticlesBySection(article.section).filter(a => a.slug !== slug).slice(0, 4);
  if (related.length) {
    const relEl = document.getElementById('related-articles');
    if (relEl) {
      relEl.innerHTML = `
        <div class="section-header"><h2 class="section-title"><span class="section-accent" style="background:${color}">More in ${capitalize(article.section)}</span></h2></div>
        <div class="cards-row four-col">${related.map(a => renderCard(a, 'sm')).join('')}</div>`;
    }
  }
}

// ---- Trending sidebar ----
async function renderTrending(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const articles = getAllArticles(8);
  const html = articles.map((a, i) => `
    <li>
      <span class="trend-num">${String(i+1).padStart(2,'0')}</span>
      <div class="trend-body">
        <a href="article.html?slug=${a.slug}">${a.title}</a>
        <time>${formatDate(a.date)}</time>
      </div>
    </li>`).join('');
  el.innerHTML = html;

  // Also try to prepend AI articles
  try {
    const resp = await fetch('/.netlify/functions/get-articles?limit=3');
    if (resp.ok) {
      const data = await resp.json();
      if (data.articles && data.articles.length) {
        const aiHtml = data.articles.map((a, i) => `
          <li class="ai-generated">
            <span class="trend-num ai-badge">AI</span>
            <div class="trend-body">
              <a href="article.html?slug=${a.slug}">${a.title}</a>
              <time>${formatDate(a.date)} • Auto-generated</time>
            </div>
          </li>`).join('');
        el.insertAdjacentHTML('afterbegin', aiHtml);
      }
    }
  } catch(e) {}
}

// ---- Init current date ----
const dateEl = document.getElementById('currentDate');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-US',
    { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ---- Mobile nav ----
const navToggle = document.getElementById('navToggle');
const navList   = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => navList.classList.toggle('open'));
}

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
  });
});
