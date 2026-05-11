/**
 * BarberPole - Animated barber pole icon component
 * SPDX-License-Identifier: Apache-2.0
 */

interface BarberPoleProps {
  className?: string;
}

export default function BarberPole({ className = "" }: BarberPoleProps) {
  return (
    <div className={`flex flex-col items-center group/pole select-none ${className}`}>
      <div className="w-5 h-2 bg-text-primary/20 rounded-t-full border-t border-white/10" />
      <div className="w-7 h-1 bg-text-primary/30 rounded-sm" />
      <div className="relative w-6 h-10 border-x border-white/10 overflow-hidden">
        <div className="absolute inset-x-0 -top-20 -bottom-20 barber-pole-bg" />
        <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]" />
      </div>
      <div className="w-7 h-1 bg-text-primary/30 rounded-sm" />
      <div className="w-5 h-2.5 bg-text-primary/20 rounded-b-full border-b border-white/10" />
    </div>
  );
}