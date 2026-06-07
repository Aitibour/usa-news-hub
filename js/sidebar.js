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
      <div class="weather-cities" id="weather-cities">
        <div class="weather-loading">Loading weather…</div>
      </div>
    </div>

    <div class="sidebar-widget" style="padding:18px">
      <h3 class="widget-title-plain">Browse Sections</h3>
      <div class="section-pills">
        <a href="politics.html" class="pill" style="--c:#C8102E">Politics</a>
        <a href="business.html" class="pill" style="--c:#0B6E4F">Business</a>
        <a href="technology.html" class="pill" style="--c:#2563EB">Technology</a>
        <a href="sports.html" class="pill" style="--c:#EA580C">Sports</a>
        <a href="health.html" class="pill" style="--c:#7C3AED">Health</a>
        <a href="world.html" class="pill" style="--c:#0891B2">World</a>
        <a href="entertainment.html" class="pill" style="--c:#DB2777">Entertainment</a>
        <a href="opinion.html" class="pill" style="--c:#92400E">Opinion</a>
      </div>
    </div>`;

  renderTrending('trending-list');
  loadWeather();

  // WMO weather code → emoji + label
  function weatherIcon(code) {
    if (code === 0) return { icon: '☀️', label: 'Clear' };
    if (code <= 2) return { icon: '🌤', label: 'Partly Cloudy' };
    if (code === 3) return { icon: '☁️', label: 'Overcast' };
    if (code <= 49) return { icon: '🌫', label: 'Foggy' };
    if (code <= 57) return { icon: '🌦', label: 'Drizzle' };
    if (code <= 67) return { icon: '🌧', label: 'Rain' };
    if (code <= 77) return { icon: '❄️', label: 'Snow' };
    if (code <= 82) return { icon: '🌦', label: 'Showers' };
    if (code <= 99) return { icon: '⛈', label: 'Thunderstorm' };
    return { icon: '🌡', label: 'Unknown' };
  }

  function cToF(c) { return Math.round(c * 9 / 5 + 32); }

  async function loadWeather() {
    const cities = [
      { name: 'New York',     lat: 40.71, lon: -74.01 },
      { name: 'Los Angeles',  lat: 34.05, lon: -118.24 },
      { name: 'Chicago',      lat: 41.85, lon: -87.65 },
      { name: 'Miami',        lat: 25.77, lon: -80.19 },
      { name: 'Dallas',       lat: 32.78, lon: -96.80 },
    ];
    const el = document.getElementById('weather-cities');
    if (!el) return;

    try {
      const lats = cities.map(c => c.lat).join(',');
      const lons = cities.map(c => c.lon).join(',');
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current_weather=true&temperature_unit=celsius&forecast_days=1`;
      const res = await fetch(url);
      const data = await res.json();
      // API returns array when multiple locations
      const results = Array.isArray(data) ? data : [data];

      el.innerHTML = results.map((r, i) => {
        const cw = r.current_weather;
        const { icon } = weatherIcon(cw.weathercode);
        const tempF = cToF(cw.temperature);
        return `<div class="weather-row">
          <span class="city">${cities[i].name}</span>
          <span class="weather-icon">${icon}</span>
          <span class="temp">${tempF}°F</span>
        </div>`;
      }).join('');
    } catch (e) {
      el.innerHTML = '<div class="weather-row"><span class="city" style="color:#888;font-size:12px">Weather unavailable</span></div>';
    }
  }

  window.subscribeNL = function() {
    const email = document.getElementById('nl-email').value.trim();
    if (!email) return;
    alert(`Thank you! ${email} has been subscribed to the Daily Briefing.`);
    document.getElementById('nl-email').value = '';
  };
})();
