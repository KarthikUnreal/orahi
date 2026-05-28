import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { alerts } from "@/lib/mock";
import { Bell, ShieldAlert, TrendingDown, Store } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  component: Alerts,
});

const ICONS = {
  fake: ShieldAlert,
  drop: TrendingDown,
  seller: Store,
} as const;

const TONES = {
  fake: "bg-scam/15 text-scam border-scam/30",
  drop: "bg-trust/15 text-trust border-trust/30",
  seller: "bg-warn/15 text-warn border-warn/30",
} as const;

function Alerts() {
  return (
    <AppShell>
      <header className="mt-2 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
            <Bell className="size-3.5" /> Activity
          </div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-1">
            Alerts & notifications
          </h1>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground">
          Mark all read
        </button>
      </header>

      <section className="mt-6 grid gap-3">
        {alerts.map((a) => {
          const Icon = ICONS[a.type as keyof typeof ICONS];
          return (
            <div
              key={a.id}
              className="rounded-3xl glass p-5 flex items-start gap-4"
            >
              <div
                className={`size-10 rounded-2xl border grid place-items-center ${
                  TONES[a.type as keyof typeof TONES]
                }`}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground shrink-0">
                    {a.time} ago
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{a.body}</div>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-xl glass px-3 py-1.5 text-[11px]">View</button>
                  <button className="rounded-xl px-3 py-1.5 text-[11px] text-muted-foreground">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </AppShell>
  );
}
