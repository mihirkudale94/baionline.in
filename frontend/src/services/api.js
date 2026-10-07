/* Site copy shared with the backend. These JSON files are the single source:
   backend/data/content.py serves them from the API, and the get*Data helpers
   below fall back to the same files when the API is unreachable. Edit the
   JSON, never a copy here. */
import heroSlides from "../../../backend/data/site-content/hero-slides.json";
import stats from "../../../backend/data/site-content/stats.json";
import leadership from "../../../backend/data/site-content/leadership.json";
import navLinks from "../../../backend/data/site-content/nav-links.json";
import footerData from "../../../backend/data/site-content/footer-data.json";
import aboutContent from "../../../backend/data/site-content/about-content.json";
import contactData from "../../../backend/data/site-content/contact-data.json";
import announcements from "../../../backend/data/site-content/announcements.json";
import events from "../../../backend/data/site-content/events.json";
import newsTicker from "../../../backend/data/site-content/news-ticker.json";
import indianConstruction from "../../../backend/data/site-content/indian-construction.json";
import committeesData from "../../../backend/data/site-content/committees.json";
import executiveCommittee from "../../../backend/data/site-content/executive-committee.json";
import committeeGuidelines from "../../../backend/data/site-content/committee-guidelines.json";
import pastPresidentsData from "../../../backend/data/site-content/past-presidents.json";
import puneOfficeBearersData from "../../../backend/data/site-content/pune-office-bearers.json";
import platinumJubileeData from "../../../backend/data/site-content/platinum-jubilee-2015.json";
import socialActivitiesContent from "../../../backend/data/site-content/social-activities-data.json";

export {
  heroSlides,
  stats,
  leadership,
  navLinks,
  footerData,
  aboutContent,
  contactData,
  announcements,
  events,
  newsTicker,
  indianConstruction,
  committeesData,
  executiveCommittee,
  committeeGuidelines,
  pastPresidentsData,
  puneOfficeBearersData,
  platinumJubileeData,
  socialActivitiesContent
};

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || (
  typeof window !== "undefined" && window.location.origin.includes("localhost:5173")
    ? "http://localhost:8000/api"
    : "/api"
);

// Media the backend serves itself (gallery photos, for instance) comes back as
// an /api/... path. That is already correct in production, where the API and
// the site share an origin, but in dev the API lives on another port and the
// path has to be resolved against it.
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");
function resolveMediaUrl(src) {
  return typeof src === "string" && src.startsWith("/api/") ? `${API_ORIGIN}${src}` : src;
}

// Fetch with a hard timeout so an unreachable backend fails fast and the
// UI falls back to bundled data instead of hanging on a spinner.
const FETCH_TIMEOUT_MS = 5000;
function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

/* Headline shown over the carousel. This is the first thing a visitor
   reads, so it carries the page's only <h1> and says plainly what the
   Association is. Figures match the About page and the Mother Centre
   banner below the fold — update all three together. */
export const heroIntro = {
  tag: "Estd. 1941 · Pune — The Mother Centre",
  title: "Builders' Association of India",
  subtitle:
    "India's apex association of engineering construction contractors and builders — 232 centres, 25,000+ members, since 1941."
};

/* ------------------------------------------------------------------
   YOUTUBE — drives the video thumbnails in the home page YouTube widget.
   To add a video: paste its 11-character id (the v= part of the watch URL,
   e.g. youtube.com/watch?v=dQw4w9WgXcQ -> "dQw4w9WgXcQ") and a title.
   Thumbnails are pulled from img.youtube.com automatically.
   With an empty list the widget falls back to the channel banner.
   ------------------------------------------------------------------ */
export const youtubeChannel = "https://www.youtube.com/@buildersassociationofindia73";

export const youtubeVideos = [
  { id: "O6J1DaA4Bok", title: "Builders' Day Celebration 2026" },
  { id: "zYVFoAVSFGI", title: "Students' Internship Programme 2026 — Valedictory Function" },
  { id: "wp-cLZq4PI4", title: "BAI Pune Centre: 2025–26 Overview" },
  { id: "s6jdW3DPBS8", title: "WBSC 2026 Launching Ceremony — Chief Guest Mr. Atul Kapole" }
];

/* ------------------------------------------------------------------
   OUR SPONSORS — no longer defined here.

   The home page banner is now driven by paid listings: SponsorsBanner
   reads GET /api/sponsors, which returns only companies whose Razorpay
   payment has been verified server side (backend/routers/sponsors.py).
   A hard-coded array here would have put unpaid names on the banner,
   which is exactly what the paid flow exists to prevent.

   To list a sponsor who paid offline (DD / NEFT / cheque), use the CLI:
       python backend/add_sponsor.py --help
   ------------------------------------------------------------------ */

/* The regular activities of BAI Pune Centre, as rendered in order down the
   /activities page. The navbar links straight to that page and carries no
   submenu, so this list drives the page alone. */
export const activities = [
  {
    slug: "technical-seminars",
    title: "Technical Seminars",
    summary:
      "Regular seminars on construction technology, sustainable practices, statutory compliance and industry standards, led by domain experts and senior practitioners.",
    image: "/images/events/event_maharera-seminar-2025.jpg"
  },
  {
    slug: "site-visits",
    title: "Technical Site Visits",
    summary:
      "Organised visits to major infrastructure projects and research institutions across Pune, giving members first-hand exposure to construction methods and site practice.",
    image: "/images/events/event_jcb-plant-site-visit.jpg"
  },
  {
    slug: "networking-meets",
    title: "Networking Meets",
    summary:
      "Member meets that connect builders, contractors, consultants and developers across the Pune Centre and BAI's nationwide network of centres.",
    image: "/images/events/event_maharashtra-state-meeting-2025.jpg"
  },
  {
    slug: "government-interaction",
    title: "Government Interaction Programmes",
    summary:
      "Structured engagement with civic bodies and government departments — including PMC and state authorities — to represent the industry on policy, tendering and regulatory matters.",
    image: "/images/events/event_pmc-courtesy-visit-1.jpg"
  },
  {
    slug: "training-workshops",
    title: "Training Workshops",
    summary:
      "Skill-building workshops for member firms and their teams, covering site safety, project management, statutory documentation and emerging construction practice.",
    image: "/images/events/event_chenab-bridge-technical-talk.jpg"
  },
  {
    slug: "industry-academia",
    title: "Industry–Academia Collaboration",
    summary:
      "Formal engagement with universities and technical institutions — including a Memorandum of Understanding with MIT World Peace University's Department of Civil Engineering and its School of Construction Engineering and Management — to align academic curricula with site practice, open internship and placement routes for students, and build the next generation of construction leaders.",
    image: "/images/events/event_mitwpu-roundtable-discussion.jpg"
  }
];

// Safe API helpers with static fallbacks
export async function getHomeData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/home`);
    if (!res.ok) throw new Error("Status " + res.status);
    const data = await res.json();
    return {
      heroSlides: data.hero_slides,
      stats: data.stats,
      leadership: data.leadership,
      navLinks: data.nav_links,
      footerData: data.footer,
      announcements: data.announcements || announcements,
      events: data.events || events,
      newsTicker: data.news_ticker || newsTicker,
      indianConstruction: data.indian_construction || indianConstruction
    };
  } catch (err) {
    console.warn("Using local fallback for Home data:", err);
    return { 
      heroSlides, stats, leadership, navLinks, footerData,
      announcements, events, newsTicker, indianConstruction
    };
  }
}

export async function getAboutData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/about`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for About data:", err);
    return aboutContent;
  }
}

export async function getTeamData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/team`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Team data:", err);
    return leadership;
  }
}

export async function getContactData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/contact`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Contact data:", err);
    return contactData;
  }
}

export async function getNavigationData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/navigation`);
    if (!res.ok) throw new Error("Status " + res.status);
    const data = await res.json();
    return {
      navLinks: data.nav_links,
      footerData: data.footer
    };
  } catch (err) {
    console.warn("Using local fallback for Navigation data:", err);
    return { navLinks, footerData };
  }
}

export async function getSocialActivitiesData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/social-activities`);
    if (!res.ok) throw new Error("Status " + res.status);
    const data = await res.json();
    // The gallery is whatever sits in the backend's photo folder, so its
    // photos are served by the API rather than from the frontend's own images.
    return {
      ...data,
      gallery: (data.gallery || []).map((img) => ({ ...img, src: resolveMediaUrl(img.src) }))
    };
  } catch (err) {
    console.warn("Using local fallback for Social Activities data:", err);
    return socialActivitiesContent;
  }
}

export async function submitForm(formType, data) {
  const res = await fetchWithTimeout(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form_type: formType, data })
  });
  if (!res.ok) throw new Error("Status " + res.status);
  return res.json();
}

export async function getPuneOfficeBearersData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/pune-office-bearers`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Pune Office Bearers:", err);
    return puneOfficeBearersData;
  }
}

export async function getCommitteesData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/committees`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Committees:", err);
    return committeesData;
  }
}

export async function getExecutiveCommitteeData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/executive-committee`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Executive Committee:", err);
    return executiveCommittee;
  }
}

export async function getCommitteeGuidelines() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/committee-guidelines`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Committee Guidelines:", err);
    return committeeGuidelines;
  }
}

