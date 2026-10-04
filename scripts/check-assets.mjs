import { access } from "node:fs/promises";
import path from "node:path";

const files = [
  "logo.jpg",
  "facade.png",
  "interior-main.png",
  "interior-alt.png",
  "weights.jpg",
  "weights-detail.png",
  "functional.png",
  "climb.png",
  "entrance.png",
  "bathroom.png",
  "shop.png"
];

const root = path.join(process.cwd(), "public", "assets", "area51");
const missing = [];

for (const file of files) {
  try {
    await access(path.join(root, file));
  } catch {
    missing.push(file);
  }
}

if (missing.length) {
  console.error("\nAssets reais ausentes em public/assets/area51:");
  for (const file of missing) console.error(`- ${file}`);
  console.error("\nVeja docs/ASSET-INSTALL-MANUAL.md para o mapeamento exato.\n");
  process.exit(1);
}

console.log(`Todos os ${files.length} assets reais da Área 51 foram encontrados.`);
