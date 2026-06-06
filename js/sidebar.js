// Render sidebar into #sidebar-area on section & article pages
(function() {
  const el = document.getElementById('sidebar-area');
  if (!el) return;

  el.innerHTML = `
    <div class="sidebar-widget trending-widget">
      <h3 class="widget-title"><span>Trending Now</span></h3>
      <ol class="trending-list" id="trending-list">
        <li><span class="trend-num">—</span><div class="trend-body"><a href="#">Loading…</a></div></li>
      </ol>
    </div>

    <div class="sidebar-widget newsletter-widget">
      <div class="newsletter-icon">✉</div>
      <h3>Daily Briefing</h3>
      <p>Top stories delivered to your inbox every morning at 6 AM.</p>
      <input type="email" id="nl-email" placeholder="Enter your email" />
      <button class="btn-newsletter" onclick="subscribeNL()">Subscribe Free</button>
    </div>

    <div class="sidebar-widget weather-widget">
      <h3 class="widget-title"><span>Weather</span></h3>
      <div class="weather-cities">
        <div class="weather-row"><span class="city">New York</span><span class="weather-icon">⛅</span><span class="temp">76°F</span></div>
        <div class="weather-row"><span class="city">Los Angeles</span><span class="weather-icon">☀️</span><span class="temp">85°F</span></div>
        <div class="weather-row"><span class="city">Chicago</span><span class="weather-icon">🌧</span><span class="temp">62°F</span></div>
        <div class="weather-row"><span class="city">Miami</span><span class="weather-icon">⛈</span><span class="temp">91°F</span></div>
        <div class="weather-row"><span class="city">Dallas</span><span class="weather-icon">☀️</span><span class="temp">98°F</span></div>
      </div>
    </div>

    <div class="sidebar-widget" style="padding:18px">
      <h3 class="widget-title-plain">Browse Sections</h3>
      <div class="section-pills">
        <a href="politics.html" class="pill" style="--c:#C8102E">🏛 Politics</a>
        <a href="business.html" class="pill" style="--c:#0B6E4F">📈 Business</a>
        <a href="technology.html" class="pill" style="--c:#2563EB">💻 Technology</a>
        <a href="sports.html" class="pill" style="--c:#EA580C">🏆 Sports</a>
        <a href="health.html" class="pill" style="--c:#7C3AED">🏥 Health</a>
        <a href="world.html" class="pill" style="--c:#0891B2">🌐 World</a>
        <a href="entertainment.html" class="pill" style="--c:#DB2777">🎬 Entertainment</a>
        <a href="opinion.html" class="pill" style="--c:#92400E">✍️ Opinion</a>
      </div>
    </div>`;

  renderTrending('trending-list');

  window.subscribeNL = function() {
    const email = document.getElementById('nl-email').value.trim();
    if (!email) return;
    alert(`Thank you! ${email} has been subscribed to the Daily Briefing.`);
    document.getElementById('nl-email').value = '';
  };
})();
