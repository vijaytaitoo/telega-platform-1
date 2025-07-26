#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function findEnvFiles(dir) {
  let results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
      results = results.concat(findEnvFiles(fullPath));
    } else if (entry.isFile() && entry.name === '.env') {
      results.push(fullPath);
    }
  });
  return results;
}

const root = process.cwd();
const envFiles = findEnvFiles(root);

if (envFiles.length === 0) {
  console.log('No .env files found.');
  process.exit(0);
}

envFiles.forEach((envPath) => {
  const examplePath = envPath + '.example';
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  const exampleLines = lines.map(line => {
    if (line.trim().startsWith('#') || line.trim() === '') return line;
    if (line.includes('=')) return line.split('=')[0] + '=';
    return line;
  });
  fs.writeFileSync(examplePath, exampleLines.join('\n'));
  console.log(`Generated: ${examplePath}`);
});

console.log('Done!'); 