import { cn } from "@/lib/cn";

export type DocKind = "invoice" | "contract" | "po" | "form" | "delivery" | "receipt";

const INK = "#0d0f12";
const LIME = "#c6f432";
const LINE = "#dcded7";
const PAPER = "#ffffff";

interface DocIllustrationProps {
  kind: DocKind;
  className?: string;
  /** Rotation of the paper sheet in degrees. */
  tilt?: number;
}

function Bar({
  x,
  y,
  w,
  h = 6,
  fill = LINE,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={18} rx={4} fill={LIME} />
      <text x={x + 7} y={y + 12.5} fontSize={9} fill={INK} fontFamily="var(--font-mono), monospace">
        {label}
      </text>
    </g>
  );
}

function Title({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={14}
      fontWeight={700}
      fill={INK}
      fontFamily="var(--font-display), sans-serif"
      letterSpacing="-0.3"
    >
      {children}
    </text>
  );
}

function Sheet({ kind }: { kind: DocKind }) {
  switch (kind) {
    case "invoice":
      return (
        <>
          <Title x={18} y={30}>
            INVOICE
          </Title>
          <Chip x={150} y={17} w={62} label="INV-20418" />
          <Bar x={18} y={46} w={70} />
          <Bar x={18} y={58} w={52} />
          {[78, 92, 106].map((y) => (
            <g key={y}>
              <Bar x={18} y={y} w={110} />
              <Bar x={170} y={y} w={42} />
            </g>
          ))}
          <line x1={18} y1={124} x2={212} y2={124} stroke={INK} strokeWidth={1.5} />
          <Bar x={18} y={136} w={46} fill={INK} />
          <Chip x={132} y={130} w={80} label="12,480.00" />
        </>
      );
    case "contract":
      return (
        <>
          <Title x={18} y={30}>
            AGREEMENT
          </Title>
          {[46, 56, 66].map((y, i) => (
            <Bar key={y} x={18} y={y} w={[194, 180, 150][i]!} h={5} />
          ))}
          <rect x={14} y={76} width={202} height={22} rx={5} fill={LIME} />
          <text x={22} y={91} fontSize={9} fill={INK} fontFamily="var(--font-mono), monospace">
            renewal: auto · notice: 60 days
          </text>
          {[108, 118].map((y, i) => (
            <Bar key={y} x={18} y={y} w={[188, 120][i]!} h={5} />
          ))}
          <path
            d="M120 146c10-12 18 4 26-6s14 8 22-2 12 4 22-4"
            stroke={INK}
            strokeWidth={1.8}
            fill="none"
            strokeLinecap="round"
          />
          <line x1={118} y1={150} x2={212} y2={150} stroke={LINE} strokeWidth={1.5} />
          <Bar x={18} y={144} w={60} h={5} />
        </>
      );
    case "po":
      return (
        <>
          <Title x={18} y={30}>
            PURCHASE ORDER
          </Title>
          <Chip x={18} y={40} w={58} label="PO-7731" />
          {[66, 86, 106, 126].map((y, i) => (
            <g key={y}>
              <line x1={18} y1={y + 14} x2={212} y2={y + 14} stroke={LINE} strokeWidth={1} />
              <Bar x={18} y={y + 2} w={60} h={5} />
              <Bar x={110} y={y + 2} w={24} h={5} />
              <circle cx={200} cy={y + 4.5} r={6.5} fill={i < 3 ? INK : LINE} />
              {i < 3 ? (
                <path
                  d={`M196.5 ${y + 4.5}l2.5 2.5 4.5-4.5`}
                  stroke={LIME}
                  strokeWidth={1.8}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
            </g>
          ))}
        </>
      );
    case "form":
      return (
        <>
          <Title x={18} y={30}>
            VENDOR FORM
          </Title>
          {[42, 78, 114].map((y, i) => (
            <g key={y}>
              <Bar x={18} y={y} w={48} h={5} />
              <rect
                x={18}
                y={y + 10}
                width={194}
                height={20}
                rx={5}
                fill={i === 1 ? LIME : PAPER}
                stroke={i === 1 ? INK : LINE}
                strokeWidth={1.5}
              />
              {i === 1 ? (
                <text
                  x={26}
                  y={y + 24}
                  fontSize={9}
                  fill={INK}
                  fontFamily="var(--font-mono), monospace"
                >
                  tax_id: GB 482 9917 04
                </text>
              ) : (
                <Bar x={26} y={y + 17.5} w={i === 0 ? 90 : 70} h={5} />
              )}
            </g>
          ))}
        </>
      );
    case "delivery":
      return (
        <>
          <Title x={18} y={30}>
            DELIVERY NOTE
          </Title>
          <g
            transform="translate(18 44)"
            stroke={INK}
            strokeWidth={1.6}
            fill="none"
            strokeLinejoin="round"
          >
            <path d="M0 10l20-10 20 10v24L20 44 0 34z" />
            <path d="M0 10l20 10 20-10M20 20v24" />
          </g>
          <path d="M72 66h40M120 66h40" stroke={LINE} strokeWidth={2} strokeDasharray="4 5" />
          <circle cx={66} cy={66} r={4} fill={INK} />
          <circle cx={208} cy={66} r={5} fill={LIME} stroke={INK} strokeWidth={1.5} />
          <Chip x={18} y={104} w={92} label="received: 36 / 40" />
          <Bar x={120} y={110} w={90} h={5} />
          <path
            d="M120 146c8-10 14 3 20-4s12 6 18-1"
            stroke={INK}
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          />
          <line x1={118} y1={150} x2={212} y2={150} stroke={LINE} strokeWidth={1.5} />
          <Bar x={18} y={144} w={52} h={5} />
        </>
      );
    case "receipt":
      return (
        <>
          <Title x={18} y={30}>
            RECEIPT
          </Title>
          <Bar x={18} y={42} w={60} h={5} />
          {[60, 74, 88, 102].map((y) => (
            <g key={y}>
              <Bar x={18} y={y} w={90} h={5} />
              <Bar x={176} y={y} w={36} h={5} />
            </g>
          ))}
          <line
            x1={18}
            y1={118}
            x2={212}
            y2={118}
            stroke={INK}
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />
          <Bar x={18} y={130} w={34} h={5} fill={INK} />
          <Chip x={144} y={124} w={68} label="VAT 41.20" />
        </>
      );
  }
}

/**
 * Small, decorative document sketch used on cards. Pure SVG, so it is crisp at
 * any size, themable and costs no image requests.
 */
export function DocIllustration({ kind, className, tilt = -3 }: DocIllustrationProps) {
  return (
    <svg
      viewBox="0 0 250 190"
      className={cn("h-auto", className ?? "w-full")}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`rotate(${tilt} 125 95)`}>
        <rect
          x={10}
          y={14}
          width={230}
          height={168}
          rx={12}
          fill={INK}
          opacity={0.12}
          transform="translate(4 6)"
        />
        <rect x={10} y={10} width={230} height={168} rx={12} fill={PAPER} stroke="#d9dbd4" />
        <g transform="translate(10 10)">
          <Sheet kind={kind} />
        </g>
      </g>
    </svg>
  );
}
