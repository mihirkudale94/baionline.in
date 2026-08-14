# Hero carousel — Pune Centre's own photographs, shown clean with no text
# overlay. "alt" is never displayed; it is read by screen readers and search
# engines only. To change the carousel, swap the image paths below.
HERO_SLIDES = [
    {
        "id": 1,
        "image": "/images/events/event_builders-day-2025.jpg",
        "alt": "Builders' Day Celebration 2025 at BAI Pune Centre",
        "active": True
    },
    {
        "id": 2,
        "image": "/images/events/event_worker-children-felicitation-2025-1.jpg",
        "alt": "Felicitation of meritorious children of construction workers"
    },
    {
        "id": 3,
        "image": "/images/events/event_bridge-site-visit-1.jpg",
        "alt": "Technical site visit to a cable-stayed bridge construction project"
    },
    {
        "id": 4,
        "image": "/images/events/event_pmc-courtesy-visit-1.jpg",
        "alt": "Courtesy visit to the Pune Municipal Corporation"
    },
    {
        "id": 5,
        "image": "/images/events/event_industrial-facility-visit-1.jpg",
        "alt": "Members on an industrial facility visit"
    },
    {
        "id": 6,
        "image": "/images/events/event_central-bank-outreach-campaign.jpg",
        "alt": "Central Bank of India mega retail credit outreach campaign"
    }
]

STATS = [
    {"label": "Founded", "count": "1941"},
    {"label": "Office Bearers", "count": "5"},
    {"label": "Standing Committees", "count": "11"},
    {"label": "WBSC Editions", "count": "30"}
]

LEADERSHIP = {
    "president": {
        "name": "Ajay R. Gujar",
        "title": "Chairman BAI Pune",
        "image": "/images/Shri_Ajay_Gujar.jpg",
        "bio": "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services, 'Poona', now known as 'Pune', who suggested that builders working under his command, form a body for finding solutions to various problems. He went further and made available a piece of land inside the premises of Southern Command Headquarters in Pune, on which an office was constructed and aptly named 'Jackson Hut', which stands even today as a monument in BAI's name.",
        "bio_extended": "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 25,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members. Throughout its more than seven decades of existence, BAI has had its ups and downs, trials and tribulations, moments of strengths and weakness, moments of glory and disappointment. But, its umbrella has protected and furthered the cause of the Indian construction industry and its constituents in many ways."
    },
    "imm_past_president": {
        "name": "Rajaram Hajare",
        "title": "Vice Chairman BAI Pune",
        "image": "/images/Shri_Rajaram_Hajare.jpg",
        "bio": "Most executors of infrastructure development programmers and builders of real estate, i.e. the construction companies in India, are under the umbrella of the over-seven-decades-old Builders' Association of India (BAI). BAI is the only all India apex representative body of civil engineering construction companies. BAI was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services.",
        "bio_extended": "During this journey of over 85 years, BAI's membership has grown from 250 members spread over 3 Centres, to more than 20,000 plus direct members spread over about 264 plus Centres across the length and breadth of the country. Various regional associations affiliated to BAI, add another 2,00,000 indirect members."
    },
    "hon_secretary": {
        "name": "Dr. Mahesh Rathi",
        "title": "Secretary BAI Pune",
        "image": "/images/Shri_Mahesh_Rathi.jpg",
        "bio": "Secretary of Builders' Association of India Pune."
    },
    "hon_joint_secretary": {
        "name": "Sanjay Apte",
        "title": "Jt Secretary BAI Pune",
        "image": "/images/Shri_Sanjay_Apte.jpg",
        "bio": "Jt. Secretary of Builders' Association of India Pune."
    },
    "hon_treasurer": {
        "name": "Sushil N. Agarwal",
        "title": "Treasurer BAI Pune",
        "image": "/images/Shri_Sushil_Agarwal.jpg",
        "bio": "Treasurer of Builders' Association of India Pune."
    }
}

# The five regular activities of BAI Pune Centre. Mirrors `activities` in
# frontend/src/services/api.js and drives the "BAI Activities" dropdown.
ACTIVITIES = [
    {"slug": "technical-seminars", "title": "Technical Seminars"},
    {"slug": "site-visits", "title": "Industrial & Site Visits"},
    {"slug": "networking-meets", "title": "Networking Meets"},
    {"slug": "government-interaction", "title": "Government Interaction Programmes"},
    {"slug": "training-workshops", "title": "Training Workshops"}
]

# Must stay in step with `navLinks` in frontend/src/services/api.js — the
# navbar renders from that static list, and this is the API's copy of it.
NAV_LINKS = [
    {
        "label": "About",
        "path": "/about",
        "children": [
            {"label": "About BAI", "path": "/about"},
            {"label": "Past Office Bearers", "path": "/past-presidents"}
        ]
    },
    {
        "label": "Team",
        "path": "/team",
        "children": [
            {"label": "Office Bearers", "path": "/team"},
            {"label": "Executive Committee", "path": "/committees#executive"}
        ]
    },
    {
        "label": "BAI Activities Pune",
        "path": "/activities",
        "children": [
            {"label": a["title"], "path": "/activities#" + a["slug"]}
            for a in ACTIVITIES
        ]
    },
    {"label": "Social Activities", "path": "/social-activities"},
    {"label": "Events", "path": "/events"},
    {"label": "WBSC 2026", "path": "/wbsc-awards", "highlight": True},
    {"label": "Membership", "path": "/membership"},
    {
        "label": "Resources",
        "path": "#",
        "children": [
            {"label": "Publications", "path": "/publications"},
            {"label": "BAI Services", "path": "/services"},
            {"label": "Tenders", "path": "/tenders"},
            {"label": "BAI in Media", "path": "/media"},
            {"label": "Sponsors Inquiry", "path": "/sponsors-inquiry"}
        ]
    },
    {"label": "Contact Us", "path": "/contact"}
]

