import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Soins" },
  { to: "/about", label: "La maison" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-tight text-forest-deep">
            ZenShe
          </span>
          <span className="eyebrow hidden sm:inline">Spa</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-sm text-forest-deep/80 transition-colors hover:text-forest-deep"
              activeProps={{ className: "text-forest-deep" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 text-xs text-muted-foreground lg:flex">
            <button className="tracking-wide transition-colors hover:text-forest-deep">
              FR
            </button>
            <span className="text-border">/</span>
            <button className="tracking-wide transition-colors hover:text-forest-deep">
              EN
            </button>
            <span className="text-border">/</span>
            <button className="tracking-wide transition-colors hover:text-forest-deep">
              AR
            </button>
          </div>
          <Link
            to="/booking"
            className="hidden rounded-xs border border-forest px-5 py-2.5 text-xs tracking-[0.14em] text-forest uppercase transition-colors duration-300 hover:bg-forest hover:text-primary-foreground sm:inline-block"
          >
            Réserver
          </Link>
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-1 text-forest-deep md:hidden"
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="eyebrow">Menu</span>
            <button aria-label="Fermer le menu" onClick={() => setOpen(false)}>
              <X className="size-5 text-forest-deep" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pb-8">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display border-b border-border py-4 text-2xl text-forest-deep"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-6 bg-forest px-5 py-4 text-center text-xs tracking-[0.16em] text-primary-foreground uppercase"
            >
              Réserver un soin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
