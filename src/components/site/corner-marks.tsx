const TONE_COLOR: Record<string, string> = {
  orange: "var(--orange)",
  cream: "rgba(245,240,232,0.85)",
};

function Bracket({
  position,
  color,
  size,
  topClass,
}: {
  position: string;
  color: string;
  size: "sm" | "lg";
  topClass?: string;
}) {
  const dims = size === "lg" ? "w-5 h-5" : "w-3 h-3";
  const inset = size === "lg" ? { t: "top-6", r: "right-6", b: "bottom-6", l: "left-6" } : { t: "top-3", r: "right-3", b: "bottom-3", l: "left-3" };
  const t = topClass ?? inset.t;
  const base = `absolute ${dims} pointer-events-none transition-opacity duration-300`;
  const borders: Record<string, string> = {
    "top-left": `${t} ${inset.l} border-t-[1.5px] border-l-[1.5px]`,
    "top-right": `${t} ${inset.r} border-t-[1.5px] border-r-[1.5px]`,
    "bottom-left": `${inset.b} ${inset.l} border-b-[1.5px] border-l-[1.5px]`,
    "bottom-right": `${inset.b} ${inset.r} border-b-[1.5px] border-r-[1.5px]`,
  };
  return <span className={`${base} ${borders[position]}`} style={{ borderColor: color }} />;
}

export function CornerMarks({
  tone = "orange",
  size = "sm",
  topOffsetClass,
  children,
  className = "",
}: {
  tone?: "orange" | "cream";
  size?: "sm" | "lg";
  /** Override the top brackets' offset — use when a fixed header would otherwise cover them. */
  topOffsetClass?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const color = TONE_COLOR[tone];
  return (
    <div className={`relative group/marks ${className}`}>
      <Bracket position="top-left" color={color} size={size} topClass={topOffsetClass} />
      <Bracket position="top-right" color={color} size={size} topClass={topOffsetClass} />
      <Bracket position="bottom-left" color={color} size={size} />
      <Bracket position="bottom-right" color={color} size={size} />
      {children}
    </div>
  );
}
