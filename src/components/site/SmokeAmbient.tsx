export function SmokeAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft radial wash */}
      <div className="absolute inset-0 bg-grain opacity-80" />

      {/* Smoke plumes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute bottom-0 h-72 w-72 rounded-full bg-gradient-to-t from-gold/30 via-cream/20 to-transparent blur-3xl smoke-mask animate-drift-smoke"
          style={{
            left: `${10 + i * 18}%`,
            animationDelay: `${i * 1.6}s`,
            animationDuration: `${9 + i}s`,
          }}
        />
      ))}

      {/* Gold particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={`p-${i}`}
          className="absolute h-[3px] w-[3px] rounded-full bg-gold/70 animate-float-particle"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 90}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${5 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
