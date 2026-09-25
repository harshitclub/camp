export const eventCategories = [
  { id: "all", label: "All Events & Workshops" },
  { id: "ai_ml", label: "Generative AI & Data Science" },
  { id: "data_analytics", label: "Data Analytics & BI" },
  { id: "development", label: "Flutter & Web Dev" },
  { id: "internship_training", label: "Summer Training Batches" },
  { id: "career_softskills", label: "Aptitude & Personality Dev" },
  { id: "conferences", label: "Conferences & Keynotes" },
];

export const allEvents = [
  {
    id: "mongodb_training",
    title: "MongoDB & NoSQL Modern Database Architecture Training",
    subtitle: "Schema Design, Aggregation Pipelines, Indexing & Cloud Atlas Integration",
    category: "development",
    categoryLabel: "Database & Backend",
    date: "February 2025",
    location: "Dehradun",
    attendees: "100+ Students",
    badge: "MongoDB Masterclass",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544439/IMG20250221145908_mvtotw.jpg",
    description: "Comprehensive practical training bootcamp in Dehradun diving into NoSQL database architecture, high-performance aggregation pipelines, schema modeling, document indexing, and cloud database operations with MongoDB Atlas.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544439/IMG20250221145908_mvtotw.jpg",
        caption: "Interactive live session on MongoDB schema design and query optimization in Dehradun."
      },
      // {
      //   id: 2,
      //   url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544438/IMG20250218110444_kibegl.jpg",
      //   caption: "Students following along with real-time NoSQL document modeling and database operations."
      // },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544438/IMG20250221145731_pfzkxs.jpg",
        caption: "Auditorium walkthrough of complex aggregation pipelines and indexing strategies."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544437/IMG_9644_ukmmy2.jpg",
        caption: "Hands-on coding lab sprints connecting MongoDB Atlas with backend APIs."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544437/IMG20250218110329_m0f5id.jpg",
        caption: "Facilitator mentoring students on database performance tuning and query execution plans."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544440/IMG20250225113331_lzxaxu.jpg",
        caption: "Engaged cohort completing milestone NoSQL projects and certification sprint."
      },
    ]
  },
  {
    id: "gen_ai",
    title: "Generative AI & LLM Engineering Hands-on Sprints",
    subtitle: "Mastering Autonomous Agents, Prompt Engineering & RAG Pipelines",
    category: "ai_ml",
    categoryLabel: "Generative AI",
    date: "July 2025",
    location: "Partner University Campus",
    attendees: "100+ Students",
    badge: "GenAI Masterclass",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896899/IMG_6998_nml1wl.jpg",
    description: "Intensive offline masterclass and live lab sprints exploring LLMs, LangChain architectures, vector retrieval databases, and practical OpenAI integrations for college students across computing and data streams.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896899/IMG_6998_nml1wl.jpg",
        caption: "Live coding demonstration on Generative AI pipelines and agentic workflows."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896896/IMG_7008_kjmlj5.jpg",
        caption: "Auditorium engagement and interactive Q&A on real-world AI applications."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896894/IMG_7005_say8lv.jpg",
        caption: "Students deploying their initial custom prompt agents."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896894/IMG_6989_l6okkx.jpg",
        caption: "Step-by-step architectural breakdown of RAG and vector embeddings."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896893/IMG_6973_sgz7i8.jpg",
        caption: "Collaborative problem-solving sprint among participating teams."
      },
    ]
  },
  {
    id: "ai_ds",
    title: "Artificial Intelligence & Data Science Campus Masterclass",
    subtitle: "Transforming Raw Data into Predictive Intelligence",
    category: "ai_ml",
    categoryLabel: "AI & Data Science",
    date: "July 2025",
    location: "Partner University Campus",
    attendees: "100+ Attendees",
    badge: "Campus Bootcamp",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897939/IMG_6930_xmps7e.jpg",
    description: "Full-day campus seminar on modern predictive modeling, computer vision foundations, deep learning frameworks, and industry AI career roadmaps.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897939/IMG_6930_xmps7e.jpg",
        caption: "Keynote presentation addressing full hall of university tech aspirants."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897910/IMG_6926_imh4iv.jpg",
        caption: "Live architecture analysis of convolutional neural networks."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897908/IMG_6919_uihudd.jpg",
        caption: "Interactive doubt-clearing session on AI project portfolio building."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897909/IMG_6921_zowouh.jpg",
        caption: "Student cohort participating in real-time statistical modeling."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897907/IMG_6916_vaxlyp.jpg",
        caption: "Facilitator sharing enterprise insights with aspiring engineers."
      },
    ]
  },
  {
    id: "da_using_pb_ae",
    title: "Data Analytics Bootcamp: Power BI & Advanced MS Excel",
    subtitle: "Enterprise BI Dashboards, DAX Modeling & Business Insights",
    category: "data_analytics",
    categoryLabel: "Data Analytics",
    date: "July 2025",
    location: "Partner University Campus",
    attendees: "180+ Analysts",
    badge: "Hands-on Workshop",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896389/IMG-20250731-WA0000_mntogx.jpg",
    description: "Practical laboratory workshop taking learners through automated Power Query ETL workflows, complex DAX measures, and high-impact executive visual dashboards.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896389/IMG-20250731-WA0000_mntogx.jpg",
        caption: "Live dashboard demonstration on interactive retail analytics."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896390/IMG_9780_vz8gbz.jpg",
        caption: "One-on-one debugging of advanced formula modeling."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896389/IMG_9783_v6ofsy.jpg",
        caption: "Students designing custom KPI dashboards in Microsoft Power BI."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896388/IMG_9736_ivtewb.jpg",
        caption: "Explaining DAX calculation context and filter hierarchies."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754896387/IMG_9726_h1saot.jpg",
        caption: "Cohort group reviewing capstone financial analysis dashboards."
      },
    ]
  },
  {
    id: "dartFlutterTraining",
    title: "Dart & Flutter Mobile App Development Bootcamp",
    subtitle: "Cross-Platform iOS & Android Engineering with Cloud APIs",
    category: "development",
    categoryLabel: "Flutter & Mobile",
    date: "June 2025",
    location: "Partner University Computer Laboratories",
    attendees: "150+ App Developers",
    badge: "Tech Bootcamp",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754895673/IMG-20250630-WA0002_d63d8r.jpg",
    description: "Intensive training series teaching state management, async Dart concepts, responsive mobile UI widgets, and REST API consumption with Firebase authentication.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754895673/IMG-20250630-WA0002_d63d8r.jpg",
        caption: "Live mobile app architecture setup using Flutter widgets."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754895673/IMG-20250630-WA0003_x5hido.jpg",
        caption: "Code review and responsive screen layout debugging."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754895673/IMG_9252_wihmkd.jpg",
        caption: "Students testing app builds directly on connected physical devices."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754895671/IMG_9246_nyxhyp.jpg",
        caption: "Explaining stateful widgets and reactive state managers."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754895670/IMG_9242_wkoywi.jpg",
        caption: "Cohort group finalizing their multi-screen e-commerce capstones."
      },
    ]
  },
  {
    id: "summer_training",
    title: "Summer Internship & Industrial Training Programs",
    subtitle: "Project Sprints, Git PR Reviews & Verified Certification",
    category: "internship_training",
    categoryLabel: "Summer Training",
    date: "August 2025",
    location: "Partner University Campus",
    attendees: "100+ Interns",
    badge: "Flagship Batch",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638800/IMG-20250804-WA0039_ytqt6h.jpg",
    description: "Annual flagship summer training and internship cohorts where learners completed 8-12 weeks of structured software, data, and design sprint deliverables.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638800/IMG-20250804-WA0039_ytqt6h.jpg",
        caption: "Cohort gathering for milestone evaluations and project presentations."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638798/IMG-20250804-WA0036_i1u86o.jpg",
        caption: "Interactive peer code reviews and architectural walkthroughs."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638796/IMG-20250804-WA0025_m0m6te.jpg",
        caption: "Senior mentor providing 1:1 project refinement advice."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638794/IMG-20250804-WA0021_nsi20c.jpg",
        caption: "Hands-on terminal configuration and cloud deployment assistance."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638792/IMG-20250804-WA0014_ixn0ld.jpg",
        caption: "Interns defending their capstone applications during final sprint."
      },

    ]
  },
  {
    id: "internationalConf",
    title: "International Tech Conference & Thought Leadership",
    subtitle: "Industry Trends, Digital Transformation & Corporate Careers",
    category: "conferences",
    categoryLabel: "Conferences",
    date: "April 2025",
    location: "Partner University Campus",
    attendees: "200+ Delegates",
    badge: "Keynote & Summit",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638651/IMG-20250422-WA0016_illpib.jpg",
    description: "International tech symposium bringing together university chancellors, industry tech leads, and student innovators to discuss emerging frontiers in technology.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638651/IMG-20250422-WA0016_illpib.jpg",
        caption: "Keynote presentation on bridging academic curriculums and corporate demands."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638650/IMG-20250422-WA0009_jj3b7d.jpg",
        caption: "Fireside discussion with technology leaders and academic dignitaries."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638648/IMG-20250422-WA0008_p4ihrl.jpg",
        caption: "Audience engaging during the tech innovation debate."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638647/IMG-20250422-WA0004_ghquav.jpg",
        caption: "Honoring academic contributors and student research authors."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638645/IMG-20250422-WA0002_dpy51c.jpg",
        caption: "Conference inauguration and lighting of the inaugural lamp."
      },
    ]
  },
  {
    id: "ai_ml_session",
    title: "Applied Machine Learning & Python AI Deep Dive",
    subtitle: "Algorithm Design, Scikit-Learn Modeling & Real Datasets",
    category: "ai_ml",
    categoryLabel: "AI & ML",
    date: "April 2025",
    location: "Partner University Campus",
    attendees: "100+ Participants",
    badge: "Applied ML Labs",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638349/IMG-20250402-WA0030_k6japa.jpg",
    description: "Hands-on machine learning workshop focused on feature engineering, model tuning, regression & classification pipelines, and evaluation metrics.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638349/IMG-20250402-WA0030_k6japa.jpg",
        caption: "Walkthrough of supervised machine learning algorithms on Jupyter Notebooks."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638349/IMG-20250402-WA0028_ocfbgt.jpg",
        caption: "Auditorium interaction on statistical overfitting and regularization."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638348/IMG-20250402-WA0010_m041zl.jpg",
        caption: "Mentors facilitating practical coding assistance during labs."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638347/IMG-20250402-WA0006_qabeq8.jpg",
        caption: "Demonstration of live sentiment analysis API integration."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638346/IMG-20250402-WA0001_msiqq7.jpg",
        caption: "Concluding cohort session with student awards and certificates."
      },
    ]
  },
  {
    id: "da_using_ae_pb_tb",
    title: "Business Intelligence & Multi-Tool Analytics Sprint",
    subtitle: "Transforming Data with Excel, Power BI & Tableau",
    category: "data_analytics",
    categoryLabel: "Data Analytics",
    date: "June 2025",
    location: "Partner University Campus",
    attendees: "100+ Learners",
    badge: "BI Masterclass",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638454/IMG-20250806-WA0028_icednv.jpg",
    description: "Comprehensive analytics bootcamp covering end-to-end data pipelines from SQL ingestion to automated dashboards in Power BI and Excel.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638454/IMG-20250806-WA0028_icednv.jpg",
        caption: "Presenting multi-layered business intelligence dashboard layouts."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638453/IMG-20250806-WA0026_xcqdji.jpg",
        caption: "Hands-on data cleaning and normalization techniques."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638452/IMG_20250623_121921_kka4ql.jpg",
        caption: "Students collaborating on supply chain and revenue optimization models."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638450/IMG_20250623_120136_hqdfwt.jpg",
        caption: "Explaining interactive dashboard filtering and storytelling."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638453/IMG_20250623_121933_vpp5el.jpg",
        caption: "Final sprint dashboard reviews by industry mentors."
      },
    ]
  },
  {
    id: "pdt",
    title: "Personality Development & Professional Skills Training",
    subtitle: "Corporate Communication, Group Discussions & Leadership",
    category: "career_softskills",
    categoryLabel: "Soft Skills & Career",
    date: "July 2025",
    location: "Partner University Campus",
    attendees: "100+ Students",
    badge: "Placement Readiness",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897301/IMG_6958_ksiern.jpg",
    description: "Dynamic confidence-building, mock corporate interviews, public speaking workshops, and body language coaching to equip students for tech placement drives.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897301/IMG_6958_ksiern.jpg",
        caption: "Interactive public speaking and body language masterclass."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897299/IMG_6950_k1nbn4.jpg",
        caption: "Facilitator explaining high-impact corporate interview techniques."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897298/IMG_6953_hcbpi3.jpg",
        caption: "Group discussion simulations on industry case studies."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897297/IMG_6943_n09lsm.jpg",
        caption: "Students practicing structured communication and objection handling."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754897296/IMG_6935_qln9tg.jpg",
        caption: "Auditorium group interaction and team dynamics exercise."
      },
    ]
  },
  {
    id: "aptitude",
    title: "Campus Placement Aptitude & Problem-Solving Series",
    subtitle: "Quantitative Mastery, Logical Reasoning & Speed Math",
    category: "career_softskills",
    categoryLabel: "Aptitude & DSA",
    date: "February 2025",
    location: "Partner University Campus",
    attendees: "100+ Aspirants",
    badge: "Placement Drive Prep",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638395/IMG_20250214_122544_f7omjz.jpg",
    description: "Intensive training on high-frequency aptitude questions, quantitative shortcuts, logical deduction patterns, and technical screening exam strategies.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638395/IMG_20250214_122544_f7omjz.jpg",
        caption: "Speed math problem solving and shortcut formula walkthroughs."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638394/IMG_20250214_122542_tfhriw.jpg",
        caption: "Interactive logic deduction challenges on whiteboard."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638393/IMG_20250214_122515_brvczf.jpg",
        caption: "Students taking mock placement aptitude assessments."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638393/IMG_20250214_122440_dsq7su.jpg",
        caption: "Mentor analyzing high-frequency corporate exam patterns."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1754638393/IMG_20250214_112951_ebcaqu.jpg",
        caption: "Cohort working through time-constrained test simulations."
      },
    ]
  },
  {
    id: "bharat_shiksha_expo",
    title: "Bharat Shiksha Expo 2025 — Higher Education Summit",
    subtitle: "Showcasing Next-Gen Tech Education, Campus MoUs & Skilling Initiatives",
    category: "conferences",
    categoryLabel: "Education Expo",
    date: "January 2025",
    location: "Greater Noida",
    attendees: "5,000+ Visitors & Educators",
    badge: "National Education Expo",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544703/ed_expo_18_gcw1au.jpg",
    description: "Campussutras delegation and booth showcase at Bharat Shiksha Expo in Greater Noida, engaging university leaders, chancellors, educators, and thousands of students on industry-aligned bootcamps, NEP curriculums, and campus placements.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544703/ed_expo_18_gcw1au.jpg",
        caption: "Campussutras exhibition booth attracting university chancellors and education stakeholders."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544696/ed_expo_3_w1i1cu.jpg",
        caption: "Interactive demonstrations of practical student bootcamp outcomes and tech curriculums."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544702/ed_expo_16_z1isvz.jpg",
        caption: "Engaging with academic leadership on campus training MoUs and faculty enablement programs."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544704/ed_expo_19_u0gip3.jpg",
        caption: "Explaining industry skill benchmarks and career transformation roadmaps to visitors."
      },

      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749544709/ed_expo_42_gss46n.jpg",
        caption: "Team Campussutras connecting with students and academic leaders at the expo pavilion."
      },
    ]
  },
  {
    id: "up_trade_show_2024",
    title: "UP International Trade Show (UPITS 2024)",
    subtitle: "Global Commerce, Innovation & EdTech Ecosystem Showcase",
    category: "conferences",
    categoryLabel: "International Expo",
    date: "September 2024",
    location: "Greater Noida",
    attendees: "10,000+ Trade Visitors & Delegates",
    badge: "Global Trade Summit",
    coverImage: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749545086/expo_27_tybxba.jpg",
    description: "Premier participation and industry pavilion exhibition at the UP International Trade Show (UPITS) in Greater Noida, connecting global trade delegates, corporate executives, entrepreneurs, and young innovators with emerging digital skills and technology workforce solutions.",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749545086/expo_27_tybxba.jpg",
        caption: "Vibrant Campussutras pavilion at UP International Trade Show welcoming corporate leaders."
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749545088/expo_41_cuonmt.jpg",
        caption: "Showcasing tech ecosystem talent pipeline and college partnership milestones."
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749545090/expo_46_a8ogoi.jpg",
        caption: "Presenting workforce readiness models and specialized engineering tracks."
      },
      {
        id: 4,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749545092/expo_78_stv2qd.jpg",
        caption: "High-energy interactions with business owners and prospective corporate hiring partners."
      },
      {
        id: 5,
        url: "https://res.cloudinary.com/dwg0cqk12/image/upload/v1749545085/expo_6_lxifxw.jpg",
        caption: "Trade show expo floor highlights with international delegates and innovation leaders."
      },
    ]
  },
];
