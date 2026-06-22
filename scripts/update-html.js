const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../public/index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace .png and .PNG with .webp
html = html.replace(/\.png"/g, '.webp"');
html = html.replace(/\.PNG"/g, '.webp"');

// Add loading="lazy" decoding="async" to img tags if not present
html = html.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy" decoding="async"');

fs.writeFileSync(htmlPath, html);
console.log('HTML updated successfully!');
