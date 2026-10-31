import { MotionScene } from "@/components/motion/motion-scene";
import { CrossIcon } from "@/components/ui/icons";

/** "Before" list whose strike-through lines draw left → right as it scrolls into view. */
export function StrikeList({ items, id }: { items: string[]; id: string }) {
  return (
    <>
      <MotionScene scene="strike" target={id} />
      <ul id={id} className="m-0 flex list-none flex-col gap-4 p-0 text-lg">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3.5">
            <span className="inline-flex size-7 flex-none items-center justify-center rounded-lg border-[1.5px] border-ink">
              <CrossIcon size={14} />
            </span>
            <span className="relative">
              {item}
              <span
                data-strike
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-[1.5px] w-full origin-left bg-ink"
              />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
