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
    showContacts: "Show Contacts",
    email: "Email",
    phone: "Phone",
    location: "Location",
    locationValue: "Québec City, Canada",

    navAbout: "About",
    navResume: "Resume",
    navPortfolio: "Portfolio",
    navContact: "Contact",

    aboutTitle: "About me",
    aboutP1: "Versatile software development professional, successful at producing robust systems to meet diverse customer needs. I manage projects and teams to accomplish challenging timelines, exploring technical capabilities and pushing boundaries to exceed expectations.",
    aboutP2: "With experience spanning full-stack web development, cloud-native microservices and DevOps, I enjoy turning complex problems into reliable, maintainable solutions. In my spare time I sharpen my skills with LeetCode and ethical hacking on platforms like TryHackMe.",

    serviceTitle: "What I'm doing",
    service1Title: "Full-Stack Development",
    service1Text: "Building and maintaining web applications end to end with Angular, React and .NET APIs.",
    service2Title: "Cloud & DevOps",
    service2Text: "Migrating workloads to Kubernetes (AKS) microservices, building Helm charts and automating scaling.",
    service3Title: "Mobile & MDM Solutions",
    service3Text: "Developing Windows and iOS Mobile Device Management solutions for enterprise customers.",
    service4Title: "Design Systems",
    service4Text: "Crafting reusable Web Components and automating design-token extraction through the Figma API.",

    resumeTitle: "Resume",
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

    contactTitle: "Contact",
    formTitle: "Contact Form",
    phFullname: "Full name",
    phEmail: "Email address",
    phMessage: "Your Message",
    sendMessage: "Send Message"
  },

  fr: {
    role: "Développeur Full-Stack",
    showContacts: "Afficher les contacts",
    email: "Courriel",
    phone: "Téléphone",
    location: "Emplacement",
    locationValue: "Ville de Québec, Canada",

    navAbout: "À propos",
    navResume: "CV",
    navPortfolio: "Portfolio",
    navContact: "Contact",

    aboutTitle: "À propos de moi",
    aboutP1: "Professionnel polyvalent du développement logiciel, habitué à concevoir des systèmes robustes répondant à des besoins clients variés. Je gère des projets et des équipes pour respecter des échéanciers exigeants, en explorant les possibilités techniques et en repoussant les limites pour dépasser les attentes.",
    aboutP2: "Fort d'une expérience couvrant le développement web full-stack, les microservices infonuagiques et le DevOps, j'aime transformer des problèmes complexes en solutions fiables et maintenables. À mes heures, je perfectionne mes compétences avec LeetCode et le piratage éthique sur des plateformes comme TryHackMe.",

    serviceTitle: "Ce que je fais",
    service1Title: "Développement Full-Stack",
    service1Text: "Conception et maintenance d'applications web de bout en bout avec Angular, React et des API .NET.",
    service2Title: "Infonuagique & DevOps",
    service2Text: "Migration des charges de travail vers des microservices Kubernetes (AKS), création de chartes Helm et automatisation de la mise à l'échelle.",
    service3Title: "Mobilité & MDM",
    service3Text: "Développement de solutions de gestion des appareils mobiles (MDM) Windows et iOS pour des clients d'entreprise.",
    service4Title: "Systèmes de design",
    service4Text: "Création de Web Components réutilisables et automatisation de l'extraction des jetons de design via l'API Figma.",

    resumeTitle: "CV",
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
