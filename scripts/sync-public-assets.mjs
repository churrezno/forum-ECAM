import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

const directoriesToCopy = ['images', 'pdf', 'vendor', 'fonts', 'fontawesome'];

async function copyDirectory(source, target) {
  await fs.rm(target, { recursive: true, force: true });
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.cp(source, target, { recursive: true });
}

await fs.mkdir(publicDir, { recursive: true });

for (const directory of directoriesToCopy) {
  const source = path.join(srcDir, directory);
  const target = path.join(publicDir, directory);
  await copyDirectory(source, target);
}
