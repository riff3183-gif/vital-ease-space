import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl text-forest-deep">ZenShe Spa</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Un sanctuaire dédié au bien-être intime féminin. Soins lents,
              praticiennes formées, discrétion absolue.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Naviguer</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/services", label: "Nos soins" },
                { to: "/about", label: "La maison" },
                { to: "/booking", label: "Réserver" },
                { to: "/contact", label: "Nous écrire" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-forest-deep/80 hover:text-forest-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Nous trouver</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-muted-foreground">
              <p>
                14 rue des Oliviers
                <br />
                La Marsa, Tunis
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-moss" /> +216 71 000 000
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-moss" /> bonjour@zenshe.spa
              </p>
            </address>
            <div className="mt-6 flex gap-3">
              {[Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseau social"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-forest transition-colors hover:border-forest hover:bg-forest hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ZenShe Spa. Tous droits réservés.</p>
          <p>Mardi — Samedi, 9h00 à 19h00</p>
        </div>
      </div>
    </footer>
  );
}
