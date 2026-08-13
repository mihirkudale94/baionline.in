const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || (
  typeof window !== "undefined" && window.location.origin.includes("localhost:5173")
    ? "http://localhost:8000/api"
    : "/api"
);

// Fetch with a hard timeout so an unreachable backend fails fast and the
// UI falls back to bundled data instead of hanging on a spinner.
const FETCH_TIMEOUT_MS = 5000;
function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

/* Hero carousel — Pune Centre's own photographs, shown clean with no text
   overlay. `alt` is never displayed; it is read by screen readers and search
   engines only. To change the carousel, swap the image paths below. */
export const heroSlides = [
  {
    id: 1,
    image: "/images/events/event_builders-day-2025.jpg",
    alt: "Builders' Day Celebration 2025 at BAI Pune Centre"
  },
  {
    id: 2,
    image: "/images/events/event_worker-children-felicitation-2025-1.jpg",
    alt: "Felicitation of meritorious children of construction workers"
  },
  {
    id: 3,
    image: "/images/events/event_bridge-site-visit-1.jpg",
    alt: "Technical site visit to a cable-stayed bridge construction project"
  },
  {
    id: 4,
    image: "/images/events/event_pmc-courtesy-visit-1.jpg",
    alt: "Courtesy visit to the Pune Municipal Corporation"
  },
  {
    id: 5,
    image: "/images/events/event_industrial-facility-visit-1.jpg",
    alt: "Members on an industrial facility visit"
  },
  {
    id: 6,
    image: "/images/events/event_central-bank-outreach-campaign.jpg",
    alt: "Central Bank of India mega retail credit outreach campaign"
  }
];

export const stats = [
  { label: "Founded", count: "1941" },
  { label: "Office Bearers", count: "5" },
  { label: "Standing Committees", count: "11" },
  { label: "WBSC Editions", count: "30" }
];

