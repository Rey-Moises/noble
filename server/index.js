/**
 * Noble Barbers - Production Server
 * 
 * Serves the built React app and Facebook video proxy.
 * Run with: node server/index.js
 * 
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Facebook video URL
const FACEBOOK_VIDEO_URL = 'https://www.facebook.com/NobleBarbersCavite/videos/1738185659652268/';

// ============================================
// API Routes
// ============================================

/**
 * Health check endpoint
 */
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * Facebook Video Proxy
 * Fetches the Facebook video source and streams it as MP4
 */
app.get('/api/video-proxy', async (_req, res) => {
  try {
    const sources = await extractFacebookVideoSources(FACEBOOK_VIDEO_URL);
    
    // Prefer HD, fall back to SD
    const videoSource = sources.find(s => s.quality === 'hd') || sources[0];
    
    if (!videoSource) {
      res.status(404).json({ error: 'Video source not found' });
      return;
    }

    // Set CORS and streaming headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Stream the video from Facebook's CDN
    const videoUrl = new URL(videoSource.url);
    const protocol = videoUrl.protocol === 'https:' ? https : http;
    
    protocol.get(videoSource.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.facebook.com/',
      }
    }, (videoRes) => {
      videoRes.pipe(res);
    }).on('error', (err) => {
      console.error('Error streaming video:', err);
      res.status(500).json({ error: 'Failed to stream video' });
    });
  } catch (err) {
    console.error('Error fetching video:', err);
    res.status(500).json({ error: 'Failed to fetch video source' });
  }
});

/**
 * Extract video source URLs from a Facebook video page
 */
async function extractFacebookVideoSources(videoUrl) {
  return new Promise((resolve, reject) => {
    https.get(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const sources = [];
          
          // Pattern 1: hd_src / sd_src
          const hdMatch = data.match(/"hd_src":"([^"]+)"/);
          const sdMatch = data.match(/"sd_src":"([^"]+)"/);
          
          if (hdMatch?.[1]) {
            sources.push({ url: hdMatch[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/'), quality: 'hd' });
          }
          if (sdMatch?.[1]) {
            sources.push({ url: sdMatch[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/'), quality: 'sd' });
          }
          
          // Pattern 2: playable_url
          const playableHdMatch = data.match(/"playable_url_quality_hd":"([^"]+)"/);
          const playableSdMatch = data.match(/"playable_url":"([^"]+)"/);
          
          if (playableHdMatch?.[1]) {
            sources.push({ url: playableHdMatch[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/'), quality: 'hd' });
          }
          if (playableSdMatch?.[1]) {
            sources.push({ url: playableSdMatch[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/'), quality: 'sd' });
          }
          
          // Pattern 3: browser_native
          const nativeHdMatch = data.match(/"browser_native_hd_url":"([^"]+)"/);
          const nativeSdMatch = data.match(/"browser_native_sd_url":"([^"]+)"/);
          
          if (nativeHdMatch?.[1]) {
            sources.push({ url: nativeHdMatch[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/'), quality: 'hd' });
          }
          if (nativeSdMatch?.[1]) {
            sources.push({ url: nativeSdMatch[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/'), quality: 'sd' });
          }
          
          resolve(sources);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// ============================================
// Static File Serving (Production Build)
// ============================================

// Serve static files from the dist directory (Vite build output)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// For any other route, serve index.html (SPA fallback)
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`\n  🏆 Noble Barbers Server`);
  console.log(`  ─────────────────────`);
  console.log(`  📍 Local:   http://localhost:${PORT}`);
  console.log(`  📹 Video:   http://localhost:${PORT}/api/video-proxy`);
  console.log(`  ❤️  Health:  http://localhost:${PORT}/api/health`);
  console.log(`  📦 Mode:    ${process.env.NODE_ENV || 'production'}\n`);
});