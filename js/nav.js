// Inject shared header + nav into every page
(function() {
  const active = document.body.dataset.section || '';
  const navItems = [
    { id:'', label:'🏠 Home', href:'index.html' },
    { id:'politics', label:'🏛️ Politics', href:'politics.html' },
    { id:'business', label:'📈 Business', href:'business.html' },
    { id:'technology', label:'💻 Technology', href:'technology.html' },
    { id:'sports', label:'🏆 Sports', href:'sports.html' },
    { id:'health', label:'🏥 Health', href:'health.html' },
    { id:'world', label:'🌐 World', href:'world.html' },
    { id:'entertainment', label:'🎬 Entertainment', href:'entertainment.html' },
    { id:'opinion', label:'✍️ Opinion', href:'opinion.html' },
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
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="X / Twitter" title="Follow on X">𝕏</a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" title="Follow on Facebook">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" title="Follow on Instagram">📸</a>
            <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" title="Watch on YouTube">▶️</a>
            <a href="https://threads.net" target="_blank" rel="noopener" aria-label="Threads" title="Follow on Threads">🧵</a>
          </div>
        </div>
        <div class="footer-cols">
          <div class="footer-col">
            <h4>📰 Sections</h4>
            <ul>
              <li><a href="politics.html">🏛️ Politics</a></li>
              <li><a href="business.html">📈 Business</a></li>
              <li><a href="technology.html">💻 Technology</a></li>
              <li><a href="sports.html">🏆 Sports</a></li>
              <li><a href="health.html">🏥 Health</a></li>
              <li><a href="world.html">🌐 World</a></li>
              <li><a href="entertainment.html">🎬 Entertainment</a></li>
              <li><a href="opinion.html">✍️ Opinion</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>🏢 Company</h4>
            <ul>
              <li><a href="#" onclick="openModal('about-modal');return false;">ℹ️ About Us</a></li>
              <li><a href="#" onclick="openModal('careers-modal');return false;">💼 Careers</a></li>
              <li><a href="#" onclick="openModal('advertise-modal');return false;">📣 Advertise</a></li>
              <li><a href="#" onclick="openModal('contact-modal');return false;">✉️ Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>📬 Subscribe</h4>
            <ul>
              <li><a href="#" onclick="openModal('subscribe-modal');return false;">📧 Daily Newsletter</a></li>
              <li><a href="#" onclick="openModal('alerts-modal');return false;">🔔 Breaking Alerts</a></li>
              <li><a href="#" onclick="openModal('rss-modal');return false;">📡 RSS Feeds</a></li>
              <li><a href="#" onclick="openModal('podcast-modal');return false;">🎙️ Podcast</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 AmericaPulse.live — All rights reserved.</span>
        <div class="footer-legal">
          <a href="#" onclick="openModal('privacy-modal');return false;">🔒 Privacy Policy</a>
          <a href="#" onclick="openModal('terms-modal');return false;">📜 Terms of Service</a>
          <a href="#" onclick="openModal('cookies-modal');return false;">🍪 Cookie Settings</a>
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
      <h2>📰 E-Edition</h2>
      <p>Read today's AmericaPulse in digital newspaper format.</p>
      <div class="edition-grid">
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon">📰</div>
          <strong>Today's Edition</strong>
          <span>${new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
        </div>
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon">📋</div>
          <strong>Weekend Edition</strong>
          <span>Full Sunday paper</span>
        </div>
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon">🗂️</div>
          <strong>Archive</strong>
          <span>Past 30 days</span>
        </div>
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon">⬇️</div>
          <strong>Download PDF</strong>
          <span>Save for offline</span>
        </div>
      </div>
      <button class="btn-primary" onclick="closeModal('edition-modal');openModal('signin-modal')">🔑 Sign In to Read →</button>
      <p class="modal-note">E-Edition included with all paid subscriptions.</p>
    </div>
  </div>

  <!-- About Us Modal -->
  <div class="ap-modal-overlay" id="about-modal" onclick="if(event.target===this)closeModal('about-modal')">
    <div class="ap-modal" style="max-width:520px">
      <button class="modal-close" onclick="closeModal('about-modal')">✕</button>
      <h2>ℹ️ About AmericaPulse</h2>
      <p style="color:#333;line-height:1.7">AmericaPulse.live is a digital news publication covering the stories that shape America — from Capitol Hill to Main Street. Founded in 2020, we are committed to fast, fair, and factual journalism.</p>
      <p style="color:#333;line-height:1.7">Our team of reporters, editors, and analysts cover <strong>Politics, Business, Technology, Sports, Health, World Affairs, Entertainment,</strong> and <strong>Opinion</strong> — delivering breaking news and in-depth analysis 24/7.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:28px">📰</div><strong>400+</strong><div style="font-size:12px;color:#777">Original Articles</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:28px">🌎</div><strong>8</strong><div style="font-size:12px;color:#777">News Sections</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:28px">⚡</div><strong>Daily</strong><div style="font-size:12px;color:#777">Live Updates</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:28px">🆓</div><strong>Free</strong><div style="font-size:12px;color:#777">To Read</div></div>
      </div>
      <button class="btn-primary" onclick="closeModal('about-modal');openModal('contact-modal')">✉️ Get In Touch</button>
    </div>
  </div>

  <!-- Contact Modal -->
  <div class="ap-modal-overlay" id="contact-modal" onclick="if(event.target===this)closeModal('contact-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('contact-modal')">✕</button>
      <h2>✉️ Contact Us</h2>
      <p>We'd love to hear from you — tips, feedback, corrections, or partnerships.</p>
      <input type="text" id="contact-name" placeholder="👤 Your name" />
      <input type="email" id="contact-email" placeholder="📧 Your email" />
      <select id="contact-subject" style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:15px;margin-bottom:12px;background:#fff">
        <option value="">📌 Select subject…</option>
        <option>📰 News Tip</option>
        <option>✏️ Correction Request</option>
        <option>🤝 Partnership / Advertising</option>
        <option>💬 General Feedback</option>
        <option>⚖️ Legal Inquiry</option>
      </select>
      <textarea id="contact-msg" placeholder="Your message…" style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:15px;min-height:100px;margin-bottom:12px;resize:vertical;font-family:inherit"></textarea>
      <button class="btn-primary" onclick="handleContact()">📤 Send Message</button>
      <p class="modal-note">📍 newsdesk@americapulse.live &nbsp;·&nbsp; Response within 24–48 hours</p>
    </div>
  </div>

  <!-- Careers Modal -->
  <div class="ap-modal-overlay" id="careers-modal" onclick="if(event.target===this)closeModal('careers-modal')">
    <div class="ap-modal" style="max-width:500px">
      <button class="modal-close" onclick="closeModal('careers-modal')">✕</button>
      <h2>💼 Join Our Team</h2>
      <p>We're always looking for passionate journalists, editors, and digital media professionals.</p>
      <div style="margin-bottom:12px">
        <div style="border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:8px">
          <strong>📝 Staff Reporter – Politics</strong><span style="float:right;font-size:12px;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px">Open</span>
          <div style="font-size:13px;color:#777;margin-top:4px">Washington D.C. · Full-time</div>
        </div>
        <div style="border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:8px">
          <strong>💻 Tech Reporter</strong><span style="float:right;font-size:12px;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px">Open</span>
          <div style="font-size:13px;color:#777;margin-top:4px">Remote · Full-time</div>
        </div>
        <div style="border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:8px">
          <strong>🎨 Multimedia Editor</strong><span style="float:right;font-size:12px;background:#fff3e0;color:#e65100;padding:2px 8px;border-radius:10px">Closing Soon</span>
          <div style="font-size:13px;color:#777;margin-top:4px">New York · Full-time</div>
        </div>
        <div style="border:1px solid #eee;border-radius:8px;padding:14px">
          <strong>📊 Data Journalist</strong><span style="float:right;font-size:12px;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px">Open</span>
          <div style="font-size:13px;color:#777;margin-top:4px">Remote · Contract</div>
        </div>
      </div>
      <button class="btn-primary" onclick="closeModal('careers-modal');openModal('contact-modal')">📤 Send Your Resume</button>
    </div>
  </div>

  <!-- Advertise Modal -->
  <div class="ap-modal-overlay" id="advertise-modal" onclick="if(event.target===this)closeModal('advertise-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('advertise-modal')">✕</button>
      <h2>📣 Advertise with Us</h2>
      <p>Reach millions of engaged American news readers across desktop, mobile, and newsletters.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:24px">🖥️</div><strong>Display Ads</strong><div style="font-size:12px;color:#777">Banner & sidebar placements</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:24px">📧</div><strong>Newsletter Ads</strong><div style="font-size:12px;color:#777">Daily briefing sponsor</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:24px">✍️</div><strong>Sponsored Content</strong><div style="font-size:12px;color:#777">Native articles</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:24px">📱</div><strong>Social Campaigns</strong><div style="font-size:12px;color:#777">Cross-platform reach</div></div>
      </div>
      <button class="btn-primary" onclick="closeModal('advertise-modal');openModal('contact-modal')">📩 Request Media Kit</button>
      <p class="modal-note">ads@americapulse.live · CPM rates from $4.50</p>
    </div>
  </div>

  <!-- Breaking Alerts Modal -->
  <div class="ap-modal-overlay" id="alerts-modal" onclick="if(event.target===this)closeModal('alerts-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('alerts-modal')">✕</button>
      <h2>🔔 Breaking Alerts</h2>
      <p>Get notified the moment a major story breaks — before it's everywhere else.</p>
      <input type="email" id="alerts-email" placeholder="📧 Your email address" />
      <div style="margin-bottom:12px">
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-bottom:8px;cursor:pointer"><input type="checkbox" checked style="width:auto"> 🔴 Breaking News</label>
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-bottom:8px;cursor:pointer"><input type="checkbox" checked style="width:auto"> 🏛️ Politics Alerts</label>
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" style="width:auto"> 📈 Markets Alerts</label>
      </div>
      <button class="btn-primary" onclick="handleAlerts()">🔔 Enable Alerts</button>
      <p class="modal-note">You can unsubscribe at any time. No spam, ever.</p>
    </div>
  </div>

  <!-- RSS Feeds Modal -->
  <div class="ap-modal-overlay" id="rss-modal" onclick="if(event.target===this)closeModal('rss-modal')">
    <div class="ap-modal" style="max-width:480px">
      <button class="modal-close" onclick="closeModal('rss-modal')">✕</button>
      <h2>📡 RSS Feeds</h2>
      <p>Subscribe to AmericaPulse in your favorite RSS reader.</p>
      <div style="margin-bottom:8px">
        ${['🏛️ Politics','📈 Business','💻 Technology','🏆 Sports','🏥 Health','🌐 World','🎬 Entertainment','✍️ Opinion'].map(s => {
          const id = s.split(' ')[1].toLowerCase();
          return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid #eee;border-radius:6px;margin-bottom:6px">
            <span style="font-size:14px">${s}</span>
            <button onclick="copyRSS('${id}')" style="font-size:12px;padding:4px 12px;background:#0B1F3A;color:#fff;border:none;border-radius:4px;cursor:pointer">📋 Copy</button>
          </div>`;
        }).join('')}
      </div>
      <p class="modal-note">Compatible with Feedly, Inoreader, NewsBlur, and all standard RSS readers.</p>
    </div>
  </div>

  <!-- Podcast Modal -->
  <div class="ap-modal-overlay" id="podcast-modal" onclick="if(event.target===this)closeModal('podcast-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('podcast-modal')">✕</button>
      <h2>🎙️ The AmericaPulse Podcast</h2>
      <p>Daily audio briefings and in-depth conversations with the people shaping America.</p>
      <div style="background:#f8f8f8;border-radius:8px;padding:16px;margin-bottom:12px">
        <div style="font-size:13px;color:#888;margin-bottom:8px">LATEST EPISODE</div>
        <strong style="font-size:15px">🎧 The State of American Democracy in 2026</strong>
        <div style="font-size:13px;color:#777;margin-top:6px">42 min · Published today</div>
        <button onclick="alert('🎙️ Audio player coming soon! Subscribe on your favorite platform below.')" style="margin-top:10px;padding:8px 18px;background:#C8102E;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">▶️ Play Episode</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <a href="https://podcasts.apple.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px">🍎 Apple Podcasts</a>
        <a href="https://open.spotify.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px">💚 Spotify</a>
        <a href="https://podcasts.google.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px">🎵 Google Podcasts</a>
        <a href="https://www.iheart.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px">❤️ iHeart Radio</a>
      </div>
    </div>
  </div>

  <!-- Privacy Policy Modal -->
  <div class="ap-modal-overlay" id="privacy-modal" onclick="if(event.target===this)closeModal('privacy-modal')">
    <div class="ap-modal" style="max-width:560px;max-height:85vh;overflow-y:auto">
      <button class="modal-close" onclick="closeModal('privacy-modal')">✕</button>
      <h2>🔒 Privacy Policy</h2>
      <p style="font-size:12px;color:#888">Last updated: January 1, 2026</p>
      <div style="font-size:14px;color:#333;line-height:1.7">
        <p><strong>Information We Collect</strong><br>We collect information you provide directly (email address for newsletters and subscriptions) and information collected automatically (browser type, pages visited, time spent on site) through cookies and analytics tools.</p>
        <p><strong>How We Use Your Information</strong><br>We use your information to: send newsletters and breaking alerts you've requested; improve our content and user experience; analyze site traffic anonymously; comply with legal obligations.</p>
        <p><strong>Cookies</strong><br>We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how readers use our site. You can opt out of analytics cookies at any time via Cookie Settings.</p>
        <p><strong>Data Sharing</strong><br>We do not sell your personal data. We may share aggregated, anonymous data with advertising partners. We use third-party services (Netlify hosting, Google Analytics) that have their own privacy policies.</p>
        <p><strong>Your Rights</strong><br>You may request access to, correction of, or deletion of your personal data by contacting us at privacy@americapulse.live.</p>
        <p><strong>Contact</strong><br>Privacy questions: privacy@americapulse.live</p>
      </div>
    </div>
  </div>

  <!-- Terms of Service Modal -->
  <div class="ap-modal-overlay" id="terms-modal" onclick="if(event.target===this)closeModal('terms-modal')">
    <div class="ap-modal" style="max-width:560px;max-height:85vh;overflow-y:auto">
      <button class="modal-close" onclick="closeModal('terms-modal')">✕</button>
      <h2>📜 Terms of Service</h2>
      <p style="font-size:12px;color:#888">Last updated: January 1, 2026</p>
      <div style="font-size:14px;color:#333;line-height:1.7">
        <p><strong>Acceptance of Terms</strong><br>By accessing AmericaPulse.live, you agree to these Terms of Service. If you do not agree, please do not use the site.</p>
        <p><strong>Content License</strong><br>All articles, images, and content on AmericaPulse.live are owned by AmericaPulse Media or its licensors. You may read, share links to, and quote brief excerpts with attribution. You may not republish full articles without written permission.</p>
        <p><strong>User Conduct</strong><br>You agree not to scrape, crawl, or systematically download content; attempt to access restricted areas; use the site for any unlawful purpose; or impersonate AmericaPulse or its journalists.</p>
        <p><strong>Subscriptions</strong><br>Paid subscriptions auto-renew unless cancelled. You may cancel at any time. Refunds are provided on a case-by-case basis within 7 days of billing.</p>
        <p><strong>Disclaimer</strong><br>Content is provided for informational purposes. AmericaPulse makes no warranty of accuracy or completeness. Always consult primary sources for critical decisions.</p>
        <p><strong>Contact</strong><br>Legal questions: legal@americapulse.live</p>
      </div>
    </div>
  </div>

  <!-- Cookie Settings Modal -->
  <div class="ap-modal-overlay" id="cookies-modal" onclick="if(event.target===this)closeModal('cookies-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('cookies-modal')">✕</button>
      <h2>🍪 Cookie Settings</h2>
      <p>Control how AmericaPulse uses cookies on your device.</p>
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #eee;border-radius:8px;margin-bottom:8px">
          <div><strong>✅ Essential Cookies</strong><div style="font-size:12px;color:#777">Required for site functionality. Cannot be disabled.</div></div>
          <span style="font-size:12px;color:#888">Always On</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #eee;border-radius:8px;margin-bottom:8px">
          <div><strong>📊 Analytics Cookies</strong><div style="font-size:12px;color:#777">Help us understand how readers use the site.</div></div>
          <label style="position:relative;display:inline-block;width:44px;height:24px"><input type="checkbox" id="ck-analytics" checked style="width:auto;position:absolute;opacity:0"><span onclick="this.previousElementSibling.click()" style="position:absolute;inset:0;background:#C8102E;border-radius:12px;cursor:pointer;transition:.3s"></span></label>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #eee;border-radius:8px">
          <div><strong>📣 Advertising Cookies</strong><div style="font-size:12px;color:#777">Enable personalized ad experiences.</div></div>
          <label style="position:relative;display:inline-block;width:44px;height:24px"><input type="checkbox" id="ck-ads" style="width:auto;position:absolute;opacity:0"><span onclick="this.previousElementSibling.click()" style="position:absolute;inset:0;background:#ddd;border-radius:12px;cursor:pointer;transition:.3s"></span></label>
        </div>
      </div>
      <button class="btn-primary" onclick="saveCookies()">💾 Save Preferences</button>
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

  window.handleContact = function() {
    const name  = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg   = document.getElementById('contact-msg').value.trim();
    if (!name)  { alert('Please enter your name.'); return; }
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
    if (!msg)   { alert('Please enter your message.'); return; }
    closeModal('contact-modal');
    alert(`✅ Message sent!\n\nThank you, ${name}. We'll reply to ${email} within 24–48 hours.`);
  };

  window.handleAlerts = function() {
    const email = document.getElementById('alerts-email').value.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    closeModal('alerts-modal');
    alert(`🔔 Breaking alerts enabled!\n\nWe'll send urgent news to:\n${email}`);
  };

  window.copyRSS = function(section) {
    const url = `https://americapulse.live/rss/${section}.xml`;
    navigator.clipboard.writeText(url).then(() => {
      alert(`📋 Copied!\n\n${url}`);
    }).catch(() => {
      prompt('Copy this RSS URL:', url);
    });
  };

  window.saveCookies = function() {
    const analytics = document.getElementById('ck-analytics')?.checked;
    const ads       = document.getElementById('ck-ads')?.checked;
    localStorage.setItem('ap_cookies', JSON.stringify({ analytics, ads }));
    closeModal('cookies-modal');
    alert('💾 Cookie preferences saved!');
  };
})();
