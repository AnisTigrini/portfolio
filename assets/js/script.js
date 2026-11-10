'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterCategory;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterCategory;
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.dataset.navTarget;

    for (let j = 0; j < pages.length; j++) {
      if (target === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    this.classList.add("active");

    window.scrollTo(0, 0);

  });
}



// -----------------------------------------------------------------------------
// internationalization (EN / FR)
// -----------------------------------------------------------------------------

const translations = {
  en: {
    role: "Full-Stack Developer",
    certBadge: "CKAD Certified",
    showContacts: "Show Contacts",
    email: "Email",
    phone: "Phone",
    location: "Location",
    locationValue: "Québec City, Canada",

    navAbout: "About",
    navResume: "Resume",
    navPortfolio: "Portfolio",
    navSecurity: "Security",
    navContact: "Contact",

    aboutTitle: "About me",
    aboutP1: "Versatile software development professional, successful at producing robust systems to meet diverse customer needs. I manage projects and teams to accomplish challenging timelines, exploring technical capabilities and pushing boundaries to exceed expectations.",
    aboutP2: "With experience spanning full-stack web development, cloud-native microservices and DevOps, I enjoy turning complex problems into reliable, maintainable solutions. As a Certified Kubernetes Application Developer (CKAD), I design, build and ship cloud-native applications that run reliably in production. In my spare time I sharpen my skills with LeetCode and ethical hacking on platforms like TryHackMe.",

    serviceTitle: "What I'm doing",
    service1Title: "Full-Stack Development",
    service1Text: "Building and maintaining web applications end to end with Angular, React and .NET APIs.",
    service2Title: "Cloud-Native & Kubernetes",
    service2Text: "CKAD-certified: containerizing and deploying microservices on Kubernetes (AKS), writing Helm charts, and automating scaling, health checks and rollouts.",
    service3Title: "Mobile & MDM Solutions",
    service3Text: "Developing Windows and iOS Mobile Device Management solutions for enterprise customers.",
    service4Title: "Design Systems",
    service4Text: "Crafting reusable Web Components and automating design-token extraction through the Figma API.",

    resumeTitle: "Resume",
    certTitle: "Certifications",
    cert1Title: "Certified Kubernetes Application Developer (CKAD) — CNCF & The Linux Foundation",
    cert1Text: "Passed the performance-based, hands-on CKAD exam, proving the ability to design, build, configure and expose cloud-native applications on Kubernetes: multi-container Pods, Deployments and rolling updates, ConfigMaps and Secrets, probes and observability, Services and Ingress, NetworkPolicies, Jobs and CronJobs, resource management and Helm.",
    educationTitle: "Education",
    edu1Title: "BSc Computer Science — Laval University",
    edu1Text: "Bachelor of Science in Computer Science, completed in 2023 with a 3.47 GPA.",
    experienceTitle: "Experience",
    exp1Title: "Full-Stack Developer — Cybertech Inc",
    exp1Date: "April 2023 — Present",
    exp1Text: "Maintaining and adding features to an Angular-based website and .NET APIs. Migrated the company's resources and software from Windows servers to an AKS microservice architecture. Developed Windows and iOS MDM solutions for customers to use.",
    exp2Title: "DevOps Developer Intern — GoTo",
    exp2Date: "December 2021 — April 2022",
    exp2Text: "Autoscaling PostgreSQL pods through the HorizontalPodAutoscaler (HPA) feature of Kubernetes, integrating the HPA into a Kubernetes Operator (Zalando), and creating Helm charts to ease installation of resources.",
    exp3Title: "Front-End Developer Intern — GoTo",
    exp3Date: "September 2021 — December 2021",
    exp3Text: "Front-end development of a design system using TypeScript and React, automation of design-token extraction through the Figma API, and building and shipping reusable Web Components for other teams.",

    skillsTitle: "My Skills",
    skillsLanguages: "Languages",
    skillsFrameworks: "Frameworks & Libraries",
    skillsData: "Databases",
    skillsDevops: "DevOps & Tools",

    portfolioTitle: "Portfolio",
    filterAll: "All",
    filterWebDev: "Web development",
    filterLibrary: "Library",
    selectCategory: "Select category",
    project1Category: "Double-entry accounting & budgeting",
    project2Category: "Market intelligence platform",
    project3Category: "npm package · 4,000+ weekly downloads",

    securityTitle: "Cybersecurity",
    securityP1: "Alongside software development, I practice offensive and defensive security through hands-on labs on TryHackMe. Breaking into deliberately vulnerable systems helps me understand how attackers think, and I apply that mindset to build and ship applications that are secure by design.",
    badgesTitle: "TryHackMe Badges",
    badgeLinuxText: "Navigating the Linux command line, file system, permissions and core utilities.",
    badgeNetworkingTitle: "Networking",
    badgeNetworkingText: "OSI and TCP/IP models, core protocols, ports and how traffic moves across networks.",
    badgePentestingText: "Ethical hacking methodology: reconnaissance, enumeration, exploitation and privilege escalation.",
    badgeWiresharkText: "Capturing and dissecting network traffic to filter packets and investigate suspicious activity.",
    badgeOhsintText: "Open-source intelligence: tracing a digital footprint from a single image and public sources.",
    securityFocusTitle: "Focus Areas",
    thmStatsTitle: "TryHackMe Stats",
    thmViewProfile: "View profile",
    statRankLabel: "Global ranking",
    statRankValue: "Top {n}%",
    statRankSub: "Rank #{n}",
    statRoomsLabel: "Rooms completed",
    statBadgesLabel: "Badges earned",
    statLevelLabel: "Level",
    statPointsLabel: "Points",
    statStreakLabel: "Longest streak",
    statStreakValue: "{n} days",
    activityTitle: "Hacking Activity",
    activityTotal: "{n} events in {year}",
    activityLess: "Less",
    activityMore: "More",
    activityDay: "{date}: {n} events",
    activityDayNone: "{date}: no activity",
    activityBreakdown: "{q} questions, {r} rooms, {m} machines",
    activityAria: "TryHackMe activity heatmap for {year}: {n} events",
    thmUpdated: "Synced from TryHackMe on {date}",
    rarityCommon: "Common",
    rarityRare: "Rare",
    rarityEpic: "Epic",
    rarityLegendary: "Legendary",
    focusLinux: "Linux administration",
    focusNetworking: "Network fundamentals",
    focusPentest: "Penetration testing",
    focusTraffic: "Traffic analysis",

    contactTitle: "Contact",
    formTitle: "Contact Form",
    phFullname: "Full name",
    phEmail: "Email address",
    phMessage: "Your Message",
    sendMessage: "Send Message"
  },

  fr: {
    role: "Développeur Full-Stack",
    certBadge: "Certifié CKAD",
    showContacts: "Afficher les contacts",
    email: "Courriel",
    phone: "Téléphone",
    location: "Emplacement",
    locationValue: "Ville de Québec, Canada",

    navAbout: "À propos",
    navResume: "CV",
    navPortfolio: "Portfolio",
    navSecurity: "Sécurité",
    navContact: "Contact",

    aboutTitle: "À propos de moi",
    aboutP1: "Professionnel polyvalent du développement logiciel, habitué à concevoir des systèmes robustes répondant à des besoins clients variés. Je gère des projets et des équipes pour respecter des échéanciers exigeants, en explorant les possibilités techniques et en repoussant les limites pour dépasser les attentes.",
    aboutP2: "Fort d'une expérience couvrant le développement web full-stack, les microservices infonuagiques et le DevOps, j'aime transformer des problèmes complexes en solutions fiables et maintenables. Certifié Kubernetes Application Developer (CKAD), je conçois, développe et déploie des applications infonuagiques natives qui fonctionnent de façon fiable en production. À mes heures, je perfectionne mes compétences avec LeetCode et le piratage éthique sur des plateformes comme TryHackMe.",

    serviceTitle: "Ce que je fais",
    service1Title: "Développement Full-Stack",
    service1Text: "Conception et maintenance d'applications web de bout en bout avec Angular, React et des API .NET.",
    service2Title: "Infonuagique & Kubernetes",
    service2Text: "Certifié CKAD : conteneurisation et déploiement de microservices sur Kubernetes (AKS), création de chartes Helm et automatisation de la mise à l'échelle, des sondes de santé et des déploiements progressifs.",
    service3Title: "Mobilité & MDM",
    service3Text: "Développement de solutions de gestion des appareils mobiles (MDM) Windows et iOS pour des clients d'entreprise.",
    service4Title: "Systèmes de design",
    service4Text: "Création de Web Components réutilisables et automatisation de l'extraction des jetons de design via l'API Figma.",

    resumeTitle: "CV",
    certTitle: "Certifications",
    cert1Title: "Certified Kubernetes Application Developer (CKAD) — CNCF & The Linux Foundation",
    cert1Text: "Réussite de l'examen pratique CKAD, basé sur des mises en situation réelles, démontrant la capacité à concevoir, développer, configurer et exposer des applications infonuagiques natives sur Kubernetes : Pods multi-conteneurs, Deployments et mises à jour progressives, ConfigMaps et Secrets, sondes et observabilité, Services et Ingress, NetworkPolicies, Jobs et CronJobs, gestion des ressources et Helm.",
    educationTitle: "Formation",
    edu1Title: "B. Sc. Informatique — Université Laval",
    edu1Text: "Baccalauréat en informatique, terminé en 2023 avec une moyenne de 3,47/4,3.",
    experienceTitle: "Expérience",
    exp1Title: "Développeur Full-Stack — Cybertech Inc",
    exp1Date: "Avril 2023 — Aujourd'hui",
    exp1Text: "Maintenance et ajout de fonctionnalités à un site web Angular et à des API .NET. Migration des ressources et logiciels de l'entreprise de serveurs Windows vers une architecture de microservices AKS. Développement de solutions MDM Windows et iOS pour les clients.",
    exp2Title: "Stagiaire développeur DevOps — GoTo",
    exp2Date: "Décembre 2021 — Avril 2022",
    exp2Text: "Mise à l'échelle automatique de pods PostgreSQL grâce à la fonctionnalité HorizontalPodAutoscaler (HPA) de Kubernetes, intégration du HPA dans un opérateur Kubernetes (Zalando) et création de chartes Helm pour faciliter l'installation des ressources.",
    exp3Title: "Stagiaire développeur front-end — GoTo",
    exp3Date: "Septembre 2021 — Décembre 2021",
    exp3Text: "Développement front-end d'un système de design avec TypeScript et React, automatisation de l'extraction des jetons de design via l'API Figma, et création de Web Components réutilisables pour les autres équipes.",

    skillsTitle: "Mes compétences",
    skillsLanguages: "Langages",
    skillsFrameworks: "Cadriciels & bibliothèques",
    skillsData: "Bases de données",
    skillsDevops: "DevOps & outils",

    portfolioTitle: "Portfolio",
    filterAll: "Tout",
    filterWebDev: "Développement web",
    filterLibrary: "Bibliothèque",
    selectCategory: "Choisir une catégorie",
    project1Category: "Comptabilité en partie double & budgets",
    project2Category: "Plateforme d'intelligence de marché",
    project3Category: "Paquet npm · 4 000+ téléchargements/semaine",

    securityTitle: "Cybersécurité",
    securityP1: "En parallèle du développement logiciel, je pratique la sécurité offensive et défensive au moyen de laboratoires pratiques sur TryHackMe. M'introduire dans des systèmes volontairement vulnérables m'aide à comprendre la façon de penser des attaquants, et j'applique cet état d'esprit pour concevoir et livrer des applications sécurisées dès la conception.",
    badgesTitle: "Badges TryHackMe",
    badgeLinuxText: "Utilisation de la ligne de commande Linux, du système de fichiers, des permissions et des utilitaires essentiels.",
    badgeNetworkingTitle: "Réseautique",
    badgeNetworkingText: "Modèles OSI et TCP/IP, protocoles essentiels, ports et circulation du trafic sur les réseaux.",
    badgePentestingText: "Méthodologie de piratage éthique : reconnaissance, énumération, exploitation et élévation de privilèges.",
    badgeWiresharkText: "Capture et dissection du trafic réseau pour filtrer les paquets et enquêter sur les activités suspectes.",
    badgeOhsintText: "Renseignement de sources ouvertes : retracer une empreinte numérique à partir d'une seule image et de sources publiques.",
    securityFocusTitle: "Domaines d'intérêt",
    thmStatsTitle: "Statistiques TryHackMe",
    thmViewProfile: "Voir le profil",
    statRankLabel: "Classement mondial",
    statRankValue: "Top {n} %",
    statRankSub: "Rang n° {n}",
    statRoomsLabel: "Salles complétées",
    statBadgesLabel: "Badges obtenus",
    statLevelLabel: "Niveau",
    statPointsLabel: "Points",
    statStreakLabel: "Plus longue série",
    statStreakValue: "{n} jours",
    activityTitle: "Activité de piratage",
    activityTotal: "{n} activités en {year}",
    activityLess: "Moins",
    activityMore: "Plus",
    activityDay: "{date} : {n} activités",
    activityDayNone: "{date} : aucune activité",
    activityBreakdown: "{q} questions, {r} salles, {m} machines",
    activityAria: "Carte d'activité TryHackMe pour {year} : {n} activités",
    thmUpdated: "Synchronisé depuis TryHackMe le {date}",
    rarityCommon: "Commun",
    rarityRare: "Rare",
    rarityEpic: "Épique",
    rarityLegendary: "Légendaire",
    focusLinux: "Administration Linux",
    focusNetworking: "Fondements des réseaux",
    focusPentest: "Tests d'intrusion",
    focusTraffic: "Analyse de trafic",

    contactTitle: "Contact",
    formTitle: "Formulaire de contact",
    phFullname: "Nom complet",
    phEmail: "Adresse courriel",
    phMessage: "Votre message",
    sendMessage: "Envoyer le message"
  }
};

