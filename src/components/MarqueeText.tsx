import type { CSSProperties } from 'react';

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  separator?: string;
}

export default function MarqueeText({ text, className = '', speed = 30, separator = ' — ' }: MarqueeTextProps) {
  const items = Array(8).fill(`${text}${separator}`).join('');

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className="marquee-track inline-block"
        style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
      >
        <span>{items}</span>
        <span>{items}</span>
      </div>
    </div>
  );
}
