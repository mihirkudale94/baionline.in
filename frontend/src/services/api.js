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

export const heroSlides = [
  {
    id: 1,
    title: "Builders' Day Celebration 2025 — BAI Pune Centre",
    image: "/images/events/event_builders-day-2025.jpg",
    link: "/events",
    linkText: "See Our Events"
  },
  {
    id: 2,
    title: "Felicitating the Meritorious Children of Construction Workers",
    image: "/images/events/event_worker-children-felicitation-2025-1.jpg",
    link: "/events",
    linkText: "See Our Events"
  },
  {
    id: 3,
    title: "Ajay Gujar, unanimously elected as Chairman of BAI for 2026-27",
    image: "https://www.baionline.in/public/frontend/images/new_president_2026-27_02.jpg",
    link: "https://www.baionline.in/public/frontend/pdf/Election-Results 2026-27.pdf",
    linkText: "Click Here"
  },
  {
    id: 4,
    title: "Quality construction begins with a quality association",
    image: "https://www.baionline.in/public/frontend/images/21.jpg",
    link: "/membership",
    linkText: "Be a Member of BAI"
  },
  {
    id: 6,
    title: "BAI Representation to Union Ministry",
    image: "https://www.baionline.in/public/frontend/images/22.png",
    link: "https://www.baionline.in/public/frontend/pdf/BAI-Representation-Dated-1st-April-2026.pdf",
    linkText: "Details"
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
    name: "Ajay Gujar",
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
    name: "Mahesh Rathi",
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
    name: "Sushil Agarwal",
    title: "Treasurer BAI Pune",
    image: "/images/Shri_Sushil_Agarwal.jpg",
    bio: "Treasurer of Builders' Association of India Pune."
  }
};

export const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "About BAI", path: "/about" },
      { label: "BAI Team 2026-27", path: "/team" },
      { label: "Past Office Bearers", path: "/past-presidents" },
      { label: "Committees", path: "/committees" }
    ]
  },
  {
    label: "BAI Activities",
    path: "/activities",
    children: [
      {
        label: "Members Area",
        path: "/members-area",
        children: [
          { label: "Price Index Numbers", path: "/members-area?form=one" },
          { label: "Membership Data Updation form", path: "/members-area?form=two" },
          { label: "Please inform me my membership number.", path: "/members-area?form=three" },
          { label: "Feedback", path: "/members-area?form=four" }
        ]
      },
      { label: "Non Members Area", path: "/non-members-area" },
      {
        label: "Wheeling & Dealing",
        path: "#",
        children: [
          { label: "Member", path: "/wd-member" },
          { label: "Non Member", path: "/wd-non-member" },
          { label: "Display Area", path: "/wd-display" }
        ]
      },
      { label: "Links", path: "/links" },
      {
        label: "Upcoming Services",
        path: "#",
        children: [
          { label: "Email", path: "/up-email" },
          { label: "News and Discussion Board", path: "/up-news" },
          { label: "Meeting Room", path: "/up-meeting" }
        ]
      }
    ]
  },
  { label: "Social Activities", path: "/social-activities" },
  { label: "Events", path: "/events" },
  { label: "WBSC Awards", path: "/wbsc-awards" },
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
    address: "B.G. Shirke Activity Centre, 23, 24 & 25 \"Sangam\", Phase II, Near Sangam Bridge, Pune - 411001",
    tel: "(020) 2444 0000",
    phone: "(020) 2444 0001",
    email: "bai.punecentre@gmail.com"
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
    { platform: "linkedin", url: "https://in.linkedin.com/company/builders-association-of-india" },
    { platform: "twitter", url: "https://twitter.com/bainational" }
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
    address: "B.G. Shirke Activity Centre, 23, 24 & 25 \"Sangam\", Phase II, Near Sangam Bridge, Pune - 411001",
    tel: ["(020) 2444 0000", "(020) 2444 0001"],
    phone: "(020) 2444 0001",
    email: "bai.punecentre@gmail.com"
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
  hon_secretary: { role: "Secretary", name: "Mahesh Rathi" },
  hon_joint_secretary: { role: "Jt. Secretary", name: "Sanjay Apte" },
  hon_treasurer: { role: "Treasurer", name: "Sushil Agarwal" },
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

