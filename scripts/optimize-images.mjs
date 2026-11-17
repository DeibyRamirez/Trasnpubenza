// Generates responsive AVIF/WebP variants of the Bus*.jpg photos.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
const src = "public/recursos";
const out = "public/recursos/opt";
mkdirSync(out, { recursive: true });
const jobs = { Bus: [480], Bus2: [400, 516], Bus3: [480, 800] };
for (const [name, widths] of Object.entries(jobs)) {
  for (const w of widths) {
    const img = sharp(`${src}/${name}.jpg`).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 50 }).toFile(`${out}/${name}-${w}.avif`);
    const info = await img.clone().webp({ quality: 72 }).toFile(`${out}/${name}-${w}.webp`);
    console.log(name, w, info.width + "x" + info.height);
  }
}
await sharp(`${src}/Icono.png`).resize(96).webp({ quality: 85 }).toFile(`${out}/Icono-96.webp`);
await sharp(`${src}/Icono.png`).resize(256).png().toFile(`${out}/Icono-256.png`);
