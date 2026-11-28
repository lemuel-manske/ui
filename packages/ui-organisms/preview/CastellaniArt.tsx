import { useMemo } from 'react';

interface ArtPath {
  d: string;

  color: string;

  opacity: number;
}

interface ArtDot {
  cx: number;

  cy: number;

  opacity: number;
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7 + 23 * 74.7) * 43758.5453;

  return value - Math.floor(value);
}

function buildPaths(): ArtPath[] {
  return Array.from({ length: 28 }, (_, index) => {
    const points: string[] = [];
    const direction = index % 2 === 0 ? -1 : 1;
    const baseline = 400 + (index - 14) * 5;
    const spread = 18 + (index % 6) * 8;

    for (let pointIndex = 0; pointIndex <= 80; pointIndex += 1) {
      const progress = pointIndex / 80;
      const x = -80 + progress * 1760;
      const envelope = Math.sin(progress * Math.PI) ** 0.8;
      const shared =
        Math.sin(progress * 5.1 + index * 0.13) * 14 + Math.sin(progress * 11.7 + index * 0.07) * 5;
      const own =
        (Math.sin(progress * 7.3 + index * 0.8) * 8 + Math.sin(progress * 15.9 + index * 0.4) * 3) *
        envelope;
      const y = baseline + shared + direction * envelope * spread + own;

      points.push(`${pointIndex === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    const colors = ['#899294', '#899294', '#9AE0EB', '#CDC988', '#DACEFF'];

    return {
      d: points.join(' '),
      color: colors[index % colors.length],
      opacity: 0.16 + seeded(index, 2) * 0.24,
    };
  });
}

function buildDots(): ArtDot[] {
  return Array.from({ length: 150 }, (_, index) => {
    const progress = seeded(index, 4);
    const spread = seeded(index, 5) - 0.5;

    return {
      cx: 160 + progress * 1280,
      cy: 400 + spread * (40 + progress * 260),
      opacity: 0.16 + seeded(index, 6) * 0.34,
    };
  });
}

function CastellaniArt() {
  const paths = useMemo(buildPaths, []);
  const dots = useMemo(buildDots, []);

  return (
    <svg className="castellani__art" viewBox="0 0 1600 800" aria-hidden="true">
      <g className="castellani__artPaths">
        {paths.map((path, index) => (
          <path key={index} d={path.d} stroke={path.color} strokeOpacity={path.opacity} />
        ))}
      </g>

      <g className="castellani__artDots">
        {dots.map((dot, index) => (
          <circle key={index} cx={dot.cx} cy={dot.cy} r="1.2" opacity={dot.opacity} />
        ))}
      </g>
    </svg>
  );
}

export { CastellaniArt };
