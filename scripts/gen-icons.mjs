import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

// SVG icon: dark navy square background with the full logo centered
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
<defs>
  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#0D1B3E"/>
    <stop offset="100%" stop-color="#060D1F"/>
  </linearGradient>
  <linearGradient id="lgo-canton" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#1545AA"/>
    <stop offset="100%" stop-color="#001A6E"/>
  </linearGradient>
  <linearGradient id="lgo-red" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#E5001F"/>
    <stop offset="100%" stop-color="#A80015"/>
  </linearGradient>
  <linearGradient id="lgo-bldg" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#5A9AF5"/>
    <stop offset="100%" stop-color="#1040B0"/>
  </linearGradient>
  <linearGradient id="lgo-bldg-v" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%"   stop-color="#6AAAF8"/>
    <stop offset="100%" stop-color="#1848C0"/>
  </linearGradient>
  <filter id="sh">
    <feDropShadow dx="1" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,.4)"/>
  </filter>
</defs>

<!-- Dark navy rounded background -->
<rect width="512" height="512" rx="90" ry="90" fill="url(#bg)"/>

<!-- ── GROUP: scale original 800×190 logo into ~460×110, centered at (26, 130) ── -->
<g transform="translate(26,100) scale(0.575)">

  <!-- FLAG -->
  <g transform="translate(8,12) rotate(-12,82,52)" filter="url(#sh)">
    <rect x="0" y="0" width="162" height="102" rx="3" fill="white"/>
    <rect x="0"  y="0"  width="162" height="14.5" fill="url(#lgo-red)"/>
    <rect x="0"  y="29" width="162" height="14.5" fill="url(#lgo-red)"/>
    <rect x="0"  y="58" width="162" height="14.5" fill="url(#lgo-red)"/>
    <rect x="0"  y="87" width="162" height="15"   fill="url(#lgo-red)"/>
    <rect x="68" y="14.5" width="94" height="14.5" fill="url(#lgo-red)"/>
    <rect x="68" y="43.5" width="94" height="14.5" fill="url(#lgo-red)"/>
    <rect x="68" y="72.5" width="94" height="14.5" fill="url(#lgo-red)"/>
    <rect x="0" y="0" width="68" height="58" fill="url(#lgo-canton)"/>
    <text x="3"  y="13" fill="white" font-size="9.5" font-family="serif" letter-spacing="3.5">★ ★ ★</text>
    <text x="9"  y="23" fill="white" font-size="9.5" font-family="serif" letter-spacing="5">★ ★</text>
    <text x="3"  y="33" fill="white" font-size="9.5" font-family="serif" letter-spacing="3.5">★ ★ ★</text>
    <text x="9"  y="43" fill="white" font-size="9.5" font-family="serif" letter-spacing="5">★ ★</text>
    <text x="3"  y="53" fill="white" font-size="9.5" font-family="serif" letter-spacing="3.5">★ ★ ★</text>
  </g>

  <!-- WAVE STRIPES -->
  <g fill="none" stroke-linecap="round">
    <path d="M162,20 Q200,13 245,20" stroke="#C8102E" stroke-width="14"/>
    <path d="M162,34 Q202,27 248,34" stroke="white"   stroke-width="11"/>
    <path d="M162,48 Q200,42 244,49" stroke="#C8102E" stroke-width="12"/>
    <path d="M162,62 Q198,57 240,63" stroke="white"   stroke-width="10"/>
    <path d="M162,76 Q196,72 234,77" stroke="#C8102E" stroke-width="9" stroke-opacity=".7"/>
  </g>

  <!-- EKG -->
  <path d="M220,76 L248,76 L254,63 L260,76 L275,76 L281,67 L287,76 L304,76 L314,76 L325,8 L338,108 L348,76 L558,76 L566,62 L573,76 L594,76"
    fill="none" stroke="#C8102E" stroke-width="14" stroke-opacity=".1" stroke-linecap="round"/>
  <path d="M220,76 L248,76 L254,63 L260,76 L275,76 L281,67 L287,76 L304,76 L314,76 L325,8 L338,108 L348,76 L558,76 L566,62 L573,76 L594,76"
    fill="none" stroke="#C8102E" stroke-width="3.2" stroke-linecap="round"/>

  <!-- 3D BUILDINGS -->
  <rect x="197" y="74" width="17" height="42" fill="url(#lgo-bldg)"/>
  <rect x="214" y="74" width="3"  height="42" fill="#0A2880" opacity=".55"/>
  <rect x="219" y="60" width="19" height="56" fill="url(#lgo-bldg)"/>
  <rect x="238" y="60" width="3"  height="56" fill="#0A2880" opacity=".55"/>
  <rect x="244" y="53" width="21" height="63" fill="url(#lgo-bldg)"/>
  <rect x="265" y="53" width="3"  height="63" fill="#0A2880" opacity=".55"/>
  <rect x="271" y="38" width="21" height="78" fill="url(#lgo-bldg)"/>
  <rect x="292" y="38" width="3"  height="78" fill="#0A2880" opacity=".55"/>
  <!-- tallest -->
  <rect x="297" y="40" width="19" height="76" fill="url(#lgo-bldg-v)"/>
  <rect x="300" y="24" width="13" height="18" fill="url(#lgo-bldg-v)"/>
  <rect x="303" y="13" width="7"  height="13" fill="url(#lgo-bldg-v)"/>
  <line x1="306" y1="13" x2="306" y2="3" stroke="#3068D8" stroke-width="2.5"/>
  <rect x="316" y="40" width="3"  height="76" fill="#0A2880" opacity=".55"/>
  <rect x="322" y="43" width="21" height="73" fill="url(#lgo-bldg)"/>
  <rect x="343" y="43" width="3"  height="73" fill="#0A2880" opacity=".55"/>
  <rect x="349" y="53" width="19" height="63" fill="url(#lgo-bldg)"/>
  <rect x="368" y="53" width="3"  height="63" fill="#0A2880" opacity=".55"/>
  <rect x="374" y="62" width="17" height="54" fill="url(#lgo-bldg)"/>
  <rect x="391" y="62" width="3"  height="54" fill="#0A2880" opacity=".55"/>
  <rect x="397" y="70" width="16" height="46" fill="url(#lgo-bldg)"/>

  <!-- SWOOSH RIBBONS -->
  <path d="M556,36 Q622,14 688,46 L686,60 Q620,28 556,50 Z" fill="#C8102E"/>
  <path d="M556,50 Q620,28 686,60 L684,74 Q618,42 556,64 Z" fill="#1A55CC"/>

  <!-- SHOOTING STAR -->
  <g transform="translate(694,14)">
    <polygon points="28,0 34,19 55,19 39,32 45,52 28,40 11,52 17,32 1,19 22,19"
      fill="white" stroke="#C8102E" stroke-width="3.5"/>
    <polygon points="28,13 32,24 44,24 35,31 38,42 28,35 18,42 21,31 13,21 23,21"
      fill="#1A55CC"/>
  </g>

  <!-- WORDMARK -->
  <text x="82" y="168" font-family="Arial Black,Impact,sans-serif" font-size="50" font-weight="900" font-style="italic" letter-spacing="-1" fill="#1A5FCC">America</text>
  <text x="375" y="168" font-family="Arial Black,Impact,sans-serif" font-size="50" font-weight="900" font-style="italic" letter-spacing="-1" fill="#C8102E">Pulse</text>
  <!-- AP.live badge -->
  <rect x="200" y="185" width="400" height="52" rx="10" fill="none" stroke="#1A5FCC" stroke-width="3.5"/>
  <text x="400" y="222" font-family="Arial Black,Impact,sans-serif" font-size="32" font-weight="700" font-style="italic" fill="#1A5FCC" text-anchor="middle">AP</text>
  <text x="450" y="222" font-family="Arial Black,Impact,sans-serif" font-size="32" font-weight="700" font-style="italic" fill="#C8102E" text-anchor="middle">.live</text>

</g>
</svg>`;

const sizes = [512, 192, 32, 16];
for (const size of sizes) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`/home/user/usa-news-hub/icon-${size}.png`);
  console.log(`Generated icon-${size}.png`);
}

// Generate favicon.ico (32px PNG renamed — browsers accept PNG-based .ico)
await sharp(Buffer.from(svg))
  .resize(32, 32)
  .png()
  .toFile('/home/user/usa-news-hub/favicon.ico');
console.log('Generated favicon.ico');