FOOTER_DATA = {
    "logo": "/images/logo-white-02.png",
    "office": {
        "title": "Pune Centre Office:",
        "address": "BAI's Padma Shri B G Shirke Activity Centre, Office No. 23, 24 & 25 \"Sangam\" Ph II, Near Sangam Bridge, Pune - 411001",
        "tel": "(020) 2605 9255",
        "phone": "(020) 2605 7441",
        "email": "baipune1@gmail.com"
    },
    "quick_links": [
        {"label": "About BAI", "path": "/about"},
        {"label": "Committees", "path": "/committees"},
        {"label": "Events", "path": "/events"},
        {"label": "WBSC Awards 2026", "path": "/wbsc-awards"},
        {"label": "Membership", "path": "/membership"},
        {"label": "Social Activities", "path": "/social-activities"},
        {"label": "Gallery", "path": "/media"},
        {"label": "Contact", "path": "/contact"}
    ],
    "notifications": [
        {"label": "Judgements", "path": "/judgements"},
        {"label": "Notifications", "path": "/notifications"},
        {"label": "Circular", "path": "/circular"}
    ],
    "useful_links": [
        {"label": "Privacy Policy", "path": "/privacy-policy"},
        {"label": "Terms & Conditions", "path": "/terms"},
        {"label": "Disclaimer", "path": "/disclaimer"}
    ],
    "social": [
        {"platform": "facebook", "url": "https://www.facebook.com/people/Builders-Association-of-India-Pune/61550732771835/"},
        {"platform": "instagram", "url": "https://www.instagram.com/baipunecentre/"},
        {"platform": "youtube", "url": "https://www.youtube.com/@buildersassociationofindia73"},
        {"platform": "linkedin", "url": "https://www.linkedin.com/in/builders-association-of-india-pune-21b37152/"}
    ],
    "copyright": "Copyright \u00a9 2026 BAI - Builders' Association of India, Pune Centre. All Rights Reserved."
}