// Sample/placeholder data — pending real records from the Pune Centre office bearer display boards
export const puneOfficeBearersData = {
  note: "The entries below are sample placeholders. Real names and years will be added once the photographs of the Pune Centre office bearer display boards are shared.",
  roles: [
    {
      id: "chairman",
      label: "Chairman",
      members: [
        { year: "2024-2025", name: "Sample Name — to be added" },
        { year: "2022-2024", name: "Sample Name — to be added" },
        { year: "2020-2022", name: "Sample Name — to be added" }
      ]
    },
    {
      id: "vice_chairman",
      label: "Vice Chairman",
      members: [
        { year: "2024-2025", name: "Sample Name — to be added" },
        { year: "2022-2024", name: "Sample Name — to be added" }
      ]
    },
    {
      id: "secretary",
      label: "Secretary",
      members: [
        { year: "2024-2025", name: "Sample Name — to be added" },
        { year: "2022-2024", name: "Sample Name — to be added" }
      ]
    },
    {
      id: "treasurer",
      label: "Treasurer",
      members: [
        { year: "2024-2025", name: "Sample Name — to be added" },
        { year: "2022-2024", name: "Sample Name — to be added" }
      ]
    }
  ]
};

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

export const wbscAwardsData = {
  title: "BAI – SHIRKE Well Built Structure Competition 2026",
  edition: "30th Edition",
  tagline: "Celebrating Excellence in Construction.",
  about: [
    "The Well Built Structure Competition (WBSC) is one of India's most prestigious construction excellence awards organized annually by the Builders' Association of India – Pune Centre.",
    "For nearly three decades, WBSC has recognized projects demonstrating outstanding quality, engineering excellence, innovation, safety, speed and economy in construction."
  ],
  whyParticipate: [
    { title: "National Recognition", desc: "Winning entries earn recognition among the country's most respected construction quality benchmarks." },
    { title: "Prestigious Trophy & Certificate", desc: "Category winners are felicitated with the WBSC trophy and certificate of excellence." },
    { title: "Technical Evaluation by Eminent Jury", desc: "An independent jury of eminent engineers and architects evaluates every entry against rigorous technical standards." },
    { title: "Industry Recognition", desc: "Award-winning projects gain visibility through BAI publications, press coverage and industry circles." },
    { title: "Benchmark Your Projects", desc: "Detailed evaluator feedback helps you benchmark your project against the industry's best." },
    { title: "Showcase Engineering Excellence", desc: "WBSC is a platform to showcase your firm's engineering excellence and construction quality practices." }
  ],
  categoryGroups: [
    {
      group: "Residential",
      categories: ["Bungalow / Row House", "Standalone Buildings", "Redevelopment", "Multi Building Projects"]
    },
    {
      group: "Commercial",
      categories: ["Offices", "Shopping Centres", "IT Parks", "Hospitals", "Institutional Buildings"]
    },
    {
      group: "Infrastructure",
      categories: ["Roads", "Bridges", "Flyovers", "STP", "ESR", "GSR"]
    },
    {
      group: "Industrial",
      categories: ["Industrial"]
    },
    {
      group: "Government",
      categories: ["Government Projects"]
    },
    {
      group: "Landscaping",
      categories: ["Landscaping"]
    },
    {
      group: "Bare Shell",
      categories: ["Bare Shell Projects"]
    },
    {
      group: "Masters",
      categories: ["Masters Category"]
    }
  ],
  eligibility: [
    "Builders",
    "Contractors",
    "Developers",
    "Infrastructure Companies",
    "Government Contractors",
    "Joint Ventures",
    "Turnkey Contractors"
  ],
  eligibilityNote: "Projects should satisfy WBSC eligibility requirements including commencement period and applicant's execution role.",
  evaluationCriteria: [
    "Quality",
    "Speed",
    "Economy",
    "Innovation",
    "Safety",
    "Sustainability",
    "Site Management",
    "Green Building Practices",
    "Welfare Measures",
    "Documentation"
  ],
  evaluationNote: "Independent experts from multiple disciplines conduct the evaluation through presentations, site visits and confidential assessment.",
  process: [
    { title: "Submit Entry", desc: "Firms submit the completed entry form along with project details before the deadline." },
    { title: "Document Verification", desc: "The WBSC Committee verifies entries for eligibility and completeness." },
    { title: "Project Presentation", desc: "Entrants present their project to the evaluation panel." },
    { title: "Jury Site Visit", desc: "An independent jury conducts on-site inspections of shortlisted projects." },
    { title: "Final Evaluation", desc: "The jury completes its final evaluation and selects category winners." },
    { title: "Awards Ceremony", desc: "Winners are felicitated at the annual WBSC awards function." }
  ],
  downloads: [
    { label: "WBSC Brochure", status: "coming_soon" },
    { label: "Entry Form", status: "coming_soon" },
    { label: "Competition Rules", status: "coming_soon" }
  ],
  testimonials: [
    {
      id: 1,
      name: "Er. Rajesh Patil",
      role: "Managing Director",
      company: "Patil Construction & Infrastructure",
      category: "participant",
      project: "Peak Plaza (Commercial Hub)",
      year: "2024",
      quote: "Participating in WBSC was an eye-opener for our site execution team. The rigorous inspection and detailed documentation check pushed our quality control standards to the next level.",
      avatar: "RP"
    },
    {
      id: 2,
      name: "Ms. Arundhati Deshmukh",
      role: "Head of Quality Assurance",
      company: "Vasant Developers",
      category: "winner",
      project: "Vasant Woods (High-Rise Residential)",
      award: "Gold Winner – Residential High Rise",
      year: "2025",
      quote: "Winning the WBSC award was a proud moment for Vasant Group. It validated our hard work, boosted our brand trust in the Pune market, and served as a powerful marketing asset.",
      avatar: "AD"
    },
    {
      id: 3,
      name: "Dr. Sunil Kulkarni",
      role: "Former Head of Civil Engineering, COEP",
      company: "Senior Structural Consultant",
      category: "jury",
      project: "WBSC Jury Panel",
      year: "2023 - 2026",
      quote: "The evaluation process of WBSC is extremely objective. We inspect structural drawings, material testing records, safety compliance, and finishing quality. Only projects showing absolute excellence win.",
      avatar: "SK"
    },
    {
      id: 4,
      name: "Er. Nitin Shah",
      role: "Founder & Chief Architect",
      company: "Nitin Shah Architects",
      category: "jury",
      project: "WBSC Jury Panel",
      year: "2022 - 2025",
      quote: "As a juror, it is inspiring to see Pune's construction community embrace sustainable design and smart materials. WBSC is instrumental in raising the bar for the entire industry.",
      avatar: "NS"
    },
    {
      id: 5,
      name: "Mr. Satish Ranade",
      role: "Project Head",
      company: "Skyline InfraProjects",
      category: "winner",
      project: "Skyline Heights",
      award: "Winner – Affordable Housing Category",
      year: "2024",
      quote: "WBSC's award gave our affordable housing project the credibility it deserved. Buyers are now more conscious about quality, and the BAI-Shirke WBSC seal is the ultimate mark of quality.",
      avatar: "SR"
    },
    {
      id: 6,
      name: "Er. Meera Joshi",
      role: "Chief Engineer",
      company: "Joshi & Associates",
      category: "participant",
      project: "Metropolis Commercial Park",
      year: "2025",
      quote: "The feedback report provided by the WBSC engineering audit panel was highly constructive. It helped us identify gaps in our safety workflows and implement better onsite protocols.",
      avatar: "MJ"
    }
  ],
  contactEmail: "bai.punecentre@gmail.com"
};

