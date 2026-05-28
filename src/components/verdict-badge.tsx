import { ShieldCheck, AlertTriangle, Skull } from "lucide-react";
import type { Verdict } from "@/lib/mock";
import { cn } from "@/lib/utils";

const map = {
  real: {
    label: "Real Deal",
    Icon: ShieldCheck,
    cls: "bg-trust/15 text-trust border-trust/30",
  },
  inflated: {
    label: "Price Inflated Before Sale",
    Icon: AlertTriangle,
    cls: "bg-warn/15 text-warn border-warn/30",
  },
  fake: {
    label: "Fake Discount",
    Icon: Skull,
    cls: "bg-scam/15 text-scam border-scam/40",
  },
} as const;

export function VerdictBadge({
  verdict,
  className,
  showIcon = true,
}: {
  verdict: Verdict;
  className?: string;
  showIcon?: boolean;
}) {
  const v = map[verdict];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight",
        v.cls,
        className,
      )}
    >
      {showIcon && <v.Icon className="size-3.5" />}
      {v.label}
    </span>
  );
}
