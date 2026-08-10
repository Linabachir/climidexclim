import type { Dictionary } from "../dictionaries"

// Dictionnaire anglais. Doit respecter exactement la forme de `fr` (type Dictionary).

export const en: Dictionary = {
  common: {
    account: "Account",
    cart: "Cart",
    menu: "Menu",
    discover: "Discover",
    addToCart: "Add to cart",
    outOfStock: "Out of stock",
    chooseOption: "Choose an option",
    chooseOptions: "Choose options",
    signIn: "Sign in",
    backToCart: "Back to cart",
    back: "Back",
    language: "Language",
    allRightsReserved: "All rights reserved.",
  },
  nav: {
    home: "Home",
    product: "The Climaire",
    account: "Account",
    cart: "Cart",
  },
  hero: {
    eyebrow: "CLIMIDEX · Climaire",
    title1: "Barely there.",
    title2: "Instantly cooler.",
    description:
      "The Climaire delivers a smooth, quiet stream of air with no visible blades. Technology that earns its place, nothing more.",
    discover: "Discover",
    fromPrice: "From",
    placeholder: "Climaire",
  },
  landing: {
    intro:
      "No gimmicks: just technology that earns its place. The Climaire focuses on what matters: comfortable air, delivered quietly.",
    features: [
      {
        eyebrow: "Bladeless airflow",
        title: "A smooth, steady breeze",
        body: "With no visible blades, the Climaire wraps the room in soft, even airflow. No gusts, no choppy draft: just a constant feeling of freshness.",
      },
      {
        eyebrow: "Quiet by design",
        title: "A presence you forget",
        body: "At 35 to 39 dB, the Climaire fades into the background. Quiet enough for a bedroom at night, capable enough to cool a living room all day.",
      },
      {
        eyebrow: "Instant control",
        title: "Eight speeds, at your fingertips",
        body: "Eight levels to dial in exactly the comfort you want. Adjustments are instant: no menus, no lag, you feel the difference right away.",
      },
      {
        eyebrow: "Built for every season",
        title: "Designed to stay put",
        body: "Understated and compact, the Climaire is at home on a desk, a sideboard or the floor. Its efficient electric motor sips power and keeps going, season after season.",
      },
    ],
    specsEyebrow: "Specifications",
    specsTitle: "Everything that matters, nothing else.",
    specs: [
      { label: "Coverage", value: "Up to 20 m²" },
      { label: "Speeds", value: "8 levels" },
      { label: "Noise level", value: "35 – 39 dB" },
      { label: "Motor", value: "Brushless DC" },
      { label: "Timer", value: "1 – 8 h" },
      { label: "Controls", value: "Touch + remote" },
      { label: "Body", value: "High-strength ABS" },
      { label: "Dimensions (W×D×H)", value: "140 × 140 × 560 mm" },
      { label: "Modes", value: "Cool · Heat* · Purify*" },
    ],
    specsNote: "* Heating and purification available depending on configuration.",
    ctaTitle: "Comfort, minus the clutter.",
    ctaButton: "Discover the Climaire",
  },
  home: {
    heroEyebrow: "Bladeless fan",
    heroTitle1: "Breathe.",
    heroTitle2: "It handles the rest.",
    heroDescription:
      "The Climaire delivers a smooth, quiet stream of air, with no blades and no sharp edges. Easy to clean and safe around kids.",
    heroAlt: "The Climaire in a bright, uncluttered interior",
    discoverClimaire: "Discover the Climaire",
    heroTrust: "Free delivery · Secure payment",
    stats: [
      { value: "35–39 dB", label: "Whisper-quiet" },
      { value: "8 speeds", label: "Precise control" },
      { value: "20 m²", label: "Room coverage" },
    ],
    principlesTitle: "Three principles. One design.",
    principles: [
      {
        title: "Bladeless",
        body: "A soft, enveloping airflow with no turbulence and no sharp edges. Safe around kids.",
      },
      {
        title: "Quiet",
        body: "35 to 39 dB, with a night mode. Quiet enough to sleep right next to it.",
      },
      {
        title: "Efficient",
        body: "An efficient electric motor and ABS shell: low noise, low maintenance.",
      },
    ],
    lifestyleEyebrow: "Design",
    lifestyleTitle: "It fits right in.",
    lifestyleBody:
      "Slim and vertical, it works on a sideboard, a desk or the floor. It takes up next to no space and wipes clean in seconds.",
    lifestyleAlt: "The Climaire in a bright, modern living room",
    techEyebrow: "Technology",
    techTitle: "How it works.",
    techBody:
      "An electric motor draws air in through the base and releases it through the ring in one continuous, even flow. No blades: quiet, safe and easy to clean.",
    techCta: "See the specs",
    techAlt: "The Climaire on a desk, airflow technology",
    ctaTitle: "Bring the Climaire home.",
    ctaShipping: "Free delivery in 5 to 9 days, anywhere in France.",
    ctaAlt: "The Climaire in an upscale interior",
    metaTitle: "The Climaire · Official Site · Bladeless Fan",
    metaDescription:
      "Quiet (35 dB), 8 speeds & night mode. Safe around children, bladeless. Cools rooms up to 20 m². Free delivery across France, secure payment.",
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Stay ahead of the heat",
    body: "Tips for keeping cool this summer, plus what's new at CLIMIDEX. Unsubscribe anytime, in one click.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    thanks: "Thanks, you're on the list!",
    alreadySubscribed: "You're already on the list, thank you!",
    genericError: "Something went wrong. Please try again.",
  },
  trust: {
    delivery: "Free tracked delivery",
    deliverySub: "Across France, 5 to 9 days",
    service: "French customer service",
    serviceSub: "Reply within 48 business hours",
    warranty: "2-year warranty",
    warrantySub: "Legal warranty of conformity",
    payment: "100% secure payment",
    paymentSub: "Card, Apple Pay & Google Pay",
    payLabel: "Secure payment via",
  },
  footer: {
    tagline: "The Climaire: a bladeless fan that's quiet and built to last.",
    productColumn: "The product",
    product: "The Climaire",
    cart: "Cart",
    accountColumn: "Account",
    myAccount: "My account",
    myOrders: "My orders",
    legalColumn: "Information",
    about: "About us",
    legal: "Legal notice",
    terms: "Terms of sale",
    returns: "Returns & refunds",
    privacy: "Privacy",
    faq: "FAQ",
    contact: "Contact",
  },
  faq: {
    title: "Frequently asked questions",
    lead: "Everything you need to know about the Climaire, delivery and returns. Another question? Write to us at contact@climidex.com.",
    items: [
      {
        q: "How does a bladeless fan work?",
        a: "An electric motor draws air in through the base and pushes it out through the ring, creating a steady, enveloping airflow. With no exposed blades, it's safer, quieter and far easier to clean than a traditional fan.",
      },
      {
        q: "Is the Climaire really quiet?",
        a: "Yes. It runs between 35 and 39 dB depending on the speed, with a night mode. It's discreet enough to sleep right next to it, in a bedroom.",
      },
      {
        q: "Is it safe around children and pets?",
        a: "Absolutely. With no accessible blades or sharp surfaces, there's no risk for curious fingers or pets. It's one of its biggest advantages over bladed fans.",
      },
      {
        q: "What area can it cool?",
        a: "Up to around 20 m² — a bedroom, an office or a standard living room. Its 8 speeds let you fine-tune the airflow precisely.",
      },
      {
        q: "What are the delivery times?",
        a: "Delivery is free across France, within 5 to 9 working days. You receive an email with a tracking number as soon as your order ships.",
      },
      {
        q: "Can I return the product if I change my mind?",
        a: "Yes. You have 14 days after delivery to change your mind and be fully refunded, with no need to justify your decision. Details are on our Returns & refunds page.",
      },
      {
        q: "Is the product under warranty?",
        a: "Yes, all our products come with the 2-year legal warranty of conformity. In case of a defect, write to us at contact@climidex.com and we'll take care of it.",
      },
      {
        q: "Is payment secure?",
        a: "Completely. Payments are processed by Stripe (card, Apple Pay, Google Pay). Your card details never pass through our servers.",
      },
      {
        q: "How do I track my order?",
        a: "As soon as it ships, you receive an email with the tracking link. You can also check your order status anytime in your customer account.",
      },
      {
        q: "How do I clean the Climaire?",
        a: "A simple wipe with a dry or slightly damp cloth on the ring and base is enough. With no blades or grille, there are no nooks where dust builds up.",
      },
    ],
  },
  legal: {
    aboutTitle: "About CLIMIDEX",
    aboutBody: `One mission: keeping you properly cool.

CLIMIDEX is a young French brand founded in 2026, with a deliberate choice: rather than selling fifty gadgets, we focus on a single product, the Climaire, and we do it well.

Why a bladeless fan?
Because it is the most pleasant technology to live with: a steady stream of air instead of gusts, a noise level compatible with a bedroom (35 to 39 dB), no accessible blades for children's fingers or curious pets, and a ten-second cleaning routine. We selected the Climaire after comparing the available models on the criteria that actually matter: noise, safety, power consumption and durability.

Our commitments
• Free, tracked delivery within 5 to 9 working days across France.
• 100% secure payment through Stripe (card, Apple Pay, Google Pay): your card details never touch our servers.
• 14 days to change your mind, full refund, and a 2-year legal warranty.
• A customer service team that replies within 48 business hours at contact@climidex.com.

Who are we?
CLIMIDEX is led by Lina Bachir and Melvin Sokambi. The sole-trader business is registered in France (SIREN 889 863 361). A small structure, on purpose: when you write to us, a human answers.

A question before ordering? Write to us, we will be happy to help: contact@climidex.com.`,
    legalTitle: "Legal notice",
    termsTitle: "Terms of sale",
    returnsTitle: "Returns & refunds",
    privacyTitle: "Privacy policy",
    contactTitle: "Contact",
    legalBody: `Site publisher
The website climidex.com (the "Site") is published under the CLIMIDEX brand by Lina Bachir and Melvin Sokambi.
SIREN: 889 863 361. SIRET (head office): 889 863 361 00024.
Registered office: 62 rue d'Amsterdam, 75009 Paris, France
Publishing directors: Lina Bachir and Melvin Sokambi.
Contact: contact@climidex.com

Hosting
The Site is hosted by Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Germany (www.hetzner.com). DNS and content delivery are provided by Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA.

Intellectual property
All elements of the Site (texts, visuals, logos, the CLIMIDEX brand, 3D models) are protected by intellectual property law. Any reproduction, representation or use, in whole or in part, without prior written authorisation is prohibited.

Liability
CLIMIDEX strives to keep the information on the Site accurate but cannot be held liable for errors, omissions or temporary unavailability of the service.

Reporting
To report content or ask a question about the Site: contact@climidex.com.`,
    termsBody: `Version in force as of 5 July 2026.

1. Purpose and scope
These terms of sale ("Terms") govern all sales of products concluded on climidex.com between CLIMIDEX, led by Lina Bachir and operated through Melvin Sokambi’s sole-trader business, SIREN 889 863 361, 62 rue d'Amsterdam, 75009 Paris, France (the "Seller"), and any consumer (the "Customer"). Placing an order implies full acceptance of these Terms.

2. Products
The products offered (in particular the Climaire bladeless fan) are described as accurately as possible. Photographs and 3D visuals are not contractually binding.

3. Prices
Prices are shown in euros, all taxes included (VAT), excluding any delivery costs stated before the order is confirmed. CLIMIDEX may change its prices at any time; products are invoiced at the price in force when the order is confirmed.

4. Orders
An order is confirmed once payment has been validated. A confirmation e-mail summarising the order is sent to the Customer. CLIMIDEX reserves the right to refuse any abnormal or bad-faith order.

5. Payment
Payment is made online by card via the secure Stripe platform. Card details never pass through CLIMIDEX's servers. The order is charged upon validation.

6. Delivery
Products are delivered to the address provided by the Customer, in mainland France and the European Union. Standard delivery is free. Indicative lead time: 5 to 9 working days from order confirmation. If delivery is more than 30 days late compared with the announced date, the Customer may cancel the order and be refunded.

7. Right of withdrawal
In accordance with articles L.221-18 et seq. of the French Consumer Code, the Customer has 14 days from receipt of the product to withdraw, without giving any reason. The procedure is detailed on our "Returns & refunds" page. The refund is made no later than 14 days after the product is recovered or proof of return shipment is provided.

8. Legal warranties
All products are covered by the legal warranty of conformity (articles L.217-3 et seq. of the French Consumer Code, 2 years) and the warranty against hidden defects (articles 1641 et seq. of the French Civil Code). In case of a defect, contact contact@climidex.com.

9. Liability
CLIMIDEX cannot be held liable for non-performance caused by force majeure or by the Customer.

10. Personal data
The processing of the Customer's data is described in the Privacy policy available on the Site.

11. Consumer mediation
In accordance with article L.612-1 of the French Consumer Code, the Customer may use a consumer mediator free of charge. CLIMIDEX is finalising its membership of an approved mediation scheme; the mediator's details will be published on this page once confirmed and are available on request at contact@climidex.com. European online dispute resolution platform: ec.europa.eu/consumers/odr.

12. Governing law
These Terms are governed by French law. In the event of a dispute, an amicable solution will be sought before any legal action.`,
    returnsBody: `You have 14 days to change your mind.

Right of withdrawal
In accordance with the French Consumer Code, you have 14 calendar days from receipt of your order to withdraw, without giving any reason.

How to return a product
1. Write to us at contact@climidex.com with your order number and your wish to return the product.
2. We send you the return address and instructions within 48 business hours.
3. Ship the complete product back in its original packaging, preferably with tracking. Return shipping costs are borne by you.

Refund
The full refund (product + initial standard delivery costs) is made using the payment method used for the order, no later than 14 days after we receive the return or proof of shipment. A deduction may apply if the product has been handled beyond what is necessary to try it out.

Defective product or error on our part
If the product you received is defective, damaged or does not match your order, contact us: the return is then at our expense and you may choose between a replacement and a refund. You also benefit from the 2-year legal warranty of conformity.

Contact
Any question: contact@climidex.com (we reply within 48 business hours).`,
    privacyBody: `Last updated: 5 July 2026.

Data controller
CLIMIDEX, publisher of climidex.com. Contact: contact@climidex.com.

Data we collect
We only collect the data needed to run the store: identity and contact details (name, e-mail, phone), delivery and billing addresses, order history, product reviews, newsletter subscription, and technical connection data (logs).

We never store your card details: payments are processed directly by Stripe.

Purposes and legal bases
• Order processing and delivery: performance of the contract.
• Customer account and after-sales service: performance of the contract.
• Newsletter: consent (you can unsubscribe at any time).
• Product reviews: consent.
• Security and fraud prevention: legitimate interest.

Recipients
Your data is shared only with the providers required to deliver our services: Stripe (payments), Resend (transactional e-mails), our logistics partner for order shipment, Hetzner and Cloudflare (hosting and security). Some providers may process data outside the European Union; such transfers are governed by standard contractual clauses.

Retention periods
Account data: duration of the commercial relationship + 3 years. Invoices and order data: 10 years (accounting obligation). Newsletter: until you unsubscribe.

Your rights
You have the right to access, rectify, erase, restrict, object to and port your data, as well as the right to set post-mortem directives. To exercise them: contact@climidex.com. You may also lodge a complaint with the CNIL (cnil.fr).

Cookies
The Site only uses cookies that are strictly necessary for its operation (session, cart, authentication). No advertising or third-party tracking cookies are set.`,
    contactBody:
      "A question about the Climaire, your order or a return? Write to us at contact@climidex.com. We reply within 48 business hours.",
    contactLead:
      "A question about the Climaire, your order or a return? We're here to help.",
    contactEmailLabel: "Write to us",
    contactEmail: "contact@climidex.com",
    contactHoursLabel: "Response time",
    contactHours: "Within 48 business hours",
    contactOrderLabel: "Order tracking",
    contactOrderText: "Find the status of your orders in your account.",
    contactOrderCta: "View my orders",
  },
  product: {
    from: "From",
    original: "Original:",
    addToCart: "Add to cart",
    outOfStock: "Out of stock",
    chooseOption: "Choose an option",
    chooseOptions: "Choose options",
    tabInfo: "Product information",
    tabShipping: "Shipping & returns",
    material: "Material",
    originCountry: "Country of origin",
    type: "Type",
    weight: "Weight",
    dimensions: "Dimensions",
    fastDelivery: "Fast delivery",
    fastDeliveryText:
      "Free delivery to your door within 5 to 9 working days, with tracking.",
    exchanges: "Simple exchanges",
    exchangesText:
      "The product isn't quite right? No worries, we'll exchange it with no hassle.",
    returns: "Easy returns",
    returnsText:
      "Send your product back within 14 days and we'll refund you. No paperwork needed.",
    specsEyebrow: "Specifications",
    specsTitle: "Technical specifications",
    relatedEyebrow: "Also worth a look",
    relatedTitle: "Other products you might be interested in.",
    inStock: "In stock",
    shippedWithin: "Free delivery · 5 to 9 days",
    storyEyebrow: "At a glance",
    storyBody:
      "The Climaire is a bladeless fan built around a smooth, even airflow, quiet and effortless to control. Its slim vertical shape frees up floor space and works on a sideboard, a desk or the floor. The electric motor runs quietly, cleans easily, and there's not a blade in sight.",
    storyPoints: [
      {
        title: "Bladeless airflow",
        body: "A smooth, even stream of air with no exposed blades.",
      },
      {
        title: "Quiet by design",
        body: "35 – 39 dB, with a night mode for silent running.",
      },
      {
        title: "Instant control",
        body: "8 speeds, touch panel + remote, 1 – 8 h timer.",
      },
      {
        title: "Every season",
        body: "Cool in summer; Heat and Purify depending on configuration.",
      },
    ],
    storyNote: "* Heating and purification available depending on configuration.",
    reassurance: [
      { title: "Free delivery", body: "5 to 9 working days" },
      { title: "Bladeless", body: "Safe for kids and pets" },
      { title: "Customer care", body: "We reply within 48 h" },
      { title: "Payment", body: "Secure card payment via Stripe" },
    ],
    reviewsTitle: "Customer reviews",
    reviewsCountLabel: "reviews",
    reviewsEmpty: "No reviews yet. Be the first to share yours.",
    reviewsClose: "Close",
    reviewsLeave: "Write a review",
    reviewsThanks:
      "Thank you! Your review has been submitted and will appear once approved.",
    reviewsNamePlaceholder: "Your name",
    reviewsTitlePlaceholder: "Title (optional)",
    reviewsContentPlaceholder: "Your review",
    reviewsSubmit: "Submit review",
    reviewsSending: "Sending…",
    reviewsRequired: "Please add your name and your review.",
    reviewsFailed: "Something went wrong. Please try again.",
    galleryPrev: "Previous image",
    galleryNext: "Next image",
  },
  cart: {
    title: "Your cart",
    emptyText: "Your cart is empty. Add the Climaire to get started.",
    emptyCta: "Discover the Climaire",
    summary: "Summary",
    checkout: "Checkout",
    article: "Item",
    quantity: "Quantity",
    price: "Price",
    total: "Total",
    signInTitle: "Already have an account?",
    signInText: "Sign in for a smoother experience.",
    remove: "Remove",
    edit: "Edit",
    subtotal: "Subtotal",
    exclTaxes: "(tax incl.)",
    goToCart: "Go to cart",
    emptyShort: "Your cart is empty.",
    shipping: "Shipping",
    taxes: "Taxes",
    taxesIncluded: "Included",
    discount: "Discount",
    subtotalExcl: "Subtotal (excl. shipping)",
    freeShipping: "Free",
    continueShopping: "Continue shopping",
  },
  checkout: {
    backToCart: "Back to cart",
    back: "Back",
    shippingAddress: "Shipping address",
    sameAsBilling: "Billing address is the same as shipping address",
    billingAddress: "Billing address",
    firstName: "First name",
    lastName: "Last name",
    address: "Address",
    company: "Company",
    postalCode: "Postal code",
    city: "City",
    country: "Country",
    state: "State / Province",
    email: "Email",
    phone: "Phone",
    edit: "Edit",
    contact: "Contact",
    billingSame: "Billing and delivery address are the same.",
    deliveryQuestion: "How would you like your order delivered?",
    pickup: "Pick up your order",
    store: "Store",
    chooseStore: "Choose a store near you",
    method: "Method",
    greeting: "Hello",
    savedAddressPrompt: "Would you like to use one of your saved addresses?",
    enterCardDetails: "Enter card details",
    selectPayment: "Select a payment method",
    placeOrderBtn: "Place order",
    addPromo: "Add a promo code",
    apply: "Apply",
    promoApplied: "Promotion(s) applied:",
    removePromo: "Remove promo code",
    paymentDetails: "Payment details",
    anotherStep: "Another step will appear",
    reviewTerms:
      "By placing your order, you acknowledge that you have read and accept our terms of sale, terms of use and privacy policy.",
    addressStep: "Address",
    deliveryStep: "Delivery",
    paymentStep: "Payment",
    reviewStep: "Review",
    enterAddress: "Enter an address",
    continueToDelivery: "Continue to delivery",
    chooseDelivery: "Choose a delivery method",
    continueToPayment: "Continue to payment",
    choosePayment: "Payment method",
    enterPaymentDetails: "Enter payment details",
    continueToReview: "Continue to review",
    deliveryMethod: "Delivery method",
    payment: "Payment",
    paymentMethod: "Payment method",
    giftCard: "Gift card",
    review: "Review",
    reviewText:
      "Please confirm your details are correct before placing your order.",
    placeOrder: "Place order",
    termsPrefix: "By placing your order, you agree to our",
    terms: "terms of use",
    and: "and",
    privacy: "privacy policy",
    inYourCart: "In your cart",
    orderSummary: "Order summary",
  },
  order: {
    thankYou: "Thank you for your order!",
    confirmationSent:
      "Your order has been recorded. A confirmation email has been sent to you.",
    orderNumber: "Order number",
    orderDate: "Order date",
    detailsSentTo: "We have sent the order confirmation details to",
    orderStatus: "Order status",
    paymentStatus: "Payment status",
    method: "Method",
    paidAt: "paid at",
    needHelp: "Need help?",
    returnsExchanges: "Returns & exchanges",
    summary: "Summary",
    details: "Order details",
    deliveryAddress: "Delivery address",
    contact: "Contact",
    paymentMethod: "Payment method",
  },
  account: {
    account: "Account",
    overview: "Overview",
    profile: "Profile",
    addresses: "Addresses",
    orders: "Orders",
    logOut: "Log out",
    hello: "Hello",
    signedInAs: "Signed in as:",
    completed: "Completed",
    saved: "Saved",
    recentOrders: "Recent orders",
    noRecentOrders: "No recent orders",
    datePlaced: "Date placed",
    orderNumber: "Order number",
    totalAmount: "Total amount",
    goToOrder: "View order",
    profileTitle: "Profile",
    profileSubtitle:
      "View and update your information: name, email, phone, billing address and password.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    billingAddress: "Billing address",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    saveChanges: "Save changes",
    updatedSuccessfully: "Updated successfully",
    errorOccurred: "An error occurred, please try again",
    firstName: "First name",
    lastName: "Last name",
    noBillingAddress: "No billing address",
    notProvided: "Not provided",
    addressesTitle: "Shipping addresses",
    addressesSubtitle:
      "View and update your shipping addresses. You can add as many as you like.",
    newAddress: "New address",
    addAddress: "Add address",
    editAddress: "Edit address",
    addressName: "Label",
    company: "Company",
    address: "Address",
    apartment: "Apartment, suite, etc.",
    postalCode: "Postal code",
    city: "City",
    province: "State / Province",
    country: "Country",
    addNew: "Add",
    remove: "Remove",
    ordersTitle: "Orders",
    ordersSubtitle:
      "View your past orders and their status. You can also request a return or exchange.",
    noOrdersTitle: "No orders",
    noOrdersText: "You haven't placed any orders yet. Let's change that!",
    continueShopping: "Continue shopping",
    orderDate: "Order placed on",
    orderStatus: "Status",
    seeDetails: "See details",
    item: "item",
    items: "items",
    more: "more",
    nothingHere: "Nothing to see here",
    gotQuestions: "Got questions?",
    faqText:
      "You can find frequently asked questions and answers on our customer service page.",
    customerService: "Customer service",
    orderTransfers: "Order transfers",
    transferPrompt:
      "Can't find the order you are looking for? Connect an order to your account.",
    orderId: "Order ID",
    requestTransfer: "Request transfer",
    transferRequested: "Transfer requested for order",
    transferEmailSent: "Transfer request email sent to",
    welcomeBack: "Welcome back",
    signInSubtitle: "Sign in for a smoother shopping experience.",
    notMember: "Not a member yet?",
    createAccount: "Create an account",
    becomeMember: "Become a CLIMIDEX member",
    registerSubtitle:
      "Create your CLIMIDEX account and enjoy a smoother shopping experience.",
    alreadyMember: "Already a member?",
    signUp: "Sign up",
    agreePrefix: "By creating an account, you agree to the",
    privacyPolicy: "privacy policy",
    andThe: "and the",
    termsOfUse: "terms of use",
    ofClimidex: "of CLIMIDEX.",
    verificationSent: "We sent a verification link to",
    verifyThenSignIn: "Check your inbox to verify your email, then sign in.",
  },
}
