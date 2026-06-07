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

  // AmericaPulse.live SVG logo — flag + pulse line + skyline + star
  const logoSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 90" width="300" height="52" aria-label="AmericaPulse.live">
    <!-- American flag block -->
    <rect x="2" y="18" width="52" height="38" rx="3" fill="#0B1F3A"/>
    <!-- Flag stars field -->
    <rect x="2" y="18" width="22" height="20" fill="#0B1F3A"/>
    <!-- Stars -->
    <text x="5"  y="28" fill="white" font-size="5" font-family="sans-serif">★★★</text>
    <text x="5"  y="34" fill="white" font-size="5" font-family="sans-serif">★★★</text>
    <!-- Red stripes -->
    <rect x="24" y="18" width="30" height="4"  fill="#C8102E"/>
    <rect x="24" y="26" width="30" height="4"  fill="#C8102E"/>
    <rect x="24" y="34" width="30" height="4"  fill="#C8102E"/>
    <rect x="2"  y="38" width="52" height="4"  fill="#C8102E"/>
    <rect x="2"  y="46" width="52" height="4"  fill="#C8102E"/>
    <!-- White stripes -->
    <rect x="24" y="22" width="30" height="4"  fill="white"/>
    <rect x="24" y="30" width="30" height="4"  fill="white"/>
    <rect x="2"  y="42" width="52" height="4"  fill="white"/>
    <rect x="2"  y="50" width="52" height="4"  fill="white"/>

    <!-- Pulse / heartbeat line with NYC skyline embedded -->
    <!-- Base line -->
    <polyline points="58,40 72,40 76,40 79,26 82,54 85,26 88,40 96,40"
              fill="none" stroke="#C8102E" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- City skyline silhouette -->
    <g fill="#0B1F3A" opacity="0.85">
      <!-- Empire State Building center -->
      <rect x="97" y="22" width="6"  height="28"/>
      <rect x="100" y="15" width="1.5" height="10"/>
      <!-- buildings left -->
      <rect x="86" y="30" width="10" height="20"/>
      <rect x="80" y="33" width="7"  height="17"/>
      <rect x="74" y="35" width="6"  height="15"/>
      <!-- buildings right -->
      <rect x="104" y="28" width="9"  height="22"/>
      <rect x="114" y="31" width="8"  height="19"/>
      <rect x="123" y="34" width="7"  height="16"/>
      <rect x="131" y="36" width="6"  height="14"/>
    </g>
    <!-- Pulse continues right -->
    <polyline points="140,40 152,40 155,40 158,26 161,54 164,26 167,40 178,40"
              fill="none" stroke="#C8102E" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>

    <!-- Swoosh ribbon right -->
    <path d="M178,36 Q210,28 230,38 Q250,48 270,34" fill="none" stroke="#C8102E" stroke-width="3" stroke-linecap="round"/>
    <path d="M178,42 Q210,34 230,44 Q250,54 270,40" fill="none" stroke="#0B1F3A" stroke-width="2" stroke-linecap="round"/>

    <!-- Shooting star -->
    <polygon points="278,28  280,22  282,28  288,28  283,32  285,38  280,34  275,38  277,32  272,28"
             fill="#C8102E"/>
    <polygon points="278,28  280,23  282,28  287,28  283,31  285,37  280,33  275,37  277,31  273,28"
             fill="white" opacity="0.5"/>

    <!-- Text: AmericaPulse -->
    <text x="2" y="80" font-family="'Arial Black','Impact',sans-serif" font-size="22"
          font-weight="900" font-style="italic" fill="#0B1F3A" letter-spacing="-0.5">America</text>
    <text x="116" y="80" font-family="'Arial Black','Impact',sans-serif" font-size="22"
          font-weight="900" font-style="italic" fill="#C8102E" letter-spacing="-0.5">Pulse</text>
    <!-- .live badge -->
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
        <span>© 2026 AmericaPulse.live — All rights reserved.</span>
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

  // Set current date
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-US',
      { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }

  // Mobile nav toggle
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navList').classList.toggle('open');
  });

  // Search
  window.doSearch = function() {
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return;
    window.location.href = `search.html?q=${encodeURIComponent(q)}`;
  };
  document.getElementById('searchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });

  // Update page title
  if (!document.title.includes('AmericaPulse')) {
    document.title = document.title.replace('USA News Hub', 'AmericaPulse.live');
  }

  // ── Modals ──────────────────────────────────────────────────
  const modalCSS = `
    .ap-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center}
    .ap-modal-overlay.open{display:flex}
    .ap-modal{background:#fff;border-radius:10px;padding:36px 32px;max-width:420px;width:90%;position:relative;box-shadow:0 8px 40px rgba(0,0,0,.25)}
    .ap-modal h2{margin:0 0 6px;font-size:22px;color:#0B1F3A}
    .ap-modal p{margin:0 0 20px;color:#555;font-size:14px}
    .ap-modal input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:15px;margin-bottom:12px}
    .ap-modal .btn-primary{width:100%;padding:11px;background:#C8102E;color:#fff;border:none;border-radius:6px;font-size:15px;font-weight:700;cursor:pointer}
    .ap-modal .btn-primary:hover{background:#a30d25}
    .ap-modal .modal-close{position:absolute;top:12px;right:16px;font-size:22px;cursor:pointer;color:#888;background:none;border:none;line-height:1}
    .ap-modal .modal-divider{text-align:center;color:#aaa;font-size:13px;margin:14px 0}
    .ap-modal .btn-secondary{width:100%;padding:11px;background:#f4f4f4;color:#0B1F3A;border:1px solid #ddd;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:8px}
    .ap-modal .modal-note{text-align:center;font-size:12px;color:#aaa;margin-top:14px}
    .ap-modal .plan-card{border:1px solid #ddd;border-radius:8px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:border-color .2s}
    .ap-modal .plan-card:hover,.ap-modal .plan-card.selected{border-color:#C8102E;background:#fff8f8}
    .ap-modal .plan-card strong{display:block;font-size:16px;color:#0B1F3A}
    .ap-modal .plan-card span{font-size:13px;color:#777}
    .ap-modal .plan-price{float:right;font-weight:700;color:#C8102E;font-size:17px}
    .edition-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
    .edition-card{border:1px solid #ddd;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:border-color .2s}
    .edition-card:hover{border-color:#C8102E;background:#fff8f8}
    .edition-card .ed-icon{font-size:28px;margin-bottom:6px}
    .edition-card strong{display:block;font-size:13px;color:#0B1F3A}
    .edition-card span{font-size:11px;color:#888}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = modalCSS;
  document.head.appendChild(styleEl);

  const modalsHTML = `
  <!-- Subscribe Modal -->
  <div class="ap-modal-overlay" id="subscribe-modal" onclick="if(event.target===this)closeModal('subscribe-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('subscribe-modal')">✕</button>
      <h2>Subscribe to AmericaPulse</h2>
      <p>Stay informed with unlimited access to breaking news and in-depth reporting.</p>
      <div class="plan-card selected" onclick="selectPlan(this,'digital')">
        <span class="plan-price">$9.99/mo</span>
        <strong>Digital Access</strong>
        <span>Unlimited articles, newsletters, mobile app</span>
      </div>
      <div class="plan-card" onclick="selectPlan(this,'annual')">
        <span class="plan-price">$79/yr</span>
        <strong>Annual Plan</strong>
        <span>Save 34% — best value, cancel anytime</span>
      </div>
      <div class="plan-card" onclick="selectPlan(this,'free')">
        <span class="plan-price">Free</span>
        <strong>Newsletter Only</strong>
        <span>Daily briefing email, 5 free articles/month</span>
      </div>
      <br/>
      <input type="email" id="sub-email" placeholder="Your email address" />
      <button class="btn-primary" onclick="handleSubscribe()">Continue →</button>
      <p class="modal-note">No credit card required for free plan. Cancel anytime.</p>
    </div>
  </div>

  <!-- Sign In Modal -->
  <div class="ap-modal-overlay" id="signin-modal" onclick="if(event.target===this)closeModal('signin-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('signin-modal')">✕</button>
      <h2>Sign In</h2>
      <p>Access your AmericaPulse account.</p>
      <input type="email" id="si-email" placeholder="Email address" />
      <input type="password" id="si-pass" placeholder="Password" />
      <button class="btn-primary" onclick="handleSignIn()">Sign In</button>
      <div class="modal-divider">or continue with</div>
      <button class="btn-secondary" onclick="handleSocialAuth('Google')">🔵 Continue with Google</button>
      <button class="btn-secondary" onclick="handleSocialAuth('Apple')">🍎 Continue with Apple</button>
      <p class="modal-note"><a href="#" onclick="openModal('subscribe-modal');closeModal('signin-modal');return false;" style="color:#C8102E">Create an account</a> &nbsp;·&nbsp; <a href="#" onclick="alert('Password reset email sent!');return false;" style="color:#888">Forgot password?</a></p>
    </div>
  </div>

  <!-- E-Edition Modal -->
  <div class="ap-modal-overlay" id="edition-modal" onclick="if(event.target===this)closeModal('edition-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('edition-modal')">✕</button>
      <h2>E-Edition</h2>
      <p>Read today's AmericaPulse in digital newspaper format.</p>
      <div class="edition-grid">
        <div class="edition-card" onclick="alert('Opening Today\\'s Edition…')">
          <div class="ed-icon">📰</div>
          <strong>Today's Edition</strong>
          <span>${new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
        </div>
        <div class="edition-card" onclick="alert('Opening Weekend Edition…')">
          <div class="ed-icon">📋</div>
          <strong>Weekend Edition</strong>
          <span>Full Sunday paper</span>
        </div>
        <div class="edition-card" onclick="alert('Opening Archive…')">
          <div class="ed-icon">🗂</div>
          <strong>Archive</strong>
          <span>Past 30 days</span>
        </div>
        <div class="edition-card" onclick="alert('Downloading PDF…')">
          <div class="ed-icon">⬇️</div>
          <strong>Download PDF</strong>
          <span>Save for offline</span>
        </div>
      </div>
      <button class="btn-primary" onclick="handleSignIn();closeModal('edition-modal');openModal('signin-modal')">Sign In to Read →</button>
      <p class="modal-note">E-Edition included with all paid subscriptions.</p>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalsHTML);

  // Modal helpers
  window.openModal = function(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.ap-modal-overlay.open').forEach(m => {
        m.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  window.selectPlan = function(el, plan) {
    el.closest('.ap-modal').querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    el.dataset.plan = plan;
  };

  window.handleSubscribe = function() {
    const email = document.getElementById('sub-email').value.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
    closeModal('subscribe-modal');
    alert(`Welcome to AmericaPulse!\n\nA confirmation email has been sent to:\n${email}`);
  };

  window.handleSignIn = function() {
    const email = document.getElementById('si-email')?.value.trim();
    if (!email || !email.includes('@')) { alert('Please enter your email address.'); return; }
    closeModal('signin-modal');
    alert(`Signed in as ${email}\n\nWelcome back to AmericaPulse!`);
  };

  window.handleSocialAuth = function(provider) {
    closeModal('signin-modal');
    alert(`Connecting to ${provider}…\n\n(Social login would open a ${provider} OAuth popup in production.)`);
  };
})();
