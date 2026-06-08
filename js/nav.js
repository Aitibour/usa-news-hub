(function() {
// Apply theme immediately to avoid flash
(function() {
  var saved = localStorage.getItem('ap-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();
// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  });
}
const active = document.body.dataset.section || '';
const navItems = [
{ id:'', label:'Home', href:'index.html' },
{ id:'politics', label:'Politics', href:'politics.html' },
{ id:'business', label:'Business', href:'business.html' },
{ id:'technology', label:'Technology', href:'technology.html' },
{ id:'sports', label:'Sports', href:'sports.html' },
{ id:'health', label:'Health', href:'health.html' },
{ id:'world', label:'World', href:'world.html' },
{ id:'entertainment', label:'Entertainment', href:'entertainment.html' },
{ id:'opinion', label:'Opinion', href:'opinion.html' },
{ id:'latest', label:'Latest', href:'latest.html' },
];
const navHTML = navItems.map(n =>
`<li><a href="${n.href}" ${n.id === active ? 'class="active"' : ''}>${n.label}</a></li>`
).join('');
const logoSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 190" width="400" height="95" aria-label="AmericaPulse.live">
<defs>
  <!-- Canton: deep navy gradient -->
  <linearGradient id="lgo-canton" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#1545AA"/>
    <stop offset="100%" stop-color="#001A6E"/>
  </linearGradient>
  <!-- Red stripe: bright-to-dark for 3D depth -->
  <linearGradient id="lgo-red" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#E5001F"/>
    <stop offset="100%" stop-color="#A80015"/>
  </linearGradient>
  <!-- Ribbon red, solid then fades to transparent at right -->
  <linearGradient id="lgo-rib-r" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#C8102E"/>
    <stop offset="80%"  stop-color="#C8102E"/>
    <stop offset="100%" stop-color="#C8102E" stop-opacity="0"/>
  </linearGradient>
  <!-- Ribbon blue, solid then fades to transparent at right -->
  <linearGradient id="lgo-rib-b" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#002868"/>
    <stop offset="80%"  stop-color="#002868"/>
    <stop offset="100%" stop-color="#002868" stop-opacity="0"/>
  </linearGradient>
  <!-- EKG line: fade at both ends -->
  <linearGradient id="lgo-ekg" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#C8102E" stop-opacity=".3"/>
    <stop offset="20%"  stop-color="#C8102E"/>
    <stop offset="80%"  stop-color="#C8102E"/>
    <stop offset="100%" stop-color="#C8102E" stop-opacity=".3"/>
  </linearGradient>
  <!-- Star: silver/chrome -->
  <linearGradient id="lgo-star" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%"   stop-color="#FFFFFF"/>
    <stop offset="50%"  stop-color="#E0E0E0"/>
    <stop offset="100%" stop-color="#AAAAAA"/>
  </linearGradient>
  <!-- Drop shadow for flag -->
  <filter id="lgo-sh" x="-5%" y="-10%" width="120%" height="140%">
    <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,.25)"/>
  </filter>
</defs>

<!-- ── CITY SKYLINE (outlined stroke style — no fill) ── -->
<!-- Single connected path so the silhouette reads as one outline -->
<path d="
  M196,116 L196,72 L210,72 L210,58 L222,58 L222,66 L236,66 L236,52 L247,52 L247,62
  L262,62 L262,49 L274,49 L274,28 L274,5 L283,5 L283,28 L296,28 L296,116
  M296,50 L314,50 L314,41 L329,41 L329,56 L347,56 L347,49 L360,49 L360,63
  L377,63 L377,67 L391,67 L391,58 L403,58 L403,116
  M196,116 L403,116"
  fill="none" stroke="#AAAAAA" stroke-width="1.5" stroke-linejoin="miter" opacity=".7"/>

<!-- ── AMERICAN FLAG (angled -12°, drop shadow) ── -->
<g transform="translate(8,12) rotate(-12,82,52)" filter="url(#lgo-sh)">
  <!-- White flag base -->
  <rect x="0" y="0" width="162" height="102" rx="3" fill="white"/>
  <!-- 7 red stripes — full width below canton, partial above -->
  <rect x="0"  y="0"  width="162" height="14.5" fill="url(#lgo-red)"/>
  <rect x="0"  y="29" width="162" height="14.5" fill="url(#lgo-red)"/>
  <rect x="0"  y="58" width="162" height="14.5" fill="url(#lgo-red)"/>
  <rect x="0"  y="87" width="162" height="15"   fill="url(#lgo-red)"/>
  <rect x="68" y="14.5" width="94" height="14.5" fill="url(#lgo-red)"/>
  <rect x="68" y="43.5" width="94" height="14.5" fill="url(#lgo-red)"/>
  <rect x="68" y="72.5" width="94" height="14.5" fill="url(#lgo-red)"/>
  <!-- Blue canton -->
  <rect x="0" y="0" width="68" height="58" fill="url(#lgo-canton)"/>
  <!-- Stars: 5 rows alternating 3-2-3-2-3 -->
  <text x="3"  y="13" fill="white" font-size="9.5" font-family="serif" letter-spacing="3.5">★ ★ ★</text>
  <text x="9"  y="23" fill="white" font-size="9.5" font-family="serif" letter-spacing="5">★ ★</text>
  <text x="3"  y="33" fill="white" font-size="9.5" font-family="serif" letter-spacing="3.5">★ ★ ★</text>
  <text x="9"  y="43" fill="white" font-size="9.5" font-family="serif" letter-spacing="5">★ ★</text>
  <text x="3"  y="53" fill="white" font-size="9.5" font-family="serif" letter-spacing="3.5">★ ★ ★</text>
</g>

<!-- ── TRAILING WAVE STRIPES (flag right edge → EKG) ── -->
<!-- These thick curved bands connect the flag to the EKG line -->
<g fill="none" stroke-linecap="round">
  <path d="M162,20 Q200,13 245,20" stroke="#C8102E" stroke-width="14"/>
  <path d="M162,34 Q202,27 248,34" stroke="white"   stroke-width="11"/>
  <path d="M162,48 Q200,42 244,49" stroke="#C8102E" stroke-width="12"/>
  <path d="M162,62 Q198,57 240,63" stroke="white"   stroke-width="10"/>
  <path d="M162,76 Q196,72 234,77" stroke="#C8102E" stroke-width="9" stroke-opacity=".7"/>
</g>

<!-- ── EKG HEARTBEAT LINE ── -->
<!-- soft glow -->
<path d="M220,76 L248,76 L254,63 L260,76 L275,76 L281,67 L287,76 L304,76 L314,76 L325,8 L338,108 L348,76 L558,76 L566,62 L573,76 L594,76"
  fill="none" stroke="#C8102E" stroke-width="14" stroke-opacity=".08" stroke-linecap="round" stroke-linejoin="round"/>
<!-- main line -->
<path d="M220,76 L248,76 L254,63 L260,76 L275,76 L281,67 L287,76 L304,76 L314,76 L325,8 L338,108 L348,76 L558,76 L566,62 L573,76 L594,76"
  fill="none" stroke="url(#lgo-ekg)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>

<!-- ── RIBBON: 3 thick solid RWB curved stripes ── -->
<!-- Red (top) — solid, no fade, ends where star begins -->
<path d="M558,35 Q626,25 678,39 Q696,44 714,52 L711,65 Q693,57 675,52 Q623,38 558,48 Z"
  fill="#C8102E"/>
<!-- White (middle) -->
<path d="M558,48 Q623,38 675,52 Q693,57 711,65 L708,78 Q690,70 672,65 Q620,51 558,61 Z"
  fill="white"/>
<!-- Blue/navy (bottom) -->
<path d="M558,61 Q620,51 672,65 Q690,70 708,78 L705,91 Q687,83 669,78 Q617,64 558,74 Z"
  fill="#002868"/>
<!-- Stars on ribbon: large white star + smaller -->
<text x="570" y="65" fill="white" font-size="17" font-family="serif">★</text>
<text x="600" y="63" fill="white" font-size="14" font-family="serif" opacity=".9">★</text>

<!-- ── SHOOTING STAR (right, clean outline style) ── -->
<g transform="translate(710,24)">
  <!-- Stroke-only star (no fill / very light fill like the brand) -->
  <polygon points="22,0 27,16 44,16 31,26 36,43 22,33 8,43 13,26 0,16 17,16"
    fill="white" fill-opacity=".6" stroke="#BBBBBB" stroke-width="2" transform="scale(.9)"/>
  <!-- Motion trail lines (to the left) -->
  <line x1="-4"  y1="10" x2="-28" y2="10" stroke="#BBBBBB" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="-4"  y1="17" x2="-36" y2="17" stroke="#BBBBBB" stroke-width="2"   stroke-linecap="round"/>
  <line x1="-4"  y1="24" x2="-26" y2="24" stroke="#BBBBBB" stroke-width="1.5" stroke-linecap="round"/>
</g>

<!-- ── WORDMARK ── -->
<!-- "America" — DARK NAVY (matching brand) -->
<text x="82" y="168"
  font-family="'Arial Black','Franklin Gothic Heavy',Impact,sans-serif"
  font-size="50" font-weight="900" font-style="italic" letter-spacing="-1"
  fill="#002868">America</text>
<!-- "Pulse" — red -->
<text x="375" y="168"
  font-family="'Arial Black','Franklin Gothic Heavy',Impact,sans-serif"
  font-size="50" font-weight="900" font-style="italic" letter-spacing="-1"
  fill="#C8102E">Pulse</text>
<!-- ".live" — RED badge (matching brand) with white text -->
<rect x="545" y="130" width="90" height="44" rx="8" fill="#C8102E"/>
<text x="590" y="164"
  font-family="'Arial Black','Franklin Gothic Heavy',Impact,sans-serif"
  font-size="27" font-weight="700" font-style="italic"
  fill="white" text-anchor="middle">.live</text>
</svg>`;
const header = `
<div class="top-bar">
<div class="container top-bar-inner">
<span class="top-bar-date" id="currentDate"></span>
<div class="top-bar-links">
<a href="#" onclick="openModal('subscribe-modal');return false;">Subscribe</a>
<a href="#" onclick="openModal('edition-modal');return false;">E-Edition</a>
<a href="#" onclick="openModal('signin-modal');return false;">Sign In</a>
</div>
</div>
</div>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header" role="banner">
<div class="container header-inner">
<a href="index.html" class="logo-link" style="text-decoration:none;display:flex;align-items:center">
${logoSVG}
</a>
<div class="header-search">
<input type="text" id="searchInput" placeholder="Search stories, topics…" />
<button class="search-btn" onclick="doSearch()" aria-label="Search">
<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
</button>
</div>
<div class="header-actions">
<button class="saved-nav-link theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark/light mode"><svg id="theme-icon-dark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg><svg id="theme-icon-light" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></button>
<a href="/history.html" class="saved-nav-link" aria-label="Reading history" title="Reading history"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></a>
<a href="/saved.html" class="saved-nav-link" aria-label="Saved articles" title="Saved articles"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg><span class="saved-badge" style="display:none"></span></a>
<button class="btn-subscribe" onclick="openModal('subscribe-modal')">Subscribe</button>
</div>
</div>
</header>
<nav class="main-nav" role="navigation" aria-label="Main navigation">
<div class="container nav-inner">
<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navList">☰</button>
<ul class="nav-list" id="navList">${navHTML}<li class="nav-subscribe-mobile"><a href="#" onclick="openModal('subscribe-modal');return false;" style="color:var(--gold)">Subscribe</a></li></ul>
</div>
</nav>
<div class="breaking-bar">
<div class="container breaking-inner">
<span class="breaking-label">BREAKING</span>
<div class="ticker-wrap">
<div class="ticker" id="breaking-ticker"></div>
</div>
</div>
</div>`;
const footer = `
<footer class="site-footer">
<div class="container">
<div class="footer-top">
<div class="footer-brand">
<div class="footer-logo-wrap" style="margin-bottom:16px">
<a href="index.html">${logoSVG}</a>
</div>
<p>Your trusted source for breaking news, in-depth reporting, and analysis on politics, business, technology, and culture across America and beyond.</p>
<div class="social-links">
<a href="https://twitter.com" target="_blank" rel="noopener" aria-label="X / Twitter" title="Follow on X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" title="Follow on Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
<a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" title="Follow on Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
<a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" title="Watch on YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
</div>
</div>
<div class="footer-cols">
<div class="footer-col">
<h4>Sections</h4>
<ul>
<li><a href="politics.html">Politics</a></li>
<li><a href="business.html">Business</a></li>
<li><a href="technology.html">Technology</a></li>
<li><a href="sports.html">Sports</a></li>
<li><a href="health.html">Health</a></li>
<li><a href="world.html">World</a></li>
<li><a href="entertainment.html">Entertainment</a></li>
<li><a href="opinion.html">Opinion</a></li>
</ul>
</div>
<div class="footer-col">
<h4>Company</h4>
<ul>
<li><a href="#" onclick="openModal('about-modal');return false;">About Us</a></li>
<li><a href="#" onclick="openModal('careers-modal');return false;">Careers</a></li>
<li><a href="#" onclick="openModal('advertise-modal');return false;">Advertise</a></li>
<li><a href="#" onclick="openModal('contact-modal');return false;">Contact</a></li>
</ul>
</div>
<div class="footer-col">
<h4>Subscribe</h4>
<ul>
<li><a href="#" onclick="openModal('subscribe-modal');return false;">Daily Newsletter</a></li>
<li><a href="#" onclick="openModal('alerts-modal');return false;">Breaking Alerts</a></li>
<li><a href="#" onclick="openModal('rss-modal');return false;">RSS Feeds</a></li>
<li><a href="#" onclick="openModal('podcast-modal');return false;">Podcast</a></li>
</ul>
</div>
</div>
</div>
<div class="footer-bottom">
<span>© 2026 AmericaPulse.live — All rights reserved.</span>
<div class="footer-legal">
<a href="#" onclick="openModal('privacy-modal');return false;">Privacy Policy</a>
<a href="#" onclick="openModal('terms-modal');return false;">Terms of Service</a>
<a href="#" onclick="openModal('cookies-modal');return false;">Cookie Settings</a>
</div>
</div>
</div>
</footer>`;
document.getElementById('site-header').innerHTML = header;
document.getElementById('site-footer').innerHTML = footer;
const dateEl = document.getElementById('currentDate');
if (dateEl) {
dateEl.textContent = new Date().toLocaleDateString('en-US',
{ weekday:'long', year:'numeric', month:'long', day:'numeric' });
}
document.getElementById('navToggle').addEventListener('click', function() {
var list = document.getElementById('navList');
var open = list.classList.toggle('open');
this.setAttribute('aria-expanded', open ? 'true' : 'false');
});
window.doSearch = function() {
const q = document.getElementById('searchInput').value.trim();
if (!q) return;
window.location.href = `search.html?q=${encodeURIComponent(q)}`;
};
document.getElementById('searchInput')?.addEventListener('keydown', e => {
if (e.key === 'Enter') doSearch();
});
if (!document.title.includes('AmericaPulse')) {
document.title = document.title.replace('USA News Hub', 'AmericaPulse.live');
}
// Populate breaking ticker from latest article titles (doubled for seamless loop)
(function() {
var ticker = document.getElementById('breaking-ticker');
if (!ticker) return;
var arts = typeof getAllArticles === 'function' ? getAllArticles(8) : [];
if (!arts.length) {
  // fallback until articles-meta.js loads
  window.addEventListener('load', function() {
    arts = typeof getAllArticles === 'function' ? getAllArticles(8) : [];
    if (arts.length) buildTicker(ticker, arts);
  });
} else {
  buildTicker(ticker, arts);
}
})();
function buildTicker(el, arts) {
var items = arts.map(function(a) {
  return '<span><a href="article.html?slug=' + encodeURIComponent((a.slug||'')) + '" style="color:inherit;text-decoration:none">' + (a.title||'').replace(/</g,'&lt;') + '</a> &nbsp;•&nbsp; </span>';
}).join('');
el.innerHTML = items + items; // doubled for infinite loop
}
var _modalsReady = false, _modalQueue = [];
window.openModal = function(id) {
if (_modalsReady) {
document.getElementById(id).classList.add('open');
document.body.style.overflow = 'hidden';
} else {
_modalQueue.push(id);
var s = document.createElement('script');
s.src = 'js/modals.js';
s.onload = function() {
_modalsReady = true;
if (_modalQueue.length) { window.openModal(_modalQueue.shift()); _modalQueue = []; }
};
document.head.appendChild(s);
}
};
window.closeModal = function(id) {
var el = document.getElementById(id);
if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
};

// Back-to-top button
var btt = document.createElement('button');
btt.id = 'back-to-top';
btt.setAttribute('aria-label', 'Back to top');
btt.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>';
document.body.appendChild(btt);
window.addEventListener('scroll', function() {
  btt.classList.toggle('btt-visible', window.scrollY > 400);
}, { passive: true });
btt.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reading progress bar (article pages only)
if (document.getElementById('article-content')) {
  var bar = document.createElement('div');
  bar.id = 'read-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    var doc = document.documentElement;
    var pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });
}

// Cookie consent banner
(function() {
  if (localStorage.getItem('cookie-ok')) return;
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = '<p>We use cookies to improve your experience and analyze traffic. By continuing, you agree to our use of cookies.</p>'
    + '<div class="cookie-actions">'
    + '<button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accept All</button>'
    + '<button id="cookie-decline" class="cookie-btn">Decline</button>'
    + '<a href="/privacy.html" class="cookie-link">Privacy Policy</a>'
    + '</div>';
  document.body.appendChild(banner);
  setTimeout(function() { banner.classList.add('cookie-show'); }, 300);
  document.getElementById('cookie-accept').addEventListener('click', function() {
    localStorage.setItem('cookie-ok', '1');
    banner.classList.remove('cookie-show');
    setTimeout(function() { banner.remove(); }, 400);
  });
  document.getElementById('cookie-decline').addEventListener('click', function() {
    localStorage.setItem('cookie-ok', 'declined');
    banner.classList.remove('cookie-show');
    setTimeout(function() { banner.remove(); }, 400);
  });
})();

// Theme toggle
(function() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ap-theme', theme);
    var isDark = theme === 'dark';
    document.getElementById('theme-icon-dark').style.display  = isDark ? 'none'  : 'block';
    document.getElementById('theme-icon-light').style.display = isDark ? 'block' : 'none';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  // Init icon state
  applyTheme(localStorage.getItem('ap-theme') || 'light');
  btn.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();

// Init bookmark badge count
if (typeof updateBookmarkBadge === 'function') updateBookmarkBadge();

})();