// Dictionnaire français — source de référence pour la structure des textes.
// Le type `Dictionary` est dérivé de cet objet ; en.ts doit suivre la même forme.

export const fr = {
  common: {
    account: "Compte",
    cart: "Panier",
    menu: "Menu",
    discover: "Découvrir",
    addToCart: "Ajouter au panier",
    outOfStock: "Rupture de stock",
    chooseOption: "Choisir une option",
    chooseOptions: "Choisir les options",
    signIn: "Se connecter",
    backToCart: "Retour au panier",
    back: "Retour",
    language: "Langue",
    allRightsReserved: "Tous droits réservés.",
  },
  nav: {
    home: "Accueil",
    product: "Le Climaire",
    account: "Compte",
    cart: "Panier",
  },
  hero: {
    eyebrow: "CLIMIDEX · Climaire",
    title1: "Une présence légère.",
    title2: "Un confort immédiat.",
    description:
      "Le Climaire diffuse un flux d'air régulier et silencieux, sans pales apparentes. Une technologie utile, rien de superflu.",
    discover: "Découvrir",
    fromPrice: "À partir de",
    placeholder: "Climaire",
  },
  landing: {
    intro:
      "Une technologie utile, rien de superflu. Le Climaire se concentre sur l'essentiel : un air agréable, en toute discrétion.",
    features: [
      {
        eyebrow: "Diffusion sans pales",
        title: "Un souffle continu, sans turbulence",
        body: "Sans pales apparentes, le Climaire projette un flux d'air enveloppant et régulier. L'air circule sans à-coups, pour une sensation de fraîcheur constante plutôt qu'un courant intermittent.",
      },
      {
        eyebrow: "Silence maîtrisé",
        title: "Une présence que l'on oublie",
        body: "Entre 35 et 39 dB, le Climaire reste en retrait du quotidien. Assez discret pour une chambre la nuit, assez présent pour rafraîchir une pièce de vie en journée.",
      },
      {
        eyebrow: "Contrôle immédiat",
        title: "Huit vitesses, à portée de main",
        body: "Huit niveaux d'intensité pour ajuster le confort au degré près. Le réglage est immédiat, sans menu ni latence : vous sentez la différence à l'instant.",
      },
      {
        eyebrow: "Usage toute saison",
        title: "Pensé pour rester en place",
        body: "Sobre et compact, le Climaire trouve sa place sur un bureau, une console ou au sol. Son moteur électrique consomme peu et dure, saison après saison.",
      },
    ],
    specsEyebrow: "Caractéristiques",
    specsTitle: "Tout ce qui compte, et rien d'autre.",
    specs: [
      { label: "Surface indicative", value: "Jusqu'à 20 m²" },
      { label: "Vitesses", value: "8 niveaux" },
      { label: "Niveau sonore", value: "35 – 39 dB" },
      { label: "Moteur", value: "DC sans balais" },
      { label: "Minuterie", value: "1 – 8 h" },
      { label: "Commande", value: "Tactile + télécommande" },
      { label: "Structure", value: "ABS haute résistance" },
      { label: "Dimensions (L×P×H)", value: "140 × 140 × 560 mm" },
      { label: "Modes", value: "Cool · Heat* · Purify*" },
    ],
    specsNote: "* Chauffage et purification disponibles selon la configuration.",
    ctaTitle: "Le confort, sans le superflu.",
    ctaButton: "Découvrir le Climaire",
  },
  home: {
    heroEyebrow: "Ventilateur sans pales",
    heroTitle1: "Respirez.",
    heroTitle2: "Il s'occupe du reste.",
    heroDescription:
      "Le Climaire diffuse un air régulier et silencieux, sans pales ni surface tranchante. Facile à nettoyer, sûr autour des enfants.",
    heroAlt: "Le Climaire dans un intérieur lumineux et épuré",
    discoverClimaire: "Découvrir le Climaire",
    heroTrust: "Livraison offerte · Paiement sécurisé",
    stats: [
      { value: "35–39 dB", label: "Niveau sonore" },
      { value: "8 vitesses", label: "Réglage précis" },
      { value: "20 m²", label: "Surface couverte" },
    ],
    principlesTitle: "Trois principes, une seule pièce.",
    principles: [
      {
        title: "Sans pales",
        body: "Un flux d'air enveloppant, sans turbulence ni surface tranchante. Sûr autour des enfants.",
      },
      {
        title: "Silencieux",
        body: "35 à 39 dB, avec un mode nuit. Assez discret pour dormir juste à côté.",
      },
      {
        title: "Sobre",
        body: "Moteur électrique sobre et coque ABS : peu de bruit, peu d'entretien.",
      },
    ],
    lifestyleEyebrow: "Design",
    lifestyleTitle: "Il s'intègre partout.",
    lifestyleBody:
      "Format vertical et compact : sur une console, un bureau ou posé au sol. Il prend peu de place et se nettoie en un geste.",
    lifestyleAlt: "Le Climaire intégré dans un salon moderne et lumineux",
    techEyebrow: "Technologie",
    techTitle: "Comment ça marche.",
    techBody:
      "Un moteur électrique aspire l'air par la base et le diffuse par l'anneau, en un flux continu et régulier. Sans pale : silencieux, sûr et facile à nettoyer.",
    techCta: "Voir les caractéristiques",
    techAlt: "Le Climaire sur un bureau, technologie de flux d'air",
    ctaTitle: "Le Climaire, chez vous.",
    ctaShipping: "Livraison offerte en 5 à 9 jours, partout en France.",
    ctaAlt: "Le Climaire dans un intérieur de standing",
    metaTitle: "Le Climaire · Site officiel · Ventilateur sans pales",
    metaDescription:
      "Silencieux (35 dB), 8 vitesses & mode nuit. Sûr pour les enfants, sans pales. Rafraîchit jusqu'à 20 m². Livraison offerte partout en France, paiement sécurisé.",
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Armez-vous contre la canicule",
    body: "Nos conseils pour garder la tête froide cet été, et nos nouveautés. Désinscription en un clic.",
    emailPlaceholder: "Votre adresse email",
    subscribe: "S'inscrire",
    thanks: "Merci, vous êtes inscrit !",
    alreadySubscribed: "Vous êtes déjà inscrit, merci !",
    genericError: "Une erreur est survenue.",
  },
  footer: {
    tagline: "Le Climaire : un ventilateur sans pales, silencieux et facile à nettoyer.",
    productColumn: "Le produit",
    product: "Le Climaire",
    cart: "Panier",
    accountColumn: "Compte",
    myAccount: "Mon compte",
    myOrders: "Mes commandes",
    legalColumn: "Informations",
    about: "À propos",
    legal: "Mentions légales",
    terms: "CGV",
    returns: "Retours & remboursements",
    privacy: "Confidentialité",
    faq: "FAQ",
    contact: "Contact",
  },
  faq: {
    title: "Questions fréquentes",
    lead: "Tout ce qu'il faut savoir sur le Climaire, la livraison et les retours. Une autre question ? Écrivez-nous à contact@climidex.com.",
    items: [
      {
        q: "Comment fonctionne un ventilateur sans pales ?",
        a: "Un moteur électrique aspire l'air par la base et le propulse à travers l'anneau, créant un flux d'air régulier et enveloppant. Aucune pale n'est apparente : c'est plus sûr, plus silencieux et bien plus facile à nettoyer qu'un ventilateur classique.",
      },
      {
        q: "Le Climaire est-il vraiment silencieux ?",
        a: "Oui. Il fonctionne entre 35 et 39 dB selon la vitesse, avec un mode nuit. C'est assez discret pour dormir juste à côté, dans une chambre.",
      },
      {
        q: "Est-il sûr pour les enfants et les animaux ?",
        a: "Absolument. Sans pale accessible ni surface tranchante, il n'y a aucun risque pour les doigts curieux ni pour les animaux. C'est l'un de ses grands avantages face aux ventilateurs à pales.",
      },
      {
        q: "Quelle surface peut-il rafraîchir ?",
        a: "Jusqu'à environ 20 m², soit une chambre, un bureau ou un salon de taille standard. Ses 8 vitesses permettent d'ajuster le flux d'air au degré près.",
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "La livraison est offerte partout en France, sous 5 à 9 jours ouvrés. Vous recevez un email avec un numéro de suivi dès l'expédition de votre commande.",
      },
      {
        q: "Puis-je retourner le produit si je change d'avis ?",
        a: "Oui. Vous disposez de 14 jours après réception pour changer d'avis et être intégralement remboursé, sans avoir à vous justifier. Les détails figurent sur notre page Retours & remboursements.",
      },
      {
        q: "Le produit est-il garanti ?",
        a: "Oui, tous nos produits bénéficient de la garantie légale de conformité de 2 ans. En cas de défaut, écrivez-nous à contact@climidex.com et nous nous en occupons.",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Totalement. Les paiements sont traités par Stripe (carte bancaire, Apple Pay, Google Pay). Vos données bancaires ne transitent jamais par nos serveurs.",
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Dès l'expédition, vous recevez un email avec le lien de suivi. Vous retrouvez aussi l'état de vos commandes à tout moment dans votre compte client.",
      },
      {
        q: "Comment nettoyer le Climaire ?",
        a: "Un simple coup de chiffon sec ou légèrement humide sur l'anneau et la base suffit. Sans pale ni grille, il n'y a pas de recoins où la poussière s'accumule.",
      },
    ],
  },
  legal: {
    aboutTitle: "À propos de CLIMIDEX",
    aboutBody: `Une seule mission : bien vous rafraîchir.

CLIMIDEX est une jeune marque française fondée en 2026, avec un parti pris assumé : plutôt que de vendre cinquante gadgets, nous nous concentrons sur un seul produit, le Climaire, et nous le faisons bien.

Pourquoi un ventilateur sans pales ?
Parce que c'est la technologie la plus agréable au quotidien : un flux d'air régulier plutôt que des rafales, un silence compatible avec une chambre (35 à 39 dB), aucune pale accessible pour les doigts des enfants ou la curiosité des animaux, et un nettoyage qui prend dix secondes. Nous avons sélectionné le Climaire après avoir comparé les modèles disponibles sur les critères qui comptent vraiment : bruit, sécurité, consommation et durabilité.

Nos engagements
• Livraison offerte et suivie, sous 5 à 9 jours ouvrés, partout en France.
• Paiement 100 % sécurisé par Stripe (carte, Apple Pay, Google Pay) : vos données bancaires ne passent jamais par nos serveurs.
• 14 jours pour changer d'avis, remboursement intégral, et garantie légale de 2 ans.
• Un service client qui répond en français, sous 48 h ouvrées, à contact@climidex.com.

Qui sommes-nous ?
CLIMIDEX est l'enseigne de Melvin Sokambi, entrepreneur individuel immatriculé en France (SIREN 889 863 361). Une petite structure, volontairement : vous écrivez, un humain vous répond.

Une question avant de commander ? Écrivez-nous, nous serons ravis d'aider : contact@climidex.com.`,
    legalTitle: "Mentions légales",
    termsTitle: "Conditions générales de vente",
    returnsTitle: "Retours & remboursements",
    privacyTitle: "Politique de confidentialité",
    contactTitle: "Contact",
    legalBody: `Éditeur du site
Le site climidex.com (ci-après « le Site ») est édité sous l'enseigne CLIMIDEX par Melvin Sokambi, entrepreneur individuel.
SIREN : 889 863 361. SIRET (siège) : 889 863 361 00024.
Siège : 62 rue d'Amsterdam, 75009 Paris, France
Directeur de la publication : Melvin Sokambi.
Contact : contact@climidex.com

Hébergement
Le Site est hébergé par Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Allemagne (www.hetzner.com). Les services de DNS et de diffusion de contenu sont fournis par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis.

Propriété intellectuelle
L'ensemble des éléments du Site (textes, visuels, logos, marque CLIMIDEX, modèles 3D) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.

Responsabilité
CLIMIDEX s'efforce d'assurer l'exactitude des informations publiées sur le Site mais ne saurait être tenue responsable des erreurs, omissions ou indisponibilités temporaires du service.

Signalement
Pour signaler un contenu ou poser une question relative au Site : contact@climidex.com.`,
    termsBody: `Version en vigueur au 5 juillet 2026.

1. Objet et champ d'application
Les présentes conditions générales de vente (« CGV ») régissent les ventes de produits conclues sur le site climidex.com entre CLIMIDEX, enseigne de Melvin Sokambi, entrepreneur individuel, SIREN 889 863 361, 62 rue d'Amsterdam, 75009 Paris (« le Vendeur »), et tout consommateur (« le Client »). Toute commande implique l'acceptation sans réserve des présentes CGV.

2. Produits
Les produits proposés (notamment le ventilateur sans pales Climaire) sont décrits avec la plus grande exactitude possible. Les photographies et visuels 3D n'ont pas de valeur contractuelle.

3. Prix
Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison éventuels précisés avant validation de la commande. CLIMIDEX se réserve le droit de modifier ses prix à tout moment, le produit étant facturé au tarif en vigueur au moment de la validation de la commande.

4. Commande
La commande est confirmée après validation du paiement. Un e-mail de confirmation récapitulant la commande est envoyé au Client. CLIMIDEX se réserve le droit de refuser toute commande anormale ou passée de mauvaise foi.

5. Paiement
Le paiement s'effectue en ligne par carte bancaire via la plateforme sécurisée Stripe. Les données de carte ne transitent jamais par les serveurs de CLIMIDEX. La commande est débitée à la validation.

6. Livraison
Les produits sont livrés à l'adresse indiquée par le Client, en France métropolitaine et dans l'Union européenne. La livraison standard est offerte. Délai indicatif : 5 à 9 jours ouvrés à compter de la confirmation de commande. En cas de retard de plus de 30 jours par rapport à la date annoncée, le Client peut résoudre la commande et être remboursé.

7. Droit de rétractation
Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à motiver sa décision. Les modalités sont détaillées dans notre page « Retours & remboursements ». Le remboursement intervient au plus tard 14 jours après récupération du produit ou preuve d'expédition du retour.

8. Garanties légales
Tous les produits bénéficient de la garantie légale de conformité (articles L.217-3 et suivants du Code de la consommation, 2 ans) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil). En cas de défaut, contactez contact@climidex.com.

9. Responsabilité
La responsabilité de CLIMIDEX ne saurait être engagée en cas d'inexécution due à un cas de force majeure ou au fait du Client.

10. Données personnelles
Le traitement des données du Client est décrit dans la Politique de confidentialité accessible sur le Site.

11. Médiation de la consommation
Conformément à l'article L.612-1 du Code de la consommation, le Client peut recourir gratuitement à un médiateur de la consommation. CLIMIDEX finalise son adhésion à un dispositif de médiation agréé ; les coordonnées du médiateur seront publiées sur cette page dès validation et sont communiquées sur simple demande à contact@climidex.com. Plateforme européenne de règlement en ligne des litiges : ec.europa.eu/consumers/odr.

12. Droit applicable
Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.`,
    returnsBody: `Vous disposez d'un délai de 14 jours pour changer d'avis.

Droit de rétractation
Conformément au Code de la consommation, vous disposez de 14 jours calendaires à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier votre décision.

Comment retourner un produit ?
1. Écrivez-nous à contact@climidex.com en indiquant votre numéro de commande et votre souhait de retour.
2. Nous vous communiquons l'adresse de retour et les instructions sous 48 h ouvrées.
3. Renvoyez le produit complet, dans son emballage d'origine, de préférence avec un suivi. Les frais de retour restent à votre charge.

Remboursement
Le remboursement intégral (produit + frais de livraison standard initiaux) est effectué via le moyen de paiement utilisé lors de la commande, au plus tard 14 jours après réception du retour ou preuve d'expédition. Une décote peut être appliquée si le produit a été manipulé au-delà de ce qui est nécessaire pour l'essayer.

Produit défectueux ou erreur de notre part
Si le produit reçu est défectueux, endommagé ou ne correspond pas à votre commande, contactez-nous : le retour est alors à nos frais et vous choisissez entre remplacement et remboursement. Vous bénéficiez par ailleurs de la garantie légale de conformité de 2 ans.

Contact
Pour toute question : contact@climidex.com (réponse sous 48 h ouvrées).`,
    privacyBody: `Dernière mise à jour : 5 juillet 2026.

Responsable de traitement
CLIMIDEX, éditeur du site climidex.com. Contact : contact@climidex.com.

Données collectées
Nous collectons uniquement les données nécessaires au fonctionnement de la boutique : identité et coordonnées (nom, e-mail, téléphone), adresses de livraison et de facturation, historique de commandes, avis produits, inscription à la newsletter, et données techniques de connexion (logs).

Nous ne stockons jamais vos données bancaires : le paiement est traité directement par Stripe.

Finalités et bases légales
• Traitement et livraison des commandes : exécution du contrat.
• Gestion du compte client et du service après-vente : exécution du contrat.
• Envoi de la newsletter : consentement (désinscription possible à tout moment).
• Publication d'avis produits : consentement.
• Sécurité et prévention de la fraude : intérêt légitime.

Destinataires
Vos données sont transmises uniquement aux prestataires nécessaires à l'exécution de nos services : Stripe (paiement), Resend (envoi d'e-mails transactionnels), notre partenaire logistique pour l'expédition des commandes, Hetzner et Cloudflare (hébergement et sécurité). Certains prestataires peuvent traiter des données hors de l'Union européenne ; ces transferts sont encadrés par des clauses contractuelles types.

Durées de conservation
Données de compte : durée de la relation commerciale + 3 ans. Factures et données de commande : 10 ans (obligation comptable). Newsletter : jusqu'à désinscription.

Vos droits
Vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données, ainsi que du droit de définir des directives post-mortem. Pour les exercer : contact@climidex.com. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).

Cookies
Le Site utilise uniquement des cookies strictement nécessaires à son fonctionnement (session, panier, authentification). Aucun cookie publicitaire ou de suivi tiers n'est déposé.`,
    contactBody:
      "Une question sur le Climaire, votre commande ou un retour ? Écrivez-nous à contact@climidex.com. Nous répondons sous 48 h ouvrées.",
    contactLead:
      "Une question sur le Climaire, votre commande ou un retour ? Nous sommes là pour vous.",
    contactEmailLabel: "Écrivez-nous",
    contactEmail: "contact@climidex.com",
    contactHoursLabel: "Délai de réponse",
    contactHours: "Sous 48 h ouvrées",
    contactOrderLabel: "Suivi de commande",
    contactOrderText: "Retrouvez l'état de vos commandes dans votre compte.",
    contactOrderCta: "Voir mes commandes",
  },
  product: {
    from: "À partir de",
    original: "Prix initial :",
    addToCart: "Ajouter au panier",
    outOfStock: "Rupture de stock",
    chooseOption: "Choisir une option",
    chooseOptions: "Choisir les options",
    tabInfo: "Informations produit",
    tabShipping: "Livraison & retours",
    material: "Matériau",
    originCountry: "Pays d'origine",
    type: "Type",
    weight: "Poids",
    dimensions: "Dimensions",
    fastDelivery: "Livraison rapide",
    fastDeliveryText:
      "Livraison offerte, directement chez vous sous 5 à 9 jours ouvrés, avec numéro de suivi.",
    exchanges: "Échanges simples",
    exchangesText:
      "Le produit ne vous convient pas ? Aucun souci, nous l'échangeons sans difficulté.",
    returns: "Retours faciles",
    returnsText:
      "Renvoyez votre produit sous 14 jours et nous vous remboursons. Sans justificatif à fournir.",
    specsEyebrow: "Caractéristiques",
    specsTitle: "Caractéristiques techniques",
    relatedEyebrow: "À découvrir aussi",
    relatedTitle: "D'autres produits qui pourraient vous intéresser.",
    inStock: "En stock",
    shippedWithin: "Livraison offerte · 5 à 9 jours",
    storyEyebrow: "En bref",
    storyBody:
      "Le Climaire est un ventilateur sans pales à flux d'air régulier et homogène, silencieux et simple à piloter. Son format vertical libère l'espace au sol : il passe sur une console, un bureau ou au sol. Le moteur électrique reste discret, se nettoie facilement et n'a pas de pale apparente.",
    storyPoints: [
      {
        title: "Diffusion sans pales",
        body: "Flux d'air stable et homogène, sans pale apparente.",
      },
      {
        title: "Silence maîtrisé",
        body: "35 – 39 dB, avec mode nuit pour un usage discret.",
      },
      {
        title: "Contrôle immédiat",
        body: "8 vitesses, tactile + télécommande, minuterie 1 – 8 h.",
      },
      {
        title: "Usage toute saison",
        body: "Cool en été ; Heat et Purify selon la configuration.",
      },
    ],
    storyNote: "* Chauffage et purification disponibles selon la configuration.",
    reassurance: [
      { title: "Livraison offerte", body: "5 à 9 jours ouvrés" },
      { title: "Sans pales", body: "Sûr pour enfants et animaux" },
      { title: "Service client", body: "Réponse sous 48 h" },
      { title: "Paiement", body: "Carte via Stripe" },
    ],
    reviewsTitle: "Avis clients",
    reviewsCountLabel: "avis",
    reviewsEmpty: "Pas encore d'avis. Soyez le premier à donner le vôtre.",
    reviewsClose: "Fermer",
    reviewsLeave: "Laisser un avis",
    reviewsThanks:
      "Merci ! Votre avis a bien été envoyé. Il apparaîtra après validation.",
    reviewsNamePlaceholder: "Votre nom",
    reviewsTitlePlaceholder: "Titre (optionnel)",
    reviewsContentPlaceholder: "Votre avis",
    reviewsSubmit: "Publier mon avis",
    reviewsSending: "Envoi…",
    reviewsRequired: "Votre nom et votre commentaire sont requis.",
    reviewsFailed: "Échec de l'envoi.",
    galleryPrev: "Visuel précédent",
    galleryNext: "Visuel suivant",
  },
  cart: {
    title: "Votre panier",
    emptyText:
      "Votre panier est vide pour l'instant. Ajoutez le Climaire pour le remplir.",
    emptyCta: "Découvrir le Climaire",
    summary: "Récapitulatif",
    checkout: "Passer la commande",
    article: "Article",
    quantity: "Quantité",
    price: "Prix",
    total: "Total",
    signInTitle: "Vous avez déjà un compte ?",
    signInText: "Connectez-vous pour retrouver vos commandes et vos adresses.",
    remove: "Retirer",
    subtotal: "Sous-total",
    exclTaxes: "(TTC)",
    goToCart: "Voir le panier",
    emptyShort: "Votre panier est vide.",
    shipping: "Livraison",
    taxes: "Taxes",
    taxesIncluded: "Incluses",
    discount: "Remise",
    subtotalExcl: "Sous-total (hors livraison)",
    freeShipping: "Offerte",
    continueShopping: "Continuer mes achats",
  },
  checkout: {
    backToCart: "Retour au panier",
    back: "Retour",
    shippingAddress: "Adresse de livraison",
    sameAsBilling:
      "L'adresse de facturation est identique à l'adresse de livraison",
    billingAddress: "Adresse de facturation",
    firstName: "Prénom",
    lastName: "Nom",
    address: "Adresse",
    company: "Société",
    postalCode: "Code postal",
    city: "Ville",
    country: "Pays",
    state: "Région / État",
    email: "E-mail",
    phone: "Téléphone",
    edit: "Modifier",
    contact: "Contact",
    billingSame: "Adresse de facturation et de livraison identiques.",
    deliveryQuestion: "Comment souhaitez-vous être livré ?",
    pickup: "Retrait en magasin",
    store: "Magasin",
    chooseStore: "Choisissez un magasin proche",
    method: "Mode",
    greeting: "Bonjour",
    savedAddressPrompt: "Souhaitez-vous utiliser l'une de vos adresses enregistrées ?",
    enterCardDetails: "Saisir les informations de carte",
    selectPayment: "Sélectionnez un mode de paiement",
    placeOrderBtn: "Confirmer la commande",
    addPromo: "Ajouter un code promo",
    apply: "Appliquer",
    promoApplied: "Code(s) promo appliqué(s) :",
    removePromo: "Retirer le code promo",
    paymentDetails: "Détails du paiement",
    anotherStep: "Une étape supplémentaire s'affichera",
    reviewTerms:
      "En confirmant votre commande, vous reconnaissez avoir lu et accepté nos conditions générales de vente, conditions d'utilisation et notre politique de confidentialité.",
    addressStep: "Adresse",
    deliveryStep: "Livraison",
    paymentStep: "Paiement",
    reviewStep: "Récapitulatif",
    enterAddress: "Saisir une adresse",
    continueToDelivery: "Continuer vers la livraison",
    chooseDelivery: "Choisir un mode de livraison",
    continueToPayment: "Continuer vers le paiement",
    choosePayment: "Mode de paiement",
    enterPaymentDetails: "Saisir les informations de paiement",
    continueToReview: "Continuer vers la vérification",
    deliveryMethod: "Mode de livraison",
    payment: "Paiement",
    paymentMethod: "Mode de paiement",
    giftCard: "Carte cadeau",
    review: "Vérification",
    reviewText:
      "Vérifiez que vos informations sont correctes avant de finaliser votre commande.",
    placeOrder: "Confirmer la commande",
    termsPrefix: "En confirmant votre commande, vous acceptez nos",
    terms: "conditions d'utilisation",
    and: "et",
    privacy: "politique de confidentialité",
    inYourCart: "Dans votre panier",
    orderSummary: "Récapitulatif de la commande",
  },
  order: {
    thankYou: "Merci pour votre commande !",
    confirmationSent:
      "Votre commande a bien été enregistrée. Un e-mail de confirmation vous a été envoyé.",
    orderNumber: "Numéro de commande",
    orderDate: "Date de commande",
    detailsSentTo: "Nous avons envoyé la confirmation de commande à",
    orderStatus: "Statut de la commande",
    paymentStatus: "Statut du paiement",
    method: "Mode",
    paidAt: "payé le",
    needHelp: "Besoin d'aide ?",
    returnsExchanges: "Retours & échanges",
    summary: "Récapitulatif",
    details: "Détails de la commande",
    deliveryAddress: "Adresse de livraison",
    contact: "Contact",
    paymentMethod: "Mode de paiement",
  },
  account: {
    account: "Compte",
    overview: "Aperçu",
    profile: "Profil",
    addresses: "Adresses",
    orders: "Commandes",
    logOut: "Se déconnecter",
    hello: "Bonjour",
    signedInAs: "Connecté(e) en tant que :",
    completed: "Complété",
    saved: "Enregistrée(s)",
    recentOrders: "Commandes récentes",
    noRecentOrders: "Aucune commande récente",
    datePlaced: "Date",
    orderNumber: "N° de commande",
    totalAmount: "Montant total",
    goToOrder: "Voir la commande",
    // Profil
    profileTitle: "Profil",
    profileSubtitle:
      "Consultez et modifiez vos informations : nom, e-mail, téléphone, adresse de facturation et mot de passe.",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    password: "Mot de passe",
    billingAddress: "Adresse de facturation",
    edit: "Modifier",
    save: "Enregistrer",
    cancel: "Annuler",
    saveChanges: "Enregistrer les modifications",
    updatedSuccessfully: "Mis à jour avec succès",
    errorOccurred: "Une erreur est survenue, veuillez réessayer",
    firstName: "Prénom",
    lastName: "Nom",
    noBillingAddress: "Aucune adresse de facturation",
    // Adresses
    addressesTitle: "Adresses de livraison",
    addressesSubtitle:
      "Consultez et modifiez vos adresses de livraison. Vous pouvez en ajouter autant que vous le souhaitez.",
    newAddress: "Nouvelle adresse",
    addAddress: "Ajouter une adresse",
    editAddress: "Modifier l'adresse",
    addressName: "Intitulé",
    company: "Société",
    address: "Adresse",
    apartment: "Appartement, bureau, etc.",
    postalCode: "Code postal",
    city: "Ville",
    province: "Région / État",
    country: "Pays",
    addNew: "Ajouter",
    remove: "Supprimer",
    // Commandes
    ordersTitle: "Commandes",
    ordersSubtitle:
      "Consultez vos commandes passées et leur statut. Vous pouvez aussi demander un retour ou un échange.",
    noOrdersTitle: "Aucune commande",
    noOrdersText: "Vous n'avez pas encore passé de commande. Cela viendra !",
    continueShopping: "Continuer mes achats",
    orderDate: "Commande passée le",
    orderStatus: "Statut",
    seeDetails: "Voir les détails",
    item: "article",
    items: "articles",
    more: "de plus",
    nothingHere: "Rien à afficher ici",
    gotQuestions: "Une question ?",
    faqText:
      "Retrouvez les questions fréquentes et leurs réponses sur notre page service client.",
    customerService: "Service client",
    orderTransfers: "Rattacher une commande",
    transferPrompt:
      "Vous ne trouvez pas votre commande ? Rattachez-la à votre compte.",
    orderId: "N° de commande",
    requestTransfer: "Demander le rattachement",
    transferRequested: "Rattachement demandé pour la commande",
    transferEmailSent: "E-mail de rattachement envoyé à",
    welcomeBack: "Bon retour",
    signInSubtitle:
      "Connectez-vous pour suivre vos commandes et gérer vos adresses.",
    notMember: "Pas encore membre ?",
    createAccount: "Créer un compte",
    becomeMember: "Devenir membre CLIMIDEX",
    registerSubtitle:
      "Créez votre compte : commandes plus rapides, suivi et adresses enregistrées.",
    alreadyMember: "Déjà membre ?",
    signUp: "S'inscrire",
    agreePrefix: "En créant un compte, vous acceptez la",
    privacyPolicy: "politique de confidentialité",
    andThe: "et les",
    termsOfUse: "conditions d'utilisation",
    ofClimidex: "de CLIMIDEX.",
    verificationSent: "Nous avons envoyé un lien de vérification à",
    verifyThenSignIn:
      "Vérifiez votre boîte de réception pour confirmer votre e-mail, puis connectez-vous.",
  },
}
