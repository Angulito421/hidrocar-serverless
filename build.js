#!/usr/bin/env node
// build.js — reemplaza el placeholder __OPENAI_KEY__ con la variable de entorno
// Netlify lo ejecuta antes de publicar el site

const fs = require('fs');
const path = require('path');

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('❌ OPENAI_API_KEY no está definida en las variables de entorno de Netlify');
  process.exit(1);
}

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

if (!html.includes('__OPENAI_KEY__')) {
  console.log('⚠️  Placeholder __OPENAI_KEY__ no encontrado en index.html — nada que reemplazar');
  process.exit(0);
}

html = html.replace(/__OPENAI_KEY__/g, key);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ API Key inyectada correctamente en index.html');