export const wbscArchiveData = {
  history: "The Well Built Structure Competition began as a small, single-category recognition scheme for Pune's builder community and has since grown into a multi-category, jury-evaluated competition spanning residential, commercial, industrial, infrastructure and landscaping projects. Now in its 30th edition, WBSC's archive of winners, chief guests and jury panels reflects three decades of the Pune construction industry's evolving quality standards.",
  years: [
    {
      year: "2025",
      editionLabel: "29th Edition — sample placeholder entry",
      chiefGuest: "To be added",
      highlight: "Record number of entries received across the Residential and Commercial groups.",
      winners: [
        { category: "Residential – High Rise", project: "Vasant Woods", firm: "Vasant Developers" },
        { category: "Affordable Housing", project: "Skyline Heights", firm: "Skyline InfraProjects" }
      ]
    },
    {
      year: "2024",
      editionLabel: "28th Edition — sample placeholder entry",
      chiefGuest: "To be added",
      highlight: "Introduced the Green Building special mention for sustainable construction practices.",
      winners: [
        { category: "Commercial – Office Complex", project: "Peak Plaza", firm: "Patil Construction & Infrastructure" }
      ]
    },
    {
      year: "2023",
      editionLabel: "27th Edition — sample placeholder entry",
      chiefGuest: "To be added",
      highlight: "Jury panel expanded to include independent structural consultants alongside COEP faculty.",
      winners: []
    }
  ],
  note: "This archive currently shows sample placeholder entries. Real year-wise winners, chief guests and milestone details will be added once BAI Pune Centre shares the historical WBSC records."
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

