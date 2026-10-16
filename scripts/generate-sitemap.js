const fs = require('fs');
const path = require('path');

// Target domain for production deployment
const DOMAIN = 'https://silambamshadows.com';

// The routing paths defined in the React app (from src/router/Routerfile1.js)
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/Training', priority: '0.8', changefreq: 'monthly' },
  { path: '/trainers', priority: '0.8', changefreq: 'monthly' },
  { path: '/Record', priority: '0.8', changefreq: 'monthly' },
  { path: '/Affiliation', priority: '0.8', changefreq: 'monthly' },
  { path: '/About', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' }
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
      .map(
        (route) => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
      )
      .join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');

  // Create the public directory if it doesn't exist (failsafe)
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, xmlContent, 'utf8');
  console.log(`\x1b[32m✔ Sitemap successfully updated in public/sitemap.xml with lastmod date ${today}!\x1b[0m`);
};

generateSitemap();
