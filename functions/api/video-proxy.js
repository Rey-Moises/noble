/**
 * Facebook Video Proxy for Cloudflare Pages Functions
 * 
 * This serverless function acts as a proxy to stream Facebook videos directly
 * as MP4 files. This bypasses CORS restrictions and allows the video to be
 * used seamlessly as a background video element in the frontend.
 * 
 * @param {EventContext} context - The Cloudflare Pages event context
 * @returns {Promise<Response>} The streamed video response or an error JSON
 */
export async function onRequest(context) {
  // Target Facebook Video URL
  const FACEBOOK_VIDEO_URL = 'https://www.facebook.com/NobleBarbersCavite/videos/1738185659652268/';

  try {
    // 1. Fetch the Facebook page HTML
    const response = await fetch(FACEBOOK_VIDEO_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    const data = await response.text();
    const sources = [];

    /**
     * Helper to extract URLs and decode Unicode sequences and escaped forward slashes.
     * @param {RegExpMatchArray | null} match - The regex match result
     * @param {string} quality - The quality label ('hd' or 'sd')
     */
    const extractSource = (match, quality) => {
      if (match?.[1]) {
        const decodedUrl = match[1].replace(/\\u0025/g, '%').replace(/\\\//g, '/');
        sources.push({ url: decodedUrl, quality });
      }
    };

    // Pattern 1: hd_src / sd_src
    extractSource(data.match(/"hd_src":"([^"]+)"/), 'hd');
    extractSource(data.match(/"sd_src":"([^"]+)"/), 'sd');

    // Pattern 2: playable_url
    extractSource(data.match(/"playable_url_quality_hd":"([^"]+)"/), 'hd');
    extractSource(data.match(/"playable_url":"([^"]+)"/), 'sd');

    // Pattern 3: browser_native
    extractSource(data.match(/"browser_native_hd_url":"([^"]+)"/), 'hd');
    extractSource(data.match(/"browser_native_sd_url":"([^"]+)"/), 'sd');

    // Select HD if available, otherwise fall back to SD
    const videoSource = sources.find(s => s.quality === 'hd') || sources[0];

    if (!videoSource) {
      return new Response(JSON.stringify({ error: 'Video source not found in the HTML' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. Proxy the video stream using the Fetch API
    const proxyHeaders = new Headers();
    proxyHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    proxyHeaders.set('Referer', 'https://www.facebook.com/');
    
    // Forward the Range header if it exists for seeking support
    const range = context.request.headers.get('Range');
    if (range) {
      proxyHeaders.set('Range', range);
    }
    
    const videoResponse = await fetch(videoSource.url, {
      method: 'GET',
      headers: proxyHeaders
    });

    // 3. Construct the response headers allowing CORS and ensuring streaming
    const newHeaders = new Headers(videoResponse.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Content-Type', 'video/mp4');
    newHeaders.set('Cache-Control', 'public, max-age=3600');

    // Return the video stream
    return new Response(videoResponse.body, {
      status: videoResponse.status,
      statusText: videoResponse.statusText,
      headers: newHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch video source', details: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
