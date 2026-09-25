// Campussutras - 12 Industry Career Bootcamp Tracks (Modernized & AI-Augmented)

export const allCourses = [
  /* ==========================================================================
     1. FULL STACK DEVELOPMENT MASTERY & BOOTCAMP
     ========================================================================== */
  {
    id: "full-stack-development",
    title: "Full Stack Development Mastery & Bootcamp",
    shortTitle: "Full Stack Development",
    slug: "full-stack-development",
    aliases: ["full-stack-web-development"],
    path: "/courses/full-stack-development",
    duration: "90 Days",
    level: "Beginner to Advanced",
    mode: "Live Interactive + Projects",
    category: "Software Engineering",
    categoryKey: "development",
    icon: "/media/web.svg",
    image: "/courses/full-stack-development.svg",
    badge: "Most Popular",
    rating: 4.9,
    reviewsCount: 480,
    shortDescription: "Master modern full-stack development with Next.js 16, React, Node.js, PostgreSQL, Docker, Redis caching, BullMQ queues, Vitest, CI/CD, and AI-assisted workflows.",
    skills: ["HTML5 & Modern CSS", "JavaScript (ES6+)", "React.js & Next.js 16", "Node.js & Express", "PostgreSQL & Prisma", "Docker & Redis", "BullMQ & Vitest", "GitHub Actions & Vercel"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: true,

    tagline: "From Core Frontend to Distributed Cloud Architecture — Build & Scale Production Software.",
    overview: [
      "The Full Stack Development Mastery Bootcamp is an intensive 90-day engineering program engineered to transform students into production-ready software engineers.",
      "Rather than teaching disconnected syntax, our curriculum mirrors modern tech company workflows. You will master modern semantic HTML and responsive CSS, advanced JavaScript (ES6+), component architecture with React and Next.js 16 (App Router & Server Actions), scalable backend APIs with Node.js and Express, relational databases with PostgreSQL and Prisma ORM, containerization with Docker, in-memory caching with Redis, asynchronous background jobs with BullMQ, automated unit/integration testing with Vitest, and continuous delivery via GitHub Actions and Vercel.",
      "Throughout the bootcamp, you will leverage AI-assisted development tools (Cursor, GitHub Copilot) and build modern LLM integrations directly into your web applications, concluding with a comprehensive, portfolio-defining capstone project."
    ],
    highlights: [
      "90 Days of structured, mentor-led live bootcamps and hands-on coding labs",
      "Full coverage of frontend, backend, PostgreSQL, Docker, Redis caching & BullMQ queues",
      "Automated testing with Vitest and CI pipeline setup with GitHub Actions & Vercel",
      "AI-accelerated coding workflows using modern AI assistants and LLM API integrations",
      "1 Production-grade flagship capstone project published to GitHub with live cloud URL",
      "Campussutras Verified Credential with tamper-proof digital verification"
    ],
    targetAudience: [
      "Engineering, BCA, and MCA students aiming for high-paying Software Engineer (SDE) roles",
      "Self-taught developers looking to master production-grade backend, caching, and DevOps",
      "Working professionals transitioning from legacy technologies into modern full-stack stacks",
      "Aspiring tech founders building scalable SaaS applications with cloud architecture"
    ],
    prerequisites: [
      "Basic computer literacy and problem-solving enthusiasm",
      "No prior programming experience required — we begin from computational fundamentals",
      "A laptop or PC (Windows/Mac/Linux) with at least 8GB RAM and an internet connection"
    ],
    careerRoles: [
      "Full Stack Software Engineer",
      "Frontend React / Next.js Developer",
      "Backend Node.js & Express Engineer",
      "Software Development Engineer (SDE-1)",
      "Web Application Specialist"
    ],
    toolsAndTechnologies: [
      "HTML5", "CSS3 / Sass", "JavaScript ES6+", "React.js", "Next.js 16", 
      "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Docker", 
      "Redis", "BullMQ", "Vitest", "Git & GitHub", "GitHub Actions CI", 
      "Vercel", "REST APIs", "JWT & OAuth", "Cursor / AI Copilot"
    ],
    keyOutcomes: [
      "Architect and code end-to-end responsive web applications using Next.js 16 and React",
      "Design robust RESTful APIs with role-based authentication, rate limiting, and input validation",
      "Model, migrate, and query relational databases with PostgreSQL and Prisma ORM",
      "Implement high-throughput caching with Redis and background task processing with BullMQ",
      "Write automated unit and integration tests using Vitest to ensure bulletproof software reliability",
      "Containerize applications with Docker, automate CI with GitHub Actions, and deploy live to Vercel"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Frontend Foundations & Modern JavaScript Architecture",
        description: "Build an unshakeable foundation in semantic HTML, modern responsive CSS layouts, and advanced ECMAScript features.",
        topics: [
          "Semantic HTML5, modern document structure, accessibility (a11y), and SEO best practices",
          "Advanced CSS3: Flexbox, CSS Grid, custom properties, animations, and mobile-first media queries",
          "JavaScript Deep Dive: Lexical scoping, Closures, Event Loop, Promises, Async/Await, and ES Modules",
          "DOM manipulation, Event Delegation, Web Storage APIs, and Fetch API integrations",
          "Git & GitHub Overview: Repositories, branching workflows, pull requests, and commit hygiene",
          "AI Coding Workflows: Leveraging AI coding tools (Cursor / GitHub Copilot) for productive development"
        ],
        deliverable: "Responsive Web Dashboard with live API consumption and clean Git branching history"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Frontend Engineering with React.js & Next.js 16",
        description: "Build reactive, high-performance web applications using modern component design patterns, server components, and routing.",
        topics: [
          "React Core: JSX, Virtual DOM, Component lifecycle, props, and unidirectional data flow",
          "Mastering Hooks: useState, useEffect, useRef, useMemo, useCallback, and Custom Hooks",
          "Next.js 16 Architecture: App Router, Server Components (RSC), Client Components, and Layouts",
          "Server Actions, Data Fetching, Streaming with Suspense, and Dynamic Route Segments",
          "Styling with CSS Modules, Tailwind CSS, and headless accessible UI patterns",
          "State Management with Context API and lightweight global stores (Zustand)"
        ],
        deliverable: "Production-grade Next.js Application with dynamic server rendering and client interactivity"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Backend Architecture, PostgreSQL, Redis & Queue Systems",
        description: "Design enterprise-grade backend APIs, relational databases, caching layers, and asynchronous messaging queues.",
        topics: [
          "Node.js Runtime: Event-driven architecture, non-blocking I/O, Buffer, Streams, and modular code",
          "Express.js Framework: Middleware chains, centralized error handling, routing, and controller design",
          "Relational Database Modeling with PostgreSQL: Schema design, foreign keys, indexing, and Prisma ORM",
          "Authentication & Security: JWT tokens, HTTP-Only cookies, bcrypt hashing, CORS, and helmet.js",
          "Redis In-Memory Caching: Cache-aside pattern, key expiration, and session storage",
          "Asynchronous Job Queues with BullMQ: Producer-consumer pattern, background email dispatch & retries"
        ],
        deliverable: "Secure Multi-Tenant REST API with PostgreSQL, Redis Caching, and BullMQ Background Queues"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Testing, Containerization, CI/CD & Production Deployment",
        description: "Implement automated testing, Docker containerization, GitHub Actions CI pipelines, and live deployment on Vercel.",
        topics: [
          "Unit & Integration Testing with Vitest: Writing assertions, mocking database calls, and testing API routes",
          "Docker Fundamentals: Multi-stage Dockerfiles, docker-compose for local services (PostgreSQL, Redis)",
          "Continuous Integration (CI) with GitHub Actions: Automated linting, test execution, and pull-request checks",
          "Cloud Deployment: Hosting Next.js on Vercel, backend microservices on cloud containers, and database setup",
          "Monitoring, performance profiling, Lighthouse audits, and Web Security Hardening",
          "Resume preparation, public GitHub showcase, portfolio deployment, and technical mock interviews"
        ],
        deliverable: "Full CI/CD Pipeline deploying containerized applications with automated Vitest test suites"
      }
    ],
    projects: [
      {
        title: "DevPulse - Real-Time Collaborative SaaS Platform",
        tagline: "Scalable project workspace with Next.js 16, PostgreSQL, Redis caching, BullMQ background queues & Docker.",
        description: "A production-grade, multi-tenant SaaS collaboration platform featuring Kanban project boards, live team activity feeds, background job processing for automated email digests and report generation via BullMQ and Redis, relational data modeling with PostgreSQL and Prisma, automated Vitest unit/integration test suites, and continuous deployment through GitHub Actions to Vercel.",
        techStack: ["Next.js 16", "React", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "Docker", "Redis", "BullMQ", "Vitest", "GitHub Actions", "Vercel"],
        learningImpact: "Demonstrates full-stack competence across modern frontend, relational data modeling, distributed caching, asynchronous queue architectures, automated testing, and CI/CD deployment."
      }
    ],
    courseFaqs: [
      {
        question: "How does this course cover both Next.js and traditional backend engineering?",
        answer: "We structure the curriculum so you master both ends: Next.js 16 for high-performance React frontends and server actions, alongside standalone Node.js/Express backends connected to PostgreSQL, Redis, and BullMQ queues. This dual foundation prepares you for any engineering stack."
      },
      {
        question: "What practical DevOps and testing skills are taught?",
        answer: "You will containerize your application using Docker, write comprehensive unit and integration tests with Vitest, configure GitHub Actions to run automated CI checks on every commit, and deploy production builds to Vercel."
      },
      {
        question: "Is AI-assisted coding part of the curriculum?",
        answer: "Yes! You learn to use modern AI coding companions (Cursor and GitHub Copilot) to accelerate refactoring, documentation, and debugging, as well as how to integrate LLM endpoints into your web applications."
      }
    ]
  },

  /* ==========================================================================
     2. JAVA ENTERPRISE & CLOUD MICROSERVICES BOOTCAMP
     ========================================================================== */
  {
    id: "java-enterprise-microservices",
    title: "Java Enterprise & Cloud Microservices Bootcamp",
    shortTitle: "Java Microservices",
    slug: "java-enterprise-microservices",
    aliases: ["java-programming"],
    path: "/courses/java-enterprise-microservices",
    duration: "90 Days",
    level: "Beginner to Advanced",
    mode: "Live Interactive + Projects",
    category: "Software Engineering",
    categoryKey: "development",
    icon: "/media/coding.svg",
    image: "/courses/java-enterprise-microservices.svg",
    badge: "Enterprise Standard",
    rating: 4.8,
    reviewsCount: 390,
    shortDescription: "Build enterprise distributed systems with modern Java 21, Spring Boot 3, Spring Cloud, Hibernate/JPA, PostgreSQL, Docker, Apache Kafka, and Spring AI.",
    skills: ["Java 21 Core & OOP", "Spring Boot 3", "Spring Cloud Microservices", "Hibernate & JPA", "PostgreSQL / MySQL", "Apache Kafka", "Docker", "Spring AI & JUnit 5"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: true,

    tagline: "Architect Resilient Enterprise Microservices Running on the World's Most Battle-Tested Stack.",
    overview: [
      "Java powers the digital infrastructure of global banks, fintech unicorns, healthcare systems, and Fortune 500 enterprises. This bootcamp takes you from core object-oriented principles to building production-grade microservices.",
      "You will master modern Java 21 features (Records, Pattern Matching, Virtual Threads), the Spring Boot 3 ecosystem, Hibernate/JPA relational persistence, RESTful API design, service discovery with Spring Cloud, distributed event streaming with Apache Kafka, Docker containerization, and modern Spring AI integrations for enterprise chatbots.",
      "The program culminates in building a distributed, event-driven core banking microservice architecture ready for real-world enterprise deployment."
    ],
    highlights: [
      "90 Days of structured enterprise Java and Spring Boot 3 hands-on training",
      "Deep dive into Microservices, Service Discovery, API Gateway, and Distributed Tracing",
      "Event-driven architecture with Apache Kafka and distributed database transactions",
      "Integration of Spring AI for enterprise retrieval and automated customer assistance",
      "1 Flagship enterprise banking microservices capstone project with Docker",
      "Campussutras Verified Credential for enterprise software hiring"
    ],
    targetAudience: [
      "Students targeting placements at top IT service giants (TCS, Infosys, Cognizant, Wipro)",
      "Engineers aiming for high-paying product/fintech roles (Morgan Stanley, Goldman Sachs, JP Morgan)",
      "Developers looking to transition into robust backend microservices architecture"
    ],
    prerequisites: [
      "Basic understanding of any programming language or computational logic",
      "Eagerness to write clean, strongly-typed, object-oriented code daily"
    ],
    careerRoles: [
      "Java Backend Engineer",
      "Spring Boot Microservices Developer",
      "Enterprise Systems Associate",
      "Software Development Engineer (SDE-1 Java)"
    ],
    toolsAndTechnologies: [
      "Java 21", "Spring Boot 3", "Spring Cloud", "Spring Security", "Hibernate / JPA", 
      "PostgreSQL", "MySQL", "Apache Kafka", "Docker", "Maven", "JUnit 5", 
      "Mockito", "Postman", "Spring AI", "Git & GitHub"
    ],
    keyOutcomes: [
      "Write high-performance, object-oriented Java 21 applications with clean design patterns",
      "Build production-grade REST APIs using Spring Boot 3 and secure them with JWT/Spring Security",
      "Implement distributed microservice architectures with Eureka service registry and API Gateway",
      "Process high-volume event streams asynchronously with Apache Kafka topics and consumers",
      "Containerize Java microservices with Docker and deploy to container runtimes"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Modern Java 21 & Object-Oriented Engineering",
        description: "Master OOP principles, collections framework, exception handling, and Java 21 modern features.",
        topics: [
          "Java 21 runtime setup, JVM internals, memory management (Stack vs Heap), and Garbage Collection",
          "Object-Oriented Design: Encapsulation, Inheritance, Polymorphism, Abstract classes, and Interfaces",
          "Java Collections Framework: Lists, Sets, Maps, Queues, and performance time-complexities",
          "Modern Java Features: Lambdas, Streams API, Records, Sealed classes, and Pattern Matching",
          "Concurrency & Multithreading: Thread lifecycles, Synchronization, and Java 21 Virtual Threads",
          "Unit Testing with JUnit 5 and automated mock assertions with Mockito"
        ],
        deliverable: "High-throughput in-memory transaction ledger engine with automated JUnit 5 test suites"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Spring Boot 3, Hibernate & Data Persistence",
        description: "Develop enterprise RESTful APIs, manage transactions, and integrate relational databases using JPA.",
        topics: [
          "Spring Framework Architecture: Dependency Injection (DI) and Inversion of Control (IoC)",
          "Spring Boot 3: Auto-configuration, Starters, application profiles, and Actuator metrics",
          "Data Persistence with Spring Data JPA & Hibernate: Entities, relationships, and custom JPQL queries",
          "Database connection pooling (HikariCP) and migration management with Flyway",
          "Enterprise API Security: Spring Security 6, JWT token authentication, and role-based access control",
          "Spring AI basics: Connecting Spring applications to OpenAI/Gemini endpoints for enterprise workflows"
        ],
        deliverable: "Production-ready Spring Boot REST API with PostgreSQL persistence and JWT role authentication"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Distributed Microservices & Cloud Patterns",
        description: "Break monoliths into scalable microservices using Spring Cloud patterns, service registries, and API gateways.",
        topics: [
          "Monolith to Microservices: Domain-Driven Design (DDD) and bounded context identification",
          "Service Registry & Discovery using Spring Cloud Netflix Eureka",
          "Centralized Routing and Security filtering with Spring Cloud Gateway",
          "Resilience & Fault Tolerance: Circuit Breaker pattern with Resilience4j, retries, and fallbacks",
          "Distributed Tracing and Observability with Micrometer and Zipkin",
          "Centralized Configuration Management using Spring Cloud Config Server"
        ],
        deliverable: "Multi-service microservice ecosystem with API Gateway, Eureka discovery, and circuit breakers"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Event-Driven Systems with Kafka, Docker & Capstone",
        description: "Integrate Apache Kafka for real-time streaming, containerize microservices, and deploy the capstone.",
        topics: [
          "Event-Driven Architecture: Event Sourcing, CQRS basics, and asynchronous message flow",
          "Apache Kafka Architecture: Topics, Partitions, Producers, Consumers, and Consumer Groups",
          "Integrating Spring for Apache Kafka: Publishing transactions and processing asynchronous events",
          "Containerizing Spring Boot microservices using multi-stage Dockerfiles and Docker Compose",
          "Performance tuning, database query optimization, and enterprise code review walkthroughs",
          "Placement preparation: Mock Java technical interviews, Spring Boot architectural questions, and resume polish"
        ],
        deliverable: "Complete containerized event-driven microservices architecture running via Docker Compose"
      }
    ],
    projects: [
      {
        title: "BankShield - Distributed Core Banking Microservices Architecture",
        tagline: "High-concurrency banking system with Spring Boot 3, Apache Kafka event streaming & Docker.",
        description: "An enterprise-grade, distributed core banking application comprising independent microservices for User Accounts, Ledger Transactions, Fraud Detection, and Notification dispatch. Powered by Spring Boot 3, Spring Cloud Gateway, Apache Kafka for event-driven asynchronous settlement, PostgreSQL for ACID transaction integrity, Redis for session caching, and full Docker Compose orchestration.",
        techStack: ["Java 21", "Spring Boot 3", "Spring Cloud", "Apache Kafka", "PostgreSQL", "Docker", "Redis", "Resilience4j", "JUnit 5"],
        learningImpact: "Proves enterprise readiness in distributed transaction handling, fault tolerance, event-driven messaging, and containerized Java architectures demanded by tier-1 tech firms."
      }
    ],
    courseFaqs: [
      {
        question: "Why should I learn Java in the AI era?",
        answer: "Java remains the bedrock of global financial institutions, healthcare, telecommunications, and IT service giants. Enterprises need skilled engineers who understand how to maintain, secure, scale, and modernize these multi-billion-dollar backends with modern Java 21, Spring Boot 3, and Spring AI."
      },
      {
        question: "Is Apache Kafka included in the curriculum?",
        answer: "Yes! You will learn how to design event-driven microservices where decoupled services communicate asynchronously through Kafka topics and partitions."
      },
      {
        question: "Will I learn how to containerize Java apps with Docker?",
        answer: "Absolutely. You will write multi-stage Dockerfiles for your Spring Boot applications and orchestrate multi-service databases, Kafka brokers, and gateways using Docker Compose."
      }
    ]
  },

  /* ==========================================================================
     3. DATA STRUCTURES, ALGORITHMS & SYSTEM DESIGN MASTERY
     ========================================================================== */
  {
    id: "dsa-and-system-design",
    title: "Data Structures, Algorithms & System Design Mastery",
    shortTitle: "DSA & System Design",
    slug: "dsa-and-system-design",
    aliases: ["dsa-system-design"],
    path: "/courses/dsa-and-system-design",
    duration: "90 Days",
    level: "Intermediate to Advanced",
    mode: "Live Interactive + Problem Solving",
    category: "Software Engineering",
    categoryKey: "development",
    icon: "/media/coding.svg",
    image: "/courses/dsa-and-system-design.svg",
    badge: "Placement Weapon",
    rating: 4.9,
    reviewsCount: 520,
    shortDescription: "Crack technical interviews at tier-1 tech companies with 250+ DSA problems, LeetCode patterns, Low-Level Design (LLD), and High-Level System Design (HLD).",
    skills: ["Problem Solving Patterns", "Arrays & Two Pointers", "Trees & Graphs", "Dynamic Programming", "Low-Level Design (LLD)", "High-Level Design (HLD)", "System Architecture", "Mock Interviews"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: true,

    tagline: "Master Algorithmic Problem Solving and Scalable System Architecture for Top Tech Offers.",
    overview: [
      "While AI can generate code snippets, technical screening rounds and online assessments (OAs) evaluate your foundational problem-solving rigor and architectural intuition. This 90-day bootcamp is engineered to help you crack SDE-1 interviews at top product firms.",
      "Covering 250+ carefully selected problems across 14 essential algorithmic patterns (Sliding Window, Two Pointers, Fast & Slow Pointers, Monotonic Stacks, Graph traversals, DP), you will develop the ability to dissect any unseen problem systematically.",
      "The program also provides deep-dive training into Low-Level Design (SOLID principles, Design Patterns, UML modeling) and High-Level System Design (Load Balancers, Sharding, Consistent Hashing, Message Brokers), concluding with a production-grade distributed system implementation."
    ],
    highlights: [
      "90 Days of structured problem-solving masterclasses covering 250+ interview questions",
      "Pattern-based DSA approach covering Arrays, Linked Lists, Trees, Graphs, and DP",
      "Low-Level Object-Oriented Design (LLD) with SOLID principles and Gang of Four patterns",
      "High-Level System Design (HLD): Scalability, Caching, Sharding, CAP theorem & microservices",
      "1 Production-grade distributed system design capstone project with benchmark reports",
      "Campussutras Technical Screening Verification Certificate for hiring partners"
    ],
    targetAudience: [
      "3rd and 4th-year engineering students preparing for campus placement recruitment seasons",
      "Developers aiming to transition from service-based IT companies to high-paying product firms",
      "Candidates looking to build rock-solid algorithmic foundations and master system architecture"
    ],
    prerequisites: [
      "Working knowledge of any one programming language (C++, Java, or Python)",
      "Basic understanding of arrays and control structures"
    ],
    careerRoles: [
      "Software Development Engineer (SDE-1)",
      "Member of Technical Staff (MTS)",
      "Backend Systems Engineer",
      "Algorithmic Problem Solver"
    ],
    toolsAndTechnologies: [
      "C++ / Java / Python", "LeetCode Frameworks", "Git & GitHub", "Docker", 
      "Redis", "PostgreSQL", "Nginx", "Apache JMeter", "Mermaid / PlantUML", 
      "System Design Walkthroughs", "AI Mock Interview Tools"
    ],
    keyOutcomes: [
      "Analyze time and space complexities intuitively with Big-O notation",
      "Solve complex algorithmic challenges using optimal Two-Pointer, Sliding Window, and Tree patterns",
      "Break down dynamic programming problems into clear state transitions and memoization structures",
      "Implement clean, extensible software architectures using SOLID principles and GoF design patterns",
      "Design large-scale distributed systems capable of handling millions of requests per second"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Complexity Analysis & Core Linear Data Structures",
        description: "Master Big-O analysis and solve pattern-based problems on arrays, strings, stacks, and queues.",
        topics: [
          "Asymptotic Analysis: Worst-case, Average-case, and Best-case Big-O, Big-Omega, and Big-Theta",
          "Pattern 1 & 2: Two Pointers and Sliding Window techniques for optimal array manipulations",
          "Pattern 3 & 4: Fast & Slow Pointers and Merge Intervals",
          "Monotonic Stacks and Queues: Next Greater Element, Largest Rectangle in Histogram",
          "Linked Lists Mastery: Reversals, cycle detection, reordering, and deep copy algorithms",
          "Bit Manipulation tricks, Math foundations, and binary search on answer spaces"
        ],
        deliverable: "Portfolio of 60+ tested algorithmic solutions documented with complexity analyses"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Non-Linear Structures: Trees, Tries & Graphs",
        description: "Tackle hierarchical and network structures with BFS, DFS, Dijkstra, and Topological Sort.",
        topics: [
          "Binary Trees & BSTs: Recursive traversals (Inorder, Preorder, Postorder), Morris Traversal, and Tree Views",
          "Lowest Common Ancestor (LCA), Diameter, and Path Sum problem variations",
          "Tries (Prefix Trees): Auto-complete implementation and bitwise XOR problems",
          "Graph Representations: Adjacency list, Matrix, BFS, and DFS traversals",
          "Cycle Detection in Directed and Undirected graphs, Topological Sort (Kahn's algorithm)",
          "Shortest Path Algorithms: Dijkstra, Bellman-Ford, and Disjoint Set Union (DSU / Kruskal's)"
        ],
        deliverable: "Network routing and dependency resolution engine implemented using Graph algorithms"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Dynamic Programming, Backtracking & Advanced Patterns",
        description: "Demystify recursion, backtracking, and dynamic programming from 1D to multidimensional grids.",
        topics: [
          "Recursion Tree breakdown, state definition, and Backtracking (N-Queens, Sudoku, Subsets, Permutations)",
          "1D Dynamic Programming: Fibonacci variants, Climbing Stairs, House Robber, and Coin Change",
          "2D Grid DP: Unique Paths, Minimum Path Sum, and Dungeon Game",
          "Subsequence & String DP: Longest Common Subsequence (LCS), Edit Distance, and Wildcard Matching",
          "Knapsack Problems: 0/1 Knapsack, Unbounded Knapsack, and Target Sum",
          "DP on Trees and Bitmask DP foundations for advanced competitive scenarios"
        ],
        deliverable: "Algorithmic decision optimization engine with state transition proofs and benchmarks"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "System Design (LLD & HLD) & Mock Interview Sprints",
        description: "Design production architectures from object-oriented classes to distributed microservices.",
        topics: [
          "Low-Level Design (LLD): SOLID Principles, UML Class Diagrams, and Gang of Four Design Patterns",
          "Design Case Studies: Parking Lot, Elevator System, Rate Limiter, and Snake & Ladder",
          "High-Level Design (HLD) Building Blocks: Load Balancers, Reverse Proxies, CDN, and Caching",
          "Database Scaling: Vertical vs Horizontal scaling, Sharding, Replication, and CAP Theorem",
          "Asynchronous Architectures: Message Queues, Event Sourcing, and WebSocket Real-Time Systems",
          "Mock Interview Sprints: Timed whiteboard coding simulations, behavioral STAR technique, and resume review"
        ],
        deliverable: "Production-scale distributed URL shortener and rate-limiter with complete LLD & HLD documentation"
      }
    ],
    projects: [
      {
        title: "ScaleRoute - Distributed Scalable URL Shortener & Analytics Engine",
        tagline: "High-throughput system handling 10,000+ RPS with rate limiting, caching & low-level design.",
        description: "A complete distributed systems capstone designed to mimic industry architectures like TinyURL and Bitly. Features modular Low-Level Design (LLD) using the Strategy and Factory patterns, a Token Bucket Rate Limiter, Base62 encoding, Redis cache-aside layer, PostgreSQL persistent store with database sharding logic, and automated JMeter load testing benchmarks demonstrating sub-15ms response times under high concurrency.",
        techStack: ["Java / Python", "PostgreSQL", "Redis", "Docker", "Nginx", "Apache JMeter", "SOLID Design Patterns"],
        learningImpact: "Provides candidates with an authoritative talking point for both algorithmic coding rounds and SDE system design architectural discussions."
      }
    ],
    courseFaqs: [
      {
        question: "Is this course suitable for beginners with basic coding experience?",
        answer: "Yes! While we progress to advanced Dynamic Programming and System Design, we begin with foundational Big-O analysis and pattern recognition so that students can build confidence step-by-step."
      },
      {
        question: "Which programming languages can I use during the bootcamp?",
        answer: "Our mentors provide code walkthroughs and pattern templates across C++, Java, and Python. You can solve assignments in whichever language you feel most comfortable with."
      },
      {
        question: "How does the course cover System Design for freshers?",
        answer: "We cover both Low-Level Design (LLD: writing clean object-oriented code, SOLID principles, design patterns) and High-Level Design (HLD: how web scale systems like TinyURL and Uber scale), giving you a clear edge in fresher and early-career interviews."
      }
    ]
  },

  /* ==========================================================================
     4. APPLIED GENERATIVE AI & AUTONOMOUS AGENT ENGINEERING
     ========================================================================== */
  {
    id: "applied-generative-ai",
    title: "Applied Generative AI & Autonomous Agent Engineering",
    shortTitle: "Generative AI & Agents",
    slug: "applied-generative-ai",
    aliases: ["generative-ai"],
    path: "/courses/applied-generative-ai",
    duration: "90 Days",
    level: "Intermediate to Advanced",
    mode: "Live Interactive + Labs",
    category: "Artificial Intelligence",
    categoryKey: "ai",
    icon: "/media/ai.svg",
    image: "/courses/applied-generative-ai.svg",
    badge: "Flagship Frontier",
    rating: 4.95,
    reviewsCount: 460,
    shortDescription: "Build production AI systems with LLMs, Prompt Engineering, RAG (Retrieval-Augmented Generation), Vector DBs, LangChain, LlamaIndex, and Multi-Agent frameworks (CrewAI).",
    skills: ["LLM Architectures", "Prompt Engineering", "RAG Pipelines", "Vector DBs (pgvector/Pinecone)", "LangChain & LlamaIndex", "Multi-Agent Systems (CrewAI)", "FastAPI & Docker", "Model Evaluation"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: true,

    tagline: "Move Beyond Simple Chatbots — Architect Enterprise RAG Pipelines & Autonomous Multi-Agent Workflows.",
    overview: [
      "Generative AI has shifted software development from deterministic code to probabilistic, intelligent systems. This flagship 90-day program teaches you how to design, deploy, and evaluate production-grade AI systems.",
      "You will progress from advanced prompt engineering and tokenomics to architecting production Retrieval-Augmented Generation (RAG) pipelines using vector databases (Pinecone, Chroma, pgvector), chunking strategies, hybrid keyword-semantic search, and rerankers.",
      "You will then master autonomous multi-agent orchestration using LangChain, LlamaIndex, and CrewAI—creating self-reflective AI agents that collaborate, use external tools, call APIs, and execute complex workflows without manual supervision."
    ],
    highlights: [
      "90 Days of live, hands-on Generative AI, RAG, and Agentic engineering labs",
      "Mastery of state-of-the-art LLMs: OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini 2.0",
      "Production RAG architectures with pgvector, Pinecone, hybrid search, and cross-encoder rerankers",
      "Autonomous Multi-Agent development using CrewAI, AutoGen, and LangGraph",
      "1 Production-grade enterprise AI research agent capstone deployed with FastAPI & Docker",
      "Campussutras Verified Generative AI Credential for high-salary AI hiring"
    ],
    targetAudience: [
      "Software developers seeking to transition into high-paying Generative AI & ML engineering roles",
      "Engineering and data science students looking for a modern, production-focused AI specialization",
      "Product builders aiming to integrate autonomous intelligence into enterprise SaaS products"
    ],
    prerequisites: [
      "Comfort with basic Python programming (functions, data structures, and packages)",
      "Basic understanding of REST APIs and HTTP requests"
    ],
    careerRoles: [
      "Generative AI Engineer",
      "AI Solutions Architect",
      "Applied LLM Developer",
      "AI Agent Specialist",
      "Machine Learning Engineer"
    ],
    toolsAndTechnologies: [
      "Python", "OpenAI API", "Anthropic Claude", "Google Gemini", "LangChain", 
      "LlamaIndex", "CrewAI", "LangGraph", "Pinecone", "pgvector", 
      "ChromaDB", "Hugging Face", "FastAPI", "Docker", "Streamlit"
    ],
    keyOutcomes: [
      "Design structured prompt architectures with few-shot learning, chain-of-thought, and JSON schemas",
      "Build production RAG pipelines with semantic chunking, embedding models, and reranking",
      "Orchestrate autonomous multi-agent systems that utilize tools, APIs, and web search",
      "Implement model evaluation frameworks with hallucination detection and response quality metrics",
      "Deploy scalable AI microservices with FastAPI, streaming responses, and Docker containers"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "LLM Foundations, Prompt Engineering & API Mastery",
        description: "Master LLM architectures, tokens, temperature, context windows, and advanced prompt engineering.",
        topics: [
          "Generative AI landscape: Transformers, Self-Attention mechanisms, Encoder-Decoder vs Decoder-only models",
          "Understanding Tokens, Context Lengths, Latency vs Cost tradeoffs, and Rate Limits",
          "Advanced Prompt Engineering: Chain-of-Thought (CoT), ReAct prompting, and Few-Shot conditioning",
          "Structured outputs: Function calling, OpenAI Tools API, JSON Schemas, and Pydantic validation",
          "Working with open-source models: Ollama, Hugging Face Hub, and local LLM execution",
          "Token efficiency, cost estimation, and security: Prompt injection defense and guardrails"
        ],
        deliverable: "Production Prompt Engineering Test Suite with schema-validated JSON outputs and guardrails"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Vector Databases & Production RAG Pipelines",
        description: "Build robust Retrieval-Augmented Generation systems using semantic vector search and rerankers.",
        topics: [
          "Why RAG is essential: Overcoming model hallucination and knowledge cutoff limitations",
          "Text Splitting & Chunking Strategies: Recursive, Semantic, and Markdown-aware chunking",
          "Embedding Models: Dimension vectors, Cosine similarity, and state-of-the-art embedding benchmarks",
          "Vector Databases: Pinecone, ChromaDB, and PostgreSQL with the pgvector extension",
          "Hybrid Search: Combining BM25 sparse keyword search with dense vector embeddings",
          "Advanced RAG: Query transformation, hypothetical document embeddings (HyDE), and Cross-Encoder rerankers"
        ],
        deliverable: "High-accuracy enterprise document Q&A engine with citation references and hybrid search"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "LangChain, LlamaIndex & Autonomous AI Agents",
        description: "Orchestrate multi-step reasoning, external tool execution, and collaborative multi-agent teams.",
        topics: [
          "LangChain Expression Language (LCEL): Chains, Runnables, Memory, and streaming responses",
          "LlamaIndex: Data connectors, indices, query engines, and structured retrieval",
          "Agent Fundamentals: ReAct loops, tool definition, memory management, and error recovery",
          "Multi-Agent Frameworks: CrewAI and LangGraph for role-playing collaborative agents",
          "Equipping Agents with Tools: Custom Python functions, Google Web Search, and SQL database querying",
          "Human-in-the-Loop workflows, state persistence, and long-term memory architectures"
        ],
        deliverable: "Collaborative multi-agent market research team generating automated deep-dive reports"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Evaluation, Production Deployment & Capstone",
        description: "Evaluate AI quality, detect hallucinations, deploy FastAPI microservices, and build the capstone.",
        topics: [
          "LLM Evaluation (Ragas framework): Context precision, answer relevance, and faithfulness",
          "Hallucination mitigation and content moderation using guardrail libraries",
          "Building scalable AI APIs with FastAPI: Server-Sent Events (SSE) for streaming text tokens",
          "Asynchronous concurrency, request throttling, and caching LLM responses with Redis",
          "Containerizing AI microservices using Docker and deploying to cloud infrastructure",
          "Resume preparation: Showcasing RAG architectures, Agentic portfolio review, and AI mock interviews"
        ],
        deliverable: "Containerized, streaming AI microservice with automated evaluation metrics and cloud deployment"
      }
    ],
    projects: [
      {
        title: "Enterprise CogniDoc - Autonomous Multi-Agent Research Assistant",
        tagline: "Hybrid RAG intelligence platform with pgvector, LangGraph & CrewAI multi-agent collaboration.",
        description: "An enterprise-grade autonomous intelligence platform that ingests unstructured PDFs, financial statements, and technical documentation. Features a Hybrid RAG retrieval pipeline combining pgvector with Cross-Encoder rerankers, a CrewAI multi-agent team (Document Analyst, Fact Checker, and Report Writer), automated citation verification, and a streaming FastAPI backend deployed in a Docker container.",
        techStack: ["Python", "OpenAI GPT-4o", "LangChain", "CrewAI", "PostgreSQL (pgvector)", "FastAPI", "Docker", "Streamlit"],
        learningImpact: "Demonstrates production mastery of Retrieval-Augmented Generation, vector embeddings, multi-agent coordination, and cloud deployment demanded by modern AI startups and enterprises."
      }
    ],
    courseFaqs: [
      {
        question: "Do I need a background in advanced mathematics or deep learning?",
        answer: "No. This course focuses on Applied Generative AI engineering—building software systems on top of state-of-the-art foundation models through APIs, RAG pipelines, and agent frameworks. Basic Python proficiency is all you need."
      },
      {
        question: "How is this different from basic prompt engineering courses?",
        answer: "Most basic courses teach only text prompts. We teach software engineering for AI: building vector databases with pgvector, hybrid search with rerankers, multi-agent frameworks with CrewAI, hallucination evaluation with Ragas, and deploying FastAPI microservices."
      },
      {
        question: "Are multi-agent systems covered in depth?",
        answer: "Yes! You will build autonomous agents using CrewAI and LangGraph that can browse the web, execute custom Python functions, query SQL databases, and critique each other's work."
      }
    ]
  },

  /* ==========================================================================
     5. PYTHON FOR AI, AUTOMATION & MODERN ENGINEERING
     ========================================================================== */
  {
    id: "python-programming",
    title: "Python for AI, Automation & Modern Engineering",
    shortTitle: "Python for AI & Automation",
    slug: "python-programming",
    path: "/courses/python-programming",
    duration: "90 Days",
    level: "Beginner to Intermediate",
    mode: "Live Interactive + Labs",
    category: "Artificial Intelligence",
    categoryKey: "ai",
    icon: "/media/coding.svg",
    image: "/courses/python-programming.svg",
    badge: "Foundation Pillar",
    rating: 4.85,
    reviewsCount: 410,
    shortDescription: "Master modern Python 3.12, OOP, data processing with NumPy & Pandas, web automation with Playwright, FastAPI web services, and AI-driven scripting.",
    skills: ["Python 3.12 Core & OOP", "NumPy & Pandas", "Web Scraping (Playwright)", "FastAPI APIs", "Automation Scripting", "Scikit-Learn Basics", "Streamlit UIs", "Git & GitHub"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: true,

    tagline: "The Native Language of the AI Era — Master Scripting, Web Automation, and Data Engineering.",
    overview: [
      "Python is the undisputed language of artificial intelligence, data science, and cloud automation. This 90-day program transitions beginners and early coders into proficient Python software engineers.",
      "Starting with clean coding standards, object-oriented design, and file handling, you will quickly advance to data wrangling with NumPy and Pandas, automated headless web scraping with Playwright, building high-speed asynchronous REST APIs with FastAPI, and deploying interactive data web apps with Streamlit.",
      "The program emphasizes AI-era tooling: leveraging AI coding companions for test generation, automating repetitive business tasks, and integrating machine learning libraries."
    ],
    highlights: [
      "90 Days of mentor-led Python engineering, automation, and API development",
      "Modern Python 3.12: Type hints, decorators, generators, and asynchronous programming",
      "Web scraping & browser automation with BeautifulSoup and Playwright",
      "Building high-speed RESTful microservices with FastAPI and Pydantic data validation",
      "1 Production-ready autonomous data scraping and analytics dashboard capstone",
      "Campussutras Verified Python Developer Credential"
    ],
    targetAudience: [
      "College students and beginners wanting a versatile, high-demand first programming language",
      "Professionals looking to automate manual workflows, spreadsheet processing, and web tasks",
      "Aspiring data analysts and AI developers building a rock-solid Python programming base"
    ],
    prerequisites: [
      "No prior coding experience required; basic computer literacy and enthusiasm to practice daily"
    ],
    careerRoles: [
      "Python Developer",
      "Automation & Scripting Engineer",
      "Junior Backend Developer",
      "Data Analytics Associate"
    ],
    toolsAndTechnologies: [
      "Python 3.12", "NumPy", "Pandas", "FastAPI", "Playwright", "BeautifulSoup4", 
      "Streamlit", "Scikit-Learn", "SQLite / PostgreSQL", "Git & GitHub", "Docker"
    ],
    keyOutcomes: [
      "Write idiomatic, modular, and object-oriented Python code using modern type annotations",
      "Automate complex data extraction from dynamic websites using Playwright and BeautifulSoup",
      "Clean, filter, and transform multi-gigabyte datasets with NumPy and Pandas",
      "Develop asynchronous REST APIs with automatic OpenAPI documentation using FastAPI",
      "Deploy interactive web dashboards using Streamlit to present live analytical insights"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Python Core, Data Structures & OOP Excellence",
        description: "Master Python fundamentals, control flow, functions, modular architecture, and object-oriented design.",
        topics: [
          "Python 3.12 setup, virtual environments (venv, uv), and PEP 8 code formatting standards",
          "Data types, control structures, list/dictionary comprehensions, and type hinting",
          "Functions: *args, **kwargs, lambda expressions, map/filter, and first-class functions",
          "Object-Oriented Programming: Classes, instances, inheritance, dunder methods, and dataclasses",
          "Error Handling: Custom exceptions, context managers (`with` statements), and file I/O",
          "Decorators, Generators, Iterators, and writing unit tests with pytest"
        ],
        deliverable: "Modular Object-Oriented CLI Financial Management application with pytest test suites"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Data Manipulation with NumPy & Pandas",
        description: "Wrangle, clean, analyze, and aggregate structured data using industry-standard Python libraries.",
        topics: [
          "NumPy: N-dimensional arrays, vectorization, broadcasting, and numerical performance",
          "Pandas DataFrames and Series: Indexing, filtering, and data type handling",
          "Data Cleaning: Handling missing values, deduplication, string methods, and regex parsing",
          "Data Aggregation: GroupBy operations, pivot tables, and merging/joining relational DataFrames",
          "Time-series data manipulation, date parsing, and rolling statistical windows",
          "Exploratory Data Analysis (EDA) and data visualization with Matplotlib and Seaborn"
        ],
        deliverable: "Automated Exploratory Data Analysis report processing multi-source CSV and Excel datasets"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Web Scraping, Automation & Scripting Workflows",
        description: "Automate web browsing, extract data from dynamic websites, and build scheduling bots.",
        topics: [
          "HTTP networking with the `requests` and `httpx` asynchronous libraries",
          "HTML parsing and DOM traversal using BeautifulSoup4",
          "Browser Automation with Playwright: Headless browsers, clicking, form filling, and waiting for dynamic JavaScript",
          "Handling authentication, session cookies, and pagination across web pages",
          "File Automation: Manipulating Excel sheets, PDF generation, and automated email dispatch with `smtplib`",
          "Task scheduling using Python `schedule` and cron-like background jobs"
        ],
        deliverable: "Headless web scraper monitoring dynamic e-commerce prices with automated email alerts"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "FastAPI REST Services, Streamlit & Capstone",
        description: "Build asynchronous backend APIs, create interactive Streamlit interfaces, and deploy the capstone.",
        topics: [
          "FastAPI Architecture: Asynchronous routing (`async`/`await`), dependency injection, and Pydantic validation",
          "Database integration: Connecting FastAPI with SQLite / PostgreSQL via SQLModel / SQLAlchemy",
          "Building interactive data dashboards using Streamlit with reactive widgets and charts",
          "Basic Machine Learning integration: Training and serving a classification model with Scikit-Learn",
          "Docker containerization for Python scripts and FastAPI web applications",
          "Career preparation: GitHub repository optimization, Python interview questions, and mock coding rounds"
        ],
        deliverable: "Production-ready automated scraping engine with FastAPI REST endpoints and Streamlit UI"
      }
    ],
    projects: [
      {
        title: "MarketPulse - Autonomous Financial Data Scraper & Analytics Dashboard",
        tagline: "End-to-end data pipeline with Playwright scraping, Pandas analytics & Streamlit dashboard.",
        description: "An automated real-time financial data intelligence application that scrapes stock market news and equity indicators from dynamic web portals using Playwright, processes and calculates moving averages with Pandas, serves data through an asynchronous FastAPI REST API, and visualizes trends on an interactive Streamlit dashboard with automated Discord/Telegram alerts.",
        techStack: ["Python 3.12", "Playwright", "Pandas", "FastAPI", "Streamlit", "SQLite", "Docker", "Git"],
        learningImpact: "Demonstrates practical competence in modern web automation, asynchronous API engineering, data manipulation, and interactive dashboarding."
      }
    ],
    courseFaqs: [
      {
        question: "Is this course completely beginner-friendly?",
        answer: "Yes. We start from ground zero with Python syntax and logic, and progressively guide you into building web scrapers, data pipelines, and FastAPI microservices."
      },
      {
        question: "Why do we learn Playwright instead of just basic BeautifulSoup?",
        answer: "Modern websites are built with React and Next.js where content loads dynamically via JavaScript. Playwright allows you to automate a real browser, click buttons, bypass dynamic delays, and extract data that simple scrapers cannot reach."
      },
      {
        question: "Can I use the skills learned here for machine learning later?",
        answer: "Yes! NumPy, Pandas, and Python data structures are the mandatory foundation for any future work in AI, Data Science, and Machine Learning."
      }
    ]
  },

  /* ==========================================================================
     6. BUSINESS DATA ANALYTICS WITH ADVANCED EXCEL & SQL
     ========================================================================== */
  {
    id: "business-data-analytics",
    title: "Business Data Analytics with Advanced Excel & SQL",
    shortTitle: "Business Data Analytics",
    slug: "business-data-analytics",
    aliases: ["data-analytics-using-ms-excel"],
    path: "/courses/business-data-analytics",
    duration: "90 Days",
    level: "Beginner to Intermediate",
    mode: "Live Interactive + Business Cases",
    category: "Data & BI",
    categoryKey: "data",
    icon: "/media/analytics.svg",
    image: "/courses/business-data-analytics.svg",
    badge: "High Hiring Volume",
    rating: 4.85,
    reviewsCount: 370,
    shortDescription: "Master business problem solving using Advanced Excel, Power Query, Microsoft Copilot, Relational SQL, Window Functions, and financial modeling case studies.",
    skills: ["Advanced Excel & XLOOKUP", "Power Query & M-Code", "Microsoft Copilot for Excel", "Relational SQL & Joins", "Window Functions & CTEs", "Financial Modeling", "Cohort Analysis", "Business Storytelling"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: true,

    tagline: "Turn Raw Data into Executive Business Decisions — Master the Tools Every Company Relies On.",
    overview: [
      "Every modern business—from high-growth startups to legacy enterprises—runs on spreadsheets and relational databases. This 90-day bootcamp equips you with the analytical toolkit demanded for Business Analyst and Data Analyst roles.",
      "You will master Advanced Excel (dynamic arrays, XLOOKUP, INDEX-MATCH, What-If Analysis, financial modeling), automated ETL workflows with Power Query, and prompt-driven analysis with Microsoft Copilot. You will then dive deep into Relational SQL, writing complex multi-table joins, subqueries, Common Table Expressions (CTEs), and analytical Window Functions.",
      "The program centers around real corporate case studies: customer retention, churn prediction, revenue forecasting, and executive reporting."
    ],
    highlights: [
      "90 Days of hands-on business analytics, spreadsheet engineering, and SQL masterclasses",
      "Power Query data cleaning and automated ingestion pipelines without manual copy-pasting",
      "Relational SQL mastery: Window functions (RANK, DENSE_RANK, NTILE), CTEs, and cohort modeling",
      "Leveraging Microsoft Copilot and AI data assistants to accelerate formula writing and trend analysis",
      "1 Production-grade e-commerce revenue and customer cohort analytics capstone",
      "Campussutras Verified Business Data Analyst Credential"
    ],
    targetAudience: [
      "B.Com, BBA, BCA, MBA, and engineering students targeting high-demand Business Analyst roles",
      "Professionals spending hours in manual spreadsheet tasks who want to automate reporting",
      "Non-coders looking for an accessible, math-friendly entry point into the tech industry"
    ],
    prerequisites: [
      "Basic familiarity with using a computer and opening spreadsheets; no coding background required"
    ],
    careerRoles: [
      "Business Analyst",
      "Junior Data Analyst",
      "Operations Analyst",
      "Financial Analyst Associate",
      "Market Research Analyst"
    ],
    toolsAndTechnologies: [
      "Microsoft Excel 365", "Power Query", "Microsoft Copilot", "PostgreSQL / MySQL", 
      "DBeaver", "Pivot Tables", "What-If Analysis", "SQL Window Functions"
    ],
    keyOutcomes: [
      "Construct automated financial and operational spreadsheet models using dynamic arrays",
      "Cleanse, transform, and merge multi-table datasets automatically using Power Query",
      "Write production-grade SQL queries using Common Table Expressions and Window Functions",
      "Perform cohort analyses to calculate customer lifetime value (LTV) and churn rates",
      "Synthesize analytical findings into clear, executive-ready presentations with visual charts"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Advanced Excel Mastery & Modern Formula Engineering",
        description: "Master modern spreadsheet formulas, dynamic arrays, data validation, and lookup functions.",
        topics: [
          "Excel Interface mastery, keyboard shortcuts, cell referencing (Relative vs Absolute), and formatting standards",
          "Modern Lookup Functions: XLOOKUP, INDEX-MATCH, VLOOKUP limitations, and multi-condition lookups",
          "Dynamic Array Formulas: FILTER, SORT, UNIQUE, SEQUENCE, and XMATCH",
          "Logical & Text Functions: Nested IFS, SWITCH, TEXTSPLIT, CONCAT, and data cleaning techniques",
          "Data Validation rules, drop-down dependencies, conditional formatting, and error handling (IFERROR)",
          "Integrating Microsoft Copilot for Excel: Prompt-based formula generation and anomaly detection"
        ],
        deliverable: "Dynamic Financial & Sales Performance Model featuring dynamic arrays and automated lookups"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Power Query, What-If Analysis & Pivot Dashboards",
        description: "Automate repetitive data ingestion, construct pivot models, and conduct scenario modeling.",
        topics: [
          "Power Query Architecture: Extract, Transform, Load (ETL) without writing VBA code",
          "Data Transformation: Unpivoting columns, splitting delimiters, changing data types, and merging queries",
          "Advanced Pivot Tables: Slicers, Timelines, Calculated Fields, and grouping dates/numbers",
          "Scenario Analysis: Data Tables, Goal Seek, Scenario Manager, and Solver optimization",
          "Designing Executive Summary Dashboards with KPI tiles and synchronized chart slicers",
          "Automated monthly report refresh pipelines connecting to CSV and folder data sources"
        ],
        deliverable: "Automated Monthly Executive Dashboard connecting multi-file CSV sources via Power Query"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Relational SQL & Database Querying Mastery",
        description: "Extract, filter, join, and aggregate enterprise data stored across relational database systems.",
        topics: [
          "Relational Database concepts: Primary keys, Foreign keys, Normalization, and ER diagrams",
          "Core SQL Syntax: SELECT, WHERE, ORDER BY, GROUP BY, HAVING, and aggregate functions",
          "Multi-Table Joins: INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins with real business cases",
          "Subqueries: Correlated vs Non-correlated subqueries and EXISTS operators",
          "Common Table Expressions (CTEs): Writing readable, modular SQL logic with `WITH` clauses",
          "String manipulation, Date-Time extraction, and conditional statements (`CASE WHEN`)"
        ],
        deliverable: "Enterprise Database Query Repository solving 50+ real corporate data extraction problems"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Advanced SQL Window Functions, Cohort Analysis & Capstone",
        description: "Master analytical window functions, calculate retention cohorts, and present business findings.",
        topics: [
          "SQL Window Functions: OVER, PARTITION BY, ORDER BY, ROW_NUMBER, RANK, and DENSE_RANK",
          "Analytical Offsets: LEAD, LAG, FIRST_VALUE, and running cumulative totals",
          "Cohort Analysis: Calculating monthly active users (MAU), retention matrices, and churn rates",
          "Customer Lifetime Value (CLV) and RFM (Recency, Frequency, Monetary) customer segmentation",
          "Business Data Storytelling: Translating numbers into actionable executive recommendations",
          "Interview Preparation: SQL whiteboard challenges, Excel case study tests, and portfolio reviews"
        ],
        deliverable: "End-to-End E-Commerce Revenue and Customer Cohort Analytics Capstone with presentation"
      }
    ],
    projects: [
      {
        title: "OmniRetail - End-to-End E-Commerce Revenue & Cohort Analytics Model",
        tagline: "Enterprise business intelligence model analyzing 100K+ transactions using Excel & SQL.",
        description: "A comprehensive business analytics capstone analyzing 100,000+ e-commerce transaction records. Features an automated Power Query data ingestion pipeline, relational SQL queries with Common Table Expressions and Window Functions to compute monthly cohort retention rates, customer churn indicators, RFM customer segmentation tiers, and an interactive executive Excel dashboard with dynamic KPI cards and scenario modeling.",
        techStack: ["Microsoft Excel 365", "Power Query", "PostgreSQL", "SQL Window Functions", "Cohort Modeling", "DBeaver"],
        learningImpact: "Demonstrates practical competence in spreadsheet automation, complex SQL querying, and executive business decision-making demanded by analytics hiring managers."
      }
    ],
    courseFaqs: [
      {
        question: "Do I need to know how to code to take this course?",
        answer: "No programming background is required! Excel and SQL are designed for business logic and analytical reasoning. We start from the fundamentals and build up to advanced modeling step by step."
      },
      {
        question: "How is SQL taught during the course?",
        answer: "You will write real SQL queries against real database instances (PostgreSQL) using tools like DBeaver. You will practice multi-table joins, CTEs, and advanced window functions used by top business analysts."
      },
      {
        question: "What types of jobs can I apply for after this bootcamp?",
        answer: "Graduates are prepared for Business Analyst, Junior Data Analyst, Operations Analyst, Financial Analyst Associate, and Reporting Specialist roles."
      }
    ]
  },

  /* ==========================================================================
     7. BUSINESS INTELLIGENCE & DASHBOARDING WITH POWER BI
     ========================================================================== */
  {
    id: "power-bi-data-analytics",
    title: "Business Intelligence & Dashboarding with Power BI",
    shortTitle: "Power BI & Analytics",
    slug: "power-bi-data-analytics",
    aliases: ["data-analytics-using-powerbi"],
    path: "/courses/power-bi-data-analytics",
    duration: "90 Days",
    level: "Beginner to Intermediate",
    mode: "Live Interactive + Dashboards",
    category: "Data & BI",
    categoryKey: "data",
    icon: "/media/analytics.svg",
    image: "/courses/power-bi-data-analytics.svg",
    badge: "Industry Standard BI",
    rating: 4.88,
    reviewsCount: 350,
    shortDescription: "Build executive visual intelligence with Power BI Desktop & Service, DAX formulas, Star-Schema data modeling, Power Query M-Code, and Microsoft Fabric Copilot.",
    skills: ["Power BI Desktop & Service", "DAX Calculations", "Star-Schema Data Modeling", "Power Query M-Code", "Executive KPI Dashboards", "Row-Level Security (RLS)", "Microsoft Fabric Copilot", "Data Storytelling"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: false,

    tagline: "Turn Complex Enterprise Data into Interactive, Executive-Ready Visual Dashboards.",
    overview: [
      "Modern organizations don't lack data—they lack clarity. Power BI has emerged as the global enterprise market leader for business intelligence, interactive reporting, and visual decision-making.",
      "This 90-day bootcamp trains you to think like a seasoned BI Consultant. You will master data ingestion from multiple cloud sources, Star-Schema relational data modeling, advanced DAX (Data Analysis Expressions) calculations (CALCULATE, Time Intelligence, Iterator functions), Power Query M-code transformations, and Row-Level Security (RLS).",
      "You will also learn how to leverage Microsoft Fabric Copilot for automated dashboard authoring, concluding with an interactive corporate supply chain command center."
    ],
    highlights: [
      "90 Days of intensive Power BI Desktop, DAX modeling, and Power BI Service training",
      "Mastery of Star-Schema data architecture and dimension vs fact table relationships",
      "Advanced DAX: Filter context transition, CALCULATE, Time Intelligence (YTD, MTD, YoY)",
      "Publishing to Power BI Service, automated scheduled refreshes, and Row-Level Security (RLS)",
      "1 Production-grade supply chain and logistics executive command center capstone",
      "Campussutras Verified Power BI Specialist Credential"
    ],
    targetAudience: [
      "BBA, MBA, B.Com, BCA, MCA, and engineering students aspiring to become Power BI Developers and BI Analysts",
      "Excel analysts wanting to scale their skills into cloud-based enterprise visual dashboards",
      "IT and business professionals looking to specialize in high-demand Microsoft Data & BI ecosystems"
    ],
    prerequisites: [
      "Basic computer literacy and comfort with reading data in tables or spreadsheets"
    ],
    careerRoles: [
      "Power BI Developer",
      "Business Intelligence Analyst",
      "Data Visualization Specialist",
      "Reporting Engineer",
      "MIS Executive"
    ],
    toolsAndTechnologies: [
      "Power BI Desktop", "Power BI Service", "DAX Studio", "Power Query", 
      "SQL Databases", "Microsoft Fabric Copilot", "Excel", "Data Modeling"
    ],
    keyOutcomes: [
      "Model complex multi-table enterprise data using robust Star-Schema architectures",
      "Write performant DAX measures for dynamic KPIs, time intelligence, and variance tracking",
      "Design clean, intuitive, accessible dashboards tailored for C-suite executive consumption",
      "Configure Row-Level Security (RLS) to ensure multi-department data privacy and compliance",
      "Publish, manage, and schedule automated cloud dataset refreshes in Power BI Service"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Power BI Foundations & Power Query ETL",
        description: "Connect to disparate data sources, cleanse data with Power Query, and master M-code transformations.",
        topics: [
          "Power BI Architecture: Desktop vs Service vs Mobile, licensing, and workflow overview",
          "Connecting to data: Excel, CSV, SQL Server, Web URLs, and Cloud storage endpoints",
          "Power Query Data Transformation: Column transformations, pivot/unpivot, and merging data",
          "Handling messy data: Parsing dates, cleaning text anomalies, and conditional columns",
          "M-Code Fundamentals: Understanding the advanced editor and custom transformation functions",
          "Best practices for data loading, storage modes (Import vs DirectQuery), and query folding"
        ],
        deliverable: "Automated multi-source data ingestion pipeline with documented Power Query transformations"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Data Modeling & Star-Schema Architecture",
        description: "Design relational data models, configure cardinality, and avoid performance pitfalls.",
        topics: [
          "Data Modeling Principles: Fact Tables vs Dimension Tables and Normalization concepts",
          "Star Schema vs Snowflake Schema: Why Star Schema is optimal for Power BI performance",
          "Configuring Relationships: 1-to-Many, Many-to-Many challenges, and Active vs Inactive joins",
          "Managing Cross-filter Direction (Single vs Both) and resolving circular dependency errors",
          "Creating a dedicated Calendar / Date table using DAX and Power Query best practices",
          "Hiding technical keys, formatting fields, creating display folders, and hierarchical drill-downs"
        ],
        deliverable: "Robust Star-Schema Data Model linking sales facts with customer, product, and territory dimensions"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "DAX (Data Analysis Expressions) Mastery",
        description: "Write powerful calculations from basic aggregations to advanced filter context modifications.",
        topics: [
          "DAX Fundamentals: Calculated Columns vs Measures, row context, and filter context",
          "Essential Aggregations: SUM, AVERAGE, COUNTROWS, DISTINCTCOUNT, and DIVIDE",
          "The King of DAX: Mastering the `CALCULATE` function and filter modifier functions (`ALL`, `ALLEXCEPT`, `KEEPFILTERS`)",
          "Iterator Functions: SUMX, AVERAGEX, and RANKX with complex row evaluation logic",
          "Time Intelligence Functions: YTD, QTD, MTD, SAMEPERIODLASTYEAR, and Year-over-Year (YoY) Growth %",
          "Performance Optimization using DAX Studio and eliminating slow visual calculations"
        ],
        deliverable: "Library of 35+ verified DAX measures calculating executive business KPIs and variance metrics"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Visual Design, Power BI Service & Capstone",
        description: "Design executive dashboards, configure cloud publishing, setup RLS, and build the capstone.",
        topics: [
          "UI/UX Design for Dashboards: Visual hierarchy, color palettes, card tiles, and decluttering reports",
          "Interactive Visuals: Decomposition Tree, Key Influencers, Drill-through pages, and Tooltip pages",
          "Bookmarks & Selection Pane: Creating dynamic visual toggles, help overlays, and reset buttons",
          "Power BI Service: Workspaces, Dashboards vs Reports, Scheduled Refreshes, and Data Gateways",
          "Security & Collaboration: Implementing Row-Level Security (RLS) for sales reps vs managers",
          "Microsoft Fabric Copilot: Prompt-assisted visual creation, natural language Q&A, and DAX generation"
        ],
        deliverable: "Executive Global Supply Chain Command Center Dashboard published with interactive slicers"
      }
    ],
    projects: [
      {
        title: "Global Supply Chain & Logistics Command Center",
        tagline: "Interactive Power BI dashboard monitoring inventory, shipping delays & vendor performance.",
        description: "An end-to-end executive Business Intelligence dashboard tracking multi-country logistics operations across 50,000+ shipment orders. Built on a clean Star-Schema data model with 35+ custom DAX measures for On-Time Delivery % (OTIF), carrier freight cost variances, dynamic inventory turnover rates, customized Tooltip drill-down pages, and Row-Level Security restricting warehouse views by regional director.",
        techStack: ["Power BI Desktop", "Power BI Service", "DAX", "Star Schema", "Power Query", "Row-Level Security"],
        learningImpact: "Demonstrates high-level competence in data modeling, advanced DAX time intelligence, executive UX design, and secure cloud sharing."
      }
    ],
    courseFaqs: [
      {
        question: "What is the difference between Excel and Power BI?",
        answer: "Excel is great for spreadsheet modeling, manual data entry, and ad-hoc calculations. Power BI is designed for large-scale corporate business intelligence: connecting to multi-million row databases, establishing relational models, and creating interactive, automated cloud dashboards."
      },
      {
        question: "Is DAX hard to learn for beginners?",
        answer: "DAX has a gentle start but requires understanding 'filter context'. Our course breaks down DAX systematically with visual diagrams so you master how formulas like CALCULATE and SUMX evaluate data."
      },
      {
        question: "Do I get to work with the cloud-based Power BI Service?",
        answer: "Yes! You will learn how to publish reports to Power BI Service, configure scheduled automated refreshes, and test Row-Level Security rules."
      }
    ]
  },

  /* ==========================================================================
     8. MODERN DATA ENGINEERING & CLOUD DATA WAREHOUSING
     ========================================================================== */
  {
    id: "modern-data-engineering",
    title: "Modern Data Engineering & Cloud Data Warehousing",
    shortTitle: "Cloud Data Engineering",
    slug: "modern-data-engineering",
    path: "/courses/modern-data-engineering",
    duration: "90 Days",
    level: "Intermediate to Advanced",
    mode: "Live Interactive + Cloud Labs",
    category: "Data & BI",
    categoryKey: "data",
    icon: "/media/analytics.svg",
    image: "/courses/modern-data-engineering.svg",
    badge: "High Salary Ceiling",
    rating: 4.9,
    reviewsCount: 310,
    shortDescription: "Architect scalable ELT pipelines with Advanced SQL, Google BigQuery / Snowflake, dbt (data build tool), Apache Airflow, Python, and Data Lakehouses.",
    skills: ["Advanced SQL for Engineers", "Snowflake & BigQuery", "dbt (data build tool)", "Apache Airflow", "Python Data Pipelines", "Data Modeling (Kimball)", "Data Quality Testing", "CI/CD for Data"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: false,

    tagline: "Build the High-Performance Pipelines that Power Enterprise Analytics and AI Models.",
    overview: [
      "AI and Machine Learning models are only as good as the data feeding them. Data Engineering is one of the highest-paying and most critically undersupplied specializations in the technology sector.",
      "This 90-day bootcamp focuses on the Modern Data Stack (MDS). You will master dimensional data modeling (Kimball methodology), cloud data warehousing with Snowflake and BigQuery, production transformation workflows with dbt (data build tool), workflow orchestration with Apache Airflow, and automated data testing.",
      "You will complete the program by engineering an end-to-end, event-driven ELT pipeline that extracts streaming data, transforms it modularly with dbt, and schedules it automatically with Airflow."
    ],
    highlights: [
      "90 Days of live cloud data engineering, warehousing, and pipeline orchestration",
      "Mastery of the Modern Data Stack: Snowflake, Google BigQuery, dbt, and Apache Airflow",
      "Dimensional data modeling: Slowly Changing Dimensions (SCD Type 1 & 2) and Star Schemas",
      "Data Quality Testing and Documentation pipelines integrated with Git version control",
      "1 Production-grade cloud data warehouse and orchestrated ELT pipeline capstone",
      "Campussutras Verified Data Engineer Credential"
    ],
    targetAudience: [
      "Software engineers and Python developers seeking to transition into high-paying Data Engineering",
      "Data analysts looking to move from reporting into scalable data infrastructure and pipeline architecture",
      "Engineering graduates with strong SQL and programming foundations aiming for tier-1 tech firms"
    ],
    prerequisites: [
      "Good working knowledge of SQL queries and basic Python programming"
    ],
    careerRoles: [
      "Data Engineer",
      "Analytics Engineer",
      "Cloud Data Warehouse Specialist",
      "ETL / ELT Developer",
      "Big Data Associate"
    ],
    toolsAndTechnologies: [
      "Snowflake", "Google BigQuery", "dbt Core / Cloud", "Apache Airflow", 
      "Python", "SQL", "Docker", "Git & GitHub", "Cloud Storage (S3 / GCS)"
    ],
    keyOutcomes: [
      "Design scalable dimensional models with Fact and Dimension tables and Kimball methodology",
      "Architect cloud data warehouses using Snowflake and BigQuery with clustering and partition optimization",
      "Build modular, version-controlled SQL data transformation pipelines with dbt (models, tests, docs)",
      "Orchestrate complex Directed Acyclic Graphs (DAGs) using Apache Airflow with retries and alerts",
      "Implement automated data quality checks to prevent pipeline failures and schema drift"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Advanced SQL & Dimensional Data Modeling",
        description: "Master dimensional architecture, Kimball methodology, and advanced analytical SQL constructs.",
        topics: [
          "Data Engineering Landscape: OLTP vs OLAP, ETL vs ELT paradigms, and data lakehouse architectures",
          "Dimensional Modeling (Ralph Kimball methodology): Grain identification, Fact and Dimension tables",
          "Handling Slowly Changing Dimensions (SCD Type 0, 1, 2, and 3) with real customer tracking cases",
          "Advanced SQL for Engineering: Recursive CTEs, Window Aggregations, Qualify clauses, and Array functions",
          "Data Lake fundamentals: Parquet vs ORC vs CSV formats, partitioning, and cloud object storage",
          "Git for Data Teams: Branching strategies, code reviews, and version-controlling data assets"
        ],
        deliverable: "Dimensional Kimball Data Model architecture with SQL scripts implementing SCD Type 2"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Cloud Warehousing with Snowflake & BigQuery",
        description: "Architect, manage, query, and optimize petabyte-scale cloud data warehouses.",
        topics: [
          "Snowflake Architecture: Multi-cluster shared data, virtual warehouses, and storage separation",
          "Google BigQuery Architecture: Serverless compute (Slots), columnar storage (Capacitor), and pricing models",
          "Data Ingestion: Snowpipe, COPY INTO commands, and staging files from AWS S3 / Google Cloud Storage",
          "Performance Optimization: Partitioning strategies, Clustering keys, Search Optimization, and Cache reuse",
          "Security & Governance: Role-Based Access Control (RBAC), Data Masking, and Time Travel features",
          "Zero-Copy Cloning, data sharing, and tracking storage/compute cost efficiencies"
        ],
        deliverable: "Configured Snowflake Cloud Data Warehouse with automated staging, security roles, and clustering"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Data Transformation with dbt (data build tool)",
        description: "Transform raw warehouse data into clean, documented, tested analytics tables using dbt.",
        topics: [
          "What is dbt: Bringing software engineering best practices (testing, version control, CI/CD) to SQL",
          "dbt Project Structure: Sources, staging models, intermediate layers, and mart dimensions/facts",
          "Materializations in dbt: Views, Tables, Incremental models, and Ephemeral tables",
          "Jinja Templating and Macros: Writing DRY (Don't Repeat Yourself) SQL logic and dynamic filters",
          "Data Testing: Schema tests (unique, not_null, accepted_values, relationships) and custom singular tests",
          "Generating and deploying dbt documentation and interactive lineage dependency graphs"
        ],
        deliverable: "Modular multi-layer dbt project with automated tests, Jinja macros, and lineage graphs"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Pipeline Orchestration with Apache Airflow & Capstone",
        description: "Orchestrate end-to-end data workflows, configure Airflow DAGs, and build the enterprise capstone.",
        topics: [
          "Workflow Orchestration concepts: Why cron is insufficient for enterprise data pipelines",
          "Apache Airflow Architecture: Web Server, Scheduler, Workers, Metadata DB, and Celery / Kubernetes Executors",
          "Authoring Airflow DAGs in Python: Operators, Sensors, Task Dependencies (`>>`), and XComs",
          "Triggering dbt runs from Airflow using Cosmos / BashOperators with automated alerting on failure",
          "Data Quality Monitoring: Detecting schema drift and tracking pipeline SLA metrics",
          "Career Preparation: Data engineering architectural whiteboarding, interview prep, and resume review"
        ],
        deliverable: "Complete Airflow DAG orchestrating automated cloud ingestion, dbt transformation, and alerts"
      }
    ],
    projects: [
      {
        title: "CloudStream - Enterprise Real-Time ELT Data Warehouse Pipeline",
        tagline: "Production cloud data warehouse pipeline with Snowflake, dbt transformations & Apache Airflow.",
        description: "A production-grade ELT data engineering pipeline that ingests continuous streaming e-commerce events into cloud object storage, loads them into Snowflake via staging stages, transforms raw logs into Kimball dimensional marts using dbt with automated data quality assertions, and orchestrates the entire workflow on an Apache Airflow cluster with automated Slack incident notifications on task failure.",
        techStack: ["Snowflake", "dbt Core", "Apache Airflow", "Python", "SQL", "Docker", "AWS S3", "Git"],
        learningImpact: "Demonstrates production competency in the Modern Data Stack, data warehouse modeling, testing, and enterprise pipeline orchestration."
      }
    ],
    courseFaqs: [
      {
        question: "How does Data Engineering differ from Data Science?",
        answer: "Data Engineers build the plumbing, infrastructure, and pipelines that extract, clean, and organize data at scale. Data Scientists use the clean data provided by Data Engineers to build statistical models and predictions."
      },
      {
        question: "Why is dbt so popular in the job market?",
        answer: "dbt is the industry standard transformation tool in modern tech stacks because it allows data teams to write modular SQL with version control, automated testing, documentation, and data lineage."
      },
      {
        question: "Do we get hands-on experience with real cloud warehouses?",
        answer: "Yes! You will work directly with Snowflake and BigQuery, setting up real virtual warehouses, staging files from cloud storage, and configuring incremental models."
      }
    ]
  },

  /* ==========================================================================
     9. CLOUD COMPUTING & DEVOPS ENGINEERING BOOTCAMP
     ========================================================================== */
  {
    id: "cloud-computing-devops",
    title: "Cloud Computing & DevOps Engineering Bootcamp",
    shortTitle: "Cloud & DevOps",
    slug: "cloud-computing-devops",
    path: "/courses/cloud-computing-devops",
    duration: "90 Days",
    level: "Intermediate to Advanced",
    mode: "Live Interactive + Cloud Labs",
    category: "Cloud & Security",
    categoryKey: "cloud-security",
    icon: "/media/web.svg",
    image: "/courses/cloud-computing-devops.svg",
    badge: "High Demand Infrastructure",
    rating: 4.9,
    reviewsCount: 380,
    shortDescription: "Master cloud architecture and DevOps with Linux, AWS Core Services, Docker, Kubernetes (EKS), Terraform Infrastructure as Code, CI/CD, and Prometheus monitoring.",
    skills: ["Linux & Bash Scripting", "AWS Core Infrastructure", "Docker Containerization", "Kubernetes & Helm", "Terraform (IaC)", "GitHub Actions CI/CD", "Prometheus & Grafana", "Cloud Security"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: false,

    tagline: "Containerize, Automate, and Scale Modern Cloud Infrastructure for Zero-Downtime Reliability.",
    overview: [
      "Every web application, AI system, and enterprise service relies on automated, resilient cloud infrastructure. DevOps and Cloud Engineers command some of the highest salaries in tech because they keep applications running 24/7/365.",
      "This 90-day hands-on bootcamp covers the complete DevOps lifecycle: starting with Linux administration and Bash scripting, mastering AWS core cloud architecture (VPC, EC2, S3, RDS, IAM, ALB), containerizing microservices with Docker, orchestrating container clusters with Kubernetes (EKS), managing Infrastructure as Code with Terraform, and configuring automated CI/CD pipelines with GitHub Actions.",
      "The course finishes with deploying a highly available, monitored Kubernetes microservices infrastructure with automated failover."
    ],
    highlights: [
      "90 Days of live, hands-on cloud labs, terminal commands, and infrastructure scripting",
      "Full coverage of AWS Core Services, Docker, Kubernetes, Terraform, and CI/CD pipelines",
      "Infrastructure as Code (IaC) with Terraform for automated cloud resource provisioning",
      "Observability and monitoring setups with Prometheus, Grafana, and cloud log management",
      "1 Production-grade Kubernetes microservices infrastructure with CI/CD capstone",
      "Campussutras Verified Cloud & DevOps Engineer Credential"
    ],
    targetAudience: [
      "Engineers and CS students targeting high-paying Cloud Engineer, DevOps, and SRE roles",
      "Developers wanting to master containerization, deployment automation, and cloud hosting",
      "System administrators looking to transition into cloud-native automation and Kubernetes"
    ],
    prerequisites: [
      "Basic understanding of computers and command-line interfaces; familiarity with any programming or scripting is helpful"
    ],
    careerRoles: [
      "DevOps Engineer",
      "Cloud Infrastructure Associate",
      "Site Reliability Engineer (SRE)",
      "Build & Release Engineer",
      "Kubernetes Administrator"
    ],
    toolsAndTechnologies: [
      "Linux", "Bash", "AWS (EC2, S3, VPC, RDS, IAM, EKS)", "Docker", 
      "Kubernetes", "Helm", "Terraform", "GitHub Actions", "Prometheus", 
      "Grafana", "Nginx", "Git"
    ],
    keyOutcomes: [
      "Navigate and administer Linux server environments and automate tasks with Bash scripts",
      "Architect secure, multi-tier cloud networking environments on AWS with custom VPCs and subnets",
      "Create lightweight, multi-stage Docker container images for microservice applications",
      "Deploy, autoscale, and manage container clusters using Kubernetes pods, deployments, and services",
      "Automate multi-cloud infrastructure provisioning declaratively using Terraform scripts",
      "Build end-to-end CI/CD pipelines that automatically build, test, and deploy code on every push"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Linux Server Administration, Networking & Bash Automation",
        description: "Master Linux terminal commands, permissions, networking fundamentals, and shell scripting.",
        topics: [
          "Linux Architecture: Kernel, Shell, File System Hierarchy (FHS), and systemd service management",
          "Essential Terminal Commands: File manipulation, grep, awk, sed, curl, and process management (top, htop)",
          "User Permissions and Security: chmod, chown, sudoers, and SSH key-based authentication",
          "Computer Networking for Cloud: TCP/IP, DNS resolution, Subnets, CIDR notation, and firewalls (iptables/ufw)",
          "Bash Scripting: Variables, loops, conditionals, exit codes, and automated backup scripts",
          "Version Control with Git: Managing infrastructure code repositories and SSH deploy keys"
        ],
        deliverable: "Automated Linux Server Hardening & Health Monitoring Bash Script Suite"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "AWS Cloud Architecture & Infrastructure as Code (Terraform)",
        description: "Architect scalable, fault-tolerant cloud networks and provision infrastructure declaratively.",
        topics: [
          "AWS Global Infrastructure: Regions, Availability Zones, and High Availability principles",
          "Networking with Amazon VPC: Public/Private subnets, Route Tables, Internet Gateways, and NAT Gateways",
          "Compute & Storage: EC2 instance types, Auto Scaling Groups, Elastic Load Balancers (ALB), and S3 buckets",
          "Database & Security: Amazon RDS (PostgreSQL), IAM Policies, Roles, and Least Privilege principles",
          "Infrastructure as Code (IaC) with Terraform: Providers, Resources, Variables, and State files",
          "Terraform Modules, remote state management with S3/DynamoDB locks, and multi-environment setups"
        ],
        deliverable: "Automated Terraform script deploying a secure, multi-tier AWS VPC with EC2 Auto Scaling"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Docker Containerization & Kubernetes (EKS) Orchestration",
        description: "Package applications into immutable containers and orchestrate scalable Kubernetes clusters.",
        topics: [
          "Containerization vs Virtualization: Cgroups, Namespaces, and the Docker daemon",
          "Writing production Dockerfiles: Layer caching, multi-stage builds, non-root users, and small image footprints",
          "Docker Compose for multi-container local development (Web, API, Database, Redis)",
          "Kubernetes Core Architecture: Control Plane, Kubelet, Pods, Deployments, ReplicaSets, and Services",
          "Networking in Kubernetes: ClusterIP, NodePort, LoadBalancer, and Ingress controllers",
          "ConfigMaps, Secrets, Persistent Volumes (PV/PVC), and Package Management with Helm charts"
        ],
        deliverable: "Containerized microservice application deployed onto a Kubernetes cluster with Helm"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "CI/CD Pipelines, Observability & Enterprise Capstone",
        description: "Build automated GitHub Actions pipelines, configure Prometheus monitoring, and deploy capstone.",
        topics: [
          "CI/CD Principles: Continuous Integration, Continuous Delivery, and Automated Deployment strategies",
          "GitHub Actions: Workflows, Jobs, Steps, Action runners, Environment secrets, and Matrix builds",
          "Building automated pipelines: Linting, Unit test execution, Docker image builds, and push to Amazon ECR",
          "GitOps deployment to Kubernetes: Zero-downtime rolling updates and automated rollbacks",
          "Monitoring & Observability: Scraping metrics with Prometheus and building dashboards in Grafana",
          "Career Preparation: DevOps architectural whiteboarding, interview scenarios, and resume optimization"
        ],
        deliverable: "Complete end-to-end GitOps CI/CD pipeline deploying to Kubernetes with Grafana monitoring"
      }
    ],
    projects: [
      {
        title: "CloudScale - Multi-Tier Kubernetes Infrastructure with Terraform & CI/CD",
        tagline: "Automated AWS EKS cloud platform with Terraform, GitHub Actions & Prometheus monitoring.",
        description: "An enterprise-grade cloud infrastructure capstone. Provisions a highly available multi-AZ Amazon VPC using Terraform, establishes an Amazon EKS (Elastic Kubernetes Service) cluster, sets up a GitHub Actions CI/CD pipeline that automatically tests and containerizes code on every push, deploys microservices via Helm with horizontal pod autoscaling (HPA), and configures Prometheus and Grafana for real-time cluster telemetry.",
        techStack: ["AWS", "Terraform", "Kubernetes", "Docker", "Helm", "GitHub Actions", "Prometheus", "Grafana", "Linux"],
        learningImpact: "Demonstrates comprehensive cloud and DevOps engineering capability across Infrastructure as Code, container orchestration, CI/CD automation, and production observability."
      }
    ],
    courseFaqs: [
      {
        question: "Do I need an expensive AWS account to participate?",
        answer: "No. All hands-on exercises are designed to run within the AWS Free Tier, supplemented by local development tools like Docker and Minikube to keep your cloud costs near zero."
      },
      {
        question: "Why is Terraform taught alongside AWS?",
        answer: "Modern companies rarely click around in cloud consoles manually. Infrastructure as Code (IaC) with Terraform is the industry standard for writing code that automates, versions, and audits cloud environments."
      },
      {
        question: "Are Kubernetes and Docker both covered?",
        answer: "Yes! Docker is used to package your applications into containers, and Kubernetes is used to orchestrate, autoscale, and heal those containers across production server clusters."
      }
    ]
  },

  /* ==========================================================================
     10. CYBERSECURITY & ETHICAL HACKING MASTERY
     ========================================================================== */
  {
    id: "cyber-security",
    title: "Cybersecurity & Ethical Hacking Mastery",
    shortTitle: "Cybersecurity & Hacking",
    slug: "cyber-security",
    path: "/courses/cyber-security",
    duration: "90 Days",
    level: "Beginner to Intermediate",
    mode: "Live Interactive + Virtual Labs",
    category: "Cloud & Security",
    categoryKey: "cloud-security",
    icon: "/media/cyber.svg",
    image: "/courses/cyber-security.svg",
    badge: "Recession Proof",
    rating: 4.92,
    reviewsCount: 360,
    shortDescription: "Protect and defend networks with Ethical Hacking, Linux security, OWASP Top 10 vulnerabilities, Burp Suite, Nmap, Metasploit, Cryptography, and SOC analysis.",
    skills: ["Network Security & Wireshark", "Linux Security & Bash", "OWASP Top 10 Vulnerabilities", "Penetration Testing (Burp Suite)", "Nmap & Metasploit", "SOC & SIEM Fundamentals", "Applied Cryptography", "AI in Cybersecurity"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: false,

    tagline: "Defend Enterprise Digital Assets — Master Ethical Hacking, Web Security, and Threat Hunting.",
    overview: [
      "In an era where automated cyber threats and ransomware attacks cost businesses trillions of dollars annually, cybersecurity professionals are among the most indispensable assets in any organization.",
      "This 90-day hands-on bootcamp trains you in both offensive penetration testing and defensive security operations. You will master networking protocols (TCP/IP, DNS, ARP), network traffic sniffing with Wireshark, active reconnaissance with Nmap, the complete OWASP Top 10 web vulnerabilities (SQL Injection, XSS, CSRF, SSRF) using Burp Suite, and vulnerability exploitation with Metasploit.",
      "You will also learn defensive SOC fundamentals: analyzing SIEM security logs, threat hunting, and how AI is transforming cyber defense, concluding with a comprehensive corporate security audit."
    ],
    highlights: [
      "90 Days of live security labs, vulnerability assessments, and penetration testing drills",
      "Hands-on web application security auditing covering the entire OWASP Top 10",
      "Industry-standard tools: Kali Linux, Wireshark, Burp Suite, Nmap, Metasploit, and SIEM tools",
      "Defensive Security Operations Center (SOC) incident response and log analysis",
      "1 Comprehensive corporate vulnerability assessment and penetration test report capstone",
      "Campussutras Verified Cybersecurity Specialist Credential"
    ],
    targetAudience: [
      "Students in CS, IT, and Electronics targeting careers in Ethical Hacking and Security Analysis",
      "Software engineers looking to write secure code and understand application vulnerabilities",
      "System administrators seeking to advance into cybersecurity and SOC analyst roles"
    ],
    prerequisites: [
      "Basic understanding of computers and how the internet works; no prior hacking experience required"
    ],
    careerRoles: [
      "Cybersecurity Analyst",
      "Junior Penetration Tester",
      "SOC Analyst (Tier 1)",
      "Information Security Associate",
      "Vulnerability Assessment Specialist"
    ],
    toolsAndTechnologies: [
      "Kali Linux", "Wireshark", "Burp Suite", "Nmap", "Metasploit", 
      "OWASP ZAP", "Splunk / SIEM", "Python for Security", "Hydra", "John the Ripper"
    ],
    keyOutcomes: [
      "Inspect, analyze, and diagnose packet-level network traffic anomalies using Wireshark",
      "Perform network reconnaissance, port scanning, and service fingerprinting with Nmap",
      "Identify and remediate the complete OWASP Top 10 web application vulnerabilities with Burp Suite",
      "Understand cryptographic algorithms (AES, RSA, Hashing) and secure communication channels",
      "Investigate SIEM log alerts to identify intrusions, brute-force attempts, and malware signatures"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Networking Protocols, Kali Linux & Traffic Analysis",
        description: "Master networking fundamentals, packet inspection, and the ethical hacker's OS.",
        topics: [
          "Cybersecurity Fundamentals: Confidentiality, Integrity, Availability (CIA Triad), and Ethical Laws",
          "Kali Linux setup, terminal navigation, system auditing, and secure shell configuration",
          "Networking Deep Dive: OSI 7-Layer model, TCP/IP handshake, UDP, DNS, ARP, and DHCP",
          "Packet Sniffing with Wireshark: Capturing traffic, applying display filters, and spotting unencrypted credentials",
          "ARP Spoofing, Man-in-the-Middle (MitM) simulation, and DNS spoofing defense mechanisms",
          "Scripting for Security: Writing basic Python automation scripts for port scanning"
        ],
        deliverable: "Wireshark Network Traffic Inspection & Suspicious Packet Analysis Report"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Reconnaissance, Scanning & System Penetration",
        description: "Discover network attack surfaces, scan for vulnerabilities, and execute controlled exploits.",
        topics: [
          "Open-Source Intelligence (OSINT): Passive footprinting, domain reconnaissance, and Google Dorking",
          "Active Network Scanning with Nmap: SYN scans, UDP scans, OS fingerprinting, and NSE scripts",
          "Vulnerability Scanning: Automated assessments using Nessus / OpenVAS to discover unpatched software",
          "Exploitation Fundamentals: Metasploit Framework (MSFConsole), payloads, exploits, and listeners",
          "Password Cracking: Understanding hashing (MD5, SHA-256, bcrypt) and cracking with John the Ripper and Hydra",
          "Social Engineering defenses: Phishing simulation, credential harvesting analysis, and MFA security"
        ],
        deliverable: "Network Penetration Testing Lab Report documenting identified attack vectors and CVEs"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Web Application Security & OWASP Top 10",
        description: "Intercept and manipulate web requests to audit common web application vulnerabilities.",
        topics: [
          "Web Architecture: HTTP request/response headers, cookies, sessions, and client-side vs server-side security",
          "Burp Suite Professional/Community: Intercepting proxies, Repeater, Intruder, and Decoder",
          "OWASP #1 & #3: SQL Injection (SQLi) - In-band, Blind, and Time-based, alongside remediation with prepared statements",
          "OWASP #2: Broken Authentication, session hijacking, JWT token manipulation, and brute force attacks",
          "OWASP #4 & #7: Cross-Site Scripting (XSS - Reflected, Stored, DOM-based) and Cross-Site Request Forgery (CSRF)",
          "Server-Side Request Forgery (SSRF), Insecure Direct Object References (IDOR), and File Upload exploits"
        ],
        deliverable: "OWASP Top 10 Web Application Vulnerability Audit Report with reproduction steps"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "SOC Operations, Threat Hunting & Capstone",
        description: "Analyze SIEM logs, conduct incident responses, understand AI security, and audit the capstone.",
        topics: [
          "Defensive Security Operations: The role of a Security Operations Center (SOC) and Incident Response lifecycles",
          "Security Information and Event Management (SIEM): Log collection, correlation rules, and Splunk basics",
          "Threat Hunting & Malware Analysis basics: Static vs dynamic analysis, sandboxing, and IOCs",
          "AI in Cybersecurity: How AI generates phishing attacks and how AI is used for anomaly threat detection",
          "Cloud Security fundamentals: AWS IAM misconfigurations, public S3 bucket exposure, and least privilege",
          "Career Preparation: Technical interview simulations, bug bounty walkthroughs, and resume optimization"
        ],
        deliverable: "Full-Spectrum Enterprise Vulnerability Assessment & Defensive Remediation Capstone"
      }
    ],
    projects: [
      {
        title: "CyberRange - Full-Spectrum Enterprise Vulnerability Assessment & Audit",
        tagline: "Comprehensive penetration testing and defensive security audit of a simulated enterprise.",
        description: "A simulated corporate infrastructure penetration test and defensive security audit. Students conduct OSINT reconnaissance, execute stealthy network port scanning using Nmap, intercept web traffic using Burp Suite to discover SQL Injection, XSS, and IDOR vulnerabilities on an enterprise portal, demonstrate privilege escalation, and produce an industry-standard executive Vulnerability Assessment and Penetration Testing (VAPT) report with prioritized CVSS scores and concrete remediation recommendations.",
        techStack: ["Kali Linux", "Burp Suite", "Nmap", "Wireshark", "Metasploit", "OWASP Top 10", "CVSS Scoring"],
        learningImpact: "Provides candidates with authentic, hands-on proof of penetration testing, vulnerability analysis, and security documentation capabilities required by cybersecurity recruiters."
      }
    ],
    courseFaqs: [
      {
        question: "Is this course legal and ethical?",
        answer: "100%. All hacking activities, penetration tests, and vulnerability assessments are performed exclusively on isolated virtual laboratory environments and intentional target ranges with explicit authorization. We teach ethical hacking to defend systems."
      },
      {
        question: "Do I need to be an expert programmer to learn cybersecurity?",
        answer: "No. You need to understand how networks operate, how systems communicate, and how web applications handle requests. We teach the necessary Linux commands, networking concepts, and security scripts throughout the course."
      },
      {
        question: "What entry-level cybersecurity certifications does this help prepare for?",
        answer: "The curriculum aligns directly with the core knowledge required for certifications like CompTIA Security+, CEH (Certified Ethical Hacker), and Junior Penetration Tester credentials."
      }
    ]
  },

  /* ==========================================================================
     11. UI/UX PRODUCT DESIGN WITH AI & MODERN SYSTEMS
     ========================================================================== */
  {
    id: "ui-ux-design",
    title: "UI/UX Product Design with AI & Modern Systems",
    shortTitle: "UI/UX Product Design",
    slug: "ui-ux-design",
    path: "/courses/ui-ux-design",
    duration: "90 Days",
    level: "Beginner to Intermediate",
    mode: "Live Interactive + Design Critiques",
    category: "Design & Growth",
    categoryKey: "design-growth",
    icon: "/media/personality.svg",
    image: "/courses/ui-ux-design.svg",
    badge: "Creative & High-Income",
    rating: 4.89,
    reviewsCount: 330,
    shortDescription: "Design intuitive digital products with User Research, Wireframing, Advanced Figma (Auto-layout, Design Systems, Tokens), Interactive Prototyping, and AI Design workflows.",
    skills: ["User Research & Personas", "Information Architecture", "Wireframing & UX Flows", "Advanced Figma (Auto-layout)", "Design Systems & Tokens", "Interactive Prototyping", "Micro-Interactions", "AI Design Tools (Relume/Midjourney)"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: false,

    tagline: "Craft Beautiful, Frictionless Digital Products People Love to Use — From UX Research to Figma Systems.",
    overview: [
      "Every successful mobile app, SaaS platform, and consumer website begins with exceptional product design. Companies value product designers who understand human psychology, business objectives, and scalable design systems.",
      "This 90-day bootcamp takes you from UX research fundamentals to building advanced design systems in Figma. You will conduct user interviews, build journey maps, structure information architecture, design high-fidelity responsive screens using Auto-layout, define design tokens and component variants, and animate micro-interactions.",
      "You will also incorporate modern generative AI tools (Midjourney for creative assets, Relume for wireframe generation, and Figma AI plugins) to design 3x faster, culminating in a complete FinTech application design system."
    ],
    highlights: [
      "90 Days of structured UI/UX product design, portfolio building, and live critique sessions",
      "Deep mastery of Figma: Auto-layout 5.0, Component Variants, Variables, and Design Tokens",
      "UX Research methodologies: User Personas, Empathy Maps, Journey Mapping, and Usability Testing",
      "Accelerating workflows with modern AI design tools: Relume, Midjourney, and Figma AI plugins",
      "1 Complete multi-platform FinTech product design system and interactive prototype capstone",
      "Campussutras Verified Product Designer Credential"
    ],
    targetAudience: [
      "Creative students and graduates who want to build high-income careers in tech without coding",
      "Graphic designers and visual artists looking to transition into digital product and UI/UX design",
      "Frontend developers who want to understand design systems, visual hierarchy, and user psychology"
    ],
    prerequisites: [
      "No prior coding or technical design background required; creative curiosity and attention to detail"
    ],
    careerRoles: [
      "UI/UX Designer",
      "Product Designer",
      "Visual Designer",
      "Interaction Designer",
      "Design Systems Associate"
    ],
    toolsAndTechnologies: [
      "Figma", "FigJam", "Relume AI", "Midjourney", "Notion", 
      "Material Design 3", "Apple Human Interface Guidelines", "Miro"
    ],
    keyOutcomes: [
      "Conduct user research interviews and translate findings into clear personas and journey maps",
      "Structure intuitive information architecture and user flows that minimize cognitive friction",
      "Build scalable, responsive components in Figma using advanced Auto-layout and constraint systems",
      "Develop complete Design Systems with standardized color tokens, typography scales, and component libraries",
      "Create high-fidelity interactive prototypes with realistic transitions and micro-animations"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "UX Research, User Psychology & Information Architecture",
        description: "Understand user needs, research methodologies, cognitive biases, and user flow mapping.",
        topics: [
          "Introduction to Product Design: UI vs UX, the Double Diamond design framework, and product lifecycles",
          "UX Research methods: Qualitative vs Quantitative, user interviews, surveys, and competitive analysis",
          "Synthesizing Insights: Creating User Personas, Empathy Maps, and User Journey Maps",
          "Psychology of Design: Hick's Law, Fitts's Law, Jakob's Law, and Gestalt Principles of visual perception",
          "Information Architecture: Card sorting, site maps, and user navigation flows",
          "Low-Fidelity Wireframing on paper and digital tools (FigJam / Relume AI) for rapid iteration"
        ],
        deliverable: "Comprehensive UX Research Case Study with User Personas, Journey Maps, and Wireframes"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Visual Design Foundations & Figma Mastery",
        description: "Master typography, color theory, grid systems, and essential Figma features.",
        topics: [
          "Visual Design Fundamentals: Typographic scales, hierarchy, contrast ratios, and accessibility (WCAG)",
          "Color Theory for Digital UI: 60-30-10 rule, semantic colors (Success, Warning, Error), and dark mode palettes",
          "Grid & Spacing Systems: 8pt grid system, margins, padding, and layout alignment",
          "Figma Interface Mastery: Vector networks, masking, styles, and asset libraries",
          "Figma Auto-layout Deep Dive: Horizontal/Vertical layouts, hugging vs filling, and absolute positioning",
          "Component Creation: Master components, instances, overrides, and Component Variants with boolean properties"
        ],
        deliverable: "High-Fidelity Responsive Mobile App Screen Suite designed with Auto-layout and components"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "Design Systems, Tokens & Interactive Prototyping",
        description: "Build enterprise design systems with variables, tokens, and advanced interactive prototypes.",
        topics: [
          "What is a Design System: Atomic Design methodology (Atoms, Molecules, Organisms, Templates, Pages)",
          "Figma Variables & Design Tokens: Color tokens, spacing variables, and instant light/dark mode switching",
          "Component States: Default, Hover, Active, Focus, and Disabled interactive variants",
          "Interactive Prototyping in Figma: Smart Animate, delay triggers, drag interactions, and overlay modals",
          "Micro-interactions: Button feedback, loading spinners, accordion animations, and page transitions",
          "Usability Testing: Formulating test scripts, recording user tasks, and analyzing usability friction"
        ],
        deliverable: "Complete Multi-Platform Design System with Variables, Tokens, and Interactive Components"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "AI Workflows, Design Handoff & Capstone Portfolio",
        description: "Leverage AI tools, prepare developer handoffs, and assemble a recruiter-ready portfolio.",
        topics: [
          "AI in Design: Using Midjourney for realistic product imagery, Relume for IA, and Figma AI plugins",
          "Developer Handoff: Inspect mode, documenting design specifications, redlines, and asset exports",
          "Collaborating with Engineers: Understanding CSS box models, responsiveness limitations, and token handoff",
          "Portfolio Case Study Storytelling: How to write case studies that hiring managers actually read",
          "Building your portfolio website and publishing work to Behance and Dribbble",
          "Career Preparation: Design whiteboard challenges, portfolio presentation interviews, and critique defense"
        ],
        deliverable: "FinNova FinTech Product Design System and Interactive Prototype with published Case Study"
      }
    ],
    projects: [
      {
        title: "FinNova - FinTech Mobile & Web App Design System & Prototype",
        tagline: "Complete multi-platform financial product design system and interactive prototype in Figma.",
        description: "A comprehensive digital product design capstone for a next-generation neo-banking and investment application. Features an exhaustive UX research study with 12 user interviews, detailed user flow maps, an atomic design system with 150+ components, Figma variables for instant Dark/Light mode switching, responsive web and mobile layouts built with Auto-layout 5.0, and an interactive prototype showcasing onboarding, fund transfers, and investment charts with realistic micro-animations.",
        techStack: ["Figma", "Design Systems", "Auto-layout 5.0", "Figma Variables", "Interactive Prototyping", "Midjourney AI"],
        learningImpact: "Provides a standout, portfolio-defining case study demonstrating end-to-end design thinking, component architecture, visual polish, and design system governance."
      }
    ],
    courseFaqs: [
      {
        question: "Do I need drawing skills or prior graphic design experience?",
        answer: "Not at all. UI/UX design is about problem solving, user psychology, structure, and visual clarity—not drawing or fine art. We teach you how to apply systematic rules like 8pt grids, typography scales, and design systems."
      },
      {
        question: "Is Figma free to use during the course?",
        answer: "Yes! Figma operates directly in your browser or desktop application with a comprehensive free tier that includes all the features needed to complete the course and build your portfolio."
      },
      {
        question: "How do AI tools help product designers today?",
        answer: "AI doesn't replace design thinking; it eliminates repetitive tasks. You will learn to use AI for rapid user persona generation, drafting copy, generating bespoke imagery with Midjourney, and speeding up layout scaffolding."
      }
    ]
  },

  /* ==========================================================================
     12. AI-POWERED GROWTH MARKETING & PERFORMANCE MEDIA
     ========================================================================== */
  {
    id: "digital-marketing",
    title: "AI-Powered Growth Marketing & Performance Media",
    shortTitle: "AI Growth Marketing",
    slug: "digital-marketing",
    aliases: ["growth-marketing"],
    path: "/courses/digital-marketing",
    duration: "90 Days",
    level: "Beginner to Intermediate",
    mode: "Live Interactive + Live Campaigns",
    category: "Design & Growth",
    categoryKey: "design-growth",
    icon: "/media/digital.svg",
    image: "/courses/digital-marketing.svg",
    badge: "Modern Growth",
    rating: 4.87,
    reviewsCount: 340,
    shortDescription: "Drive customer acquisition and revenue with Meta Ads, Google Ads Smart Bidding, Generative Engine Optimization (SearchGPT/Perplexity), GA4, MarTech automation, and AI creative production.",
    skills: ["Meta Ads Manager", "Google Ads & Smart Bidding", "Generative Engine Optimization (GEO)", "Programmatic SEO", "Google Analytics 4 (GA4)", "MarTech Automation (Zapier/Make)", "AI Ad Creative Workflows", "Conversion Rate Optimization (CRO)"],
    projectsCount: "1 Capstone Project",
    certification: "Industry Recognized + Verified Credential",
    featured: false,

    tagline: "Move Beyond Outdated Marketing — Master Modern AI Creatives, Performance Media, and Growth Funnels.",
    overview: [
      "Traditional digital marketing centered on manual copywriting and keyword stuffing is obsolete. Modern businesses hire Growth Marketers who combine data analytics, algorithm optimization, and AI automation to acquire customers profitably.",
      "This 90-day bootcamp equips you with the modern growth playbook: running ROI-positive paid acquisition across Meta Ads and Google Ads (PMax and Smart Bidding), optimizing for AI search engines (Generative Engine Optimization for SearchGPT and Perplexity), building programmatic SEO engines, tracking full funnels with Google Analytics 4 (GA4), and automating workflows with Zapier and Make.",
      "You will also master AI creative production (Midjourney, ChatGPT, Descript) to produce dozens of high-converting ad variations in minutes, culminating in an end-to-end 0-to-1 brand growth campaign."
    ],
    highlights: [
      "90 Days of live growth hacking, paid ad campaign optimization, and analytics masterclasses",
      "Full hands-on training with Meta Ads Manager and Google Ads Smart Bidding algorithms",
      "SearchGPT & Generative Engine Optimization (GEO) strategies for AI-era organic discovery",
      "Automated lead capture, email workflows, and CRM pipelines using Zapier and Make",
      "1 End-to-end D2C growth strategy and performance marketing campaign capstone",
      "Campussutras Verified Growth Marketer Credential"
    ],
    targetAudience: [
      "BBA, B.Com, MBA, and media students aiming for high-growth digital marketing and growth roles",
      "Entrepreneurs, freelancers, and agency founders wanting to master modern customer acquisition",
      "Traditional marketers looking to upgrade their skills with AI creative workflows and performance data"
    ],
    prerequisites: [
      "No technical or coding background required; creative curiosity and interest in consumer psychology"
    ],
    careerRoles: [
      "Growth Marketing Manager",
      "Performance Marketing Associate",
      "Paid Media Specialist (Meta / Google Ads)",
      "SEO & Content Strategist",
      "MarTech Automation Associate"
    ],
    toolsAndTechnologies: [
      "Meta Ads Manager", "Google Ads", "Google Analytics 4 (GA4)", "Google Tag Manager", 
      "SearchGPT / Perplexity", "Ahrefs / Semrush", "Zapier / Make", "Midjourney", "ChatGPT"
    ],
    keyOutcomes: [
      "Architect and run profitable paid ad campaigns on Meta Ads Manager and Google Ads",
      "Optimize organic brand visibility for modern AI engines (SearchGPT, Perplexity, Gemini)",
      "Configure Google Analytics 4 (GA4) and Google Tag Manager for multi-touch attribution tracking",
      "Produce high-converting ad copy, visual assets, and landing page funnels using generative AI",
      "Automate lead nurturing and CRM workflows using Zapier, Make, and email marketing platforms"
    ],
    curriculum: [
      {
        moduleNumber: 1,
        duration: "Weeks 1 - 3",
        title: "Growth Strategy, Customer Psychology & AI Creatives",
        description: "Master marketing funnels, unit economics, value propositions, and AI content workflows.",
        topics: [
          "The Modern Growth Playbook: AARRR Pirate Funnel (Acquisition, Activation, Retention, Referral, Revenue)",
          "Customer Psychology: Hook model, emotional triggers, problem-agitation-solution (PAS) frameworks",
          "Unit Economics: Customer Acquisition Cost (CAC), Lifetime Value (LTV), and Return on Ad Spend (ROAS)",
          "AI Creative Workflows: Prompting ChatGPT and Claude for high-converting direct-response ad copy",
          "Visual Asset Generation: Crafting product photography and social media ad creatives with Midjourney",
          "Building high-converting landing pages: Structure, above-the-fold optimization, and social proof"
        ],
        deliverable: "AI-Powered Brand Creative Suite with direct-response ad copy variations and Midjourney assets"
      },
      {
        moduleNumber: 2,
        duration: "Weeks 4 - 6",
        title: "Performance Advertising: Meta & Google Ads",
        description: "Launch, scale, and optimize high-ROI ad campaigns across Meta and Google ecosystems.",
        topics: [
          "Meta Ads Manager Architecture: Campaign Objectives, Ad Sets, Custom Audiences, and Lookalikes",
          "Understanding the Meta Auction: Ad relevance, estimated action rates, and creative testing strategies",
          "Google Ads: Search Intent, Keyword Match types, Negative Keywords, and Quality Score optimization",
          "Performance Max (PMax) Campaigns and Google Smart Bidding algorithm automation",
          "Budget allocation, bid caps, scaling strategies (Horizontal vs Vertical), and killing losing ads",
          "Ad compliance, avoiding account bans, and running A/B split creative tests"
        ],
        deliverable: "Live Campaign Architecture Plan with budget allocation, audience targeting, and ad creatives"
      },
      {
        moduleNumber: 3,
        duration: "Weeks 7 - 9",
        title: "GEO (Generative Engine Optimization) & Programmatic SEO",
        description: "Rank on traditional search engines and optimize brand discovery inside modern AI models.",
        topics: [
          "SEO Fundamentals: Search intent, on-page optimization, technical crawling, and internal linking",
          "Generative Engine Optimization (GEO): How Perplexity, SearchGPT, and Gemini choose sources",
          "Building Topical Authority: Content clusters, expert quotes, entity optimization, and Schema markup",
          "Programmatic SEO: Creating hundreds of targeted, high-intent landing pages using data templates",
          "Keyword Research in the AI era: Finding zero-competition long-tail search terms with Semrush / Ahrefs",
          "Backlink Acquisition: Digital PR strategies, guest posting, and unlinked brand mention reclamation"
        ],
        deliverable: "Generative Engine Optimization (GEO) & Programmatic SEO Strategy Document"
      },
      {
        moduleNumber: 4,
        duration: "Weeks 10 - 12",
        title: "Analytics, MarTech Automation & Capstone",
        description: "Track funnels with GA4, automate CRM workflows with Zapier, and build the growth capstone.",
        topics: [
          "Google Analytics 4 (GA4): Event-based data models, custom events, user exploration, and funnel drop-offs",
          "Google Tag Manager (GTM): Setting up tags, triggers, and tracking button clicks and form submissions",
          "Multi-touch Attribution modeling: First click vs Last click vs Data-driven attribution",
          "Marketing Automation with Zapier / Make: Connecting ad leads directly to Google Sheets, CRMs, and WhatsApp",
          "Email Lifecycle Marketing: Welcome sequences, abandoned cart recovery, and customer re-engagement",
          "Career Preparation: Growth portfolio reviews, performance marketing interview scenarios, and resume polish"
        ],
        deliverable: "Comprehensive 0-to-1 Brand Growth & Performance Marketing Capstone Campaign"
      }
    ],
    projects: [
      {
        title: "GrowthEngine - 0-to-1 D2C E-Commerce Brand Growth Strategy",
        tagline: "End-to-end performance marketing campaign with Meta Ads, GEO SEO & GA4 analytics.",
        description: "A complete multi-channel growth and performance marketing campaign designed to scale an e-commerce brand from 0 to 10,000 customers. Features customer persona research, an AI-generated suite of 20+ ad copy and Midjourney visual creatives, structured Meta and Google Ads campaign architectures, a Generative Engine Optimization (GEO) roadmap for SearchGPT discovery, GA4 event tracking, and an automated lead nurturing workflow built in Make.",
        techStack: ["Meta Ads Manager", "Google Ads", "Google Analytics 4", "SearchGPT SEO", "Zapier / Make", "Midjourney", "ChatGPT"],
        learningImpact: "Demonstrates practical mastery of modern performance marketing, data-driven analytics, and AI-accelerated growth strategies demanded by startups and global agencies."
      }
    ],
    courseFaqs: [
      {
        question: "How is this different from traditional digital marketing courses?",
        answer: "Traditional courses spend weeks teaching outdated blog posting and manual keyword stuffing. We focus on modern high-leverage growth: algorithmic Meta/Google Ads, Generative Engine Optimization (SearchGPT/Perplexity), GA4 event analytics, and AI creative workflows."
      },
      {
        question: "Do I need technical skills or coding to learn this?",
        answer: "No coding is required. We use no-code automation platforms like Zapier and Make, along with modern graphical dashboards like Meta Ads Manager and Google Analytics 4."
      },
      {
        question: "What career roles does this prepare me for?",
        answer: "Graduates are prepared for high-demand roles including Growth Marketing Associate, Performance Marketing Specialist, Digital Ads Manager, SEO Strategist, and E-commerce Growth Lead."
      }
    ]
  }
];

