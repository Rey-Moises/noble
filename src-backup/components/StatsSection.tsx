/**
 * StatsSection - Social proof statistics
 * SPDX-License-Identifier: Apache-2.0
 */

const STATS = [
  { label: "Founded", value: "2018" },
  { label: "Services", value: "10K+" },
  { label: "Master Barbers", value: "8" },
  { label: "Locations", value: "2" },
];

export default function StatsSection() {
  return (
    <section className="bg-bg-surface py-20 px-6 border-y border-white/5 mb-40">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {STATS.map((stat, i) => (
          <div key={i}>
            <div className="text-4xl md:text-6xl font-display text-accent-primary mb-2">{stat.value}</div>
            <div className="font-label text-xs tracking-widest text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}