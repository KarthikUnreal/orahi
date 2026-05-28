import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Sparkles,
  Bell,
  User,
  Search,
  Mic,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/insights", label: "Insights", icon: Sparkles },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;



export function AppShell({ children }: { children: React.ReactNode }) {
  const { location } = useRouterState();
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] flex-col border-r border-border/60 bg-sidebar/60 backdrop-blur-xl z-30">
        <div className="px-6 pt-7 pb-6">
          <Link to="/home" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-trust grid place-items-center shadow-[var(--shadow-glow)]">
              <ShieldCheck className="size-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight">TrustCart</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Honest prices
              </div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {nav.map((n) => {
            const active =
              n.to === "/home"
                ? location.pathname === "/home"
                : location.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <n.icon className="size-4" />
                <span>{n.label}</span>
                {active && (
                  <span className="ml-auto size-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              AI Saver this month
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              ₹8,420 <span className="text-xs font-normal text-muted-foreground">saved</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[68%] bg-gradient-trust" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-20 px-4 lg:px-8 pt-4 pb-3 bg-background/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Link to="/home" className="lg:hidden flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-trust grid place-items-center">
                <ShieldCheck className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold tracking-tight">TrustCart</span>
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, or paste a link…"
                className="w-full glass rounded-2xl h-11 pl-10 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-xl bg-primary/15 grid place-items-center hover:bg-primary/25 transition-colors">
                <Mic className="size-4 text-primary" />
              </button>
            </div>
            <Link
              to="/alerts"
              className="hidden sm:grid size-11 place-items-center glass rounded-2xl relative"
            >
              <Bell className="size-4" />
              <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-scam" />
            </Link>
          </div>
        </header>

        <main className="px-4 lg:px-8 pb-28 lg:pb-10 pt-2">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-30 glass-strong rounded-3xl px-2 py-2 flex items-center justify-around shadow-[var(--shadow-soft)]">
        {nav.slice(0, 5).map((n) => {
          const active =
            n.to === "/home"
              ? location.pathname === "/home"
              : location.pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-[10px] font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {active && (
                <span className="absolute inset-0 rounded-2xl bg-gradient-trust opacity-15" />
              )}
              <n.icon className={cn("size-5", active && "text-primary")} />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
