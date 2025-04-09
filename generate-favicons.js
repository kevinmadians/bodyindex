const fs = require('fs');
const path = require('path');

// Function to create a simple PNG favicon based on our BI logo design
function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function drawBILogo(ctx, width, height) {
  // Background with gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#4DD8E6'); // Light teal
  gradient.addColorStop(1, '#1565C0'); // Dark blue
  
  ctx.fillStyle = gradient;
  ctx.roundRect(0, 0, width, height, width * 0.125); // Rounded corners
  ctx.fill();
  
  // BI Text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${width * 0.3}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BI', width * 0.5, height * 0.35);
  
  // Divider line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  const lineWidth = width * 0.4;
  const lineHeight = height * 0.05;
  ctx.fillRect((width - lineWidth) / 2, height * 0.5, lineWidth, lineHeight);
  
  // Bar indicators
  const barWidth = width * 0.07;
  const barSpacing = width * 0.125;
  const startX = width * 0.35;
  const bottomY = height * 0.75;
  
  // Green bar
  ctx.fillStyle = '#38BC63';
  ctx.fillRect(startX, bottomY - height * 0.2, barWidth, height * 0.2);
  
  // Blue bar
  ctx.fillStyle = '#2196F3';
  ctx.fillRect(startX + barSpacing, bottomY - height * 0.3, barWidth, height * 0.3);
  
  // Orange bar
  ctx.fillStyle = '#FF9800';
  ctx.fillRect(startX + barSpacing * 2, bottomY - height * 0.1, barWidth, height * 0.1);
}

// This script must be run in a browser environment with document object
// You can use this in a browser console after loading the favicon.svg
console.log('To generate favicons, please:');
console.log('1. Open the favicon.svg in a browser');
console.log('2. Open the browser console');
console.log('3. Paste and run this script');
console.log('4. It will provide data URLs that you can save as PNG files');

// Example usage:
// const canvas16 = createCanvas(16, 16);
// const ctx16 = canvas16.getContext('2d');
// drawBILogo(ctx16, 16, 16);
// console.log('16x16 favicon:', canvas16.toDataURL('image/png'));

// const canvas32 = createCanvas(32, 32);
// const ctx32 = canvas32.getContext('2d');
// drawBILogo(ctx32, 32, 32);
// console.log('32x32 favicon:', canvas32.toDataURL('image/png'));

// const canvas180 = createCanvas(180, 180);
// const ctx180 = canvas180.getContext('2d');
// drawBILogo(ctx180, 180, 180);
// console.log('180x180 apple-touch-icon:', canvas180.toDataURL('image/png')); 