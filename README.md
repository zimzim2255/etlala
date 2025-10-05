# Etlala - Premium Skincare Website

A modern, elegant website for Etlala skincare products featuring a luxurious design with smooth animations and responsive layout.

## Features

- 🎨 Modern, minimalist design
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth scroll animations with GSAP
- 🖼️ Product showcase with local images
- 🌐 Multi-language support ready
- 🎭 Loading animations
- 📦 Product cards with hover effects
- 🎯 Navigation with sidebar menu

## Tech Stack

- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- ScrollTrigger

## Project Structure

```
etlala-site-web/
├── frontend/
│   ├── public/          # Product images and assets
│   ├── src/             # JavaScript files
│   ├── style/           # CSS stylesheets
│   └── index.html       # Frontend template
├── index.html           # Main entry point
├── vercel.json          # Vercel configuration
└── README.md
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/veloriaperfume/chokolatiy.git
cd etlala-site-web
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## Deployment

### Deploy to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration and deploy

## Product Images

All product images are stored in `frontend/public/` directory:
- Etlala_Whithening_night_cream.webp
- Etlala_Anti_Strech_marks_Serum.webp
- Hair_Serum.webp
- Etlala_hair_Shampoo.webp
- Etlala_Mascara_brighter.webp
- Etlala_Strengthens_and_lengthens_Nails_brighter.webp
- ItlalaCremesolaireinvisible.webp
- ItlalaGelNettoyantmatched.webp
- CMP1-4.webp

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images (WebP format)
- Minimal JavaScript
- CSS animations for smooth performance
- Lazy loading ready

## License

© 2024 Etlala. All rights reserved.

## Contact

For support or inquiries, please contact: info@etlala.com
