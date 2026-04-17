/**
 * BrandSwoosh — the magenta arc that wraps the CGR wordmark.
 *
 * It's a scalable SVG so it reads the same from a 64px nav flourish
 * to a 1200px hero backdrop. Stroke width and taper are parameterized
 * so consumers can place a delicate version in a headline and a bold
 * one as a page backdrop.
 */

type Props = {
  className?: string;
  /** Stroke color — defaults to brand magenta. */
  color?: string;
  /** Overall stroke weight. Logo uses a generous sweep. */
  strokeWidth?: number;
  /** If true, flip horizontally — useful on right-aligned compositions. */
  flip?: boolean;
  /** Alpha applied to the stroke. */
  opacity?: number;
};

export default function BrandSwoosh({
  className,
  color = "#e6007e",
  strokeWidth = 14,
  flip = false,
  opacity = 1,
}: Props) {
  return (
    <svg
      viewBox="0 0 400 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        overflow: "visible",
      }}
    >
      {/*
        Cubic Bézier sweep that opens upward on the left and curves
        down-and-around on the right — echoes the CGR logo arc.
      */}
      <path
        d="M 20 120 C 90 30, 240 10, 380 90 L 300 140 C 200 60, 110 80, 40 150"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />
    </svg>
  );
}