// Modern Categorization Taxonomy
export const courseCategories = [
  { key: "all", label: "All Programs (12)" },
  { key: "development", label: "Software Engineering" },
  { key: "ai", label: "Artificial Intelligence" },
  { key: "data", label: "Data & BI" },
  { key: "cloud-security", label: "Cloud & Security" },
  { key: "design-growth", label: "Design & Growth" },
];

export const featuredCourses = allCourses.filter((c) => c.featured);

// Helper function to find a course by its URL slug (supporting primary slug, id, and aliases)
export function getCourseBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return (
    allCourses.find(
      (course) =>
        course.slug.toLowerCase() === cleanSlug ||
        course.id.toLowerCase() === cleanSlug ||
        (Array.isArray(course.aliases) &&
          course.aliases.some((alias) => alias.toLowerCase() === cleanSlug))
    ) || null
  );
}

// Helper function to get all course slugs and aliases for static generation
export function getAllCourseSlugs() {
  const slugs = new Set();
  allCourses.forEach((course) => {
    slugs.add(course.slug);
    if (course.id && course.id !== course.slug) {
      slugs.add(course.id);
    }
    if (Array.isArray(course.aliases)) {
      course.aliases.forEach((alias) => slugs.add(alias));
    }
  });
  return Array.from(slugs);
}
