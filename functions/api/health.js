/**
 * Health Check API Endpoint
 * 
 * Provides a simple endpoint to verify that the Cloudflare Pages 
 * Functions backend is operational and responding.
 * 
 * @returns {Response} JSON payload with status and timestamp
 */
export function onRequest() {
  const payload = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    platform: 'Cloudflare Pages'
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
