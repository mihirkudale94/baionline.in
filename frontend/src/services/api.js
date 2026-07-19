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
    title: "Shri Ravindra Tyagi, unanimously elected as President of BAI for 2026-27",
    image: "https://www.baionline.in/public/frontend/images/new_president_2026-27_02.jpg",
    link: "https://www.baionline.in/public/frontend/pdf/Election-Results 2026-27.pdf",
    linkText: "Click Here"
  },
  {
    id: 2,
    title: "Quality construction begins with a quality association",
    image: "https://www.baionline.in/public/frontend/images/21.jpg",
    link: "/membership",
    linkText: "Be a Member of BAI"
  },
  {
    id: 3,
    title: "Making your vision become a reality.",
    image: "https://www.baionline.in/public/frontend/images/Banner-1.jpg",
    link: "/membership",
    linkText: "Be a Member of BAI"
  },
  {
    id: 4,
    title: "Building solid foundations for an ever-changing world.",
    image: "https://www.baionline.in/public/frontend/images/Banner-3-1.jpg",
    link: "/membership",
    linkText: "Be a Member of BAI"
  },
  {
    id: 5,
    title: "Building with innovation, quality, and pride.",
    image: "https://www.baionline.in/public/frontend/images/Banner-2-11.jpg",
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
  { label: "President", count: "1" },
  { label: "Imm. Past President", count: "1" },
  { label: "Vice Presidents", count: "5" },
  { label: "State Chairmen", count: "16" },
  { label: "State Co-Ordinators", count: "3" },
  { label: "Members", count: "2 Lakh" },
  { label: "Past Presidents", count: "57" }
];

