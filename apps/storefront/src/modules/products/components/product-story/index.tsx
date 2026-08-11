import Image from "next/image"

import { getI18n } from "@lib/i18n/server"

type Props = {
  buyHref?: string
}

const ProductStory = async ({}: Props) => {
  const { locale } = await getI18n()
  const isFrench = locale === "fr"

  const benefits = [
    {
      title: isFrench ? "Rafraîchit." : "Cools.",
      body: isFrench
        ? "Huit vitesses pour ajuster le souffle avec précision, sans pales apparentes."
        : "Eight speeds to adjust airflow precisely, without exposed blades.",
      image: "/product/climaire-gold-arc.webp",
      alt: isFrench ? "Anneau de diffusion du Climaire" : "Climaire airflow loop",
    },
    {
      title: isFrench ? "Chauffe." : "Heats.",
      body: isFrench
        ? "Une chaleur douce disponible selon la configuration, pensée pour les jours plus frais."
        : "Gentle heat, depending on configuration, designed for cooler days.",
      image: "/product/climaire-gold-display.webp",
      alt: isFrench ? "Écran de température du Climaire" : "Climaire temperature display",
    },
    {
      title: isFrench ? "Purifie." : "Purifies.",
      body: isFrench
        ? "Un filtre intégré contribue à rendre l’air intérieur plus agréable au quotidien."
        : "An integrated filter helps make indoor air more pleasant every day.",
      image: "/product/climaire-gold-filter.webp",
      alt: isFrench ? "Grille de filtration du Climaire" : "Climaire filter grille",
    },
  ]

  const finishes = [
    {
      name: isFrench ? "Ivoire Impérial" : "Imperial Ivory",
      image: "/product/climaire-gold-front.webp",
      softenEdges: false,
    },
    {
      name: isFrench ? "Noir Élysée" : "Élysée Black",
      image: "/product/climaire-anthracite-front.webp",
      softenEdges: false,
    },
    {
      name: isFrench ? "Bleu Bourbon" : "Bourbon Blue",
      image: "/product/climaire-blue-front.webp",
      softenEdges: true,
    },
  ]

  const comfortChapters = isFrench
    ? [
        {
          title: "Chaque détail a une fonction.",
          paragraphs: [
            "La conception du Climaire repose sur une idée simple : ne rien ajouter qui ne soit nécessaire.",
            "Chaque ligne, chaque proportion et chaque élément ont été étudiés pour créer une expérience cohérente. Son architecture sans pales permet de s’éloigner du ventilateur traditionnel pour créer une silhouette plus épurée, plus contemporaine et plus facilement intégrable dans un intérieur.",
            "L’interface reste volontairement claire. Les informations essentielles sont accessibles rapidement et les réglages sont pensés pour être compris sans apprentissage. La technologie est présente, mais elle ne cherche jamais à prendre le dessus. Elle travaille en arrière-plan.",
          ],
        },
        {
          title: "Une ventilation précise, pensée pour votre quotidien.",
          paragraphs: [
            "Le confort thermique ne dépend pas uniquement de la puissance d’un appareil. Il dépend également de la manière dont l’air est diffusé et de la capacité à adapter le flux à chaque situation.",
            "Le Climaire propose 8 niveaux de vitesse, permettant de moduler progressivement la ventilation : un flux léger pour accompagner un moment calme, un niveau intermédiaire pour travailler ou lire, et une ventilation plus soutenue lorsque la température augmente.",
            "Cette possibilité de réglage permet d’adapter l’utilisation de l’appareil à différents environnements et à différentes préférences. Vous choisissez l’intensité. Le Climaire s’adapte.",
          ],
        },
        {
          title: "Une architecture sans pales.",
          paragraphs: [
            "L’absence de pales visibles transforme immédiatement la perception du produit. Elle libère la silhouette et permet de créer une forme plus minimaliste.",
            "Cette conception répond également à une volonté plus large : repenser la relation entre technologie de ventilation et espace intérieur. Un ventilateur n’a plus besoin d’être un objet que l’on dissimule lorsque l’on ne l’utilise pas.",
            "Le Climaire a été conçu pour rester visible, s’intégrer à une pièce, accompagner son mobilier et appartenir à son environnement. La technologie devient alors une partie du design.",
          ],
        },
        {
          title: "Le confort commence par la simplicité.",
          paragraphs: [
            "Un produit peut intégrer une technologie complexe tout en restant simple à utiliser. C’est précisément cette expérience que nous recherchons.",
            "Les commandes du Climaire sont pensées pour aller directement à l’essentiel : modifier la vitesse, ajuster le fonctionnement et consulter les informations essentielles. Tout a été pensé pour réduire les manipulations inutiles.",
            "Parce qu’un bon appareil électronique ne devrait pas vous demander de réfléchir à son fonctionnement. Il devrait simplement fonctionner avec vous.",
          ],
        },
        {
          title: "Un objet technologique pensé pour votre intérieur.",
          paragraphs: [
            "Nous avons volontairement travaillé sur une silhouette capable de dépasser les codes traditionnels de l’électroménager.",
            "Le Climaire se situe à la rencontre du design industriel, de la technologie électronique, de l’ingénierie de ventilation, du confort thermique et de l’architecture intérieure.",
            "Cette approche crée un appareil qui ne se contente pas de remplir une fonction. Dans un salon, une chambre, un bureau, une suite ou un espace professionnel, son design minimaliste lui permet de rester présent sans devenir envahissant.",
          ],
        },
        {
          title: "Une conception premium, pensée différemment.",
          paragraphs: [
            "Les appareils de ventilation dotés d’une architecture sans pales, d’un design travaillé et de technologies avancées se positionnent généralement sur un segment de prix élevé. Certaines références comparables du marché français atteignent aujourd’hui 429 €.",
            "Chez Climidex, nous avons voulu remettre cette équation à plat : proposer une expérience exigeante sans rendre la technologie inaccessible.",
            "Nous ne cherchons pas à multiplier artificiellement les fonctionnalités pour justifier un prix. Nous préférons concentrer nos efforts sur ce qui compte réellement : la qualité de l’expérience, la simplicité, le confort et le design.",
          ],
        },
        {
          title: "La valeur est dans l’expérience.",
          paragraphs: [
            "Un appareil peut être beau, technologique et puissant. Le véritable défi consiste à réunir ces qualités sans que l’une compromette les autres.",
            "Le Climaire a été conçu dans cette logique. Son architecture donne une place importante au design, son système de ventilation est pensé autour du contrôle du flux d’air, ses réglages permettent d’adapter son utilisation et son interface privilégie la simplicité.",
            "Tout converge vers une même chose : votre confort.",
          ],
        },
        {
          title: "Une autre approche de l’équipement intérieur.",
          paragraphs: [
            "Les appareils électroniques et électroménagers ne sont plus seulement évalués sur leur fonction. Ils sont également choisis pour leur esthétique, leur ergonomie, leur intégration dans la maison et l’expérience qu’ils proposent.",
            "Le Climaire appartient à cette nouvelle génération : un appareil de ventilation qui ne ressemble pas nécessairement à un ventilateur traditionnel, un objet technologique qui ne cherche pas à montrer toute sa technologie et un équipement conçu pour rester naturellement présent dans votre espace.",
            "La technologie s’intègre. Le design demeure.",
          ],
        },
      ]
    : []

  return (
    <div id="product-story" className="w-full overflow-hidden bg-white scroll-mt-20">
      <section className="bg-black text-white">
        <div className="content-container grid min-h-[620px] grid-cols-1 items-center gap-8 py-16 small:grid-cols-[0.85fr_1.15fr] small:py-20">
          <div className="relative z-10">
            <h2 className="max-w-[9ch] text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              {isFrench ? "Un appareil. Quatre saisons." : "One device. Four seasons."}
            </h2>
            <p className="mt-8 max-w-[33rem] text-lg leading-8 text-white/65 small:text-xl">
              {isFrench
                ? "Il rafraîchit l’été, réchauffe l’hiver et prend soin de l’air toute l’année."
                : "It cools in summer, warms in winter and cares for your air all year round."}
            </p>
          </div>
          <div className="relative h-[440px] overflow-hidden bg-black small:h-[540px]">
            <Image
              src="/product/climaire-gold-front.webp"
              alt={isFrench ? "Climaire ivoire" : "Ivory Climaire"}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain p-3 small:p-5 [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_88%)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 small:py-24">
        <div className="content-container">
          <h2 className="max-w-[13ch] text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#1d1d1f]">
            {isFrench ? "Le confort, dans chaque détail." : "Comfort, in every detail."}
          </h2>
          <div className="mt-12 small:mt-20">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="grid min-h-[420px] grid-cols-1 border-t border-[#d2d2d7] small:grid-cols-2"
              >
                <div
                  className={`flex flex-col justify-center py-14 small:px-12 small:py-20 ${
                    index % 2 === 1 ? "small:order-2" : ""
                  }`}
                >
                  <h3 className="text-[clamp(2.3rem,4vw,4.25rem)] font-semibold leading-none tracking-[-0.05em] text-[#1d1d1f]">
                    {benefit.title}
                  </h3>
                  <p className="mt-6 max-w-[30rem] text-lg leading-8 text-[#6e6e73] small:text-xl">
                    {benefit.body}
                  </p>
                </div>
                <div
                  className={`relative min-h-[340px] overflow-hidden bg-white small:min-h-[500px] ${
                    index % 2 === 1 ? "small:order-1" : ""
                  }`}
                >
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover mix-blend-multiply"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white small:py-24">
        <div className="content-container grid grid-cols-1 items-center gap-12 small:grid-cols-[0.95fr_1.05fr] small:gap-20">
          <div>
            <h2 className="max-w-[10ch] text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              {isFrench ? "Le confort, au degré près." : "Comfort, down to the degree."}
            </h2>
            <p className="mt-8 max-w-[32rem] text-lg leading-8 text-white/60 small:text-xl">
              {isFrench
                ? "L’écran circulaire réunit la température et les commandes essentielles en un seul regard."
                : "The circular display brings temperature and essential controls together at a glance."}
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden bg-black">
            <Image
              src="/product/climaire-gold-display.webp"
              alt={isFrench ? "Écran circulaire affichant 24 degrés" : "Circular display showing 24 degrees"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white pb-8 pt-16 small:pb-10 small:pt-24">
        <div className="content-container">
          <h2 className="max-w-[13ch] text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#1d1d1f]">
            {isFrench ? "Trois finitions. Une même exigence." : "Three finishes. The same standard."}
          </h2>
          <p className="mt-7 max-w-[38rem] text-lg leading-8 text-[#6e6e73] small:text-xl">
            {isFrench
              ? "Des couleurs conçues pour trouver naturellement leur place chez vous."
              : "Colours designed to find their place naturally in your home."}
          </p>
          <div className="mt-12 grid grid-cols-3 overflow-hidden rounded-[28px] bg-[#f5f5f7] px-2 small:mt-14 small:rounded-[40px] small:px-8">
            {finishes.map((finish) => (
              <article
                key={finish.name}
                className="group relative flex h-[320px] min-w-0 flex-col justify-end small:h-[500px]"
              >
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={finish.image}
                    alt={`Climaire ${finish.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={`object-contain object-bottom p-1 mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.035] small:p-5 ${
                      finish.softenEdges
                        ? "[mask-image:radial-gradient(ellipse_72%_82%_at_center,black_62%,transparent_100%)]"
                        : ""
                    }`}
                  />
                </div>
                <h3 className="pb-5 text-center text-sm font-semibold tracking-[-0.02em] text-[#1d1d1f] transition-transform duration-500 group-hover:-translate-y-1 small:pb-8 small:text-xl">
                  {finish.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isFrench && (
        <section className="bg-white py-14 text-[#1d1d1f] small:py-20">
          <div className="content-container">
            <div className="max-w-[48rem]">
              <p className="text-sm font-medium text-[#6e6e73]">Une nouvelle vision de la ventilation intérieure.</p>
              <h2 className="mt-3 text-[clamp(2.4rem,4.5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                Le confort, sans compromis.
              </h2>
              <div className="mt-7 space-y-4 text-base leading-7 text-[#515154] [&>p:nth-child(3)]:hidden small:text-lg small:leading-8">
                <p>Le confort ne devrait jamais être une question de compromis. C’est cette conviction qui a guidé la conception du Climaire.</p>
                <p>Nous avons voulu créer un appareil capable de réunir une ventilation maîtrisée, une utilisation intuitive, une conception soignée et un design suffisamment élégant pour trouver naturellement sa place dans un intérieur.</p>
                <p>Parce qu’un ventilateur accompagne nos journées de travail, nos moments de repos, nos nuits et nos espaces de vie, il ne devrait pas être pensé comme un simple appareil électroménager. Il devrait être pensé comme un véritable objet.</p>
              </div>
            </div>

            <div className="hidden">
              {comfortChapters.map((chapter, index) => (
                <details key={chapter.title} className="group py-7 small:py-9" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold tracking-[-0.025em] marker:hidden small:text-2xl">
                    <span>{chapter.title}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-xl font-normal text-white transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <div className="max-w-[54rem] space-y-4 pt-6 text-base leading-7 text-[#515154] small:text-lg small:leading-8">
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="hidden">
              <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Le confort, sans compromis.
              </h3>
              <p className="mt-7 text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
                8 niveaux de ventilation. Une architecture sans pales. Une conception minimaliste. Une interface intuitive. Un format pensé pour l’intérieur. Une approche centrée sur le confort.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
                Le Climaire rassemble ces éléments autour d’une même philosophie : faire mieux avec moins. Moins de complexité et de superflu. Plus de contrôle, de simplicité et d’attention portée au design.
              </p>
              <p className="mt-8 text-2xl font-semibold tracking-[-0.03em]">Climaire. Le confort, sans compromis.</p>
            </div>
          </div>
        </section>
      )}

      {isFrench && (
        <section className="bg-white py-20 small:py-28">
          <div className="content-container grid gap-12 large:grid-cols-[0.72fr_1.28fr] large:gap-24">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Confort toute saison</p>
              <h2 className="mt-4 max-w-[10ch] text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#1d1d1f]">
                Du frais à la chaleur.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
              <p>Le Climaire accompagne votre confort au fil des saisons. Pensé comme un véritable appareil de confort thermique, il s’intègre naturellement dans votre quotidien.</p>
              <p>Profitez d’une ventilation adaptée lorsque les températures augmentent. Et lorsque l’air devient plus frais, adaptez simplement votre environnement à vos besoins.</p>
              <p>Son architecture minimaliste associe technologie, simplicité et design intérieur. Chaque détail est pensé pour offrir une expérience intuitive et agréable.</p>
              <p>Sa silhouette contemporaine transforme la ventilation en véritable objet de design. Une approche qui réunit performance, confort et élégance dans un même appareil.</p>
              <p>Pour la chambre, le salon, le bureau ou les espaces de vie, le Climaire accompagne votre intérieur sans en perturber l’harmonie.</p>
              <p className="pt-3 font-semibold text-[#1d1d1f]">Une technologie pensée pour votre quotidien. Un confort conçu pour toutes les saisons.</p>
            </div>
          </div>
        </section>
      )}

      {isFrench && (
        <section className="bg-white py-20 small:py-28">
          <div className="content-container grid gap-12 large:grid-cols-[0.72fr_1.28fr] large:gap-24">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Air intérieur</p>
              <h2 className="mt-4 max-w-[11ch] text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#1d1d1f]">
                Respirez un air plus agréable.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
              <p>Le confort commence par l’air qui vous entoure. Le Climaire intègre un système de filtration conçu pour accompagner la qualité de l’air intérieur au quotidien.</p>
              <p>L’air est filtré avant d’être redistribué dans votre espace de vie. Une approche pensée pour associer ventilation et filtration dans un même appareil.</p>
              <p>Parce qu’un intérieur confortable ne dépend pas uniquement de sa température. Il dépend aussi de la sensation de fraîcheur et de la qualité de l’environnement.</p>
              <p>Le Climaire accompagne ainsi vos moments de repos, de travail et de détente. Sa technologie s’intègre dans une conception minimaliste pensée pour l’usage quotidien.</p>
              <p>Une solution de ventilation intérieure conçue pour les chambres, les bureaux et les espaces de vie. Moins d’éléments superflus. Plus de simplicité.</p>
              <p>Une expérience pensée autour du confort thermique et de la qualité de l’air intérieur, dans un appareil où technologie et design avancent ensemble.</p>
              <p className="pt-3 font-semibold text-[#1d1d1f]">Le Climaire. Une autre façon de penser l’air intérieur.</p>
            </div>
          </div>
        </section>
      )}

      {isFrench && (
        <section className="bg-white py-20 small:py-28">
          <div className="content-container grid gap-12 large:grid-cols-[0.72fr_1.28fr] large:gap-24">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Une ventilation adaptée à chaque instant.</p>
              <h2 className="mt-4 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#1d1d1f]">
                8 niveaux de vitesse.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
              <p>Le confort n’est jamais exactement le même d’un moment à l’autre. C’est pourquoi le Climaire permet d’ajuster progressivement l’intensité du flux d’air selon vos besoins.</p>
              <p>Une ventilation légère pour accompagner un moment de repos. Un niveau intermédiaire pour travailler, lire ou regarder un film. Une puissance plus soutenue lorsque la température augmente.</p>
              <p>Plutôt que de fonctionner avec un réglage unique, le Climaire vous permet de contrôler précisément votre expérience de ventilation et d’adapter la circulation de l’air à votre environnement.</p>
              <p className="pt-3 font-semibold text-[#1d1d1f]">8 niveaux. Une ventilation pensée pour s’adapter à vous.</p>
            </div>
          </div>
        </section>
      )}

      {isFrench && (
        <section className="bg-white py-20 small:py-28">
          <div className="content-container grid gap-12 large:grid-cols-[0.72fr_1.28fr] large:gap-24">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Une présence sonore maîtrisée.</p>
              <h2 className="mt-4 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#1d1d1f]">
                35–39 dB.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
              <p>Le confort ne se mesure pas uniquement à la sensation de fraîcheur. Il se ressent également dans l’environnement sonore.</p>
              <p>Avec un niveau sonore annoncé compris entre 35 et 39 dB, le Climaire a été pensé pour accompagner les moments où le calme compte.</p>
              <p>Dans une chambre. Dans un bureau. Pendant une session de travail. Lors d’un moment de lecture. Ou simplement lorsque vous souhaitez profiter d’un intérieur plus agréable sans ajouter une présence sonore excessive.</p>
              <p>Cette conception permet d’envisager le Climaire comme un ventilateur pensé pour les espaces de vie, et pas uniquement comme un appareil destiné aux périodes de forte chaleur.</p>
              <p>Parce qu’un appareil utilisé quotidiennement doit savoir rester discret.</p>
              <p className="pt-3 font-semibold text-[#1d1d1f]">Une ventilation que l’on ressent. Un bruit que l’on maîtrise.</p>
            </div>
          </div>
        </section>
      )}

      {isFrench && (
        <section className="bg-white py-20 small:py-28">
          <div className="content-container grid gap-12 large:grid-cols-[0.72fr_1.28fr] large:gap-24">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Programmez votre confort.</p>
              <h2 className="mt-4 max-w-[9ch] text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#1d1d1f]">
                Minuterie 1–8 heures.
              </h2>
            </div>
            <div className="text-lg leading-8 text-[#515154] small:text-xl small:leading-9">
              <p>Le confort ne devrait pas nécessiter votre attention en permanence.</p>
              <p className="mt-5">Le Climaire intègre une minuterie réglable de 1 à 8 heures, permettant de programmer la durée de fonctionnement de l’appareil selon votre utilisation.</p>

              <div className="mt-10 divide-y divide-[#d2d2d7] border-y border-[#d2d2d7]">
                <div className="py-6">
                  <p className="font-semibold text-[#1d1d1f]">Pendant votre sommeil</p>
                  <p className="mt-2 text-base leading-7 small:text-lg">Réglez simplement la durée pendant laquelle vous souhaitez profiter de la ventilation.</p>
                </div>
                <div className="py-6">
                  <p className="font-semibold text-[#1d1d1f]">Pendant une session de travail</p>
                  <p className="mt-2 text-base leading-7 small:text-lg">Programmez le Climaire pour qu’il vous accompagne durant les prochaines heures.</p>
                </div>
                <div className="py-6">
                  <p className="font-semibold text-[#1d1d1f]">Pour rafraîchir une pièce</p>
                  <p className="mt-2 text-base leading-7 small:text-lg">Définissez simplement une période de fonctionnement adaptée à votre espace.</p>
                </div>
              </div>

              <p className="mt-9">Cette fonction apporte davantage de contrôle et évite de devoir penser à arrêter manuellement l’appareil. Une fonctionnalité discrète, mais essentielle dans l’expérience quotidienne.</p>
              <p className="mt-6 font-semibold text-[#1d1d1f]">De 1 à 8 heures. Votre confort, programmé selon votre rythme.</p>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[#d2d2d7] bg-white py-14 small:py-20">
        <div className="content-container flex flex-col justify-between gap-5 small:flex-row small:items-end">
          <h2 className="max-w-[12ch] text-[clamp(2.3rem,4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1d1d1f]">
            {isFrench ? "Conçu dans les moindres détails." : "Designed down to the last detail."}
          </h2>
          <p className="max-w-[25rem] text-base leading-7 text-[#6e6e73]">
            {isFrench
              ? "Découvrez maintenant ses caractéristiques techniques."
              : "Now discover its technical specifications."}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ProductStory
