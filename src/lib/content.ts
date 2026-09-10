export type Service = {
  slug: string;
  number: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  introTitle: string;
  intro: string;
  capabilities: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "materials", number: "01", shortTitle: "Materials & Supply",
    title: "The right materials.\nWithout the complexity.",
    eyebrow: "MATERIALS & SUPPLY", tagline: "Reliable sourcing. Exceptional possibilities.",
    description: "Quality electrical components, cables, and computer systems — sourced around your specifications and delivered around your business.",
    image: "/images/electrical.jpg", imageAlt: "Precisely organized industrial electrical control systems and wiring",
    highlights: ["Electrical systems & components", "Cables", "Computer systems"],
    introTitle: "Built on quality.\nBacked by expertise.",
    intro: "Finding the right product is only the beginning. We bring technical understanding, thoughtful sourcing, and coordinated delivery together, so you can focus on the work that matters.",
    capabilities: [
      { title: "Technical product sourcing", text: "Share your specification, part number, or project requirement. We help identify suitable products and practical alternatives." },
      { title: "Coordinated procurement", text: "Simplify purchasing across product categories with one point of contact, aligned orders, and clear communication." },
      { title: "Project-focused supply", text: "From a single component to a broader installation, we plan the sourcing and delivery around your priorities." },
    ],
    faqs: [
      { question: "What materials can you help us source?", answer: "Our focus is electrical systems and components, power and data cables, and computer systems. Send your specification or a list of products and we will review the available sourcing options." },
      { question: "Can you work from a technical specification?", answer: "Yes. Include the manufacturer, part number, required quantity, technical requirements, and delivery location in your enquiry. We will discuss any details needed to prepare a suitable proposal." },
      { question: "Can supply and transportation be coordinated together?", answer: "Yes. Our materials, supply chain, and logistics services are designed to work together, giving you a consistent point of contact throughout the process." },
    ],
  },
  {
    slug: "supply-chain", number: "02", shortTitle: "Supply Chain Planning",
    title: "Supply Chain Planning\n& Optimization",
    eyebrow: "SUPPLY CHAIN PLANNING & CONSULTING", tagline: "Less uncertainty. More forward momentum.",
    description: "We design and manage efficient, resilient supply chains tailored to complex international operations. Our data-driven approach improves visibility, reduces costs, and strengthens operational continuity.",
    image: "/images/warehouse.jpg", imageAlt: "Bright modern distribution warehouse with organized storage racks",
    highlights: ["Demand and supply planning", "Inventory and network optimization", "Risk management and performance improvement"],
    introTitle: "A clearer view.\nA stronger supply chain.",
    intro: "A well-connected supply chain gives your business room to grow. We connect strategic thinking with operational realities to help you make informed decisions at every link.",
    capabilities: [
      { title: "Demand & supply planning", text: "Bring demand, procurement, and capacity into alignment. Build practical plans that respond to your customers and your operation." },
      { title: "Inventory & network optimization", text: "Review stock levels, distribution flows, and supplier networks to find the right balance between availability and working capital." },
      { title: "Risk & performance management", text: "Understand points of exposure, develop continuity plans, and use meaningful performance indicators to support better decisions." },
    ],
    faqs: [
      { question: "Where does a supply chain engagement begin?", answer: "We begin with a conversation about your goals, existing operations, and current challenges. From there, we agree on the information required for an initial assessment and a clearly defined scope." },
      { question: "Can you improve an existing supply chain?", answer: "Yes. We can review the way your current network operates, identify bottlenecks and risks, and develop practical improvements without assuming everything needs to change." },
      { question: "Do you support international operations?", answer: "Our approach considers cross-border supplier networks, lead times, transportation needs, and operational continuity. Tell us where you operate so we can assess your specific requirements." },
    ],
  },
  {
    slug: "logistics", number: "03", shortTitle: "Logistics & Transportation",
    title: "Moving your business.\nIn the right direction.",
    eyebrow: "LOGISTICS & TRANSPORTATION", tagline: "From the first mile to the final handover.",
    description: "Keep your goods and your business moving. We coordinate practical transportation solutions with clear communication from collection to delivery.",
    image: "/images/logistics.jpg", imageAlt: "Freight truck travelling on a highway toward distant mountains",
    highlights: ["Road & international freight", "Transport coordination", "Delivery planning & visibility"],
    introTitle: "Every delivery matters.\nEvery detail counts.",
    intro: "Reliable logistics connects the promise you make with the goods your customers receive. We help coordinate the route, the timing, and the details that keep your operation moving.",
    capabilities: [
      { title: "Freight coordination", text: "Find a transportation approach suited to your goods, origin, destination, and delivery requirements." },
      { title: "Cross-border logistics", text: "Navigate international transportation with coordinated communication and attention to the documentation your shipment needs." },
      { title: "Delivery planning", text: "Align collection and delivery windows with your business, keeping the people involved informed along the way." },
    ],
    faqs: [
      { question: "What do you need to prepare a transport proposal?", answer: "Please share collection and delivery addresses, cargo description, dimensions, weight, packaging, and preferred dates. Let us know about any special handling requirements as well." },
      { question: "Can you coordinate international shipments?", answer: "We can review cross-border transport requirements and coordinate an appropriate solution. Availability, routes, and timing are confirmed individually for each enquiry." },
      { question: "Can logistics be combined with your supply services?", answer: "Absolutely. We can connect product sourcing with delivery planning to reduce handovers and keep your project coordinated through one partner." },
    ],
  },
];

export const materialCategories = [
  {
    slug: "electrical-components", title: "Electrical Systems & Components", shortTitle: "Electrical components",
    image: "/images/electrical.jpg", imageAlt: "Industrial electrical control panel with detailed wiring",
    description: "The components behind reliable operations. Source electrical equipment and control solutions aligned with your project specifications.",
    items: ["Switchgear & protection devices", "Industrial control components", "Automation & distribution equipment", "Project-specific technical sourcing"],
  },
  {
    slug: "cables", title: "Cables & Connectivity", shortTitle: "Cables",
    image: "/images/cables.jpg", imageAlt: "Blue network cables organized in a technical installation",
    description: "Connect power, data, and possibility. Find suitable cable solutions for industrial installations, networks, and everyday infrastructure.",
    items: ["Power & installation cables", "Data & network cabling", "Control & instrumentation cables", "Connectors & cable accessories"],
  },
  {
    slug: "computer-systems", title: "Computer Systems", shortTitle: "Computer systems",
    image: "/images/servers.jpg", imageAlt: "Modern server infrastructure illuminated in blue",
    description: "Technology that supports your next step. Source dependable computer and network systems tailored to the way your business works.",
    items: ["Business computers & workstations", "Servers & storage solutions", "Network infrastructure", "Peripherals & supporting hardware"],
  },
];

export const enquiryServices = ["General enquiry", "Materials & Supply", "Electrical components", "Cables", "Computer systems", "Supply Chain Planning", "Logistics & Transportation", "Partnership opportunity"];

export const navigation = [
  { label: "Materials & Supply", href: "/materials" },
  { label: "Supply Chain", href: "/supply-chain" },
  { label: "Logistics", href: "/logistics" },
  { label: "About us", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Contacts", href: "/contacts" },
];
