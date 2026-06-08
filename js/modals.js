(function(){
  const modalCSS = `
    .ap-modal-overlay{display:none;position:fixed;inset:0;background:rgba(11,31,58,.6);z-index:9999;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
    .ap-modal-overlay.open{display:flex}
    .ap-modal{background:#fff;border-radius:16px;padding:40px 36px 32px;max-width:440px;width:92%;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.22)}
    .ap-modal-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
    .ap-modal-icon svg{width:28px;height:28px}
    .ap-modal h2{margin:0 0 6px;font-size:22px;font-weight:800;color:#0B1F3A;letter-spacing:-.3px}
    .ap-modal>p{margin:0 0 22px;color:#6b7280;font-size:14px;line-height:1.5}
    .ap-modal input,.ap-modal select,.ap-modal textarea{width:100%;box-sizing:border-box;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;margin-bottom:10px;outline:none;transition:border-color .2s;font-family:inherit;color:#111}
    .ap-modal input:focus,.ap-modal select:focus,.ap-modal textarea:focus{border-color:#C8102E}
    .ap-modal .btn-primary{width:100%;padding:13px;background:#C8102E;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;letter-spacing:.2px;transition:background .2s}
    .ap-modal .btn-primary:hover{background:#a30d25}
    .ap-modal .modal-close{position:absolute;top:14px;right:16px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#9ca3af;background:#f3f4f6;border:none;border-radius:50%;font-size:16px;line-height:1;transition:background .15s}
    .ap-modal .modal-close:hover{background:#e5e7eb;color:#374151}
    .ap-modal .modal-divider{display:flex;align-items:center;gap:10px;color:#d1d5db;font-size:12px;margin:16px 0;text-transform:uppercase;letter-spacing:.5px}
    .ap-modal .modal-divider::before,.ap-modal .modal-divider::after{content:'';flex:1;height:1px;background:#e5e7eb}
    .ap-modal .btn-social{width:100%;padding:11px;background:#fff;color:#111;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:10px;transition:border-color .2s,background .2s}
    .ap-modal .btn-social:hover{border-color:#9ca3af;background:#fafafa}
    .ap-modal .btn-social svg{width:18px;height:18px;flex-shrink:0}
    .ap-modal .modal-note{text-align:center;font-size:12px;color:#9ca3af;margin-top:16px}
    .ap-modal .modal-note a{color:#C8102E;text-decoration:none}
    .ap-modal .modal-note a:hover{text-decoration:underline}
    .plan-card{border:1.5px solid #e5e7eb;border-radius:10px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:border-color .2s,background .15s;display:flex;align-items:center;gap:12px}
    .plan-card:hover,.plan-card.selected{border-color:#C8102E;background:#fff7f7}
    .plan-card.selected .plan-radio{border-color:#C8102E;background:#C8102E}
    .plan-radio{width:18px;height:18px;border-radius:50%;border:2px solid #d1d5db;flex-shrink:0;transition:.2s;display:flex;align-items:center;justify-content:center}
    .plan-radio::after{content:'';width:7px;height:7px;border-radius:50%;background:#fff}
    .plan-info{flex:1}
    .plan-info strong{display:block;font-size:14px;color:#0B1F3A;font-weight:700}
    .plan-info span{font-size:12px;color:#6b7280}
    .plan-price-tag{font-weight:800;color:#C8102E;font-size:16px;white-space:nowrap}
    .plan-badge{font-size:10px;background:#0B6E4F;color:#fff;padding:2px 6px;border-radius:4px;margin-left:6px;font-weight:700;vertical-align:middle}
    .edition-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
    .edition-card{border:1.5px solid #e5e7eb;border-radius:10px;padding:16px 12px;text-align:center;cursor:pointer;transition:border-color .2s,background .15s}
    .edition-card:hover{border-color:#C8102E;background:#fff7f7}
    .edition-card .ed-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;background:#f3f4f6}
    .edition-card .ed-icon svg{width:22px;height:22px}
    .edition-card strong{display:block;font-size:13px;color:#0B1F3A;font-weight:700}
    .edition-card span{font-size:11px;color:#9ca3af}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = modalCSS;
  document.head.appendChild(styleEl);
  const modalsHTML = `
  <!-- Subscribe Modal -->
  <div class="ap-modal-overlay" id="subscribe-modal" onclick="if(event.target===this)closeModal('subscribe-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('subscribe-modal')">✕</button>
      <div class="ap-modal-icon" style="background:#fff0f2">
        <svg fill="none" stroke="#C8102E" stroke-width="2" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"/><path d="M17 20v-8H7v8M7 4v4h8"/></svg>
      </div>
      <h2>Subscribe to AmericaPulse</h2>
      <p>Unlimited access to breaking news and in-depth reporting.</p>
      <div class="plan-card selected" onclick="selectPlan(this,'digital')">
        <div class="plan-radio"></div>
        <div class="plan-info">
          <strong>Digital Access</strong>
          <span>Unlimited articles, newsletters, mobile app</span>
        </div>
        <div class="plan-price-tag">$9.99<small style="font-size:11px;font-weight:500;color:#9ca3af">/mo</small></div>
      </div>
      <div class="plan-card" onclick="selectPlan(this,'annual')">
        <div class="plan-radio"></div>
        <div class="plan-info">
          <strong>Annual Plan <span class="plan-badge">SAVE 34%</span></strong>
          <span>Best value — cancel anytime</span>
        </div>
        <div class="plan-price-tag">$79<small style="font-size:11px;font-weight:500;color:#9ca3af">/yr</small></div>
      </div>
      <div class="plan-card" onclick="selectPlan(this,'free')">
        <div class="plan-radio"></div>
        <div class="plan-info">
          <strong>Newsletter Only</strong>
          <span>Daily briefing email, 5 free articles/month</span>
        </div>
        <div class="plan-price-tag" style="color:#0B6E4F">Free</div>
      </div>
      <br>
      <input type="email" id="sub-email" placeholder="Enter your email address" />
      <button class="btn-primary" onclick="handleSubscribe()">Continue &rarr;</button>
      <p class="modal-note">No credit card required for free plan &nbsp;&bull;&nbsp; Cancel anytime</p>
    </div>
  </div>
  <!-- Sign In Modal -->
  <div class="ap-modal-overlay" id="signin-modal" onclick="if(event.target===this)closeModal('signin-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('signin-modal')">✕</button>
      <div class="ap-modal-icon" style="background:#eef2ff">
        <svg fill="none" stroke="#2563EB" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
      </div>
      <h2>Sign In</h2>
      <p>Welcome back to AmericaPulse.</p>
      <input type="email" id="si-email" placeholder="Email address" />
      <input type="password" id="si-pass" placeholder="Password" />
      <button class="btn-primary" onclick="handleSignIn()">Sign In</button>
      <div class="modal-divider">or continue with</div>
      <button class="btn-social" onclick="handleSocialAuth('Google')">
        <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <button class="btn-social" onclick="handleSocialAuth('Apple')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.05 11.86c-.02-2.13 1.73-3.15 1.81-3.2-1-1.46-2.54-1.66-3.08-1.68-1.31-.13-2.56.77-3.23.77-.67 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.44 1.07 8.55.71 1.04 1.56 2.2 2.67 2.16 1.07-.04 1.48-.7 2.77-.7 1.3 0 1.66.7 2.8.67 1.15-.02 1.88-1.06 2.58-2.1a9.6 9.6 0 001.18-2.43c-.03-.01-2.26-.87-2.26-3.44zm-2.12-6.32c.59-.71.98-1.7.87-2.69-.84.03-1.86.56-2.46 1.26-.54.62-.1 1.59.72 1.59.3 0 .6-.08.87-.16z"/></svg>
        Continue with Apple
      </button>
      <p class="modal-note"><a href="#" onclick="openModal('subscribe-modal');closeModal('signin-modal');return false;">Create an account</a> &nbsp;&bull;&nbsp; <a href="#" onclick="alert('A password reset link has been sent to your email.');return false;" style="color:#9ca3af">Forgot password?</a></p>
    </div>
  </div>
  <!-- E-Edition Modal -->
  <div class="ap-modal-overlay" id="edition-modal" onclick="if(event.target===this)closeModal('edition-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('edition-modal')">✕</button>
      <div class="ap-modal-icon" style="background:#fff7ed">
        <svg fill="none" stroke="#EA580C" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      </div>
      <h2>E-Edition</h2>
      <p>Read today's AmericaPulse in digital newspaper format.</p>
      <div class="edition-grid">
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon"><svg fill="none" stroke="#C8102E" stroke-width="2" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/><path d="M7 8h10M7 12h10M7 16h6"/></svg></div>
          <strong>Today's Edition</strong>
          <span>${new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
        </div>
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon"><svg fill="none" stroke="#0B6E4F" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
          <strong>Weekend Edition</strong>
          <span>Full Sunday paper</span>
        </div>
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon"><svg fill="none" stroke="#2563EB" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h18M3 9h18M3 15h18M3 21h18"/></svg></div>
          <strong>Archive</strong>
          <span>Past 30 days</span>
        </div>
        <div class="edition-card" onclick="closeModal('edition-modal');openModal('signin-modal')">
          <div class="ed-icon"><svg fill="none" stroke="#7C3AED" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v13M5 14l7 7 7-7M3 21h18"/></svg></div>
          <strong>Download PDF</strong>
          <span>Save for offline</span>
        </div>
      </div>
      <button class="btn-primary" onclick="closeModal('edition-modal');openModal('signin-modal')">Sign In to Read &rarr;</button>
      <p class="modal-note">E-Edition included with all paid subscriptions</p>
    </div>
  </div>
  <!-- About Us Modal -->
  <div class="ap-modal-overlay" id="about-modal" onclick="if(event.target===this)closeModal('about-modal')">
    <div class="ap-modal" style="max-width:520px">
      <button class="modal-close" onclick="closeModal('about-modal')">✕</button>
      <h2>About AmericaPulse</h2>
      <p style="color:#333;line-height:1.7">AmericaPulse.live is a digital news publication covering the stories that shape America — from Capitol Hill to Main Street. Founded in 2000, we are committed to fast, fair, and factual journalism.</p>
      <p style="color:#333;line-height:1.7">Our team of reporters, editors, and analysts cover <strong>Politics, Business, Technology, Sports, Health, World Affairs, Entertainment,</strong> and <strong>Opinion</strong> — delivering breaking news and in-depth analysis 24/7.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:22px;font-weight:900;color:#C8102E">400+</div><div style="font-size:12px;color:#777;margin-top:2px">Original Articles</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:22px;font-weight:900;color:#0B1F3A">8</div><div style="font-size:12px;color:#777;margin-top:2px">News Sections</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:22px;font-weight:900;color:#0B6E4F">Daily</div><div style="font-size:12px;color:#777;margin-top:2px">Live Updates</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><div style="font-size:22px;font-weight:900;color:#2563EB">Free</div><div style="font-size:12px;color:#777;margin-top:2px">To Read</div></div>
      </div>
      <button class="btn-primary" onclick="closeModal('about-modal');openModal('contact-modal')">Get In Touch</button>
    </div>
  </div>
  <!-- Contact Modal -->
  <div class="ap-modal-overlay" id="contact-modal" onclick="if(event.target===this)closeModal('contact-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('contact-modal')">✕</button>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you — tips, feedback, corrections, or partnerships.</p>
      <input type="text" id="contact-name" placeholder="Your name" />
      <input type="email" id="contact-email" placeholder="Your email" />
      <select id="contact-subject" style="width:100%;box-sizing:border-box;padding:10px 12px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;margin-bottom:10px;background:#fff;color:#111">
        <option value="">Select subject…</option>
        <option>News Tip</option>
        <option>Correction Request</option>
        <option>Partnership / Advertising</option>
        <option>General Feedback</option>
        <option>Legal Inquiry</option>
      </select>
      <textarea id="contact-msg" placeholder="Your message…" style="width:100%;box-sizing:border-box;padding:10px 12px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;min-height:100px;margin-bottom:10px;resize:vertical;font-family:inherit;color:#111"></textarea>
      <button class="btn-primary" onclick="handleContact()">Send Message</button>
      <p class="modal-note">newsdesk@americapulse.live &nbsp;&bull;&nbsp; Response within 24–48 hours</p>
    </div>
  </div>
  <!-- Careers Modal -->
  <div class="ap-modal-overlay" id="careers-modal" onclick="if(event.target===this)closeModal('careers-modal')">
    <div class="ap-modal" style="max-width:500px">
      <button class="modal-close" onclick="closeModal('careers-modal')">✕</button>
      <h2>Join Our Team</h2>
      <p>We're always looking for passionate journalists, editors, and digital media professionals.</p>
      <div style="margin-bottom:12px">
        <div style="border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:8px">
          <strong>Staff Reporter – Politics</strong><span style="float:right;font-size:12px;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px">Open</span>
          <div style="font-size:13px;color:#777;margin-top:4px">Washington D.C. · Full-time</div>
        </div>
        <div style="border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:8px">
          <strong>Tech Reporter</strong><span style="float:right;font-size:12px;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px">Open</span>
          <div style="font-size:13px;color:#777;margin-top:4px">Remote · Full-time</div>
        </div>
        <div style="border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:8px">
          <strong>Multimedia Editor</strong><span style="float:right;font-size:12px;background:#fff3e0;color:#e65100;padding:2px 8px;border-radius:10px">Closing Soon</span>
          <div style="font-size:13px;color:#777;margin-top:4px">New York · Full-time</div>
        </div>
        <div style="border:1px solid #eee;border-radius:8px;padding:14px">
          <strong>Data Journalist</strong><span style="float:right;font-size:12px;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px">Open</span>
          <div style="font-size:13px;color:#777;margin-top:4px">Remote · Contract</div>
        </div>
      </div>
      <button class="btn-primary" onclick="closeModal('careers-modal');openModal('contact-modal')">Send Your Resume</button>
    </div>
  </div>
  <!-- Advertise Modal -->
  <div class="ap-modal-overlay" id="advertise-modal" onclick="if(event.target===this)closeModal('advertise-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('advertise-modal')">✕</button>
      <h2>Advertise with Us</h2>
      <p>Reach millions of engaged American news readers across desktop, mobile, and newsletters.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><strong style="display:block;margin-bottom:4px">Display Ads</strong><div style="font-size:12px;color:#777">Banner & sidebar placements</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><strong style="display:block;margin-bottom:4px">Newsletter Ads</strong><div style="font-size:12px;color:#777">Daily briefing sponsor</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><strong style="display:block;margin-bottom:4px">Sponsored Content</strong><div style="font-size:12px;color:#777">Native articles</div></div>
        <div style="background:#f8f8f8;border-radius:8px;padding:14px;text-align:center"><strong style="display:block;margin-bottom:4px">Social Campaigns</strong><div style="font-size:12px;color:#777">Cross-platform reach</div></div>
      </div>
      <button class="btn-primary" onclick="closeModal('advertise-modal');openModal('contact-modal')">Request Media Kit</button>
      <p class="modal-note">ads@americapulse.live · CPM rates from $4.50</p>
    </div>
  </div>
  <!-- Breaking Alerts Modal -->
  <div class="ap-modal-overlay" id="alerts-modal" onclick="if(event.target===this)closeModal('alerts-modal')">
    <div class="ap-modal">
      <button class="modal-close" onclick="closeModal('alerts-modal')">✕</button>
      <h2>Breaking Alerts</h2>
      <p>Get notified the moment a major story breaks — before it's everywhere else.</p>
      <input type="email" id="alerts-email" placeholder="Your email address" />
      <div style="margin-bottom:12px">
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-bottom:8px;cursor:pointer"><input type="checkbox" checked style="width:auto"> Breaking News</label>
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-bottom:8px;cursor:pointer"><input type="checkbox" checked style="width:auto"> Politics Alerts</label>
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" style="width:auto"> Markets Alerts</label>
      </div>
      <button class="btn-primary" onclick="handleAlerts()">Enable Alerts</button>
      <p class="modal-note">You can unsubscribe at any time. No spam, ever.</p>
    </div>
  </div>
  <!-- RSS Feeds Modal -->
  <div class="ap-modal-overlay" id="rss-modal" onclick="if(event.target===this)closeModal('rss-modal')">
    <div class="ap-modal" style="max-width:480px">
      <button class="modal-close" onclick="closeModal('rss-modal')">✕</button>
      <h2>RSS Feeds</h2>
      <p>Subscribe to AmericaPulse in your favorite RSS reader.</p>
      <div style="margin-bottom:8px">
        ${['Politics','Business','Technology','Sports','Health','World','Entertainment','Opinion'].map(s => {
          const id = s.toLowerCase();
          return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid #eee;border-radius:6px;margin-bottom:6px">
            <span style="font-size:14px;font-weight:500">${s}</span>
            <button onclick="copyRSS('${id}')" style="font-size:12px;padding:4px 12px;background:#0B1F3A;color:#fff;border:none;border-radius:4px;cursor:pointer">Copy</button>
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
      <h2>The AmericaPulse Podcast</h2>
      <p>Daily audio briefings and in-depth conversations with the people shaping America.</p>
      <div style="background:#f8f8f8;border-radius:8px;padding:16px;margin-bottom:12px">
        <div style="font-size:13px;color:#888;margin-bottom:8px">LATEST EPISODE</div>
        <strong style="font-size:15px">The State of American Democracy in 2026</strong>
        <div style="font-size:13px;color:#777;margin-top:6px">42 min · Published today</div>
        <button onclick="alert('Audio player coming soon. Subscribe on your favorite platform below.')" style="margin-top:10px;padding:8px 18px;background:#C8102E;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">&#9654; Play Episode</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <a href="https://podcasts.apple.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px;font-weight:500">Apple Podcasts</a>
        <a href="https://open.spotify.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px;font-weight:500">Spotify</a>
        <a href="https://podcasts.google.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px;font-weight:500">Google Podcasts</a>
        <a href="https://www.iheart.com" target="_blank" rel="noopener" style="display:block;text-align:center;padding:10px;background:#f8f8f8;border-radius:8px;text-decoration:none;color:#333;font-size:13px;font-weight:500">iHeart Radio</a>
      </div>
    </div>
  </div>
  <!-- Privacy Policy Modal -->
  <div class="ap-modal-overlay" id="privacy-modal" onclick="if(event.target===this)closeModal('privacy-modal')">
    <div class="ap-modal" style="max-width:560px;max-height:85vh;overflow-y:auto">
      <button class="modal-close" onclick="closeModal('privacy-modal')">✕</button>
      <h2>Privacy Policy</h2>
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
      <h2>Terms of Service</h2>
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
      <h2>Cookie Settings</h2>
      <p>Control how AmericaPulse uses cookies on your device.</p>
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #eee;border-radius:8px;margin-bottom:8px">
          <div><strong>Essential Cookies</strong><div style="font-size:12px;color:#777">Required for site functionality. Cannot be disabled.</div></div>
          <span style="font-size:12px;color:#888">Always On</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #eee;border-radius:8px;margin-bottom:8px">
          <div><strong>Analytics Cookies</strong><div style="font-size:12px;color:#777">Help us understand how readers use the site.</div></div>
          <label style="position:relative;display:inline-block;width:44px;height:24px"><input type="checkbox" id="ck-analytics" checked style="width:auto;position:absolute;opacity:0"><span onclick="this.previousElementSibling.click()" style="position:absolute;inset:0;background:#C8102E;border-radius:12px;cursor:pointer;transition:.3s"></span></label>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #eee;border-radius:8px">
          <div><strong>Advertising Cookies</strong><div style="font-size:12px;color:#777">Enable personalized ad experiences.</div></div>
          <label style="position:relative;display:inline-block;width:44px;height:24px"><input type="checkbox" id="ck-ads" style="width:auto;position:absolute;opacity:0"><span onclick="this.previousElementSibling.click()" style="position:absolute;inset:0;background:#ddd;border-radius:12px;cursor:pointer;transition:.3s"></span></label>
        </div>
      </div>
      <button class="btn-primary" onclick="saveCookies()">Save Preferences</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalsHTML);
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
  window.handleSubscribe = async function() {
    const emailEl = document.getElementById('sub-email');
    const email = emailEl.value.trim();
    if (!email || !email.includes('@')) {
      emailEl.style.borderColor = '#C8102E';
      emailEl.focus();
      return;
    }
    emailEl.style.borderColor = '';
    try {
      await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({'form-name':'newsletter', email}).toString() });
    } catch(e) {}
    const modal = document.getElementById('subscribe-modal');
    const inner = modal.querySelector('.ap-modal');
    if (inner) inner.innerHTML = '<div style="text-align:center;padding:32px 16px"><div style="font-size:48px;margin-bottom:16px">&#10003;</div><h2 style="color:#0B1F3A;margin-bottom:8px">You\'re in!</h2><p style="color:#555;line-height:1.6">Welcome to AmericaPulse.<br>Check your inbox for updates.</p><button class="btn-primary" style="margin-top:20px" onclick="closeModal(\'subscribe-modal\')">Done</button></div>';
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
  window.handleContact = async function() {
    const nameEl  = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const msgEl   = document.getElementById('contact-msg');
    const name  = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg   = msgEl.value.trim();
    [nameEl, emailEl, msgEl].forEach(el => el.style.borderColor = '');
    if (!name)  { nameEl.style.borderColor = '#C8102E'; nameEl.focus(); return; }
    if (!email || !email.includes('@')) { emailEl.style.borderColor = '#C8102E'; emailEl.focus(); return; }
    if (!msg)   { msgEl.style.borderColor = '#C8102E'; msgEl.focus(); return; }
    try {
      await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({'form-name':'contact', name, email, message: msg}).toString() });
    } catch(e) {}
    const modal = document.getElementById('contact-modal');
    const inner = modal.querySelector('.ap-modal');
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');}
    if (inner) inner.innerHTML = `<div style="text-align:center;padding:32px 16px"><div style="font-size:48px;margin-bottom:16px">&#10003;</div><h2 style="color:#0B1F3A;margin-bottom:8px">Message sent!</h2><p style="color:#555;line-height:1.6">Thank you, ${esc(name)}.<br>We'll reply to <strong>${esc(email)}</strong> within 24–48 hours.</p><button class="btn-primary" style="margin-top:20px" onclick="closeModal('contact-modal')">Done</button></div>`;
  };
  window.handleAlerts = async function() {
    const email = document.getElementById('alerts-email').value.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    try {
      await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({'form-name':'breaking-alerts', email}).toString() });
    } catch(e) {}
    closeModal('alerts-modal');
    alert(`Breaking alerts enabled! We'll send urgent news to:\n${email}`);
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