export const leadership = {
  president: {
    name: "Ajay R. Gujar",
    title: "Chairman BAI Pune",
    image: "/images/Shri_Ajay_Gujar.jpg",
    bio: "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services, 'Poona', now known as 'Pune', who suggested that builders working under his command, form a body for finding solutions to various problems. He went further and made available a piece of land inside the premises of Southern Command Headquarters in Pune, on which an office was constructed and aptly named 'Jackson Hut', which stands even today as a monument in BAI's name.",
    bio_extended: "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 25,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members. Throughout its more than seven decades of existence, BAI has had its ups and downs, trials and tribulations, moments of strengths and weakness, moments of glory and disappointment. But, its umbrella has protected and furthered the cause of the Indian construction industry and its constituents in many ways."
  },
  imm_past_president: {
    name: "Rajaram Hajare",
    title: "Vice Chairman BAI Pune",
    image: "/images/Shri_Rajaram_Hajare.jpg",
    bio: "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services.",
    bio_extended: "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 20,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members."
  },
  hon_secretary: {
    name: "Dr. Mahesh Rathi",
    title: "Secretary BAI Pune",
    image: "/images/Shri_Mahesh_Rathi.jpg",
    bio: "Secretary of Builders' Association of India Pune."
  },
  hon_joint_secretary: {
    name: "Sanjay Apte",
    title: "Jt Secretary BAI Pune",
    image: "/images/Shri_Sanjay_Apte.jpg",
    bio: "Jt. Secretary of Builders' Association of India Pune."
  },
  hon_treasurer: {
    name: "Sushil N. Agarwal",
    title: "Treasurer BAI Pune",
    image: "/images/Shri_Sushil_Agarwal.jpg",
    bio: "Treasurer of Builders' Association of India Pune."
  },
  /* Listed alongside the office bearers in the WBSC 2026 booklet (p5).
     No photograph supplied yet — the Team card falls back to an initials
     avatar when `image` is empty. */
  wbsc_chairman: {
    name: "Sunil Mate",
    title: "Chairman - WBSC 2026",
    image: "",
    bio: "Chairman of the Well Built Structure Competition 2026, Builders' Association of India Pune Centre."
  }
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
   OUR SPONSORS — drives the scrolling section on the home page.
   To add a sponsor: drop the logo in /public/images/sponsors/ and add a
   row below. `logo` may be omitted — the chip then shows the name alone.

   !! DEMO DATA !! The eight entries below are FICTIONAL firms with
   generated placeholder logos, used only to show how the section looks
   when populated. They are NOT real sponsors. Replace this whole array
   with the real sponsor list before the site goes public, and delete
   /public/images/sponsors/*.svg.
   ------------------------------------------------------------------ */
export const sponsors = [
  { name: "Sahyadri Cement Works", logo: "/images/sponsors/sahyadri-cement.svg", url: "" },
  { name: "Deccan Steel & Alloys", logo: "/images/sponsors/deccan-steel.svg", url: "" },
  { name: "Mutha Infra Equipment", logo: "/images/sponsors/mutha-infra.svg", url: "" },
  { name: "Shivneri Ready-Mix", logo: "/images/sponsors/shivneri-rmc.svg", url: "" },
  { name: "Pashan Build Solutions", logo: "/images/sponsors/pashan-build.svg", url: "" },
  { name: "Godavari Waterproofing", logo: "/images/sponsors/godavari-waterproof.svg", url: "" },
  { name: "Kesari Elevators", logo: "/images/sponsors/kesari-elevators.svg", url: "" },
  { name: "Prabhat Formwork Systems", logo: "/images/sponsors/prabhat-formwork.svg", url: "" }
];

/* The five regular activities of BAI Pune Centre. Drives both the
   "BAI Activities" dropdown and the /activities page sections. */
export const activities = [
  {
    slug: "technical-seminars",
    title: "Technical Seminars",
    summary:
      "Regular seminars on construction technology, sustainable practices, statutory compliance and industry standards, led by domain experts and senior practitioners.",
    image: "/images/events/event_committee-meeting-office.jpg"
  },
  {
    slug: "site-visits",
    title: "Industrial & Site Visits",
    summary:
      "Organised visits to major infrastructure projects and research institutions across Pune, giving members first-hand exposure to construction methods and site practice.",
    image: "/images/events/event_bridge-site-visit-1.jpg"
  },
  {
    slug: "networking-meets",
    title: "Networking Meets",
    summary:
      "Member meets that connect builders, contractors, consultants and developers across the Pune Centre and BAI's nationwide network of centres.",
    image: "/images/events/event_office-meeting-1.jpg"
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
    image: "/images/events/event_central-bank-outreach-campaign.jpg"
  }
];

export const navLinks = [
  {
    label: "About",
    path: "/about",
    children: [
      { label: "About BAI", path: "/about" },
      { label: "Past Office Bearers", path: "/past-presidents" }
    ]
  },
  {
    label: "Team",
    path: "/team",
    children: [
      { label: "Office Bearers", path: "/team" },
      { label: "Executive Committee", path: "/committees#executive" }
    ]
  },
  {
    label: "BAI Activities",
    path: "/activities",
    children: activities.map((a) => ({ label: a.title, path: `/activities#${a.slug}` })),
  },
  { label: "Social Activities", path: "/social-activities" },
  { label: "Events", path: "/events" },
  { label: "WBSC 2026", path: "/wbsc-awards", highlight: true },
  { label: "Membership", path: "/membership" },
  {
    label: "Resources",
    path: "#",
    children: [
      { label: "Publications", path: "/publications" },
      { label: "BAI Services", path: "/services" },
      { label: "Tenders", path: "/tenders" },
      { label: "BAI in Media", path: "/media" },
      { label: "Sponsors Inquiry", path: "/sponsors-inquiry" }
    ]
  },
  { label: "Contact Us", path: "/contact" }
];

export const footerData = {
  logo: "/images/logo-white-02.png",
  office: {
    title: "Pune Centre Office:",
    address: "BAI's Padma Shri B G Shirke Activity Centre, Office No. 23, 24 & 25 \"Sangam\" Ph II, Near Sangam Bridge, Pune - 411001",
    tel: "(020) 2605 9255",
    phone: "(020) 2605 7441",
    email: "baipune1@gmail.com"
  },
  quick_links: [
    { label: "About BAI", path: "/about" },
    { label: "Committees", path: "/committees" },
    { label: "Events", path: "/events" },
    { label: "WBSC Awards", path: "/wbsc-awards" },
    { label: "Membership", path: "/membership" },
    { label: "Social Activities", path: "/social-activities" },
    { label: "Gallery", path: "/media" },
    { label: "Contact", path: "/contact" }
  ],
  notifications: [
    { label: "Judgements", path: "/judgements" },
    { label: "Notifications", path: "/notifications" },
    { label: "Circular", path: "/circular" }
  ],
  useful_links: [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Disclaimer", path: "/disclaimer" }
  ],
  social: [
    { platform: "facebook", url: "https://www.facebook.com/BuildersAssociationOfIndia/" },
    { platform: "instagram", url: "https://www.instagram.com/p/B60c1Ljnk90/" },
    { platform: "youtube", url: "https://www.youtube.com/@buildersassociationofindia73" },
    { platform: "linkedin", url: "https://in.linkedin.com/company/builders-association-of-india" }
  ],
  copyright: "Copyright \u00a9 2026 BAI - Builders' Association of India, Pune Centre. All Rights Reserved."
};

export const aboutContent = {
  title: "About BAI Pune Centre",
  subtitle: "Builders' Association of India \u2014 Pune Centre",
  founded: "1941",
  paragraphs: [
    "Since its inception, the Builders' Association of India (BAI) Pune Centre has been one of India's most active construction industry associations, representing builders, contractors, consultants, engineers, developers, manufacturers and allied professionals.",
    "For decades, BAI Pune has served as a bridge between Government authorities and the construction fraternity while promoting quality construction, professional ethics, technical excellence and sustainable development.",
    "BAI itself was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services in 'Poona', now known as 'Pune', who suggested that builders working under his command form a body to find solutions to various problems. He made available a piece of land inside the premises of Southern Command Headquarters in Pune, on which an office was constructed and aptly named 'Jackson Hut', which stands even today as a monument in BAI's name \u2014 making Pune the very birthplace of the Association."
  ],
  who_we_are: "The Builders' Association of India (BAI) is one of India's oldest and largest apex organizations of engineering construction contractors, builders, developers and infrastructure professionals. The Pune Centre actively works towards Industry Development, Knowledge Sharing, Technical Seminars, Skill Development, Government Representation, Infrastructure Advocacy, Networking Opportunities, Student Development and the Construction Excellence Award.",
  mission: [
    "Promote excellence in construction.",
    "Encourage adoption of latest technologies.",
    "Develop skilled professionals.",
    "Strengthen collaboration between industry and academia.",
    "Represent industry concerns before Government authorities.",
    "Encourage safe, sustainable and innovative construction practices."
  ],
  what_we_do: [
    { title: "Technical Activities", items: ["Seminars", "Workshops", "Technical Conferences", "Site Visits", "Knowledge Sessions"] },
    { title: "Industry Representation", items: ["Government Liaison", "Policy Discussions", "Industry Recommendations", "Statutory Representation"] },
    { title: "Member Services", items: ["Networking", "Business Opportunities", "Knowledge Resources", "Training Programs"] },
    { title: "Student Initiatives", items: ["Student Internship Programme (SIP)", "Industry Interaction", "Career Guidance"] },
    { title: "Awards & Recognition", items: ["Well Built Structure Competition (WBSC)", "Recognition of Construction Excellence"] }
  ],
  why_join: [
    "Access to India's largest construction network",
    "Industry recognition",
    "Government interaction",
    "Business networking",
    "Technical knowledge",
    "Professional growth",
    "Leadership opportunities"
  ],
  achievements: [
    "BAI has been instrumental for incorporation of Price Variation Clause in contract documents of various works authorities.",
    "BAI is propagating adoption of a 'unified standard equitable contract document', based on FIDIC conditions by all works authorities.",
    "BAI was instrumental in starting National Institute of Construction Management and Research (NICMAR), which has established campuses at Pune, Delhi and Hyderabad.",
    "BAI started Overseas Construction Council of India (OCCI) now known as Project Export Promotion Council of India (PEPCI), which initiated manpower export to Gulf counties.",
    "In the matter of Sales Tax on Works Contracts, consequent to 46th Amendment to Constitution, BAI filed a Writ Petition and the Supreme Court correctly explained the powers of State Governments.",
    "BAI filed number of writs at various High Courts in the country on issues like VAT, Entry Tax, Service Tax, Sand Dredging, Labour Welfare Cess etc.",
    "BAI galvanized builders and contractors into raising their voice, when cement and steel prices went through the sky, arising out of cartelization by manufacturers.",
    "BAI filed petition before the Competition Commission of India on cement cartelisation. The Hon’ble Competition Commission penalized manufacturers Rs. 6,307 Crore (the highest penalty in Indian judicial history).",
    "Through its monthly journal, 'Indian Construction', in its 66th year of publication, BAI provides latest statistical information, legal notes, and technological expert opinions.",
    "BAI is one of the promoters of Construction Skill Development Council of India (CSDCI) formed under the National Skill Development Corporation.",
    "BAI obtained 'Stay' order restraining the E.S.I. Department taking action against contractors on coverage of Employees’ State Insurance Scheme to the construction site workers."
  ],
  vision_statement: "To create a progressive, technically advanced and ethically driven construction industry that contributes to nation building through quality infrastructure.",
  vision: [
    "To promote and foster feelings of brotherhood, unity, co-operation, and mutual trust, and to eliminate unhealthy competition amongst the contractors fraternity.",
    "To build public confidence in the construction industry by advocating ethics in the business through transparency and accountability.",
    "To establish healthy and cordial relationship between the client, the contractor and the end-users, so that all construction projects are completed without any time or cost over-runs.",
    "To interact with Government bodies like State PWDs and the CPWD to modernize specifications of works towards ensuring suitable work ethics.",
    "To achieve highest standards of efficiency and quality by adopting methodology derived from both Indian and International Standards.",
    "To ensure that contractors adopt methods which are environment-friendly like use of pre-engineered and pre-manufactured products.",
    "To regulate safety procedures and issue guidelines for minimizing loss of life or property at construction sites and enhance welfare of workers."
  ],
  constitution_url: "https://www.baionline.in/public/frontend/pdf/BAI-RULES-AND-REGULATIONS-NEW-28th-November-2022.pdf",
  brochure_url: "https://www.baionline.in/public/frontend/pdf/BAI-Brochure.pdf"
};

export const contactData = {
  title: "Contact Us",
  office: {
    name: "BAI - Builders' Association of India, Pune Centre",
    address: "BAI's Padma Shri B G Shirke Activity Centre, Office No. 23, 24 & 25 \"Sangam\" Ph II, Near Sangam Bridge, Pune - 411001",
    tel: ["(020) 2605 9255", "(020) 2605 7441"],
    phone: "(020) 2605 7441",
    email: "baipune1@gmail.com"
  }
};

export const announcements = [
  {
    title: 'BAI takes steps to file Writ Petitions for inclusion of Arbitration Clause in contracts',
    pdf: 'https://www.baionline.in/storage/announcement/m7Gzw8AKaqSDf3cScwZ61sWyopX2JIk54pceDeBl61hRiqSmzAsyq91sMcxO.pdf',
    desc: 'Those members who want a copy of Enclosures, please write to BAI HQ on our email: baihq.mumbai@gmail.com, raju_john_in@yahoo.co.uk and the same will be sent by email.'
  },
  {
    title: 'BAI’s 84th Annual Report (2024–2025)',
    pdf: 'https://www.baionline.in/storage/announcement/250726WithoutAuditReport84thAnnualReportBAI2024202525Jul2025.pdf',
    desc: 'Those members who want a copy of Audited Accounts, please write to BAI HQ on our email: baihq.mumbai@gmail.com, raju_john_in@yahoo.co.uk and the same will be sent by email.',
    image: '/images/84thAnnualReportBAI.webp'
  }
];

export const events = [
  {
    title: "Builders' Day Celebration 2025 — BAI Pune Centre",
    date: "December 2025",
    venue: "Pune",
    image: "/images/events/event_builders-day-2025.jpg"
  },
  {
    title: "Satkar Samarambh — Felicitation of Meritorious Children of Construction Workers",
    date: "14th November 2025",
    venue: "Pune",
    image: "/images/events/event_worker-children-felicitation-2025-1.jpg"
  },
  {
    title: "BAI NATIONAL Managing Committee & General Council Meeting 2025-26",
    date: "27th & 28th February 2026",
    venue: "Padmaja Palam Groves Resorts, Near Hyderabad Airport, Hyderabad",
    image: "/images/event_mcgc_meet.webp"
  },
  {
    title: "SPONSORSHIP APPEAL for BAI 4th MC/GC Meeting 2025-26",
    date: "27th & 28th February 2026",
    venue: "Padmaja Palam Groves Resorts, Near Hyderabad Airport, Hyderabad",
    image: "/images/event_sponsorship.webp"
  },
  {
    title: "BAI SPORTS LEAGUE 2026",
    date: "Saturday 21st February 2026",
    venue: "United Sports Center, Kakkanad, Kochi",
    image: "/images/event_sports_league.webp"
  },
  {
    title: "BAI's 32nd All India Builders Convention",
    date: "7th, 8th & 9th January 2026",
    venue: "Dr. Shyama Prasad Mukherjee Indoor Stadium, Goa, India",
    image: "/images/event_goa_convention.webp"
  },
  {
    title: "2nd Mumbai Redevelopment Summit 2025",
    date: "17th December 2025",
    venue: "Courtyard by Marriott, Mumbai, India",
    image: "/images/event_redev_summit.webp"
  },
  {
    title: "3rd MC-GC Meeting",
    date: "20th - 21st November 2025",
    venue: "CIAL Convention Centre, Kochi",
    image: "/images/event_kochi_meeting.jpg"
  }
];

export const newsTicker = [
  { text: "Letter to Shri Narendra Modi,PM of India regarding abnormal Cement and Steel Price Increase", link: "https://www.baionline.in/public/frontend/pdf/Shri-Narendra-Modi-ji-Hon-PM-of-India-Letter.pdf" },
  { text: "Letter to Smt Nirmala Sitharaman Ji, FM of India regarding MSME 45-days clause", link: "https://www.baionline.in/public/frontend/pdf/MSME-Smt-Nirmala-Sitharaman-Ji-MSME-45-days-clause-Letter.pdf" },
  { text: "BAI Representation Abnormal Increase in Construction Materials", link: "https://www.baionline.in/public/frontend/pdf/bai-representation-abnormal-increase-in-construction-materials--20.04.2022.pdf" },
  { text: "Delhi Press Clippings - Union Ministry Communique", link: "https://www.baionline.in/public/frontend/pdf/delhi-press-clippings.pdf" },
  { text: "Maharashtra Press Clippings - Union Ministry Communique", link: "https://www.baionline.in/public/frontend/pdf/maharashtra-press-clippings.pdf" },
  { text: "Ahmedabad Press Clippings - Union Ministry Communique", link: "https://www.baionline.in/public/frontend/pdf/ahmedabad-press-clippings.pdf" }
];

export const indianConstruction = {
  title: "Indian Construction",
  subtitle: "Monthly Bulletin of Builders Association of India",
  desc: "‘INDIAN CONSTRUCTION’ is the monthly bulletin of BUILDERS’ ASSOCIATION OF INDIA (BAI) established in 1941. It is circulated to all BAI members, senior officials of Central and State Government departments, World Bank, ADB, and global IFAWPCA chapters.",
  cover_image: "/images/ICJ_APRIL_2026.webp",
  pdf_view_link: "https://online.fliphtml5.com/huzbb/IC-April-2026/",
  links: {
    advertise: "https://www.baionline.in/indianconstruction",
    archives: "https://www.baionline.in/archives",
    subscribe: "https://www.baionline.in/public/frontend/pdf/Indian_Construction_Subscription_Form_2022-23.pdf"
  }
};

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
    return await res.json();
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



export const committeesData = [
  { name: "Housing Committee", chairman: "", desc: "Addresses housing policy, affordable housing initiatives and residential project matters for members.", members: [] },
  { name: "Membership Committee", chairman: "", desc: "Manages new member enrolment, renewals and membership category administration.", members: [] },
  { name: "Youth Wing", chairman: "", desc: "Engages young professionals and next-generation builders through mentorship and networking.", members: [] },
  { name: "Seminar / Site Visit Committee", chairman: "", desc: "Organizes technical seminars, workshops and industrial site visits for members.", members: [] },
  { name: "Office Renovation Committee", chairman: "", desc: "Oversees upkeep and renovation of the B.G. Shirke Activity Centre premises.", members: [] },
  { name: "WBSC Committee", chairman: "", desc: "Runs the Well Built Structure Competition — entries, jury coordination and awards ceremony.", members: [] },
  { name: "Grievance Redressal Committee", chairman: "", desc: "Handles member grievances and disputes requiring committee-level resolution.", members: [] },
  { name: "Diary Committee", chairman: "", desc: "Coordinates the annual BAI Pune Centre diary/publication and its content.", members: [] },
  { name: "Media Committee", chairman: "", desc: "Manages press relations, social media and public communications for the Centre.", members: [] },
  { name: "SIP Committee", chairman: "", desc: "Runs the Student Internship Programme connecting students with member firms.", members: [] },
  { name: "Internal Audit Committee", chairman: "", desc: "Reviews the Centre's internal accounts and financial controls.", members: [] }
];

export const executiveCommittee = {
  chairman: { role: "Chairman", name: "" },
  vice_chairman: { role: "Vice Chairman", name: "Rajaram B. Hajare" },
  hon_secretary: { role: "Secretary", name: "Dr. Mahesh Rathi" },
  hon_joint_secretary: { role: "Jt. Secretary", name: "Sanjay Apte" },
  hon_treasurer: { role: "Treasurer", name: "Sushil N. Agarwal" },
  members: [
    
  ]
};

export const pastPresidentsData = [
  { year: "2025-2026", name: "Dr. Dharmesh Awasthi" },
  { year: "2024-2025", name: "Shri Niwas Reddy" },
  { year: "2023-2024", name: "Shri R. S. Raghavan" },
  { year: "2022-2023", name: "Shri Suresh K. Patel" },
  { year: "2021-2022", name: "Shri Muzaffar Ali" },
  { year: "2020-2021", name: "Shri A. N. Prasad" },
  { year: "2019-2020", name: "Shri K. S. R. Murthy" },
  { year: "2018-2019", name: "Shri S. S. Dutta" },
  { year: "2017-2018", name: "Shri H. N. Vijaya Raghava Reddy" },
  { year: "2016-2017", name: "Shri B. Seenaiah" },
  { year: "2015-2016", name: "Shri Lal Chand" },
  { year: "2014-2015", name: "Shri J. P. Nayak" },
  { year: "2013-2014", name: "Shri M. R. Chandrasekhar" },
  { year: "2012-2013", name: "Shri K. S. Kumar" },
  { year: "2011-2012", name: "Shri A. P. Sinha" },
  { year: "2010-2011", name: "Shri G. K. Jain" },
  { year: "2009-2010", name: "Shri K. R. Shenoy" },
  { year: "2008-2009", "name": "Shri S. L. Patel" },
  { year: "2007-2008", "name": "Shri H. S. Kohli" },
  { year: "2006-2007", "name": "Shri R. K. Bahl" },
  { year: "2005-2006", "name": "Shri S. C. Gupta" },
  { year: "2004-2005", "name": "Shri A. K. Sharma" },
  { year: "2003-2004", "name": "Shri M. P. Jain" },
  { year: "2002-2003", "name": "Shri D. R. Sen" },
  { year: "2001-2002", "name": "Shri N. K. Roy" },
  { year: "2000-2001", "name": "Shri P. K. Singh" },
  { year: "1999-2000", "name": "Shri B. G. Shirke" },
  { year: "1998-1999", "name": "Shri V. M. Patel" },
  { year: "1997-1998", "name": "Shri K. L. Rao" },
  { year: "1996-1997", "name": "Shri A. S. Chinnaswamy Raju" },
  { year: "1995-1996", "name": "Shri H. S. Pasricha" },
  { year: "1994-1995", "name": "Shri B. R. Kohli" },
  { year: "1993-1994", "name": "Shri S. S. Bhalerao" },
  { year: "1992-1993", "name": "Shri M. S. Reddy" },
  { year: "1991-1992", "name": "Shri G. S. Rao" },
  { year: "1990-1991", "name": "Shri R. L. Gupta" },
  { year: "1989-1990", "name": "Shri S. K. Mukherjee" },
  { year: "1988-1989", "name": "Shri P. D. Patel" },
  { year: "1987-1988", "name": "Shri K. L. Sahgal" },
  { year: "1986-1987", "name": "Shri J. R. Dutt" },
  { year: "1985-1986", "name": "Shri H. S. Bakshi" },
  { year: "1984-1985", "name": "Shri R. L. Patel" },
  { year: "1983-1984", "name": "Shri S. S. Sandhu" },
  { year: "1982-1983", "name": "Shri B. P. Maurya" },
  { year: "1981-1982", "name": "Shri S. P. Gupta" },
  { year: "1980-1981", "name": "Shri K. K. Madhok" },
  { year: "1970-1980", "name": "Shri L. A. N. Khokha" },
  { year: "1960-1970", "name": "Shri S. Sant Singh" },
  { year: "1955-1960", "name": "Shri T. C. Goyala" },
  { year: "1950-1955", "name": "Shri B. R. Kohli" },
  { year: "1948-1950", "name": "Shri Rajesh Bahl" },
  { year: "1946-1948", "name": "Shri S. S. Takra" },
  { year: "1944-1945", "name": "Shri Ranade" },
  { year: "1943-1944", "name": "Shri E. M. Billmoria" },
  { year: "1942-1943", "name": "Shri Motichand G. Shah" },
  { year: "1941-1942", "name": "Shri M. P. Shah" }
];

// Mirrors PUNE_OFFICE_BEARERS in backend/data/content.py — transcribed from the
// office bearer display board at the Centre. Centre-level roles are still being
// compiled from the Centre's archives and render an empty state until filled.
// Mirrors PUNE_OFFICE_BEARERS / PLATINUM_JUBILEE_2015 in backend/data/content.py —
// transcribed from the office bearer display boards at the Centre. Used as the
// offline fallback when the API is unreachable.
// Mirrors PUNE_OFFICE_BEARERS / PLATINUM_JUBILEE_2015 in backend/data/content.py —
// transcribed from the office bearer display boards at the Centre. Used as the
// offline fallback when the API is unreachable.
export const puneOfficeBearersData = {
  "note": "Transcribed from the office bearer display boards at BAI Pune Centre. Chairman and Hon. Secretary records begin in 1959 — earlier years are not listed on the boards.",
  "roles": [
    {
      "id": "hq_president",
      "label": "HQ President",
      "members": [
        {
          "year": "1991-1992",
          "name": "Lalit Sangtani"
        },
        {
          "year": "1978-1980",
          "name": "Harbans Lal Aurora"
        }
      ]
    },
    {
      "id": "hq_vice_president",
      "label": "HQ Vice President (West Zone)",
      "members": [
        {
          "year": "2016-2017",
          "name": "Dr. Rajeev B. Krishnani"
        },
        {
          "year": "2012-2013",
          "name": "Ranjeet More"
        },
        {
          "year": "2007-2008",
          "name": "Kishan P. Baney"
        },
        {
          "year": "1999-2000",
          "name": "Amar Mulchandani"
        },
        {
          "year": "1996-1997",
          "name": "Madhavrao Jog"
        },
        {
          "year": "1990-1991",
          "name": "D. S. Vajram"
        }
      ]
    },
    {
      "id": "state_chairman",
      "label": "State Chairman (Maharashtra)",
      "members": [
        {
          "year": "2025-2026",
          "name": "Jagannath S. Jadhav"
        },
        {
          "year": "2014-2015",
          "name": "Neelkanth S. Joshi"
        },
        {
          "year": "2005-2006",
          "name": "Jassu Panjwani"
        }
      ]
    },
    {
      "id": "chairman",
      "label": "Centre Chairman",
      "members": [
        {
          "year": "Apr 2026 – Mar 2027",
          "name": "Ajay R. Gujar"
        },
        {
          "year": "Apr 2025 – Mar 2026",
          "name": "Ajay R. Gujar"
        },
        {
          "year": "Apr 2024 – Mar 2025",
          "name": "Sunil Mate"
        },
        {
          "year": "Apr 2023 – Mar 2024",
          "name": "D. S. Chaudhari"
        },
        {
          "year": "Apr 2022 – Mar 2023",
          "name": "H. S. Anand"
        },
        {
          "year": "Apr 2021 – Mar 2022",
          "name": "Ashok Atkekar"
        },
        {
          "year": "Apr 2020 – Mar 2021",
          "name": "Jai Pinjani"
        },
        {
          "year": "Apr 2019 – Mar 2020",
          "name": "Manoj Deshmukh"
        },
        {
          "year": "Apr 2018 – Mar 2019",
          "name": "Pradeep Garge"
        },
        {
          "year": "Apr 2017 – Mar 2018",
          "name": "Jagannath S. Jadhav"
        },
        {
          "year": "Apr 2016 – Mar 2017",
          "name": "Siddharth Shah"
        },
        {
          "year": "Apr 2015 – Mar 2016",
          "name": "Mahesh Mirani"
        },
        {
          "year": "Apr 2014 – Mar 2015",
          "name": "R. B. Suryavanshi"
        },
        {
          "year": "Apr 2013 – Mar 2014",
          "name": "C. S. Parhar"
        },
        {
          "year": "Apr 2012 – Mar 2013",
          "name": "Jaideep Raje"
        },
        {
          "year": "Apr 2011 – Mar 2012",
          "name": "Subhash Deshpande"
        },
        {
          "year": "Apr 2009 – Mar 2011",
          "name": "Ranjeet More"
        },
        {
          "year": "Apr 2008 – Mar 2009",
          "name": "Neelkanth S. Joshi"
        },
        {
          "year": "Apr 2007 – Mar 2008",
          "name": "Dr. Rajeev B. Krishnani"
        },
        {
          "year": "Apr 2006 – Mar 2007",
          "name": "Sanjay Vaichal"
        },
        {
          "year": "Apr 2005 – Mar 2006",
          "name": "S. G. Moorjani"
        },
        {
          "year": "Apr 2003 – Mar 2005",
          "name": "Vishwas Lokare"
        },
        {
          "year": "Jul 2002 – Mar 2003",
          "name": "Naren Kothari"
        },
        {
          "year": "Apr 2001 – Jul 2002",
          "name": "Manikram Halbe"
        },
        {
          "year": "Apr 1999 – Mar 2001",
          "name": "D. S. Shirole"
        },
        {
          "year": "Apr 1998 – Mar 1999",
          "name": "S. I. Chunkhare"
        },
        {
          "year": "Apr 1997 – Mar 1998",
          "name": "S. M. Mehta"
        },
        {
          "year": "Apr 1996 – Mar 1997",
          "name": "Jassu Panjwani"
        },
        {
          "year": "Jun 1995 – Mar 1996",
          "name": "K. M. Jain"
        },
        {
          "year": "Apr 1994 – Jun 1995",
          "name": "J. P. Shroff"
        },
        {
          "year": "Oct 1992 – Mar 1994",
          "name": "Kumar Vaswani"
        },
        {
          "year": "Apr 1990 – Sep 1992",
          "name": "Amar Mulchandani"
        },
        {
          "year": "Apr 1989 – Mar 1990",
          "name": "H. B. Punjabi"
        },
        {
          "year": "Apr 1988 – Mar 1989",
          "name": "N. V. Kanetkar"
        },
        {
          "year": "Apr 1987 – Mar 1988",
          "name": "R. R. Dhoot"
        },
        {
          "year": "Apr 1985 – Mar 1987",
          "name": "D. S. Vajram"
        },
        {
          "year": "Apr 1983 – Mar 1985",
          "name": "Kishan P. Baney"
        },
        {
          "year": "Apr 1981 – Mar 1983",
          "name": "J. S. Khalsa"
        },
        {
          "year": "Apr 1980 – Mar 1981",
          "name": "Lalit Sangtani"
        },
        {
          "year": "Mar 1978 – Mar 1980",
          "name": "Raisahib P. Gera"
        },
        {
          "year": "1977",
          "name": "B. N. Shah"
        },
        {
          "year": "1976",
          "name": "Raisahib P. Gera"
        },
        {
          "year": "Jun 1975 – Dec 1975",
          "name": "S. K. Arunachalam"
        },
        {
          "year": "1974–1975",
          "name": "Harbans Lal Aurora"
        },
        {
          "year": "1972–1974",
          "name": "Raisahib P. Gera"
        },
        {
          "year": "1970–1971",
          "name": "G. K. Sharotri"
        },
        {
          "year": "1969",
          "name": "Wadhumal Shahaney"
        },
        {
          "year": "1968",
          "name": "Atur Sangtani"
        },
        {
          "year": "1967",
          "name": "A. U. Mansukhani"
        },
        {
          "year": "1966",
          "name": "Col. V. P. Kapur"
        },
        {
          "year": "1965",
          "name": "Raisahib P. Gera"
        },
        {
          "year": "1963–1964",
          "name": "Harbans Lal Aurora"
        },
        {
          "year": "1959–1962",
          "name": "K. J. Sapra"
        }
      ]
    },
    {
      "id": "secretary",
      "label": "Centre Hon. Secretary",
      "members": [
        {
          "year": "Apr 2026 – Mar 2027",
          "name": "Dr. Mahesh Rathi"
        },
        {
          "year": "Apr 2025 – Mar 2026",
          "name": "C. H. Ratlani"
        },
        {
          "year": "Apr 2024 – Mar 2025",
          "name": "Rajaram Hajare"
        },
        {
          "year": "Apr 2023 – Mar 2024",
          "name": "Ajay R. Gujar"
        },
        {
          "year": "Apr 2022 – Mar 2023",
          "name": "Ajay R. Gujar"
        },
        {
          "year": "Apr 2021 – Mar 2022",
          "name": "H. S. Anand"
        },
        {
          "year": "Apr 2020 – Mar 2021",
          "name": "H. S. Anand"
        },
        {
          "year": "Apr 2019 – Mar 2020",
          "name": "Sanjay Apte"
        },
        {
          "year": "Apr 2018 – Mar 2019",
          "name": "Ashok Atkekar"
        },
        {
          "year": "Apr 2017 – Mar 2018",
          "name": "Manoj Deshmukh"
        },
        {
          "year": "Apr 2016 – Mar 2017",
          "name": "Manoj Deshmukh"
        },
        {
          "year": "Apr 2015 – Mar 2016",
          "name": "Jagannath S. Jadhav"
        },
        {
          "year": "Apr 2014 – Mar 2015",
          "name": "Nandkumar Jethani"
        },
        {
          "year": "Apr 2013 – Mar 2014",
          "name": "Jaikishan Pinjani"
        },
        {
          "year": "Apr 2012 – Mar 2013",
          "name": "Mahesh Mirani"
        },
        {
          "year": "Apr 2011 – Mar 2012",
          "name": "Nandkumar Jethani"
        },
        {
          "year": "Apr 2010 – Mar 2011",
          "name": "Mahesh Mirani"
        },
        {
          "year": "Apr 2009 – Mar 2010",
          "name": "Jaikishan Pinjani"
        },
        {
          "year": "Apr 2008 – Mar 2009",
          "name": "Mahesh Mirani"
        },
        {
          "year": "Apr 2007 – Mar 2008",
          "name": "D. S. Chaudhari"
        },
        {
          "year": "Apr 2006 – Mar 2007",
          "name": "Neelkanth S. Joshi"
        },
        {
          "year": "Apr 2005 – Mar 2006",
          "name": "Shivkumar Bhalla"
        },
        {
          "year": "Apr 2003 – Mar 2005",
          "name": "S. G. Moorjani"
        },
        {
          "year": "Jul 2002 – Mar 2003",
          "name": "Sanjay Vaichal"
        },
        {
          "year": "Apr 2001 – Jul 2002",
          "name": "Neelkanth S. Joshi"
        },
        {
          "year": "Apr 1999 – Mar 2001",
          "name": "Manikram Halbe"
        },
        {
          "year": "Apr 1997 – Mar 1999",
          "name": "Neelkanth S. Joshi"
        },
        {
          "year": "Apr 1996 – Mar 1997",
          "name": "Manikram Halbe"
        },
        {
          "year": "Apr 1994 – Mar 1996",
          "name": "S. I. Chunkhare"
        },
        {
          "year": "Apr 1993 – Mar 1994",
          "name": "Jassu Panjwani"
        },
        {
          "year": "Apr 1990 – Mar 1993",
          "name": "J. P. Shroff"
        },
        {
          "year": "Apr 1989 – Mar 1990",
          "name": "Kumar Vaswani"
        },
        {
          "year": "Apr 1988 – Mar 1989",
          "name": "V. K. Khinvsara"
        },
        {
          "year": "Apr 1987 – Mar 1988",
          "name": "N. V. Kanetkar"
        },
        {
          "year": "Apr 1985 – Mar 1987",
          "name": "Amar Mulchandani"
        },
        {
          "year": "Apr 1983 – Mar 1985",
          "name": "R. R. Dhoot"
        },
        {
          "year": "Apr 1981 – Mar 1983",
          "name": "Mohan Lal Mathrani"
        },
        {
          "year": "Apr 1980 – Mar 1981",
          "name": "Kishan P. Baney"
        },
        {
          "year": "Mar 1978 – Mar 1980",
          "name": "N. S. Rangaswamy"
        },
        {
          "year": "1977",
          "name": "B. G. Mahajan"
        },
        {
          "year": "1976",
          "name": "D. G. Gupta"
        },
        {
          "year": "1974–1975",
          "name": "Kumar Gera"
        },
        {
          "year": "1972–1973",
          "name": "S. K. Arunachalam"
        },
        {
          "year": "1969–1971",
          "name": "R. V. Joshi"
        },
        {
          "year": "1968",
          "name": "G. K. Sharotri"
        },
        {
          "year": "1967",
          "name": "R. M. Shah"
        },
        {
          "year": "1966",
          "name": "N. V. Sanghavi"
        },
        {
          "year": "1965",
          "name": "A. U. Mansukhani"
        },
        {
          "year": "1964",
          "name": "Col. V. P. Kapur"
        },
        {
          "year": "1959–1963",
          "name": "Raisahib P. Gera"
        }
      ]
    },
    {
      "id": "vice_chairman",
      "label": "Centre Vice Chairman",
      "members": []
    },
    {
      "id": "treasurer",
      "label": "Centre Treasurer",
      "members": []
    }
  ]
};

export const platinumJubileeData = {
  "title": "Platinum Jubilee Celebration",
  "subtitle": "75 Years · 1941–2015",
  "office_bearers": [
    {
      "name": "Mahesh R. Mirani",
      "role": "Chairman"
    },
    {
      "name": "Siddharth J. Shah",
      "role": "Vice Chairman"
    },
    {
      "name": "Jagannath S. Jadhav",
      "role": "Hon. Secretary"
    },
    {
      "name": "Manoj Deshmukh",
      "role": "Hon. Jt. Secretary"
    },
    {
      "name": "C. H. Ratlani",
      "role": "Hon. Treasurer"
    }
  ],
  "organising_committee": [
    "R. B. Suryavanshi",
    "Neelkanth S. Joshi",
    "S. I. Chunkhare",
    "Jaideep Raje",
    "C. S. Parhar",
    "D. S. Shirole",
    "Subhash Deshpande",
    "Jai Pinjani",
    "Shivkumar Bhalla"
  ]
};

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
   Every value below is transcribed from BAI Pune Centre's official
   "WBSC Booklet 2026" (38pp, issued 18 June 2026). Do not edit these
   figures, names or category titles without checking that document —
   they are the Centre's own published record.

   Edition numbering: 1997-98 was the 1st in series, so 2024-25 = 28th,
   2025-26 = 29th and 2026 = 30th. The booklet cover reads "30th in Series".
   ------------------------------------------------------------------ */
export const wbscAwardsData = {
  title: "Well Built Structure Competition 2026",
  edition: "30th in Series",
  since: "Since 1997",
  tagline: "Quality • Speed • Economy • Safety & Welfare",
  logo: "/images/wbsc/wbsc-logo.png",
  trophy: "/images/wbsc/wbsc-trophy.png",
  openEntriesNote: "Entries for WBSC 2027 and 2028 are open",
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
  /* The 11 official 2026 categories (booklet p8), grouped for the tab UI. */
  categoryCount: 11,
  categoryGroups: [
    {
      group: "Residential",
      categories: [
        "Residential (Bungalow, Row Houses, Standalone Buildings)",
        "Residential (Housing Complex)",
        "Residential (Redevelopment Projects)"
      ]
    },
    {
      group: "Commercial & Industrial",
      categories: [
        "Commercial (Malls, Office, Institution, Hotel, Hospital, Cinema etc.)",
        "Industrial Construction Projects"
      ]
    },
    {
      group: "Infrastructure & Roads",
      categories: [
        "Infrastructure (Bridges, Flyovers, ESR, Metro Stations etc.)",
        "Roads (Concrete & Bituminous)"
      ]
    },
    {
      group: "Government",
      categories: ["Government (State & Central), Semi-Govt., Public Works"]
    },
    {
      group: "Specialised",
      categories: [
        "Landscapes (Horticulture work etc.)",
        "Work up to Bare Shell (includes RCC, Masonry and Plaster works)",
        "Mastery Category"
      ]
    }
  ],
  eligibility: [
    "Any individual, company, firm, joint venture, turnkey contractor, promoter or developer engaged in construction activity may participate.",
    "The applicant must be from in and around Pune, or from the nearby BAI centres: Ahmednagar, Baramati, Ichalkaranji, Kolhapur, Mumbai, Nashik, Phaltan, Sangali, Satara, Solapur, Sangamner and Ulhasnagar.",
    "The applicant must have had a major role in the execution of the project.",
    "The project must be within 250 km from Pune.",
    "Work must be nearing completion and shall have commenced preferably not before March 2024.",
    "A project entered in a previous competition shall not be considered."
  ],
  eligibilityNote: "One project may be proposed for two categories by filling in two separate entry forms. The category is subject to confirmation by the Juries.",
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
  evaluationNote: "Evaluation is done through standard assessment sheets by each Jury member separately and is kept confidential. This data is not available for review or discussion. The decision of the Panel of Juries is final.",
  entryTerms: [
    { label: "Entry fee", value: "₹25,000 + GST @ 18% per entry, payable with the application" },
    { label: "Cheque in favour of", value: "Builders' Association of India – Pune Centre" },
    { label: "Presentation", value: "Maximum 30 minutes to the Panel of Juries, including PowerPoint and video" },
    { label: "Submission", value: "PPT on pen-drive with 2 hard copies, at the BAI Office at least 10 days before the presentation date" },
    { label: "Video format", value: "AVI only, maximum 10 minutes" },
    { label: "Invalid entries", value: "Returned, and the entry fee refunded" }
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
    "30 minute project presentation to the Panel of Juries.",
    "Where possible, provide a video recording of the project (max 10 minutes, AVI format) to supplement the PowerPoint.",
    "PPT should be submitted on a pen-drive with 2 hard copies.",
    "Photographs of project execution from excavation to finish.",
    "Labour camp and safety measures taken for the project.",
    "New methodology / techniques adopted for time and economy constraints.",
    "Methods for selection of construction materials and quality."
  ],
  downloads: [
    { label: "WBSC 2026 Entry Form", status: "coming_soon" },
    { label: "WBSC 2026 Booklet", status: "coming_soon" },
    { label: "Competition Rules", status: "coming_soon" }
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
  upcoming: [
    { title: "BAI Pune Centre Annual General Meeting 2026 — sample placeholder event", date: "15th September 2026", venue: "B.G. Shirke Activity Centre, Pune", image: "/images/event_mcgc_meet.webp" },
    { title: "BAI Pune Centre Technical Seminar on Sustainable Construction — sample placeholder event", date: "10th October 2026", venue: "Pune Centre Office, Sangam Bridge, Pune", image: "/images/event_sponsorship.webp" }
  ],
  past: [
    { title: "Builders' Day Celebration 2025", date: "December 2025", venue: "Pune", image: "/images/events/event_builders-day-2025.jpg", links: ["Gallery"] },
    { title: "Satkar Samarambh — Felicitation of Meritorious Children of Construction Workers", date: "14th November 2025", venue: "Pune", image: "/images/events/event_worker-children-felicitation-2025-1.jpg", links: ["Gallery"] },
    { title: "Technical Site Visit — Cable-Stayed Bridge Construction", date: "January 2026", venue: "Maharashtra", image: "/images/events/event_bridge-site-visit-1.jpg", links: ["Gallery"] },
    { title: "Courtesy Visit to Pune Municipal Corporation", date: "February 2026", venue: "Pune Municipal Corporation, Pune", image: "/images/events/event_pmc-courtesy-visit-1.jpg", links: ["Gallery"] },
    { title: "Site Visit — Central Water and Power Research Station (CWPRS)", date: "May 2026", venue: "CWPRS, Khadakwasla, Pune", image: "/images/events/event_cwprs-site-visit.jpg", links: ["Gallery"] },
    { title: "BAI Pune Centre at Central Bank of India's Mega Retail Credit Outreach Campaign", date: "July 2026", venue: "Regional Office, Pune", image: "/images/events/event_central-bank-outreach-campaign.jpg", links: ["Gallery"] },
    { title: "Industrial Facility Visit", date: "July 2026", venue: "Pune", image: "/images/events/event_industrial-facility-visit-1.jpg", links: ["Gallery"] },
    { title: "BAI's 32nd All India Builders Convention", date: "7th–9th January 2026", venue: "Dr. Shyama Prasad Mukherjee Indoor Stadium, Goa, India", image: "/images/event_goa_convention.webp", links: ["Gallery — placeholder", "Speaker Presentations — placeholder", "Videos — placeholder"] },
    { title: "3rd MC-GC Meeting", date: "20th–21st November 2025", venue: "CIAL Convention Centre, Kochi", image: "/images/event_kochi_meeting.jpg", links: ["Gallery — placeholder", "Downloads — placeholder"] },
    { title: "BAI Sports League 2026", date: "21st February 2026", venue: "United Sports Center, Kakkanad, Kochi", image: "/images/event_sports_league.webp", links: ["Gallery — placeholder"] }
  ],
  siteVisits: [
    {
      title: "Cable-Stayed Bridge Construction Site",
      date: "January 2026",
      venue: "Maharashtra",
      image: "/images/events/event_bridge-site-visit-1.jpg",
      desc: "Members toured an active cable-stayed bridge construction site to study advanced formwork, cable-stay tensioning and staged-construction sequencing techniques."
    },
    {
      title: "Central Water and Power Research Station (CWPRS)",
      date: "May 2026",
      venue: "Khadakwasla, Pune",
      image: "/images/events/event_cwprs-site-visit.jpg",
      desc: "A technical visit to CWPRS to understand hydraulic model studies and their application to dam, canal and river-training structures."
    },
    {
      title: "Industrial Facility Visit",
      date: "July 2026",
      venue: "Pune",
      image: "/images/events/event_industrial-facility-visit-1.jpg",
      desc: "Members toured a large-scale industrial facility to observe precast production, material handling and site safety systems in a live industrial setting."
    },
    {
      title: "Courtesy Visit to Pune Municipal Corporation",
      date: "February 2026",
      venue: "Pune Municipal Corporation, Pune",
      image: "/images/events/event_pmc-courtesy-visit-1.jpg",
      desc: "A courtesy and coordination visit with PMC officials to discuss civic infrastructure projects and builder-body liaison matters."
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
  gallery: [
    { src: "/images/events/event_builders-day-2025.jpg", caption: "Builders' Day Celebration 2025" },
    { src: "/images/events/event_worker-children-felicitation-2025-1.jpg", caption: "Felicitation of Meritorious Children of Construction Workers" },
    { src: "/images/events/event_worker-children-felicitation-2025-2.jpg", caption: "Felicitation Ceremony — Address by Chief Guest" },
    { src: "/images/events/event_bridge-site-visit-1.jpg", caption: "Technical Site Visit — Cable-Stayed Bridge Construction" },
    { src: "/images/events/event_bridge-site-visit-2.jpg", caption: "Members at the Bridge Construction Site" },
    { src: "/images/events/event_pmc-courtesy-visit-1.jpg", caption: "Courtesy Visit to Pune Municipal Corporation" },
    { src: "/images/events/event_pmc-courtesy-visit-2.jpg", caption: "Meeting with PMC Officials" },
    { src: "/images/events/event_office-meeting-1.jpg", caption: "Committee Meeting at BAI Pune Centre Office" },
    { src: "/images/events/event_office-meeting-2.jpg", caption: "Members' Discussion at Pune Centre Office" },
    { src: "/images/events/event_committee-meeting-office.jpg", caption: "Committee Meeting, Pune Centre Office" },
    { src: "/images/events/event_cwprs-site-visit.jpg", caption: "Site Visit — Central Water and Power Research Station" },
    { src: "/images/events/event_central-bank-outreach-campaign.jpg", caption: "Central Bank of India's Mega Retail Credit Outreach Campaign" },
    { src: "/images/events/event_industrial-facility-visit-1.jpg", caption: "Industrial Facility Visit" },
    { src: "/images/events/event_industrial-facility-visit-2.jpg", caption: "Members Touring the Facility" },
    { src: "/images/event_goa_convention.webp", caption: "32nd All India Builders Convention, Goa" },
    { src: "/images/event_kochi_meeting.jpg", caption: "3rd MC-GC Meeting, Kochi" },
    { src: "/images/event_mcgc_meet.webp", caption: "Managing Committee & General Council Meeting" },
    { src: "/images/event_sponsorship.webp", caption: "Sponsorship Appeal, MC/GC Meeting" },
    { src: "/images/event_sports_league.webp", caption: "BAI Sports League 2026" },
    { src: "/images/event_redev_summit.webp", caption: "Redevelopment Summit" }
  ],
  calendar: [
    { month: "September 2026", items: ["Pune Centre Annual General Meeting — sample placeholder"] },
    { month: "October 2026", items: ["Technical Seminar on Sustainable Construction — sample placeholder"] }
  ]
};

export const membershipPageData = {
  title: "Become a Member",
  subtitle: "Connecting Construction Professionals Since 1941",
  whyJoin: [
    "Professional Recognition",
    "Industry Networking",
    "Government Representation",
    "Business Opportunities",
    "Technical Knowledge",
    "Training",
    "Leadership Roles",
    "Industry Updates"
  ],
  categories: [
    { name: "Life Member", desc: "One-time fee, lifetime membership benefits and voting rights." },
    { name: "Corporate Member", desc: "For registered construction companies and firms operating in Pune Centre's jurisdiction." },
    { name: "Associate Member", desc: "For allied professionals and organizations supporting the construction industry." },
    { name: "Student Member", desc: "For civil engineering students seeking mentorship and internship opportunities." }
  ],
  benefits: [
    { title: "Business Networking", desc: "Connect with fellow builders, contractors and developers across Pune." },
    { title: "Technical Resources", desc: "Access price index numbers, technical guidelines and legal support." },
    { title: "Discounted Event Access", desc: "Preferential rates for seminars, workshops and the annual convention." },
    { title: "Committee Participation", desc: "Take part in Executive and Standing Committee activities." },
    { title: "Government Advocacy", desc: "Have your concerns represented before Government departments." },
    { title: "Industry Updates", desc: "Stay informed through the monthly 'Indian Construction' bulletin." },
    { title: "Professional Recognition", desc: "Gain standing as a member of India's oldest apex construction body." },
    { title: "Knowledge Sharing", desc: "Learn from peers through networking meets and technical sessions." }
  ],
  howToJoin: [
    { title: "Fill Membership Form", desc: "Complete the registration form with your firm and contact details.", link: "/non-members-area" },
    { title: "Upload Documents", desc: "Submit firm registration proof and other supporting documents." },
    { title: "Application Review", desc: "The Membership Committee reviews your application." },
    { title: "Membership Approval", desc: "Approved applications are confirmed by the managing committee." },
    { title: "Welcome to BAI", desc: "Receive your membership number and start accessing member benefits." }
  ],
  downloads: [
    { label: "Membership Form", status: "coming_soon" },
    { label: "Membership Rules", status: "coming_soon" },
    { label: "Fee Structure", status: "coming_soon" }
  ]
};

export const socialActivitiesContent = {
  title: "Social & CSR Initiatives",
  subtitle: "Empowering Communities & Building a Sustainable Construction Ecosystem",
  overview: "At Builders' Association of India (BAI) Pune Centre, we believe that true development goes hand-in-hand with social responsibility. Beyond concrete and steel, our mission is to uplift the lives of construction workers, support the local community, foster sustainable environmental practices, and train the next generation of builders.",
  stats: [
    { value: "50+", label: "Medical & Safety Camps" },
    { value: "5,000+", label: "Workers Vaccinated" },
    { value: "10,000+", label: "Tree Saplings Planted" },
    { value: "1,200+", label: "Students Mentored (SIP)" }
  ],
  csrInitiatives: [
    {
      title: "Worker Health & Safety Camps",
      description: "We host regular healthcare programs, eye check-up drives, and multi-speciality medical camps directly at construction sites across Pune. Laborers receive diagnostic testing, free basic medicines, safety guidelines, and health awareness counseling.",
      icon: "FaHandsHelping"
    },
    {
      title: "Safety Helmet & PPE Distribution",
      description: "Ensuring zero-accident sites is our top priority. We organize safety drives to distribute free personal protective equipment (PPE), including ISI-marked safety helmets, reflective jackets, safety gloves, and reinforced boots to construction workers.",
      icon: "FaTools"
    },
    {
      title: "Educational Sponsorships",
      description: "We believe in breaking the cycle of poverty. BAI Pune provides financial aid, study kits, and educational sponsorships to the children of site laborers, enabling them to attend schools and colleges and build brighter futures.",
      icon: "FaGraduationCap"
    }
  ],
  outreachPrograms: [
    {
      title: "Student Internship Programme (SIP)",
      description: "Our landmark program bridges the gap between academic theory and practical construction. We place engineering, architectural, and project management students on active sites under the guidance of experienced BAI mentors.",
      duration: "Ongoing (Annual)",
      target: "Civil & Arch Students",
      image: "/images/events/event_committee-meeting-office.jpg"
    },
    {
      title: "Kaushalya Vardhan Skill Development",
      description: "Free vocational training workshops for young and unskilled workers. We provide training in masonry, bar-bending, plumbing, safety operations, and digital basic skills to enhance employability.",
      duration: "Quarterly Drives",
      target: "Youth & Unskilled Laborers",
      image: "/images/events/event_industrial-facility-visit-1.jpg"
    },
    {
      title: "Annual Blood Donation Drives",
      description: "BAI Pune collaborates with leading blood banks and hospitals to organize community blood donation camps. Members, staff, and construction professionals actively participate to support local emergency reserves.",
      duration: "Every Independence Day",
      target: "General Public & Members",
      image: "/images/events/event_central-bank-outreach-campaign.jpg"
    }
  ],
  sustainabilityCampaigns: [
    {
      title: "Vriksharopan (Tree Plantation)",
      description: "To combat urban heat and reduce the carbon footprint of development, our green committee leads tree plantation drives. We target areas around major construction projects, public parks, and highways, planting indigenous tree species suited to Pune's ecology.",
      impact: "10k+ saplings planted & maintained"
    },
    {
      title: "Rainwater Harvesting & Water Security",
      description: "Water scarcity is a major concern. We run awareness campaigns and provide technical consulting to housing societies and developer projects on installing efficient rainwater harvesting and groundwater recharging systems.",
      impact: "50+ societies consulted"
    }
  ],
  disasterRelief: {
    title: "Disaster Response & Civic Aid",
    description: "In times of crisis, BAI Pune stands at the forefront. During the COVID-19 pandemic, we established temporary relief shelters, supplied thousands of ration kits, face masks, and sanitizers, and facilitated safe transit for migrant laborers. Similarly, we mobilize machinery (like excavators and trucks) and dry rations to assist the civic administration during monsoon flooding in low-lying areas of Pune.",
    image: "/images/events/event_worker-children-felicitation-2025-1.jpg"
  }
};

