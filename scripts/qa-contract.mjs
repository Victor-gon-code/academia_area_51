import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const roots = ["app", "components", "sections", "lib"];
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) files.push(full);
  }
}

for (const root of roots) await walk(path.join(process.cwd(), root));

const source = (await Promise.all(files.map(async (file) => ({
  file,
  text: await readFile(file, "utf8")
}))));

const forbidden = [
  ["scroll-snap", "scroll-snap não é permitido"],
  ["lenis", "Lenis não pertence à primeira implementação"],
  ["dangerouslySetInnerHTML", "dangerouslySetInnerHTML não é necessário neste projeto"],
  ["CNPJ", "CNPJ não deve ser publicado sem confirmação"],
  ["100vh", "Use svh/dvh ou soluções responsivas; 100vh rígido não é permitido"],
  ["backdrop-filter", "Evitar glassmorphism/backdrop blur nesta direção visual"]
];

const errors = [];

for (const { file, text } of source) {
  for (const [needle, message] of forbidden) {
    if (text.toLowerCase().includes(needle.toLowerCase())) {
      errors.push(`${file}: ${message}`);
    }
  }

  if (/https?:\/\//.test(text) && !file.endsWith(path.join("lib", "site.ts"))) {
    errors.push(`${file}: URL externa inesperada fora de lib/site.ts`);
  }
}

const joined = source.map(({ text }) => text).join("\n");
const required = [
  "A cidade ainda dorme.",
  "A Área 51 já está em movimento.",
  "PUXAR",
  "SUBIR",
  "VOLTAR",
  "04:00 DE AMANHÃ,",
  "A GENTE ESTÁ AQUI."
];

for (const phrase of required) {
  if (!joined.includes(phrase)) errors.push(`Conteúdo obrigatório ausente: ${phrase}`);
}

const threeFiles = source
  .filter(({ text }) => text.includes('import("three")') || text.includes('from "three"'))
  .map(({ file }) => path.relative(process.cwd(), file).replaceAll("\\", "/"));

if (threeFiles.length !== 1 || threeFiles[0] !== "components/HaloScene/HaloScene.tsx") {
  errors.push(`Three.js deve existir somente em components/HaloScene/HaloScene.tsx. Encontrado em: ${threeFiles.join(", ") || "nenhum"}`);
}

if (errors.length) {
  console.error("\nQA de contrato falhou:\n");
  errors.forEach((error) => console.error(`- ${error}`));
  console.error("");
  process.exit(1);
}

console.log("QA de contrato aprovado: narrativa, stack e restrições principais preservadas.");
