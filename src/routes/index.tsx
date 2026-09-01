import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { services } from "@/data/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZenShe Spa — Sanctuaire de bien-être intime féminin, Tunis" },
      {
        name: "description",
        content:
          "Rituels lents, soins botaniques et accompagnement intime confidentiel. Un spa pensé pour les femmes, à La Marsa.",
      },
      {
        property: "og:title",
        content: "ZenShe Spa — Sanctuaire de bien-être intime féminin",
      },
      {
        property: "og:description",
        content:
          "Rituels lents, soins botaniques et accompagnement intime confidentiel, à La Marsa.",
      },
    ],
  }),
  component: HomePage,
});

const testimonials = [
  {
    quote:
      "Je suis venue épuisée et sur la défensive. Personne ne m'a demandé de parler. C'est exactement ce dont j'avais besoin.",
    name: "Inès B.",
    detail: "Rituel d'ancrage",
  },
  {
    quote:
      "Le seul endroit où j'ai pu poser des questions sur mon post-partum sans avoir l'impression de déranger.",
    name: "Salma R.",
    detail: "Accompagnement intime",
  },
  {
    quote:
      "Rien de tape-à-l'œil. Du lin, du silence, des mains qui savent. Je réserve chaque mois depuis un an.",
    name: "Nour H.",
    detail: "Bain rituel & hammam",
  },
];

function HomePage() {
  const featured = services.slice(0, 3);

  return (
    <>
      {/* Hero — editorial split, image-led */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-10 lg:pt-40">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-6">
            <p className="eyebrow">Sanctuaire féminin — La Marsa, Tunis</p>
            <h1 className="mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Le soin lent,
              <br />
              <em className="font-normal">pensé pour</em>
              <br />
              les femmes.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              ZenShe est un lieu de retrait : rituels au long cours, soins
              botaniques et accompagnement intime, dans une discrétion
              complète. Aucune musique d'ascenseur, aucune vente additionnelle.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/booking"
                className="bg-forest px-7 py-4 text-xs tracking-[0.16em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-forest-deep"
              >
                Réserver un soin
              </Link>
              <Link
                to="/services"
                className="link-underline inline-flex items-center gap-1.5 text-sm text-forest-deep"
              >
                Parcourir les soins <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="reveal lg:col-span-6">
            <figure className="relative">
              <img
                src={heroImage}
                alt="Cabine de soin en lin écru et vert forêt, éclairée par la lumière du jour"
                width={1408}
                height={1760}
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Cabine n°2 — le lin, la vapeur, le silence</span>
                <span className="text-moss">Est. 2019</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-3 lg:px-10">
          {[
            ["Praticiennes formées", "Santé intime, post-partum, ménopause."],
            ["Formules courtes", "Six soins. Pas de catalogue interminable."],
            ["Discrétion", "Entrée privée, dossiers confidentiels."],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services — image-forward cards */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Le répertoire</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Soins les plus demandés</h2>
          </div>
          <Link
            to="/services"
            className="link-underline inline-flex items-center gap-1.5 text-sm text-forest-deep"
          >
            Voir les six soins <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <Link
              key={s.id}
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              className="group block"
            >
              <div className="overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  width={1000}
                  height={1250}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl">{s.name}</h3>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {s.price} DT
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.tagline}
              </p>
              <p className="eyebrow mt-4">{s.duration} minutes</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials — typographic, left accent rule */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="eyebrow">Ce qu'on nous écrit</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="border-l border-amber-clay/60 pl-6"
              >
                <p className="font-display text-xl leading-snug text-forest-deep italic">
                  “{t.quote}”
                </p>
                <footer className="mt-5 text-xs tracking-wide text-muted-foreground">
                  {t.name} — {t.detail}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — flat forest block, no gradient */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="bg-forest-deep px-8 py-20 text-center sm:px-16">
          <h2 className="font-display mx-auto max-w-2xl text-4xl leading-tight text-[oklch(0.96_0.01_92)] sm:text-5xl">
            Prenez une heure. Nous nous occupons du reste.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[oklch(0.85_0.02_120)]">
            Réservation en ligne, confirmation sous deux heures, annulation
            gratuite jusqu'à 24 heures avant.
          </p>
          <Link
            to="/booking"
            className="mt-10 inline-block border border-[oklch(0.9_0.02_92)] px-8 py-4 text-xs tracking-[0.16em] text-[oklch(0.96_0.01_92)] uppercase transition-colors duration-300 hover:bg-[oklch(0.96_0.01_92)] hover:text-forest-deep"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
