# NOBLE Barbers - Premium Barbershop Website

A premium barbershop landing page for Noble Barbers Cavite, built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- 🎥 **Facebook Video Background** - Auto-playing background video from Facebook via Cloudflare Pages proxy
- 🎨 **Dark Premium Design** - Modern, elegant dark theme with gold accents
- 📱 **Fully Responsive** - Mobile-first design with smooth animations
- 🧭 **Smooth Navigation** - Scroll-to-section with mobile menu
- 📍 **Location Cards** - Embedded Google Maps for both branches
- 🖼️ **Image Gallery** - Animated collage with hover effects
- 👥 **Crew Showcase** - Team section with animated reveals
- 📅 **Booking Integration** - Direct link to Setmore booking system

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS v4, Framer Motion
- **Icons:** Lucide React
- **Server:** Cloudflare Pages Functions (Edge Runtime)

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start the local development server with Cloudflare proxy
npm run dev:cf
```

The app will be available at `http://localhost:3000`. 
*(Note: If you only want to work on the UI without testing backend functions, you can also use `npm run dev`.)*

### Production Build & Preview

```bash
# Build the frontend and preview it exactly as it runs on Cloudflare
npm run preview
```

## Deployment

The project is fully configured for **Cloudflare Pages**. 

### Cloudflare Pages Dashboard
1. Connect your GitHub repository to Cloudflare Pages.
2. In the build settings, use the following:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Click "Save and Deploy". Cloudflare will automatically detect the `functions/` folder and deploy your API routes.

## Facebook Video Background

The site uses a Facebook video as the hero background. There are two modes:

1. **Proxy Mode (default)** - A Cloudflare Edge Function (`functions/api/video-proxy.js`) extracts the video source URL from Facebook and streams it as MP4 to bypass CORS.
2. **Embed Fallback** - If the proxy is unavailable, the site falls back to a Facebook embed iframe styled as a background.

## Project Structure

```
noble-main/
├── index.html              # Entry HTML
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── functions/
│   └── api/
│       ├── health.js       # API Health check
│       └── video-proxy.js  # Facebook video stream proxy
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles + Tailwind
│   └── components/
│       ├── BarberPole.tsx      # Animated barber pole icon
│       ├── HeroVideo.tsx       # Facebook video background
│       ├── Header.tsx          # Navigation header
│       ├── HeroSection.tsx     # Hero headline + CTA
│       ├── ServicesSection.tsx # Service cards
│       ├── StatsSection.tsx    # Social proof stats
│       ├── GallerySection.tsx  # Image gallery
│       ├── CrewSection.tsx     # Team showcase
│       ├── LocationsSection.tsx # Location cards
│       └── Footer.tsx          # Site footer
└── public/
    ├── favicon.svg
    └── favicon.png
```

## License

Apache-2.0