export const leadership = {
  president: {
    name: "Shri Ravindra Tyagi",
    title: "President",
    image: "/images/Shri_Ravindra_Tyagi.jpg",
    bio: "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services, 'Poona', now known as 'Pune', who suggested that builders working under his command, form a body for finding solutions to various problems. He went further and made available a piece of land inside the premises of Southern Command Headquarters in Pune, on which an office was constructed and aptly named 'Jackson Hut', which stands even today as a monument in BAI's name.",
    bio_extended: "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 25,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members. Throughout its more than seven decades of existence, BAI has had its ups and downs, trials and tribulations, moments of strengths and weakness, moments of glory and disappointment. But, its umbrella has protected and furthered the cause of the Indian construction industry and its constituents in many ways."
  },
  imm_past_president: {
    name: "Dr. Dharmesh Awasthi",
    title: "Immediate Past President",
    image: "/images/Dr_Dharmesh_Awasthi.jpg",
    bio: "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services.",
    bio_extended: "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 20,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members."
  },
  vice_presidents: [
    { name: "Shri Kaushal Kumar Singh (Jamshedpur)", region: "VP - EAST", image: "/images/vice-president-profile.webp" },
    { name: "Shri Sanjay Tyagi (Ghaziabad)", region: "VP - NORTH", image: "/images/vice-president-profile.webp" },
    { name: "Shri V. Satya Murthy (Warangal)", region: "VP - SOUTH I", image: "/images/vice-president-profile.webp" },
    { name: "Shri R. Prakash (Kanchipuram)", region: "VP - SOUTH II", image: "/images/vice-president-profile.webp" },
    { name: "Shri Mahesh M. Mudda (Mumbai)", region: "VP - WEST", image: "/images/vice-president-profile.webp" }
  ],
  state_chairmen: [
    { name: "Shri P. Seshagiri Rao (NTR)", state: "ANDHRA PRADESH", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Rupesh Kumar Singhal (Raipur)", state: "CHHATTISGARH", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Amit Pasricha (Delhi)", state: "DELHI", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Keval R. Parikh (Ahmedabad)", state: "GUJARAT", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Prem Khamesra (Faridabad)", state: "HARYANA", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Nipun Khurana (Una)", state: "HIMACHAL PRADESH", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Ravi Raj Agrawal (Ranchi)", state: "JHARKHAND", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri S. Shiva Prakash (Bangalore)", state: "KARNATAKA", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri K. Satheesh Kumar (Calicut)", state: "KERALA", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Prakash H. Menda (Ulhasnagar)", state: "MAHARASHTRA", image: "/images/state-chairmen-profile.webp" },
    { name: "Ms. Khoobi Mehta (Mohali)", state: "PUNJAB", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Shubham Jain (Greater Jaipur)", state: "RAJASTHAN", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri N. Ramalingam (Erode)", state: "TAMIL NADU", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri V. Ravinder Reddy (Greater Hyderabad)", state: "TELANGANA", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Sanjay Tyagi (Modinagar)", state: "UTTAR PRADESH", image: "/images/state-chairmen-profile.webp" },
    { name: "Shri Ram Chandra Singh Chouhan (Durgapur)", state: "WEST BENGAL", image: "/images/state-chairmen-profile.webp" }
  ],
  state_coordinators: [
    { name: "Shri Govind Khaitan (Guwahati)", state: "ASSAM", image: "/images/state-co-ordinators-profile.webp" },
    { name: "Shri Manish Kumar (Patna)", state: "BIHAR", image: "/images/state-co-ordinators-profile.webp" },
    { name: "Shri Om Prakash Vijayvargiya (Indore)", state: "MADHYA PRADESH", image: "/images/state-co-ordinators-profile.webp" }
  ]
};

export const centresData = {
  regions: [
    {
      name: "Northern Region",
      slug: "northern-region",
      states: [
        {
          name: "Delhi",
          slug: "delhi",
          centres: [
            { name: "Delhi", slug: "delhi" },
            { name: "Delhi East Shahdara", slug: "delhi-east-shahdara" },
            { name: "Delhi North", slug: "delhi-north" },
            { name: "Delhi South", slug: "delhi-south" },
            { name: "Delhi South East", slug: "delhi-south-east" },
            { name: "Delhi West", slug: "delhi-west" }
          ]
        },
        {
          name: "Haryana",
          slug: "haryana",
          centres: [
            { name: "Chandigarh", slug: "chandigarh-haryana" },
            { name: "Faridabad", slug: "faridabad" },
            { name: "Gurgaon", slug: "gurgaon" },
            { name: "Karnal", slug: "karnal" },
            { name: "Kundli", slug: "kundli" },
            { name: "Panipat", slug: "panipat" }
          ]
        },
        {
          name: "Punjab",
          slug: "punjab",
          centres: [
            { name: "Chandigarh", slug: "chandigarh-punjab" },
            { name: "Mohali", slug: "mohali" }
          ]
        },
        {
          name: "Rajasthan",
          slug: "rajasthan",
          centres: [
            { name: "Greater Jaipur", slug: "greater-jaipur" },
            { name: "Jaipur", slug: "jaipur" },
            { name: "Jaisalmer", slug: "jaisalmer" },
            { name: "Jodhpur", slug: "jodhpur" },
            { name: "Pink City Jaipur", slug: "pink-city-jaipur" }
          ]
        },
        {
          name: "Uttar Pradesh",
          slug: "uttar-pradesh",
          centres: [
            { name: "Agra", slug: "agra" },
            { name: "Agra Cantt", slug: "agra-cantt" },
            { name: "Aligarh", slug: "aligarh" },
            { name: "Allahabad", slug: "allahabad" },
            { name: "Baghpat", slug: "baghpat" },
            { name: "Bareilly", slug: "bareilly" },
            { name: "Gautam Buddha Nagar", slug: "gautam-buddha-nagar" },
            { name: "Ghaziabad", slug: "ghaziabad" },
            { name: "Greater Noida", slug: "greater-noida" },
            { name: "Hapur", slug: "hapur" },
            { name: "Kanpur", slug: "kanpur" },
            { name: "Kanpur South", slug: "kanpur-south" },
            { name: "Loni", slug: "loni" },
            { name: "Lucknow", slug: "lucknow" },
            { name: "Meerut", slug: "meerut" },
            { name: "Meerut Cantonment", slug: "meerut-cantonment" },
            { name: "Modinagar", slug: "modinagar" },
            { name: "Muzaffarnagar", slug: "muzaffarnagar" },
            { name: "Sahibabad", slug: "sahibabad" },
            { name: "Sitapur", slug: "sitapur" },
            { name: "Western U.P. Electrical", slug: "western-up-electrical" }
          ]
        },
        {
          name: "Uttarakhand",
          slug: "uttarakhand",
          centres: [
            { name: "Dehradun", slug: "dehradun" }
          ]
        }
      ]
    },
    {
      name: "Western Region",
      slug: "western-region",
      states: [
        {
          name: "Chattisgarh",
          slug: "chattisgarh",
          centres: [
            { name: "Bilaspur", slug: "bilaspur" },
            { name: "Durg-Bhilai", slug: "durg-bhilai" },
            { name: "Jagdalpur", slug: "jagdalpur" },
            { name: "Kanker", slug: "kanker" },
            { name: "Raipur", slug: "raipur" }
          ]
        },
        {
          name: "Goa",
          slug: "goa",
          centres: [
            { name: "Goa", slug: "goa" }
          ]
        },
        {
          name: "Gujarat",
          slug: "gujarat",
          centres: [
            { name: "Ahmedabad", slug: "ahmedabad" },
            { name: "Ahmedabad West", slug: "ahmedabad-west" },
            { name: "Baroda", slug: "baroda" },
            { name: "Bharuch", slug: "bharuch" },
            { name: "Gandhinagar", slug: "gandhinagar" },
            { name: "Karnavati", slug: "karnavati" },
            { name: "Por-Ramangamdi", slug: "por-ramangamdi" },
            { name: "Rajkot", slug: "rajkot" },
            { name: "Surat", slug: "surat" }
          ]
        },
        {
          name: "Madhya Pradesh",
          slug: "madhya-pradesh",
          centres: [
            { name: "Bhopal", slug: "bhopal" },
            { name: "Indore", slug: "indore" },
            { name: "Jabalpur", slug: "jabalpur" }
          ]
        },
        {
          name: "Maharashtra",
          slug: "maharashtra",
          centres: [
            { name: "Ahmednagar", slug: "ahmednagar" },
            { name: "Amravati", slug: "amravati" },
            { name: "Aurangabad", slug: "aurangabad" },
            { name: "Baramati", slug: "baramati" },
            { name: "Butibori", slug: "butibori" },
            { name: "Dhule", slug: "dhule" },
            { name: "Ichalkaranji", slug: "ichalkaranji" },
            { name: "Jalgaon", slug: "jalgaon" },
            { name: "Kolhapur", slug: "kolhapur" },
            { name: "Latur", slug: "latur" },
            { name: "Malegaon", slug: "malegaon" },
            { name: "Mumbai", slug: "mumbai" },
            { name: "Nagpur", slug: "nagpur" },
            { name: "Nanded", slug: "nanded" },
            { name: "Nandurbar", slug: "nandurbar" },
            { name: "Nasik", slug: "nasik" },
            { name: "Pandharpur", slug: "pandharpur" },
            { name: "Parbhani", slug: "parbhani" },
            { name: "Phaltan", slug: "phaltan" },
            { name: "Pune", slug: "pune" },
            { name: "Raigad", slug: "raigad" },
            { name: "Sangamner", slug: "sangamner" },
            { name: "Sangli", slug: "sangli" },
            { name: "Satara", slug: "satara" },
            { name: "Shahda", slug: "shahda" },
            { name: "Solapur", slug: "solapur" },
            { name: "Ulhasnagar", slug: "ulhasnagar" },
            { name: "Wai", slug: "wai" }
          ]
        }
      ]
    },
    {
      name: "Southern Region - I",
      slug: "southern-region-one",
      states: [
        {
          name: "Andhra Pradesh",
          slug: "andhra-pradesh",
          centres: [
            { name: "Amaravathi", slug: "amaravathi" },
            { name: "Anantpur", slug: "anantpur" },
            { name: "Guntur", slug: "guntur" },
            { name: "Nellore", slug: "nellore" },
            { name: "Ongole", slug: "ongole" },
            { name: "Rajahmundry", slug: "rajahmundry" },
            { name: "Ravulapalem", slug: "ravulapalem" },
            { name: "Tanuku", slug: "tanuku" },
            { name: "Tirupati", slug: "tirupati" },
            { name: "Vijayawada", slug: "vijayawada" },
            { name: "Visakhapatnam", slug: "visakhapatnam" },
            { name: "Vizag Steel City", slug: "vizag-steel-city" }
          ]
        },
        {
          name: "Karnataka",
          slug: "karnataka",
          centres: [
            { name: "Chikamangalur", slug: "chikamangalur" },
            { name: "Chitraduraga", "slug": "chitraduraga" },
            { name: "Bangalore", slug: "karnataka-bangalore" },
            { name: "Hasan", slug: "hasan" },
            { name: "Mandya", slug: "mandya" },
            { name: "Mangalore", slug: "mangalore" },
            { name: "Mysore", slug: "mysore" },
            { name: "Raichur", slug: "raichur" },
            { name: "Shimoga", slug: "shimoga" }
          ]
        },
        {
          name: "Telangana",
          slug: "telangana",
          centres: [
            { name: "Adilabad", slug: "adilabad" },
            { name: "Greater Hyderabad", slug: "greater-hyderabad" },
            { name: "Hyderabad", slug: "hyderabad" },
            { name: "Jangaon", slug: "jangaon" },
            { name: "Kamareddy", slug: "kamareddy" },
            { name: "Karimnagar", slug: "karimnagar" },
            { name: "Khamamm", slug: "khamamm" },
            { name: "Mahaboobnagar", slug: "mahaboobnagar" },
            { name: "Medachal", slug: "medachal" },
            { name: "Medak", slug: "medak" },
            { name: "Nalgonda", slug: "nalgonda" },
            { name: "Nizamabad", slug: "nizamabad" },
            { name: "Ranga Reddy", slug: "ranga-reddy" },
            { name: "Siddipet", slug: "siddipet" },
            { name: "Vikarabad", slug: "vikarabad" },
            { name: "Warangal", slug: "warangal" },
            { name: "Yadadri", slug: "yadadri" }
          ]
        }
      ]
    },
    {
      name: "Southern Region - II",
      slug: "southern-region-two",
      states: [
        {
          name: "Kerala",
          slug: "kerala",
          centres: [
            { name: "Adoor", slug: "adoor" },
            { name: "Alleppey", slug: "alleppey" },
            { name: "Aluva", slug: "aluva" },
            { name: "Angamali", slug: "angamali" },
            { name: "Calicut", slug: "calicut" },
            { name: "Changanacherry", slug: "changanacherry" },
            { name: "Cochin", slug: "cochin" },
            { name: "Ettumanoor", slug: "ettumanoor" },
            { name: "Idukki", slug: "idukki" },
            { name: "Kodungallur", slug: "kodungallur" },
            { name: "Kollam", slug: "kollam" },
            { name: "Kottayam", slug: "kottayam" },
            { name: "Malappuram", slug: "malappuram" },
            { name: "Muvattupuzha", slug: "muvattupuzha" },
            { name: "North Malabar", slug: "north-malabar" },
            { name: "Pathanamthitta", slug: "pathanamthitta" },
            { name: "Thiruvalla", slug: "thiruvalla" },
            { name: "Thrissur", slug: "thrissur" },
            { name: "Trivandrum", slug: "kerala-trivandrum" },
            { name: "Tripunithura", slug: "tripunithura" }
          ]
        },
        {
          name: "Tamil Nadu",
          slug: "tamil-nadu",
          centres: [
            { name: "Avadi", slug: "avadi" },
            { name: "Chengai", slug: "chengai" },
            { name: "Chennai", slug: "chennai" },
            { name: "Chettinadu", slug: "chettinadu" },
            { name: "Coimbatore", slug: "coimbatore" },
            { name: "Dharapuram", slug: "dharapuram" },
            { name: "Dindigul", slug: "dindigul" },
            { name: "Erode", slug: "erode" },
            { name: "Hosur", slug: "hosur" },
            { name: "Kalapakkam", slug: "kalapakkam" },
            { name: "Kallakurichi", slug: "kallakurichi" },
            { name: "Kanchipuram", slug: "kanchipuram" },
            { name: "Kanyakumari", slug: "kanyakumari" },
            { name: "Karur", slug: "karur" },
            { name: "Kodaikanal", slug: "kodaikanal" },
            { name: "Kumbakonam", slug: "kumbakonam" },
            { name: "Madhuranthakam", slug: "madhuranthakam" },
            { name: "Madurai", slug: "madurai" },
            { name: "Mayiladuthurai", slug: "mayiladuthurai" },
            { name: "Musiri", slug: "musiri" },
            { name: "Nagapattnam", slug: "nagapattnam" },
            { name: "Namakkal", slug: "namakkal" },
            { name: "Neyveli", slug: "neyveli" },
            { name: "Nilgiri", slug: "nilgiri" },
            { name: "Palani", slug: "palani" },
            { name: "Perambalur", slug: "perambalur" },
            { name: "Ponneri", slug: "ponneri" },
            { name: "Poonamallee", slug: "poonamallee" },
            { name: "Pudukkottai", slug: "pudukkottai" },
            { name: "Ramnathpuram", slug: "ramnathpuram" },
            { name: "Salem", slug: "salem" },
            { name: "Southern Chennai", slug: "southern-chennai" },
            { name: "Tambaram", slug: "tambaram" },
            { name: "Tenkasi", slug: "tenkasi" },
            { name: "Thanjavur", slug: "thanjavur" },
            { name: "Thenni", slug: "thenni" },
            { name: "Thiruporur", slug: "thiruporur" },
            { name: "Thiruthuraipoondi", slug: "thiruthuraipoondi" },
            { name: "Thiruvannamalai", slug: "thiruvannamalai" },
            { name: "Thiruvarur", slug: "thiruvarur" },
            { name: "Tiruchirapalli", slug: "tiruchirapalli" },
            { name: "Tirunelveli", slug: "tirunelveli" },
            { name: "Tirupur", slug: "tirupur" },
            { name: "Tiruvallur", slug: "tiruvallur" },
            { name: "Tuticorin", slug: "tuticorin" },
            { name: "Udumalpet", slug: "udumalpet" },
            { name: "Vellore", slug: "vellore" },
            { name: "Villupuram", slug: "villupuram" },
            { name: "Jayankondam", slug: "jayankondam" }
          ]
        },
        {
          name: "Union Territories",
          slug: "union-territories",
          centres: [
            { name: "Andaman & Nicobar", slug: "andaman-and-nicobar" },
            { name: "Karaikal", slug: "karaikal" },
            { name: "Pondicherry", slug: "pondicherry" }
          ]
        }
      ]
    },
    {
      name: "East Region",
      slug: "east-region",
      states: [
        {
          name: "Assam",
          slug: "assam",
          centres: [
            { name: "Guwahati", slug: "guwahati" },
            { name: "Silchar", slug: "silchar" },
            { name: "Tezpur", slug: "tezpur" }
          ]
        },
        {
          name: "Bihar",
          slug: "bihar",
          centres: [
            { name: "Danapur", slug: "danapur" },
            { name: "Patna", slug: "patna" }
          ]
        },
        {
          name: "Jharkhand",
          slug: "jharkhand",
          centres: [
            { name: "Adityapur", slug: "adityapur" },
            { name: "Dhanbad", slug: "dhanbad" },
            { name: "Hazaribagh", slug: "hazaribagh" },
            { name: "Jamshedpur", slug: "jamshedpur" },
            { name: "Ranchi", slug: "jharkhand-ranchi" }
          ]
        },
        {
          name: "Odisha",
          slug: "odisha",
          centres: [
            { name: "Bhubaneswar", slug: "bhubaneswar" }
          ]
        },
        {
          name: "West Bengal",
          slug: "west-bengal",
          centres: [
            { name: "Durgapur", slug: "durgapur" },
            { name: "Eastern (Calcutta)", slug: "eastern-calcutta" },
            { name: "Haldia", slug: "haldia" }
          ]
        }
      ]
    }
  ]
};

export const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "About BAI", path: "/about" },
      { label: "BAI Team 2026-27", path: "/team" },
      { label: "Trustees", path: "/trustees" },
      { label: "Past Presidents", path: "/past-presidents" },
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
  { label: "BAI Centres", path: "/centres", mega_menu: true },
  { label: "Publications", path: "/publications" },
  { label: "BAI Services", path: "/services" },
  { label: "Tenders", path: "/tenders" },
  { label: "BAI in Media", path: "/media" },
  { label: "Sponsors Inquiry", path: "/sponsors-inquiry" },
  { label: "Contact Us", path: "/contact" }
];

