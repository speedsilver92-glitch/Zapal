import type { Locale } from "./i18n";

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

export type MaterialCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  imageAlt: string;
  description: string;
  items: string[];
};

export type ContentModel = {
  services: Service[];
  materialCategories: MaterialCategory[];
  enquiryServices: string[];
};

// Shared, non-translatable data (slugs, order numbers, images) is defined once
// and merged with the per-locale text below.
const serviceMeta = [
  { slug: "materials", number: "01", image: "/images/electrical.jpg" },
  { slug: "supply-chain", number: "02", image: "/images/warehouse.jpg" },
  { slug: "logistics", number: "03", image: "/images/logistics.jpg" },
];

const categoryMeta = [
  { slug: "electrical-components", image: "/images/electrical.jpg" },
  { slug: "cables", image: "/images/cables.jpg" },
  { slug: "computer-systems", image: "/images/servers.jpg" },
];

type ServiceText = Omit<Service, "slug" | "number" | "image">;
type CategoryText = Omit<MaterialCategory, "slug" | "image">;

type LocaleContent = {
  services: ServiceText[];
  materialCategories: CategoryText[];
  enquiryServices: string[];
};

const content: Record<Locale, LocaleContent> = {
  en: {
    services: [
      {
        shortTitle: "Materials & Supply",
        title: "The right materials.\nWithout the complexity.",
        eyebrow: "MATERIALS & SUPPLY", tagline: "Reliable sourcing. Exceptional possibilities.",
        description: "Quality electrical components, cables, and computer systems — sourced around your specifications and delivered around your business.",
        imageAlt: "Precisely organized industrial electrical control systems and wiring",
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
        shortTitle: "Supply Chain Planning",
        title: "Supply Chain Planning\n& Optimization",
        eyebrow: "SUPPLY CHAIN PLANNING & CONSULTING", tagline: "Less uncertainty. More forward momentum.",
        description: "We design and manage efficient, resilient supply chains tailored to complex international operations. Our data-driven approach improves visibility, reduces costs, and strengthens operational continuity.",
        imageAlt: "Bright modern distribution warehouse with organized storage racks",
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
        shortTitle: "Logistics & Transportation",
        title: "Moving your business.\nIn the right direction.",
        eyebrow: "LOGISTICS & TRANSPORTATION", tagline: "From the first mile to the final handover.",
        description: "Keep your goods and your business moving. We coordinate practical transportation solutions with clear communication from collection to delivery.",
        imageAlt: "Freight truck travelling on a highway toward distant mountains",
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
    ],
    materialCategories: [
      {
        title: "Electrical Systems & Components", shortTitle: "Electrical components",
        imageAlt: "Industrial electrical control panel with detailed wiring",
        description: "The components behind reliable operations. Source electrical equipment and control solutions aligned with your project specifications.",
        items: ["Switchgear & protection devices", "Industrial control components", "Automation & distribution equipment", "Project-specific technical sourcing"],
      },
      {
        title: "Cables & Connectivity", shortTitle: "Cables",
        imageAlt: "Blue network cables organized in a technical installation",
        description: "Connect power, data, and possibility. Find suitable cable solutions for industrial installations, networks, and everyday infrastructure.",
        items: ["Power & installation cables", "Data & network cabling", "Control & instrumentation cables", "Connectors & cable accessories"],
      },
      {
        title: "Computer Systems", shortTitle: "Computer systems",
        imageAlt: "Modern server infrastructure illuminated in blue",
        description: "Technology that supports your next step. Source dependable computer and network systems tailored to the way your business works.",
        items: ["Business computers & workstations", "Servers & storage solutions", "Network infrastructure", "Peripherals & supporting hardware"],
      },
    ],
    enquiryServices: ["General enquiry", "Materials & Supply", "Electrical components", "Cables", "Computer systems", "Supply Chain Planning", "Logistics & Transportation", "Partnership opportunity"],
  },
  sk: {
    services: [
      {
        shortTitle: "Materiály a dodávky",
        title: "Správne materiály.\nBez zbytočnej zložitosti.",
        eyebrow: "MATERIÁLY A DODÁVKY", tagline: "Spoľahlivé zásobovanie. Výnimočné možnosti.",
        description: "Kvalitné elektrické komponenty, káble a počítačové systémy — obstarané podľa vašich špecifikácií a dodané podľa potrieb vášho podnikania.",
        imageAlt: "Precízne usporiadané priemyselné elektrické riadiace systémy a kabeláž",
        highlights: ["Elektrické systémy a komponenty", "Káble", "Počítačové systémy"],
        introTitle: "Postavené na kvalite.\nPodložené odbornosťou.",
        intro: "Nájdenie správneho produktu je len začiatok. Spájame technické porozumenie, premyslené obstarávanie a koordinovanú dodávku, aby ste sa mohli sústrediť na to podstatné.",
        capabilities: [
          { title: "Technické obstarávanie produktov", text: "Pošlite nám svoju špecifikáciu, číslo dielu alebo požiadavku projektu. Pomôžeme identifikovať vhodné produkty a praktické alternatívy." },
          { title: "Koordinované obstarávanie", text: "Zjednodušte nákup naprieč kategóriami produktov s jedným kontaktným miestom, zosúladenými objednávkami a jasnou komunikáciou." },
          { title: "Dodávky zamerané na projekt", text: "Od jedného komponentu po rozsiahlu inštaláciu plánujeme obstarávanie a dodávku podľa vašich priorít." },
        ],
        faqs: [
          { question: "S akými materiálmi nám viete pomôcť?", answer: "Zameriavame sa na elektrické systémy a komponenty, silové a dátové káble a počítačové systémy. Pošlite nám svoju špecifikáciu alebo zoznam produktov a preveríme dostupné možnosti obstarania." },
          { question: "Viete pracovať podľa technickej špecifikácie?", answer: "Áno. Do dopytu uveďte výrobcu, číslo dielu, požadované množstvo, technické požiadavky a miesto dodania. Prediskutujeme všetky detaily potrebné na prípravu vhodnej ponuky." },
          { question: "Dá sa dodávka a doprava koordinovať spoločne?", answer: "Áno. Naše služby v oblasti materiálov, dodávateľského reťazca a logistiky sú navrhnuté tak, aby fungovali spoločne a poskytovali vám jedno stále kontaktné miesto." },
        ],
      },
      {
        shortTitle: "Plánovanie dodávateľského reťazca",
        title: "Plánovanie a optimalizácia\ndodávateľského reťazca",
        eyebrow: "PLÁNOVANIE A PORADENSTVO DODÁVATEĽSKÉHO REŤAZCA", tagline: "Menej neistoty. Viac pohybu vpred.",
        description: "Navrhujeme a riadime efektívne a odolné dodávateľské reťazce prispôsobené zložitým medzinárodným operáciám. Náš prístup založený na dátach zvyšuje prehľadnosť, znižuje náklady a posilňuje prevádzkovú kontinuitu.",
        imageAlt: "Svetlý moderný distribučný sklad s usporiadanými regálmi",
        highlights: ["Plánovanie dopytu a ponuky", "Optimalizácia zásob a siete", "Riadenie rizík a zlepšovanie výkonnosti"],
        introTitle: "Jasnejší pohľad.\nSilnejší dodávateľský reťazec.",
        intro: "Dobre prepojený dodávateľský reťazec dáva vášmu podnikaniu priestor na rast. Spájame strategické myslenie s prevádzkovou realitou, aby ste mohli robiť informované rozhodnutia v každom článku.",
        capabilities: [
          { title: "Plánovanie dopytu a ponuky", text: "Zosúlaďte dopyt, obstarávanie a kapacitu. Vytvorte praktické plány, ktoré reagujú na vašich zákazníkov a vašu prevádzku." },
          { title: "Optimalizácia zásob a siete", text: "Preskúmajte stavy zásob, distribučné toky a dodávateľské siete a nájdite správnu rovnováhu medzi dostupnosťou a pracovným kapitálom." },
          { title: "Riadenie rizík a výkonnosti", text: "Pochopte body zraniteľnosti, vypracujte plány kontinuity a využívajte zmysluplné ukazovatele výkonnosti na podporu lepších rozhodnutí." },
        ],
        faqs: [
          { question: "Kde sa spolupráca na dodávateľskom reťazci začína?", answer: "Začíname rozhovorom o vašich cieľoch, súčasnej prevádzke a aktuálnych výzvach. Následne sa dohodneme na informáciách potrebných pre úvodné posúdenie a jasne definovaný rozsah." },
          { question: "Viete zlepšiť existujúci dodávateľský reťazec?", answer: "Áno. Vieme preskúmať fungovanie vašej súčasnej siete, identifikovať úzke miesta a riziká a navrhnúť praktické zlepšenia bez predpokladu, že sa musí zmeniť všetko." },
          { question: "Podporujete medzinárodné operácie?", answer: "Náš prístup zohľadňuje cezhraničné dodávateľské siete, dodacie lehoty, prepravné potreby a prevádzkovú kontinuitu. Povedzte nám, kde pôsobíte, aby sme posúdili vaše konkrétne požiadavky." },
        ],
      },
      {
        shortTitle: "Logistika a doprava",
        title: "Posúvame vaše podnikanie.\nSprávnym smerom.",
        eyebrow: "LOGISTIKA A DOPRAVA", tagline: "Od prvej míle po finálne odovzdanie.",
        description: "Udržte svoj tovar a svoje podnikanie v pohybe. Koordinujeme praktické dopravné riešenia s jasnou komunikáciou od vyzdvihnutia po dodanie.",
        imageAlt: "Nákladné vozidlo idúce po diaľnici smerom k vzdialeným horám",
        highlights: ["Cestná a medzinárodná preprava", "Koordinácia dopravy", "Plánovanie dodávok a prehľad"],
        introTitle: "Na každej dodávke záleží.\nNa každom detaile záleží.",
        intro: "Spoľahlivá logistika spája sľub, ktorý dávate, s tovarom, ktorý vaši zákazníci dostanú. Pomáhame koordinovať trasu, načasovanie a detaily, ktoré udržia vašu prevádzku v pohybe.",
        capabilities: [
          { title: "Koordinácia prepravy", text: "Nájdite prepravný prístup vhodný pre váš tovar, miesto pôvodu, cieľ a požiadavky na dodanie." },
          { title: "Cezhraničná logistika", text: "Zvládnite medzinárodnú prepravu s koordinovanou komunikáciou a pozornosťou k dokumentácii, ktorú vaša zásielka potrebuje." },
          { title: "Plánovanie dodávok", text: "Zosúlaďte okná vyzdvihnutia a dodania s vaším podnikaním a priebežne informujte všetkých zúčastnených." },
        ],
        faqs: [
          { question: "Čo potrebujete na prípravu ponuky na prepravu?", answer: "Uveďte adresy vyzdvihnutia a dodania, opis nákladu, rozmery, hmotnosť, balenie a preferované termíny. Dajte nám vedieť aj o prípadných požiadavkách na špeciálnu manipuláciu." },
          { question: "Viete koordinovať medzinárodné zásielky?", answer: "Vieme preveriť požiadavky na cezhraničnú prepravu a koordinovať vhodné riešenie. Dostupnosť, trasy a načasovanie potvrdzujeme individuálne pre každý dopyt." },
          { question: "Dá sa logistika skombinovať s vašimi dodávateľskými službami?", answer: "Určite. Vieme prepojiť obstarávanie produktov s plánovaním dodávok, čím znížime počet odovzdávok a udržíme váš projekt koordinovaný cez jedného partnera." },
        ],
      },
    ],
    materialCategories: [
      {
        title: "Elektrické systémy a komponenty", shortTitle: "Elektrické komponenty",
        imageAlt: "Priemyselný elektrický rozvádzač s detailnou kabelážou",
        description: "Komponenty za spoľahlivou prevádzkou. Obstarajte si elektrické zariadenia a riadiace riešenia zosúladené so špecifikáciami vášho projektu.",
        items: ["Spínacie a ochranné prvky", "Priemyselné riadiace komponenty", "Automatizačné a distribučné zariadenia", "Technické obstarávanie pre konkrétny projekt"],
      },
      {
        title: "Káble a konektivita", shortTitle: "Káble",
        imageAlt: "Modré sieťové káble usporiadané v technickej inštalácii",
        description: "Prepojte energiu, dáta a možnosti. Nájdite vhodné káblové riešenia pre priemyselné inštalácie, siete a bežnú infraštruktúru.",
        items: ["Silové a inštalačné káble", "Dátová a sieťová kabeláž", "Ovládacie a prístrojové káble", "Konektory a káblové príslušenstvo"],
      },
      {
        title: "Počítačové systémy", shortTitle: "Počítačové systémy",
        imageAlt: "Moderná serverová infraštruktúra osvetlená namodro",
        description: "Technológia, ktorá podporí váš ďalší krok. Obstarajte si spoľahlivé počítačové a sieťové systémy prispôsobené spôsobu, akým vaše podnikanie funguje.",
        items: ["Firemné počítače a pracovné stanice", "Servery a úložné riešenia", "Sieťová infraštruktúra", "Periférie a podporný hardvér"],
      },
    ],
    enquiryServices: ["Všeobecný dopyt", "Materiály a dodávky", "Elektrické komponenty", "Káble", "Počítačové systémy", "Plánovanie dodávateľského reťazca", "Logistika a doprava", "Možnosť partnerstva"],
  },
  cs: {
    services: [
      {
        shortTitle: "Materiály a dodávky",
        title: "Správné materiály.\nBez zbytečné složitosti.",
        eyebrow: "MATERIÁLY A DODÁVKY", tagline: "Spolehlivé zásobování. Výjimečné možnosti.",
        description: "Kvalitní elektrické komponenty, kabely a počítačové systémy — pořízené podle vašich specifikací a dodané podle potřeb vašeho podnikání.",
        imageAlt: "Precizně uspořádané průmyslové elektrické řídicí systémy a kabeláž",
        highlights: ["Elektrické systémy a komponenty", "Kabely", "Počítačové systémy"],
        introTitle: "Postaveno na kvalitě.\nPodloženo odborností.",
        intro: "Nalezení správného produktu je jen začátek. Spojujeme technické porozumění, promyšlené pořizování a koordinovanou dodávku, abyste se mohli soustředit na to podstatné.",
        capabilities: [
          { title: "Technické pořizování produktů", text: "Pošlete nám svou specifikaci, číslo dílu nebo požadavek projektu. Pomůžeme identifikovat vhodné produkty a praktické alternativy." },
          { title: "Koordinované pořizování", text: "Zjednodušte nákup napříč kategoriemi produktů s jedním kontaktním místem, sladěnými objednávkami a jasnou komunikací." },
          { title: "Dodávky zaměřené na projekt", text: "Od jednoho komponentu po rozsáhlou instalaci plánujeme pořizování a dodávku podle vašich priorit." },
        ],
        faqs: [
          { question: "S jakými materiály nám můžete pomoci?", answer: "Zaměřujeme se na elektrické systémy a komponenty, silové a datové kabely a počítačové systémy. Pošlete nám svou specifikaci nebo seznam produktů a prověříme dostupné možnosti pořízení." },
          { question: "Umíte pracovat podle technické specifikace?", answer: "Ano. Do poptávky uveďte výrobce, číslo dílu, požadované množství, technické požadavky a místo dodání. Probereme veškeré detaily potřebné k přípravě vhodné nabídky." },
          { question: "Lze dodávku a dopravu koordinovat společně?", answer: "Ano. Naše služby v oblasti materiálů, dodavatelského řetězce a logistiky jsou navrženy tak, aby fungovaly společně a poskytovaly vám jedno stálé kontaktní místo." },
        ],
      },
      {
        shortTitle: "Plánování dodavatelského řetězce",
        title: "Plánování a optimalizace\ndodavatelského řetězce",
        eyebrow: "PLÁNOVÁNÍ A PORADENSTVÍ DODAVATELSKÉHO ŘETĚZCE", tagline: "Méně nejistoty. Více pohybu vpřed.",
        description: "Navrhujeme a řídíme efektivní a odolné dodavatelské řetězce přizpůsobené složitým mezinárodním operacím. Náš přístup založený na datech zvyšuje přehlednost, snižuje náklady a posiluje provozní kontinuitu.",
        imageAlt: "Světlý moderní distribuční sklad s uspořádanými regály",
        highlights: ["Plánování poptávky a nabídky", "Optimalizace zásob a sítě", "Řízení rizik a zlepšování výkonnosti"],
        introTitle: "Jasnější pohled.\nSilnější dodavatelský řetězec.",
        intro: "Dobře propojený dodavatelský řetězec dává vašemu podnikání prostor k růstu. Spojujeme strategické myšlení s provozní realitou, abyste mohli činit informovaná rozhodnutí v každém článku.",
        capabilities: [
          { title: "Plánování poptávky a nabídky", text: "Sladěte poptávku, pořizování a kapacitu. Vytvořte praktické plány, které reagují na vaše zákazníky a váš provoz." },
          { title: "Optimalizace zásob a sítě", text: "Prověřte stavy zásob, distribuční toky a dodavatelské sítě a najděte správnou rovnováhu mezi dostupností a pracovním kapitálem." },
          { title: "Řízení rizik a výkonnosti", text: "Pochopte body zranitelnosti, vypracujte plány kontinuity a využívejte smysluplné ukazatele výkonnosti k podpoře lepších rozhodnutí." },
        ],
        faqs: [
          { question: "Kde spolupráce na dodavatelském řetězci začíná?", answer: "Začínáme rozhovorem o vašich cílech, současném provozu a aktuálních výzvách. Následně se dohodneme na informacích potřebných pro úvodní posouzení a jasně definovaný rozsah." },
          { question: "Umíte zlepšit stávající dodavatelský řetězec?", answer: "Ano. Umíme prověřit fungování vaší současné sítě, identifikovat úzká místa a rizika a navrhnout praktická zlepšení bez předpokladu, že se musí změnit vše." },
          { question: "Podporujete mezinárodní operace?", answer: "Náš přístup zohledňuje přeshraniční dodavatelské sítě, dodací lhůty, přepravní potřeby a provozní kontinuitu. Řekněte nám, kde působíte, abychom posoudili vaše konkrétní požadavky." },
        ],
      },
      {
        shortTitle: "Logistika a doprava",
        title: "Posouváme vaše podnikání.\nSprávným směrem.",
        eyebrow: "LOGISTIKA A DOPRAVA", tagline: "Od první míle po finální předání.",
        description: "Udržte své zboží a své podnikání v pohybu. Koordinujeme praktická dopravní řešení s jasnou komunikací od vyzvednutí po dodání.",
        imageAlt: "Nákladní vozidlo jedoucí po dálnici směrem ke vzdáleným horám",
        highlights: ["Silniční a mezinárodní přeprava", "Koordinace dopravy", "Plánování dodávek a přehled"],
        introTitle: "Na každé dodávce záleží.\nNa každém detailu záleží.",
        intro: "Spolehlivá logistika spojuje slib, který dáváte, se zbožím, které vaši zákazníci obdrží. Pomáháme koordinovat trasu, načasování a detaily, které udrží váš provoz v pohybu.",
        capabilities: [
          { title: "Koordinace přepravy", text: "Najděte přepravní přístup vhodný pro vaše zboží, místo původu, cíl a požadavky na dodání." },
          { title: "Přeshraniční logistika", text: "Zvládněte mezinárodní přepravu s koordinovanou komunikací a pozorností k dokumentaci, kterou vaše zásilka potřebuje." },
          { title: "Plánování dodávek", text: "Sladěte okna vyzvednutí a dodání s vaším podnikáním a průběžně informujte všechny zúčastněné." },
        ],
        faqs: [
          { question: "Co potřebujete k přípravě nabídky na přepravu?", answer: "Uveďte adresy vyzvednutí a dodání, popis nákladu, rozměry, hmotnost, balení a preferované termíny. Dejte nám vědět i o případných požadavcích na speciální manipulaci." },
          { question: "Umíte koordinovat mezinárodní zásilky?", answer: "Umíme prověřit požadavky na přeshraniční přepravu a koordinovat vhodné řešení. Dostupnost, trasy a načasování potvrzujeme individuálně pro každou poptávku." },
          { question: "Lze logistiku zkombinovat s vašimi dodavatelskými službami?", answer: "Rozhodně. Umíme propojit pořizování produktů s plánováním dodávek, čímž snížíme počet předávek a udržíme váš projekt koordinovaný přes jednoho partnera." },
        ],
      },
    ],
    materialCategories: [
      {
        title: "Elektrické systémy a komponenty", shortTitle: "Elektrické komponenty",
        imageAlt: "Průmyslový elektrický rozváděč s detailní kabeláží",
        description: "Komponenty za spolehlivým provozem. Pořiďte si elektrická zařízení a řídicí řešení sladěná se specifikacemi vašeho projektu.",
        items: ["Spínací a ochranné prvky", "Průmyslové řídicí komponenty", "Automatizační a distribuční zařízení", "Technické pořizování pro konkrétní projekt"],
      },
      {
        title: "Kabely a konektivita", shortTitle: "Kabely",
        imageAlt: "Modré síťové kabely uspořádané v technické instalaci",
        description: "Propojte energii, data a možnosti. Najděte vhodná kabelová řešení pro průmyslové instalace, sítě a běžnou infrastrukturu.",
        items: ["Silové a instalační kabely", "Datová a síťová kabeláž", "Ovládací a přístrojové kabely", "Konektory a kabelové příslušenství"],
      },
      {
        title: "Počítačové systémy", shortTitle: "Počítačové systémy",
        imageAlt: "Moderní serverová infrastruktura osvětlená do modra",
        description: "Technologie, která podpoří váš další krok. Pořiďte si spolehlivé počítačové a síťové systémy přizpůsobené způsobu, jakým vaše podnikání funguje.",
        items: ["Firemní počítače a pracovní stanice", "Servery a úložná řešení", "Síťová infrastruktura", "Periferie a podpůrný hardware"],
      },
    ],
    enquiryServices: ["Obecná poptávka", "Materiály a dodávky", "Elektrické komponenty", "Kabely", "Počítačové systémy", "Plánování dodavatelského řetězce", "Logistika a doprava", "Možnost partnerství"],
  },
  uk: {
    services: [
      {
        shortTitle: "Матеріали та постачання",
        title: "Правильні матеріали.\nБез зайвої складності.",
        eyebrow: "МАТЕРІАЛИ ТА ПОСТАЧАННЯ", tagline: "Надійне постачання. Виняткові можливості.",
        description: "Якісні електричні компоненти, кабелі та компʼютерні системи — підібрані за вашими специфікаціями та доставлені під потреби вашого бізнесу.",
        imageAlt: "Акуратно впорядковані промислові електричні системи керування та проводка",
        highlights: ["Електричні системи та компоненти", "Кабелі", "Компʼютерні системи"],
        introTitle: "Побудовано на якості.\nПідкріплено експертизою.",
        intro: "Знайти правильний продукт — це лише початок. Ми поєднуємо технічне розуміння, продумане постачання та скоординовану доставку, щоб ви могли зосередитися на головному.",
        capabilities: [
          { title: "Технічний підбір продукції", text: "Надішліть свою специфікацію, номер деталі або вимогу проєкту. Ми допоможемо визначити відповідні продукти та практичні альтернативи." },
          { title: "Скоординована закупівля", text: "Спростіть закупівлю в різних категоріях продукції з єдиною контактною особою, узгодженими замовленнями та чіткою комунікацією." },
          { title: "Постачання під проєкт", text: "Від одного компонента до масштабної інсталяції ми плануємо постачання та доставку відповідно до ваших пріоритетів." },
        ],
        faqs: [
          { question: "З якими матеріалами ви можете допомогти?", answer: "Наш фокус — електричні системи та компоненти, силові й дата-кабелі та компʼютерні системи. Надішліть свою специфікацію або перелік продукції, і ми перевіримо доступні варіанти постачання." },
          { question: "Чи можете ви працювати за технічною специфікацією?", answer: "Так. У запиті вкажіть виробника, номер деталі, потрібну кількість, технічні вимоги та місце доставки. Ми обговоримо всі деталі, потрібні для підготовки відповідної пропозиції." },
          { question: "Чи можна координувати постачання й транспорт разом?", answer: "Так. Наші послуги з матеріалів, ланцюга постачання та логістики створені для спільної роботи, надаючи вам єдину постійну контактну точку." },
        ],
      },
      {
        shortTitle: "Планування ланцюга постачання",
        title: "Планування та оптимізація\nланцюга постачання",
        eyebrow: "ПЛАНУВАННЯ ТА КОНСАЛТИНГ ЛАНЦЮГА ПОСТАЧАННЯ", tagline: "Менше невизначеності. Більше руху вперед.",
        description: "Ми проєктуємо та керуємо ефективними й стійкими ланцюгами постачання, адаптованими до складних міжнародних операцій. Наш підхід на основі даних підвищує прозорість, знижує витрати та зміцнює операційну безперервність.",
        imageAlt: "Світлий сучасний розподільчий склад з упорядкованими стелажами",
        highlights: ["Планування попиту та пропозиції", "Оптимізація запасів і мережі", "Управління ризиками та підвищення ефективності"],
        introTitle: "Чіткіший погляд.\nСильніший ланцюг постачання.",
        intro: "Добре звʼязаний ланцюг постачання дає вашому бізнесу простір для зростання. Ми поєднуємо стратегічне мислення з операційною реальністю, щоб ви приймали обґрунтовані рішення в кожній ланці.",
        capabilities: [
          { title: "Планування попиту та пропозиції", text: "Узгодьте попит, закупівлі та потужності. Створюйте практичні плани, що реагують на ваших клієнтів і вашу діяльність." },
          { title: "Оптимізація запасів і мережі", text: "Перегляньте рівні запасів, потоки розподілу та мережі постачальників, щоб знайти правильний баланс між доступністю та оборотним капіталом." },
          { title: "Управління ризиками та ефективністю", text: "Зрозумійте точки вразливості, розробіть плани безперервності та використовуйте змістовні показники ефективності для кращих рішень." },
        ],
        faqs: [
          { question: "З чого починається співпраця щодо ланцюга постачання?", answer: "Ми починаємо з розмови про ваші цілі, наявні операції та поточні виклики. Далі узгоджуємо інформацію, потрібну для початкової оцінки та чітко визначеного обсягу." },
          { question: "Чи можете ви покращити наявний ланцюг постачання?", answer: "Так. Ми можемо переглянути роботу вашої поточної мережі, виявити вузькі місця та ризики й розробити практичні покращення, не припускаючи, що потрібно змінювати геть усе." },
          { question: "Чи підтримуєте ви міжнародні операції?", answer: "Наш підхід враховує транскордонні мережі постачальників, терміни постачання, транспортні потреби та операційну безперервність. Розкажіть, де ви працюєте, щоб ми оцінили ваші конкретні вимоги." },
        ],
      },
      {
        shortTitle: "Логістика та транспорт",
        title: "Рухаємо ваш бізнес.\nУ правильному напрямку.",
        eyebrow: "ЛОГІСТИКА ТА ТРАНСПОРТ", tagline: "Від першої милі до фінальної передачі.",
        description: "Тримайте свій товар і свій бізнес у русі. Ми координуємо практичні транспортні рішення з чіткою комунікацією від забору до доставки.",
        imageAlt: "Вантажівка їде автомагістраллю в напрямку далеких гір",
        highlights: ["Автомобільні та міжнародні перевезення", "Координація транспорту", "Планування доставки та прозорість"],
        introTitle: "Кожна доставка важлива.\nКожна деталь має значення.",
        intro: "Надійна логістика поєднує обіцянку, яку ви даєте, з товаром, який отримують ваші клієнти. Ми допомагаємо координувати маршрут, час і деталі, що тримають вашу діяльність у русі.",
        capabilities: [
          { title: "Координація перевезень", text: "Підберіть транспортний підхід, що відповідає вашому товару, місцю відправлення, призначенню та вимогам до доставки." },
          { title: "Транскордонна логістика", text: "Опануйте міжнародні перевезення зі скоординованою комунікацією та увагою до документації, потрібної вашій відправці." },
          { title: "Планування доставки", text: "Узгодьте вікна забору й доставки з вашим бізнесом, тримаючи всіх залучених в курсі впродовж шляху." },
        ],
        faqs: [
          { question: "Що потрібно для підготовки транспортної пропозиції?", answer: "Надайте адреси забору та доставки, опис вантажу, розміри, вагу, пакування та бажані дати. Повідомте також про будь-які вимоги до спеціального поводження." },
          { question: "Чи можете ви координувати міжнародні відправлення?", answer: "Ми можемо перевірити вимоги до транскордонних перевезень і скоординувати відповідне рішення. Доступність, маршрути та час підтверджуються індивідуально для кожного запиту." },
          { question: "Чи можна поєднати логістику з вашими послугами постачання?", answer: "Безумовно. Ми можемо поєднати підбір продукції з плануванням доставки, щоб зменшити кількість передач і тримати ваш проєкт скоординованим через одного партнера." },
        ],
      },
    ],
    materialCategories: [
      {
        title: "Електричні системи та компоненти", shortTitle: "Електричні компоненти",
        imageAlt: "Промисловий електричний щит керування з детальною проводкою",
        description: "Компоненти, що стоять за надійною роботою. Підберіть електрообладнання та рішення керування, узгоджені зі специфікаціями вашого проєкту.",
        items: ["Комутаційні та захисні пристрої", "Промислові компоненти керування", "Автоматизація та розподільче обладнання", "Технічний підбір під конкретний проєкт"],
      },
      {
        title: "Кабелі та зʼєднання", shortTitle: "Кабелі",
        imageAlt: "Сині мережеві кабелі, упорядковані в технічній інсталяції",
        description: "Зʼєднайте енергію, дані та можливості. Знайдіть відповідні кабельні рішення для промислових інсталяцій, мереж і повсякденної інфраструктури.",
        items: ["Силові та монтажні кабелі", "Дата- та мережеві кабелі", "Керувальні та контрольно-вимірювальні кабелі", "Конектори та кабельні аксесуари"],
      },
      {
        title: "Компʼютерні системи", shortTitle: "Компʼютерні системи",
        imageAlt: "Сучасна серверна інфраструктура, підсвічена синім",
        description: "Технології, що підтримають ваш наступний крок. Підберіть надійні компʼютерні та мережеві системи, адаптовані до того, як працює ваш бізнес.",
        items: ["Бізнес-компʼютери та робочі станції", "Сервери та рішення для зберігання", "Мережева інфраструктура", "Периферія та допоміжне обладнання"],
      },
    ],
    enquiryServices: ["Загальний запит", "Матеріали та постачання", "Електричні компоненти", "Кабелі", "Компʼютерні системи", "Планування ланцюга постачання", "Логістика та транспорт", "Можливість партнерства"],
  },
};

export function getContent(locale: Locale): ContentModel {
  const localeContent = content[locale] ?? content.en;
  return {
    services: localeContent.services.map((service, index) => ({ ...serviceMeta[index], ...service })),
    materialCategories: localeContent.materialCategories.map((category, index) => ({ ...categoryMeta[index], ...category })),
    enquiryServices: localeContent.enquiryServices,
  };
}

// English content is exported for server-side use (static params, metadata,
// non-localized fallbacks). Slugs are locale-independent.
export const services: Service[] = getContent("en").services;
export const materialCategories: MaterialCategory[] = getContent("en").materialCategories;
export const enquiryServices: string[] = getContent("en").enquiryServices;
export const serviceSlugs = serviceMeta.map((s) => s.slug);
export const categorySlugs = categoryMeta.map((c) => c.slug);
