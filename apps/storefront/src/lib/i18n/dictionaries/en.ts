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
    title1: "A light presence.",
    title2: "Immediate comfort.",
    description:
      "The Climaire delivers a steady, quiet airflow with no visible blades. Useful technology, nothing superfluous.",
    discover: "Discover",
    fromPrice: "From",
    placeholder: "Climaire",
  },
  landing: {
    intro:
      "Useful technology, nothing superfluous. The Climaire focuses on the essentials: pleasant air, discreetly.",
    features: [
      {
        eyebrow: "Bladeless diffusion",
        title: "A continuous breeze, without turbulence",
        body: "With no visible blades, the Climaire projects an enveloping, even airflow. Air circulates smoothly, for a constant sense of freshness rather than an intermittent draft.",
      },
      {
        eyebrow: "Mastered silence",
        title: "A presence you forget",
        body: "Between 35 and 39 dB, the Climaire stays in the background of daily life. Discreet enough for a bedroom at night, present enough to cool a living space by day.",
      },
      {
        eyebrow: "Immediate control",
        title: "Eight speeds, at your fingertips",
        body: "Eight intensity levels to fine-tune comfort to the degree. Adjustment is instant, with no menu or lag — you feel the difference right away.",
      },
      {
        eyebrow: "All-season use",
        title: "Designed to stay put",
        body: "Understated and compact, the Climaire fits on a desk, a console or the floor. Its brushless DC motor draws little power and lasts, season after season.",
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
    ctaTitle: "Comfort, without the superfluous.",
    ctaButton: "Discover the Climaire",
  },
  home: {
    heroEyebrow: "Bladeless fan",
    heroTitle: "Breathe. It handles the rest.",
    heroDescription:
      "The Climaire delivers a steady, quiet stream of air, with no blades or sharp surfaces. Easy to clean, safe around children.",
    heroAlt: "The Climaire in a bright, uncluttered interior",
    discoverClimaire: "Discover the Climaire",
    stats: [
      { value: "35–39 dB", label: "Noise level" },
      { value: "8 speeds", label: "Fine-grained control" },
      { value: "20 m²", label: "Room coverage" },
    ],
    principlesTitle: "Three principles, one single piece.",
    principles: [
      {
        title: "Bladeless",
        body: "An enveloping airflow, without turbulence or sharp surfaces. Safe around children.",
      },
      {
        title: "Quiet",
        body: "35 to 39 dB, with a night mode. Discreet enough to sleep right next to it.",
      },
      {
        title: "Efficient",
        body: "Brushless DC motor and ABS shell: little noise, little upkeep.",
      },
    ],
    lifestyleEyebrow: "Design",
    lifestyleTitle: "It fits in anywhere.",
    lifestyleBody:
      "A compact, vertical format: on a console, a desk or the floor. It takes up little space and wipes clean in seconds.",
    lifestyleAlt: "The Climaire in a bright, modern living room",
    techEyebrow: "Technology",
    techTitle: "How it works.",
    techBody:
      "A brushless DC motor draws air in through the base and releases it through the ring in a continuous, even flow. No blades: quiet, safe and easy to clean.",
    techCta: "See the specifications",
    techAlt: "The Climaire on a desk, airflow technology",
    ctaTitle: "The Climaire, at your place.",
    ctaShipping: "Delivered in 5 to 9 working days, anywhere in France.",
    ctaAlt: "The Climaire in an upscale interior",
    metaTitle: "CLIMIDEX · Climaire, the bladeless fan",
    metaDescription:
      "The Climaire: a bladeless fan, 35–39 dB, 8 speeds, for rooms up to 20 m². No exposed blades, easy to clean.",
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Gear up against the heatwave",
    body: "Our tips for keeping a cool head this summer, plus our latest news. Unsubscribe in one click.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    thanks: "Thank you, you're subscribed!",
    alreadySubscribed: "You're already subscribed, thank you!",
    genericError: "Something went wrong.",
  },
  footer: {
    tagline: "The Climaire: a bladeless fan, quiet, built to last.",
    productColumn: "The product",
    product: "The Climaire",
    cart: "Cart",
    accountColumn: "Account",
    myAccount: "My account",
    myOrders: "My orders",
    legalColumn: "Information",
    legal: "Legal notice",
    terms: "Terms of sale",
    returns: "Returns & refunds",
    privacy: "Privacy",
    contact: "Contact",
  },
  legal: {
    legalTitle: "Legal notice",
    termsTitle: "Terms of sale",
    returnsTitle: "Returns & refunds",
    privacyTitle: "Privacy policy",
    contactTitle: "Contact",
    legalBody: `Site publisher
The website climidex.com (the "Site") is published by CLIMIDEX, a business currently being registered with the French National Business Register. [Company name, legal form, SIREN and registered office — to be completed upon registration.]
Publishing director: the legal representative of CLIMIDEX.
Contact: contact@climidex.com

Hosting
The Site is hosted by Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Germany — www.hetzner.com. DNS and content delivery are provided by Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA.

Intellectual property
All elements of the Site (texts, visuals, logos, the CLIMIDEX brand, 3D models) are protected by intellectual property law. Any reproduction, representation or use, in whole or in part, without prior written authorisation is prohibited.

Liability
CLIMIDEX strives to keep the information on the Site accurate but cannot be held liable for errors, omissions or temporary unavailability of the service.

Reporting
To report content or ask a question about the Site: contact@climidex.com.`,
    termsBody: `Version in force as of 5 July 2026.

1. Purpose and scope
These terms of sale ("Terms") govern all sales of products concluded on climidex.com between CLIMIDEX (the "Seller") and any consumer (the "Customer"). Placing an order implies full acceptance of these Terms.

2. Products
The products offered (in particular the Climaire bladeless fan) are described as accurately as possible. Photographs and 3D visuals are not contractually binding.

3. Prices
Prices are shown in euros, all taxes included (VAT), excluding any delivery costs stated before the order is confirmed. CLIMIDEX may change its prices at any time; products are invoiced at the price in force when the order is confirmed.

4. Orders
An order is confirmed once payment has been validated. A confirmation e-mail summarising the order is sent to the Customer. CLIMIDEX reserves the right to refuse any abnormal or bad-faith order.

5. Payment
Payment is made online by card via the secure Stripe platform. Card details never pass through CLIMIDEX's servers. The order is charged upon validation.

6. Delivery
Products are delivered to the address provided by the Customer, in mainland France and the European Union. Indicative lead time: 7 to 15 working days from order confirmation. If delivery is more than 30 days late compared with the announced date, the Customer may cancel the order and be refunded.

7. Right of withdrawal
In accordance with articles L.221-18 et seq. of the French Consumer Code, the Customer has 14 days from receipt of the product to withdraw, without giving any reason. The procedure is detailed on our "Returns & refunds" page. The refund is made no later than 14 days after the product is recovered or proof of return shipment is provided.

8. Legal warranties
All products are covered by the legal warranty of conformity (articles L.217-3 et seq. of the French Consumer Code, 2 years) and the warranty against hidden defects (articles 1641 et seq. of the French Civil Code). In case of a defect, contact contact@climidex.com.

9. Liability
CLIMIDEX cannot be held liable for non-performance caused by force majeure or by the Customer.

10. Personal data
The processing of the Customer's data is described in the Privacy policy available on the Site.

11. Consumer mediation
In accordance with article L.612-1 of the French Consumer Code, the Customer may use a consumer mediator free of charge. [Mediator details — to be completed once a mediation scheme has been joined.] European online dispute resolution platform: ec.europa.eu/consumers/odr.

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
Any question: contact@climidex.com — we reply within 48 business hours.`,
    privacyBody: `Last updated: 5 July 2026.

Data controller
CLIMIDEX, publisher of climidex.com — contact@climidex.com.

Data we collect
We only collect the data needed to run the store: identity and contact details (name, e-mail, phone), delivery and billing addresses, order history, product reviews, newsletter subscription, and technical connection data (logs).

We never store your card details: payments are processed directly by Stripe.

Purposes and legal bases
• Order processing and delivery — performance of the contract.
• Customer account and after-sales service — performance of the contract.
• Newsletter — consent (you can unsubscribe at any time).
• Product reviews — consent.
• Security and fraud prevention — legitimate interest.

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
      "Your package arrives within 3 to 5 business days, at a pick-up point or directly at your door.",
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
    shippedWithin: "Ships within 5 to 9 days",
    storyEyebrow: "In short",
    storyBody:
      "The Climaire is a bladeless fan with a steady, even airflow, quiet and simple to control. Its vertical format frees up floor space: it fits on a console, a desk or the floor. The brushless DC motor stays discreet, cleans easily and has no exposed blades.",
    storyPoints: [
      {
        title: "Bladeless airflow",
        body: "Stable, even airflow with no exposed blades.",
      },
      {
        title: "Controlled silence",
        body: "35 – 39 dB, with a night mode for discreet use.",
      },
      {
        title: "Instant control",
        body: "8 speeds, touch + remote control, 1 – 8 h timer.",
      },
      {
        title: "All-season use",
        body: "Cool in summer; Heat and Purify depending on configuration.",
      },
    ],
    storyNote: "* Heating and purification available depending on configuration.",
    reassurance: [
      { title: "Delivery", body: "5 to 9 working days" },
      { title: "Bladeless", body: "Safe for children and pets" },
      { title: "Customer service", body: "Reply within 48 h" },
      { title: "Payment", body: "Card via Stripe" },
    ],
    reviewsTitle: "Customer reviews",
    reviewsCountLabel: "reviews",
    reviewsEmpty: "No reviews yet. Be the first to share yours.",
    reviewsClose: "Close",
    reviewsLeave: "Write a review",
    reviewsThanks:
      "Thank you! Your review has been sent. It will appear after moderation.",
    reviewsNamePlaceholder: "Your name",
    reviewsTitlePlaceholder: "Title (optional)",
    reviewsContentPlaceholder: "Your review",
    reviewsSubmit: "Publish my review",
    reviewsSending: "Sending…",
    reviewsRequired: "Your name and your comment are required.",
    reviewsFailed: "Failed to send.",
    galleryPrev: "Previous image",
    galleryNext: "Next image",
  },
  cart: {
    title: "Your cart",
    emptyText: "Your cart is empty for now. Add the Climaire to fill it.",
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
    subtotal: "Subtotal",
    exclTaxes: "(excl. taxes)",
    goToCart: "Go to cart",
    emptyShort: "Your cart is empty.",
    shipping: "Shipping",
    taxes: "Taxes",
    discount: "Discount",
    subtotalExcl: "Subtotal (excl. shipping and taxes)",
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
    noOrdersText: "You haven't placed any orders yet. That will change!",
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