ABOUT_CONTENT = {
    "title": "About BAI Pune Centre",
    "subtitle": "Builders' Association of India — Pune Centre",
    "founded": "1941",
    "paragraphs": [
        "Since its inception, the Builders' Association of India (BAI) Pune Centre has been one of India's most active construction industry associations, representing builders, contractors, consultants, engineers, developers, manufacturers and allied professionals.",
        "For decades, BAI Pune has served as a bridge between Government authorities and the construction fraternity while promoting quality construction, professional ethics, technical excellence and sustainable development.",
        "BAI itself was founded in 1941 under the guidance and blessings of Brig. C.V.S. Jackson of Military Engineering Services in 'Poona', now known as 'Pune', who suggested that builders working under his command form a body to find solutions to various problems. He made available a piece of land inside the premises of Southern Command Headquarters in Pune, on which an office was constructed and aptly named 'Jackson Hut', which stands even today as a monument in BAI's name — making Pune the very birthplace of the Association."
    ],
    "who_we_are": "The Builders' Association of India (BAI) is one of India's oldest and largest apex organizations of engineering construction contractors, builders, developers and infrastructure professionals. The Pune Centre actively works towards Industry Development, Knowledge Sharing, Technical Seminars, Skill Development, Government Representation, Infrastructure Advocacy, Networking Opportunities, Student Development and the Construction Excellence Award.",
    "mission": [
        "Promote excellence in construction.",
        "Encourage adoption of latest technologies.",
        "Develop skilled professionals.",
        "Strengthen collaboration between industry and academia.",
        "Represent industry concerns before Government authorities.",
        "Encourage safe, sustainable and innovative construction practices."
    ],
    "what_we_do": [
        {"title": "Technical Activities", "items": ["Seminars", "Workshops", "Technical Conferences", "Site Visits", "Knowledge Sessions"]},
        {"title": "Industry Representation", "items": ["Government Liaison", "Policy Discussions", "Industry Recommendations", "Statutory Representation"]},
        {"title": "Member Services", "items": ["Networking", "Business Opportunities", "Knowledge Resources", "Training Programs"]},
        {"title": "Student Initiatives", "items": ["Student Internship Programme (SIP)", "Industry Interaction", "Career Guidance"]},
        {"title": "Awards & Recognition", "items": ["Well Built Structure Competition (WBSC)", "Recognition of Construction Excellence"]}
    ],
    "why_join": [
        "Access to India's largest construction network",
        "Industry recognition",
        "Government interaction",
        "Business networking",
        "Technical knowledge",
        "Professional growth",
        "Leadership opportunities"
    ],
    "achievements": [
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
    "vision_statement": "To create a progressive, technically advanced and ethically driven construction industry that contributes to nation building through quality infrastructure.",
    "vision": [
        "To promote and foster feelings of brotherhood, unity, co-operation, and mutual trust, and to eliminate unhealthy competition amongst the contractors fraternity.",
        "To build public confidence in the construction industry by advocating ethics in the business through transparency and accountability.",
        "To establish healthy and cordial relationship between the client, the contractor and the end-users, so that all construction projects are completed without any time or cost over-runs.",
        "To interact with Government bodies like State PWDs and the CPWD to modernize specifications of works towards ensuring suitable work ethics.",
        "To achieve highest standards of efficiency and quality by adopting methodology derived from both Indian and International Standards.",
        "To ensure that contractors adopt methods which are environment-friendly like use of pre-engineered and pre-manufactured products.",
        "To regulate safety procedures and issue guidelines for minimizing loss of life or property at construction sites and enhance welfare of workers."
    ],
    "constitution_url": "https://www.baionline.in/public/frontend/pdf/BAI-RULES-AND-REGULATIONS-NEW-28th-November-2022.pdf",
    "brochure_url": "https://www.baionline.in/public/frontend/pdf/BAI-Brochure.pdf"
}

CONTACT_DATA = {
    "title": "Contact Us",
    "office": {
        "name": "BAI - Builders' Association of India, Pune Centre",
        "address": "BAI's Padma Shri B G Shirke Activity Centre, Office No. 23, 24 & 25 \"Sangam\" Ph II, Near Sangam Bridge, Pune - 411001",
        "tel": ["(020) 2605 9255", "(020) 2605 7441"],
        "phone": "(020) 2605 7441",
        "email": "baipune1@gmail.com"
    }
}

# Executive Committee 2026-27, exactly as declared in the Centre's
# "Constitution of Committees for the Year 2026-27" circular. The circular
# lists 24 members and names no office bearers; the office bearers live in
# LEADERSHIP and are shown on the Team page.
EXECUTIVE_COMMITTEE = {
    "term": "2026–27",
    "members": [
        "Mr. Sanjay D. Gaikwad",
        "Mr. Shivdatta Patane",
        "Mr. T. L. Mate",
        "Mr. Kirankant Dhiman",
        "Mr. Sidhram Sathe",
        "Mr. Ashok Atkekar",
        "Mr. S. B. Thorave",
        "Mr. D. S. Choudhari",
        "Mrs. Arati Bhat",
        "Mr. Ramesh Lal",
        "Mr. C. D. Rathod",
        "Mr. Shashikant K. Killedarpatil",
        "Miss Shweta Thakur",
        "Mr. Karan Pawar",
        "Mr. Madhur Daga",
        "Mrs. Jyoti Choughule",
        "Mr. Shivkumar Bhalla",
        "Mr. Bhalchandra Powar",
        "Mr. Rajendra Shelke",
        "Mr. Manikram Halbe",
        "Mr. Pradeep Garge",
        "Mr. Nandkumar Jethani",
        "Mr. Sunil Mate",
        "Mr. Mahesh Maideo"
    ]
}

# The circular's preamble and its seven general guidelines, verbatim.
COMMITTEE_GUIDELINES = {
    "subject": "Constitution of Committees for the Year 2026–27",
    "intro": "Based on the discussions held during the First General Body Meeting, the following "
             "committees have been constituted for the smooth functioning and effective execution "
             "of activities at the BAI Pune Centre for the year 2026–27.",
    "heading": "General Guidelines for All Committees",
    "lead": "All committee members are requested to adhere to the following guidelines:",
    "rules": [
        "Members should demonstrate a genuine willingness to contribute to BAI activities.",
        "Members must be able to devote adequate time to organizational responsibilities.",
        "A minimum of 75% attendance is mandatory for all meetings and events.",
        "Active participation and contribution to committee work is expected.",
        "Each committee may mutually select a Chairperson, who shall coordinate activities and report to BAI.",
        "The annual action plan should be submitted on or before 15th May 2026.",
        "A monthly progress report must be submitted by each committee."
    ],
    "closing": "All committee members are requested to actively participate and contribute towards "
               "achieving the objectives of the Centre. Your cooperation and commitment are essential "
               "for the success of our initiatives. We look forward to your continued support.",
    "signoff": "Builders' Association of India, Pune Centre"
}

# Committees and their members, exactly as listed in the circular.
#
# Spellings are reproduced per location, as the circular prints them. It is
# internally inconsistent for four people, so the same person appears under
# two spellings below — that is intentional, not a typo:
#   Ashok Ashtekar (SIP)       vs Ashok Atkekar (EC #6)
#   D. S. Chaudhari (Audit)    vs D. S. Choudhari (EC #8)
#   Manikrao Halbe (Grievance) vs Manikram Halbe (EC #20)
#   Shivdutta Patane (Seminar) / Shivdatt Patane (WBSC, Diary)
#                              / Shivdatta Patane (EC #2)
# Only the circular's missing word-spaces were closed up (JyotiChoughule ->
# Jyoti Choughule). Confirm with the Centre before unifying any of these.
COMMITTEES = [
    {"name": "Housing Committee", "members": [
        "Jyoti Choughule", "S. B. Thorave", "Mahesh Rathi",
        "Sanjay Apte", "Sidhram Sathe", "Sanjay Gaikwad"]},
    {"name": "Membership Committee", "members": [
        "Manoj Deshmukh", "Jyoti Choughule", "Shivkumar Bhalla", "Mahesh Rathi"]},
    {"name": "Youth Wing", "members": [
        "Madhur Daga", "Shweta Thakur", "Viha Chitroda", "Karan Pawar"]},
    {"name": "Seminar / Site Visit Committee", "members": [
        "Arati Bhat", "Shivdutta Patane", "Madhur Daga",
        "Rajendra Shelke", "Rajaram Hajare"]},
    {"name": "Office Renovation Committee", "members": [
        "Ranjeet More", "Manoj Deshmukh", "Kirankant Dhiman", "Sidhram Sathe",
        "Sanjay Apte", "Pradeep Garge", "Jagannath Jadhav", "T. L. Mate",
        "R. B. Krishnani", "Jyoti Choughule", "Mahesh Maideo", "Ajay Gujar"]},
    {"name": "WBSC Committee", "members": [
        "Sunil Mate", "Jagannath Jadhav", "Manoj Deshmukh",
        "Shivdatt Patane", "Madhur Daga"]},
    {"name": "Grievance Redressal Committee", "members": [
        "C. S. Parhar", "Pradeep Garge", "Manikrao Halbe"]},
    {"name": "Diary Committee", "members": [
        "Shivkumar Bhalla", "Shashikant Killedar Patil",
        "Shivdatt Patane", "Madhur Daga"]},
    {"name": "Media Committee", "members": [
        "Mahesh Rathi", "Nandkumar Jethani", "Ajay Gujar"]},
    {"name": "SIP Committee", "members": [
        "Ashok Ashtekar", "Shweta Thakur"]},
    {"name": "Internal Audit Committee", "members": [
        "D. S. Chaudhari"]}
]

# Complete list of 57 past chairmen from 1941 to 2026
PAST_PRESIDENTS = [
    {"year": "2025-2026", "name": "Dr. Dharmesh Awasthi"},
    {"year": "2024-2025", "name": "Shri Niwas Reddy"},
    {"year": "2023-2024", "name": "Shri R. S. Raghavan"},
    {"year": "2022-2023", "name": "Shri Suresh K. Patel"},
    {"year": "2021-2022", "name": "Shri Muzaffar Ali"},
    {"year": "2020-2021", "name": "Shri A. N. Prasad"},
    {"year": "2019-2020", "name": "Shri K. S. R. Murthy"},
    {"year": "2018-2019", "name": "Shri S. S. Dutta"},
    {"year": "2017-2018", "name": "Shri H. N. Vijaya Raghava Reddy"},
    {"year": "2016-2017", "name": "Shri B. Seenaiah"},
    {"year": "2015-2016", "name": "Shri Lal Chand"},
    {"year": "2014-2015", "name": "Shri J. P. Nayak"},
    {"year": "2013-2014", "name": "Shri M. R. Chandrasekhar"},
    {"year": "2012-2013", "name": "Shri K. S. Kumar"},
    {"year": "2011-2012", "name": "Shri A. P. Sinha"},
    {"year": "2010-2011", "name": "Shri G. K. Jain"},
    {"year": "2009-2010", "name": "Shri K. R. Shenoy"},
    {"year": "2008-2009", "name": "Shri S. L. Patel"},
    {"year": "2007-2008", "name": "Shri H. S. Kohli"},
    {"year": "2006-2007", "name": "Shri R. K. Bahl"},
    {"year": "2005-2006", "name": "Shri S. C. Gupta"},
    {"year": "2004-2005", "name": "Shri A. K. Sharma"},
    {"year": "2003-2004", "name": "Shri M. P. Jain"},
    {"year": "2002-2003", "name": "Shri D. R. Sen"},
    {"year": "2001-2002", "name": "Shri N. K. Roy"},
    {"year": "2000-2001", "name": "Shri P. K. Singh"},
    {"year": "1999-2000", "name": "Shri B. G. Shirke"},
    {"year": "1998-1999", "name": "Shri V. M. Patel"},
    {"year": "1997-1998", "name": "Shri K. L. Rao"},
    {"year": "1996-1997", "name": "Shri A. S. Chinnaswamy Raju"},
    {"year": "1995-1996", "name": "Shri H. S. Pasricha"},
    {"year": "1994-1995", "name": "Shri B. R. Kohli"},
    {"year": "1993-1994", "name": "Shri S. S. Bhalerao"},
    {"year": "1992-1993", "name": "Shri M. S. Reddy"},
    {"year": "1991-1992", "name": "Shri G. S. Rao"},
    {"year": "1990-1991", "name": "Shri R. L. Gupta"},
    {"year": "1989-1990", "name": "Shri S. K. Mukherjee"},
    {"year": "1988-1989", "name": "Shri P. D. Patel"},
    {"year": "1987-1988", "name": "Shri K. L. Sahgal"},
    {"year": "1986-1987", "name": "Shri J. R. Dutt"},
    {"year": "1985-1986", "name": "Shri H. S. Bakshi"},
    {"year": "1984-1985", "name": "Shri R. L. Patel"},
    {"year": "1983-1984", "name": "Shri S. S. Sandhu"},
    {"year": "1982-1983", "name": "Shri B. P. Maurya"},
    {"year": "1981-1982", "name": "Shri S. P. Gupta"},
    {"year": "1980-1981", "name": "Shri K. K. Madhok"},
    {"year": "1970-1980", "name": "Shri L. A. N. Khokha"},
    {"year": "1960-1970", "name": "Shri S. Sant Singh"},
    {"year": "1955-1960", "name": "Shri T. C. Goyala"},
    {"year": "1950-1955", "name": "Shri B. R. Kohli"},
    {"year": "1948-1950", "name": "Shri Rajesh Bahl"},
    {"year": "1946-1948", "name": "Shri S. S. Takra"},
    {"year": "1944-1945", "name": "Shri Ranade"},
    {"year": "1943-1944", "name": "Shri E. M. Billmoria"},
    {"year": "1942-1943", "name": "Shri Motichand G. Shah"},
    {"year": "1941-1942", "name": "Shri M. P. Shah"}
]

# BAI Pune Centre's own honour roll, transcribed from the office bearer display
# boards at the Centre. The first three roles are Head Quarters (national) posts
# held by Pune Centre members; the rest are Centre-level posts. Chairman and Hon.
# Secretary come from two boards each — "1941-2011: 70 years" and the 2012-2027
# board — though the 70-year boards only start recording names from 1959.
# Vice Chairman and Treasurer have no display board yet, so they stay empty and
# render an "records being compiled" state on /past-presidents.
PUNE_OFFICE_BEARERS = {
    "note": "Transcribed from the office bearer display boards at BAI Pune Centre. Chairman and Hon. Secretary records begin in 1959 — earlier years are not listed on the boards.",
    "roles": [
        {
            "id": "hq_president",
            "label": "HQ President",
            "members": [
                {"year": "1991-1992", "name": "Lalit Sangtani"},
                {"year": "1978-1980", "name": "Harbans Lal Aurora"}
            ]
        },
        {
            "id": "hq_vice_president",
            "label": "HQ Vice President (West Zone)",
            "members": [
                {"year": "2016-2017", "name": "Dr. Rajeev B. Krishnani"},
                {"year": "2012-2013", "name": "Ranjeet More"},
                {"year": "2007-2008", "name": "Kishan P. Baney"},
                {"year": "1999-2000", "name": "Amar Mulchandani"},
                {"year": "1996-1997", "name": "Madhavrao Jog"},
                {"year": "1990-1991", "name": "D. S. Vajram"}
            ]
        },
        {
            "id": "state_chairman",
            "label": "State Chairman (Maharashtra)",
            "members": [
                {"year": "2025-2026", "name": "Jagannath S. Jadhav"},
                {"year": "2014-2015", "name": "Neelkanth S. Joshi"},
                {"year": "2005-2006", "name": "Jassu Panjwani"}
            ]
        },
        {
            "id": "chairman",
            "label": "Centre Chairman",
            "members": [
                {"year": "Apr 2026 – Mar 2027", "name": "Ajay R. Gujar"},
                {"year": "Apr 2025 – Mar 2026", "name": "Ajay R. Gujar"},
                {"year": "Apr 2024 – Mar 2025", "name": "Sunil Mate"},
                {"year": "Apr 2023 – Mar 2024", "name": "D. S. Chaudhari"},
                {"year": "Apr 2022 – Mar 2023", "name": "H. S. Anand"},
                {"year": "Apr 2021 – Mar 2022", "name": "Ashok Atkekar"},
                {"year": "Apr 2020 – Mar 2021", "name": "Jai Pinjani"},
                {"year": "Apr 2019 – Mar 2020", "name": "Manoj Deshmukh"},
                {"year": "Apr 2018 – Mar 2019", "name": "Pradeep Garge"},
                {"year": "Apr 2017 – Mar 2018", "name": "Jagannath S. Jadhav"},
                {"year": "Apr 2016 – Mar 2017", "name": "Siddharth Shah"},
                {"year": "Apr 2015 – Mar 2016", "name": "Mahesh Mirani"},
                {"year": "Apr 2014 – Mar 2015", "name": "R. B. Suryavanshi"},
                {"year": "Apr 2013 – Mar 2014", "name": "C. S. Parhar"},
                {"year": "Apr 2012 – Mar 2013", "name": "Jaideep Raje"},
                {"year": "Apr 2011 – Mar 2012", "name": "Subhash Deshpande"},
                {"year": "Apr 2009 – Mar 2011", "name": "Ranjeet More"},
                {"year": "Apr 2008 – Mar 2009", "name": "Neelkanth S. Joshi"},
                {"year": "Apr 2007 – Mar 2008", "name": "Dr. Rajeev B. Krishnani"},
                {"year": "Apr 2006 – Mar 2007", "name": "Sanjay Vaichal"},
                {"year": "Apr 2005 – Mar 2006", "name": "S. G. Moorjani"},
                {"year": "Apr 2003 – Mar 2005", "name": "Vishwas Lokare"},
                {"year": "Jul 2002 – Mar 2003", "name": "Naren Kothari"},
                {"year": "Apr 2001 – Jul 2002", "name": "Manikram Halbe"},
                {"year": "Apr 1999 – Mar 2001", "name": "D. S. Shirole"},
                {"year": "Apr 1998 – Mar 1999", "name": "S. I. Chunkhare"},
                {"year": "Apr 1997 – Mar 1998", "name": "S. M. Mehta"},
                {"year": "Apr 1996 – Mar 1997", "name": "Jassu Panjwani"},
                {"year": "Jun 1995 – Mar 1996", "name": "K. M. Jain"},
                {"year": "Apr 1994 – Jun 1995", "name": "J. P. Shroff"},
                {"year": "Oct 1992 – Mar 1994", "name": "Kumar Vaswani"},
                {"year": "Apr 1990 – Sep 1992", "name": "Amar Mulchandani"},
                {"year": "Apr 1989 – Mar 1990", "name": "H. B. Punjabi"},
                {"year": "Apr 1988 – Mar 1989", "name": "N. V. Kanetkar"},
                {"year": "Apr 1987 – Mar 1988", "name": "R. R. Dhoot"},
                {"year": "Apr 1985 – Mar 1987", "name": "D. S. Vajram"},
                {"year": "Apr 1983 – Mar 1985", "name": "Kishan P. Baney"},
                {"year": "Apr 1981 – Mar 1983", "name": "J. S. Khalsa"},
                {"year": "Apr 1980 – Mar 1981", "name": "Lalit Sangtani"},
                {"year": "Mar 1978 – Mar 1980", "name": "Raisahib P. Gera"},
                {"year": "1977", "name": "B. N. Shah"},
                {"year": "1976", "name": "Raisahib P. Gera"},
                {"year": "Jun 1975 – Dec 1975", "name": "S. K. Arunachalam"},
                {"year": "1974–1975", "name": "Harbans Lal Aurora"},
                {"year": "1972–1974", "name": "Raisahib P. Gera"},
                {"year": "1970–1971", "name": "G. K. Sharotri"},
                {"year": "1969", "name": "Wadhumal Shahaney"},
                {"year": "1968", "name": "Atur Sangtani"},
                {"year": "1967", "name": "A. U. Mansukhani"},
                {"year": "1966", "name": "Col. V. P. Kapur"},
                {"year": "1965", "name": "Raisahib P. Gera"},
                {"year": "1963–1964", "name": "Harbans Lal Aurora"},
                {"year": "1959–1962", "name": "K. J. Sapra"}
            ]
        },
        {
            "id": "secretary",
            "label": "Centre Hon. Secretary",
            "members": [
                {"year": "Apr 2026 – Mar 2027", "name": "Dr. Mahesh Rathi"},
                {"year": "Apr 2025 – Mar 2026", "name": "C. H. Ratlani"},
                {"year": "Apr 2024 – Mar 2025", "name": "Rajaram Hajare"},
                {"year": "Apr 2023 – Mar 2024", "name": "Ajay R. Gujar"},
                {"year": "Apr 2022 – Mar 2023", "name": "Ajay R. Gujar"},
                {"year": "Apr 2021 – Mar 2022", "name": "H. S. Anand"},
                {"year": "Apr 2020 – Mar 2021", "name": "H. S. Anand"},
                {"year": "Apr 2019 – Mar 2020", "name": "Sanjay Apte"},
                {"year": "Apr 2018 – Mar 2019", "name": "Ashok Atkekar"},
                {"year": "Apr 2017 – Mar 2018", "name": "Manoj Deshmukh"},
                {"year": "Apr 2016 – Mar 2017", "name": "Manoj Deshmukh"},
                {"year": "Apr 2015 – Mar 2016", "name": "Jagannath S. Jadhav"},
                {"year": "Apr 2014 – Mar 2015", "name": "Nandkumar Jethani"},
                {"year": "Apr 2013 – Mar 2014", "name": "Jaikishan Pinjani"},
                {"year": "Apr 2012 – Mar 2013", "name": "Mahesh Mirani"},
                {"year": "Apr 2011 – Mar 2012", "name": "Nandkumar Jethani"},
                {"year": "Apr 2010 – Mar 2011", "name": "Mahesh Mirani"},
                {"year": "Apr 2009 – Mar 2010", "name": "Jaikishan Pinjani"},
                {"year": "Apr 2008 – Mar 2009", "name": "Mahesh Mirani"},
                {"year": "Apr 2007 – Mar 2008", "name": "D. S. Chaudhari"},
                {"year": "Apr 2006 – Mar 2007", "name": "Neelkanth S. Joshi"},
                {"year": "Apr 2005 – Mar 2006", "name": "Shivkumar Bhalla"},
                {"year": "Apr 2003 – Mar 2005", "name": "S. G. Moorjani"},
                {"year": "Jul 2002 – Mar 2003", "name": "Sanjay Vaichal"},
                {"year": "Apr 2001 – Jul 2002", "name": "Neelkanth S. Joshi"},
                {"year": "Apr 1999 – Mar 2001", "name": "Manikram Halbe"},
                {"year": "Apr 1997 – Mar 1999", "name": "Neelkanth S. Joshi"},
                {"year": "Apr 1996 – Mar 1997", "name": "Manikram Halbe"},
                {"year": "Apr 1994 – Mar 1996", "name": "S. I. Chunkhare"},
                {"year": "Apr 1993 – Mar 1994", "name": "Jassu Panjwani"},
                {"year": "Apr 1990 – Mar 1993", "name": "J. P. Shroff"},
                {"year": "Apr 1989 – Mar 1990", "name": "Kumar Vaswani"},
                {"year": "Apr 1988 – Mar 1989", "name": "V. K. Khinvsara"},
                {"year": "Apr 1987 – Mar 1988", "name": "N. V. Kanetkar"},
                {"year": "Apr 1985 – Mar 1987", "name": "Amar Mulchandani"},
                {"year": "Apr 1983 – Mar 1985", "name": "R. R. Dhoot"},
                {"year": "Apr 1981 – Mar 1983", "name": "Mohan Lal Mathrani"},
                {"year": "Apr 1980 – Mar 1981", "name": "Kishan P. Baney"},
                {"year": "Mar 1978 – Mar 1980", "name": "N. S. Rangaswamy"},
                {"year": "1977", "name": "B. G. Mahajan"},
                {"year": "1976", "name": "D. G. Gupta"},
                {"year": "1974–1975", "name": "Kumar Gera"},
                {"year": "1972–1973", "name": "S. K. Arunachalam"},
                {"year": "1969–1971", "name": "R. V. Joshi"},
                {"year": "1968", "name": "G. K. Sharotri"},
                {"year": "1967", "name": "R. M. Shah"},
                {"year": "1966", "name": "N. V. Sanghavi"},
                {"year": "1965", "name": "A. U. Mansukhani"},
                {"year": "1964", "name": "Col. V. P. Kapur"},
                {"year": "1959–1963", "name": "Raisahib P. Gera"}
            ]
        },
        {"id": "vice_chairman", "label": "Centre Vice Chairman", "members": []},
        {"id": "treasurer", "label": "Centre Treasurer", "members": []}
    ]
}

# Commemorative plaque for the Centre's Platinum Jubilee (1941-2015), listing the
# office bearers of that year plus the celebration's organising committee.
PLATINUM_JUBILEE_2015 = {
    "title": "Platinum Jubilee Celebration",
    "subtitle": "75 Years · 1941–2015",
    "office_bearers": [
        {"name": "Mahesh R. Mirani", "role": "Chairman"},
        {"name": "Siddharth J. Shah", "role": "Vice Chairman"},
        {"name": "Jagannath S. Jadhav", "role": "Hon. Secretary"},
        {"name": "Manoj Deshmukh", "role": "Hon. Jt. Secretary"},
        {"name": "C. H. Ratlani", "role": "Hon. Treasurer"}
    ],
    "organising_committee": [
        "R. B. Suryavanshi", "Neelkanth S. Joshi", "S. I. Chunkhare", "Jaideep Raje",
        "C. S. Parhar", "D. S. Shirole", "Subhash Deshpande", "Jai Pinjani",
        "Shivkumar Bhalla"
    ]
}

ANNOUNCEMENTS = [
    {
        "title": 'BAI takes steps to file Writ Petitions for inclusion of Arbitration Clause in contracts',
        "pdf": 'https://www.baionline.in/storage/announcement/m7Gzw8AKaqSDf3cScwZ61sWyopX2JIk54pceDeBl61hRiqSmzAsyq91sMcxO.pdf',
        "desc": 'Those members who want a copy of Enclosures, please write to BAI HQ on our email: baihq.mumbai@gmail.com, raju_john_in@yahoo.co.uk and the same will be sent by email.'
    },
    {
        "title": 'BAI’s 84th Annual Report (2024–2025)',
        "pdf": 'https://www.baionline.in/storage/announcement/250726WithoutAuditReport84thAnnualReportBAI2024202525Jul2025.pdf',
        "desc": 'Those members who want a copy of Audited Accounts, please write to BAI HQ on our email: baihq.mumbai@gmail.com, raju_john_in@yahoo.co.uk and the same will be sent by email.',
        "image": '/images/84thAnnualReportBAI.webp'
    }
]

EVENTS = [
    {
        "title": "Builders' Day Celebration 2025 — BAI Pune Centre",
        "date": "December 2025",
        "venue": "Pune",
        "image": "/images/events/event_builders-day-2025.jpg"
    },
    {
        "title": "Satkar Samarambh — Felicitation of Meritorious Children of Construction Workers",
        "date": "14th November 2025",
        "venue": "Pune",
        "image": "/images/events/event_worker-children-felicitation-2025-1.jpg"
    },
    {
        "title": "BAI NATIONAL Managing Committee & General Council Meeting 2025-26",
        "date": "27th & 28th February 2026",
        "venue": "Padmaja Palam Groves Resorts, Near Hyderabad Airport, Hyderabad",
        "image": "/images/event_mcgc_meet.webp"
    },
    {
        "title": "SPONSORSHIP APPEAL for BAI 4th MC/GC Meeting 2025-26",
        "date": "27th & 28th February 2026",
        "venue": "Padmaja Palam Groves Resorts, Near Hyderabad Airport, Hyderabad",
        "image": "/images/event_sponsorship.webp"
    },
    {
        "title": "BAI SPORTS LEAGUE 2026",
        "date": "Saturday 21st February 2026",
        "venue": "United Sports Center, Kakkanad, Kochi",
        "image": "/images/event_sports_league.webp"
    },
    {
        "title": "BAI's 32nd All India Builders Convention",
        "date": "7th, 8th & 9th January 2026",
        "venue": "Dr. Shyama Prasad Mukherjee Indoor Stadium, Goa, India",
        "image": "/images/event_goa_convention.webp"
    },
    {
        "title": "2nd Mumbai Redevelopment Summit 2025",
        "date": "17th December 2025",
        "venue": "Courtyard by Marriott, Mumbai, India",
        "image": "/images/event_redev_summit.webp"
    },
    {
        "title": "3rd MC-GC Meeting",
        "date": "20th - 21st November 2025",
        "venue": "CIAL Convention Centre, Kochi",
        "image": "/images/event_kochi_meeting.jpg"
    }
]

NEWS_TICKER = [
    {"text": "Letter to Shri Narendra Modi,PM of India regarding abnormal Cement and Steel Price Increase", "link": "https://www.baionline.in/public/frontend/pdf/Shri-Narendra-Modi-ji-Hon-PM-of-India-Letter.pdf"},
    {"text": "Letter to Smt Nirmala Sitharaman Ji, FM of India regarding MSME 45-days clause", "link": "https://www.baionline.in/public/frontend/pdf/MSME-Smt-Nirmala-Sitharaman-Ji-MSME-45-days-clause-Letter.pdf"},
    {"text": "BAI Representation Abnormal Increase in Construction Materials", "link": "https://www.baionline.in/public/frontend/pdf/bai-representation-abnormal-increase-in-construction-materials--20.04.2022.pdf"},
    {"text": "Delhi Press Clippings - Union Ministry Communique", "link": "https://www.baionline.in/public/frontend/pdf/delhi-press-clippings.pdf"},
    {"text": "Maharashtra Press Clippings - Union Ministry Communique", "link": "https://www.baionline.in/public/frontend/pdf/maharashtra-press-clippings.pdf"},
    {"text": "Ahmedabad Press Clippings - Union Ministry Communique", "link": "https://www.baionline.in/public/frontend/pdf/ahmedabad-press-clippings.pdf"}
]

INDIAN_CONSTRUCTION = {
    "title": "Indian Construction",
    "subtitle": "Monthly Bulletin of Builders Association of India",
    "desc": "‘INDIAN CONSTRUCTION’ is the monthly bulletin of BUILDERS’ ASSOCIATION OF INDIA (BAI) established in 1941. It is circulated to all BAI members, senior officials of Central and State Government departments, World Bank, ADB, and global IFAWPCA chapters.",
    "cover_image": "/images/ICJ_APRIL_2026.webp",
    "pdf_view_link": "https://online.fliphtml5.com/huzbb/IC-April-2026/",
    "links": {
        "advertise": "https://www.baionline.in/indianconstruction",
        "archives": "https://www.baionline.in/archives",
        "subscribe": "https://www.baionline.in/public/frontend/pdf/Indian_Construction_Subscription_Form_2022-23.pdf"
    }
}

SOCIAL_ACTIVITIES_DATA = {
    "title": "Social & CSR Initiatives",
    "subtitle": "Empowering Communities & Building a Sustainable Construction Ecosystem",
    "overview": "At Builders' Association of India (BAI) Pune Centre, we believe that true development goes hand-in-hand with social responsibility. Beyond concrete and steel, our mission is to uplift the lives of construction workers, support the local community, foster sustainable environmental practices, and train the next generation of builders.",
    "stats": [
        {"value": "50+", "label": "Medical & Safety Camps"},
        {"value": "5,000+", "label": "Workers Vaccinated"},
        {"value": "10,000+", "label": "Tree Saplings Planted"},
        {"value": "1,200+", "label": "Students Mentored (SIP)"}
    ],
    "csrInitiatives": [
        {
            "title": "Worker Health & Safety Camps",
            "description": "We host regular healthcare programs, eye check-up drives, and multi-speciality medical camps directly at construction sites across Pune. Laborers receive diagnostic testing, free basic medicines, safety guidelines, and health awareness counseling.",
            "icon": "FaHandsHelping"
        },
        {
            "title": "Safety Helmet & PPE Distribution",
            "description": "Ensuring zero-accident sites is our top priority. We organize safety drives to distribute free personal protective equipment (PPE), including ISI-marked safety helmets, reflective jackets, safety gloves, and reinforced boots to construction workers.",
            "icon": "FaTools"
        },
        {
            "title": "Educational Sponsorships",
            "description": "We believe in breaking the cycle of poverty. BAI Pune provides financial aid, study kits, and educational sponsorships to the children of site laborers, enabling them to attend schools and colleges and build brighter futures.",
            "icon": "FaGraduationCap"
        }
    ],
    "outreachPrograms": [
        {
            "title": "Student Internship Programme (SIP)",
            "description": "Our landmark program bridges the gap between academic theory and practical construction. We place engineering, architectural, and project management students on active sites under the guidance of experienced BAI mentors.",
            "duration": "Ongoing (Annual)",
            "target": "Civil & Arch Students",
            "image": "/images/events/event_committee-meeting-office.jpg"
        },
        {
            "title": "Kaushalya Vardhan Skill Development",
            "description": "Free vocational training workshops for young and unskilled workers. We provide training in masonry, bar-bending, plumbing, safety operations, and digital basic skills to enhance employability.",
            "duration": "Quarterly Drives",
            "target": "Youth & Unskilled Laborers",
            "image": "/images/events/event_industrial-facility-visit-1.jpg"
        },
        {
            "title": "Annual Blood Donation Drives",
            "description": "BAI Pune collaborates with leading blood banks and hospitals to organize community blood donation camps. Members, staff, and construction professionals actively participate to support local emergency reserves.",
            "duration": "Every Independence Day",
            "target": "General Public & Members",
            "image": "/images/events/event_central-bank-outreach-campaign.jpg"
        }
    ],
    "sustainabilityCampaigns": [
        {
            "title": "Vriksharopan (Tree Plantation)",
            "description": "To combat urban heat and reduce the carbon footprint of development, our green committee leads tree plantation drives. We target areas around major construction projects, public parks, and highways, planting indigenous tree species suited to Pune's ecology.",
            "impact": "10k+ saplings planted & maintained"
        },
        {
            "title": "Rainwater Harvesting & Water Security",
            "description": "Water scarcity is a major concern. We run awareness campaigns and provide technical consulting to housing societies and developer projects on installing efficient rainwater harvesting and groundwater recharging systems.",
            "impact": "50+ societies consulted"
        }
    ],
    "disasterRelief": {
        "title": "Disaster Response & Civic Aid",
        "description": "In times of crisis, BAI Pune stands at the forefront. During the COVID-19 pandemic, we established temporary relief shelters, supplied thousands of ration kits, face masks, and sanitizers, and facilitated safe transit for migrant laborers. Similarly, we mobilize machinery (like excavators and trucks) and dry rations to assist the civic administration during monsoon flooding in low-lying areas of Pune.",
        "image": "/images/events/event_worker-children-felicitation-2025-1.jpg"
    }
}