export async function getPastPresidentsData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/past-presidents`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Past Presidents:", err);
    return pastPresidentsData;
  }
}

/* ------------------------------------------------------------------
   WELL BUILT STRUCTURE COMPETITION
   Sources, in order of precedence:
     1. "Invitation for participation for WBSC 2026 (30th in series)" —
        the Centre's official circular signed by Sunil Mate (Chairman,
        WBSC 2026) and Ajay R. Gujar (Chairman, BAI Pune Centre).
     2. "Entry Form WBSC 2026 (30th in series)" — the prescribed form,
        which also carries the WBSC 2027 & 2028 advance-reservation form.
     3. "WBSC Booklet 2026" (38pp) — used only where the circulars are
        silent (e.g. the 100-mark split, the archive and Nirman Ratna).

   The circulars supersede the booklet on categories (16, not 11) and on
   eligibility — the booklet's "within 250 km of Pune" / nearby-centres
   restriction is gone, replaced by dedicated "Outside Pune / Mumbai"
   categories and an online-presentation rule for sites beyond 300 km.
   Do not edit these figures, names or category titles without checking
   the circulars — they are the Centre's own published record.

   Edition numbering: 1997-98 was the 1st in series, so 2024-25 = 28th,
   2025-26 = 29th and 2026 = 30th. The cover reads "30th in Series".
   ------------------------------------------------------------------ */
export const wbscAwardsData = {
  title: "Well Built Structure Competition 2026",
  officialName: "BAI – SHIRKE “Well Built Structure Competition – 2026”",
  edition: "30th in Series",
  since: "Since 1997",
  tagline: "Quality • Speed • Economy • Safety & Welfare",
  logo: "/images/wbsc/wbsc-logo.png",
  trophy: "/images/wbsc/wbsc-trophy.png",
  openEntriesNote: "Advance registration is also open for WBSC 2027–28 and WBSC 2028–29",
  about: [
    "A few decades ago it was felt that the Association should give due recognition to good quality works being done by fellow contractors, constructors and builders. This would help not only to enhance the image of the construction industry but also be a source of inspiration to all fellow contractors for improvement and betterment of their work. With this primary intention BAI Pune Centre instituted these awards and declared this competition in the year 1997.",
    "The awards have gained reputation and standing only because of the meticulous evaluation of works by an Independent Panel of Juries to decide award winning work. A team of leading consultants, architects and engineers form the panel of juries. They first check all the entries and, after presentation at the BAI Office, the Panel of Juries physically visits each site checking the works and assessing the project from various aspects of construction methods and techniques utilised."
  ],
  /* The five aspects the entry is judged on (booklet pp8, 11). */
  criteria: ["Quality", "Speed", "Economy", "Safety", "Welfare"],
  whyParticipate: [
    { title: "Independent Jury Evaluation", desc: "A panel of eminent civil engineers, structural designers, architects, project managers, green building and construction safety consultants assesses every entry." },
    { title: "Prestigious Trophy & Certificate", desc: "Winners receive the WBSC trophy and a certificate at the grand WBSC 2026 Award Ceremony." },
    { title: "Recognition Since 1997", desc: "Three decades of standing make the WBSC one of Pune's most respected construction quality benchmarks." },
    { title: "Rigorous, Documented Assessment", desc: "100 marks per project — 20 for the presentation and 80 for the site visit — scored on standard assessment sheets." },
    { title: "Weightage for Green Building", desc: "Implementation of Green Building concepts in the construction process is given more weightage during evaluation." },
    { title: "Showcase Your Site Practices", desc: "Workmanship, innovative techniques, site management, health and hygiene of workmen and training programmes are all considered." }
  ],
  /* The 16 official 2026 categories, verbatim from the invitation
     circular, grouped for the tab UI. "Masters Category" is not a 17th
     entry category — it is the conversion rule in mastersCategoryNote. */
  categoryCount: 16,
  categoryGroups: [
    {
      group: "Residential",
      categories: [
        "Residential (Bungalow / Row Houses / Farm House)",
        "Residential (Standalone – Single Plot Buildings)",
        "Residential (Standalone – Single Plot Redevelopment)",
        "Residential (Multi Building Project)"
      ]
    },
    {
      group: "Commercial",
      categories: [
        "Commercial (Malls, Shopping Centre, Offices, Hostels / combination of this use)",
        "Commercial (Institutional / Hospitals / Recreational Centre / IT Parks)"
      ]
    },
    {
      group: "Outside Pune / Mumbai",
      categories: [
        "Outside Pune / Mumbai Structure (Residential Bungalow, Standalone Building)",
        "Outside Pune / Mumbai Structure (Commercial)"
      ]
    },
    {
      group: "Industrial & Infrastructure",
      categories: [
        "Industrial (Any Type, Any Size)",
        "Infrastructure (Bridges, Flyovers, Underpass)",
        "Infrastructure (ESR, GSR, STP, ETP etc.)",
        "Infrastructure (Road projects of different types, Viaduct / Aqueduct)"
      ]
    },
    {
      group: "Government & Public Works",
      categories: [
        "Government (State & Central), Semi-Govt., Public Works (Residential / Housing / Offices)",
        "Government (State & Central), Semi-Govt., Public Works (Commercial, Public Buildings, Multi-use Buildings, Special Buildings)"
      ]
    },
    {
      group: "Specialised",
      categories: [
        "Landscapes (Garden, Open Space Development, Public Parks) — minimum 80% of area in softscape",
        "Work up to Bare Shell (includes RCC, Masonry and Plaster works)"
      ]
    }
  ],
  mastersCategoryNote: "Participants and organisations that have secured WBSC awards five (5) times or more are automatically converted to, and compete under, the “Masters Category” for all subsequent competitions.",
  eligibility: [
    "Entries are invited from any person or organisation engaged in construction — any individual, company, firm, joint venture, turnkey contractor, promoter or developer engaged in construction activity may participate.",
    "The applicant must have had a major role in the execution of the project.",
    "A project entered in a previous competition shall not be considered.",
    "Work must be nearing completion and shall have commenced preferably not before March 2024.",
    "For the Government category, the applicant must be a registered contractor — Government works are executed under special circumstances of rates, specifications, location, time, decisions, changes and accounts."
  ],
  eligibilityNote: "Please indicate the category on the entry form. One project may be proposed for two categories by filling in two separate entry forms and paying two entry fees.",
  evaluationCriteria: [
    "100 marks per project — 20 for the presentation, 80 for the site visit",
    "Quality, Speed, Economy, Safety and Welfare achieved on site",
    "Documents and records maintained right from the beginning",
    "Workmanship and innovative construction techniques",
    "Site management and monitoring methods",
    "Health and hygiene of workmen at site",
    "Training and motivational programmes conducted",
    "Implementation of Green Building concepts (given more weightage)"
  ],
  evaluationNote: "Evaluation is done through standard assessment sheets by each Jury member separately and is kept confidential. This data is not available for review or discussion. Selecting an entry for the citation is not binding on the Panel of Juries — a minimum number of entries is necessary for the citation of an award in a category, and if no suitable entry is found the award may be cancelled. The decision of the Panel of Juries is final.",
  entryTerms: [
    { label: "Entry fee", value: "₹25,000 + GST @ 18% per entry (and other taxes as applicable), payable with the application" },
    { label: "Entry form", value: "Free of cost — use a photocopy, or complete the soft copy and submit a printout" },
    { label: "Cheque in favour of", value: "Builders' Association of India – Pune Centre" },
    { label: "Presentation", value: "Maximum 30 minutes to the Panel of Juries, including PowerPoint and video" },
    { label: "Submission", value: "A copy of the presentation must reach the BAI Office at least 10 days before the presentation date" },
    { label: "Video format", value: "AVI only, maximum 10 minutes" },
    { label: "Sites beyond 300 km", value: "Sites more than 300 km from Pune Centre present online — 45 minutes of video plus 30 minutes of presentation" },
    { label: "Invalid entries", value: "Returned, and the entry fee refunded" }
  ],
  /* Tentative programme, verbatim from the invitation circular. */
  schedule: {
    note: "Tentative programme. Dates for the presentations, site visits and award ceremony will be conveyed in advance to the contact person named on the entry form.",
    milestones: [
      { date: "1 June 2026", description: "Issue & Submission of Entry Forms", confirmed: true },
      { date: "To be announced", description: "Presentations by the Participants at the BAI Office", confirmed: false },
      { date: "To be announced", description: "Site Visits by the Panel of Juries", confirmed: false },
      { date: "To be announced", description: "WBSC 2026 Award Ceremony", confirmed: false }
    ]
  },
  /* Advance reservation scheme introduced with the 2026 circular. */
  advanceRegistration: {
    title: "Advance Registration for WBSC 2027–28 & 2028–29",
    body: "BAI Well Built Structure Competition also accepts advance registrations from interested participants for forthcoming editions, including WBSC 2027–28 and WBSC 2028–29.",
    points: [
      "Reserve your entry by submitting the prescribed application along with a refundable booking fee.",
      "If you choose not to submit an entry for the reserved year, the booking fee is refunded, subject to the terms and conditions prescribed by the Organizing Committee.",
      "Acceptance of advance reservations is at the sole discretion of the WBSC Organizing Committee.",
      "The advance-reservation form is part of the WBSC 2026 Entry Form download — complete the WBSC 2027 & 2028 section and state the year you wish to reserve."
    ]
  },
  /* Field checklist drawn from the prescribed entry form, so applicants
     can assemble their papers before opening the document. */
  entryChecklist: [
    {
      heading: "About the applicant",
      items: [
        "Category applied for",
        "Name and designation of the applicant",
        "Name of the firm / company and full address",
        "Telephone numbers — residence, office and site",
        "E-mail ID",
        "Memberships of construction-related associations other than BAI",
        "Contact person, with site, office and personal numbers and e-mail"
      ]
    },
    {
      heading: "About the project",
      items: [
        "Name of the project, and address with site map and landmark",
        "Name of the client / owner and the project cost",
        "The applicant's role and scope, and the cost of the applicant's works",
        "Time limit of the project and date of commencement",
        "Scheduled completion date, and actual date of virtual completion",
        "Cost of the project completed till date",
        "Approvals, NOCs and certificates from PMC, PH Dept., CFO, MoEF, GRIHA etc. (attach copies)"
      ]
    },
    {
      heading: "Attachments & sign-off",
      items: [
        "Supporting photographs, documents, certificates and other appropriate data",
        "The entry form and supporting documents, well bound or filed",
        "Applicant's signature, name and company stamp",
        "Cheque for the entry fee in favour of Builders' Association of India – Pune Centre"
      ]
    }
  ],
  process: [
    { title: "Submit Entry", desc: "Complete the entry form with all mandatory information and submit it with supporting photographs, documents and certificates, well bound or filed, along with the entry fee." },
    { title: "Scrutiny by Juries", desc: "The Juries scrutinise the entries as they are received and confirm the category of each entry." },
    { title: "Project Presentation", desc: "Applicants present the project to the Panel of Juries in not more than 30 minutes, including PowerPoint and video." },
    { title: "Shortlisting", desc: "Entries are short listed after the presentation for the site visit stage." },
    { title: "Jury Site Visit", desc: "The Panel of Juries physically visits every shortlisted site, assessing construction methods, records, site management and welfare measures." },
    { title: "Award Ceremony", desc: "Awards are declared and distributed at the grand WBSC 2026 Award Ceremony, in the form of a trophy and a certificate." }
  ],
  presentationGuidelines: [
    "A project presentation of not more than 30 minutes before the Panel of Juries, including the PowerPoint and video, if any.",
    "Where possible, provide a video recording of the project (max 10 minutes, AVI format only) to supplement the PowerPoint.",
    "A copy of the presentation must be submitted to the BAI Office at least 10 days before the presentation date, and is retained by BAI Pune Centre for evaluation, presentation and promotional purposes.",
    "Sites more than 300 km from Pune Centre present online — a 45 minute video presentation plus 30 minutes of presentation.",
    "Photographs of project execution from excavation to finish.",
    "Labour camp and safety measures taken for the project.",
    "New methodology / techniques adopted for time and economy constraints.",
    "Methods for selection of construction materials and quality.",
    "Other data is presented during the site visit of the Panel of Juries."
  ],
  downloads: [
    {
      key: "invitation",
      label: "Invitation for Participation (WBSC 2026 - 30th in series)",
      desc: "Official invitation document for participation in the 30th WBSC 2026 competition.",
      file: "/documents/WBSC-2026-Invitation-for-Participation.docx",
      format: "DOCX",
      size: "159 KB",
      status: "available"
    },
    {
      key: "booklet",
      label: "WBSC 2026 Official Booklet",
      desc: "Complete 38-page official WBSC 2026 booklet with guidelines, categories, jury panel and award records.",
      file: "/documents/WBSC-2026-Booklet-Official.pdf",
      format: "PDF",
      size: "35.5 MB",
      status: "available"
    }
  ],
  /* Signatories on the WBSC 2026 invitation circular. */
  signatories: [
    { name: "Ajay R. Gujar", role: "Chairman, BAI Pune Centre" }
  ],
  /* Removed: the six "testimonials" previously here were invented quotes
     attributed to named individuals. Nothing goes back in this array
     unless BAI Pune Centre supplies real, attributable quotes. */
  testimonials: [],
  contactEmail: "baipune1@gmail.com"
};

/* BAI – Padmashree B. G. Shirke Lifetime Achievement Award (booklet p37).
   Declared for exemplary services to BAI, the construction industry,
   society and the educational field. A citation with memento and a purse
   of ₹1,11,000 is presented. Sponsored by M/s B G Shirke Construction
   Technology Pvt. Ltd., Pune. */
export const nirmanRatnaData = {
  title: "Nirman Ratna",
  subtitle: "BAI – Padmashree B. G. Shirke Lifetime Achievement Award",
  about: "Associated with the Well Built Structure Competition Awards, BAI Pune Centre also declared the BAI – P B G S Lifetime Achievement Award \"Nirman Ratna\" for exemplary services to BAI and the construction industry, society and the educational field. A citation, along with a memento and a purse of One Lac Eleven Thousand, is presented. The award is sponsored by M/s B G Shirke Construction Technology Pvt. Ltd., Pune.",
  awardees: [
    { year: "2025-26", name: "Shri. Rohidas Haribhau More (Dadasaheb)" },
    { year: "2024-25", name: "Er. R. R. Dhoot" },
    { year: "2023-24", name: "Er. J. P. Shroff" },
    { year: "2022-23", name: "Er. D. S. Shirole" },
    { year: "2021-22", name: "Er. R. B. Suryavanshi" },
    { year: "2019-20", name: "Er. M. B. Nambiar" },
    { year: "2018-19", name: "Er. V. G. Jana" },
    { year: "2017-18", name: "Shri. G. H. Ajwani" },
    { year: "2016-17", name: "Shri. D. L. Desai (Shankarbhai)" },
    { year: "2015-16", name: "Er. P. R. Mundle" },
    { year: "2014-15", name: "Er. Burjor F. Bode" },
    { year: "2013-14", name: "Er. Kumar Pritamdas Gera" },
    { year: "2012-13", name: "Er. Kishan P. Baney" },
    { year: "2011-12", name: "Er. Shrikant Vinayak Gadgil" },
    { year: "2010-11", name: "Shri Dore Sarvepulle Vajram" },
    { year: "2009-10", name: "Padmashree Baburaoji Shirke" }
  ]
};

/* Ceremony photographs, keyed to the edition they were shot at so the
   archive accordion can pull its own year's strip without a second list.
   `year` matches the `year` field in wbscArchiveData.years. Captions are
   deliberately neutral about who is on stage — fill in names only where
   the Centre can confirm them. `heroSrc` is the frame used behind the
   banner band until the 2026 artwork is ready — currently the WBSC 2025
   ceremony, credited in `heroCredit` so the dated photograph is never
   passed off as this year's. */
export const wbscGalleryData = {
  heading: "Moments from the Awards Ceremony",
  subtitle: "WBSC 2019 — 23rd in Series",
  note: "Photographs from the BAI–Shirke Well Built Structure Competition award ceremony held on December 20, 2019. Pictures from the WBSC 2026 ceremony will be added after the event.",
  heroSrc: "/images/events/event_nirman-ratna-award-2025.jpg",
  heroAlt: "The BAI – Padmashri B. G. Shirke Life Time Achievement citation presented at the Well Built Structure Competition 2025 ceremony",
  heroCredit: "Pictured: the WBSC 2025 award ceremony",
  photos: [
    { src: "/images/wbsc/2019/wbsc-2019-10.webp", year: "2019-20", caption: "All WBSC 2019 winners with the BAI Pune Centre office bearers and dignitaries" },
    { src: "/images/wbsc/2019/wbsc-2019-01.webp", year: "2019-20", caption: "Trophy and certificate presented to a category winner at the BAI–Shirke Awards 2019" },
    { src: "/images/wbsc/2019/wbsc-2019-03.webp", year: "2019-20", caption: "A winning firm's representative receives the WBSC 2019 trophy" },
    { src: "/images/wbsc/2019/wbsc-2019-04.webp", year: "2019-20", caption: "The team of a winning firm receives the trophy and certificate" },
    { src: "/images/wbsc/2019/wbsc-2019-02.webp", year: "2019-20", caption: "Award presentation on stage, WBSC 2019 — 23rd in Series" },
    { src: "/images/wbsc/2019/wbsc-2019-05.webp", year: "2019-20", caption: "Certificate and trophy handed over before the BAI Pune Centre office bearers" },
    { src: "/images/wbsc/2019/wbsc-2019-06.webp", year: "2019-20", caption: "Category winners felicitated at the WBSC 2019 ceremony" },
    { src: "/images/wbsc/2019/wbsc-2019-07.webp", year: "2019-20", caption: "Presentation of the WBSC certificate to a winning firm" },
    { src: "/images/wbsc/2019/wbsc-2019-08.webp", year: "2019-20", caption: "A winning entry felicitated at the awards ceremony" },
    { src: "/images/wbsc/2019/wbsc-2019-09.webp", year: "2019-20", caption: "Trophy and certificate presented to a WBSC 2019 category winner" }
  ]
};

/* Year-wise WBSC record, 1997-98 to 2025-26 (booklet pp13-15 and pp16-28).
   `winners` carries the firm and the category exactly as printed; the
   booklet does not record project names, so there is no project field.
   2025-26 has no winners list in the booklet — only the office bearers
   and chief guest for that edition are published. */
export const wbscArchiveData = {
  history: "The Well Built Structure Competition was instituted by BAI Pune Centre in 1997 to give due recognition to good quality work by fellow contractors, constructors and builders. From a handful of entries in its first year it has grown into an eleven-category, jury-evaluated competition covering residential, commercial, industrial, infrastructure, government, roads and landscape projects. The record below is reproduced from the Centre's own WBSC 2026 booklet.",
  years: [
    {
      year: "2025-26",
      editionLabel: "29th in Series",
      chiefGuest: "Shri. R. Radhakrishnan, Past President All India – BAI",
      guestOfHonour: "Dr Rajendra Dahale (IPS), Spl. Inspector General of Police, Crime Investigation Department (CID)",
      convenor: "Manoj Deshmukh",
      chairman: "Sunil Mate",
      highlight: "The winners' list for this edition is not published in the WBSC 2026 booklet.",
      winners: []
    },
    {
      year: "2024-25",
      editionLabel: "28th in Series",
      chiefGuest: "Shri. Annasahebji Chavan, Additional Commissioner (Revenue)",
      guestOfHonour: "Shri. Avinashji Patil, Director, Town Planning – Govt of Maharashtra; Shri. Anandji Gupta, Vice President BAI West Zone; Shri. Anilji Sonawane, State Chairman BAI Maharashtra",
      convenor: "Siddharth Shah",
      chairman: "Dhairyshil Khairepatil",
      highlight: "Twenty awards across residential, commercial, industrial, infrastructure, government, roads and landscape categories.",
      winners: [
        { firm: "Shree Om Construction", category: "Residential (Bungalow, Row Houses)" },
        { firm: "Shivalay Construction", category: "Residential (Bungalow, Row Houses)" },
        { firm: "Kamakshie Constructions", category: "Residential (Standalone)" },
        { firm: "Nirman Developers", category: "Residential (Standalone)" },
        { firm: "Pride Builder's LLP", category: "Residential (Multi Building Project)" },
        { firm: "Bhate & Raje Construction Co. Pvt. Ltd.", category: "Commercial (Institutional / Hospitals / Recreational Centre / IT Parks)" },
        { firm: "Tejus Infratech LLP", category: "Commercial (Malls / Shopping Centre / Offices / Hostels)" },
        { firm: "Kangralkar Infrastructure", category: "Outside Pune (Commercial)" },
        { firm: "SCON Projects Pvt. Ltd.", category: "Industrial (Any Type, Any Size) – 1" },
        { firm: "Ratilal Bhagwandas Const. Comp.", category: "Industrial (Any Type, Any Size)" },
        { firm: "SCON Projects Pvt. Ltd.", category: "Industrial (Any Type, Any Size) – 2" },
        { firm: "T And T Infra Ltd", category: "Infrastructure (Bridges, Flyovers)" },
        { firm: "T And T Infra Ltd", category: "Infrastructure (ESR, GSR, STP, ETP etc.)" },
        { firm: "Vascon Engineers Ltd.", category: "Government (State, Central, Semi-Govt.)" },
        { firm: "S. S. Sathe Infra Pvt. Ltd.", category: "Government (State, Central, Semi-Govt.)" },
        { firm: "A P Associates", category: "Government (State, Central, Semi-Govt.)" },
        { firm: "Sumedha Infra Projects Pvt. Ltd.", category: "Infrastructure (Roads Projects)" },
        { firm: "Millennium Engineers & Contractors Ltd.", category: "Work up to Bare Shell" },
        { firm: "SUGAM Constructions", category: "Landscapes (Garden, Open Space)" },
        { firm: "Design Building Workshop, Pune", category: "Landscapes (Garden)" }
      ]
    },
    {
      year: "2023-24",
      editionLabel: "27th in Series",
      chiefGuest: "Shri. Ajit Gulabchand, Past President All India BAI",
      guestOfHonour: "Shri. Sunil Mundada, Vice President BAI; Shri. Sachin Deshmukh, State Chairman BAI Maharashtra",
      convenor: "Sunil Mate",
      chairman: "Harpreet Singh Anand",
      highlight: "Entries from outside Pune and a dedicated landscape category feature in this edition.",
      winners: [
        { firm: "GRIT – Environmental", category: "Residential (Bungalow, Row Houses)" },
        { firm: "Pride Builders LLP", category: "Residential (Housing Complex)" },
        { firm: "Nirman Developers", category: "Residential (Affordable Housing)" },
        { firm: "(K Raheja) Cavalcade Properties Pvt Ltd.", category: "Residential" },
        { firm: "Pride Builders LLP", category: "Commercial (Malls, Office, Institutional, Hotel, Theatre)" },
        { firm: "Phoenix Group – Hyderabad", category: "Commercial" },
        { firm: "Uddhav S. Gawade", category: "Outside Pune – Commercial" },
        { firm: "P C M C", category: "Industrial (Any Size, Any Type)" },
        { firm: "Scon Projects Pvt. Ltd.", category: "Industrial" },
        { firm: "Rohan Builders (India) Pvt Ltd.", category: "Infrastructure" },
        { firm: "A. S. Desai Infrastructure Pvt. Ltd.", category: "Infrastructure" },
        { firm: "Harsh Construction Pvt Ltd.", category: "Government" },
        { firm: "Millennium Engineers & Contractors Ltd.", category: "Work up to Bare Shell" },
        { firm: "Across Nodes Transit Solution", category: "BBP" },
        { firm: "Vruksha Landscapes", category: "Landscapes (Horticulture work etc.)" }
      ]
    },
    {
      year: "2022-23",
      editionLabel: "26th in Series",
      chiefGuest: "Shri. Rajendra Athawale, Vice President BAI West Zone",
      guestOfHonour: "Shri. Dattatray Mule, State Chairman BAI Maharashtra",
      convenor: "Sunil Mate",
      chairman: "Ashok Atkekar",
      highlight: "Twelve awards, including the first landscape award of the modern category structure.",
      winners: [
        { firm: "SCON Projects Pvt. Ltd.", category: "Residential (Bungalow, Row Houses, Standalone Building)" },
        { firm: "Rohan Builders (India) Pvt Ltd.", category: "Residential (Housing Complex)" },
        { firm: "B. G. Shirke Construction Technology Pvt. Ltd.", category: "Residential" },
        { firm: "Ratnarup Projects Pvt. Ltd.", category: "Commercial (Malls, Office, Institutional, Hotel, Hospital, Theatre)" },
        { firm: "Ratilal Bhagwandas Construction Company", category: "Industrial Construction Projects" },
        { firm: "Suroj Buildcon Pvt. Ltd.", category: "Industrial Construction Projects" },
        { firm: "T and T Infra Ltd.", category: "Infrastructure (Bridges, Flyovers, ESR, Metro Stations)" },
        { firm: "Ajwani Infrastructure Pvt. Ltd.", category: "Infrastructure" },
        { firm: "B G Shirke Construction Technology Pvt Ltd", category: "Government (State & Central), Semi-Govt., Public Works" },
        { firm: "Shubham EPC Private Ltd.", category: "Government" },
        { firm: "Millennium Engineers & Contractors Pvt Ltd.", category: "Work up to Bare Shell (includes RCC, Masonry and Plaster works)" },
        { firm: "Sugam Construction", category: "Landscapes (Horticulture work etc.)" }
      ]
    },
    {
      year: "2021-22",
      editionLabel: "25th in Series — Silver Jubilee",
      chiefGuest: "Shri. R. N. Gupta, President All India BAI",
      guestOfHonour: "Shri. Atul Gadgil, Director (Works), Metro Rail Corporation Ltd.",
      convenor: "",
      chairman: "Jai Pinjani",
      highlight: "The Silver Jubilee edition, marking twenty-five years of the competition.",
      winners: [
        { firm: "Gera Developments Pvt. Ltd.", category: "Residential (Bungalow, Row Houses)" },
        { firm: "Vilas Javdekar Eco Shelters Pvt. Ltd.", category: "Residential (Housing Complex)" },
        { firm: "Pride Builder's LLP", category: "Residential (Affordable Housing)" },
        { firm: "City Corporation Limited", category: "Commercial (Malls, Office, Institutional, Hotel, Hospital, Theatre)" },
        { firm: "SCON Projects Pvt. Ltd.", category: "Industrial (Any Size, Any Type)" },
        { firm: "T and T Infra Ltd.", category: "Infrastructure" },
        { firm: "Raj Path Infracon Private Limited", category: "Government" },
        { firm: "Millennium Engineers & Contractors Ltd.", category: "Work up to Bare Shell" }
      ]
    },
    {
      year: "2020-21",
      editionLabel: "24th in Series",
      chiefGuest: "",
      guestOfHonour: "",
      convenor: "",
      chairman: "Manoj Deshmukh",
      highlight: "No chief guest is recorded for this edition in the booklet.",
      winners: [
        { firm: "Pride Builders LLP", category: "Residential (Standalone Bldg)" },
        { firm: "Pride Builders LLP", category: "Residential (Housing Complex)" },
        { firm: "B. G. Shirke Construction Technology Pvt. Ltd", category: "Residential (Affordable Housing)" },
        { firm: "Ratnarup Projects Pvt. Ltd.", category: "Commercial" },
        { firm: "Bhate & Raje Construction Co. Pvt. Ltd.", category: "Industrial" },
        { firm: "T and T Infra Ltd.", category: "Infrastructure" },
        { firm: "Vruksha Landscapes", category: "Infrastructure" },
        { firm: "SCON Projects Pvt. Ltd.", category: "Government" },
        { firm: "Millennium Engineers & Contractors Ltd", category: "Work up to Bare Shell" }
      ]
    },
    {
      year: "2019-20",
      editionLabel: "23rd in Series",
      chiefGuest: "Shri. Prataprao G. Pawar, Chairman, Sakal Papers Pvt. Ltd.",
      guestOfHonour: "Shri. Sachin Chandra, President All India BAI; Shri. Vikram Kumar (IAS), Commissioner PMRDA Pune",
      convenor: "Jai Pinjani",
      chairman: "Pradeep Garge",
      highlight: "The R1/R2/R3 residential sub-categories are used for the first time in this edition.",
      winners: [
        { firm: "Gera Developments Pvt. Ltd.", category: "Residential (R1) — Bungalow, Row Houses, Standalone Buildings" },
        { firm: "B. G Shirke Construction Technology Pvt. Ltd", category: "Residential (R2) — Housing Complex" },
        { firm: "B. G Shirke Construction Technology Pvt. Ltd", category: "Residential (R3) — Affordable Housing" },
        { firm: "Nyati Engineers & Consultants", category: "Commercial — Malls, Office, Institution, Hotel, Hospital, Theater" },
        { firm: "SCON Project Pvt Ltd.", category: "Industrial — Any Size, Any Type" },
        { firm: "J. Kumar Infraprojects Ltd.", category: "Infrastructure — Bridge, Flyover, ESR etc." },
        { firm: "S. J. Contracts Pvt. Ltd.", category: "Work up to Bare Shell" },
        { firm: "K. R. Traders", category: "Government, Semi Government, Public Work" },
        { firm: "S. T. Biradar", category: "Work up to Bare Shell" }
      ]
    },
    {
      year: "2018-19",
      editionLabel: "22nd in Series",
      chiefGuest: "Shri. A. Puhazhendi, President All India BAI",
      guestOfHonour: "Shri Pratap B. Salunkhe, Vice President BAI West Zone",
      convenor: "Nandkumar Jethani",
      chairman: "Jagannath Jadhav",
      highlight: "",
      winners: [
        { firm: "Vaichal Construction Pvt. Ltd.", category: "Residential (Bungalow, Row Houses, Standalone Buildings)" },
        { firm: "Pride Builder's LLP", category: "Residential (Housing Complex)" },
        { firm: "Kamakshie Constructions", category: "Commercial" },
        { firm: "RMK Infrastructure Pvt. Ltd.", category: "Industrial" },
        { firm: "RMK Infrastructure Pvt. Ltd.", category: "Infrastructure" },
        { firm: "S J Contracts Pvt. Ltd.", category: "Well Equipped, Well Mechanized" },
        { firm: "V M Matere Infrastructures (I) Pvt. Ltd.", category: "Government" },
        { firm: "Millennium Engineers & Contractors Pvt. Ltd.", category: "Work up to Cold Shell (RCC, Masonry and Plaster Works)" }
      ]
    },
    {
      year: "2017-18",
      editionLabel: "21st in Series",
      chiefGuest: "Mr. Kiran Gitte, Metropolitan Commissioner & Chief Executive Officer (CEO) of Pune Metro (PMRDA)",
      guestOfHonour: "Mr. V V Gaikwad, (Retd) Secretary, Water Resources, Govt of Maharashtra",
      convenor: "Sunil Mate",
      chairman: "Siddharth Shah",
      highlight: "The Young Entrepreneurs award category features in this edition.",
      winners: [
        { firm: "Ana Constructors", category: "Residential (Bungalow, Row Houses, Standalone Buildings)" },
        { firm: "Mohor Housing LLP", category: "Residential (Housing Complex)" },
        { firm: "B G Shirke Construction Technology Pvt. Ltd.", category: "Residential (Affordable Housing)" },
        { firm: "S J Contracts Pvt. Ltd.", category: "Commercial (Malls, Office, Institution, Hotel, Hospital, Theatre)" },
        { firm: "Precast India Infrastructures Pvt. Ltd.", category: "Industrial (Any Size, Any Type)" },
        { firm: "J Kumar Infra Project Ltd.", category: "Infrastructure (Bridges, Flyovers, ESR etc.)" },
        { firm: "Shubham Civil Projects Pvt. Ltd.", category: "Government (Semi-Govt, Public Work)" },
        { firm: "S J Contracts Pvt. Ltd.", category: "Well Equipped, Well Mechanized Site" },
        { firm: "Gargate & Sons", category: "Jury's Recommendation Award" },
        { firm: "Mr. Saurabh Jangle", category: "Young Entrepreneurs Award" },
        { firm: "Mr. Kapilesh Ajit Bhate", category: "Certificate of Commendation (Young Entrepreneurs)" }
      ]
    },
    {
      year: "2016-17",
      editionLabel: "20th in Series",
      chiefGuest: "Shri. Abhai Sinha, Director General (CPWD)",
      guestOfHonour: "Shri L. Moorthy, President All India BAI",
      convenor: "Manoj Deshmukh",
      chairman: "Mahesh Mirani",
      highlight: "",
      winners: [
        { firm: "Paranjape Schemes Construction Ltd.", category: "Residential — Single Building" },
        { firm: "P Square Builders LLP", category: "Residential — Multiple Building" },
        { firm: "B. G. Shirke Construction & Technology Pvt. Ltd.", category: "Residential (Affordable Housing / Semi Urban)" },
        { firm: "Ratnarup Projects Pvt. Ltd.", category: "Commercial" },
        { firm: "Precast India Infrastructures Pvt. Ltd.", category: "Industrial" },
        { firm: "J. Kumar Infra Projects Ltd.", category: "Infrastructure" },
        { firm: "Shubham Civil Projects Pvt. Ltd.", category: "Government" },
        { firm: "S J Contracts Pvt. Ltd.", category: "Well Equipped, Well Mechanized Site" },
        { firm: "Precast India Infrastructures Pvt. Ltd.", category: "Jury's Recommendation" }
      ]
    },
    {
      year: "2015-16",
      editionLabel: "19th in Series",
      chiefGuest: "Dr. E. Sreedharan, Principal Adviser / DMRC & LMRC",
      guestOfHonour: "Mr. Lalchand Sharma, President All India BAI",
      convenor: "Jagannath S Jadhav",
      coConvenor: "Manoj Deshmukh",
      chairman: "R B Suryawanshi",
      highlight: "",
      winners: [
        { firm: "Ana Constructions", category: "Residential (Bungalow)" },
        { firm: "Lunkad Realty", category: "Residential (Apartment)" },
        { firm: "Bhate & Raje Construction Company Pvt. Ltd.", category: "Commercial — Institutional, Hotel, Hospital, Cinema" },
        { firm: "Ratilal Bhagwandas Construction Company Pvt. Ltd.", category: "Industrial" },
        { firm: "J Kumar Infra Projects Ltd.", category: "Infrastructure" },
        { firm: "B. G. Shirke Construction Technology Pvt. Ltd.", category: "Government" },
        { firm: "Bhate & Raje Construction Company Pvt. Ltd.", category: "Well Equipped / Well Mechanised" },
        { firm: "Nyati Builders", category: "Young Entrepreneur" },
        { firm: "Sobha Ltd. (Pune)", category: "Jury's Recommendation Award" },
        { firm: "V M Matere Infrastructure (I) Pvt. Ltd.", category: "Jury's Recommendation Award" }
      ]
    },
    {
      year: "2014-15",
      editionLabel: "18th in Series",
      chiefGuest: "Dr. P R Swarup, Director General CIDC",
      guestOfHonour: "Mr. Sushanta Kumar Basu, President All India BAI",
      convenor: "Nandkumar Jethani",
      coConvenor: "Sanjay Vaichal",
      chairman: "C S Parhar",
      highlight: "",
      winners: [
        { firm: "Architectonics Design Consultancy Pvt Ltd", category: "Residential (Bungalow, Single Unit)" },
        { firm: "Pride Purple Group", category: "Residential (Apartment, Complex)" },
        { firm: "Ratnarup Projects Pvt. Ltd.", category: "Commercial (Malls, Office)" },
        { firm: "Kangralkar Associates", category: "Commercial (Institution, Hotel, Hospital)" },
        { firm: "Ratilal Bhagwandas", category: "Industrial" },
        { firm: "Patel Construction Company", category: "Infrastructure" },
        { firm: "Bhate & Raje Construction Pvt. Ltd.", category: "Well Equipped & Mechanised Site" },
        { firm: "PVM Construction Pvt. Ltd.", category: "Government" },
        { firm: "Mr. Amit Avinash Bhosale", category: "Young Entrepreneur" },
        { firm: "Mr. Nilesh Chavan", category: "Young Entrepreneur" },
        { firm: "Naman Associates", category: "Juries Recommendation Award" }
      ]
    },
    {
      year: "2013-14",
      editionLabel: "17th in Series",
      chiefGuest: "Maj Gen R K Mattu vsm, Chief Engineer, Head Quarters, Southern Command",
      guestOfHonour: "Mr. B D Yamgar, Chief Engineer, Maharashtra Jeevan Pradhikarn, PMCS",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Nandkumar Jethani",
      chairman: "Jaideep Raje",
      highlight: "Awards this year were split between the BAI–Shirke and BAI–Universal award streams.",
      winners: [
        { firm: "City Corporation Limited", category: "Residential, Apartment, Complex (BAI–Shirke Award)" },
        { firm: "Lunkad Realty", category: "Commercial, Offices, Malls etc. (BAI–Universal Award)" },
        { firm: "Adwitya Projects", category: "Commercial, Institutional, Hotel, Hospital, Cinema (BAI–Universal Award)" },
        { firm: "Bhate & Raje Construction Co. Pvt. Ltd.", category: "Industrial (BAI–Shirke Award)" },
        { firm: "B G Shirke Construction Technology Pvt. Ltd.", category: "Infrastructure (BAI–Shirke Award)" },
        { firm: "Horizon Construction", category: "Government (BAI–Shirke Award)" },
        { firm: "S J Contracts Pvt. Ltd.", category: "Well Equipped / Well Mechanised (BAI–Universal Award)" },
        { firm: "Gokhale Constructions", category: "Young Entrepreneur (BAI–Universal Award)" },
        { firm: "Sobha Developers Ltd.", category: "Jury's Recommendation (BAI–Universal Award)" },
        { firm: "Deep Enterprises", category: "Residential, Bungalow, Single Unit — Certificate of Commendation (BAI–Universal Award)" }
      ]
    },
    {
      year: "2012-13",
      editionLabel: "16th in Series",
      chiefGuest: "B. Seenaiah, President, All India BAI",
      guestOfHonour: "",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Nandkumar Jethani",
      chairman: "Subhash Deshpande",
      highlight: "Pune Municipal Corporation received a Commendation Award (Trophy) in the Government category.",
      winners: [
        { firm: "Paranjape Schemes Construction Ltd.", category: "Residential" },
        { firm: "Adwitya Projects (I) P. Ltd.", category: "Commercial (I Position)" },
        { firm: "Narendra Bakale Constructions", category: "Commercial (II Position)" },
        { firm: "SCON Projects P. Ltd.", category: "Industrial" },
        { firm: "Devi Construction Company", category: "Well Equipped / Well Mechanised" },
        { firm: "Tricon Infra Buildtech Pvt. Ltd.", category: "Young Entrepreneur" },
        { firm: "Om Engineers and Builders", category: "Jury's Recommendation" },
        { firm: "Pune Municipal Corporation", category: "Government, Semi-Govt., Public Works — Commendation Award (Trophy)" },
        { firm: "Ajwani Infrastructure P. Ltd.", category: "Infrastructure — Certificate of Commendation" }
      ]
    },
    {
      year: "2011-12",
      editionLabel: "15th in Series",
      chiefGuest: "Dr. Prem C Jain, Chairman – Indian Green Building Council",
      guestOfHonour: "",
      convenor: "Subhash Deshpande",
      chairman: "Subhash Deshpande",
      highlight: "",
      winners: [
        { firm: "Annachhatre & Gokhale Constructions", category: "Residential Complexes" },
        { firm: "Bhate & Raje Construction Company Pvt. Ltd.", category: "Large Industrial Project" },
        { firm: "Patel Construction Company", category: "Infrastructure Projects" },
        { firm: "Vascon Engineers Ltd.", category: "Well Mechanized Project" },
        { firm: "Lunkad Realty", category: "Interior Works" },
        { firm: "S T Biradar Engineers & Contractors Pvt. Ltd.", category: "Juries' Recommendation Award" },
        { firm: "Lunkad Realty", category: "Best out of Best" }
      ]
    },
    {
      year: "2010-11",
      editionLabel: "14th in Series",
      chiefGuest: "Mr. Bhagwan Deokar, President, All India BAI",
      guestOfHonour: "",
      convenor: "Nandkumar Jethani",
      chairman: "Neelkanth S Joshi",
      highlight: "",
      winners: [
        { firm: "Rohan Builders (I) Pvt Ltd.", category: "Residential — Group Housing Scheme" },
        { firm: "Vaichal Constructions Pvt. Ltd.", category: "Industrial (Small)" },
        { firm: "Ratilal Bhagwandas Construction Co. Pvt. Ltd.", category: "Industrial (Large)" },
        { firm: "Ghalsasi Constructions Pvt. Ltd.", category: "Commercial — Institutional" },
        { firm: "T & T Group, Civil Engineers & Contractors", category: "Infrastructure" },
        { firm: "Millennium Engineers & Contractors Pvt. Ltd", category: "Well Equipped & Mechanised Site" },
        { firm: "Sobha Developers Ltd.", category: "Best of The Best" },
        { firm: "Lunkad Realty", category: "Juries Recommendation Award" }
      ]
    },
    {
      year: "2009-10",
      editionLabel: "13th in Series",
      chiefGuest: "Mr. A K Yussouf, President, All India BAI",
      guestOfHonour: "",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Raman T Changede",
      chairman: "Neelkanth S Joshi",
      highlight: "",
      winners: [
        { firm: "R. B. Chaphalkar Homes Pvt Ltd", category: "Residential — Housing Scheme (II Position)" },
        { firm: "Millennium Engineers & Contractors Pvt Ltd", category: "Residential — Bungalow and Row Houses (II Position)" },
        { firm: "Devi Constructions Company", category: "Industrial (I Position)" },
        { firm: "Akruti Projects", category: "Industrial (II Position)" },
        { firm: "Aditya Constructions", category: "Industrial (Certificate of Special Appreciation)" },
        { firm: "Mohanlal Mathrani Construction Pvt. Ltd.", category: "Infrastructure (Certificate of Special Appreciation)" },
        { firm: "Lunkad Realty", category: "Commercial (I Position)" },
        { firm: "Ratilal Bhagwandas Construction Co. Pvt. Ltd.", category: "Commercial (II Position)" },
        { firm: "Akruti Projects", category: "Commercial (Certificate of Special Appreciation)" },
        { firm: "Shobha Bhopatkar", category: "Landscape" },
        { firm: "Vascon Engineers Ltd.", category: "Well Equipped & Mechanised Site" },
        { firm: "Rohan Builders (India) Pvt. Ltd.", category: "Well Equipped & Mechanised Site" },
        { firm: "Bakale Constructions", category: "Juries Recommendation Award" }
      ]
    },
    {
      year: "2008-09",
      editionLabel: "12th in Series",
      chiefGuest: "Maj. Gen. S S Sengupta vsm, Chief Engineer Head Quarters – Southern Command",
      guestOfHonour: "Mr. Ashok Khurana, Chief Engineer, CPWD (West Zone)",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Raman T Changede",
      chairman: "R B Krishnani",
      highlight: "",
      winners: [
        { firm: "Ana Constructions", category: "Residential — Housing Scheme (Certificate of Special Appreciation)" },
        { firm: "Lunkad Realty", category: "Residential — Housing Scheme (I Position)" },
        { firm: "Bhate & Raje Construction Co Pvt Ltd", category: "Residential — Bungalow and Row Houses (I Position)" },
        { firm: "Shree Sai Erectors", category: "Industrial — Small Scale (Certificate of Special Appreciation)" },
        { firm: "Ratilal Bhagwandas Construction Co. Pvt. Ltd.", category: "Industrial — Small Scale (I Position)" },
        { firm: "Devi Constructions Company", category: "Industrial — Large Scale (I Position)" },
        { firm: "Tejaswini Constructions", category: "Infrastructure (I Position)" },
        { firm: "M. B. Chitale Constructions", category: "Commercial (I Position)" },
        { firm: "Bhate & Raje Construction Co Pvt Ltd", category: "Well Equipped & Mechanised Site (I Position)" },
        { firm: "Millennium Engineers & Contractors Pvt. Ltd.", category: "Juries Recommendation Award" },
        { firm: "Sobha Developers Ltd.", category: "Best of The Best" }
      ]
    },
    {
      year: "2007-08",
      editionLabel: "11th in Series",
      chiefGuest: "Mr. P R Mundle, President, All India BAI",
      guestOfHonour: "Mr. Ashok Sinha, Chief Engineer – MES Pune Zone",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Ashok Atkekar",
      chairman: "Sanjay Vaichal",
      highlight: "",
      winners: [
        { firm: "Kumar Properties", category: "Residential (I Position)" },
        { firm: "Amit Enterprises", category: "Residential (II Position)" },
        { firm: "Madhav Limaye & Associates", category: "Residential (II Position)" },
        { firm: "S. J. Construction", category: "Commercial (I Position)" },
        { firm: "Sobha Developers Ltd.", category: "Commercial (II Position)" },
        { firm: "I.V.R.C.L Infrastructures & Project Ltd.", category: "Infrastructure (II Position)" },
        { firm: "S. J. Constructions", category: "Industrial (II Position)" },
        { firm: "Bhate & Raje Constructions Pvt Ltd", category: "Well Equipped & Well Mechanized Site" },
        { firm: "Devi Construction Co. Pvt. Ltd.", category: "Best of The Best" },
        { firm: "Vascon Engineers Pvt. Ltd.", category: "Juries Recommendation Award" }
      ]
    },
    {
      year: "2006-07",
      editionLabel: "10th in Series",
      chiefGuest: "Maj. Gen. Brajesh Kumar, Chief Engineer – Head Quarters Southern Command",
      guestOfHonour: "Mr. C. Raghava Reddy, President All India BAI; Mr. Bikramjit Ahluwalia, Vice President BAI (North Zone)",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "Devi Constructions Company", category: "Commercial Buildings (II Position)" },
        { firm: "Vascon Engineers Pvt Ltd.", category: "Commercial Buildings (II Position)" },
        { firm: "Omega Promoters Pvt Ltd.", category: "Residential Buildings (Appreciation Award)" },
        { firm: "Lunkad Realty", category: "Residential Buildings (I Position)" },
        { firm: "Madhav Limaye Associates", category: "Residential Buildings (II Position)" },
        { firm: "Ivrcl Infrastructure & Project Ltd.", category: "Infrastructure (I Position)" },
        { firm: "Prachi Construction Company", category: "Infrastructure (Appreciation Award)" },
        { firm: "Associated Constructions", category: "Industrial Buildings (Appreciation Award)" },
        { firm: "Rohan Builders (India) Pvt Ltd.", category: "BAI – Universal Well Equipped & Mechanised Project Award" },
        { firm: "Ivrcl Infrastructure & Project Ltd.", category: "BAI – Universal Well Equipped & Mechanised Project Award" },
        { firm: "Rohan Builders (India) Pvt Ltd.", category: "BAI – Birla Super Best of The Best Structures Award" }
      ]
    },
    {
      year: "2005-06",
      editionLabel: "9th in Series",
      chiefGuest: "Mr. Dilip Band, Commissioner PCMC",
      guestOfHonour: "Mr. B N Dikshit, President All India BAI; Mr. Naresh Grover, Vice President (West Zone)",
      convenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "Kamdar Constructions", category: "Residential (I Position)" },
        { firm: "Rohan Builders", category: "Residential (II Position)" },
        { firm: "Vascon Engineers Pvt. Ltd.", category: "Commercial (I Position)" },
        { firm: "Sobha Space Private Ltd.", category: "Commercial (II Position)" },
        { firm: "Bhate & Raje Constructions Co. Pvt. Ltd.", category: "Industrial (I Position)" },
        { firm: "Ratilal Bhagwandas Pvt. Ltd.", category: "Industrial (II Position)" },
        { firm: "S.M.S. Pvt Ltd", category: "Infrastructure (I Position)" },
        { firm: "Vaichal Constructions Pvt Ltd.", category: "Jury's Recommendation Award" },
        { firm: "Devi Constructions Company", category: "BAI – Birla Super Best of the Best Award" }
      ]
    },
    {
      year: "2004-05",
      editionLabel: "8th in Series",
      chiefGuest: "Mr. Nitin Kareer, Commissioner PMC",
      guestOfHonour: "Mr. J B Sharma, Chief Engineer MES Pune Zone",
      convenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "V. Y. Javdekar Const. Pvt Ltd.", category: "Residential (I Position)" },
        { firm: "Kamdar Construction", category: "Residential (II Position)" },
        { firm: "Millennium Engineers & Contractor Pvt Ltd.", category: "Commercial (I Position)" },
        { firm: "Nyati Builders Pvt Ltd.", category: "Commercial (II Position)" },
        { firm: "S.M.S. Pvt. Ltd.", category: "Infrastructure (I Position)" },
        { firm: "Petron Civil Engg Pvt. Ltd.", category: "Infrastructure (II Position)" },
        { firm: "Ratilal Bhagwandas", category: "Institutional (I Position)" },
        { firm: "Om Engineers Builders", category: "Jury's Recommendation Award" },
        { firm: "B. J. Samson Constructions", category: "Special Project" },
        { firm: "Vascon Engineers Pvt Ltd.", category: "BAI – Birla Super Best of The Best Award" }
      ]
    },
    {
      year: "2003-04",
      editionLabel: "7th in Series",
      chiefGuest: "Mr. Prataraoji Pawar, Director SAKAL",
      guestOfHonour: "Mr. Kumar Gera",
      convenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "Petron Civil Engineering Co.", category: "Infrastructures" },
        { firm: "Ratilal Bhagwandas Construction Co.", category: "Industrial Buildings" },
        { firm: "Kakkad Constructions & Engineering Co.", category: "Industrial Buildings" },
        { firm: "Lunkad Housing Corporation", category: "Residential Buildings (I Position)" },
        { firm: "Vascon Engineers Pvt Ltd.", category: "Residential Buildings (I Position)" },
        { firm: "R. B. Chaphalkar Constructions Co.", category: "Residential Buildings (II Position)" },
        { firm: "Devi Construction", category: "Commercial Buildings (II Position)" },
        { firm: "M. B. Chitale Constructions", category: "Commercial Buildings (II Position)" },
        { firm: "Suresh Athavale", category: "Residential Buildings (Juries' Recommendation Award)" },
        { firm: "Bhate & Raje Construction Co. Pvt. Ltd", category: "Commercial Buildings (Best Structure Award)" }
      ]
    },
    {
      year: "2002-03",
      editionLabel: "6th in Series",
      chiefGuest: "Mr. Bramh Datt, President All India BAI",
      guestOfHonour: "Maj. Gen. Gautam Datt, Chief Engineer Head Quarters, Southern Command",
      convenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "Millennium Engg & Constr P Ltd", category: "Special Structure" },
        { firm: "R. B. Chaphalkar Construction Co.", category: "Residential Apartment" },
        { firm: "R. S. Construction", category: "Residential Apartment" },
        { firm: "Lunkad Housing Corporation", category: "Group Housing – Residential" },
        { firm: "Gawade Construction", category: "Group Housing – Residential" },
        { firm: "Rohan Builders I Pvt Ltd.", category: "Industrial" },
        { firm: "Bhate & Raje Constr. Co P Ltd.", category: "Industrial" },
        { firm: "Ratilal Bhagwandas Constr. Co.", category: "Industrial" },
        { firm: "Khivsara Construction", category: "Industrial" },
        { firm: "Rohan Builders I Pvt Ltd.", category: "Institutional" },
        { firm: "Petron Civil Engg Pvt Ltd.", category: "Special Purpose Structure" },
        { firm: "Mr. R. B. Krishnani", category: "Special Purpose Structure" },
        { firm: "Bhate & Raje Constr Co Pvt Ltd.", category: "Residential – Bungalow" },
        { firm: "Om Engineers & Builders", category: "Commercial" }
      ]
    },
    {
      year: "2001-02",
      editionLabel: "5th in Series",
      chiefGuest: "Mr. Bhagwan J. Deokar, Vice President BAI (West Zone)",
      guestOfHonour: "Mr. P M Harshe, Trustee BAI Hqrs.",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Ashok Atkekar",
      chairman: "",
      highlight: "The first year for which chief guest records are published in the booklet.",
      winners: [
        { firm: "Ameya Developers Pvt Ltd.", category: "Special Structure – Bridge at Dharamatar" },
        { firm: "R B Krishnani", category: "Special Structure – Design, Construction & Testing of RCC ESR of 22.5 lacs Ltr." },
        { firm: "Raja Bahadur Mills Ltd", category: "Commercial" },
        { firm: "Shonan Engineering Works Ltd", category: "Specialized Structure – Designing & Construction RCC / ESR" },
        { firm: "H N Bhat & Co.", category: "Specialized Structure – Sewage Treatment Plant" },
        { firm: "Rohan Construction Co.", category: "Residential Building – Bungalow / Row House" },
        { firm: "R B Chaphalkar Const. Co.", category: "Residential Building – Bungalow / Row House" },
        { firm: "Nyati Engineering & Consultants", category: "Residential Building – Ownership Scheme" },
        { firm: "Associated Civil Engg. Services", category: "Residential Building – Ownership Scheme" },
        { firm: "Choice Group & J P Venture", category: "Residential Building – Ownership Scheme" },
        { firm: "Nyati Engineering & Consultants", category: "Institutional / Public Building" },
        { firm: "Kalbhor Associates, Baramati", category: "Institutional" },
        { firm: "Sanjay Vaichal", category: "Institutional" }
      ]
    },
    {
      year: "2000-01",
      editionLabel: "4th in Series",
      chiefGuest: "",
      guestOfHonour: "",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "Vascons Engineers Ltd.", category: "Residential Bungalow" },
        { firm: "Nyati Engineers", category: "Residential Complex" },
        { firm: "Ishwar Construction", category: "Commercial Building" },
        { firm: "D.S.K. Developers Ltd.", category: "Industrial Building" },
        { firm: "Rohan Builders (I) Pvt. Ltd.", category: "Bldg. for Software Industries" },
        { firm: "Style Interiors, Decorators & Civil Contractors", category: "Major renovation & reconstruction of McDonald's family restaurant" }
      ]
    },
    {
      year: "1999-2000",
      editionLabel: "3rd in Series",
      chiefGuest: "",
      guestOfHonour: "",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "Ameya Developers Pvt. Ltd.", category: "Bridges" },
        { firm: "Sanjay V. Vaichal", category: "Industrial Building" },
        { firm: "Ishwar Construction — Parmar Trade Centre", category: "Commercial Building" },
        { firm: "D.S.K. Developers Ltd. — Toyota Showroom", category: "Industrial Building" },
        { firm: "Rohan Builders (I) Pvt. Ltd.", category: "Bldg. for Software Industries" }
      ]
    },
    {
      year: "1998-99",
      editionLabel: "2nd in Series",
      chiefGuest: "",
      guestOfHonour: "",
      convenor: "Neelkanth S Joshi",
      coConvenor: "Ashok Atkekar",
      chairman: "",
      highlight: "",
      winners: [
        { firm: "R. B. Krishnani", category: "Elevated water reservoir" },
        { firm: "Ashoka Buildcon", category: "Private Building" },
        { firm: "Suresh Construction", category: "Public Building" },
        { firm: "Bharucha Motiwala", category: "HDFC Building" },
        { firm: "Shah Construction", category: "Residential Complex" },
        { firm: "Om Construction", category: "Certificate for Different Structure (Temple) — innovative FRP form work" },
        { firm: "Adept Construction", category: "Certificate — Public Building" }
      ]
    },
    {
      year: "1997-98",
      editionLabel: "1st in Series",
      chiefGuest: "",
      guestOfHonour: "",
      convenor: "Neelkanth S Joshi",
      coConvenor: "",
      chairman: "",
      highlight: "The inaugural edition of the competition.",
      winners: [
        { firm: "Ashoka Buildcon", category: "Hospital Building for Ruby Hall, Bund Garden Road" }
      ]
    }
  ],
  note: "Reproduced from the BAI Pune Centre WBSC 2026 booklet. The booklet does not record project names against winners, and does not publish a winners list for the 2025-26 edition."
};

export const eventsPageData = {
  title: "Events",
  subtitle: "Knowledge • Networking • Growth",
  /* Add confirmed events here ({ title, date, venue, image }); the Upcoming
     section on the Events page stays hidden while this is empty. */
  upcoming: [],
  /* Archive list. `album` is the id of the matching entry in `albums` below;
     the Past Events card then links straight to that event's photos. */
  past: [
    { title: "BAI Pune Centre at Central Bank of India's Mega Retail Credit Outreach Campaign", date: "July 2026", venue: "Regional Office, Pune", album: "central-bank-2026" },
    { title: "MoU Signing & Round Table with MIT World Peace University — Building Future Construction Leaders", date: "14th July 2026", venue: "MIT World Peace University, Kothrud, Pune", album: "mitwpu-2026" },
    { title: "Launch Ceremony — Well Built Structure Competition 2026 (30th in Series)", date: "24th June 2026", venue: "Pune", album: "wbsc-2026-launch" },
    { title: "Technical Site Visit — Central Water and Power Research Station (CWPRS)", date: "June 2026", venue: "CWPRS, Khadakwasla, Pune", album: "cwprs-2026" },
    { title: "Tree Plantation Program 2026", date: "June 2026", venue: "Pune", album: "tree-plantation-2026" },
    { title: "Installation Ceremony of Office Bearers, BAI Pune Centre (2026–27)", date: "2026", venue: "Pune", album: "installation-2026-27" },
    { title: "Meeting with the Executive Engineer, MSRDC", date: "April 2026", venue: "Pune", album: "msrdc-2026" },
    { title: "Students' Internship Programme 2026 — Valedictory Function", date: "17th March 2026", venue: "Pune", album: "sip-valedictory-2026" },
    { title: "BAI Sports League 2026", date: "21st February 2026", venue: "United Sports Center, Kakkanad, Kochi" },
    { title: "Courtesy Visit to Pune Municipal Corporation", date: "February 2026", venue: "Pune Municipal Corporation, Pune", album: "pmc-2026" },
    { title: "BAI's 32nd All India Builders Convention", date: "7th–9th January 2026", venue: "Dr. Shyama Prasad Mukherjee Indoor Stadium, Goa, India" },
    { title: "Technical Site Visit — Cable-Stayed Bridge Project at Tapola", date: "January 2026", venue: "Tapola, Maharashtra", album: "tapola-bridge-2026" },
    { title: "Students' Internship Programme — Induction Program", date: "23rd December 2025", venue: "AISSMS College of Engineering, Pune", album: "sip-induction-2025" },
    { title: "Builders' Day Celebration 2025", date: "15th December 2025", venue: "Pune", album: "builders-day-2025" },
    { title: "3rd MC-GC Meeting", date: "20th–21st November 2025", venue: "CIAL Convention Centre, Kochi" },
    { title: "Satkar Samarambh — Felicitation of Meritorious Children of Construction Workers", date: "14th November 2025", venue: "Pune", album: "labour-children-2025" },
    { title: "Well Built Structure Competition 2025 — Awards (29th in Series)", date: "2025", venue: "Pune", album: "wbsc-2025" },
    { title: "Engineers' Day Celebration 2025", date: "September 2025", venue: "Pune", album: "engineers-day-2025" },
    { title: "All Maharashtra Dharna Andolan by Government Contractors", date: "19th August 2025", venue: "Collector Office, Pune", album: "dharna-andolan-2025" },
    { title: "Tree Plantation Program with Pune Municipal Corporation", date: "9th August 2025", venue: "Pune", album: "tree-plantation-2025" },
    { title: "Seminar on Self-Redevelopment and MahaRERA 2025 Updates", date: "13th June 2025", venue: "Pune", album: "maharera-seminar-2025" },
    { title: "BAI Maharashtra 1st State Meeting 2025–26", date: "25th April 2025", venue: "Pune", album: "state-meeting-2025" },
    { title: "Installation Ceremony of Office Bearers, BAI Pune Centre (2025–26)", date: "25th April 2025", venue: "Pune", album: "installation-2025-26" },
    { title: "Well Built Structure Competition 2024 — Awards (28th in Series)", date: "21st December 2024", venue: "Pune", album: "wbsc-2024" }
  ],
  siteVisits: [
    {
      title: "Central Water and Power Research Station (CWPRS)",
      date: "June 2026",
      venue: "Khadakwasla, Pune",
      image: "/images/events/event_industrial-facility-visit-1.jpg",
      album: "cwprs-2026",
      desc: "A technical visit to CWPRS to understand hydraulic model studies and their application to dam, canal and river-training structures."
    },
    {
      title: "Cable-Stayed Bridge Project at Tapola",
      date: "January 2026",
      venue: "Tapola, Maharashtra",
      image: "/images/events/event_bridge-site-visit-1.jpg",
      album: "tapola-bridge-2026",
      desc: "Members toured the cable-stayed bridge project at Tapola, executed by M/s. T & T Infra Limited, to study formwork, cable-stay tensioning and staged-construction sequencing."
    },
    {
      title: "JCB Plant at Tathawade",
      date: "",
      venue: "Tathawade, Pune",
      image: "/images/events/event_jcb-plant-site-visit.jpg",
      album: "jcb-plant",
      desc: "A study visit to the JCB Design Centre and plant, with a briefing on the company's earth-moving equipment range."
    },
    {
      title: "Coca-Cola Project at Lote, Chiplun",
      date: "",
      venue: "Lote, Chiplun",
      image: "/images/events/event_coca-cola-lote-site-visit.jpg",
      album: "coca-cola-lote",
      desc: "Members visited the Coca-Cola project at Lote, Chiplun, to see a large industrial plant and its site safety practice."
    }
  ],
  regularActivities: [
    "Technical Seminars",
    "Industrial Visits",
    "Networking Meets",
    "Government Interaction Programs",
    "Student Internship Programs",
    "Training Workshops",
    "Annual Convention",
    "Leadership Meetings"
  ],
  /* Event-wise photo albums, newest first; albums without a known date sit at
     the end. Titles follow the captions in the Centre's "BAI Photo Prints"
     booklet (09-08-2026); dates come from the banners and backdrops visible in
     the photos. `focal` sets object-position for a tile when the subject is
     off-centre. */
  albums: [
    {
      id: "independence-day",
      title: "Independence Day Celebrations",
      date: "15th August 2026",
      venue: "BAI Pune Centre",
      photos: [
        { src: "/images/events/event_independence-day-2026-flag-hoisting.jpg", caption: "Independence Day 2026 — Flag Hoisting at BAI Pune Centre", focal: "center 25%" },
        { src: "/images/events/event_independence-day-2026-1.jpg", caption: "Members Gathered at the Pune Centre Office on Independence Day 2026" },
        { src: "/images/events/event_independence-day-2026-2.jpg", caption: "Address to Members, Independence Day 2026" },
        { src: "/images/events/event_independence-day-2026-3.jpg", caption: "Independence Day Get-Together at the Pune Centre Office" },
        { src: "/images/events/event_independence-day-flag-hoisting.jpg", caption: "Flag Hoisting Program — Independence Day Celebration" }
      ]
    },
    {
      id: "central-bank-2026",
      title: "Central Bank of India's Mega Retail Credit Outreach Campaign",
      date: "July 2026",
      venue: "Regional Office, Pune",
      photos: [
        { src: "/images/events/event_central-bank-outreach-campaign.jpg", caption: "BAI Pune Centre at Central Bank of India's Mega Retail Credit Outreach Campaign" }
      ]
    },
    {
      id: "mitwpu-2026",
      title: "MoU Signing & Round Table with MIT World Peace University",
      date: "14th July 2026",
      venue: "MIT World Peace University, Kothrud, Pune",
      photos: [
        { src: "/images/events/event_mitwpu-mou-signing-group.jpg", caption: "MoU Signed between BAI Pune Centre and MIT World Peace University" },
        { src: "/images/events/event_mitwpu-mou-signing.jpg", caption: "Signing of the Memorandum of Understanding" },
        { src: "/images/events/event_mitwpu-roundtable-discussion.jpg", caption: "Round Table Discussion — Building Future Construction Leaders" },
        { src: "/images/events/event_mitwpu-roundtable-1.jpg", caption: "Members and Faculty at the MIT-WPU Round Table" },
        { src: "/images/events/event_mitwpu-roundtable-2.jpg", caption: "Round Table in Session at MIT World Peace University" },
        { src: "/images/events/event_mitwpu-roundtable-3.jpg", caption: "Industry and Academia Representatives in Discussion" },
        { src: "/images/events/event_mitwpu-publication-handover.jpg", caption: "Presentation of BAI Publications to MIT World Peace University" },
        { src: "/images/events/event_mitwpu-felicitation.jpg", caption: "Felicitation of Guests at the MIT-WPU Round Table" }
      ]
    },
    {
      id: "wbsc-2026-launch",
      title: "Launch Ceremony — WBSC 2026 (30th in Series)",
      date: "24th June 2026",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_wbsc-2026-launch-1.jpg", caption: "Release of the WBSC 2026 Booklet at the Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-2.jpg", caption: "Launch Ceremony — WBSC 2026. Chief Guest: Er. Atul Kapole, Executive Director, MKVDC, Pune" },
        { src: "/images/events/event_wbsc-2026-launch-3.jpg", caption: "Address by the Chief Guest, Er. Atul Kapole", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-4.jpg", caption: "Felicitation at the WBSC 2026 Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-5.jpg", caption: "Members and Guests at the Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-6.jpg", caption: "Guests in Conversation at the WBSC 2026 Launch", focal: "center 35%" },
        { src: "/images/events/event_wbsc-2026-launch-16.jpg", caption: "Chief Guest Er. Atul Kapole Addressing the Gathering", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-7.jpg", caption: "Launching Ceremony Sponsor — Skywin Formwork" },
        { src: "/images/events/event_wbsc-2026-launch-11.jpg", caption: "Audience at the WBSC 2026 Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-8.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-9.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-10.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-12.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-13.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-14.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-15.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-21.jpg", caption: "Address at the WBSC 2026 Launch Ceremony", focal: "center 30%" },
        { src: "/images/events/event_wbsc-2026-launch-17.jpg", caption: "Felicitation at the WBSC 2026 Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-18.jpg", caption: "Felicitation at the WBSC 2026 Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-19.jpg", caption: "Felicitation at the WBSC 2026 Launch Ceremony" },
        { src: "/images/events/event_wbsc-2026-launch-20.jpg", caption: "Felicitation at the WBSC 2026 Launch Ceremony" }
      ]
    },
    {
      id: "cwprs-2026",
      title: "Technical Site Visit — CWPRS, Pune",
      date: "June 2026",
      venue: "Central Water and Power Research Station, Khadakwasla, Pune",
      photos: [
        { src: "/images/events/event_industrial-facility-visit-1.jpg", caption: "Technical Site Visit — CWPRS, Pune, 2026" },
        { src: "/images/events/event_cwprs-site-visit-2026-group.jpg", caption: "Members Outside the Central Water and Power Research Station" },
        { src: "/images/events/event_cwprs-site-visit.jpg", caption: "Members in Discussion at CWPRS" },
        { src: "/images/events/event_industrial-facility-visit-2.jpg", caption: "Members During the CWPRS Visit" }
      ]
    },
    {
      id: "tree-plantation-2026",
      title: "Tree Plantation Program 2026",
      date: "June 2026",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_tree-plantation-2026-1.jpg", caption: "Tree Plantation Program 2026" },
        { src: "/images/events/event_tree-plantation-2026-2.jpg", caption: "Members Planting a Sapling — Tree Plantation Program 2026" }
      ]
    },
    {
      id: "installation-2026-27",
      title: "Installation Ceremony — BAI Pune Centre (2026–27)",
      date: "2026",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_installation-2026-27-1.jpg", caption: "Installation Ceremony, BAI Pune Centre (2026–27)", focal: "center 30%" },
        { src: "/images/events/event_installation-2026-27-2.jpg", caption: "Badge Presentation at the Installation Ceremony (2026–27)", focal: "center 30%" },
        { src: "/images/events/event_installation-2026-27-3.jpg", caption: "Felicitation at the Installation Ceremony (2026–27)" },
        { src: "/images/events/event_installation-2026-27-4.jpg", caption: "Felicitation of Office Bearers (2026–27)" },
        { src: "/images/events/event_installation-2026-27-5.jpg", caption: "Felicitation at the Installation Ceremony, BAI Pune Centre" }
      ]
    },
    {
      id: "msrdc-2026",
      title: "Meeting with the Executive Engineer, MSRDC",
      date: "April 2026",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_msrdc-meeting-2026-1.jpg", caption: "BAI Pune Centre Delegation with the Executive Engineer, MSRDC" },
        { src: "/images/events/event_msrdc-meeting-2026-2.jpg", caption: "Meeting with MSRDC Officials" },
        { src: "/images/events/event_msrdc-meeting-2026-3.jpg", caption: "Discussion with MSRDC Officials" }
      ]
    },
    {
      id: "sip-valedictory-2026",
      title: "Students' Internship Programme 2026 — Valedictory Function",
      date: "17th March 2026",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_sip-valedictory-2026-1.jpg", caption: "Interns with Their Certificates" },
        { src: "/images/events/event_sip-valedictory-2026-2.jpg", caption: "Office Bearers and Students at the Valedictory Function" },
        { src: "/images/events/event_sip-valedictory-2026-3.jpg", caption: "Presentation of Internship Certificates" },
        { src: "/images/events/event_sip-valedictory-2026-4.jpg", caption: "Students and Members at the Valedictory Function" },
        { src: "/images/events/event_sip-valedictory-2026-5.jpg", caption: "Certificate Presentation to an Intern" },
        { src: "/images/events/event_sip-valedictory-2026-6.jpg", caption: "Release of a Publication at the Valedictory Function" },
        { src: "/images/events/event_sip-valedictory-2026-7.jpg", caption: "Group Photograph — Students' Internship Programme 2026" },
        { src: "/images/events/event_sip-valedictory-2026-8.jpg", caption: "Students Registering for the Valedictory Function" },
        { src: "/images/events/event_sip-valedictory-2026-9.jpg", caption: "Welcoming Guests to the Valedictory Function" },
        { src: "/images/events/event_sip-valedictory-2026-10.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-11.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-12.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-13.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-14.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-15.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-16.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-17.jpg", caption: "Address by an Intern at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-18.jpg", caption: "Address by an Intern at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-19.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-22.jpg", caption: "Address at the Valedictory Function", focal: "center 25%" },
        { src: "/images/events/event_sip-valedictory-2026-20.jpg", caption: "Certificate Presentation to an Intern" },
        { src: "/images/events/event_sip-valedictory-2026-21.jpg", caption: "Certificate Presentation to an Intern" },
        { src: "/images/events/event_sip-valedictory-2026-23.jpg", caption: "Interns at Lunch After the Valedictory Function" },
        { src: "/images/events/event_sip-valedictory-2026-24.jpg", caption: "Interns at Lunch After the Valedictory Function" }
      ]
    },
    {
      id: "pmc-2026",
      title: "Courtesy Visit to Pune Municipal Corporation",
      date: "February 2026",
      venue: "Pune Municipal Corporation, Pune",
      photos: [
        { src: "/images/events/event_pmc-courtesy-visit-1.jpg", caption: "Courtesy Visit to Pune Municipal Corporation" },
        { src: "/images/events/event_pmc-courtesy-visit-2.jpg", caption: "Meeting with PMC Officials" },
        { src: "/images/events/event_pmc-courtesy-visit-4.jpg", caption: "Greeting PMC Officials During the Courtesy Visit" },
        { src: "/images/events/event_pmc-courtesy-visit-5.jpg", caption: "Presentation to PMC Officials During the Courtesy Visit" },
        { src: "/images/events/event_pmc-courtesy-visit-3.jpg", caption: "BAI Pune Centre Delegation at Pune Municipal Corporation" }
      ]
    },
    {
      id: "tapola-bridge-2026",
      title: "Technical Site Visit — Cable-Stayed Bridge Project at Tapola",
      date: "January 2026",
      venue: "Tapola, Maharashtra (by M/s. T & T Infra Limited)",
      photos: [
        { src: "/images/events/event_bridge-site-visit-1.jpg", caption: "Cable-Stayed Bridge Project at Tapola, Maharashtra" },
        { src: "/images/events/event_bridge-site-visit-2.jpg", caption: "Members Being Briefed at the Bridge Site" },
        { src: "/images/events/event_bridge-site-visit-3.jpg", caption: "Members on the Boat to the Tapola Bridge Site" },
        { src: "/images/events/event_bridge-site-visit-4.jpg", caption: "Members During the Tapola Site Visit" }
      ]
    },
    {
      id: "sip-induction-2025",
      title: "Students' Internship Programme — Induction Program",
      date: "23rd December 2025",
      venue: "AISSMS College of Engineering, Pune",
      photos: [
        { src: "/images/events/event_sip-induction-2025-1.jpg", caption: "Presentation to a Student at the Internship Induction Program" },
        { src: "/images/events/event_sip-induction-2025-2.jpg", caption: "Students and Members at the Induction Program" },
        { src: "/images/events/event_sip-induction-2025-3.jpg", caption: "Internship Induction Program, Organised with the Department of Civil Engineering, AISSMS COE" },
        { src: "/images/events/event_sip-induction-2025-4.jpg", caption: "Felicitation at the Internship Induction Program" }
      ]
    },
    {
      id: "builders-day-2025",
      title: "Builders' Day Celebration 2025",
      date: "15th December 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_builders-day-2025.jpg", caption: "Builders' Day Celebration 2025" },
        { src: "/images/events/event_builders-day-2025-group.jpg", caption: "Office Bearers and Guests — Builders' Day Celebration 2025" },
        { src: "/images/events/event_builders-day-2025-chief-guest.jpg", caption: "Chief Guest: Dr. Sunil Bhirud, Vice Chancellor, COEP Technological University", focal: "center 25%" },
        { src: "/images/events/event_builders-day-2025-guest-of-honour.jpg", caption: "Guest of Honour: Mr. Anubhav Kapoor, General Counsel & Senior Vice President, COSA", focal: "center 25%" },
        { src: "/images/events/event_builders-day-2025-felicitation-1.jpg", caption: "Felicitation at the Builders' Day Celebration" },
        { src: "/images/events/event_builders-day-2025-felicitation-2.jpg", caption: "Felicitation at the Builders' Day Celebration" },
        { src: "/images/events/event_builders-day-2025-felicitation-3.jpg", caption: "Felicitation at the Builders' Day Celebration" },
        { src: "/images/events/event_builders-day-2025-felicitation-4.jpg", caption: "Felicitation at the Builders' Day Celebration" },
        { src: "/images/events/event_builders-day-2025-felicitation-5.jpg", caption: "Felicitation at the Builders' Day Celebration" },
        { src: "/images/events/event_new-life-members-felicitation.jpg", caption: "Felicitation of New BAI Pune (Life) Members" },
        { src: "/images/events/event_new-life-members-felicitation-2.jpg", caption: "Felicitation of New BAI Pune (Life) Members" }
      ]
    },
    {
      id: "labour-children-2025",
      title: "Satkar Samarambh — Labour Children Felicitation Program 2025",
      date: "14th November 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_worker-children-felicitation-2025-1.jpg", caption: "Felicitation of Meritorious Children of Construction Workers" },
        { src: "/images/events/event_worker-children-felicitation-2025-2.jpg", caption: "Felicitation Ceremony — Address by Chief Guest" },
        { src: "/images/events/event_worker-children-felicitation-2025-4.jpg", caption: "A Meritorious Student Receives a Certificate" }
      ]
    },
    {
      id: "wbsc-2025",
      title: "Well Built Structure Competition 2025 — Awards (29th in Series)",
      date: "2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_wbsc-2025-awards-1.jpg", caption: "Award Winners — Well Built Structure Competition 2025" },
        { src: "/images/events/event_wbsc-2025-awards-2.jpg", caption: "Award Winners with Office Bearers — WBSC 2025" },
        { src: "/images/events/event_nirman-ratna-award-2025.jpg", caption: "BAI – Padma Shri B.G. Shirke Life Time Achievement Award, Nirman Ratna 2025" },
        { src: "/images/events/event_wbsc-2025-jury.jpg", caption: "Panel of Juries — WBSC 2025" },
        { src: "/images/events/event_wbsc-2025-awards-3.jpg", caption: "Guests at the WBSC 2025 Awards Function" }
      ]
    },
    {
      id: "engineers-day-2025",
      title: "Engineers' Day Celebration 2025",
      date: "September 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_engineers-day-2025-1.jpg", caption: "Engineers' Day Celebration 2025" },
        { src: "/images/events/event_engineers-day-2025-2.jpg", caption: "Felicitation of Engineers — Engineers' Day 2025" }
      ]
    },
    {
      id: "dharna-andolan-2025",
      title: "All Maharashtra Dharna Andolan by Government Contractors",
      date: "19th August 2025",
      venue: "Collector Office, Pune",
      photos: [
        { src: "/images/events/event_dharna-andolan-2025-1.jpg", caption: "All Maharashtra Dharna Andolan by Government Contractors" },
        { src: "/images/events/event_dharna-andolan-2025-2.jpg", caption: "Contractors' Demonstration over Pending Government Bills" }
      ]
    },
    {
      id: "tree-plantation-2025",
      title: "Tree Plantation Program with Pune Municipal Corporation",
      date: "9th August 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_tree-plantation-2025-1.jpg", caption: "Tree Plantation Program — BAI Pune Centre with Pune Municipal Corporation" },
        { src: "/images/events/event_tree-plantation-2025-2.jpg", caption: "Planting Saplings at the Tree Plantation Program" }
      ]
    },
    {
      id: "maharera-seminar-2025",
      title: "Seminar on Self-Redevelopment and MahaRERA 2025 Updates",
      date: "13th June 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_maharera-seminar-2025.jpg", caption: "Half Day Seminar on Real Estate Development and Self-Redevelopment Projects" },
        { src: "/images/events/event_maharera-seminar-2025-2.jpg", caption: "Panel Discussion — MahaRERA 2025 Updates for All Stakeholders" }
      ]
    },
    {
      id: "state-meeting-2025",
      title: "BAI Maharashtra 1st State Meeting 2025–26",
      date: "25th April 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_maharashtra-state-meeting-2025.jpg", caption: "BAI Maharashtra 1st State Meeting for the Year 2025–26 at Pune" },
        { src: "/images/events/event_maharashtra-state-meeting-2025-2.jpg", caption: "Delegates at the 1st State Meeting 2025–26" },
        { src: "/images/events/event_state-chairman-installation-2025.jpg", caption: "Installation of State Chairman, BAI Maharashtra State 2025–26" }
      ]
    },
    {
      id: "installation-2025-26",
      title: "Installation Ceremony of Office Bearers, BAI Pune Centre (2025–26)",
      date: "25th April 2025",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_pune-centre-installation-2025-1.jpg", caption: "Installation Ceremony of Office Bearers of BAI Pune Centre (2025–26)" },
        { src: "/images/events/event_pune-centre-installation-2025-2.jpg", caption: "Felicitation of the Chief Guest (President, BAI) at the Installation Ceremony" },
        { src: "/images/events/event_pune-centre-installation-2025-3.jpg", caption: "Online Address by Shri Girish Mahajan, Cabinet Minister, Govt. of Maharashtra" }
      ]
    },
    {
      id: "wbsc-2024",
      title: "Well Built Structure Competition 2024 — Awards (28th in Series)",
      date: "21st December 2024",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_wbsc-2024-awards-1.jpg", caption: "BAI – Shirke Well Built Structure Competition 2024" },
        { src: "/images/events/event_wbsc-2024-awards-2.jpg", caption: "Award Winners — WBSC 2024" },
        { src: "/images/events/event_nirman-ratna-award-2024.jpg", caption: "BAI – Padma Shri B.G. Shirke Life Time Achievement Award, Nirman Ratna" },
        { src: "/images/events/event_engineering-diary-2025-release.jpg", caption: "Release of BAI Pune Centre's Engineering Diary 2025" }
      ]
    },
    {
      id: "wbsc-2019",
      title: "Well Built Structure Competition 2019 — BAI-Shirke Awards (23rd in Series)",
      date: "December 2019",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_wbsc-2019-awards-1.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-2.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-3.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-4.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-5.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-7.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-8.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-9.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-10.jpg", caption: "BAI-Shirke Award Presentation — WBSC 2019" },
        { src: "/images/events/event_wbsc-2019-awards-6.jpg", caption: "Award Winners with the Jury and Office Bearers — WBSC 2019" }
      ]
    },
    {
      id: "pisarve-toilet-blocks",
      title: "Inauguration & Handover of Toilet Blocks for Girl Students at Pisarve",
      date: "",
      venue: "Pisarve",
      photos: [
        { src: "/images/events/event_pisarve-toilet-blocks-1.jpg", caption: "Inauguration of the Newly Constructed Toilet Blocks for Girl Students" },
        { src: "/images/events/event_pisarve-toilet-blocks-2.jpg", caption: "Handover Ceremony of the Toilet Blocks at Pisarve" }
      ]
    },
    {
      id: "chenab-bridge-talk",
      title: "Technical Talk on Chenab Bridge Project",
      date: "",
      venue: "Pune",
      photos: [
        { src: "/images/events/event_chenab-bridge-technical-talk.jpg", caption: "Lamp Lighting at the Technical Talk on Chenab Bridge Project" },
        { src: "/images/events/event_chenab-bridge-technical-talk-2.jpg", caption: "Speakers and Members — Technical Talk on Chenab Bridge Project" }
      ]
    },
    {
      id: "jcb-plant",
      title: "Technical Site Visit — JCB Plant at Tathawade, Pune",
      date: "",
      venue: "Tathawade, Pune",
      photos: [
        { src: "/images/events/event_jcb-plant-site-visit.jpg", caption: "Members at the JCB Design Centre, Tathawade" },
        { src: "/images/events/event_jcb-plant-training-session.jpg", caption: "Briefing Session at the JCB Plant" }
      ]
    },
    {
      id: "coca-cola-lote",
      title: "Technical Site Visit — Coca-Cola Project at Lote, Chiplun",
      date: "",
      venue: "Lote, Chiplun",
      photos: [
        { src: "/images/events/event_coca-cola-lote-site-visit.jpg", caption: "Technical Site Visit — Coca-Cola Project at Lote, Chiplun" }
      ]
    },
    {
      id: "office-meetings",
      title: "Committee Meetings at the Pune Centre Office",
      date: "",
      venue: "BAI Pune Centre Office",
      photos: [
        { src: "/images/events/event_office-meeting-1.jpg", caption: "Committee Meeting at BAI Pune Centre Office" },
        { src: "/images/events/event_office-meeting-2.jpg", caption: "Members' Discussion at Pune Centre Office" },
        { src: "/images/events/event_committee-meeting-office.jpg", caption: "Committee Meeting, Pune Centre Office" }
      ]
    }
  ],
  /* { month, items: [...] }; the calendar section stays hidden while empty. */
  calendar: []
};

export const membershipPageData = {
  title: "Membership Application",
  subtitle: "Join the All-India Association of Engineering Construction Contractors & Builders",
  headOffice: {
    name: "Builders' Association of India",
    tagline: "All-India Association of Engineering Construction Contractors & Builders",
    address: "G-1/G-20, 7th Floor, Commerce Centre, J. Dadajee Road, Tardeo, Mumbai 400034",
    phones: "022-2351 4802 · 022-2352 0507 · 022-2352 1328",
    email: "baihq.mumbai@gmail.com",
    website: "www.baionline.in",
    gstin: "27AAATB0212F1ZI",
    established: "Estd. 1941",
    network: "232 Centres across India"
  },
  // Every Centre printed on the Head Office application form letterhead.
  centres: [
    "Adilabad", "Adityapur", "Adoor", "Agra", "Agra Cantt.", "Ahmedabad",
    "Ahmedabad West", "Ahmednagar", "Aligarh", "Allahabad", "Alleppy", "Aluva",
    "Ambikapur", "Amravati", "Amaravathi", "Amaravathi Capital", "Amaravathi Rural", "Anakapalle",
    "Anantnag", "Anantapur", "Andaman & Nicobar", "Angamali", "Aurangabad", "Avadi",
    "Baghpat", "Bangalore", "Baramati", "Bareilly", "Baroda", "Beed",
    "Bharuch", "Bhopal", "Bhubaneswar", "Bilaspur", "Butibori", "Calicut",
    "Chandigarh", "Changanacherry", "Chengai", "Chennai", "Chettinadu", "Chikkmagalur",
    "Chitradurga", "Coimbatore", "Danapur", "Delhi", "Delhi East Shahadra", "Delhi North",
    "Delhi South", "Delhi West", "Dhanbad", "Dharapuram", "Dhule", "Dehradun",
    "Dindigul", "Durgapur", "Durg-Bhillai", "Erode", "Ettumanoor", "Faridabad",
    "Gautam Buddha Nagar", "Gandhinagar", "Ghaziabad", "Goa", "Greater Hyderabad", "Greater Jaipur",
    "Greater Noida", "Guntur", "Gurgaon", "Guwahati", "Haldia", "Hapur",
    "Hasan", "Hosur", "Hyderabad", "Ichalkaranji", "Idukki", "Indore",
    "Jabalpur", "Jagdalpur", "Jaipur", "Jalgaon", "Jaisalmer", "Jammu",
    "Jamshedpur", "Jangaon", "Jayankondam", "Jodhpur", "Kalpakkam", "Kallakurichi",
    "Kamareddy", "Kanchipuram", "Kanker", "Kannur", "Kanpur", "Kanpur–South",
    "Kanyakumari", "Karaikal", "Karimnagar", "Karnal", "Karnavati", "Karur",
    "Kavali", "Khammam", "Kochi", "Kodaikanal", "Kodungullar", "Kokapet",
    "Kolhapur", "Kolkata", "Kollam", "Kottayam", "Kovilpatti", "Kumbakonam",
    "Kundli", "Latur", "L.B. Nagar", "Loni", "Lucknow", "Madhuranthakam",
    "Madurai", "Mahaboobnagar", "Malappuram", "Malegaon", "Mangalore", "Mandya",
    "Mayiladuthurai", "Medachal", "Medak", "Meerut", "Meerut Cantt.", "Modinagar",
    "Mohali", "Moradabad", "Moradabad Nor. Rly.", "Mumbai", "Muvattupuzha", "Muzaffarnagar",
    "Mysore", "Nagapattnam", "Nagpur", "Nalgonda", "Namakkal", "Nanded",
    "Nandurbar", "Nasik", "Nellore", "Neyveli", "Nilgiri", "Nizamabad",
    "NTR", "Ongole", "Palakkad", "Palani", "Pandharpur", "Panipat",
    "Parbhani", "Pathanamthitta", "Patna", "Perambalur", "Perumbavoor", "Phaltan",
    "Pink City Jaipur", "Pondicherry", "Ponneri", "Poonamallee", "Por-Ramangamdi", "Pudukkottai",
    "Pune", "Raichur", "Raigad", "Raipur", "Rajahmundry", "Rajapalayam",
    "Rajkot", "Rajnandgaon", "Ramanathapuram", "Ranchi", "Ranga Reddy", "Ravulapalem",
    "Sahibabad", "Salem", "Sangamner", "Sangli", "Satara", "Secunderabad",
    "Shahda", "Shimala", "Shimoga", "Siddipet", "Silchar", "Siliguri",
    "Sitapur", "Solapur", "South-East Delhi", "Srinagar", "Surat", "Tambaram",
    "Tanuku", "Tenkasi", "Tezpur", "Thanjavur", "Theni", "Thiruporur",
    "Thiruthuraipoondi", "Thiruvalla", "Thiruvannamalai", "Thiruvarur", "Thripunithura", "Thrissur",
    "Tiruchirapalli", "Tirunelveli", "Tirupati", "Tirupur", "Tiruvallur", "Thiruvananthapuram",
    "Tuticorin", "Udumalpet", "Udupi", "Ulhasnagar", "Vaddeswaram SABCA", "Vellore",
    "Vijayawada", "Vikarabad", "Villupuram", "Visakhapatnam", "Vizag Steel City", "Wai",
    "Warangal", "Western U.P. Electrical", "Yadadri", "YSR Kadapa"
  ],
  applicationForm: {
    label: "Membership Application Form",
    file: "/documents/Membership-Application-Form-HQ-2026.pdf",
    size: "65 KB",
    pages: "2 Pages",
    note: "Issued by BAI Head Office, Mumbai. Complete it in BLOCK LETTERS, strike out whatever does not apply, and affix the rubber stamp of the company."
  },
  feeStructure: {
    note: "Subscription amounts and the GST shown are exactly as printed in the membership subscription table on the Head Office application form.",
    plans: [
      {
        id: "annual",
        name: "Annual Membership",
        total: "4,087",
        cycle: "per year",
        breakup: [
          { label: "Entrance Fee", value: "100" },
          { label: "Annual Subscription", value: "3,194" },
          { label: "Indian Construction Subscription", value: "200" },
          { label: "GST", value: "593" }
        ]
      },
      {
        id: "patron",
        name: "Patron Membership",
        total: "29,700",
        cycle: "one time",
        breakup: [
          { label: "One Time Subscription", value: "25,000" },
          { label: "Indian Construction Subscription", value: "200" },
          { label: "GST", value: "4,500" }
        ]
      },
      {
        id: "affiliated",
        name: "Affiliated Association Patron",
        total: "35,400",
        cycle: "one time",
        breakup: [
          { label: "One Time Subscription", value: "30,000" },
          { label: "GST", value: "5,400" }
        ]
      },
      {
        id: "corporate",
        name: "Corporate Membership",
        total: "3,65,800",
        cycle: "one time + annual",
        breakup: [
          { label: "One Time Subscription", value: "3,00,000" },
          { label: "Annual Subscription", value: "10,000" },
          { label: "GST", value: "55,800" }
        ]
      }
    ]
  },
  eligibility: {
    intro: "Membership is open to organisations and professionals connected with the building profession, trade and construction industry:",
    trades: [
      "Construction Contractor",
      "Real Estate Developer",
      "Engineer",
      "Consultant",
      "Architect",
      "Interior Decorator",
      "Engineering Colleges / Polytechnics",
      "Service Provider",
      "Manufacturer, dealer or hirer in construction material and equipment",
      "Repairs & Rehabilitation Contractor"
    ]
  },
  formSections: {
    intro: "The printed form runs to two pages. These are the parts you will need to complete, in the order they appear on the document.",
    parts: [
      {
        title: "Membership Type",
        fields: [
          "Category applied for — Annual, Patron, Corporate or Affiliated Association",
          "Whether the membership is to be held in your own name or in the company name"
        ]
      },
      {
        title: "Applicant Details",
        fields: [
          "Full name of the applicant or member company",
          "Complete postal address with PIN code — the form marks this 'Very Important'",
          "Telephone and fax numbers",
          "E-mail address and website"
        ]
      },
      {
        title: "Statutory Registrations",
        fields: [
          "Company Registration Number with MSME",
          "PAN Number",
          "GST Number",
          "Contractor License Number",
          "Company Identification Number (CIN)"
        ]
      },
      {
        title: "Constitution & Representation",
        fields: [
          "Partnership firm — names of the major working partners",
          "Corporate company — names of the Managing and Executive Directors",
          "Representatives authorised to attend and vote at meetings, stating for each whether Director, Partner or Executive Attorney, with residence address and telephone, fax and mobile numbers",
          "Manager authorised by Power of Attorney"
        ]
      },
      {
        title: "Business Profile",
        fields: [
          "The field your company specialises in",
          "Your company's registration with various works authorities, with details"
        ]
      },
      {
        title: "Endorsement & Execution",
        fields: [
          "Proposed By — an existing member of the Association",
          "Seconded By — an existing member of the Association",
          "Date and place of application",
          "Signed for and on behalf of the firm, with the rubber stamp of the company",
          "To be signed by the Proprietor, Partner, Director or Attorney"
        ]
      }
    ]
  },
  declaration: {
    title: "Declaration & Undertaking",
    intro: "The completed form is addressed to the Executive Secretary at Head Office and carries the following undertaking:",
    points: [
      "A request to enrol the applicant as an Annual, Patron, Corporate or Affiliated Association member of Builders' Association of India.",
      "Confirmation that the applicant is connected with the building profession, trade and construction industry in the categories ticked on the form.",
      "Confirmation that the applicant has read the Rules and Regulations of the Association and agrees to abide by them — the Rules are supplied by Head Office on request.",
      "Details of the amount remitted towards the new membership subscription, with the Demand Draft or NEFT/RTGS reference number and date."
    ]
  },
  payment: {
    title: "Payment & Submission",
    beneficiary: "BUILDERS' ASSOCIATION OF INDIA",
    modes: "Demand Draft / NEFT / RTGS drawn in favour of the beneficiary name above.",
    addressee: "The Executive Secretary, Builders' Association of India",
    address: "G-1/G-20, 7th Floor, Commerce Centre, J. Dadajee Road, Tardeo, Mumbai 400034",
    gstin: "27AAATB0212F1ZI",
    notes: [
      "Enclose the Demand Draft or the NEFT/RTGS reference number and date on the form itself.",
      "The Rules and Regulations of the Association are provided by Head Office on request."
    ]
  },
  importantNotes: [
    "The membership application should be recommended by a Centre — Pune applicants may route it through BAI Pune Centre.",
    "Admission is subject to the approval of the Managing Committee of Builders' Association of India.",
    "Applicants are further certified in their respective category. Such certification is available on payment of certain charges, details of which can be had on request."
  ],
  howToJoin: [
    { title: "Download the Form", desc: "Download the official two-page application form issued by Head Office." },
    { title: "Complete All Parts", desc: "Fill every part in BLOCK LETTERS and strike out whatever does not apply." },
    { title: "Proposer & Seconder", desc: "Have the application proposed and seconded by existing BAI members." },
    { title: "Pay Subscription", desc: "Remit the subscription for your category and note the reference on the form." },
    { title: "Submit Through a Centre", desc: "Route the form via BAI Pune Centre, which recommends it to Head Office." },
    { title: "Approval & Membership No.", desc: "Head Office records the receipt, the Managing Committee accepts the application at its meeting, and your membership number is allotted." }
  ],
};

/*
  BAI Services page.

  RERA Services is the first service desk published here. The write-ups below
  describe the desk in general terms — the final list of services, charges and
  downloadable forms are to be supplied by BAI Pune Centre and simply replace
  the entries in `services` / `documents`.
*/
export const baiServicesData = {
  tag: "Member Services",
  title: "BAI Services",
  subtitle: "Professional support desks run by BAI Pune Centre for its member contractors and builders",
  hero: {
    image: "/images/events/event_maharera-seminar-2025.jpg",
    alt: "The Pune Centre's half-day seminar on real estate development and self-redevelopment under MahaRERA"
  },
  rera: {
    id: "rera",
    title: "RERA Services",
    lead: "Registration, compliance and advisory support under the Real Estate (Regulation and Development) Act, 2016 and the MahaRERA rules.",
    intro:
      "BAI Pune Centre assists member builders and promoters through every stage of their obligations under RERA — from registering a new project with MahaRERA to keeping quarterly disclosures current through the project lifecycle. The desk is run with practising legal and technical consultants, and members are given priority scheduling and concessional professional charges.",
    services: [
      {
        icon: "register",
        title: "Project Registration",
        description:
          "Preparation and filing of a new real estate project registration with MahaRERA, including scrutiny of title, sanctioned plans, encumbrance details and the declaration in Form B."
      },
      {
        icon: "agent",
        title: "Agent Registration & Renewal",
        description:
          "Registration of real estate agents, renewal of expiring registrations and updating of agent particulars on the MahaRERA portal."
      },
      {
        icon: "compliance",
        title: "Quarterly Progress Compliance",
        description:
          "Periodic updating of project progress, building and unit status, approvals received and photographs, so that the registered project stays compliant through its declared completion period."
      },
      {
        icon: "certificate",
        title: "Form 1, 2 & 3 Certification",
        description:
          "Coordination of the architect's, engineer's and chartered accountant's certificates required for withdrawal from the designated project account."
      },
      {
        icon: "extension",
        title: "Extension & Correction Applications",
        description:
          "Applications for extension of a project's registration validity and for correction or amendment of details already recorded with the Authority."
      },
      {
        icon: "legal",
        title: "Complaints & Conciliation",
        description:
          "Guidance on complaints filed before the Authority and representation support at the conciliation forum, including drafting of replies and supporting documentation."
      },
      {
        icon: "advisory",
        title: "Advisory & Documentation",
        description:
          "Vetting of agreements for sale, allotment letters and advertising material for RERA conformity, along with opinions on specific compliance questions raised by members."
      },
      {
        icon: "training",
        title: "Awareness Sessions",
        description:
          "Workshops and briefing sessions at the Centre on amendments, circulars and orders issued by MahaRERA that affect members' ongoing projects."
      }
    ],
    // Downloadable forms / circulars — populated once BAI supplies the files.
    documents: [],
    contact: {
      note: "For charges, appointment slots or any specific query on the RERA desk, write to the Centre office with your membership number and project details.",
      email: "baipune1@gmail.com",
      tel: "(020) 2605 9255",
      address:
        "BAI's Padma Shri B G Shirke Activity Centre, Office No. 23, 24 & 25 \"Sangam\" Ph II, Near Sangam Bridge, Pune - 411001"
    }
  }
};