const langBtn = document.querySelector("[data-lang-btn]");

const applyLanguage = function (lang) {
  const dict = translations[lang] || translations.en;

  // text content
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // placeholders
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
    const key = el.dataset.i18nPh;
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.documentElement.setAttribute("lang", lang);
  // button shows the language it switches TO
  if (langBtn) langBtn.textContent = lang === "en" ? "FR" : "EN";

  try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }

  // let dynamically rendered sections (e.g. TryHackMe stats) re-render
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
};

const savedLang = (function () {
  try { return localStorage.getItem("lang"); } catch (e) { return null; }
})();

applyLanguage(savedLang === "fr" ? "fr" : "en");

if (langBtn) {
  langBtn.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("lang");
    applyLanguage(current === "en" ? "fr" : "en");
  });
}



// -----------------------------------------------------------------------------
// TryHackMe stats, activity heatmap and badges
//
// TryHackMe's API can't be called from the browser (no CORS headers), so the
// data is read from ./assets/data/thm.json, which scripts/update-thm-data.mjs
// refreshes at deploy time. If the file can't be loaded, the stats stay hidden
// and the static badge cards in the HTML are shown instead.
// -----------------------------------------------------------------------------

(function () {
  const statsSection = document.querySelector("[data-thm-stats]");
  const activitySection = document.querySelector("[data-thm-activity]");
  const badgeList = document.querySelector("[data-thm-badges]");
  if (!statsSection || !activitySection || !badgeList) return;

  const DAY = 86400000;
  let thmData = null;

  const lang = function () { return document.documentElement.getAttribute("lang") === "fr" ? "fr" : "en"; };
  const locale = function () { return lang() === "fr" ? "fr-CA" : "en-CA"; };
  const isNum = function (n) { return typeof n === "number" && isFinite(n); };
  const num = function (n) { return isNum(n) ? new Intl.NumberFormat(locale()).format(n) : "—"; };
  const pct = function (n) {
    return new Intl.NumberFormat(locale(), { style: "percent", maximumFractionDigits: 1 }).format(n / 100);
  };

  // translate a key, filling {placeholders} from vars
  const tr = function (key, vars) {
    let str = translations[lang()][key] || translations.en[key] || "";
    for (const name in vars) str = str.split("{" + name + "}").join(vars[name]);
    return str;
  };

  // API dates are calendar days ("YYYY-MM-DD"); format them in UTC so they never shift
  const fmtDate = function (date, opts) {
    return date.toLocaleDateString(locale(), Object.assign({ timeZone: "UTC" }, opts));
  };


  // --- stat tiles ---

  const renderStats = function (p) {
    const set = function (name, text) {
      const el = statsSection.querySelector('[data-thm-stat="' + name + '"]');
      if (el) el.textContent = text;
    };

    set("top", isNum(p.topPercentage) ? tr("statRankValue", { n: num(p.topPercentage) }) : "—");
    set("rank", isNum(p.rank) ? tr("statRankSub", { n: num(p.rank) }) : "");
    set("rooms", num(p.completedRoomsNumber));
    set("badges", num(p.badgesNumber));
    set("level", num(p.level));
    set("points", num(p.totalPoints));
    set("streak", isNum(p.largestStreak) ? tr("statStreakValue", { n: num(p.largestStreak) }) : "—");

    statsSection.hidden = false;
  };


  // --- activity heatmap (one column per week, Sunday on top) ---

  const heatmap = activitySection.querySelector("[data-heatmap]");
  const heatmapScroll = activitySection.querySelector("[data-heatmap-scroll]");

  const renderActivity = function (activity, updatedAt) {
    const year = activity.year;
    const start = Date.UTC(year, 0, 1);
    const end = Date.UTC(year + 1, 0, 1);
    const offset = new Date(start).getUTCDay();
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const byDate = {};
    (activity.days || []).forEach(function (day) { byDate[day.date] = day; });

    const columnOf = function (time) { return Math.floor(((time - start) / DAY + offset) / 7) + 2; };
    const frag = document.createDocumentFragment();

    // weekday labels for Mon, Wed, Fri (1970-01-04 was a Sunday)
    [1, 3, 5].forEach(function (dow) {
      const label = document.createElement("span");
      label.className = "heatmap-weekday";
      label.style.gridRow = String(dow + 2);
      label.textContent = fmtDate(new Date(Date.UTC(1970, 0, 4 + dow)), { weekday: "short" });
      frag.appendChild(label);
    });

    for (let month = 0; month < 12; month++) {
      const first = Date.UTC(year, month, 1);
      const label = document.createElement("span");
      label.className = "heatmap-month";
      label.style.gridColumn = String(columnOf(first));
      label.textContent = fmtDate(new Date(first), { month: "short" });
      frag.appendChild(label);
    }

    for (let time = start; time < end; time += DAY) {
      const date = new Date(time);
      const day = byDate[date.toISOString().slice(0, 10)];
      const cell = document.createElement("i");
      const dateText = fmtDate(date, { weekday: "short", month: "short", day: "numeric" });

      cell.className = "heatmap-cell";
      cell.style.gridColumn = String(columnOf(time));
      cell.style.gridRow = String(date.getUTCDay() + 2);

      if (day && day.count > 0) {
        cell.dataset.level = String(Math.min(Math.max(day.level | 0, 1), 4));
        let title = tr("activityDay", { date: dateText, n: num(day.count) });
        if (day.breakdown) {
          title += " — " + tr("activityBreakdown", {
            q: num(day.breakdown.questions || 0),
            r: num(day.breakdown.rooms || 0),
            m: num(day.breakdown.machines || 0)
          });
        }
        cell.title = title;
      } else {
        cell.dataset.level = "0";
        cell.title = tr("activityDayNone", { date: dateText });
      }

      if (time > today) cell.classList.add("is-future");
      if (time === today) cell.classList.add("is-today");

      frag.appendChild(cell);
    }

    heatmap.replaceChildren(frag);
    heatmap.setAttribute("aria-label", tr("activityAria", { year: year, n: num(activity.totalCount) }));

    activitySection.querySelector("[data-thm-activity-total]").textContent =
      tr("activityTotal", { n: num(activity.totalCount), year: year });

    const updated = new Date(updatedAt);
    activitySection.querySelector("[data-thm-updated]").textContent = isNaN(updated)
      ? ""
      : tr("thmUpdated", { date: fmtDate(updated, { year: "numeric", month: "long", day: "numeric" }) });

    activitySection.hidden = false;
  };

  // on narrow screens the heatmap scrolls; bring the current week into view
  const scrollHeatmapToToday = function () {
    const target = heatmap.querySelector(".is-today") || heatmap.lastElementChild;
    if (!target || heatmapScroll.scrollWidth <= heatmapScroll.clientWidth) return;
    heatmapScroll.scrollLeft = target.offsetLeft - heatmapScroll.clientWidth * 0.75;
  };


  // --- badges (replace the static fallback cards) ---

  const renderBadges = function (badges) {
    if (!Array.isArray(badges) || badges.length === 0) return;

    const items = badges.map(function (badge) {
      const item = document.createElement("li");
      item.className = "badge-item content-card";

      if (typeof badge.image === "string" && badge.image.indexOf("https://") === 0) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        figure.className = "badge-img";
        img.src = badge.image;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("error", function () { figure.remove(); });
        figure.appendChild(img);
        item.appendChild(figure);
      }

      const title = document.createElement("h4");
      title.className = "h4 badge-title";
      title.textContent = badge.title || badge.name || "";
      item.appendChild(title);

      if (badge.description) {
        const text = document.createElement("p");
        text.className = "badge-text";
        text.textContent = badge.description;
        item.appendChild(text);
      }

      if (badge.rarityTier) {
        const tier = String(badge.rarityTier).toLowerCase();
        const key = "rarity" + tier.charAt(0).toUpperCase() + tier.slice(1);
        const rarity = document.createElement("span");
        rarity.className = "badge-rarity";
        rarity.dataset.tier = tier;
        rarity.textContent = (tr(key) || tier) + (isNum(badge.rarityPercent) ? " · " + pct(badge.rarityPercent) : "");
        item.appendChild(rarity);
      }

      return item;
    });

    badgeList.classList.add("is-live");
    badgeList.replaceChildren.apply(badgeList, items);
  };


  // --- wiring ---

  const render = function () {
    // render each part independently so one malformed field doesn't hide the rest
    try { if (thmData.profile) renderStats(thmData.profile); } catch (e) { console.warn("TryHackMe stats:", e); }
    try { if (thmData.activity) renderActivity(thmData.activity, thmData.updatedAt); } catch (e) { console.warn("TryHackMe activity:", e); }
    try { renderBadges(thmData.badges); } catch (e) { console.warn("TryHackMe badges:", e); }
  };

  fetch("./assets/data/thm.json", { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      thmData = data;
      render();
      scrollHeatmapToToday();
    })
    .catch(function (err) { console.warn("TryHackMe data unavailable, showing static badges:", err); });

  document.addEventListener("langchange", function () { if (thmData) render(); });

  // the heatmap has no width while its page is hidden, so scroll once it's shown
  const securityLink = document.querySelector('[data-nav-target="security"]');
  if (securityLink) securityLink.addEventListener("click", scrollHeatmapToToday);
})();
