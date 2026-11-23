/**
 * Brand asset generator (run once after changing /public/me.jpeg):
 *
 *   bun run scripts/build-assets.ts
 *
 * Emits PWA icons (192/512), apple-touch-icon (180) and a 1200×630
 * Open Graph card consistent with the Terminal & Vector Minimalist palette.
 */
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const AVATAR = path.join(PUBLIC_DIR, "me.jpeg");

const CARBON = "#090b10";
const EMERALD = "#10b981";
const TITANIUM = "#212836";
const TEXT = "#f0f6fc";
const MUTED = "#8b949e";

async function buildIcons() {
  for (const size of [192, 512, 180]) {
    const name = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
    await sharp(AVATAR)
      .resize(size, size, { fit: "cover", position: "centre" })
      .png()
      .toFile(path.join(PUBLIC_DIR, name));
    console.log(`✓ ${name} (${size}×${size})`);
  }
}

async function buildOgImage() {
  const width = 1200;
  const height = 630;

  const baseSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="rgba(240,246,252,0.06)"/>
    </pattern>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${EMERALD}"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.4" r="0.6">
      <stop offset="0" stop-color="rgba(16,185,129,0.14)"/>
      <stop offset="1" stop-color="rgba(16,185,129,0)"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${CARBON}"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect x="0" y="${height - 8}" width="${width}" height="8" fill="url(#accent)"/>
  <text x="80" y="100" font-family="Lato, DejaVu Sans, sans-serif" font-size="24" fill="${EMERALD}" letter-spacing="2">~/celiovieira.com</text>
  <text x="80" y="260" font-family="Lato, DejaVu Sans, sans-serif" font-weight="bold" font-size="88" fill="${TEXT}">Célio Vieira</text>
  <text x="80" y="330" font-family="Lato, DejaVu Sans, sans-serif" font-weight="600" font-size="38" fill="${EMERALD}">Founder, AI &amp; Data Engineer</text>
  <text x="80" y="415" font-family="Lato, DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">Architecting AI Systems, Lakehouses</text>
  <text x="80" y="458" font-family="Lato, DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">&amp; Distributed Cloud Engines</text>
  <text x="80" y="560" font-family="Lato, DejaVu Sans, sans-serif" font-size="24" fill="${MUTED}">aldeon.app  ·  7 live products  ·  engineering blueprints</text>
  <circle cx="970" cy="315" r="152" fill="none" stroke="${TITANIUM}" stroke-width="2"/>
  <circle cx="970" cy="315" r="146" fill="none" stroke="${EMERALD}" stroke-width="3" opacity="0.6"/>
</svg>`;

  const avatarSize = 280;
  const circleMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}" xmlns="http://www.w3.org/2000/svg"><circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#ffffff"/></svg>`,
  );
  const avatar = await sharp(AVATAR)
    .resize(avatarSize, avatarSize, { fit: "cover", position: "centre" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(Buffer.from(baseSvg))
    .composite([{ input: avatar, left: 970 - avatarSize / 2, top: 315 - avatarSize / 2 }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "og.png"));

  console.log("✓ og.png (1200×630)");
}

async function main() {
  await buildIcons();
  await buildOgImage();
}

main().catch((err) => {
  console.error("Asset build failed:", err);
  process.exit(1);
});
