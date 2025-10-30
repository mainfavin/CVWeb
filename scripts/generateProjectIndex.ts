//npm run gen:projects when you add a new project to have an index.ts generated automatically



// scripts/generateProjectsIndex.ts
import fs from "fs";
import path from "path";

const projectsDir = path.resolve("src/data/projects");
const indexFile = path.join(projectsDir, "index.ts");

// leer todos los .ts de la carpeta (excepto index.ts y types.ts)
const files = fs
  .readdirSync(projectsDir)
  .filter(f => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");

const imports = files.map(f => {
  const name = f.replace(".ts", "");
  const varName = name
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase()) // kebab → camel
    .replace(/^\w/, c => c.toLowerCase());           // primera minúscula
  return `import { ${varName} } from "./${name}";`;
});

const exportsArray = files
  .map(f => {
    const name = f.replace(".ts", "");
    const varName = name
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^\w/, c => c.toLowerCase());
    return `  ${varName},`;
  })
  .join("\n");

const content = `import type { Project } from "../types";

${imports.join("\n")}

export const projects: Project[] = [
${exportsArray}
];
`;

fs.writeFileSync(indexFile, content);
console.log(`✅ index.ts actualizado con ${files.length} proyectos.`);
