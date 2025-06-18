const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// First, let's try using a Node.js approach to extract the zip
// We'll use the built-in zlib and stream APIs
const AdmZip = require('adm-zip');

try {
  const zip = new AdmZip('creatorhub-nextjs (2).zip');
  zip.extractAllTo('./', true);
  console.log('Zip file extracted successfully');
} catch (error) {
  console.error('Error extracting zip file:', error.message);
  process.exit(1);
}