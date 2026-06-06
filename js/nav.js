// Inject shared header + nav into every page
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

  const header = `
  <div class="top-bar">
    <div class="container top-bar-inner">
      <span class="top-bar-date" id="currentDate"></span>
      <div class="top-bar-links">
        <a href="#">Subscribe</a>
        <a href="#">E-Edition</a>
        <a href="#">Sign In</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="logo" style="text-decoration:none">
        <span class="logo-stars">★★★</span>
        <div class="logo-text">
          <span class="logo-usa">USA</span>
          <span class="logo-news">NEWS HUB</span>
        </div>
        <span class="logo-stars">★★★</span>
      </a>
      <div class="header-search">
        <input type="text" id="searchInput" placeholder="Search stories, topics…" />
        <button class="search-btn" onclick="doSearch()" aria-label="Search">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
      </div>
      <div class="header-actions">
        <button class="btn-subscribe">Subscribe</button>
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
        </div>
      </div>
    </div>
  </div>`;

  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-stars">★★★</span>
            <div class="logo-text">
              <span class="logo-usa">USA</span>
              <span class="logo-news">NEWS HUB</span>
            </div>
          </div>
          <p>Your trusted source for breaking news, in-depth reporting, and analysis on politics, business, technology, and culture across America and beyond.</p>
          <div class="social-links">
            <a href="#" aria-label="X">𝕏</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="YouTube">▶</a>
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
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Advertise</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Subscribe</h4>
            <ul>
              <li><a href="#">Daily Newsletter</a></li>
              <li><a href="#">Breaking Alerts</a></li>
              <li><a href="#">RSS Feeds</a></li>
              <li><a href="#">Podcast</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 USA News Hub. All rights reserved.</span>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </div>
  </footer>`;

  document.getElementById('site-header').innerHTML = header;
  document.getElementById('site-footer').innerHTML = footer;

  // Search function
  window.doSearch = function() {
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return;
    window.location.href = `search.html?q=${encodeURIComponent(q)}`;
  };
  document.getElementById('searchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
})();
