const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/assets/img');
const outputDir = path.join(__dirname, '../public/assets/img');

async function optimizeImages() {
  try {
    const files = fs.readdirSync(inputDir);
    let count = 0;
    for (const file of files) {
      if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
        const inputPath = path.join(inputDir, file);
        const parsedPath = path.parse(file);
        const outputPath = path.join(outputDir, parsedPath.name + '.webp');
        
        console.log(`Optimizing ${file}...`);
        
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Created ${parsedPath.name}.webp`);
        count++;
      }
    }
    console.log(`✅ Successfully optimized ${count} images to WebP format.`);
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
