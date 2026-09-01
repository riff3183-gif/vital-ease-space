import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { categories, services } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Nos soins — ZenShe Spa" },
      {
        name: "description",
        content:
          "Six soins seulement : rituels lents, soins botaniques du visage, hammam, post-partum et accompagnement intime confidentiel.",
      },
      { property: "og:title", content: "Nos soins — ZenShe Spa" },
      {
        property: "og:description",
        content:
          "Six soins seulement, pensés pour les corps féminins. Durées longues, praticiennes formées.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [active, setActive] = useState<string>("Tous");
  const list =
    active === "Tous" ? services : services.filter((s) => s.category === active);

  return (
    <section className="mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-10">
      <p className="eyebrow">Le répertoire</p>
      <h1 className="mt-5 max-w-2xl text-5xl leading-[1] sm:text-6xl">
        Six soins, aucun remplissage.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
        Chaque soin est proposé parce qu'une praticienne de la maison le pratique
        depuis des années. Rien n'est ajouté pour étoffer la carte.
      </p>

      <div className="mt-12 flex flex-wrap gap-2 border-b border-border pb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
              active === c
                ? "bg-forest text-primary-foreground"
                : "text-muted-foreground hover:text-forest-deep"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="py-28 text-center">
          <h2 className="font-display text-3xl">Aucun soin dans cette famille</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Essayez une autre catégorie, ou écrivez-nous pour une demande sur
            mesure.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block border border-forest px-6 py-3 text-xs tracking-[0.16em] text-forest uppercase transition-colors hover:bg-forest hover:text-primary-foreground"
          >
            Nous écrire
          </Link>
        </div>
      ) : (
        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <article key={s.id} className="group">
              <Link
                to="/services/$serviceId"
                params={{ serviceId: s.id }}
                className="block overflow-hidden bg-muted"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  width={1000}
                  height={1250}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
                />
              </Link>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl">
                  {s.name}
                  {s.isNew && (
                    <span className="ml-3 align-middle text-[0.6rem] tracking-[0.2em] text-amber-clay uppercase">
                      Nouveau
                    </span>
                  )}
                </h2>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {s.price} DT
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.tagline}
              </p>
              <div className="mt-5 flex items-center gap-5">
                <Link
                  to="/booking"
                  search={{ service: s.id }}
                  className="border border-forest px-4 py-2.5 text-[0.65rem] tracking-[0.16em] text-forest uppercase transition-colors hover:bg-forest hover:text-primary-foreground"
                >
                  Réserver
                </Link>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: s.id }}
                  className="link-underline text-xs text-forest-deep"
                >
                  Détails · {s.duration} min
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
