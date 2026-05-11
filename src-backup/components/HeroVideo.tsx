/**
 * HeroVideo - Self-hosted video as full-screen hero background
 * SPDX-License-Identifier: Apache-2.0
 */

export default function HeroVideo() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none overflow-hidden">
      <video
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          filter: 'grayscale(100%) brightness(0.35) contrast(1.1)',
        }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 video-overlay" />
    </div>
  );
}