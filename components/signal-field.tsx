import keyframes from './signal-keyframes.json';

export default function SignalField({ hero = false, className }: { hero?: boolean; className: string }) {
  const signals = keyframes.filter(signal => signal.id.startsWith(hero ? '280-' : '245-'));

  return (
    <svg aria-hidden="true" className={className} viewBox={hero ? '0 0 1440 824' : '0 0 1312 535'} preserveAspectRatio="none">
      {!hero && <path fill="none" stroke="#4c91a9" d="M297 148H411V388H297M297 268H503M863 268H950M950 169V399M950 169H974M950 284H974M950 399H974" />}
      <g>
        {signals.map(({ id, x, y, size, tracks }) => (
          <image key={id} href={`/images/signals/${id}.svg`} x={x} y={y} width={size} height={size}>
            {(['x', 'y', 'opacity'] as const).map(attribute => {
              const track = tracks[attribute];
              const offset = attribute === 'x' ? x : attribute === 'y' ? y : 0;
              return track && (
                <animate
                  key={attribute}
                  attributeName={attribute}
                  dur="60s"
                  repeatCount="indefinite"
                  values={track.values.map(value => value + offset).join(';')}
                  keyTimes={track.times.join(';')}
                />
              );
            })}
          </image>
        ))}
      </g>
    </svg>
  );
}
