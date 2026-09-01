import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import serviceTwo from "@/assets/service-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "La maison — ZenShe Spa" },
      {
        name: "description",
        content:
          "Fondé en 2019 à La Marsa, ZenShe est un spa dédié à la santé intime féminine : praticiennes formées, discrétion, soins lents.",
      },
      { property: "og:title", content: "La maison — ZenShe Spa" },
      {
        property: "og:description",
        content:
          "Un spa dédié à la santé intime féminine, fondé en 2019 à La Marsa.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Bien-être féminin",
    body: "Nos protocoles sont écrits avec une sage-femme et une kinésithérapeute périnéale. Rien n'est improvisé.",
  },
  {
    title: "Approche holistique",
    body: "Le corps, le cycle, le sommeil et la charge mentale font partie du même entretien. Nous ne traitons pas une zone isolée.",
  },
  {
    title: "Discrétion & excellence",
    body: "Entrée privée, une seule cliente par créneau dans l'aile intime, dossiers chiffrés. Ce qui se dit ici reste ici.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-36 pb-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">La maison — depuis 2019</p>
            <h1 className="mt-6 text-5xl leading-[0.98] sm:text-6xl">
              Un lieu construit
              <br />
              <em className="font-normal">par des femmes</em>, pour
              <br />
              des femmes.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              ZenShe est né d'un constat simple : les femmes de Tunis n'avaient
              pas d'endroit où parler de leur corps intime sans gêne, ni se
              faire soigner par des praticiennes réellement formées à ces
              sujets. Nous avons ouvert quatre cabines dans une maison de La
              Marsa, et nous n'avons pas grandi depuis. C'est volontaire.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src={heroImage}
              alt="Intérieur de la maison ZenShe, murs vert forêt et lin écru"
              width={1408}
              height={1760}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 lg:px-10">
          {values.map((v, i) => (
            <div key={v.title}>
              <span className="font-display text-3xl text-amber-clay">
                0{i + 1}
              </span>
              <h2 className="font-display mt-4 text-2xl">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <img
              src={serviceTwo}
              alt="Préparation d'un masque à l'argile verte"
              loading="lazy"
              width={1000}
              height={1250}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <p className="eyebrow">Nos formulations</p>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
              Préparées à la maison, en petites quantités.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Les huiles, argiles et infusions utilisées en cabine sont
              composées sur place chaque semaine, à partir de plantes cultivées
              au Cap Bon. Pas de parfum de synthèse, pas de conservateur
              agressif — parce que les muqueuses ne pardonnent pas.
            </p>
            <Link
              to="/services"
              className="mt-10 inline-block border border-forest px-6 py-3.5 text-xs tracking-[0.16em] text-forest uppercase transition-colors hover:bg-forest hover:text-primary-foreground"
            >
              Découvrir les soins
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
