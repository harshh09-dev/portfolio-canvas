import { ArrowRight } from "lucide-react";

/**
 * Editorial "view more" link — text + arrow with hairline underline.
 * This is the shared preview-section affordance. Not a pill, not a button —
 * an inline reading cue.
 */
export default function ViewMore({
  href,
  label = "View more",
}: {
  href: string;
  label?: string;
}) {
  return (
    <div className="mt-10 md:mt-12 flex justify-center">
      <a href={href} className="btn-editorial group">
        <span>{label}</span>
        <ArrowRight size={14} className="btn-editorial-arrow" />
      </a>
    </div>
  );
}
