import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const service = getService(params.serviceId);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Soin introuvable — ZenShe Spa" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.name} — ZenShe Spa` },
        { name: "description", content: service.tagline },
        { property: "og:title", content: `${service.name} — ZenShe Spa` },
        { property: "og:description", content: service.tagline },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetailPage,
});

function ServiceNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-40 text-center">
      <p className="eyebrow">Introuvable</p>
      <h1 className="font-display mt-4 text-4xl">Ce soin n'existe pas</h1>
      <Link
        to="/services"
        className="mt-8 inline-block border border-forest px-6 py-3 text-xs tracking-[0.16em] text-forest uppercase transition-colors hover:bg-forest hover:text-primary-foreground"
      >
        Voir tous les soins
      </Link>
    </section>
  );
}

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-36 pb-20 lg:px-10">
        <Link
          to="/services"
          className="link-underline text-xs tracking-[0.14em] text-muted-foreground uppercase"
        >
          ← Tous les soins
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <img
              src={service.image}
              alt={service.name}
              width={1000}
              height={1250}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow">{service.category}</p>
            <h1 className="mt-5 text-5xl leading-[1]">{service.name}</h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>

            <dl className="mt-10 grid grid-cols-2 border-y border-border">
              <div className="border-r border-border py-5 pr-5">
                <dt className="eyebrow">Durée</dt>
                <dd className="font-display mt-1 text-2xl">
                  {service.duration} min
                </dd>
              </div>
              <div className="py-5 pl-5">
                <dt className="eyebrow">Tarif</dt>
                <dd className="font-display mt-1 text-2xl">
                  {service.price} DT
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <p className="eyebrow">Le déroulé</p>
              <ul className="mt-4 space-y-3">
                {service.includes.map((i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-clay" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/booking"
              search={{ service: service.id }}
              className="mt-12 inline-block bg-forest px-7 py-4 text-xs tracking-[0.16em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-forest-deep"
            >
              Réserver ce soin
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="eyebrow">À découvrir aussi</p>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((s) => (
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
                    className="aspect-[3/2] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="font-display mt-4 text-xl">{s.name}</h3>
                <p className="eyebrow mt-1">
                  {s.duration} min · {s.price} DT
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