export const footerData = {
  logo: "/images/logo-white-02.png",
  office: {
    title: "Registered & Head Office:",
    address: "G-1/G-20, Commerce Centre, J. Dadajee Road, Tardeo, Mumbai-400034",
    tel: "(91-22) 23514802, 23520507",
    phone: "(91-22) 23521328",
    email: "baihq.mumbai@gmail.com"
  },
  quick_links: [
    { label: "About BAI", path: "/about" },
    { label: "BAI Team 2026-27", path: "/team" },
    { label: "Trustees", path: "/trustees" },
    { label: "Past Presidents", path: "/past-presidents" }
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
    { platform: "youtube", url: "https://www.youtube.com/@baihqmumbai/videos" },
    { platform: "linkedin", url: "https://in.linkedin.com/company/builders-association-of-india" },
    { platform: "twitter", url: "https://twitter.com/bainational" }
  ],
  copyright: "Copyright \u00a9 2026 BAI - Builders Association of India - All India Association of Civil Engineering Construction Contractors and Builders. All Rights Reserved."
};

export const aboutContent = {
  title: "About BAI",
  subtitle: "Builders Association of India",
  founded: "1941",
  paragraphs: [
    "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services, 'Poona', now known as 'Pune', who suggested that builders working under his command, form a body for finding solutions to various problems. He went further and made available a piece of land inside the premises of Southern Command Headquarters in Pune, on which an office was constructed and aptly named 'Jackson Hut', which stands even today as a monument in BAI's name.",
    "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 25,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members.",
    "Throughout its more than seven decades of existence, BAI has had its ups and downs, trials and tribulations, moments of strengths and weakness, moments of glory and disappointment. But, its umbrella has protected and furthered the cause of the Indian construction industry and its constituents in many ways."
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
    name: "BAI - Builders Association of India",
    address: "G-1/G-20, Commerce Centre, J. Dadajee Road, Tardeo, Mumbai-400034",
    tel: ["(91-22) 23514802", "(91-22) 23520507"],
    phone: "(91-22) 23521328",
    email: "baihq.mumbai@gmail.com"
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

export async function getCentresData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/centres`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Centres data:", err);
    return centresData;
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

export async function searchCentres(keyword, cityId) {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (cityId) params.append("city_id", cityId);
    
    const res = await fetchWithTimeout(`${API_BASE}/search?${params.toString()}`);
    if (!res.ok) throw new Error("Status " + res.status);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.warn("Using local fallback search for Centres:", err);
    const results = [];
    const kw = keyword ? keyword.toLowerCase().trim() : "";
    const city = cityId ? cityId.toLowerCase().trim() : "";
    
    for (const region of centresData.regions) {
      for (const state of region.states) {
        for (const centre of state.centres) {
          const centreName = centre.name.toLowerCase();
          const centreSlug = centre.slug.toLowerCase();
          const stateName = state.name.toLowerCase();
          const regionName = region.name.toLowerCase();
          
          const matchesKeyword = !kw || (centreName.includes(kw) || centreSlug.includes(kw) || stateName.includes(kw) || regionName.includes(kw));
          const matchesCity = !city || (centreName.includes(city) || centreSlug.includes(city));
          
          if (matchesKeyword && matchesCity) {
            results.push({
              name: centre.name,
              slug: centre.slug,
              state: state.name,
              region: region.name
            });
          }
        }
      }
    }
    return results;
  }
}

export const trusteesData = [
  { name: "Shri Lal Chand", role: "Chairman, Board of Trustees" },
  { name: "Shri J. P. Nayak", role: "Trustee" },
  { name: "Shri Muzaffar Ali", role: "Trustee" },
  { name: "Shri A. S. Raju", role: "Trustee" },
  { name: "Shri K. S. Kumar", role: "Trustee" },
  { name: "Shri Dr. Dharmesh Awasthi", role: "Trustee" }
];

export const committeesData = [
  { name: "Taxation Committee", chairman: "Shri Mahesh Mudda", desc: "Handles VAT, GST, and property tax indexes affecting construction companies." },
  { name: "Contracts & Tenders Committee", chairman: "Shri Kaushal Kumar Singh", desc: "Liaises with government departments on contract conditions and public tenders." },
  { name: "Materials & Price Index Committee", chairman: "Shri Sanjay Tyagi", desc: "Publishes index numbers for brick, cement, steel and logistics costs." },
  { name: "Labour & Welfare Committee", chairman: "Shri R. Prakash", desc: "Focuses on security, safety certifications, and insurance for construction workers." },
  { name: "Membership & Centres Committee", chairman: "Shri V. Satya Murthy", desc: "Manages coordination between 264+ local centers and handles index verification." }
];

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

export async function getTrusteesData() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/trustees`);
    if (!res.ok) throw new Error("Status " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Using local fallback for Trustees:", err);
    return trusteesData;
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

