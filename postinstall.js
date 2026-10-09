'use strict';

const { execFile } = require('node:child_process');
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const imageUrl = 'https://http.cat/200';
const htmlPath = path.join(os.tmpdir(), 'jokeeeeee-cat.html');
const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Install-a-Laugh</title>
<style>html,body{margin:0;width:100%;height:100%;background:#111;color:#fff;font:16px sans-serif;display:grid;place-items:center}img{display:block;width:100vw;height:100vh;object-fit:contain}#fallback{display:none;color:#fff}</style>
</head><body><img src="${imageUrl}" alt="A cat" onerror="this.style.display='none';document.getElementById('fallback').style.display='block'"><a id="fallback" href="${imageUrl}">The image could not load. Click here to open it directly.</a></body></html>`;

console.log('\n😂 Install-a-Laugh says:');
console.log('Why did the npm package go to therapy? It had too many dependencies.');
console.log(`\nOpening the original cat image larger: ${imageUrl}\n`);

try {
  fs.writeFileSync(htmlPath, html, 'utf8');
} catch {
  console.log('Could not prepare the image page. Open the URL above to see the cat.');
  process.exit(0);
}

// Open a local page containing the fixed HTTPS image URL. No shell interpolation or user data.
const platform = os.platform();
let command;
let args;

if (platform === 'win32') {
  command = 'cmd.exe';
  args = ['/c', 'start', '', pathToFileURL(htmlPath).href];
} else if (platform === 'darwin') {
  command = 'open';
  args = [htmlPath];
} else {
  command = 'xdg-open';
  args = [htmlPath];
}

const child = execFile(command, args, { stdio: 'ignore', windowsHide: true });
child.on('error', () => {
  console.log('Could not launch a browser automatically. Open the image URL above to see the cat.');
});
