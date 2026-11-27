import keyframes from './signal-keyframes.json';

export default function SignalField({ hero = false, className }: { hero?: boolean; className: string }) {
  const signals = keyframes.filter(signal => signal.id.startsWith(hero ? '280-' : '245-'));
  // The Hero's exported 60-second timeline holds its last pose after second six.
  const activeFraction = hero ? 0.1 : 1;

  return (
    <svg aria-hidden="true" data-signal-field="" className={className} viewBox={hero ? '0 0 1440 824' : '0 0 1312 535'} preserveAspectRatio="none">
      {!hero && (
        <g fill="none" stroke="#4c91a9">
          <path d="M297 148H411M297 388H411M297 268H503M863 268H950M950 169H974M950 284H974M950 399H974" />
          <path strokeWidth="2" d="M411 148V388M950 169V399" />
        </g>
      )}
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
                  dur={hero ? '9s' : '60s'}
                  repeatCount="indefinite"
                  values={track.values.map(value => value + offset).join(';')}
                  keyTimes={track.times.map(time => Math.min(time / activeFraction, 1)).join(';')}
                />
              );
            })}
          </image>
        ))}
      </g>
    </svg>
  );
}
