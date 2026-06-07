(function() {
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
];
const navHTML = navItems.map(n =>
`<li><a href="${n.href}" ${n.id === active ? 'class="active"' : ''}>${n.label}</a></li>`
).join('');
const logoSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 90" width="300" height="52" aria-label="AmericaPulse.live">
<rect x="2" y="18" width="52" height="38" rx="3" fill="#0B1F3A"/>
<rect x="2" y="18" width="22" height="20" fill="#0B1F3A"/>
<text x="5"  y="28" fill="white" font-size="5" font-family="sans-serif">★★★</text>
<text x="5"  y="34" fill="white" font-size="5" font-family="sans-serif">★★★</text>
<rect x="24" y="18" width="30" height="4"  fill="#C8102E"/>
<rect x="24" y="26" width="30" height="4"  fill="#C8102E"/>
<rect x="24" y="34" width="30" height="4"  fill="#C8102E"/>
<rect x="2"  y="38" width="52" height="4"  fill="#C8102E"/>
<rect x="2"  y="46" width="52" height="4"  fill="#C8102E"/>
<rect x="24" y="22" width="30" height="4"  fill="white"/>
<rect x="24" y="30" width="30" height="4"  fill="white"/>
<rect x="2"  y="42" width="52" height="4"  fill="white"/>
<rect x="2"  y="50" width="52" height="4"  fill="white"/>
<polyline points="58,40 72,40 76,40 79,26 82,54 85,26 88,40 96,40"
fill="none" stroke="#C8102E" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>
<g fill="#0B1F3A" opacity="0.85">
<rect x="97" y="22" width="6"  height="28"/>
<rect x="100" y="15" width="1.5" height="10"/>
<rect x="86" y="30" width="10" height="20"/>
<rect x="80" y="33" width="7"  height="17"/>
<rect x="74" y="35" width="6"  height="15"/>
<rect x="104" y="28" width="9"  height="22"/>
<rect x="114" y="31" width="8"  height="19"/>
<rect x="123" y="34" width="7"  height="16"/>
<rect x="131" y="36" width="6"  height="14"/>
</g>
<polyline points="140,40 152,40 155,40 158,26 161,54 164,26 167,40 178,40"
fill="none" stroke="#C8102E" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M178,36 Q210,28 230,38 Q250,48 270,34" fill="none" stroke="#C8102E" stroke-width="3" stroke-linecap="round"/>
<path d="M178,42 Q210,34 230,44 Q250,54 270,40" fill="none" stroke="#0B1F3A" stroke-width="2" stroke-linecap="round"/>
<polygon points="278,28  280,22  282,28  288,28  283,32  285,38  280,34  275,38  277,32  272,28"
fill="#C8102E"/>
<polygon points="278,28  280,23  282,28  287,28  283,31  285,37  280,33  275,37  277,31  273,28"
fill="white" opacity="0.5"/>
<text x="2" y="80" font-family="'Arial Black','Impact',sans-serif" font-size="22"
font-weight="900" font-style="italic" fill="#0B1F3A" letter-spacing="-0.5">America</text>
<text x="116" y="80" font-family="'Arial Black','Impact',sans-serif" font-size="22"
font-weight="900" font-style="italic" fill="#C8102E" letter-spacing="-0.5">Pulse</text>
<rect x="196" y="63" width="46" height="20" rx="4" fill="#0B1F3A"/>
<text x="199" y="78" font-family="'Arial Black','Impact',sans-serif" font-size="14"
font-weight="900" font-style="italic" fill="white" letter-spacing="0.5">.live</text>
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
<header class="site-header">
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
<button class="btn-subscribe" onclick="openModal('subscribe-modal')">Subscribe</button>
</div>
</div>
</header>
<nav class="main-nav">
<div class="container nav-inner">
<button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
<ul class="nav-list" id="navList">${navHTML}</ul>
</div>
</nav>
<div class="breaking-bar">
<div class="container breaking-inner">
<span class="breaking-label">BREAKING</span>
<div class="ticker-wrap">
<div class="ticker">
<span>Senate Climate Vote Draws Unprecedented Public Support &nbsp;•&nbsp;</span>
<span>Federal Reserve Signals Potential Rate Cuts in Q3 &nbsp;•&nbsp;</span>
<span>Hurricane Watch Issued for Gulf Coast as Category 3 Storm Approaches &nbsp;•&nbsp;</span>
<span>Supreme Court to Hear Landmark Digital Privacy Case &nbsp;•&nbsp;</span>
<span>NYSE Closes at Record High Amid Strong AI Earnings &nbsp;•&nbsp;</span>
<span>U.S. Soccer Clinches World Cup Qualifying Spot &nbsp;•&nbsp;</span>
<span>FDA Approves Breakthrough Alzheimer's Treatment &nbsp;•&nbsp;</span>
<span>Taylor Swift's Eras Tour Breaks All-Time Revenue Record at $2.1B &nbsp;•&nbsp;</span>
</div>
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
<a href="https://twitter.com" target="_blank" rel="noopener" aria-label="X / Twitter" title="Follow on X">𝕏</a>
<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" title="Follow on Facebook">📘</a>
<a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" title="Follow on Instagram">📸</a>
<a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" title="Watch on YouTube">▶️</a>
<a href="https://threads.net" target="_blank" rel="noopener" aria-label="Threads" title="Follow on Threads">🧵</a>
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
document.getElementById('navToggle').addEventListener('click', () => {
document.getElementById('navList').classList.toggle('open');
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
})();