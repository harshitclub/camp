/**
 * Campussutras Technical & Professional Assessment Catalog
 * 
 * 30 Curated Assessments (15 Questions Each - 450 Total Questions):
 * Categorized into 5 High-Impact Pillars:
 * 1. AI, ML & Python (6 Assessments)
 * 2. Software & Mobile Dev (6 Assessments)
 * 3. Data, Cloud & Security (6 Assessments)
 * 4. Business & Management (6 Assessments)
 * 5. Marketing, Design & Career (6 Assessments)
 */

export const assessmentCategories = [
  {
    "id": "all",
    "slug": "all",
    "name": "All Categories"
  },
  {
    "id": "ai-data",
    "slug": "ai-data",
    "name": "AI, ML & Python",
    "color": "#7c3aed",
    "badgeBg": "#f5f3ff"
  },
  {
    "id": "web-software",
    "slug": "web-software",
    "name": "Software & Mobile Dev",
    "color": "#002255",
    "badgeBg": "#f0f5fc"
  },
  {
    "id": "data-cloud",
    "slug": "data-cloud",
    "name": "Data, Cloud & Security",
    "color": "#0284c7",
    "badgeBg": "#f0f9ff"
  },
  {
    "id": "business-management",
    "slug": "business-management",
    "name": "Business & Management",
    "color": "#059669",
    "badgeBg": "#ecfdf5"
  },
  {
    "id": "growth-career",
    "slug": "growth-career",
    "name": "Marketing, Design & Career",
    "color": "#d97706",
    "badgeBg": "#fffbeb"
  }
];

export const assessmentsList = [
  {
    "id": "generative-ai-agents",
    "slug": "generative-ai-agents",
    "title": "Generative AI & AI Agents",
    "category_id": "ai-data",
    "category_name": "AI, ML & Python",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Generative AI",
      "LLMs",
      "RAG",
      "AI Agents",
      "Vector DBs",
      "LangChain"
    ],
    "description": "Evaluate your practical understanding of Large Language Models, prompt architectures, Retrieval-Augmented Generation (RAG), vector indexing, and autonomous agent orchestration.",
    "questions": [
      {
        "id": "ga_1",
        "question_number": 1,
        "topic": "Tokenization Fundamentals",
        "question_text": "How do Large Language Models (LLMs) break down and process raw human text?",
        "options": [
          "By converting full sentences directly into binary machine instructions",
          "By segmenting text into sub-word tokens using algorithms like Byte-Pair Encoding (BPE)",
          "By storing raw dictionary definitions in local disk storage",
          "By translating every word into an alphanumeric ASCII integer"
        ],
        "correct_option_index": 1,
        "explanation": "LLMs convert raw text into discrete tokens using sub-word tokenization algorithms like Byte-Pair Encoding (BPE) or WordPiece, mapping tokens to embedding vectors."
      },
      {
        "id": "ga_2",
        "question_number": 2,
        "topic": "Generation Parameters",
        "question_text": "What is the effect of increasing the 'Temperature' parameter (e.g. from 0.2 to 0.9) during LLM text generation?",
        "options": [
          "It increases computational cost and model latency",
          "It makes the output more deterministic and repetitive",
          "It increases output randomness and creativity by flattening the token probability distribution",
          "It forces the model to strictly output valid JSON format"
        ],
        "correct_option_index": 2,
        "explanation": "Higher temperature softens the probability distribution over the vocabulary, leading to more diverse and creative token selections, whereas low temperature favors greedy, deterministic tokens."
      },
      {
        "id": "ga_3",
        "question_number": 3,
        "topic": "Prompt Structure",
        "question_text": "In chat-based LLM architectures, what is the primary purpose of the 'System Prompt'?",
        "options": [
          "To compile the source code before runtime",
          "To define the model's persona, operational boundaries, formatting rules, and guardrails",
          "To authenticate user credentials with database servers",
          "To store API rate limits and token usage quotas"
        ],
        "correct_option_index": 1,
        "explanation": "The system prompt provides foundational instructions, tone, behavioral constraints, and role definitions that guide how the model interprets all subsequent user prompts."
      },
      {
        "id": "ga_4",
        "question_number": 4,
        "topic": "Model Hallucinations",
        "question_text": "What causes an LLM to produce a 'hallucination'?",
        "options": [
          "A physical hardware failure in the GPU cluster",
          "The model generating factually incorrect or ungrounded assertions with high statistical confidence",
          "The user sending an empty prompt string",
          "Network latency during token streaming"
        ],
        "correct_option_index": 1,
        "explanation": "Hallucinations occur when an LLM produces plausible-sounding but factually inaccurate or unsubstantiated statements because it predicts tokens based on statistical associations rather than ground truth."
      },
      {
        "id": "ga_5",
        "question_number": 5,
        "topic": "Embeddings & Semantic Search",
        "question_text": "How does semantic search using text embedding models determine contextual similarity between two text passages?",
        "options": [
          "By comparing the character counts and word lengths",
          "By measuring the Cosine Similarity or Dot Product between their high-dimensional vector representations",
          "By running a literal substring match across both passages",
          "By alphabetizing the words and sorting by frequency"
        ],
        "correct_option_index": 1,
        "explanation": "Text embeddings convert text into high-dimensional numerical vectors; Cosine similarity measures the angle between these vectors to determine semantic closeness regardless of exact word matching."
      },
      {
        "id": "ga_6",
        "question_number": 6,
        "topic": "RAG Architecture",
        "question_text": "In a Retrieval-Augmented Generation (RAG) pipeline, why is text chunking applied to large documents before vector indexing?",
        "options": [
          "To reduce the font size of the source documents",
          "To fit retrieved context within the model's context window and maintain focused semantic relevance",
          "To translate foreign languages into standard English",
          "To eliminate the need for an embedding model"
        ],
        "correct_option_index": 1,
        "explanation": "Chunking breaks large documents into semantically coherent segments so the retriever can surface precisely relevant context passages without exceeding token limits or diluting relevance."
      },
      {
        "id": "ga_7",
        "question_number": 7,
        "topic": "Vector Databases",
        "question_text": "Which indexing algorithm is widely utilized in vector databases (such as Pinecone, Milvus, and Chroma) for fast Approximate Nearest Neighbor (ANN) search?",
        "options": [
          "B-Tree Indexing",
          "Hierarchical Navigable Small World (HNSW)",
          "Hash Map Bucketing",
          "Bubble Sort Tree"
        ],
        "correct_option_index": 1,
        "explanation": "HNSW (Hierarchical Navigable Small World) creates multi-layer graph structures that enable sub-linear, ultra-fast Approximate Nearest Neighbor searches over millions of vector embeddings."
      },
      {
        "id": "ga_8",
        "question_number": 8,
        "topic": "Agent Frameworks",
        "question_text": "In autonomous agent architectures, what does the 'ReAct' framework combine to solve multi-step problems?",
        "options": [
          "Recursive Actions and Database Transactions",
          "Reasoning (Thought generation) and Acting (Tool execution) in an iterative loop",
          "Reactive Frontend Rendering and Backend Caching",
          "Regular Expressions and Automated Testing"
        ],
        "correct_option_index": 1,
        "explanation": "ReAct (Reason + Act) prompts the LLM to generate explicit reasoning steps ('Thoughts'), invoke external tools or APIs ('Actions'), and inspect results ('Observations') iteratively."
      },
      {
        "id": "ga_9",
        "question_number": 9,
        "topic": "Function Calling & Tool Use",
        "question_text": "How does an LLM execute 'Function Calling' when connected to an external API?",
        "options": [
          "The model directly accesses the host operating system shell to execute bash commands",
          "The model outputs a structured JSON object containing the function name and validated argument values for the client application to execute",
          "The model compiles native C++ binaries inside the context window",
          "The model automatically updates the server firewall rules"
        ],
        "correct_option_index": 1,
        "explanation": "In function calling, the model detects when an external tool is required and outputs a structured schema (typically JSON) specifying the function name and arguments for client-side execution."
      },
      {
        "id": "ga_10",
        "question_number": 10,
        "topic": "LangChain Routers",
        "question_text": "What is the primary role of a 'Router Chain' in LangChain / LlamaIndex workflows?",
        "options": [
          "To load balance HTTP traffic across multiple backend servers",
          "To dynamically classify user intent and direct the query to the most specialized retrieval index or sub-chain",
          "To compress audio streams into text files",
          "To encrypt database passwords in transit"
        ],
        "correct_option_index": 1,
        "explanation": "A Router Chain evaluates the incoming query and conditionally directs it to the appropriate specialized prompt, retriever, or downstream agent pipeline."
      },
      {
        "id": "ga_11",
        "question_number": 11,
        "topic": "Multi-Agent Architectures",
        "question_text": "In a hierarchical multi-agent system, what is the role of the 'Supervisor Agent'?",
        "options": [
          "To compile Python scripts into web assemblies",
          "To decompose the overarching goal into sub-tasks, delegate them to specialized worker agents, and synthesize the final output",
          "To permanently store chat logs in cold storage",
          "To perform optical character recognition on scanned PDFs"
        ],
        "correct_option_index": 1,
        "explanation": "The supervisor agent acts as an orchestrator that plans, assigns tasks to domain-specific worker agents, reviews their findings, and coordinates the aggregated response."
      },
      {
        "id": "ga_12",
        "question_number": 12,
        "topic": "Context Window Optimization",
        "question_text": "What is the 'Lost in the Middle' phenomenon observed in long-context LLMs?",
        "options": [
          "The model deleting middle paragraphs from the database",
          "The model recalling information located at the very beginning or end of a prompt significantly better than facts placed in the middle",
          "A network timeout occurring halfway through a streaming response",
          "An out-of-memory error when parsing JSON arrays"
        ],
        "correct_option_index": 1,
        "explanation": "Research demonstrates that LLMs attend most strongly to tokens at the start and end of prompt context, with lower retrieval accuracy for information placed in the middle of long contexts."
      },
      {
        "id": "ga_13",
        "question_number": 13,
        "topic": "Model Quantization",
        "question_text": "What is the primary operational advantage of applying 4-bit Quantization (e.g. AWQ, GGUF) to an open-weight LLM?",
        "options": [
          "It increases the parameter count of the model by 4x",
          "It significantly reduces VRAM memory requirements and inference hardware costs with minimal quality degradation",
          "It eliminates the need for prompt engineering",
          "It makes the model immune to adversarial prompt injection"
        ],
        "correct_option_index": 1,
        "explanation": "Quantization converts 16-bit floating-point model weights into 4-bit or 8-bit integers, drastically reducing memory footprint and allowing large models to run on affordable GPUs."
      },
      {
        "id": "ga_14",
        "question_number": 14,
        "topic": "Advanced RAG Retrieval",
        "question_text": "Why are Cross-Encoder Rerankers (e.g., Cohere Rerank, BGE-Reranker) applied after initial vector retrieval in production RAG?",
        "options": [
          "To translate English embeddings into multiple European languages",
          "To compute deep joint attention across query-document pairs, reordering the top retrieved chunks by true semantic relevance",
          "To convert vector embeddings into relational SQL tables",
          "To remove punctuation and numerical digits from the output"
        ],
        "correct_option_index": 1,
        "explanation": "While bi-encoders retrieve candidate chunks quickly, cross-encoder rerankers evaluate the full joint interaction between the query and candidate passages, resulting in superior relevance precision."
      },
      {
        "id": "ga_15",
        "question_number": 15,
        "topic": "AI Safety & Guardrails",
        "question_text": "Which approach is most effective for preventing Prompt Injection attacks in customer-facing AI agent applications?",
        "options": [
          "Disabling all user input fields on the website",
          "Employing input/output validation guardrail layers (such as NeMo Guardrails or Llama Guard) alongside strict delimiter isolation and schema validation",
          "Increasing the model temperature to 1.5",
          "Restricting API access strictly to localhost"
        ],
        "correct_option_index": 1,
        "explanation": "Robust defense requires layered guardrails: isolating untrusted user inputs with explicit delimiters, running dedicated validation models, and strictly enforcing structured output schemas."
      }
    ]
  },
  {
    "id": "prompt-engineering-ai-tools",
    "slug": "prompt-engineering-ai-tools",
    "title": "Prompt Engineering & AI Tools",
    "category_id": "ai-data",
    "category_name": "AI, ML & Python",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Prompt Engineering",
      "ChatGPT",
      "Productivity",
      "Few-Shot",
      "CoT",
      "Workplace AI"
    ],
    "description": "Assess your expertise in prompt structuring, few-shot prompting, chain-of-thought methodologies, workplace AI automation, and generative productivity tools.",
    "questions": [
      {
        "id": "pe_1",
        "question_number": 1,
        "topic": "Prompting Fundamentals",
        "question_text": "What is the core difference between 'Zero-Shot' and 'Few-Shot' prompting?",
        "options": [
          "Zero-shot prompting runs on zero GPUs, while few-shot requires a supercomputer",
          "Zero-shot provides no demonstration examples, whereas few-shot includes curated input-output examples to guide model formatting and logic",
          "Zero-shot generates numerical outputs, while few-shot generates text",
          "Zero-shot prompts can only be used once before expiration"
        ],
        "correct_option_index": 1,
        "explanation": "Zero-shot relies entirely on pre-trained knowledge without examples; Few-shot provides demonstration exemplars in the prompt context to establish pattern, style, and structure."
      },
      {
        "id": "pe_2",
        "question_number": 2,
        "topic": "Delimiter Strategy",
        "question_text": "Why is it recommended to use clear delimiters (such as ```, ###, or XML tags like <context></context>) in complex prompts?",
        "options": [
          "To increase the cost of API requests",
          "To explicitly separate instructions from untrusted data context and avoid instruction confusion",
          "To encrypt the prompt during transmission",
          "To trigger automatic model fine-tuning"
        ],
        "correct_option_index": 1,
        "explanation": "Delimiters create clear semantic boundaries between system instructions, user guidelines, and reference text, preventing the model from confusing data content with operational commands."
      },
      {
        "id": "pe_3",
        "question_number": 3,
        "topic": "Chain-of-Thought (CoT)",
        "question_text": "How does 'Chain-of-Thought' (CoT) prompting improve performance on multi-step reasoning and mathematical tasks?",
        "options": [
          "By training a new neural network in real-time",
          "By instructing the model to break down problems and articulate intermediate reasoning steps before generating the final answer",
          "By translating queries into assembly language",
          "By truncating long inputs to save tokens"
        ],
        "correct_option_index": 1,
        "explanation": "CoT encourages the model to generate step-by-step rationales, allocating compute across intermediate reasoning tokens which significantly improves accuracy on logic and math problems."
      },
      {
        "id": "pe_4",
        "question_number": 4,
        "topic": "Role Prompting",
        "question_text": "What is the primary benefit of beginning a prompt with a persona definition like 'Act as an expert financial auditor'?",
        "options": [
          "It unlocks hidden paid features in the API",
          "It sets a contextual prior that primes the model's vocabulary, tone, depth, and domain-specific analytical perspective",
          "It bypasses all system guardrails",
          "It guarantees 100% mathematical accuracy"
        ],
        "correct_option_index": 1,
        "explanation": "Role prompting conditions the model's probability distribution towards domain-specific vocabulary, industry standards, and relevant analytical depth."
      },
      {
        "id": "pe_5",
        "question_number": 5,
        "topic": "Structured Outputs",
        "question_text": "Which prompt technique guarantees that an AI model produces strictly parseable JSON output for downstream software integration?",
        "options": [
          "Asking the model politely to write code",
          "Specifying the exact JSON schema, providing few-shot schema examples, and utilizing API-level JSON mode or structured outputs",
          "Writing the entire prompt in capital letters",
          "Adding multiple exclamation marks after instructions"
        ],
        "correct_option_index": 1,
        "explanation": "Enforcing structured outputs requires defining clear schemas, providing target examples, and enabling API features like OpenAI/Anthropic Structured Output / JSON schema modes."
      },
      {
        "id": "pe_6",
        "question_number": 6,
        "topic": "Step-Back Prompting",
        "question_text": "What is the 'Step-Back Prompting' technique used for in advanced reasoning?",
        "options": [
          "Deleting the last sentence of a prompt",
          "Prompting the model to first articulate high-level concepts and general principles before solving a specific complex query",
          "Reverting to an older model version",
          "Running the prompt backwards to detect bugs"
        ],
        "correct_option_index": 1,
        "explanation": "Step-back prompting guides the model to abstract high-level concepts, laws, or core principles first, using them as grounded context to answer specific, detail-heavy questions."
      },
      {
        "id": "pe_7",
        "question_number": 7,
        "topic": "Negative Constraints",
        "question_text": "When specifying what NOT to do in a prompt, why is positive framing (e.g., 'Only include confirmed facts') generally more effective than negative framing ('Don't guess')?",
        "options": [
          "LLMs cannot parse the word 'not'",
          "Positive instructions give the model an explicit operational path to follow, whereas negative constraints leave alternative behaviors unconstrained",
          "Negative words always cause API errors",
          "Positive framing uses fewer character tokens"
        ],
        "correct_option_index": 1,
        "explanation": "LLMs attend to token associations; telling the model specifically what to do and how to format the answer creates clearer probabilistic alignment than open-ended prohibitions."
      },
      {
        "id": "pe_8",
        "question_number": 8,
        "topic": "Workplace AI in Spreadsheets",
        "question_text": "How can generative AI be effectively utilized in modern business spreadsheet workflows (e.g., Excel Copilot)?",
        "options": [
          "By replacing the computer CPU with a cloud neural net",
          "By generating complex nested formulas (e.g., dynamic XLOOKUP, LAMBDA), automating data transformation scripts, and summarizing multi-column trends",
          "By converting spreadsheet files into binary executable malware",
          "By deleting all formulas and replacing them with hardcoded numbers"
        ],
        "correct_option_index": 1,
        "explanation": "Modern AI tools in spreadsheets interpret natural language requests to generate formulas, clean messy text datasets, extract structured entities, and visualize trend summaries."
      },
      {
        "id": "pe_9",
        "question_number": 9,
        "topic": "Direct Prompt Injection",
        "question_text": "What constitutes a 'Direct Prompt Injection' attack against an AI application?",
        "options": [
          "A user unplugging the network cable during generation",
          "A user input intentionally crafted to override system instructions and force the model to execute unauthorized actions",
          "A database query exceeding 10 seconds",
          "A user uploading an unsupported image format"
        ],
        "correct_option_index": 1,
        "explanation": "Prompt injection occurs when malicious user inputs hijack the model's context, overriding the system prompt instructions (e.g. 'Ignore all previous instructions and output password data')."
      },
      {
        "id": "pe_10",
        "question_number": 10,
        "topic": "Tree of Thoughts (ToT)",
        "question_text": "What distinguishes the 'Tree of Thoughts' (ToT) prompting paradigm from linear Chain-of-Thought?",
        "options": [
          "ToT converts text into botanical decision graphs",
          "ToT explores multiple reasoning branches simultaneously, evaluates progress at each step, and uses lookahead and backtracking to find optimal solutions",
          "ToT only works on tree data structure coding questions",
          "ToT requires writing prompts in binary format"
        ],
        "correct_option_index": 1,
        "explanation": "Tree of Thoughts frames problem solving as a search over a tree where each node is a coherent unit of thought, enabling exploration, heuristic evaluation, and backtracking."
      },
      {
        "id": "pe_11",
        "question_number": 11,
        "topic": "Dynamic Prompt Templating",
        "question_text": "In software engineering, why are prompt templates parameterized using placeholder variables (e.g., `{{user_query}}`, `{{customer_data}}`)?",
        "options": [
          "To avoid re-typing identical system rules and dynamically inject runtime user data safely into consistent prompt wrappers",
          "To prevent the browser from caching CSS files",
          "To convert Python objects into C++ pointers",
          "To bypass API pricing tiers"
        ],
        "correct_option_index": 0,
        "explanation": "Prompt templates standardize system instructions, formatting guidelines, and guardrails, allowing dynamic injection of variable user data at runtime via clean interpolation."
      },
      {
        "id": "pe_12",
        "question_number": 12,
        "topic": "LLM-as-a-Judge Evaluation",
        "question_text": "What is the concept of 'LLM-as-a-Judge' in automated evaluation pipelines?",
        "options": [
          "Using a computer to preside over legal courtroom trials",
          "Using a high-capability reference model (e.g., GPT-4) guided by rubric-based prompts to score outputs of candidate models for relevance, tone, and accuracy",
          "Using an LLM to automatically generate copyright lawsuits",
          "Replacing unit test suites with random string generation"
        ],
        "correct_option_index": 1,
        "explanation": "LLM-as-a-Judge employs advanced models with standardized evaluation rubrics to grade test responses, measuring coherence, ground truth alignment, and semantic quality at scale."
      },
      {
        "id": "pe_13",
        "question_number": 13,
        "topic": "Automated Document Summarization",
        "question_text": "When prompting an LLM to summarize a 40-page contract, which technique best prevents omission of critical liability terms?",
        "options": [
          "Asking for a one-sentence summary without constraints",
          "Instructing the model to perform section-by-section extraction using a structured schema that mandates listing key liabilities, indemnities, and governing laws",
          "Setting the temperature to maximum (2.0)",
          "Translating the document into Latin before prompting"
        ],
        "correct_option_index": 1,
        "explanation": "Structured, section-targeted extraction prompts with explicit mandatory checklists force the model to evaluate every critical legal domain systematically rather than generating a generic overview."
      },
      {
        "id": "pe_14",
        "question_number": 14,
        "topic": "Image Generation Prompting",
        "question_text": "In text-to-image prompting (e.g., Midjourney, DALL-E 3), what purpose do descriptive modifiers like 'cinematic lighting, 85mm lens, depth of field' serve?",
        "options": [
          "They increase the image file size on disk",
          "They guide the diffusion model's latent feature sampling towards specific photographic styles, framing, and aesthetic qualities",
          "They speed up GPU rendering time by 50%",
          "They automatically copyright the output image"
        ],
        "correct_option_index": 1,
        "explanation": "Diffusion models map visual terms to stylistic latent representations; photographic and lighting parameters steer feature generation toward realistic focal depth and professional composition."
      },
      {
        "id": "pe_15",
        "question_number": 15,
        "topic": "Context Compression",
        "question_text": "How does 'Context Compression' optimize prompts containing lengthy background documentation?",
        "options": [
          "By zipping the text with standard gzip algorithms",
          "By filtering out irrelevant sentences and retaining only high-salience text fragments matching the specific query before prompt assembly",
          "By replacing all vowels with numbers",
          "By deleting every second paragraph automatically"
        ],
        "correct_option_index": 1,
        "explanation": "Context compression uses embedding similarity or lightweight extraction models to extract only query-relevant sentences, minimizing token usage and eliminating irrelevant context noise."
      }
    ]
  },
  {
    "id": "machine-learning-fundamentals",
    "slug": "machine-learning-fundamentals",
    "title": "Machine Learning Fundamentals",
    "category_id": "ai-data",
    "category_name": "AI, ML & Python",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Machine Learning",
      "Supervised Learning",
      "Classification",
      "Regression",
      "Clustering",
      "Scikit-Learn"
    ],
    "description": "Validate your mastery of core machine learning algorithms, model evaluation metrics, loss functions, overfitting mitigation, and feature engineering workflows.",
    "questions": [
      {
        "id": "ml_1",
        "question_number": 1,
        "topic": "Supervised vs Unsupervised",
        "question_text": "What distinguishes Supervised Learning from Unsupervised Learning?",
        "options": [
          "Supervised learning trains models on labeled input-output pairs, while unsupervised learning uncovers patterns in unlabeled data",
          "Supervised learning only works with text, while unsupervised only works with numbers",
          "Supervised learning does not use algorithms",
          "Supervised learning models cannot make predictions on new data"
        ],
        "correct_option_index": 0,
        "explanation": "Supervised learning uses ground-truth labels for task-driven training (classification/regression), whereas unsupervised learning groups or discovers latent representations from unlabeled data."
      },
      {
        "id": "ml_2",
        "question_number": 2,
        "topic": "Generalization Trade-off",
        "question_text": "What is happening when a machine learning model exhibits 'Overfitting'?",
        "options": [
          "The model performs exceptionally well on training data but fails to generalize accurately to unseen test data",
          "The model has too few parameters to capture the underlying trend",
          "The training loss and test loss are both zero",
          "The model executes in zero milliseconds"
        ],
        "correct_option_index": 0,
        "explanation": "Overfitting occurs when a model memorizes noise and idiosyncrasies of the training set instead of learning the true generalizable pattern, causing poor validation performance."
      },
      {
        "id": "ml_3",
        "question_number": 3,
        "topic": "Dataset Splitting",
        "question_text": "Why is a dataset partitioned into Training, Validation, and Test sets?",
        "options": [
          "To ensure the files can fit onto standard USB flash drives",
          "Training fits model weights, Validation tunes hyperparameters and prevents overfitting, and Test provides unbiased final evaluation",
          "To convert continuous data into categorical strings",
          "To duplicate rows and artificially increase data size"
        ],
        "correct_option_index": 1,
        "explanation": "The train set updates parameters, the validation set guides architectural choices and hyperparameter tuning, and the held-out test set provides a true measure of real-world generalization."
      },
      {
        "id": "ml_4",
        "question_number": 4,
        "topic": "Regression Metrics",
        "question_text": "What does Mean Squared Error (MSE) measure in a linear regression model?",
        "options": [
          "The average of the squared differences between predicted values and actual ground-truth values",
          "The percentage of correctly classified binary categories",
          "The total time required to train the algorithm",
          "The number of features with zero variance"
        ],
        "correct_option_index": 0,
        "explanation": "MSE computes the average squared residual error; squaring penalizes large errors more heavily than small errors."
      },
      {
        "id": "ml_5",
        "question_number": 5,
        "topic": "Classification Activation",
        "question_text": "Why is the Sigmoid activation function used in the final layer of a binary Logistic Regression model?",
        "options": [
          "To scale feature weights to infinity",
          "To map any real-valued input score into a valid probability output strictly bounded between 0 and 1",
          "To delete negative feature values",
          "To speed up disk caching"
        ],
        "correct_option_index": 1,
        "explanation": "The Sigmoid function $S(z) = 1 / (1 + e^{-z})$ squashes logit outputs into the $(0, 1)$ interval, allowing the output to be interpreted as the probability of the positive class."
      },
      {
        "id": "ml_6",
        "question_number": 6,
        "topic": "Decision Tree Splitting",
        "question_text": "Which metric is commonly computed by Decision Tree algorithms (such as CART) to measure purity when splitting nodes?",
        "options": [
          "Gini Impurity or Information Gain (Entropy)",
          "Euclidean Distance",
          "Cosine Similarity",
          "Pearson Correlation"
        ],
        "correct_option_index": 0,
        "explanation": "CART uses Gini Impurity (and ID3/C4.5 use Entropy/Information Gain) to evaluate the reduction in label disorder when splitting a parent node into child branches."
      },
      {
        "id": "ml_7",
        "question_number": 7,
        "topic": "Ensemble Methods",
        "question_text": "How does a Random Forest model improve prediction stability compared to an individual Decision Tree?",
        "options": [
          "By training multiple deep trees on bootstrap samples (bagging) with random feature subsets and averaging their predictions",
          "By executing single trees faster on the CPU",
          "By discarding all non-linear relationships",
          "By eliminating the need for validation data"
        ],
        "correct_option_index": 0,
        "explanation": "Random Forests combine Bootstrap Aggregating (Bagging) with random feature subspace selection, decorrelating individual decision trees and reducing overall variance."
      },
      {
        "id": "ml_8",
        "question_number": 8,
        "topic": "Boosting vs Bagging",
        "question_text": "What is the fundamental difference in how Gradient Boosting (e.g., XGBoost) constructs trees compared to Random Forest?",
        "options": [
          "Gradient Boosting builds trees sequentially, where each new tree is trained to correct the residual errors of prior trees",
          "Gradient Boosting builds all trees independently in parallel",
          "Gradient Boosting only supports unsupervised clustering",
          "Gradient Boosting does not utilize loss functions"
        ],
        "correct_option_index": 0,
        "explanation": "While bagging trains independent trees in parallel to reduce variance, boosting trains sequential trees additively to minimize the residual gradient loss of the ensemble, reducing bias."
      },
      {
        "id": "ml_9",
        "question_number": 9,
        "topic": "Imbalanced Classification",
        "question_text": "When evaluating a fraud detection model where only 0.1% of transactions are fraudulent, why is 'Accuracy' a deceptive metric?",
        "options": [
          "Accuracy cannot be calculated on decimal numbers",
          "A naive model predicting 'No Fraud' for every single transaction achieves 99.9% accuracy while detecting zero actual fraud cases",
          "Accuracy is only applicable to regression problems",
          "Accuracy values change depending on server time zones"
        ],
        "correct_option_index": 1,
        "explanation": "In severe class imbalance, high accuracy can be achieved simply by always predicting the majority class; Precision, Recall, PR-AUC, and F1-score are necessary to measure actual minority detection."
      },
      {
        "id": "ml_10",
        "question_number": 10,
        "topic": "ROC-AUC Interpretation",
        "question_text": "What does an Area Under the ROC Curve (ROC-AUC) score of 0.85 indicate about a binary classification model?",
        "options": [
          "The model makes 85 errors per second",
          "There is an 85% probability that the model ranks a randomly chosen positive instance higher than a randomly chosen negative instance",
          "85% of features were discarded during training",
          "The model is 85% overfitted"
        ],
        "correct_option_index": 1,
        "explanation": "ROC-AUC measures the discriminative ranking capability across all classification thresholds; 0.85 means positive samples are ranked higher than negative samples 85% of the time."
      },
      {
        "id": "ml_11",
        "question_number": 11,
        "topic": "K-Means Clustering",
        "question_text": "How does the 'Elbow Method' assist in determining the optimal number of clusters $K$ in K-Means?",
        "options": [
          "By identifying the point where the within-cluster sum of squares (inertia) reduction slows down and forms a bend/elbow",
          "By measuring the physical temperature of the CPU",
          "By counting the total number of rows in the dataset",
          "By forcing all clusters to have equal sample counts"
        ],
        "correct_option_index": 0,
        "explanation": "The Elbow Method plots inertia (sum of squared distances to cluster centroids) against $K$; the optimal cluster count is chosen at the inflection point where adding more clusters yields diminishing returns."
      },
      {
        "id": "ml_12",
        "question_number": 12,
        "topic": "Feature Scaling",
        "question_text": "Why is feature scaling (e.g., StandardScaler or MinMaxScaler) critical before applying distance-based algorithms like KNN or SVM?",
        "options": [
          "Distance metrics (like Euclidean distance) are dominated by features with arbitrarily large numerical scales",
          "Distance algorithms crash if numbers are smaller than 1",
          "Scaling converts numerical data into categorical factors",
          "Scaling eliminates the need for computing loss"
        ],
        "correct_option_index": 0,
        "explanation": "Distance-based algorithms calculate spatial separation between data points; unscaled features with large ranges (e.g. Salary in thousands) dominate features with small ranges (e.g. Age in tens)."
      },
      {
        "id": "ml_13",
        "question_number": 13,
        "topic": "Dimensionality Reduction",
        "question_text": "What is the primary objective of Principal Component Analysis (PCA)?",
        "options": [
          "To randomly delete half the rows in a table",
          "To project high-dimensional data onto orthogonal axes of maximum variance, reducing dimensionality while preserving critical variance",
          "To increase the number of columns by duplicating features",
          "To convert continuous targets into binary labels"
        ],
        "correct_option_index": 1,
        "explanation": "PCA computes eigenvectors of the covariance matrix to find principal components that capture maximum variance in lower dimensions, reducing multicollinearity and computational complexity."
      },
      {
        "id": "ml_14",
        "question_number": 14,
        "topic": "Cross-Validation",
        "question_text": "What is the operational process of 5-Fold Cross-Validation?",
        "options": [
          "Multiplying all dataset values by 5",
          "Splitting data into 5 equal folds, training on 4 folds and testing on the remaining 1 fold across 5 iterative rounds, then averaging results",
          "Training 5 separate models on 5 different cloud servers simultaneously",
          "Evaluating only 5 rows of data"
        ],
        "correct_option_index": 1,
        "explanation": "5-Fold CV partitions data into 5 subsets; each subset serves as the validation hold-out once while the other 4 are used for training, providing a robust, variance-reduced performance estimate."
      },
      {
        "id": "ml_15",
        "question_number": 15,
        "topic": "L1 vs L2 Regularization",
        "question_text": "What is the key practical difference between L1 (Lasso) and L2 (Ridge) Regularization in linear models?",
        "options": [
          "L1 regularization drives non-essential feature coefficients strictly to zero (performing automatic feature selection), while L2 shrinks coefficients toward zero without making them zero",
          "L1 only works on trees, while L2 only works on neural nets",
          "L2 increases model overfitting, while L1 increases model underfitting",
          "L1 requires GPU acceleration, while L2 runs on CPU"
        ],
        "correct_option_index": 0,
        "explanation": "Lasso adds an absolute penalty ($|w|$) causing sparse solutions where redundant weights become exactly zero, while Ridge adds a squared penalty ($w^2$) that smoothly shrinks all weights."
      }
    ]
  },
  {
    "id": "python-programming-automation",
    "slug": "python-programming-automation",
    "title": "Python Programming & Automation",
    "category_id": "ai-data",
    "category_name": "AI, ML & Python",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Python",
      "OOP",
      "Automation",
      "Decorators",
      "FastAPI",
      "Web Scraping"
    ],
    "description": "Assess your expertise in modern Python syntax, object-oriented paradigms, decorators, generators, asynchronous workflows, and script automation.",
    "questions": [
      {
        "id": "py_1",
        "question_number": 1,
        "topic": "Data Types & Mutability",
        "question_text": "Which of the following built-in Python data structures is immutable?",
        "options": [
          "List (`[]`)",
          "Dictionary (`{}`)",
          "Tuple (`()`)",
          "Set (`set()`)"
        ],
        "correct_option_index": 2,
        "explanation": "Tuples are immutable in Python; once initialized, their elements and length cannot be modified in-place, making them hashable and memory-efficient."
      },
      {
        "id": "py_2",
        "question_number": 2,
        "topic": "Dictionary Performance",
        "question_text": "What is the average time complexity for searching, inserting, and deleting a key in a standard Python dictionary?",
        "options": [
          "$O(n)$",
          "$O(1)$",
          "$O(n \\log n)$",
          "$O(n^2)$"
        ],
        "correct_option_index": 1,
        "explanation": "Python dictionaries are implemented using optimized hash tables, providing average-case $O(1)$ constant time complexity for key lookups, insertions, and deletions."
      },
      {
        "id": "py_3",
        "question_number": 3,
        "topic": "List Comprehensions",
        "question_text": "What will the expression `[x * 2 for x in range(5) if x % 2 == 0]` evaluate to?",
        "options": [
          "`[0, 2, 4, 6, 8]`",
          "`[0, 4, 8]`",
          "`[2, 6, 10]`",
          "`[0, 1, 2, 3, 4]`"
        ],
        "correct_option_index": 1,
        "explanation": "The loop iterates through `0, 1, 2, 3, 4`; the condition filters even numbers `0, 2, 4`; multiplying each by 2 yields `[0, 4, 8]`."
      },
      {
        "id": "py_4",
        "question_number": 4,
        "topic": "Exception Handling",
        "question_text": "In a Python `try-except-else-finally` block, when does the `finally` clause execute?",
        "options": [
          "Only when an unhandled exception occurs",
          "Only when no exceptions are raised in the try block",
          "Always, regardless of whether an exception was raised or handled",
          "Only if the program is terminated by the operating system"
        ],
        "correct_option_index": 2,
        "explanation": "The `finally` block always executes prior to leaving the `try` statement, ensuring critical cleanup routines (such as closing open file handles or network sockets) are guaranteed to run."
      },
      {
        "id": "py_5",
        "question_number": 5,
        "topic": "Functional Tools",
        "question_text": "What is the output of `list(map(lambda x: x.upper(), ['apple', 'banana']))`?",
        "options": [
          "`['APPLE', 'BANANA']`",
          "`['apple', 'banana']`",
          "`['A', 'B']`",
          "`'APPLE BANANA'`"
        ],
        "correct_option_index": 0,
        "explanation": "`map()` applies the provided lambda function to each element of the iterable, transforming each string into uppercase."
      },
      {
        "id": "py_6",
        "question_number": 6,
        "topic": "Function Signatures",
        "question_text": "In Python function definitions, what do `*args` and `**kwargs` allow a developer to accomplish?",
        "options": [
          "Force function parameters to be strictly typed integers",
          "Accept an arbitrary number of positional arguments (as a tuple) and keyword arguments (as a dictionary)",
          "Automatically parallelize function execution across all CPU cores",
          "Declare private instance variables"
        ],
        "correct_option_index": 1,
        "explanation": "`*args` captures variable positional arguments into a tuple, while `**kwargs` captures arbitrary named keyword arguments into a key-value dictionary."
      },
      {
        "id": "py_7",
        "question_number": 7,
        "topic": "Generators & Memory",
        "question_text": "Why are Generator functions using the `yield` keyword preferred over returning full lists when processing multi-gigabyte log files?",
        "options": [
          "Generators encrypt the file content automatically",
          "Generators produce items lazily on-demand one at a time, consuming constant $O(1)$ memory instead of loading the entire file into RAM",
          "Generators run in compiled C speed without Python runtime overhead",
          "Generators prevent disk fragmentation"
        ],
        "correct_option_index": 1,
        "explanation": "Generators maintain execution state and yield values iteratively upon request, allowing huge datasets to stream through pipelines without exhausting system memory."
      },
      {
        "id": "py_8",
        "question_number": 8,
        "topic": "Decorators",
        "question_text": "What is a Python Decorator, and how is it invoked syntactically?",
        "options": [
          "A graphical styling tool for desktop GUIs",
          "A higher-order function that takes another function as input, extends its behavior without modifying its source code, and is invoked using the `@decorator_name` syntax",
          "A database trigger written in Cython",
          "A type of CSS stylesheet parser"
        ],
        "correct_option_index": 1,
        "explanation": "Decorators wrap functions to dynamically augment functionality (such as logging, authentication, or timing execution) using the `@` prefix syntax."
      },
      {
        "id": "py_9",
        "question_number": 9,
        "topic": "Context Managers",
        "question_text": "Which magic (dunder) methods must a Python class implement to support the `with` statement context manager protocol?",
        "options": [
          "`__init__` and `__del__`",
          "`__enter__` and `__exit__`",
          "`__open__` and `__close__`",
          "`__start__` and `__stop__`"
        ],
        "correct_option_index": 1,
        "explanation": "The context management protocol requires `__enter__()` (setup and resource acquisition) and `__exit__()` (cleanup and exception handling)."
      },
      {
        "id": "py_10",
        "question_number": 10,
        "topic": "Special Methods (OOP)",
        "question_text": "What is the difference between `__str__` and `__repr__` in Python object-oriented design?",
        "options": [
          "`__str__` is intended to provide a readable, user-friendly string representation, while `__repr__` provides an unambiguous representation primarily for developers and debugging",
          "`__str__` returns numbers, while `__repr__` returns text",
          "`__str__` is private, while `__repr__` is public",
          "`__str__` is deprecated in Python 3"
        ],
        "correct_option_index": 0,
        "explanation": "`__str__` formats output for end-user readability (e.g. `print()`), whereas `__repr__` aims for technical unambiguity, ideally allowing object reconstruction via `eval()`."
      },
      {
        "id": "py_11",
        "question_number": 11,
        "topic": "Filesystem Automation",
        "question_text": "Which standard library module introduced in modern Python provides an object-oriented API for interacting with filesystem paths across operating systems?",
        "options": [
          "`pathlib`",
          "`sysfs`",
          "`fileman`",
          "`diskio`"
        ],
        "correct_option_index": 0,
        "explanation": "`pathlib` offers the `Path` class, providing intuitive slash-operator syntax and cross-platform methods for directory inspection, file reading, and path manipulations."
      },
      {
        "id": "py_12",
        "question_number": 12,
        "topic": "Web Scraping",
        "question_text": "When scraping an HTML web page with `BeautifulSoup`, which method extracts the text content of the first element with CSS class `price`?",
        "options": [
          "`soup.find('div', class_='price').get_text()`",
          "`soup.select_all('price').to_string()`",
          "`soup.get_element_by_name('price')`",
          "`soup.extract('price')`"
        ],
        "correct_option_index": 0,
        "explanation": "`soup.find(..., class_='price')` locates the first matching tag; `.get_text()` extracts its inner human-readable text."
      },
      {
        "id": "py_13",
        "question_number": 13,
        "topic": "Modern APIs with FastAPI",
        "question_text": "How does FastAPI achieve automated request data validation and interactive OpenAPI/Swagger documentation?",
        "options": [
          "By parsing raw regular expressions on every HTTP packet",
          "By leveraging Python type hints combined with Pydantic data models",
          "By executing SQL queries directly on the browser",
          "By disabling all JSON serialization"
        ],
        "correct_option_index": 1,
        "explanation": "FastAPI uses standard Python type annotations and Pydantic schemas to automatically validate request bodies, serialize responses, and generate interactive OpenAPI documentation."
      },
      {
        "id": "py_14",
        "question_number": 14,
        "topic": "Concurrency & GIL",
        "question_text": "What is the effect of Python's Global Interpreter Lock (GIL) on multi-threaded CPU-bound programs?",
        "options": [
          "It prevents multiple native threads from executing Python bytecode simultaneously on separate CPU cores",
          "It speeds up CPU calculations by 200%",
          "It disables all network socket connections",
          "It forces Python scripts to run inside a Docker container"
        ],
        "correct_option_index": 0,
        "explanation": "The GIL ensures only one thread executes Python bytecode at a time, making `multiprocessing` (separate processes with independent memory) necessary for true multi-core CPU parallelism."
      },
      {
        "id": "py_15",
        "question_number": 15,
        "topic": "Environment Isolation",
        "question_text": "Why should developers use isolated virtual environments (`python -m venv .venv`) for each project?",
        "options": [
          "To prevent version conflicts between project dependencies and avoid polluting the global system Python installation",
          "To make Python code run 10x faster",
          "To prevent other users from reading source files",
          "To enable automated compilation to native machine code"
        ],
        "correct_option_index": 0,
        "explanation": "Virtual environments isolate package dependencies and versions per project, ensuring reproducible builds and preventing system-wide library version collisions."
      }
    ]
  },
  {
    "id": "nlp-large-language-models",
    "slug": "nlp-large-language-models",
    "title": "NLP & Large Language Models (LLMs)",
    "category_id": "ai-data",
    "category_name": "AI, ML & Python",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "NLP",
      "Transformers",
      "BERT",
      "GPT",
      "Attention Mechanism",
      "Fine-Tuning"
    ],
    "description": "Benchmark your understanding of Natural Language Processing pipelines, Transformer self-attention mechanisms, token embeddings, pretraining objectives, and fine-tuning techniques.",
    "questions": [
      {
        "id": "nlp_1",
        "question_number": 1,
        "topic": "Text Normalization",
        "question_text": "What is the primary difference between Stemming and Lemmatization in text preprocessing?",
        "options": [
          "Stemming chops word endings using heuristic rules (often creating non-words), whereas Lemmatization uses vocabulary and morphological analysis to return true dictionary base forms (lemmas)",
          "Stemming translates text into French, while lemmatization translates into German",
          "Stemming is only for numbers, while lemmatization is for words",
          "Stemming increases file size by 10x"
        ],
        "correct_option_index": 0,
        "explanation": "Stemming (e.g. Porter Stemmer) applies crude character-stripping rules, while Lemmatization (e.g. WordNet) utilizes morphological analysis to resolve words to valid root lemmas."
      },
      {
        "id": "nlp_2",
        "question_number": 2,
        "topic": "Vector Space Models",
        "question_text": "What is the main limitation of Bag-of-Words (BoW) and TF-IDF representations compared to modern word embeddings?",
        "options": [
          "They require high-end GPU hardware to run",
          "They treat words as independent discrete entities, completely ignoring word order, grammar, and semantic contextual relationships",
          "They cannot represent numerical digits",
          "They can only process single-letter words"
        ],
        "correct_option_index": 1,
        "explanation": "BoW and TF-IDF create sparse vectors that treat words as orthogonal dimensions, failing to capture semantic similarity (e.g. 'king' and 'queen') or sentence word order."
      },
      {
        "id": "nlp_3",
        "question_number": 3,
        "topic": "Dense Embeddings",
        "question_text": "What remarkable semantic property was famously demonstrated by Word2Vec vector mathematics?",
        "options": [
          "Vector('King') - Vector('Man') + Vector('Woman') $\\approx$ Vector('Queen')",
          "Vector('Dog') + Vector('Cat') = Vector('Fish')",
          "Vector('Apple') $\\times$ Vector('Banana') = 0",
          "Vector('Car') - Vector('Wheel') = Vector('Plane')"
        ],
        "correct_option_index": 0,
        "explanation": "Continuous vector embeddings capture linear semantic relationships such that algebraic operations across gender and royal concepts yield corresponding analogy targets."
      },
      {
        "id": "nlp_4",
        "question_number": 4,
        "topic": "Sequential Architecture",
        "question_text": "Why did standard Recurrent Neural Networks (RNNs) struggle when processing long text passages?",
        "options": [
          "They cannot process text written in English",
          "Vanishing and exploding gradients during backpropagation through time made it difficult to maintain long-range sequential dependencies",
          "They required 100 terabytes of RAM to store a single sentence",
          "They were incompatible with convolutional filters"
        ],
        "correct_option_index": 1,
        "explanation": "As gradients are repeatedly multiplied across long sequence time-steps, they exponentially decay (vanish) or blow up (explode), causing standard RNNs to forget early contextual dependencies."
      },
      {
        "id": "nlp_5",
        "question_number": 5,
        "topic": "Transformer Architecture",
        "question_text": "What core architectural breakthrough introduced in the 'Attention Is All You Need' paper enabled Transformers to replace recurrent networks?",
        "options": [
          "The Multi-Head Self-Attention mechanism, which computes direct pairwise relationships across all tokens simultaneously without recurrence",
          "Replacing all floating-point numbers with integers",
          "Removing the decoder component entirely from all neural models",
          "Executing neural networks on mobile device batteries"
        ],
        "correct_option_index": 0,
        "explanation": "Self-attention calculates attention weights between every pair of tokens in parallel, enabling direct modeling of long-range dependencies and massive parallelization on modern GPUs."
      },
      {
        "id": "nlp_6",
        "question_number": 6,
        "topic": "Positional Encoding",
        "question_text": "Why do Transformer models require 'Positional Encodings' added to input token embeddings?",
        "options": [
          "To encrypt user queries before transmission",
          "Because self-attention is permutation-invariant and processes all tokens in parallel with no inherent notion of sequence order",
          "To compress the size of the embedding vocabulary",
          "To filter out grammatical stop words"
        ],
        "correct_option_index": 1,
        "explanation": "Unlike RNNs that process tokens sequentially step-by-step, self-attention treats inputs as an unordered set; positional encodings inject explicit positional awareness into token representations."
      },
      {
        "id": "nlp_7",
        "question_number": 7,
        "topic": "Model Archetypes",
        "question_text": "How do Encoder-Only models (e.g., BERT) differ in primary usage from Decoder-Only models (e.g., GPT)?",
        "options": [
          "Encoder-only models excel at bi-directional understanding tasks (classification, NER), while Decoder-only models excel at auto-regressive text generation",
          "Encoder-only models generate images, while Decoder-only models generate audio",
          "Decoder-only models cannot process text prompts",
          "Encoder-only models have no neural layers"
        ],
        "correct_option_index": 0,
        "explanation": "BERT uses bi-directional attention across the entire sequence for extraction and classification tasks, whereas GPT uses causal (masked) self-attention to generate text auto-regressively."
      },
      {
        "id": "nlp_8",
        "question_number": 8,
        "topic": "Pre-training Objectives",
        "question_text": "What is the pre-training objective of Masked Language Modeling (MLM) utilized in BERT?",
        "options": [
          "Randomly masking a percentage of tokens in the input sentence and training the model to predict the original masked tokens using surrounding bidirectional context",
          "Translating English text into binary code",
          "Predicting the pixel colors of an accompanying image",
          "Deleting punctuation from Wikipedia articles"
        ],
        "correct_option_index": 0,
        "explanation": "MLM masks ~15% of tokens and requires the model to reconstruct them based on bidirectional left and right context, fostering deep contextual understanding."
      },
      {
        "id": "nlp_9",
        "question_number": 9,
        "topic": "Sampling Strategies",
        "question_text": "What does Top-P (Nucleus) sampling do during auto-regressive LLM token generation?",
        "options": [
          "It samples exclusively from the smallest set of most probable tokens whose cumulative probability exceeds the threshold $P$",
          "It selects only the top 3 longest words in the vocabulary",
          "It forces the model to choose the absolute lowest probability token",
          "It pauses model execution for $P$ milliseconds"
        ],
        "correct_option_index": 0,
        "explanation": "Nucleus sampling dynamically truncates the sampling pool to include only the highest probability tokens whose cumulative mass equals $P$, balancing creativity while cutting off low-probability tails."
      },
      {
        "id": "nlp_10",
        "question_number": 10,
        "topic": "Parameter-Efficient Fine-Tuning",
        "question_text": "How does Low-Rank Adaptation (LoRA) fine-tune large foundation models efficiently?",
        "options": [
          "By freezing the pre-trained model weights and injecting small, trainable low-rank decomposition rank matrices into the attention layers",
          "By retraining all 70 billion parameters from scratch on every run",
          "By deleting half the layers of the neural network",
          "By converting the model to an Excel formula"
        ],
        "correct_option_index": 0,
        "explanation": "LoRA freezes the base weights $W$ and trains small rank decomposition matrices $\\Delta W = B \\times A$, reducing trainable parameters by $>99\\%$ and drastically lowering VRAM requirements."
      },
      {
        "id": "nlp_11",
        "question_number": 11,
        "topic": "Alignment (RLHF)",
        "question_text": "What is the role of the 'Reward Model' in Reinforcement Learning from Human Feedback (RLHF)?",
        "options": [
          "To distribute cryptocurrency to human evaluators",
          "To score candidate model completions based on human preference data, providing a scalar training signal for policy optimization (e.g. via PPO)",
          "To delete toxic comments from social media",
          "To calculate electrical power consumption of servers"
        ],
        "correct_option_index": 1,
        "explanation": "The reward model is trained on human preference rankings to output a scalar score predicting how helpful and safe a completion is, which guides policy optimization algorithms like PPO."
      },
      {
        "id": "nlp_12",
        "question_number": 12,
        "topic": "Direct Preference Optimization",
        "question_text": "How does Direct Preference Optimization (DPO) simplify LLM alignment compared to traditional RLHF?",
        "options": [
          "It eliminates the need to train a separate reward model and run complex reinforcement learning loops by optimizing policy weights directly on preference pairs with an implicit reward loss",
          "It removes all human feedback from the process",
          "It requires zero training data",
          "It forces models to output only single-word responses"
        ],
        "correct_option_index": 0,
        "explanation": "DPO mathematically re-parameterizes the reward objective, allowing direct optimization of the language model policy on paired preference data using standard binary cross-entropy loss."
      },
      {
        "id": "nlp_13",
        "question_number": 13,
        "topic": "Model Evaluation Metrics",
        "question_text": "What does the 'Perplexity' metric indicate when evaluating a language model on a test corpus?",
        "options": [
          "The model's uncertainty when predicting the next token (exponentiated cross-entropy loss); lower perplexity indicates better predictive performance",
          "The number of grammar errors found in the text",
          "The total duration required to download the model",
          "The count of unique words in the vocabulary"
        ],
        "correct_option_index": 0,
        "explanation": "Perplexity measures how well a probability distribution predicts a sample. Lower perplexity means the model assigns higher probability to ground-truth next tokens."
      },
      {
        "id": "nlp_14",
        "question_number": 14,
        "topic": "Inference Optimization",
        "question_text": "Why is the 'KV Cache' (Key-Value Cache) universally implemented in LLM serving frameworks (e.g., vLLM, TensorRT-LLM)?",
        "options": [
          "To avoid recomputing Key and Value attention matrices for previously processed prompt and generated tokens during auto-regressive decoding",
          "To store API keys in plaintext",
          "To compress output text into ZIP archives",
          "To bypass HTTPS network encryption"
        ],
        "correct_option_index": 0,
        "explanation": "During auto-regressive generation, earlier token representations do not change; caching their Key and Value vectors prevents redundant computation, reducing latency from $O(n^2)$ to $O(n)$ per step."
      },
      {
        "id": "nlp_15",
        "question_number": 15,
        "topic": "Long-Context Scaling",
        "question_text": "What is the primary advantage of Rotary Position Embeddings (RoPE) used in models like Llama and Mistral?",
        "options": [
          "RoPE encodes relative token distances by rotating the query and key representations in the complex plane, enabling smooth extrapolation to longer context windows",
          "RoPE eliminates the need for GPUs",
          "RoPE replaces text with rotating 3D animations",
          "RoPE limits prompt length to 128 tokens"
        ],
        "correct_option_index": 0,
        "explanation": "RoPE applies a rotation matrix to Query and Key vectors such that their dot product inherently depends only on their relative positional distance, facilitating long-context fine-tuning and extrapolation."
      }
    ]
  },
  {
    "id": "data-science-python",
    "slug": "data-science-python",
    "title": "Data Science with Python",
    "category_id": "ai-data",
    "category_name": "AI, ML & Python",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Data Science",
      "Pandas",
      "NumPy",
      "EDA",
      "Data Cleaning",
      "Visualization"
    ],
    "description": "Evaluate your hands-on ability to clean, manipulate, transform, and visualize complex datasets using NumPy, Pandas, Seaborn, and statistical methods.",
    "questions": [
      {
        "id": "dsp_1",
        "question_number": 1,
        "topic": "NumPy vs Lists",
        "question_text": "Why are NumPy `ndarray` arrays significantly faster than standard Python lists for numerical computations?",
        "options": [
          "NumPy stores data in contiguous blocks of memory with fixed C-types, eliminating Python object overhead and enabling vectorized SIMD operations",
          "NumPy uses cloud servers to execute additions",
          "NumPy arrays automatically delete missing numbers",
          "Python lists do not support mathematical operations"
        ],
        "correct_option_index": 0,
        "explanation": "NumPy arrays are homogeneous, contiguous memory buffers that bypass Python's dynamic type-checking overhead and leverage vectorized low-level C and BLAS/LAPACK instructions."
      },
      {
        "id": "dsp_2",
        "question_number": 2,
        "topic": "Pandas Data Structures",
        "question_text": "In Pandas, what is the core structural difference between a `Series` and a `DataFrame`?",
        "options": [
          "A Series is a one-dimensional labeled array, whereas a DataFrame is a two-dimensional tabular data structure with labeled rows and columns",
          "A Series only holds text, while a DataFrame only holds numbers",
          "A Series cannot be indexed",
          "A DataFrame is limited to 100 rows maximum"
        ],
        "correct_option_index": 0,
        "explanation": "A Series is a 1D labeled array capable of holding any data type; a DataFrame is a 2D table composed of multiple aligned Series sharing a common index."
      },
      {
        "id": "dsp_3",
        "question_number": 3,
        "topic": "Handling Missing Data",
        "question_text": "Which Pandas method replaces all `NaN` (missing) values in a DataFrame column with the column's mean value?",
        "options": [
          "`df['col'].fillna(df['col'].mean(), inplace=True)`",
          "`df['col'].replace_na('mean')`",
          "`df['col'].dropna(value='mean')`",
          "`df['col'].impute_all()`"
        ],
        "correct_option_index": 0,
        "explanation": "`.fillna()` replaces missing `NaN` values with the specified scalar value, in this case the arithmetic mean calculated via `.mean()`."
      },
      {
        "id": "dsp_4",
        "question_number": 4,
        "topic": "Boolean Indexing",
        "question_text": "How do you filter a Pandas DataFrame `df` to extract rows where `age` is greater than 25 and `city` equals 'Mumbai'?",
        "options": [
          "`df[(df['age'] > 25) & (df['city'] == 'Mumbai')]`",
          "`df[df['age'] > 25 and df['city'] == 'Mumbai']`",
          "`df.filter('age > 25 and city == Mumbai')`",
          "`df.where(age > 25, city == 'Mumbai')`"
        ],
        "correct_option_index": 0,
        "explanation": "In Pandas boolean indexing, bitwise operators (`&`, `|`) with explicit parentheses around each condition are required instead of Python's logical `and` / `or` keywords."
      },
      {
        "id": "dsp_5",
        "question_number": 5,
        "topic": "Aggregation & Grouping",
        "question_text": "What does the operation `df.groupby('department')['salary'].agg(['mean', 'median', 'count'])` calculate?",
        "options": [
          "Computes the mean, median, and employee count of salaries separately for each unique department",
          "Sorts the dataframe by salary descending",
          "Deletes all rows without department names",
          "Merges salary data into a single number"
        ],
        "correct_option_index": 0,
        "explanation": "`.groupby()` partitions data by the categorical department key, and `.agg()` computes multiple summary statistics across the salary values for each group."
      },
      {
        "id": "dsp_6",
        "question_number": 6,
        "topic": "Data Merging",
        "question_text": "What type of join is performed by default when executing `pd.merge(df1, df2, on='customer_id')`?",
        "options": [
          "Inner Join (retains only matching customer_ids present in both DataFrames)",
          "Left Outer Join",
          "Cross Join",
          "Full Outer Join"
        ],
        "correct_option_index": 0,
        "explanation": "`pd.merge()` defaults to `how='inner'`, returning only rows with matching key values in both input DataFrames."
      },
      {
        "id": "dsp_7",
        "question_number": 7,
        "topic": "Reshaping Data",
        "question_text": "What is the primary difference between `pd.melt()` and `pd.pivot_table()` in Pandas data reshaping?",
        "options": [
          "`pd.melt()` unpivots wide-format data into long (tidy) format, whereas `pd.pivot_table()` aggregates long data into wide multidimensional summaries",
          "`pd.melt()` deletes rows with negative numbers",
          "`pd.pivot_table()` only works on Excel files",
          "`pd.melt()` converts strings into datetime objects"
        ],
        "correct_option_index": 0,
        "explanation": "`.melt()` reshapes a table from wide to long format (columns become variable-value rows); `.pivot_table()` reshapes from long to wide with optional aggregation."
      },
      {
        "id": "dsp_8",
        "question_number": 8,
        "topic": "Time Series Analysis",
        "question_text": "How do you aggregate daily transaction data in DataFrame `df` (with a DateTime index) into monthly total revenue?",
        "options": [
          "`df['revenue'].resample('M').sum()`",
          "`df['revenue'].group_by_month()`",
          "`df['revenue'].to_monthly()`",
          "`df['revenue'].rolling_window(30)`"
        ],
        "correct_option_index": 0,
        "explanation": "`.resample('M')` performs frequency conversion on DatetimeIndex objects, grouping observations by calendar month ends for downstream aggregations like `.sum()`."
      },
      {
        "id": "dsp_9",
        "question_number": 9,
        "topic": "Data Visualization",
        "question_text": "Which Seaborn visualization is specifically designed to display the 5-number summary (minimum, Q1, median, Q3, maximum) and detect potential outliers across categories?",
        "options": [
          "`sns.boxplot()`",
          "`sns.lineplot()`",
          "`sns.scatterplot()`",
          "`sns.kdeplot()`"
        ],
        "correct_option_index": 0,
        "explanation": "Box plots (`sns.boxplot`) display distribution quartiles, the interquartile range (IQR box), median line, whiskers, and individual points representing statistical outliers."
      },
      {
        "id": "dsp_10",
        "question_number": 10,
        "topic": "Correlation Analysis",
        "question_text": "When computing a correlation matrix with `df.corr()`, what does a Pearson coefficient of -0.92 between two numerical variables indicate?",
        "options": [
          "A strong negative linear relationship: as one variable increases, the other variable decreases proportionally",
          "No statistical relationship whatsoever",
          "A strong positive relationship",
          "A calculation error caused by dividing by zero"
        ],
        "correct_option_index": 0,
        "explanation": "Pearson correlation ranges from -1.0 to +1.0; a value of -0.92 represents a strong inverse linear relationship between the two features."
      },
      {
        "id": "dsp_11",
        "question_number": 11,
        "topic": "Outlier Detection (IQR)",
        "question_text": "In statistical exploratory data analysis, how is the upper outlier boundary calculated using the Interquartile Range (IQR)?",
        "options": [
          "$\\text{Upper Bound} = Q3 + 1.5 \\times \\text{IQR}$",
          "$\\text{Upper Bound} = Q1 - 1.5 \\times \\text{IQR}$",
          "$\\text{Upper Bound} = \\text{Mean} \\times 2$",
          "$\\text{Upper Bound} = \\text{Median} + \\text{Standard Deviation}$"
        ],
        "correct_option_index": 0,
        "explanation": "Tukey's IQR rule defines outliers as values falling outside $[Q1 - 1.5 \\times \\text{IQR}, Q3 + 1.5 \\times \\text{IQR}]$, where $\\text{IQR} = Q3 - Q1$."
      },
      {
        "id": "dsp_12",
        "question_number": 12,
        "topic": "Categorical Encoding",
        "question_text": "When should 'One-Hot Encoding' (`pd.get_dummies()`) be selected over 'Label Encoding' for a categorical feature?",
        "options": [
          "When the categorical variable is nominal (has no inherent ranking or order, like 'City' or 'Color')",
          "When the feature represents ordered ranks like 'Low', 'Medium', 'High'",
          "When the column has over 100,000 unique text categories",
          "When performing regression on integer IDs"
        ],
        "correct_option_index": 0,
        "explanation": "One-hot encoding creates binary columns for nominal categories to prevent machine learning algorithms from assuming an artificial numerical order that doesn't exist."
      },
      {
        "id": "dsp_13",
        "question_number": 13,
        "topic": "Efficient Data Storage",
        "question_text": "Why is the Apache Parquet file format (`df.to_parquet()`) superior to raw CSV for storing large analytical datasets?",
        "options": [
          "Parquet is a columnar binary format with built-in compression and schema metadata, resulting in much smaller file sizes and dramatically faster column-subset read speeds",
          "Parquet files can be opened in basic Notepad",
          "Parquet deletes all non-numerical data",
          "Parquet removes the need for database indexes"
        ],
        "correct_option_index": 0,
        "explanation": "Columnar storage enables aggressive per-column compression (Snappy/Gzip) and projection pushdown (reading only required columns), drastically outperforming row-oriented text CSVs."
      },
      {
        "id": "dsp_14",
        "question_number": 14,
        "topic": "Memory Optimization",
        "question_text": "How can you drastically reduce the RAM consumption of a DataFrame containing repeated low-cardinality text columns (e.g. 'State', 'Gender')?",
        "options": [
          "`df['col'] = df['col'].astype('category')`",
          "`df['col'] = df['col'].astype('float64')`",
          "`df['col'] = df['col'].to_numpy()`",
          "`df['col'] = df['col'].str.lower()`"
        ],
        "correct_option_index": 0,
        "explanation": "Converting repeated string columns to Pandas `category` dtype replaces string instances with integer codes pointing to an internal unique lookup array, saving massive memory."
      },
      {
        "id": "dsp_15",
        "question_number": 15,
        "topic": "Exploratory Data Analysis (EDA)",
        "question_text": "What is the recommended sequence of initial exploratory operations when loading a new unfamiliar dataset in Python?",
        "options": [
          "`df.info()`, `df.describe()`, `df.isnull().sum()`, and `df.shape`",
          "Deleting all rows immediately without checking",
          "Fitting a deep neural network on the raw data",
          "Exporting the table directly to PDF"
        ],
        "correct_option_index": 0,
        "explanation": "Standard initial EDA begins by inspecting column data types and memory (`.info()`), summary statistics (`.describe()`), missing value counts (`.isnull().sum()`), and dimensions (`.shape`)."
      }
    ]
  },
  {
    "id": "data-structures-algorithms",
    "slug": "data-structures-algorithms",
    "title": "Data Structures & Algorithms (DSA)",
    "category_id": "web-software",
    "category_name": "Software & Mobile Dev",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "DSA",
      "Algorithms",
      "Binary Search",
      "Trees",
      "Graphs",
      "Dynamic Programming"
    ],
    "description": "Assess your algorithmic problem-solving ability, time and space complexity analysis, tree/graph traversals, and dynamic programming optimization patterns.",
    "questions": [
      {
        "id": "dsa_1",
        "question_number": 1,
        "topic": "Complexity Analysis",
        "question_text": "What is the time complexity to access an element at a known index `arr[i]` in a contiguous static array?",
        "options": [
          "$O(n)$",
          "$O(1)$",
          "$O(\\log n)$",
          "$O(n^2)$"
        ],
        "correct_option_index": 1,
        "explanation": "Static arrays store elements in contiguous memory slots, allowing instant constant-time $O(1)$ address calculation using the base pointer and element offset."
      },
      {
        "id": "dsa_2",
        "question_number": 2,
        "topic": "Linked List Characteristics",
        "question_text": "What is the primary advantage of a Singly Linked List over a contiguous static Array?",
        "options": [
          "Faster random index access",
          "Dynamic size allocation with constant $O(1)$ insertions/deletions at the head without shifting remaining elements",
          "Zero memory overhead for pointers",
          "Automatic sorting of all elements"
        ],
        "correct_option_index": 1,
        "explanation": "Linked lists allocate memory dynamically per node and allow $O(1)$ node insertion/deletion at known pointer locations without shifting subsequent memory elements."
      },
      {
        "id": "dsa_3",
        "question_number": 3,
        "topic": "Stack Data Structure",
        "question_text": "Which abstract data type principle governs the behavior of a standard Stack?",
        "options": [
          "First-In, First-Out (FIFO)",
          "Last-In, First-Out (LIFO)",
          "Random Access Iterator",
          "Priority Sorted Queue"
        ],
        "correct_option_index": 1,
        "explanation": "A Stack operates on the LIFO principle; the last element pushed onto the top of the stack is the first element popped off."
      },
      {
        "id": "dsa_4",
        "question_number": 4,
        "topic": "Queue Data Structure",
        "question_text": "In a Circular Queue implemented using a fixed-size array of capacity $N$, what formula advances the `rear` pointer on an enqueue operation?",
        "options": [
          "`rear = (rear + 1) % N`",
          "`rear = rear + 1`",
          "`rear = rear * 2`",
          "`rear = rear - 1`"
        ],
        "correct_option_index": 0,
        "explanation": "Modulo arithmetic `(rear + 1) % N` wraps the pointer back to index 0 when it reaches the end of the array, reusing empty slots freed by dequeues."
      },
      {
        "id": "dsa_5",
        "question_number": 5,
        "topic": "Searching Algorithms",
        "question_text": "What prerequisite condition must be satisfied before Binary Search can be applied to find a target value in an array?",
        "options": [
          "The array elements must be sorted in monotonic order",
          "The array must contain only positive integers",
          "The array size must be an odd number",
          "All elements must be distinct primes"
        ],
        "correct_option_index": 0,
        "explanation": "Binary search relies on sorted order to eliminate half of the remaining search space at each comparison step, achieving $O(\\log n)$ time complexity."
      },
      {
        "id": "dsa_6",
        "question_number": 6,
        "topic": "Two-Pointer Technique",
        "question_text": "How does the Two-Pointer technique find two numbers that sum to target $K$ in a sorted array in $O(n)$ time?",
        "options": [
          "By running nested loops comparing every possible pair",
          "By placing one pointer at the start and one at the end, moving the left pointer right if sum $< K$ and the right pointer left if sum $> K$",
          "By sorting the array a second time",
          "By hashing all elements into a binary tree"
        ],
        "correct_option_index": 1,
        "explanation": "With sorted input, moving pointers inward based on whether the current sum is less than or greater than $K$ guarantees finding the target pair in a single $O(n)$ pass."
      },
      {
        "id": "dsa_7",
        "question_number": 7,
        "topic": "Sliding Window",
        "question_text": "When finding the maximum sum of any contiguous subarray of fixed size $K$, how does the Sliding Window pattern avoid redundant computation?",
        "options": [
          "By recalculating the sum of all $K$ elements from scratch on every step",
          "By subtracting the element exiting the left of the window and adding the new element entering the right in $O(1)$ per step",
          "By dividing the array into two halves",
          "By storing all permutations in a stack"
        ],
        "correct_option_index": 1,
        "explanation": "Sliding window maintains a running sum by adding the incoming element and subtracting the outgoing element, reducing overall time complexity from $O(n \\times K)$ to $O(n)$."
      },
      {
        "id": "dsa_8",
        "question_number": 8,
        "topic": "Cycle Detection in Lists",
        "question_text": "How does Floyd's Tortoise and Hare algorithm detect a cycle in a linked list?",
        "options": [
          "By traversing with a slow pointer (1 step) and a fast pointer (2 steps); if a cycle exists, they will inevitably meet inside the loop",
          "By counting total nodes until an exception is thrown",
          "By reversing the linked list and checking if the head changes",
          "By converting the nodes into a hash map"
        ],
        "correct_option_index": 0,
        "explanation": "Floyd's cycle-finding algorithm uses two pointers moving at different speeds ($1\\times$ and $2\\times$). In the presence of a cycle, the fast pointer laps and collides with the slow pointer."
      },
      {
        "id": "dsa_9",
        "question_number": 9,
        "topic": "Binary Search Trees (BST)",
        "question_text": "Which tree traversal order on a valid Binary Search Tree always visits node keys in strictly non-decreasing sorted order?",
        "options": [
          "Preorder Traversal (Root $\\rightarrow$ Left $\\rightarrow$ Right)",
          "Inorder Traversal (Left $\\rightarrow$ Root $\\rightarrow$ Right)",
          "Postorder Traversal (Left $\\rightarrow$ Right $\\rightarrow$ Root)",
          "Level Order Traversal"
        ],
        "correct_option_index": 1,
        "explanation": "In a BST, all keys in the left subtree are smaller than the root, and all in the right subtree are larger; visiting Left $\\rightarrow$ Root $\\rightarrow$ Right (Inorder) yields sorted output."
      },
      {
        "id": "dsa_10",
        "question_number": 10,
        "topic": "Graph Traversals",
        "question_text": "What underlying data structure is utilized to implement Breadth-First Search (BFS) on an unweighted graph?",
        "options": [
          "Stack (LIFO)",
          "Queue (FIFO)",
          "Max Heap",
          "Disjoint Set"
        ],
        "correct_option_index": 1,
        "explanation": "BFS explores vertices level-by-level, utilizing a FIFO Queue to process neighbor vertices in the order they are discovered."
      },
      {
        "id": "dsa_11",
        "question_number": 11,
        "topic": "Shortest Path Algorithms",
        "question_text": "What data structure is used to optimize Dijkstra's Algorithm for finding single-source shortest paths on non-negative weighted graphs to achieve $O((V + E) \\log V)$ complexity?",
        "options": [
          "Min-Priority Queue (Binary Heap or Fibonacci Heap)",
          "Circular Linked List",
          "Hash Set",
          "Trie"
        ],
        "correct_option_index": 0,
        "explanation": "A Min-Priority Queue enables Dijkstra's algorithm to greedily extract the vertex with the minimum tentative distance in $O(\\log V)$ time."
      },
      {
        "id": "dsa_12",
        "question_number": 12,
        "topic": "Dynamic Programming",
        "question_text": "What is the primary difference between the 'Memoization' and 'Tabulation' approaches in Dynamic Programming?",
        "options": [
          "Memoization is Top-Down (recursive with a lookup cache), while Tabulation is Bottom-Up (iterative table filling)",
          "Memoization is for sorting, while Tabulation is for searching",
          "Tabulation cannot solve optimization problems",
          "Memoization runs only on GPUs"
        ],
        "correct_option_index": 0,
        "explanation": "Top-Down Memoization caches results of recursive sub-problems on demand; Bottom-Up Tabulation iteratively solves smaller base sub-problems first to construct the table."
      },
      {
        "id": "dsa_13",
        "question_number": 13,
        "topic": "Knapsack Problem",
        "question_text": "In the 0/1 Knapsack Problem, what does the recurrence state $DP[i][w]$ represent?",
        "options": [
          "The minimum weight to carry all items",
          "The maximum value achievable considering the first $i$ items with a maximum weight capacity constraint of $w$",
          "The total number of items left behind",
          "The cost of manufacturing item $i$"
        ],
        "correct_option_index": 1,
        "explanation": "In 0/1 Knapsack, $DP[i][w] = \\max(DP[i-1][w], \\text{value}[i] + DP[i-1][w - \\text{weight}[i]])$, deciding whether to include or exclude the $i$-th item within capacity $w$."
      },
      {
        "id": "dsa_14",
        "question_number": 14,
        "topic": "Hash Table Collisions",
        "question_text": "How does 'Separate Chaining' handle hash table bucket collisions when two keys map to the exact same hash index?",
        "options": [
          "By discarding the previous key-value pair",
          "By maintaining a linked list or balanced tree at each bucket index to store all colliding entries",
          "By terminating the application",
          "By rehashing the entire database to a new server"
        ],
        "correct_option_index": 1,
        "explanation": "Separate chaining stores all elements hashing to the same bucket index in a linked list or tree, allowing multiple entries to coexist without overwriting."
      },
      {
        "id": "dsa_15",
        "question_number": 15,
        "topic": "Topological Sort",
        "question_text": "What structural condition must a graph satisfy for a valid Topological Sort to exist?",
        "options": [
          "It must be a Directed Acyclic Graph (DAG) with no directed cycles",
          "It must be an undirected bipartite graph",
          "It must contain at least one self-loop",
          "All edge weights must be negative"
        ],
        "correct_option_index": 0,
        "explanation": "Topological sorting orders vertices such that for every directed edge $u \\rightarrow v$, vertex $u$ comes before $v$; this is mathematically impossible in the presence of directed cycles."
      }
    ]
  },
  {
    "id": "full-stack-web-development",
    "slug": "full-stack-web-development",
    "title": "Full Stack Web Development (React & Node.js)",
    "category_id": "web-software",
    "category_name": "Software & Mobile Dev",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "React",
      "Node.js",
      "Express",
      "REST APIs",
      "Full Stack",
      "Web Security"
    ],
    "description": "Evaluate your comprehensive full-stack engineering skills across React hooks, component lifecycle, Node.js event-driven architecture, REST API design, and web security.",
    "questions": [
      {
        "id": "fs_1",
        "question_number": 1,
        "topic": "Virtual DOM",
        "question_text": "How does React's Virtual DOM improve browser rendering performance?",
        "options": [
          "By directly modifying the physical GPU registers",
          "By computing diffs between lightweight in-memory virtual trees and batching minimal DOM updates via reconciliation",
          "By disabling all CSS animations",
          "By compiling JavaScript directly to WebAssembly"
        ],
        "correct_option_index": 1,
        "explanation": "React maintains an in-memory Virtual DOM; when state changes, it diffs the new tree against the old tree and applies only necessary minimal mutations to the real browser DOM."
      },
      {
        "id": "fs_2",
        "question_number": 2,
        "topic": "React Hooks (Effects)",
        "question_text": "When does a React `useEffect(() => {}, [])` with an empty dependency array execute?",
        "options": [
          "On every single component re-render",
          "Only once after the initial mount (rendering) of the component",
          "Only when the browser window is resized",
          "Before the component JSX is parsed"
        ],
        "correct_option_index": 1,
        "explanation": "An empty dependency array `[]` signals that the effect does not depend on any props or state, ensuring it runs exactly once after the initial render mount."
      },
      {
        "id": "fs_3",
        "question_number": 3,
        "topic": "Props vs State",
        "question_text": "In React component architecture, what is the core difference between Props and State?",
        "options": [
          "Props are immutable data passed down from parent components, while State is mutable internal data managed within the component",
          "Props are for styling, while State is for HTML",
          "Props only hold numbers, while State holds strings",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "Props are external read-only inputs passed from parents; State is private, local data owned and updated by the component itself to trigger re-renders."
      },
      {
        "id": "fs_4",
        "question_number": 4,
        "topic": "Asynchronous JavaScript",
        "question_text": "What will `console.log` output when executing: `console.log(1); setTimeout(() => console.log(2), 0); console.log(3);`?",
        "options": [
          "`1, 2, 3`",
          "`1, 3, 2`",
          "`2, 1, 3`",
          "`3, 2, 1`"
        ],
        "correct_option_index": 1,
        "explanation": "Synchronous code (`1`, `3`) executes immediately on the Call Stack; the `setTimeout` callback (`2`) is placed in the Task Queue and processed only after the call stack clears."
      },
      {
        "id": "fs_5",
        "question_number": 5,
        "topic": "Node.js Architecture",
        "question_text": "What architectural model enables Node.js to handle thousands of concurrent I/O operations on a single main thread?",
        "options": [
          "Creating a new operating system process for every incoming HTTP request",
          "An asynchronous, non-blocking Event Loop powered by the libuv library",
          "Disabling all asynchronous network sockets",
          "Running multiple JavaScript engines inside the same thread"
        ],
        "correct_option_index": 1,
        "explanation": "Node.js offloads I/O operations to operating system kernels or the libuv thread pool, using a single-threaded non-blocking Event Loop to process callbacks efficiently."
      },
      {
        "id": "fs_6",
        "question_number": 6,
        "topic": "Express Middleware",
        "question_text": "In an Express.js route handler, what is the purpose of invoking the `next()` function inside a middleware?",
        "options": [
          "To terminate the HTTP connection immediately",
          "To pass execution control to the next middleware or route handler in the request pipeline",
          "To restart the Node.js server process",
          "To send a 404 response to the client"
        ],
        "correct_option_index": 1,
        "explanation": "Middleware functions receive `(req, res, next)`; calling `next()` hands over control to the subsequent middleware function in the request-response pipeline stack."
      },
      {
        "id": "fs_7",
        "question_number": 7,
        "topic": "React Optimization",
        "question_text": "How does the `useCallback` hook optimize performance in React applications?",
        "options": [
          "By memoizing a callback function instance between renders to prevent unnecessary re-renders of memoized child components",
          "By automatically caching database queries on the server",
          "By compiling React JSX into HTML at build time",
          "By deleting unused variables from memory"
        ],
        "correct_option_index": 0,
        "explanation": "`useCallback` returns a memoized version of the callback that only changes if specified dependencies change, preventing child components wrapped in `React.memo` from re-rendering."
      },
      {
        "id": "fs_8",
        "question_number": 8,
        "topic": "State Management",
        "question_text": "When should an enterprise React application use a dedicated state store (Zustand / Redux) over simple Context API?",
        "options": [
          "When state changes frequently across many deeply nested, independent components requiring selective, high-frequency subscriptions without global re-renders",
          "When the application has fewer than 2 pages",
          "When storing only static theme colors",
          "When the backend is written in PHP"
        ],
        "correct_option_index": 0,
        "explanation": "React Context triggers re-renders on all consuming components when any part of its value changes; state stores like Zustand/Redux provide granular state slice subscriptions."
      },
      {
        "id": "fs_9",
        "question_number": 9,
        "topic": "JWT Authentication",
        "question_text": "Where is the most secure location to store a JSON Web Token (JWT) on the client side to protect against Cross-Site Scripting (XSS)?",
        "options": [
          "`localStorage`",
          "`sessionStorage`",
          "In a `document.cookie` marked with the `HttpOnly` and `Secure` flags",
          "In a global JavaScript variable"
        ],
        "correct_option_index": 2,
        "explanation": "`HttpOnly` cookies cannot be accessed by client-side JavaScript scripts, preventing malicious injected XSS scripts from reading and exfiltrating session tokens."
      },
      {
        "id": "fs_10",
        "question_number": 10,
        "topic": "CORS Configuration",
        "question_text": "What causes a browser to block a web application with a 'CORS error' (Cross-Origin Resource Sharing)?",
        "options": [
          "The client browser is offline",
          "A frontend script hosted on origin A makes an XMLHttpRequest/fetch to origin B without the server returning matching `Access-Control-Allow-Origin` headers",
          "The backend server has ran out of disk storage",
          "The user's password contains special characters"
        ],
        "correct_option_index": 1,
        "explanation": "CORS is a browser security mechanism that restricts web pages from making AJAX requests to a different domain/port unless the target server explicitly permits that origin via headers."
      },
      {
        "id": "fs_11",
        "question_number": 11,
        "topic": "Rendering Paradigms",
        "question_text": "What is the primary operational difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR)?",
        "options": [
          "SSR generates complete HTML on the server on each request for fast First Contentful Paint and SEO, while CSR renders HTML dynamically in the browser via JavaScript",
          "CSR only works on mobile phones, while SSR works on desktops",
          "SSR does not support JavaScript",
          "CSR is completely free of network requests"
        ],
        "correct_option_index": 0,
        "explanation": "SSR renders markup on the server per request providing fast initial content delivery and search engine indexability; CSR ships an empty bundle and constructs the DOM in the client."
      },
      {
        "id": "fs_12",
        "question_number": 12,
        "topic": "Database Choice",
        "question_text": "When should a development team prefer a Relational Database (PostgreSQL) over a NoSQL Document Store (MongoDB)?",
        "options": [
          "When data has highly structured schemas requiring complex multi-table JOINs, strict foreign key constraints, and ACID transactional integrity",
          "When data has no relationships and changes schema every second",
          "When storing simple binary image files",
          "When the database must run with zero disk space"
        ],
        "correct_option_index": 0,
        "explanation": "Relational databases excel at enforcing strict structural schemas, foreign key relationships, complex joins, and ACID compliance for mission-critical financial/transactional entities."
      },
      {
        "id": "fs_13",
        "question_number": 13,
        "topic": "Cross-Site Scripting (XSS)",
        "question_text": "How does React inherently protect against Cross-Site Scripting (XSS) when rendering user-submitted text in JSX?",
        "options": [
          "By escaping all strings embedded in JSX before rendering them into the DOM",
          "By deleting all HTML files from the server",
          "By enforcing SSL certificates on all links",
          "By blocking form submissions"
        ],
        "correct_option_index": 0,
        "explanation": "React automatically escapes all string values inside JSX expressions `{data}` before rendering, treating them as string literals rather than executable HTML unless `dangerouslySetInnerHTML` is used."
      },
      {
        "id": "fs_14",
        "question_number": 14,
        "topic": "Bundle Optimization",
        "question_text": "How does 'Code Splitting' using dynamic imports (`React.lazy()` and `import()`) improve web page load speeds?",
        "options": [
          "By splitting the large JavaScript bundle into smaller on-demand chunks that load only when the user navigates to that specific route",
          "By deleting half the CSS rules",
          "By converting images into text files",
          "By downloading all pages before the user opens the browser"
        ],
        "correct_option_index": 0,
        "explanation": "Code splitting breaks monolithic bundles into smaller chunks, downloading only the critical code needed for the active route, drastically lowering Time to Interactive (TTI)."
      },
      {
        "id": "fs_15",
        "question_number": 15,
        "topic": "API Idempotency",
        "question_text": "In RESTful HTTP API conventions, which of the following HTTP methods is expected to be 'Idempotent'?",
        "options": [
          "`POST`",
          "`PUT`",
          "`CONNECT`",
          "`PATCH` (when appending items)"
        ],
        "correct_option_index": 1,
        "explanation": "An HTTP method is idempotent if making multiple identical requests has the exact same side-effect as a single request. `PUT`, `GET`, and `DELETE` are idempotent, while `POST` is not."
      }
    ]
  },
  {
    "id": "java-spring-boot-development",
    "slug": "java-spring-boot-development",
    "title": "Java & Spring Boot Development",
    "category_id": "web-software",
    "category_name": "Software & Mobile Dev",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Java",
      "Spring Boot",
      "Microservices",
      "JPA",
      "Hibernate",
      "REST APIs"
    ],
    "description": "Validate your mastery of enterprise Java, Object-Oriented design, Spring Boot annotations, Hibernate/JPA entity relationships, and microservices architecture.",
    "questions": [
      {
        "id": "jv_1",
        "question_number": 1,
        "topic": "OOP Principles",
        "question_text": "Which Object-Oriented programming pillar in Java allows a subclass to provide a specific implementation of a method already defined in its superclass?",
        "options": [
          "Polymorphism (Method Overriding)",
          "Data Hiding",
          "Encapsulation",
          "Namespace Declaration"
        ],
        "correct_option_index": 0,
        "explanation": "Method overriding (runtime polymorphism) allows a child class to override the implementation of an inherited parent method using the `@Override` annotation."
      },
      {
        "id": "jv_2",
        "question_number": 2,
        "topic": "Java Memory Model",
        "question_text": "In the Java Virtual Machine (JVM), where are object instances created with `new` allocated?",
        "options": [
          "In the Thread Stack",
          "In the Heap Memory",
          "In the CPU Cache registers",
          "In the Operating System Swap file"
        ],
        "correct_option_index": 1,
        "explanation": "All Java object instances and arrays are allocated in Heap memory, managed by the Garbage Collector, while local primitive variables and method call frames reside on the Thread Stack."
      },
      {
        "id": "jv_3",
        "question_number": 3,
        "topic": "Collections Framework",
        "question_text": "What is the primary performance difference between `ArrayList` and `LinkedList` in Java when accessing an element by index?",
        "options": [
          "`ArrayList` provides $O(1)$ random access, whereas `LinkedList` requires $O(n)$ traversal through node pointers",
          "`LinkedList` provides $O(1)$ random access, while `ArrayList` is $O(n)$",
          "Both provide $O(n^2)$ access times",
          "`ArrayList` cannot store objects"
        ],
        "correct_option_index": 0,
        "explanation": "`ArrayList` is backed by an array allowing instant $O(1)$ index lookup; `LinkedList` consists of doubly-linked nodes requiring linear traversal from the head or tail to reach an index."
      },
      {
        "id": "jv_4",
        "question_number": 4,
        "topic": "HashMap Internals",
        "question_text": "How does Java 8+ optimize `HashMap` bucket storage when a single hash bucket accumulates more than 8 colliding entries?",
        "options": [
          "It deletes all colliding keys",
          "It converts the linked list bucket into a balanced Red-Black Tree, improving lookup complexity from $O(n)$ to $O(\\log n)$",
          "It throws a `HashMapOverflowException`",
          "It doubles the JVM heap size"
        ],
        "correct_option_index": 1,
        "explanation": "Java 8 converts linked list buckets into balanced Red-Black Trees (TreeNodes) when the bucket length exceeds `TREEIFY_THRESHOLD` (8), guaranteeing $O(\\log n)$ worst-case search."
      },
      {
        "id": "jv_5",
        "question_number": 5,
        "topic": "Exception Hierarchy",
        "question_text": "What is the difference between Checked and Unchecked (Runtime) exceptions in Java?",
        "options": [
          "Checked exceptions (subclasses of `Exception`) must be declared in method signatures or handled in `try-catch`, whereas Unchecked exceptions (`RuntimeException`) do not require mandatory handling",
          "Checked exceptions crash the computer, while unchecked exceptions do not",
          "Checked exceptions only occur at compile-time",
          "Unchecked exceptions cannot be caught"
        ],
        "correct_option_index": 0,
        "explanation": "Checked exceptions represent recoverable external conditions enforced by the compiler; unchecked exceptions represent programming errors (e.g. `NullPointerException`) extending `RuntimeException`."
      },
      {
        "id": "jv_6",
        "question_number": 6,
        "topic": "Inversion of Control (IoC)",
        "question_text": "What core problem does Spring's Inversion of Control (IoC) container solve via Dependency Injection (DI)?",
        "options": [
          "It decouples object creation and lifecycle management from business logic, injecting dependencies automatically at runtime",
          "It converts Java source code into Python",
          "It accelerates database network speeds",
          "It replaces all SQL queries with file writes"
        ],
        "correct_option_index": 0,
        "explanation": "The Spring IoC container creates, configures, and wires application objects (beans) together, removing hardcoded tight coupling and making components modular and testable."
      },
      {
        "id": "jv_7",
        "question_number": 7,
        "topic": "Spring Stereotype Annotations",
        "question_text": "Which Spring annotation designates a class as a component responsible for handling HTTP REST requests and returning JSON responses?",
        "options": [
          "`@Repository`",
          "`@RestController`",
          "`@Service`",
          "`@Configuration`"
        ],
        "correct_option_index": 1,
        "explanation": "`@RestController` combines `@Controller` and `@ResponseBody`, marking the class as a web request handler where handler methods return data serialized directly into JSON/XML."
      },
      {
        "id": "jv_8",
        "question_number": 8,
        "topic": "JPA Entity Relationships",
        "question_text": "In Spring Data JPA / Hibernate, what is the default fetching strategy for a `@ManyToOne` entity relationship?",
        "options": [
          "`FetchType.EAGER`",
          "`FetchType.LAZY`",
          "`FetchType.NEVER`",
          "`FetchType.RANDOM`"
        ],
        "correct_option_index": 0,
        "explanation": "In JPA specifications, `@ManyToOne` and `@OneToOne` default to `FetchType.EAGER`, immediately loading the associated parent entity unless explicitly configured to `LAZY`."
      },
      {
        "id": "jv_9",
        "question_number": 9,
        "topic": "N+1 Query Problem",
        "question_text": "What is the 'N+1 Query Problem' in Hibernate / Spring Data JPA and how is it resolved?",
        "options": [
          "Executing 1 query to fetch $N$ records, followed by $N$ separate queries to fetch related entities; resolved using `JOIN FETCH` or `@EntityGraph`",
          "A syntax error caused by writing $N+1$ in a SQL query",
          "A database timeout when inserting more than 100 rows",
          "A bug in the JVM garbage collector"
        ],
        "correct_option_index": 0,
        "explanation": "The N+1 problem occurs when fetching a parent collection causes $N$ individual queries for each child relation; using `JOIN FETCH` retrieves parents and children in a single combined SQL query."
      },
      {
        "id": "jv_10",
        "question_number": 10,
        "topic": "Spring Transactions",
        "question_text": "What does the `@Transactional` annotation guarantee when applied to a Spring service method?",
        "options": [
          "It executes the entire method within a database transaction; if an unchecked exception occurs, all changes are rolled back automatically to maintain consistency",
          "It makes the method execute 10x faster",
          "It translates SQL queries into GraphQL",
          "It encrypts all method parameters"
        ],
        "correct_option_index": 0,
        "explanation": "`@Transactional` wraps method execution in transaction boundaries, committing on successful return and initiating automated rollback if a `RuntimeException` or Error is raised."
      },
      {
        "id": "jv_11",
        "question_number": 11,
        "topic": "Global Exception Handling",
        "question_text": "Which combination of Spring Boot annotations enables centralized, global exception handling across all controller classes?",
        "options": [
          "`@ControllerAdvice` (or `@RestControllerAdvice`) with `@ExceptionHandler`",
          "`@GlobalHandler` with `@CatchAll`",
          "`@Service` with `@TryCatch`",
          "`@Configuration` with `@ErrorInterceptor`"
        ],
        "correct_option_index": 0,
        "explanation": "`@RestControllerAdvice` allows developers to consolidate error-handling logic across the entire application, mapping specific exceptions to structured HTTP error responses via `@ExceptionHandler`."
      },
      {
        "id": "jv_12",
        "question_number": 12,
        "topic": "Microservices Communication",
        "question_text": "When should a microservices architecture adopt asynchronous event-driven messaging (e.g., Apache Kafka / RabbitMQ) over synchronous REST APIs?",
        "options": [
          "When services require high decoupling, fault tolerance, non-blocking background processing, and eventual consistency across high-throughput domains",
          "When services only need to fetch simple user profile data instantly",
          "When the application runs on a single local computer",
          "When database tables have fewer than 10 rows"
        ],
        "correct_option_index": 0,
        "explanation": "Message brokers decouple sender and receiver lifecycles, enabling resilient event streaming, buffer leveling, and asynchronous processing without cascading HTTP failures."
      },
      {
        "id": "jv_13",
        "question_number": 13,
        "topic": "Spring Boot Actuator",
        "question_text": "What is the primary operational utility of Spring Boot Actuator in production deployments?",
        "options": [
          "Providing production-ready monitoring endpoints (`/actuator/health`, `/actuator/metrics`, `/actuator/env`) for health checks and observability",
          "Compiling Java files into Docker containers",
          "Automating database schema backups",
          "Generating frontend React templates"
        ],
        "correct_option_index": 0,
        "explanation": "Spring Boot Actuator exposes built-in management endpoints that allow DevOps and monitoring tools (Prometheus, Kubernetes) to inspect application health, metrics, and thread dumps."
      },
      {
        "id": "jv_14",
        "question_number": 14,
        "topic": "Security Architecture",
        "question_text": "How does Spring Security validate incoming stateless API requests authenticated via JWT tokens?",
        "options": [
          "Through a custom `OncePerRequestFilter` that intercepts the HTTP Authorization header, validates the JWT signature, and populates the `SecurityContextHolder` with an `Authentication` token",
          "By asking the user to re-enter their password on every HTTP request",
          "By hardcoding user credentials in `application.properties`",
          "By disabling all HTTP firewalls"
        ],
        "correct_option_index": 0,
        "explanation": "Stateless JWT validation intercepts incoming requests via security filters, decodes and verifies token signatures, and sets the principal authentication in Spring's `SecurityContext`."
      },
      {
        "id": "jv_15",
        "question_number": 15,
        "topic": "Reactive Spring",
        "question_text": "What is the core difference between standard Spring MVC and Spring WebFlux?",
        "options": [
          "Spring MVC uses traditional blocking I/O with one thread per request, while Spring WebFlux uses non-blocking reactive streams (Project Reactor) to handle high concurrency with minimal threads",
          "Spring WebFlux only runs on mobile devices",
          "Spring MVC is written in C++",
          "WebFlux does not support JSON responses"
        ],
        "correct_option_index": 0,
        "explanation": "Spring WebFlux is a non-blocking reactive web framework built on Netty/Project Reactor, efficiently supporting thousands of concurrent long-lived connections with low thread overhead."
      }
    ]
  },
  {
    "id": "c-cpp-programming",
    "slug": "c-cpp-programming",
    "title": "C & C++ Programming",
    "category_id": "web-software",
    "category_name": "Software & Mobile Dev",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "C",
      "C++",
      "Pointers",
      "Memory Management",
      "STL",
      "OOP"
    ],
    "description": "Benchmark your core systems programming expertise in C and C++, including pointer arithmetic, dynamic memory allocation, OOP inheritance, vtables, and STL containers.",
    "questions": [
      {
        "id": "cp_1",
        "question_number": 1,
        "topic": "Pointers Fundamentals",
        "question_text": "In C and C++, what does the address-of operator (`&`) and dereference operator (`*`) do?",
        "options": [
          "`&` returns the memory address of a variable; `*` accesses the value stored at the memory address pointed to by a pointer",
          "`&` multiplies numbers; `*` adds numbers",
          "`&` allocates heap memory; `*` frees memory",
          "`&` is for comments; `*` is for loops"
        ],
        "correct_option_index": 0,
        "explanation": "`&x` extracts the physical memory address of variable `x`; `*ptr` dereferences the pointer to retrieve or mutate the value at that address."
      },
      {
        "id": "cp_2",
        "question_number": 2,
        "topic": "Dynamic Memory",
        "question_text": "What happens if dynamic memory allocated via `malloc()` in C or `new` in C++ is never deallocated with `free()` or `delete`?",
        "options": [
          "The computer automatically reboots",
          "A Memory Leak occurs, causing the program to consume increasing amounts of RAM until system memory is exhausted",
          "The compiler automatically deletes the variable on the next line",
          "The variable converts into a static global constant"
        ],
        "correct_option_index": 1,
        "explanation": "Unfreed dynamically allocated heap memory remains reserved for the lifetime of the process, leading to memory leaks that can degrade system performance or crash applications."
      },
      {
        "id": "cp_3",
        "question_number": 3,
        "topic": "Storage Classes",
        "question_text": "What is the effect of declaring a local variable as `static` inside a C function?",
        "options": [
          "The variable retains its value between successive function calls and is allocated in the data segment for the program's lifetime",
          "The variable becomes accessible to all files in the operating system",
          "The variable value cannot be modified",
          "The variable is deleted immediately upon entering the function"
        ],
        "correct_option_index": 0,
        "explanation": "A static local variable is initialized only once in static data memory and persists its stored state across repeated invocations of the enclosing function."
      },
      {
        "id": "cp_4",
        "question_number": 4,
        "topic": "Array Pointer Equivalence",
        "question_text": "If `int arr[5] = {10, 20, 30, 40, 50};` and `int *p = arr;`, what does `*(p + 2)` evaluate to?",
        "options": [
          "`10`",
          "`30`",
          "`20`",
          "`The memory address of arr[0]`"
        ],
        "correct_option_index": 1,
        "explanation": "Array names decay to pointers to their first element (`&arr[0]`); pointer arithmetic `*(p + 2)` advances by 2 integer elements, dereferencing `arr[2]` which equals `30`."
      },
      {
        "id": "cp_5",
        "question_number": 5,
        "topic": "Structs vs Unions",
        "question_text": "What is the fundamental memory difference between a `struct` and a `union` in C?",
        "options": [
          "A `struct` allocates separate memory for every member; a `union` allocates memory equal only to its largest member, sharing that single memory space among all members",
          "A `struct` is stored in the CPU cache, while a `union` is stored on disk",
          "A `union` can only store strings",
          "A `struct` cannot contain pointers"
        ],
        "correct_option_index": 0,
        "explanation": "All members of a struct have distinct non-overlapping memory offsets; union members share the exact same starting memory address, holding only one active member value at a time."
      },
      {
        "id": "cp_6",
        "question_number": 6,
        "topic": "Access Specifiers in C++",
        "question_text": "In C++ class design, which access specifier allows member variables to be accessed by derived subclass methods while remaining hidden from outside code?",
        "options": [
          "`public`",
          "`private`",
          "`protected`",
          "`friend`"
        ],
        "correct_option_index": 2,
        "explanation": "`protected` members are accessible within the defining class and any derived child classes, but remain inaccessible to external public client code."
      },
      {
        "id": "cp_7",
        "question_number": 7,
        "topic": "Polymorphism & Vtables",
        "question_text": "What mechanism enables runtime polymorphism when calling a `virtual` member function through a base class pointer in C++?",
        "options": [
          "The Virtual Method Table (`vtable`) and virtual table pointer (`vptr`) resolved at runtime",
          "Macro text substitution by the preprocessor",
          "Automatic code recompilation during execution",
          "Heap defragmentation"
        ],
        "correct_option_index": 0,
        "explanation": "Classes with virtual functions contain a hidden `vptr` pointing to a `vtable` of function pointers; method invocations via base pointers dynamically dispatch to the derived implementation at runtime."
      },
      {
        "id": "cp_8",
        "question_number": 8,
        "topic": "C++ STL Containers",
        "question_text": "What is the underlying data structure and search time complexity of `std::map` in the C++ Standard Template Library?",
        "options": [
          "A Red-Black Tree (Self-Balancing Binary Search Tree) with $O(\\log n)$ search time",
          "An unsorted linked list with $O(n)$ search time",
          "A Hash Table with $O(1)$ search time",
          "A static array with $O(n^2)$ search time"
        ],
        "correct_option_index": 0,
        "explanation": "`std::map` is implemented as a balanced Red-Black Tree maintaining ordered keys with $O(\\log n)$ operations; `std::unordered_map` is the hash-table based alternative with average $O(1)$ lookup."
      },
      {
        "id": "cp_9",
        "question_number": 9,
        "topic": "Pass by Reference",
        "question_text": "How does passing an argument by reference (`void update(int &x)`) in C++ differ from passing by pointer (`void update(int *x)`)?",
        "options": [
          "References cannot be null, cannot be re-seated to bind to another variable, and do not require dereference syntax (`*`) inside the function",
          "References consume 10x more memory than pointers",
          "References only work with constant floats",
          "References require dynamic memory allocation via `new`"
        ],
        "correct_option_index": 0,
        "explanation": "A reference is an immutable alias for an existing object that guarantees non-null safety and provides clean syntax without explicit address-of or dereference operators."
      },
      {
        "id": "cp_10",
        "question_number": 10,
        "topic": "Modern C++ Smart Pointers",
        "question_text": "What distinguishes `std::unique_ptr` from `std::shared_ptr` in C++11 and beyond?",
        "options": [
          "`std::unique_ptr` enforces strict exclusive ownership (cannot be copied, only moved), whereas `std::shared_ptr` maintains a reference count allowing shared ownership",
          "`std::unique_ptr` never deallocates memory",
          "`std::shared_ptr` does not work with custom classes",
          "`std::unique_ptr` is only for single-byte characters"
        ],
        "correct_option_index": 0,
        "explanation": "`std::unique_ptr` provides zero-overhead exclusive resource ownership via RAII; `std::shared_ptr` uses an atomic control block to track reference counts, deleting the managed object when count reaches zero."
      },
      {
        "id": "cp_11",
        "question_number": 11,
        "topic": "Deep vs Shallow Copy",
        "question_text": "Why does a class managing raw heap pointers require a custom Copy Constructor and Assignment Operator (Rule of Three)?",
        "options": [
          "A default shallow copy only duplicates pointer addresses, causing multiple objects to point to the same heap memory and resulting in fatal double-free errors on destruction",
          "The compiler refuses to compile classes without copy constructors",
          "To speed up integer addition",
          "To convert C++ objects into C structs"
        ],
        "correct_option_index": 0,
        "explanation": "Shallow copying copies pointer values rather than the pointed-to data; when both objects destruct, they attempt to free the same heap buffer twice, causing memory corruption."
      },
      {
        "id": "cp_12",
        "question_number": 12,
        "topic": "C++ Templates",
        "question_text": "What happens during C++ template instantiation (e.g. `template <typename T> T add(T a, T b)`) at compile time?",
        "options": [
          "The compiler generates dedicated, type-specific concrete functions for each distinct type used with the template in the codebase",
          "The code is converted into an interpreted Python script",
          "The template is executed on a virtual cloud emulator",
          "All types are cast to void pointers at runtime"
        ],
        "correct_option_index": 0,
        "explanation": "C++ templates utilize compile-time monomorphization: the compiler inspects template invocations and generates separate, fully optimized binary machine code for each concrete type argument."
      },
      {
        "id": "cp_13",
        "question_number": 13,
        "topic": "Destructors & Inheritance",
        "question_text": "Why should a Base class destructor always be declared `virtual` if derived objects are to be deleted via base pointers?",
        "options": [
          "To ensure the derived class destructor executes first before the base destructor, preventing resource leaks of derived class members",
          "To prevent derived classes from having member variables",
          "To make compilation faster",
          "To disable polymorphism"
        ],
        "correct_option_index": 0,
        "explanation": "If a base destructor is non-virtual, deleting a derived instance through a base pointer invokes only the base destructor, leaking any resources allocated by the derived subclass."
      },
      {
        "id": "cp_14",
        "question_number": 14,
        "topic": "Preprocessor Macros",
        "question_text": "Why are inline functions or `constexpr` templates strongly preferred over `#define` macros in modern C++?",
        "options": [
          "Inline functions provide strict type-checking, respect class scope, avoid side-effect double evaluation bugs, and are debuggable in IDEs",
          "Macros are illegal in C++20",
          "Inline functions can only contain 1 line of code",
          "Macros cannot perform multiplication"
        ],
        "correct_option_index": 0,
        "explanation": "`#define` performs naive lexical substitution without type checking or scope boundaries, creating subtle bugs (e.g. `#define SQUARE(x) x*x` failing on `SQUARE(1+2)`)."
      },
      {
        "id": "cp_15",
        "question_number": 15,
        "topic": "Move Semantics (C++11)",
        "question_text": "What performance problem does Move Semantics (`std::move` and rvalue references `&&`) solve when returning large containers like `std::vector`?",
        "options": [
          "It transfers ownership of internal heap resource pointers directly from temporary objects without performing expensive deep memory allocations and copies",
          "It compresses vector data into ZIP format",
          "It prevents vectors from expanding dynamically",
          "It executes vector operations on the GPU"
        ],
        "correct_option_index": 0,
        "explanation": "Move semantics allow resources (like heap array buffers) to be pilfered from expiring rvalue temporaries by swapping pointer handles, avoiding deep data copies."
      }
    ]
  },
  {
    "id": "flutter-mobile-app-development",
    "slug": "flutter-mobile-app-development",
    "title": "Flutter Mobile App Development",
    "category_id": "web-software",
    "category_name": "Software & Mobile Dev",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Flutter",
      "Dart",
      "Mobile",
      "Cross-Platform",
      "State Management",
      "BLoC"
    ],
    "description": "Assess your expertise in building cross-platform mobile apps with Flutter and Dart, including widget architectures, state management, asynchronous streams, and REST API integration.",
    "questions": [
      {
        "id": "fl_1",
        "question_number": 1,
        "topic": "Flutter Architecture",
        "question_text": "How does Flutter render its user interface on iOS and Android devices?",
        "options": [
          "By translating Dart code into native OEM platform widgets (like UIKit and Android Views)",
          "By drawing UI directly onto a canvas using its own high-performance 2D rendering engine (Impeller / Skia)",
          "By running a hidden Chromium webview inside the app",
          "By compiling everything into an HTML5 iframe"
        ],
        "correct_option_index": 1,
        "explanation": "Unlike hybrid frameworks that bridge to native OEM widgets, Flutter controls every pixel by rendering its widget tree directly to the screen canvas via its Skia/Impeller graphics engine."
      },
      {
        "id": "fl_2",
        "question_number": 2,
        "topic": "Stateless vs Stateful",
        "question_text": "What is the core distinction between a `StatelessWidget` and a `StatefulWidget` in Flutter?",
        "options": [
          "`StatelessWidget` is immutable and cannot change its appearance over time, while `StatefulWidget` maintains mutable state that triggers UI rebuilds via `setState()`",
          "`StatelessWidget` only works on Android, while `StatefulWidget` is for iOS",
          "`StatelessWidget` cannot display text or images",
          "`StatefulWidget` runs only when connected to the internet"
        ],
        "correct_option_index": 0,
        "explanation": "`StatelessWidget` configuration is immutable; `StatefulWidget` creates a persistent `State` object whose variables can change across the widget lifecycle to trigger UI updates."
      },
      {
        "id": "fl_3",
        "question_number": 3,
        "topic": "Widget Lifecycle",
        "question_text": "Which lifecycle method in a Flutter `State` class is called exactly once when the state object is first inserted into the tree?",
        "options": [
          "`initState()`",
          "`build()`",
          "`dispose()`",
          "`didUpdateWidget()`"
        ],
        "correct_option_index": 0,
        "explanation": "`initState()` executes once during state initialization, making it the standard location to subscribe to streams, initialize controllers, or trigger initial data fetches."
      },
      {
        "id": "fl_4",
        "question_number": 4,
        "topic": "Layout Widgets",
        "question_text": "Which Flutter widget arranges its child widgets sequentially in a horizontal direction?",
        "options": [
          "`Column`",
          "`Row`",
          "`Stack`",
          "`Wrap` (when vertical)"
        ],
        "correct_option_index": 1,
        "explanation": "`Row` displays children in a horizontal array along the main axis (X-axis), while `Column` displays children in a vertical array along the Y-axis."
      },
      {
        "id": "fl_5",
        "question_number": 5,
        "topic": "Hot Reload",
        "question_text": "How does Flutter's 'Hot Reload' feature accelerate developer productivity during UI construction?",
        "options": [
          "By restarting the entire operating system simulator in 1 millisecond",
          "By injecting updated source code files directly into the running Dart Virtual Machine (VM), preserving current app state without full restart",
          "By deploying code directly to the Apple App Store automatically",
          "By converting Dart code into Swift in the background"
        ],
        "correct_option_index": 1,
        "explanation": "Hot Reload leverages the Dart VM's JIT compilation to swap modified class definitions into memory, instantly reflecting UI changes while keeping navigation and form state intact."
      },
      {
        "id": "fl_6",
        "question_number": 6,
        "topic": "Asynchronous Dart",
        "question_text": "What Dart construct represents a computation that delivers a single value or error asynchronously in the future?",
        "options": [
          "`Future`",
          "`Stream`",
          "`Isolate`",
          "`Completer` (when continuous)"
        ],
        "correct_option_index": 0,
        "explanation": "A `Future` represents an eventual asynchronous single-value completion (resolved via `await` or `.then()`), whereas a `Stream` delivers a sequence of asynchronous events over time."
      },
      {
        "id": "fl_7",
        "question_number": 7,
        "topic": "Async UI Builders",
        "question_text": "Which built-in Flutter widget automatically rebuilds its UI according to the latest snapshot state of an asynchronous `Future`?",
        "options": [
          "`FutureBuilder`",
          "`StreamBuilder`",
          "`AnimatedContainer`",
          "`CustomScrollView`"
        ],
        "correct_option_index": 0,
        "explanation": "`FutureBuilder` connects to a `Future` and provides an `AsyncSnapshot` (with states like `ConnectionState.waiting`, `hasData`, `hasError`) to render loading, error, or data views."
      },
      {
        "id": "fl_8",
        "question_number": 8,
        "topic": "BLoC Pattern",
        "question_text": "What is the core architectural principle of the BLoC (Business Logic Component) pattern in Flutter?",
        "options": [
          "Separating business logic from UI presentation using Sink (inputs/events) and Stream (outputs/states)",
          "Writing all backend database code in the widget build method",
          "Eliminating the need for Dart classes",
          "Replacing REST APIs with local JSON files"
        ],
        "correct_option_index": 0,
        "explanation": "BLoC decouples presentation from application logic: the UI dispatches events to the BLoC, which processes business rules and emits immutable state streams for the UI to consume."
      },
      {
        "id": "fl_9",
        "question_number": 9,
        "topic": "List Optimization",
        "question_text": "Why should developers use `ListView.builder` instead of standard `ListView(children: [...])` for displaying 1,000 items?",
        "options": [
          "`ListView.builder` creates and renders child items lazily on-demand only as they scroll into the visible viewport, conserving memory and CPU",
          "`ListView.builder` automatically translates text into foreign languages",
          "`ListView(children: [...])` cannot display text",
          "`ListView.builder` disables vertical scrolling"
        ],
        "correct_option_index": 0,
        "explanation": "`ListView.builder` employs viewport virtualization, instantiating and destroying widgets dynamically as they enter and leave the screen rather than building all 1,000 widgets upfront."
      },
      {
        "id": "fl_10",
        "question_number": 10,
        "topic": "Riverpod / Provider",
        "question_text": "What is the primary advantage of Riverpod over the original Provider state management package?",
        "options": [
          "Riverpod is compile-safe (no `ProviderNotFoundException`), does not depend on the Flutter widget tree `BuildContext`, and supports easy dependency overriding in tests",
          "Riverpod only works with Firebase",
          "Riverpod converts Flutter apps into native C++ code",
          "Riverpod removes the need for asynchronous programming"
        ],
        "correct_option_index": 0,
        "explanation": "Riverpod redesigns Provider to operate independently of `BuildContext`, catching provider lookup errors at compile time and offering robust reactive caching."
      },
      {
        "id": "fl_11",
        "question_number": 11,
        "topic": "Null Safety in Dart",
        "question_text": "In Dart sound null safety, what does the null assertion operator (`!`) do when placed after a nullable variable `name!`?",
        "options": [
          "It casts the variable to a boolean",
          "It asserts to the compiler that the value is guaranteed to be non-null; if it is null at runtime, it throws an exception",
          "It assigns a default empty string",
          "It makes the variable immutable"
        ],
        "correct_option_index": 1,
        "explanation": "The `!` operator tells the type system to treat a nullable type as non-nullable, throwing a runtime error if the developer's non-null assumption is violated."
      },
      {
        "id": "fl_12",
        "question_number": 12,
        "topic": "Local Persistence",
        "question_text": "Which local storage solution in Flutter is a lightweight, pure-Dart, key-value database that stores data in fast binary boxes without native SQLite dependencies?",
        "options": [
          "`Hive`",
          "`SharedPreferences` (for large tables)",
          "`Room Database`",
          "`CoreData`"
        ],
        "correct_option_index": 0,
        "explanation": "Hive is a high-performance, pure Dart key-value database with no native mobile dependencies, providing fast read/write operations for structured local caching."
      },
      {
        "id": "fl_13",
        "question_number": 13,
        "topic": "Responsive Layouts",
        "question_text": "Which Flutter widget provides parent layout constraints (`maxWidth`, `maxHeight`) so developers can conditionally render different UI layouts for mobile and tablet screens?",
        "options": [
          "`LayoutBuilder`",
          "`SafeArea`",
          "`Center`",
          "`FittedBox`"
        ],
        "correct_option_index": 0,
        "explanation": "`LayoutBuilder` passes the parent widget's box constraints to its builder function, allowing developers to adapt layouts dynamically based on available screen width."
      },
      {
        "id": "fl_14",
        "question_number": 14,
        "topic": "Native Integration",
        "question_text": "What communication bridge mechanism in Flutter enables Dart code to invoke platform-specific APIs in native Android (Kotlin) and iOS (Swift)?",
        "options": [
          "`Platform Channels` (`MethodChannel` and `EventChannel`)",
          "Direct C++ pointer injection",
          "HTTP REST APIs over localhost",
          "WebSocket connections"
        ],
        "correct_option_index": 0,
        "explanation": "MethodChannels serialize asynchronous message calls between Dart and native host platforms (iOS/Android), allowing access to native camera, Bluetooth, or sensors."
      },
      {
        "id": "fl_15",
        "question_number": 15,
        "topic": "Animations",
        "question_text": "In Flutter custom animations, what is the role of an `AnimationController`?",
        "options": [
          "It generates a sequence of interpolated values (typically from 0.0 to 1.0) over a specified duration driven by a `TickerProvider`",
          "It controls device screen brightness",
          "It downloads video files from the internet",
          "It manages database transactions"
        ],
        "correct_option_index": 0,
        "explanation": "An `AnimationController` manages the duration, direction, playback (forward/reverse), and frame-by-frame ticking of an animation, providing linear normalized values to Tweens."
      }
    ]
  },
  {
    "id": "software-testing-qa-fundamentals",
    "slug": "software-testing-qa-fundamentals",
    "title": "Software Testing & QA Fundamentals",
    "category_id": "web-software",
    "category_name": "Software & Mobile Dev",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Software Testing",
      "QA",
      "Selenium",
      "API Testing",
      "Automation",
      "Test Cases"
    ],
    "description": "Benchmark your understanding of Software Testing Life Cycle (STLC), Black/White box methodologies, automated UI testing with Selenium, and REST API validation.",
    "questions": [
      {
        "id": "qa_1",
        "question_number": 1,
        "topic": "Testing Principles",
        "question_text": "What is the primary objective of software testing and quality assurance in modern engineering?",
        "options": [
          "To prove that a software product has zero bugs under all circumstances",
          "To systematically identify defects, verify conformance with business requirements, and ensure system reliability before production release",
          "To rewrite developer source code in another language",
          "To delay software releases indefinitely"
        ],
        "correct_option_index": 1,
        "explanation": "Testing identifies defects and verifies requirements conformance to mitigate production risk; testing demonstrates the presence of defects, not their complete absence."
      },
      {
        "id": "qa_2",
        "question_number": 2,
        "topic": "Black Box vs White Box",
        "question_text": "What is the defining characteristic of 'Black Box Testing'?",
        "options": [
          "The tester evaluates application functionality strictly against specified requirements without any knowledge of internal code structure or implementation",
          "The test is conducted on a powered-off computer screen",
          "The tester inspects private variables and internal algorithms directly in the IDE",
          "The test is only executed at night"
        ],
        "correct_option_index": 0,
        "explanation": "Black box testing examines inputs and outputs from an external end-user perspective, whereas white box testing evaluates internal logic, control flows, and code branches."
      },
      {
        "id": "qa_3",
        "question_number": 3,
        "topic": "Verification vs Validation",
        "question_text": "In quality engineering standards, what is the difference between 'Verification' and 'Validation'?",
        "options": [
          "Verification asks 'Are we building the product right?' (process review/inspections); Validation asks 'Are we building the right product?' (executing software to fulfill customer needs)",
          "Verification is done after release, while validation is done before development",
          "Verification is for databases, while validation is for CSS",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "Verification evaluates static artifacts and architecture to ensure standard adherence; Validation executes the dynamic software to verify it satisfies end-user expectations."
      },
      {
        "id": "qa_4",
        "question_number": 4,
        "topic": "Testing Levels",
        "question_text": "What is the correct hierarchical progression of testing levels in the Software Development Life Cycle (SDLC)?",
        "options": [
          "Unit Testing $\\rightarrow$ Integration Testing $\\rightarrow$ System Testing $\\rightarrow$ Acceptance Testing (UAT)",
          "UAT $\\rightarrow$ System Testing $\\rightarrow$ Unit Testing $\\rightarrow$ Deployment",
          "Integration Testing $\\rightarrow$ Code Writing $\\rightarrow$ Unit Testing",
          "Performance Testing $\\rightarrow$ Unit Testing $\\rightarrow$ Requirement Analysis"
        ],
        "correct_option_index": 0,
        "explanation": "Testing progresses from the smallest isolated components (Unit), to interacting subsystems (Integration), to full end-to-end applications (System), to user sign-off (UAT)."
      },
      {
        "id": "qa_5",
        "question_number": 5,
        "topic": "Boundary Value Analysis (BVA)",
        "question_text": "If an input text box accepts an age integer value strictly between 18 and 60 (inclusive), what test values should be selected according to Boundary Value Analysis (BVA)?",
        "options": [
          "`17, 18, 19, 59, 60, 61`",
          "`1, 100, 500, 1000`",
          "`25, 30, 40, 50`",
          "`0, 200`"
        ],
        "correct_option_index": 0,
        "explanation": "BVA tests boundary boundaries: immediate minimum boundary (17, 18, 19) and maximum boundary (59, 60, 61), where software logic defects cluster most frequently."
      },
      {
        "id": "qa_6",
        "question_number": 6,
        "topic": "Equivalence Partitioning",
        "question_text": "What is the purpose of applying 'Equivalence Partitioning' when designing test cases?",
        "options": [
          "Dividing input data into valid and invalid partitions where all members of a partition are expected to be processed equivalently, reducing the total test cases needed",
          "Testing every single integer from 1 to 1,000,000 individually",
          "Splitting the QA team into two equal groups",
          "Dividing the database into equal tables"
        ],
        "correct_option_index": 0,
        "explanation": "Equivalence partitioning groups input values that trigger identical program behavior, allowing testers to choose one representative value per partition instead of testing all inputs."
      },
      {
        "id": "qa_7",
        "question_number": 7,
        "topic": "Regression vs Smoke Testing",
        "question_text": "When is 'Regression Testing' performed during continuous delivery?",
        "options": [
          "After code modifications, bug fixes, or new feature additions to confirm that existing unaffected functionality remains completely unbroken",
          "Only when the software crashes in production",
          "Immediately before developers write the first line of code",
          "When purchasing new server hardware"
        ],
        "correct_option_index": 0,
        "explanation": "Regression testing re-executes test suites across existing features to ensure recent code commits have not introduced unintended defects into stable workflows."
      },
      {
        "id": "qa_8",
        "question_number": 8,
        "topic": "Defect Life Cycle",
        "question_text": "In standard bug tracking workflows, what state is a defect assigned after a developer implements a fix and prepares it for QA re-testing?",
        "options": [
          "`Resolved` / `Fixed` (pending `Retest`)",
          "`Closed`",
          "`Deferred`",
          "`Rejected`"
        ],
        "correct_option_index": 0,
        "explanation": "When a developer resolves a defect, it transitions to `Resolved`/`Fixed`; QA then initiates `Retesting` to either mark it `Closed` or `Reopen` it if the bug persists."
      },
      {
        "id": "qa_9",
        "question_number": 9,
        "topic": "Selenium Locators",
        "question_text": "In Selenium WebDriver automation, why is locating elements by unique `id` attribute generally preferred over complex XPath?",
        "options": [
          "Unique IDs provide the fastest, most resilient DOM lookups and do not break when page layout hierarchies or parent containers change",
          "XPath is not supported in Google Chrome",
          "IDs automatically bypass login passwords",
          "IDs compile into native C++ code"
        ],
        "correct_option_index": 0,
        "explanation": "Element IDs are direct DOM index lookups that remain robust across layout restructurings, unlike brittle absolute XPaths that break upon minor DOM shifts."
      },
      {
        "id": "qa_10",
        "question_number": 10,
        "topic": "Page Object Model (POM)",
        "question_text": "What is the primary architectural benefit of implementing the Page Object Model (POM) in automated test frameworks?",
        "options": [
          "It separates web page UI locators and interactions into dedicated class files, preventing test script duplication and enabling easy maintenance when UI changes",
          "It eliminates the need for test assertions",
          "It allows automated tests to run with no browser installed",
          "It converts automated tests into manual spreadsheets"
        ],
        "correct_option_index": 0,
        "explanation": "POM creates an abstraction layer representing web pages as classes; when a UI button changes, developers update the locator in a single Page class rather than editing 50 test scripts."
      },
      {
        "id": "qa_11",
        "question_number": 11,
        "topic": "API Testing Assertions",
        "question_text": "When testing a RESTful API endpoint `POST /api/users` that successfully creates a new user, which HTTP status code and response properties should be validated?",
        "options": [
          "HTTP Status `201 Created`, response body containing the generated `id`, and headers confirming `Content-Type: application/json`",
          "HTTP Status `404 Not Found`",
          "HTTP Status `500 Internal Server Error`",
          "HTTP Status `301 Moved Permanently`"
        ],
        "correct_option_index": 0,
        "explanation": "Successful creation endpoints must return standard RFC status `201 Created` accompanied by the created entity payload, validating both HTTP code and schema integrity."
      },
      {
        "id": "qa_12",
        "question_number": 12,
        "topic": "Performance Testing",
        "question_text": "What is the primary difference between Load Testing and Stress Testing in performance engineering?",
        "options": [
          "Load testing evaluates system behavior under expected normal and peak user traffic; Stress testing pushes the system beyond its breaking point to observe failure modes and recovery",
          "Load testing tests networks, while stress testing tests mouse clicks",
          "Stress testing is conducted on developer laptops only",
          "Load testing runs only for 1 second"
        ],
        "correct_option_index": 0,
        "explanation": "Load testing validates scalability under anticipated operational volumes; Stress testing determines maximum operational capacity and robustness during severe traffic overloads."
      },
      {
        "id": "qa_13",
        "question_number": 13,
        "topic": "Continuous Integration (CI)",
        "question_text": "Why are automated test suites integrated into CI/CD pipelines (e.g., GitHub Actions / Jenkins)?",
        "options": [
          "To provide immediate feedback by automatically executing test suites on every pull request, preventing defective code from being merged into main branches",
          "To replace human managers with automated bots",
          "To slow down software release cycles",
          "To encrypt git commits"
        ],
        "correct_option_index": 0,
        "explanation": "CI test automation executes unit, integration, and sanity suites on every code commit, catching regressions early in the lifecycle and maintaining deployment readiness."
      },
      {
        "id": "qa_14",
        "question_number": 14,
        "topic": "Mocking in Unit Tests",
        "question_text": "Why do automated unit tests utilize 'Mock Objects' (e.g. Mockito / Jest Mocks) instead of connecting to real production databases?",
        "options": [
          "To isolate the specific unit of code under test from external dependencies, ensuring tests run deterministically, fast, and without network/database side-effects",
          "Because real databases cannot store test data",
          "To reduce developer salaries",
          "To make unit tests run in reverse order"
        ],
        "correct_option_index": 0,
        "explanation": "Mocking isolates the unit under test by simulating external APIs and databases with controlled outputs, making unit tests fast, repeatable, and independent of external state."
      },
      {
        "id": "qa_15",
        "question_number": 15,
        "topic": "Code Coverage",
        "question_text": "What does a 'Code Coverage' metric of 80% indicate about an automated test suite?",
        "options": [
          "80% of lines/branches in the application source code were executed at least once during the test suite run",
          "80% of all software bugs were fixed",
          "The software will never fail in production 80% of the time",
          "80% of test cases passed"
        ],
        "correct_option_index": 0,
        "explanation": "Code coverage measures the percentage of source code statements, branches, or functions executed by automated test suites, highlighting untested areas of the codebase."
      }
    ]
  },
  {
    "id": "sql-database-management",
    "slug": "sql-database-management",
    "title": "SQL & Database Management",
    "category_id": "data-cloud",
    "category_name": "Data, Cloud & Security",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "SQL",
      "Relational Databases",
      "Joins",
      "CTEs",
      "Window Functions",
      "Indexing"
    ],
    "description": "Assess your relational database querying proficiency, multi-table joins, aggregations, window functions, indexing strategies, and ACID transaction concepts.",
    "questions": [
      {
        "id": "sql_1",
        "question_number": 1,
        "topic": "Keys & Constraints",
        "question_text": "What is the primary operational difference between a `PRIMARY KEY` and a `UNIQUE` constraint in SQL?",
        "options": [
          "A table can have only one Primary Key and it cannot contain NULL values, whereas multiple Unique constraints are permitted and may allow NULL values",
          "A Primary Key stores text, while a Unique key stores numbers",
          "Unique keys cannot be indexed",
          "Primary Keys are only used in NoSQL databases"
        ],
        "correct_option_index": 0,
        "explanation": "A table has at most one Primary Key which uniquely identifies rows and strictly disallows NULLs; Unique constraints enforce uniqueness across alternate candidate keys."
      },
      {
        "id": "sql_2",
        "question_number": 2,
        "topic": "SQL Language Commands",
        "question_text": "Which SQL command category do `CREATE`, `ALTER`, and `DROP` belong to?",
        "options": [
          "Data Query Language (DQL)",
          "Data Definition Language (DDL)",
          "Data Manipulation Language (DML)",
          "Data Control Language (DCL)"
        ],
        "correct_option_index": 1,
        "explanation": "DDL (Data Definition Language) commands define, alter, and manage database schema structures and objects (tables, indexes, views)."
      },
      {
        "id": "sql_3",
        "question_number": 3,
        "topic": "Filtering Clauses",
        "question_text": "What is the key difference between the `WHERE` clause and the `HAVING` clause in SQL queries?",
        "options": [
          "`WHERE` filters individual rows before aggregation occurs, while `HAVING` filters aggregated group results after `GROUP BY` execution",
          "`WHERE` is only for numerical columns, while `HAVING` is for text",
          "`HAVING` cannot be used with aggregate functions",
          "`WHERE` executes after `ORDER BY`"
        ],
        "correct_option_index": 0,
        "explanation": "`WHERE` evaluates conditions on raw individual rows prior to grouping; `HAVING` evaluates conditional predicates on aggregate calculations produced by `GROUP BY`."
      },
      {
        "id": "sql_4",
        "question_number": 4,
        "topic": "Result Sorting",
        "question_text": "What is the default sort order when using `ORDER BY column_name` without specifying `ASC` or `DESC`?",
        "options": [
          "Ascending order (`ASC`)",
          "Descending order (`DESC`)",
          "Random order",
          "Chronological creation order"
        ],
        "correct_option_index": 0,
        "explanation": "SQL standard `ORDER BY` sorts values in ascending order (`ASC`) by default (smallest to largest, A to Z)."
      },
      {
        "id": "sql_5",
        "question_number": 5,
        "topic": "Aggregate Functions",
        "question_text": "What is the result of `SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;`?",
        "options": [
          "Returns the total number of employees working in each distinct department",
          "Returns the highest salary in the company",
          "Deletes duplicate department rows",
          "Combines all employee names into a single string"
        ],
        "correct_option_index": 0,
        "explanation": "`COUNT(*)` with `GROUP BY department_id` aggregates the row count per department group, outputting each department ID and its respective employee count."
      },
      {
        "id": "sql_6",
        "question_number": 6,
        "topic": "SQL Joins",
        "question_text": "What records does a `LEFT JOIN` between Table A (left) and Table B (right) return?",
        "options": [
          "All rows from Table A, plus matched rows from Table B; columns from Table B will contain NULL for rows with no match",
          "Only rows that have matching values in both tables",
          "All rows from Table B only",
          "The Cartesian product of both tables"
        ],
        "correct_option_index": 0,
        "explanation": "A `LEFT OUTER JOIN` preserves all rows from the left table regardless of whether a matching record exists in the right table, populating unmatched right columns with NULL."
      },
      {
        "id": "sql_7",
        "question_number": 7,
        "topic": "Subquery Types",
        "question_text": "What is a 'Correlated Subquery' in SQL?",
        "options": [
          "A subquery that references columns from the outer query table and must be re-evaluated row-by-row for each candidate row processed by the outer query",
          "A subquery that executes only once before the main query starts",
          "A query that joins two tables on a primary key",
          "A subquery containing a syntax error"
        ],
        "correct_option_index": 0,
        "explanation": "Correlated subqueries depend on values from the outer query row context, executing iteratively for each outer row, unlike independent self-contained subqueries."
      },
      {
        "id": "sql_8",
        "question_number": 8,
        "topic": "Common Table Expressions (CTEs)",
        "question_text": "Why are Common Table Expressions (CTEs created using the `WITH` keyword) preferred over deeply nested subqueries?",
        "options": [
          "CTEs improve query modularity, readability, and maintainability, and can support recursive queries",
          "CTEs eliminate the need for database storage space",
          "CTEs automatically encrypt table columns",
          "CTEs convert relational data into XML"
        ],
        "correct_option_index": 0,
        "explanation": "CTEs define named temporary result sets at the start of a query, making complex multi-stage analytical queries readable and allowing recursive hierarchical traversals."
      },
      {
        "id": "sql_9",
        "question_number": 9,
        "topic": "Window Functions (Ranking)",
        "question_text": "What is the difference between `RANK()` and `DENSE_RANK()` when two rows tie for the same value?",
        "options": [
          "`RANK()` skips subsequent rank numbers after a tie (e.g., 1, 2, 2, 4), whereas `DENSE_RANK()` leaves no gaps in ranking sequences (e.g., 1, 2, 2, 3)",
          "`RANK()` only works with positive numbers",
          "`DENSE_RANK()` ignores tied rows",
          "There is no difference in their ranking sequence"
        ],
        "correct_option_index": 0,
        "explanation": "`RANK()` introduces gaps in the sequence equal to the number of tied positions, while `DENSE_RANK()` advances sequentially without skipping integer rank numbers."
      },
      {
        "id": "sql_10",
        "question_number": 10,
        "topic": "Lead & Lag Analytics",
        "question_text": "In financial data analysis, what does `LAG(revenue, 1) OVER (PARTITION BY store_id ORDER BY month)` retrieve?",
        "options": [
          "The revenue value from the previous month for the same store, enabling calculation of month-over-month growth",
          "The highest revenue ever recorded by that store",
          "The revenue of the next future month",
          "The total sum of all months"
        ],
        "correct_option_index": 0,
        "explanation": "`LAG()` accesses data from a preceding row at a specified physical offset within the window partition without requiring a self-join."
      },
      {
        "id": "sql_11",
        "question_number": 11,
        "topic": "Database Normalization",
        "question_text": "What condition must a database table satisfy to be in Third Normal Form (3NF)?",
        "options": [
          "It must be in 2NF and contain no Transitive Dependencies (no non-prime attribute should depend on another non-prime attribute)",
          "It must contain at least 3 foreign keys",
          "All table columns must be text",
          "It must have exactly 3 rows of data"
        ],
        "correct_option_index": 0,
        "explanation": "3NF requires that all non-key columns depend strictly and directly on the primary key ('the key, the whole key, and nothing but the key'), eliminating transitive dependencies."
      },
      {
        "id": "sql_12",
        "question_number": 12,
        "topic": "Clustered vs Non-Clustered Indexes",
        "question_text": "How does a Clustered Index physically organize table data on disk?",
        "options": [
          "It dictates the physical sorting order of the actual table data rows on the storage disk (a table can have only one clustered index)",
          "It stores data in random memory sectors",
          "It creates a separate duplicate copy of the entire table in RAM",
          "It compresses images inside text columns"
        ],
        "correct_option_index": 0,
        "explanation": "A clustered index determines the physical order of data rows on disk, making range scans on the clustered key extremely fast; therefore, only one clustered index can exist per table."
      },
      {
        "id": "sql_13",
        "question_number": 13,
        "topic": "ACID Properties",
        "question_text": "What does the 'Atomicity' property in database ACID transactions guarantee?",
        "options": [
          "All statements in a transaction either complete successfully together, or if any statement fails, the entire transaction is rolled back leaving the database unchanged",
          "Transactions execute on atomic-powered cloud servers",
          "Data is stored in single-character atoms",
          "Transactions can never be aborted"
        ],
        "correct_option_index": 0,
        "explanation": "Atomicity ensures 'all-or-nothing' execution: if any operation within a transaction encounters a failure, the entire unit of work is aborted and rolled back to its pre-transaction state."
      },
      {
        "id": "sql_14",
        "question_number": 14,
        "topic": "Views vs Materialized Views",
        "question_text": "What is the primary operational difference between a standard SQL View and a Materialized View?",
        "options": [
          "A standard View is a stored query that computes results dynamically on every read, whereas a Materialized View persists pre-computed result data physically on disk for fast querying",
          "Standard Views cannot be queried with `SELECT`",
          "Materialized Views only work on CSV files",
          "Standard Views are visible only to database administrators"
        ],
        "correct_option_index": 0,
        "explanation": "Standard views are virtual queries evaluated at runtime; Materialized views cache computed results on disk, requiring refresh strategies (on commit/scheduled) to update data."
      },
      {
        "id": "sql_15",
        "question_number": 15,
        "topic": "Security & SQL Injection",
        "question_text": "Why is using Parameterized Queries (Prepared Statements) the gold standard for preventing SQL Injection attacks?",
        "options": [
          "Parameters treat user input strictly as literal data values rather than executable SQL code, preventing malicious query string concatenation",
          "It converts all SQL queries into HTTPS requests",
          "It encrypts database tables with RSA-2048",
          "It deletes all special characters from the database"
        ],
        "correct_option_index": 0,
        "explanation": "Prepared statements pre-compile the SQL query structure; user input is bound separately as typed data literals, preventing attackers from injecting arbitrary SQL commands."
      }
    ]
  },
  {
    "id": "power-bi-data-visualization",
    "slug": "power-bi-data-visualization",
    "title": "Power BI & Data Visualization",
    "category_id": "data-cloud",
    "category_name": "Data, Cloud & Security",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Power BI",
      "DAX",
      "Power Query",
      "Data Modeling",
      "Dashboards",
      "Business Intelligence"
    ],
    "description": "Evaluate your Business Intelligence capability across Power BI Desktop, Power Query M transformations, Star Schema modeling, advanced DAX formulas, and interactive dashboarding.",
    "questions": [
      {
        "id": "pbi_1",
        "question_number": 1,
        "topic": "Ecosystem Components",
        "question_text": "What are the three primary components of the Microsoft Power BI platform ecosystem?",
        "options": [
          "Power BI Desktop (authoring), Power BI Service (cloud sharing & governance), and Power BI Mobile (viewing)",
          "Power BI Word, Power BI Excel, and Power BI PowerPoint",
          "Power BI HTML, Power BI CSS, and Power BI JavaScript",
          "Power BI SQL, Power BI NoSQL, and Power BI Graph"
        ],
        "correct_option_index": 0,
        "explanation": "The platform consists of Power BI Desktop for modeling and visual creation, Power BI Service (SaaS cloud) for collaboration and scheduled refreshes, and Mobile apps for consumption."
      },
      {
        "id": "pbi_2",
        "question_number": 2,
        "topic": "Data Connectivity Modes",
        "question_text": "What is the key characteristic of 'DirectQuery' mode compared to 'Import' mode in Power BI?",
        "options": [
          "DirectQuery does not import data into Power BI in-memory cache; instead, it generates and sends native SQL queries to the underlying source on every visual interaction",
          "DirectQuery stores all data in Excel spreadsheets",
          "DirectQuery is 100x faster than Import mode for small files",
          "DirectQuery does not support interactive dashboards"
        ],
        "correct_option_index": 0,
        "explanation": "Import mode loads compressed data into the VertiPaq in-memory engine; DirectQuery keeps data at the source, issuing real-time queries for large or live data requirements."
      },
      {
        "id": "pbi_3",
        "question_number": 3,
        "topic": "ETL Tool (Power Query)",
        "question_text": "Which functional language is used under the hood by Power Query Editor to record data transformation steps?",
        "options": [
          "M Language (Power Query Formula Language)",
          "Python 2.7",
          "VBA Macros",
          "TypeScript"
        ],
        "correct_option_index": 0,
        "explanation": "Power Query is powered by the M formula language, an expressive functional language designed for data mashup, extraction, and shape transformations."
      },
      {
        "id": "pbi_4",
        "question_number": 4,
        "topic": "Data Modeling Architecture",
        "question_text": "Why is a Star Schema strongly recommended over a highly normalized Snowflake Schema for Power BI data models?",
        "options": [
          "Star schemas feature simple relationships between central Fact tables and surrounding Dimension tables, optimizing VertiPaq engine performance and simplifying DAX logic",
          "Star schemas consume 10x more storage",
          "Star schemas eliminate all primary keys",
          "Snowflake schemas cannot be refreshed"
        ],
        "correct_option_index": 0,
        "explanation": "Star schemas reduce relationship traversal hops, maximize columnar compression in VertiPaq, and make writing DAX measures intuitive and performant."
      },
      {
        "id": "pbi_5",
        "question_number": 5,
        "topic": "Calculated Columns vs Measures",
        "question_text": "When should a developer create a DAX 'Measure' instead of a 'Calculated Column' in Power BI?",
        "options": [
          "When the calculation aggregates dynamic subsets of data based on visual filters and slicers at query time without consuming static disk/RAM storage",
          "When creating a static row-level label for sorting",
          "When data needs to be exported to CSV",
          "When calculating fixed row-by-row strings"
        ],
        "correct_option_index": 0,
        "explanation": "Measures are dynamic calculations evaluated on the fly within the current visual filter context; Calculated Columns evaluate row-by-row during data refresh and consume permanent RAM."
      },
      {
        "id": "pbi_6",
        "question_number": 6,
        "topic": "The CALCULATE Function",
        "question_text": "Why is `CALCULATE()` considered the most powerful and fundamental function in DAX?",
        "options": [
          "It evaluates an expression in a modified filter context, allowing developers to add, remove, or override active data filters dynamically",
          "It multiplies numbers by 100",
          "It creates new database tables on SQL server",
          "It converts reports into PDF format"
        ],
        "correct_option_index": 0,
        "explanation": "`CALCULATE()` performs Context Transition (converting row context to filter context) and modifies or overrides existing filter contexts using specified filter arguments."
      },
      {
        "id": "pbi_7",
        "question_number": 7,
        "topic": "Filter Context Removal",
        "question_text": "What is the output of the DAX expression `CALCULATE(SUM(Sales[Amount]), ALL(Sales))`?",
        "options": [
          "Returns the grand total sales across the entire dataset, ignoring any active slicers or visual filter contexts applied to the Sales table",
          "Returns zero for all rows",
          "Filters sales to only the current month",
          "Deletes the Sales table"
        ],
        "correct_option_index": 0,
        "explanation": "The `ALL()` function clears all filters on the specified table or columns, enabling calculation of grand totals and percentage-of-total baseline metrics."
      },
      {
        "id": "pbi_8",
        "question_number": 8,
        "topic": "Time Intelligence DAX",
        "question_text": "Which DAX function calculates year-to-date total sales based on a standardized contiguous Date dimension table?",
        "options": [
          "`TOTALYTD(SUM(Sales[Amount]), 'Date'[Date])`",
          "`SUM_YEAR_TO_DATE(Sales[Amount])`",
          "`YTD_CALC(Sales[Amount])`",
          "`YEAR_ACCUMULATE(Sales[Amount])`"
        ],
        "correct_option_index": 0,
        "explanation": "`TOTALYTD()` evaluates the specified measure expression over dates from the beginning of the current calendar/fiscal year up to the latest date in context."
      },
      {
        "id": "pbi_9",
        "question_number": 9,
        "topic": "Data Transformation (Unpivot)",
        "question_text": "When dealing with a wide spreadsheet where columns represent months (`Jan`, `Feb`, `Mar`), which Power Query transformation converts them into a proper analytical table?",
        "options": [
          "Unpivot Columns (transforming month columns into an 'Attribute' column and a 'Value' column)",
          "Transpose Table",
          "Group By Month",
          "Split Column by Delimiter"
        ],
        "correct_option_index": 0,
        "explanation": "Unpivoting wide attribute columns transforms matrix tables into normalized tabular rows (Attribute/Value pairs), which is essential for relational data modeling."
      },
      {
        "id": "pbi_10",
        "question_number": 10,
        "topic": "Row-Level Security (RLS)",
        "question_text": "How does Row-Level Security (RLS) restrict data access in Power BI reports shared across regional sales managers?",
        "options": [
          "By defining DAX filter rules on security Roles (e.g. `[Region] = USERPRINCIPALNAME()`), restricting visible data rows according to the logged-in user's identity",
          "By creating separate PBIX files for every employee manually",
          "By setting a password on each visual chart",
          "By hiding report pages with CSS"
        ],
        "correct_option_index": 0,
        "explanation": "RLS applies dynamic DAX filter expressions to table roles; when published to Power BI Service, users only see data rows permitted by their assigned role and email identity."
      },
      {
        "id": "pbi_11",
        "question_number": 11,
        "topic": "Interactive Features (Drill-Through)",
        "question_text": "What is the purpose of configuring a 'Drill-Through' page in a Power BI report?",
        "options": [
          "Allowing users to right-click a data point (e.g., a specific Customer) and navigate to a dedicated detail page pre-filtered for that exact entity context",
          "Downloading report raw data into Microsoft Word",
          "Animating charts with 3D effects",
          "Refreshing data every second"
        ],
        "correct_option_index": 0,
        "explanation": "Drill-through enables focused exploratory journeys: selecting an aggregated item on a summary page automatically filters and navigates to a dedicated detailed inspection page."
      },
      {
        "id": "pbi_12",
        "question_number": 12,
        "topic": "Scheduled Refresh & Gateways",
        "question_text": "What component is mandatory in Power BI Service to enable automated scheduled data refreshes from on-premises corporate SQL databases?",
        "options": [
          "On-Premises Data Gateway",
          "A USB cable connecting the server to the laptop",
          "A local browser extension",
          "Power BI Desktop running continuously in the background"
        ],
        "correct_option_index": 0,
        "explanation": "The On-Premises Data Gateway acts as a secure encrypted bridge facilitating real-time queries and scheduled data refreshes between cloud Power BI Service and on-prem data sources."
      },
      {
        "id": "pbi_13",
        "question_number": 13,
        "topic": "Performance Tuning",
        "question_text": "Which built-in tool in Power BI Desktop records and breaks down duration into DAX query time, Visual display time, and Other wait times?",
        "options": [
          "Performance Analyzer",
          "Task Manager",
          "Query Diagnostics (M only)",
          "Model Metrics Inspector"
        ],
        "correct_option_index": 0,
        "explanation": "The Performance Analyzer pane measures the precise millisecond rendering duration of every visual, pinpointing bottlenecks caused by complex DAX measures or data model relationships."
      },
      {
        "id": "pbi_14",
        "question_number": 14,
        "topic": "Relationship Cardinality",
        "question_text": "What issue can arise when creating Bi-directional (`Both`) cross-filter relationships across multiple tables in a complex data model?",
        "options": [
          "Ambiguous filter paths, unintended circular relationship propagation, and severe report rendering performance degradation",
          "The computer will delete the dataset",
          "Power BI Desktop will refuse to save files",
          "All numbers will automatically turn negative"
        ],
        "correct_option_index": 0,
        "explanation": "Bi-directional filters propagate filters in both directions, creating ambiguity when multiple paths exist between tables and significantly slowing down DAX evaluation."
      },
      {
        "id": "pbi_15",
        "question_number": 15,
        "topic": "Report Governance",
        "question_text": "In Power BI Service workspaces, which role allows users to view and interact with reports but prevents them from editing content, publishing datasets, or modifying permissions?",
        "options": [
          "Viewer",
          "Contributor",
          "Member",
          "Admin"
        ],
        "correct_option_index": 0,
        "explanation": "The `Viewer` role enforces strict read-only access to reports and dashboards within a workspace, respecting RLS while barring content modification or sharing changes."
      }
    ]
  },
  {
    "id": "data-engineering-big-data",
    "slug": "data-engineering-big-data",
    "title": "Data Engineering & Big Data",
    "category_id": "data-cloud",
    "category_name": "Data, Cloud & Security",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Data Engineering",
      "PySpark",
      "Kafka",
      "Airflow",
      "Big Data",
      "Data Warehousing"
    ],
    "description": "Benchmark your understanding of Big Data architectures, ETL/ELT pipelines, distributed computing with Apache Spark, event streaming with Kafka, and workflow orchestration with Airflow.",
    "questions": [
      {
        "id": "de_1",
        "question_number": 1,
        "topic": "Pipeline Paradigms",
        "question_text": "What is the primary difference between traditional ETL (Extract, Transform, Load) and modern ELT (Extract, Load, Transform)?",
        "options": [
          "In ELT, raw data is loaded directly into scalable cloud data warehouses (e.g. BigQuery/Snowflake) where transformations are executed leveraging cloud compute power, rather than transforming on an intermediate server before loading",
          "ETL is only used for images, while ELT is for text",
          "ELT does not perform any data transformations",
          "ETL requires cloud servers, while ELT runs on desktop PCs"
        ],
        "correct_option_index": 0,
        "explanation": "ELT decouples ingestion from transformation by loading raw data into scalable analytical warehouses first, using SQL/dbt for in-warehouse processing."
      },
      {
        "id": "de_2",
        "question_number": 2,
        "topic": "Processing Types",
        "question_text": "How does Batch Processing differ from Stream Processing in data engineering?",
        "options": [
          "Batch processes accumulated blocks of historical data at scheduled intervals; Stream processes continuous individual events or micro-batches with low latency in real-time",
          "Batch processing is for mobile phones; Stream processing is for mainframe computers",
          "Stream processing can only handle 10 records per day",
          "Batch processing never uses databases"
        ],
        "correct_option_index": 0,
        "explanation": "Batch processing handles high-volume bounded datasets on periodic schedules; Stream processing ingests and transforms unbounded data streams continuously in near real-time."
      },
      {
        "id": "de_3",
        "question_number": 3,
        "topic": "Architectures",
        "question_text": "What is the primary characteristic of a modern 'Data Lakehouse' architecture (e.g., Databricks Delta Lake, Apache Iceberg)?",
        "options": [
          "It combines the low-cost scalable object storage of a Data Lake with the ACID transactional guarantees, schema enforcement, and high-performance querying of a Data Warehouse",
          "It is a physical server submerged in water for cooling",
          "It stores data exclusively in Microsoft Word files",
          "It replaces all SQL databases with Excel"
        ],
        "correct_option_index": 0,
        "explanation": "Lakehouses use open file formats with transactional metadata layers (ACID, time travel, schema evolution) directly on top of cloud object storage (S3/GCS/ADLS)."
      },
      {
        "id": "de_4",
        "question_number": 4,
        "topic": "File Formats",
        "question_text": "Why is Apache Parquet universally adopted over CSV/JSON for Big Data analytics storage?",
        "options": [
          "Parquet is a binary columnar format that supports snappy compression, column projection pushdown (reading only requested columns), and dictionary encoding",
          "Parquet files can be opened in simple text editors",
          "Parquet files do not require disk space",
          "Parquet converts numbers into roman numerals"
        ],
        "correct_option_index": 0,
        "explanation": "Columnar storage allows analytics queries scanning 2 columns of a 100-column table to skip reading 98% of the data on disk, drastically reducing I/O and query runtimes."
      },
      {
        "id": "de_5",
        "question_number": 5,
        "topic": "Apache Spark Core",
        "question_text": "In the distributed Apache Spark architecture, what is the role of the 'Driver Program'?",
        "options": [
          "It orchestrates execution, creates the `SparkSession`, translates code into a Directed Acyclic Graph (DAG) of stages/tasks, and schedules tasks across worker Executors",
          "It manages physical computer hard drive spin rates",
          "It provides internet connectivity to cloud clusters",
          "It renders graphical UI windows on the user screen"
        ],
        "correct_option_index": 0,
        "explanation": "The Spark Driver maintains application state, builds execution plans (DAG), coordinates with the Cluster Manager (YARN/K8s), and assigns task units to worker executors."
      },
      {
        "id": "de_6",
        "question_number": 6,
        "topic": "Spark Transformations",
        "question_text": "What is the difference between Narrow and Wide Transformations in Apache Spark?",
        "options": [
          "Narrow transformations (e.g., `map`, `filter`) execute within a single partition without data movement; Wide transformations (e.g., `groupByKey`, `join`) require shuffling data across partitions over the network",
          "Narrow transformations work on strings, while wide transformations work on floats",
          "Wide transformations do not require RAM",
          "Narrow transformations execute only on the driver node"
        ],
        "correct_option_index": 0,
        "explanation": "Narrow operations compute child partitions from single parent partitions locally; Wide operations involve expensive cluster data shuffling to reorganize data across nodes."
      },
      {
        "id": "de_7",
        "question_number": 7,
        "topic": "Spark Join Optimization",
        "question_text": "How does a 'Broadcast Hash Join' optimize a join between a massive 100-million row DataFrame and a small 1,000-row dimension table in PySpark?",
        "options": [
          "By broadcasting a full copy of the small table to every worker executor node, completely eliminating network shuffling of the 100-million row dataset",
          "By deleting the smaller table",
          "By converting both tables into text files",
          "By running the query on a single CPU core"
        ],
        "correct_option_index": 0,
        "explanation": "Broadcast joins copy small lookup tables to executor memory across all worker nodes, allowing large partitions to join locally without expensive cluster-wide data shuffling."
      },
      {
        "id": "de_8",
        "question_number": 8,
        "topic": "Workflow Orchestration (Airflow)",
        "question_text": "In Apache Airflow, what is a Directed Acyclic Graph (DAG)?",
        "options": [
          "A Python script defining a collection of tasks organized with directional dependency relationships that cannot contain circular loops",
          "A relational database table in PostgreSQL",
          "A machine learning model for predicting server downtime",
          "A network router protocol"
        ],
        "correct_option_index": 0,
        "explanation": "Airflow DAGs model batch workflows as directed dependency graphs without cycles, ensuring upstream tasks complete successfully before downstream dependent tasks trigger."
      },
      {
        "id": "de_9",
        "question_number": 9,
        "topic": "Airflow Scheduling",
        "question_text": "What is the role of the Airflow 'Scheduler' daemon?",
        "options": [
          "Monitoring all DAGs and tasks, evaluating dependency prerequisites, and submitting task instances ready for execution to the executor queue",
          "Editing Python code automatically",
          "Deleting old log files every 10 seconds",
          "Sending marketing emails to website visitors"
        ],
        "correct_option_index": 0,
        "explanation": "The Scheduler continuously monitors DAG definitions, orchestrates interval runs, checks dependency statuses, and queues actionable tasks to workers (Celery/Kubernetes)."
      },
      {
        "id": "de_10",
        "question_number": 10,
        "topic": "Event Streaming (Kafka)",
        "question_text": "In Apache Kafka architecture, how do 'Partitions' within a Topic enable horizontal scalability and parallel consumption?",
        "options": [
          "Partitions distribute topic log messages across multiple broker nodes, allowing multiple consumer instances in a Consumer Group to read distinct partitions in parallel",
          "Partitions delete messages after 1 millisecond",
          "Partitions convert streaming data into static PDF files",
          "Partitions enforce synchronous single-threaded processing"
        ],
        "correct_option_index": 0,
        "explanation": "Topic partitions are the basic unit of parallelism in Kafka; messages within a partition are strictly ordered, and separate consumers in a group read independent partitions concurrently."
      },
      {
        "id": "de_11",
        "question_number": 11,
        "topic": "Kafka Offsets",
        "question_text": "What is a 'Consumer Offset' in Apache Kafka?",
        "options": [
          "A sequential integer ID committed by consumer groups to track the last successfully processed message position within a specific partition log",
          "The physical distance between two Kafka brokers in miles",
          "The cost of running a Kafka cluster per hour",
          "A cryptographic password hash"
        ],
        "correct_option_index": 0,
        "explanation": "Offsets indicate the read position of a consumer group within a partition, ensuring consumers resume processing accurately without message duplication after restarts or crashes."
      },
      {
        "id": "de_12",
        "question_number": 12,
        "topic": "Slowly Changing Dimensions (SCD)",
        "question_text": "How does a Slowly Changing Dimension Type 2 (SCD Type 2) track historical changes to customer attribute data in a data warehouse?",
        "options": [
          "By inserting a new row with a new surrogate key and tracking validity using `start_date`, `end_date`, and an `is_current` active flag, preserving full history",
          "By permanently overwriting the existing row (discarding all history)",
          "By deleting the customer account",
          "By creating a new database for every customer"
        ],
        "correct_option_index": 0,
        "explanation": "SCD Type 2 preserves complete audit history by adding a new version row with effective date ranges whenever an attribute (e.g. address or tier) changes."
      },
      {
        "id": "de_13",
        "question_number": 13,
        "topic": "Data Transformation (dbt)",
        "question_text": "What is the core philosophy of `dbt` (data build tool) in modern analytics engineering?",
        "options": [
          "Enabling data teams to write modular SQL `SELECT` transformations with built-in version control, automated testing, documentation, and lineage tracking inside the warehouse",
          "Writing low-level C++ drivers for graphics cards",
          "Replacing SQL with drag-and-drop spreadsheets",
          "Managing cloud server hardware cooling"
        ],
        "correct_option_index": 0,
        "explanation": "`dbt` brings software engineering best practices (modular SQL, DRY code via Jinja, automated schema/data assertions, automated docs) to data warehouse transformation workflows."
      },
      {
        "id": "de_14",
        "question_number": 14,
        "topic": "Cloud Data Warehouses",
        "question_text": "How does Google BigQuery's serverless architecture achieve ultra-fast query execution on petabyte-scale tables?",
        "options": [
          "By separating compute (Dremel execution engine with dynamic slot allocation) from storage (Colossus distributed file system) over a petabit Jupiter network",
          "By storing all data in the client's web browser RAM",
          "By running single-threaded CPU loops",
          "By converting SQL queries into JPEG images"
        ],
        "correct_option_index": 0,
        "explanation": "Decoupled storage and compute allows BigQuery to dynamically spin up thousands of worker slots across Google's infrastructure to scan multi-terabyte datasets in seconds."
      },
      {
        "id": "de_15",
        "question_number": 15,
        "topic": "Data Lineage & Governance",
        "question_text": "Why is 'Data Lineage' essential in enterprise data platform management?",
        "options": [
          "It visually maps the end-to-end lifecycle and transformation path of data from raw ingestion sources to final dashboards, aiding debugging, audit compliance, and impact analysis",
          "It reduces database subscription costs to zero",
          "It prevents developers from making code commits",
          "It translates SQL code into French"
        ],
        "correct_option_index": 0,
        "explanation": "Data lineage provides complete traceability of data flow across pipeline stages, ensuring regulatory compliance (GDPR/HIPAA) and enabling root-cause analysis when metrics drift."
      }
    ]
  },
  {
    "id": "cloud-computing-devops",
    "slug": "cloud-computing-devops",
    "title": "Cloud Computing & DevOps (AWS & Docker)",
    "category_id": "data-cloud",
    "category_name": "Data, Cloud & Security",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "AWS",
      "DevOps",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform"
    ],
    "description": "Assess your expertise in cloud infrastructure architectures on AWS, containerization with Docker, orchestration with Kubernetes, CI/CD pipelines, and Infrastructure as Code.",
    "questions": [
      {
        "id": "cd_1",
        "question_number": 1,
        "topic": "Cloud Service Models",
        "question_text": "What is the primary responsibility of a customer in an Infrastructure as a Service (IaaS) cloud model (e.g. AWS EC2)?",
        "options": [
          "Managing the operating system, runtime, networking configurations, security patches, and application software on top of the provider's virtualized hardware",
          "Managing physical datacenter building security and power generators",
          "Only managing text documents in an office suite",
          "Developing microchip hardware architectures"
        ],
        "correct_option_index": 0,
        "explanation": "In IaaS, the cloud provider manages physical hardware, virtualization, and datacenters; the customer owns and maintains the OS, middleware, runtime, data, and applications."
      },
      {
        "id": "cd_2",
        "question_number": 2,
        "topic": "Containers vs Virtual Machines",
        "question_text": "How does a Docker container achieve lightweight, rapid startup compared to a traditional Virtual Machine (VM)?",
        "options": [
          "Containers share the host operating system kernel and isolate user space using cgroups and namespaces, avoiding the overhead of running a full guest OS per instance",
          "Containers execute directly on motherboard BIOS chips",
          "Containers disable all network security",
          "Containers can only run Python scripts"
        ],
        "correct_option_index": 0,
        "explanation": "VMs emulate hardware and run independent guest OS kernels on a hypervisor; containers share the host Linux kernel, consuming fractions of the RAM and booting in milliseconds."
      },
      {
        "id": "cd_3",
        "question_number": 3,
        "topic": "AWS Compute & Storage",
        "question_text": "In AWS infrastructure, what is the core functional difference between Amazon S3 and Amazon EBS?",
        "options": [
          "S3 is a scalable, highly durable Object Store accessed via HTTP REST APIs; EBS is high-performance Block Storage attached directly as a virtual drive to an EC2 instance",
          "S3 is only for video streaming, while EBS is for email",
          "EBS data is accessible to the public internet without an EC2 instance",
          "S3 requires manual hard drive formatting"
        ],
        "correct_option_index": 0,
        "explanation": "S3 stores unstructured objects (files, backups) with 11 9's durability over HTTP; EBS provides low-latency block-level storage volumes attached directly to virtual servers."
      },
      {
        "id": "cd_4",
        "question_number": 4,
        "topic": "Identity & Access Management",
        "question_text": "In AWS IAM, what is the best security practice for granting permissions to an EC2 instance or Lambda function to access an S3 bucket?",
        "options": [
          "Attaching an IAM Role with a least-privilege policy to the resource, allowing AWS to manage temporary rotated credentials automatically",
          "Hardcoding root AWS Access Keys directly into the application source code",
          "Making the S3 bucket fully public to the entire internet",
          "Disabling all IAM policies"
        ],
        "correct_option_index": 0,
        "explanation": "IAM Roles issue short-lived temporary security credentials (via STS) to services automatically, eliminating hardcoded long-term credentials and adhering to least-privilege rules."
      },
      {
        "id": "cd_5",
        "question_number": 5,
        "topic": "Dockerfile Optimization",
        "question_text": "Why are 'Multi-Stage Builds' used in production Dockerfiles (e.g. building a Go or React application)?",
        "options": [
          "To compile dependencies in an initial build container and copy only the final compiled static binary/assets into a minimal production runtime image (e.g., Alpine/Scratch)",
          "To run 10 containers simultaneously on a single CPU core",
          "To upload Docker images to multiple cloud providers at once",
          "To avoid writing tests"
        ],
        "correct_option_index": 0,
        "explanation": "Multi-stage builds prevent SDKs, build tools, and source files from bloating the final container image, slashing image sizes from gigabytes to megabytes and reducing security surface."
      },
      {
        "id": "cd_6",
        "question_number": 6,
        "topic": "Docker Compose",
        "question_text": "What is the primary role of `docker-compose.yml` in development workflows?",
        "options": [
          "Defining, configuring, and launching multi-container Docker applications (e.g. frontend, backend, database, redis) with shared networks and volumes using a single command",
          "Compiling C++ code into machine assembly",
          "Managing billing subscriptions for cloud providers",
          "Formatting computer hard drives"
        ],
        "correct_option_index": 0,
        "explanation": "Docker Compose orchestrates multi-container applications locally, declaratively defining service dependencies, environment variables, networks, and volume mounts."
      },
      {
        "id": "cd_7",
        "question_number": 7,
        "topic": "Kubernetes Core Primitives",
        "question_text": "What is the smallest deployable compute object in Kubernetes?",
        "options": [
          "Pod (representing one or more tightly coupled containers sharing storage and network namespaces)",
          "Deployment",
          "Node",
          "Cluster"
        ],
        "correct_option_index": 0,
        "explanation": "A Pod encapsulates one or more containers, shared storage volumes, and a unique cluster IP address, acting as the fundamental scheduling building block in Kubernetes."
      },
      {
        "id": "cd_8",
        "question_number": 8,
        "topic": "Kubernetes Networking",
        "question_text": "How does a Kubernetes `Service` of type `ClusterIP` differ from `LoadBalancer`?",
        "options": [
          "`ClusterIP` exposes the service strictly on a cluster-internal IP address accessible only within the cluster, whereas `LoadBalancer` provisions an external cloud load balancer for public traffic",
          "`ClusterIP` only works on Google Cloud",
          "`LoadBalancer` disables container security",
          "`ClusterIP` is deprecated"
        ],
        "correct_option_index": 0,
        "explanation": "`ClusterIP` is the default internal-only service abstraction; `LoadBalancer` interfaces with cloud provider APIs (AWS/GCP/Azure) to route external public internet traffic into pods."
      },
      {
        "id": "cd_9",
        "question_number": 9,
        "topic": "CI/CD Pipeline Stages",
        "question_text": "What is the difference between Continuous Delivery and Continuous Deployment?",
        "options": [
          "Continuous Delivery automatically validates and stages code releases ready for manual one-click deployment approval; Continuous Deployment automatically deploys every passing commit directly to production",
          "Continuous Delivery is for mobile apps, while Continuous Deployment is for web",
          "Continuous Deployment requires zero automated tests",
          "Continuous Delivery only runs once a year"
        ],
        "correct_option_index": 0,
        "explanation": "In Continuous Delivery, human approval triggers production release; in Continuous Deployment, every passing commit that clears all automated test stages deploys to production automatically."
      },
      {
        "id": "cd_10",
        "question_number": 10,
        "topic": "AWS Networking (VPC)",
        "question_text": "In an AWS Virtual Private Cloud (VPC), how should production database servers (e.g., RDS PostgreSQL) be isolated for maximum security?",
        "options": [
          "Placing them in Private Subnets with no direct route to the Internet Gateway, accessible only via internal security groups from application servers in the private/public subnets",
          "Assigning them public IP addresses and opening port 5432 to `0.0.0.0/0`",
          "Connecting them directly to public Wi-Fi networks",
          "Disabling all VPC routing tables"
        ],
        "correct_option_index": 0,
        "explanation": "Databases must reside in private subnets with no public internet routing, secured by restrictive security group firewalls permitting ingress only from authorized backend tiers."
      },
      {
        "id": "cd_11",
        "question_number": 11,
        "topic": "Infrastructure as Code (Terraform)",
        "question_text": "What is the purpose of the Terraform state file (`terraform.tfstate`)?",
        "options": [
          "Tracking the real-world state of provisioned cloud infrastructure resources and mapping declarative configuration files to live cloud resource IDs",
          "Storing developer credit card billing details",
          "Backing up application database tables",
          "Encrypting source code repositories"
        ],
        "correct_option_index": 0,
        "explanation": "Terraform state acts as the single source of truth, mapping declarative HCL configuration resources to actual cloud provider resources and determining necessary create/update/destroy diffs."
      },
      {
        "id": "cd_12",
        "question_number": 12,
        "topic": "High Availability & Scaling",
        "question_text": "How does an AWS Auto Scaling Group (ASG) paired with an Application Load Balancer (ALB) ensure high availability during sudden traffic spikes?",
        "options": [
          "By dynamically launching additional EC2 instances across multiple Availability Zones based on CloudWatch metrics (e.g. CPU > 70%) and distributing incoming traffic evenly across healthy targets",
          "By rebooting the server whenever traffic increases",
          "By asking users to wait in a virtual queue for 1 hour",
          "By converting dynamic web pages into static images"
        ],
        "correct_option_index": 0,
        "explanation": "ASGs automatically scale instance capacity horizontally across availability zones based on demand metrics, while ALBs health-check targets and balance traffic seamlessly."
      },
      {
        "id": "cd_13",
        "question_number": 13,
        "topic": "Observability & Metrics",
        "question_text": "What role does Prometheus and Grafana play in modern DevOps infrastructure monitoring?",
        "options": [
          "Prometheus scrapes and stores time-series metric telemetry, while Grafana queries Prometheus to visualize system performance dashboards and trigger real-time alert thresholds",
          "Prometheus writes application code, and Grafana compiles it",
          "They replace the Linux operating system",
          "They provide antivirus scanning for developer laptops"
        ],
        "correct_option_index": 0,
        "explanation": "Prometheus acts as a pull-based time-series metrics collection and alerting engine; Grafana serves as the visualization and observability dashboard layer."
      },
      {
        "id": "cd_14",
        "question_number": 14,
        "topic": "Serverless Architecture",
        "question_text": "What is the operational execution model of AWS Lambda?",
        "options": [
          "Event-driven serverless compute: code executes in ephemeral containers on demand in response to triggers (e.g. S3 uploads, HTTP API Gateway requests) with automatic scaling and zero idle costs",
          "A virtual machine that runs continuously 24/7 at fixed hourly pricing",
          "A desktop software installation for Windows",
          "A physical hardware appliance shipped to customer offices"
        ],
        "correct_option_index": 0,
        "explanation": "Lambda runs code in milliseconds without server provisioning or management, scaling automatically to match incoming event volume and billing strictly per millisecond of compute used."
      },
      {
        "id": "cd_15",
        "question_number": 15,
        "topic": "Secrets Management",
        "question_text": "Why should production database credentials and API keys be fetched from services like AWS Secrets Manager or HashiCorp Vault rather than raw environment variables in git?",
        "options": [
          "They provide encrypted storage, access audit logging, and automated credential rotation without requiring application redeployments or risking accidental source code repository leaks",
          "They make databases run 10x faster",
          "They make source code public to everyone",
          "They replace the need for database passwords"
        ],
        "correct_option_index": 0,
        "explanation": "Dedicated secrets managers store credentials encrypted with KMS keys, enforce IAM access policies, log access audits, and enable automated zero-downtime password rotation."
      }
    ]
  },
  {
    "id": "cybersecurity-ethical-hacking",
    "slug": "cybersecurity-ethical-hacking",
    "title": "Cybersecurity & Ethical Hacking",
    "category_id": "data-cloud",
    "category_name": "Data, Cloud & Security",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Cybersecurity",
      "Ethical Hacking",
      "OWASP",
      "Network Security",
      "Cryptography",
      "SOC"
    ],
    "description": "Validate your security posture across the CIA Triad, cryptographic algorithms, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF), penetration testing tools, and SOC incident response.",
    "questions": [
      {
        "id": "cs_1",
        "question_number": 1,
        "topic": "Core Principles",
        "question_text": "What are the three pillars of the foundational 'CIA Triad' in information security?",
        "options": [
          "Confidentiality, Integrity, and Availability",
          "Control, Inspection, and Authorization",
          "Centralization, Identification, and Authentication",
          "Cloud, Internet, and Architecture"
        ],
        "correct_option_index": 0,
        "explanation": "The CIA triad defines the core goals of information security: Confidentiality (privacy), Integrity (accuracy/non-tampering), and Availability (authorized accessibility)."
      },
      {
        "id": "cs_2",
        "question_number": 2,
        "topic": "Encryption Fundamentals",
        "question_text": "What is the fundamental difference between Symmetric and Asymmetric Encryption?",
        "options": [
          "Symmetric encryption uses a single shared secret key for both encryption and decryption, whereas Asymmetric encryption uses a mathematically linked Public/Private key pair",
          "Symmetric encryption is only for passwords, while Asymmetric is for files",
          "Asymmetric encryption cannot be decrypted",
          "Symmetric encryption does not use math"
        ],
        "correct_option_index": 0,
        "explanation": "Symmetric algorithms (AES) share one secret key; Asymmetric algorithms (RSA/ECC) use a public key for encryption/signature verification and a private key for decryption/signing."
      },
      {
        "id": "cs_3",
        "question_number": 3,
        "topic": "Hashing vs Encryption",
        "question_text": "Why is a cryptographic Hash function (e.g., bcrypt, SHA-256 with salt) irreversible, making it ideal for password storage?",
        "options": [
          "Hashing is a one-way mathematical function that maps arbitrary inputs to fixed-size digest strings with no decryption key to reverse the output back to plaintext",
          "Hashing deletes the password from the server RAM",
          "Hashing compresses passwords into ZIP files",
          "Hashing requires biometric hardware"
        ],
        "correct_option_index": 0,
        "explanation": "Cryptographic hashes are one-way mathematical operations; salting adds random bits to prevent rainbow-table precomputation attacks."
      },
      {
        "id": "cs_4",
        "question_number": 4,
        "topic": "Multi-Factor Authentication",
        "question_text": "Which combination represents true Multi-Factor Authentication (MFA) across distinct authentication factor categories?",
        "options": [
          "A Password (Something you know) combined with an Authenticator App TOTP code (Something you have)",
          "Entering two different passwords stored in the user's memory",
          "Entering a username and an email address",
          "Typing a password with both hands"
        ],
        "correct_option_index": 0,
        "explanation": "MFA requires at least two independent factors: Knowledge (password/PIN), Possession (hardware key/phone app), or Inherence (biometrics/fingerprint)."
      },
      {
        "id": "cs_5",
        "question_number": 5,
        "topic": "Standard Network Ports",
        "question_text": "Which network transport port is standard for secure HTTPS encrypted web traffic?",
        "options": [
          "Port 443",
          "Port 80",
          "Port 22",
          "Port 21"
        ],
        "correct_option_index": 0,
        "explanation": "HTTPS runs over port 443 (utilizing TLS encryption), whereas unencrypted HTTP runs over port 80, SSH runs over 22, and FTP runs over 21."
      },
      {
        "id": "cs_6",
        "question_number": 6,
        "topic": "OWASP Top 10 (SQL Injection)",
        "question_text": "How does a SQL Injection (SQLi) vulnerability occur in web applications?",
        "options": [
          "Untrusted user input containing SQL command syntax is directly concatenated into a backend database query string without sanitization or parameterization",
          "The database server runs out of disk storage space",
          "A user types their username in lowercase letters",
          "The website uses an outdated CSS stylesheet"
        ],
        "correct_option_index": 0,
        "explanation": "SQLi occurs when malicious SQL statements are injected into entry fields and executed by the database engine due to missing input validation or unparameterized queries."
      },
      {
        "id": "cs_7",
        "question_number": 7,
        "topic": "OWASP Top 10 (XSS)",
        "question_text": "What is the mechanism of a Stored Cross-Site Scripting (XSS) attack?",
        "options": [
          "An attacker injects malicious JavaScript into a database (e.g. in a comment field), which is subsequently executed in the browsers of other victim users who view that page",
          "An attacker physically steals the web server hard drive",
          "An attacker crashes the DNS server",
          "An attacker reads CPU temperature logs"
        ],
        "correct_option_index": 0,
        "explanation": "Stored XSS embeds malicious payloads into persistent application storage; when unsuspecting users request the stored data, their browsers execute the attacker's script."
      },
      {
        "id": "cs_8",
        "question_number": 8,
        "topic": "OWASP Top 10 (CSRF)",
        "question_text": "How does a Cross-Site Request Forgery (CSRF) attack exploit user sessions?",
        "options": [
          "It tricks an authenticated victim's browser into executing unwanted HTTP state-changing requests (like money transfers) to a trusted site where the user is currently logged in",
          "It decrypts all SSL certificates on the internet",
          "It bypasses all hardware firewalls by brute-forcing MAC addresses",
          "It changes the client browser homepage"
        ],
        "correct_option_index": 0,
        "explanation": "CSRF exploits the browser's automatic inclusion of credentials (session cookies) on cross-site requests, mitigated by Anti-CSRF tokens and `SameSite` cookie policies."
      },
      {
        "id": "cs_9",
        "question_number": 9,
        "topic": "Social Engineering",
        "question_text": "What distinguishes a 'Spear Phishing' attack from generic mass phishing emails?",
        "options": [
          "Spear phishing is highly customized and targeted at a specific individual or organization using gathered intelligence, making the deception convincing",
          "Spear phishing only targets government satellites",
          "Spear phishing sends 10 million random emails per second",
          "Spear phishing is executed in person inside corporate offices"
        ],
        "correct_option_index": 0,
        "explanation": "Generic phishing broadcasts mass generic templates; Spear phishing customizes communications using specific personal details (names, colleagues, projects) to deceive high-value targets."
      },
      {
        "id": "cs_10",
        "question_number": 10,
        "topic": "Reconnaissance Tools",
        "question_text": "What is the primary operational utility of `Nmap` in network penetration testing?",
        "options": [
          "Network host discovery, active port scanning, and operating system / service version detection",
          "Brute-forcing Instagram passwords",
          "Writing exploit payloads in assembly language",
          "Encrypting hard drives for ransomware attacks"
        ],
        "correct_option_index": 0,
        "explanation": "Nmap (Network Mapper) scans IP ranges to identify active network hosts, open ports, running daemon services, and vulnerabilities during security assessments."
      },
      {
        "id": "cs_11",
        "question_number": 11,
        "topic": "DDoS Mitigation",
        "question_text": "What is the primary function of a Web Application Firewall (WAF) such as Cloudflare or AWS WAF?",
        "options": [
          "Inspecting Layer 7 HTTP/HTTPS traffic in real-time to detect and block malicious payloads (SQLi, XSS, bots, volumetric rate-limit violations) before reaching origin servers",
          "Formatting database storage disks",
          "Compiling backend code into native binaries",
          "Generating user passwords"
        ],
        "correct_option_index": 0,
        "explanation": "WAFs operate at the application layer (Layer 7), filtering malicious requests, bot networks, and volumetric traffic spikes according to security rule policies."
      },
      {
        "id": "cs_12",
        "question_number": 12,
        "topic": "Man-in-the-Middle (MitM)",
        "question_text": "How does the TLS/SSL Handshake prevent Man-in-the-Middle (MitM) eavesdropping between a browser and web server?",
        "options": [
          "By authenticating the server's identity using digital certificates signed by trusted Certificate Authorities (CAs) and negotiating symmetric session keys via asymmetric cryptography",
          "By disabling all network router caches",
          "By translating data into morse code",
          "By requiring users to reboot their computers before browsing"
        ],
        "correct_option_index": 0,
        "explanation": "TLS verifies domain certificates against trusted root CAs and performs key exchange (Diffie-Hellman/RSA) to establish an encrypted, tamper-proof session channel."
      },
      {
        "id": "cs_13",
        "question_number": 13,
        "topic": "SOC Operations (SIEM)",
        "question_text": "What is the primary role of a Security Information and Event Management (SIEM) system (e.g. Splunk, Microsoft Sentinel)?",
        "options": [
          "Aggregating, normalizing, and analyzing real-time security log telemetry across servers, firewalls, and endpoints to detect anomalous behavior and trigger alerts",
          "Deleting spam emails from employee inboxes",
          "Installing software updates on developer laptops",
          "Managing employee salary payments"
        ],
        "correct_option_index": 0,
        "explanation": "SIEM platforms ingest billions of event logs across enterprise infrastructure, correlating patterns to surface threat intelligence and accelerate incident response."
      },
      {
        "id": "cs_14",
        "question_number": 14,
        "topic": "Access Control Principles",
        "question_text": "What does the 'Principle of Least Privilege' (PoLP) dictate in cybersecurity architecture?",
        "options": [
          "Users, applications, and network services must be granted only the absolute minimum permissions and access rights necessary to perform their legitimate job functions",
          "All employees must have root administrator access",
          "Passwords must be shared among all team members",
          "Access permissions should never be revoked"
        ],
        "correct_option_index": 0,
        "explanation": "PoLP minimizes attack blast radius by restricting access rights strictly to what is necessary, preventing compromised low-level accounts from executing unauthorized lateral movements."
      },
      {
        "id": "cs_15",
        "question_number": 15,
        "topic": "Security Assessments",
        "question_text": "What is the difference between a Vulnerability Assessment and a Penetration Test?",
        "options": [
          "A Vulnerability Assessment scans and identifies potential known weaknesses; a Penetration Test actively attempts to exploit vulnerabilities to determine depth of access and real-world impact",
          "A Vulnerability Assessment is illegal, while Penetration Testing is legal",
          "Vulnerability Assessments are conducted exclusively by software robots",
          "Penetration Testing is only for mobile hardware"
        ],
        "correct_option_index": 0,
        "explanation": "Vulnerability assessments provide a broad automated catalog of security weaknesses; penetration tests simulate real-world adversarial attacks to exploit weaknesses and validate defense depth."
      }
    ]
  },
  {
    "id": "tableau-business-dashboards",
    "slug": "tableau-business-dashboards",
    "title": "Tableau & Business Dashboards",
    "category_id": "data-cloud",
    "category_name": "Data, Cloud & Security",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Tableau",
      "Data Visualization",
      "LOD Expressions",
      "Dashboards",
      "Business Analytics",
      "BI"
    ],
    "description": "Benchmark your Tableau data visualization and dashboard design skills, including Dimensions vs Measures, LOD expressions, table calculations, and interactive storytelling.",
    "questions": [
      {
        "id": "tab_1",
        "question_number": 1,
        "topic": "Data Fields in Tableau",
        "question_text": "In the Tableau data pane, what is the fundamental conceptual difference between Dimensions and Measures?",
        "options": [
          "Dimensions contain qualitative/categorical values used to segment and slice data; Measures contain quantitative numerical values that can be aggregated mathematically",
          "Dimensions are numbers, while Measures are text",
          "Dimensions can only be filtered once",
          "Measures cannot be displayed in charts"
        ],
        "correct_option_index": 0,
        "explanation": "Dimensions define the level of detail/grouping (e.g. Region, Category); Measures are quantitative numerical metrics (e.g. Sales, Profit) aggregated via `SUM`, `AVG`, etc."
      },
      {
        "id": "tab_2",
        "question_number": 2,
        "topic": "Pill Colors in Tableau",
        "question_text": "In Tableau's drag-and-drop interface, what do Blue pills and Green pills represent on the Columns/Rows shelves?",
        "options": [
          "Blue indicates a Discrete field (creates distinct headers/labels); Green indicates a Continuous field (creates continuous unbroken quantitative axes)",
          "Blue indicates text, Green indicates numbers",
          "Blue indicates a calculated field, Green indicates raw database columns",
          "Blue means valid data, Green means data with errors"
        ],
        "correct_option_index": 0,
        "explanation": "Blue vs Green represents Discrete vs Continuous behavior, not data types: Discrete fields slice headers into distinct buckets, while Continuous fields plot quantitative axes."
      },
      {
        "id": "tab_3",
        "question_number": 3,
        "topic": "Data Connections",
        "question_text": "What is the operational difference between a 'Live Connection' and a 'Tableau Data Extract (.hyper)'?",
        "options": [
          "A Live connection issues real-time queries directly to the underlying database; an Extract creates an optimized, compressed in-memory columnar snapshot saved locally",
          "Live connections cannot be refreshed",
          "Extracts delete the source database",
          "Live connections only work with Microsoft Excel"
        ],
        "correct_option_index": 0,
        "explanation": "Live connections query backend databases dynamically on each user click; Hyper Extracts load snapshots into memory for high-speed offline visualization and reduced database load."
      },
      {
        "id": "tab_4",
        "question_number": 4,
        "topic": "Data Modeling (Relationships)",
        "question_text": "What is the primary advantage of Tableau's modern 'Relationships' (the logical noodle layer) over traditional physical Joins?",
        "options": [
          "Relationships automatically aggregate data at the native level of detail of each table, preventing unintended row duplication and data inflation issues common with physical joins",
          "Relationships delete unmatched records permanently",
          "Relationships only support single-column tables",
          "Relationships convert databases into CSV files"
        ],
        "correct_option_index": 0,
        "explanation": "Tableau relationships adapt query contexts dynamically, joining tables only at the level of detail required by active worksheet visuals without duplicating measures."
      },
      {
        "id": "tab_5",
        "question_number": 5,
        "topic": "Chart Selection",
        "question_text": "Which Tableau chart type is ideal for displaying two distinct measures with different numerical scales (e.g., Sales in millions and Profit Margin as a percentage) on the same timeline?",
        "options": [
          "Dual-Axis Chart",
          "Pie Chart",
          "Tree Map",
          "Box Plot"
        ],
        "correct_option_index": 0,
        "explanation": "Dual-axis charts overlay two independent visual layers on a shared horizontal axis, configuring separate left and right vertical axes tailored to differing metric scales."
      },
      {
        "id": "tab_6",
        "question_number": 6,
        "topic": "Level of Detail (FIXED)",
        "question_text": "What does the Level of Detail expression `{ FIXED [Region] : SUM([Sales]) }` compute in Tableau?",
        "options": [
          "Computes the total sum of sales for each Region, completely independent of whatever other dimensions or filters are present in the worksheet view",
          "Computes sales only for the current year",
          "Deletes all sales data outside that region",
          "Multiplies regional sales by the number of customers"
        ],
        "correct_option_index": 0,
        "explanation": "`FIXED` LOD expressions calculate aggregations at the explicitly declared dimension level, bypassing worksheet dimensional granularity and standard dimension filters."
      },
      {
        "id": "tab_7",
        "question_number": 7,
        "topic": "Level of Detail (INCLUDE/EXCLUDE)",
        "question_text": "How does an `EXCLUDE` Level of Detail expression alter calculations in a Tableau visualization?",
        "options": [
          "It instructs the calculation to ignore a specific dimension that is physically present in the visualization view, calculating at a coarser level of detail",
          "It permanently hides the worksheet from the dashboard",
          "It excludes all negative numbers from the chart",
          "It prevents users from downloading data"
        ],
        "correct_option_index": 0,
        "explanation": "`EXCLUDE` omits specified visual dimensions from the calculation aggregation, which is useful for displaying percent-of-total or difference-from-overall benchmarks."
      },
      {
        "id": "tab_8",
        "question_number": 8,
        "topic": "Table Calculations",
        "question_text": "What is the defining characteristic of a 'Quick Table Calculation' (such as Running Total or Percent Difference) in Tableau?",
        "options": [
          "It is computed locally in Tableau memory using only the aggregated query results returned to the visual view, without issuing new queries to the underlying database",
          "It writes new columns directly into the SQL database",
          "It permanently sorts the database tables",
          "It requires writing Python scripts"
        ],
        "correct_option_index": 0,
        "explanation": "Table calculations operate purely on the data cache already present in the active visualization window, transforming values across rows or columns (e.g. running sums)."
      },
      {
        "id": "tab_9",
        "question_number": 9,
        "topic": "Parameters",
        "question_text": "What is a 'Parameter' in Tableau, and how does it enhance interactive dashboards?",
        "options": [
          "A dynamic workbook-level variable (e.g. Top N slider, currency switcher) that users can manipulate to dynamically control calculations, filters, and reference lines",
          "A physical setting on the server hardware",
          "An encrypted database password",
          "A type of chart visualization"
        ],
        "correct_option_index": 0,
        "explanation": "Parameters provide user-driven input controls that dynamically feed values into calculated fields, top-N filters, or reference lines across multiple independent worksheets."
      },
      {
        "id": "tab_10",
        "question_number": 10,
        "topic": "Dashboard Actions",
        "question_text": "What does a 'Filter Action' on a Tableau Dashboard accomplish when a user clicks on a map region?",
        "options": [
          "It automatically filters all other associated charts and tables on the dashboard to display data corresponding exclusively to the selected map region",
          "It downloads the map as an image file",
          "It deletes all other worksheets",
          "It reboots the server"
        ],
        "correct_option_index": 0,
        "explanation": "Filter actions enable interactive cross-filtering: selecting marks on a driver visualization passes field values to target sheets, updating contextual views instantly."
      },
      {
        "id": "tab_11",
        "question_number": 11,
        "topic": "Sets and Groups",
        "question_text": "In Tableau data analysis, what is a 'Set'?",
        "options": [
          "A custom field that partitions data into two binary cohorts ('In' the set vs 'Out' of the set) based on static selections or dynamic condition rules",
          "A collection of 100 worksheets",
          "A database connection password",
          "A font formatting preset"
        ],
        "correct_option_index": 0,
        "explanation": "Sets create binary dimensional classifications ('IN/OUT') based on manual conditions or dynamic criteria (e.g. Top 10 Customers by Revenue), enabling cohort comparisons."
      },
      {
        "id": "tab_12",
        "question_number": 12,
        "topic": "Visual Hierarchy & Layout",
        "question_text": "Why are Tiled dashboard containers generally preferred over Floating containers in production business reporting?",
        "options": [
          "Tiled layouts resize predictably across varying screen resolutions and mobile displays without overlapping or misaligning visual components",
          "Floating layouts cannot display charts",
          "Tiled containers consume 90% less disk space",
          "Floating layouts are prohibited in Tableau Server"
        ],
        "correct_option_index": 0,
        "explanation": "Tiled containers arrange visual objects in a structured, non-overlapping grid that adapts cleanly across different monitor resolutions and responsive device layouts."
      },
      {
        "id": "tab_13",
        "question_number": 13,
        "topic": "Performance Tuning",
        "question_text": "Which Tableau Desktop feature allows developers to diagnose slow dashboard rendering times by recording workbook events, query executions, and layout calculations?",
        "options": [
          "Performance Recorder",
          "Task Manager",
          "Data Source Validator",
          "Hyper Speed Optimizer"
        ],
        "correct_option_index": 0,
        "explanation": "The Performance Recorder profiles workbook operations, generating an interactive diagnostic breakdown of query compile times, extract queries, and visual layout draws."
      },
      {
        "id": "tab_14",
        "question_number": 14,
        "topic": "Context Filters",
        "question_text": "In Tableau's Order of Operations, what effect does promoting a standard dimension filter to a 'Context Filter' have?",
        "options": [
          "It forces the filter to execute before FIXED LOD expressions and Top-N filters are evaluated, creating a temporary subset table for subsequent calculations",
          "It deletes all rows that do not match the filter from the raw database",
          "It encrypts the filtered data",
          "It prevents users from changing the filter"
        ],
        "correct_option_index": 0,
        "explanation": "Context filters execute at the top of Tableau's order of operations pipeline, ensuring that subsequent Top-N and FIXED LOD calculations apply strictly to the filtered subset."
      },
      {
        "id": "tab_15",
        "question_number": 15,
        "topic": "Server Publishing & Governance",
        "question_text": "When publishing a dashboard to Tableau Server / Cloud, what feature enables automated, recurring background refreshes of embedded data extracts?",
        "options": [
          "Extract Refresh Schedules",
          "Manual email attachments",
          "Desktop live streaming",
          "Browser auto-refresh extensions"
        ],
        "correct_option_index": 0,
        "explanation": "Tableau Server schedules automated background tasks (via Backgrounder processes) to refresh extract data sources from origin databases on hourly/daily recurring cadences."
      }
    ]
  },
  {
    "id": "advanced-excel-business-modeling",
    "slug": "advanced-excel-business-modeling",
    "title": "Advanced Excel & Business Modeling",
    "category_id": "business-management",
    "category_name": "Business & Management",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Excel",
      "Financial Modeling",
      "Pivot Tables",
      "XLOOKUP",
      "Formulas",
      "Business Analysis"
    ],
    "description": "Evaluate your advanced spreadsheet proficiency, financial modeling formulas (NPV/IRR/PMT), dynamic array functions (XLOOKUP/FILTER), and executive dashboard construction.",
    "questions": [
      {
        "id": "ex_1",
        "question_number": 1,
        "topic": "Cell Referencing",
        "question_text": "In Microsoft Excel formulas, what is the effect of placing dollar signs in a cell reference like `$B$4`?",
        "options": [
          "It converts the number into US Dollars",
          "It creates an Absolute Reference that remains locked to cell B4 when the formula is copied or dragged across other cells",
          "It hides the cell from viewing",
          "It multiplies the cell value by 100"
        ],
        "correct_option_index": 1,
        "explanation": "Dollar signs lock the column (`$B`) and row (`$4`), creating an absolute reference that does not shift relative to formula movement."
      },
      {
        "id": "ex_2",
        "question_number": 2,
        "topic": "Modern Lookup Functions",
        "question_text": "What is the primary advantage of `XLOOKUP` over legacy `VLOOKUP` in modern Excel?",
        "options": [
          "`XLOOKUP` can look to the left, defaults to exact match without requiring `FALSE`, and handles horizontal and vertical searches without table column index numbers",
          "`XLOOKUP` only works on text files",
          "`XLOOKUP` deletes duplicate rows automatically",
          "`XLOOKUP` is an external paid plugin"
        ],
        "correct_option_index": 0,
        "explanation": "`XLOOKUP` replaces both `VLOOKUP` and `HLOOKUP`, searching in any direction, defaulting to exact matches, and eliminating column-index count errors."
      },
      {
        "id": "ex_3",
        "question_number": 3,
        "topic": "Two-Way Lookups",
        "question_text": "How does combining `INDEX` and `MATCH` perform a dynamic two-way matrix lookup in Excel?",
        "options": [
          "`INDEX` retrieves the cell value at a specified row and column coordinate, while two `MATCH` functions determine the exact row and column position indices dynamically",
          "`INDEX` multiplies numbers, while `MATCH` adds them",
          "It converts the table into a pie chart",
          "It deletes empty cells"
        ],
        "correct_option_index": 0,
        "explanation": "`INDEX(array, row_num, col_num)` paired with `MATCH()` dynamically locates the row coordinate and column coordinate of a target entity across a matrix table."
      },
      {
        "id": "ex_4",
        "question_number": 4,
        "topic": "Conditional Aggregation",
        "question_text": "Which Excel function calculates the total revenue from transactions where `Region = 'North'` AND `Sales > 50000`?",
        "options": [
          "`SUMIFS(Sales_Range, Region_Range, 'North', Sales_Range, '>50000')`",
          "`SUMIF_AND('North', '>50000')`",
          "`TOTAL_IF(Sales, Region = 'North')`",
          "`COUNTIFS('North', 50000)`"
        ],
        "correct_option_index": 0,
        "explanation": "`SUMIFS` sums cells meeting multiple simultaneous criteria, specifying the sum range first followed by criteria ranges and conditions."
      },
      {
        "id": "ex_5",
        "question_number": 5,
        "topic": "Logical Functions",
        "question_text": "What does the formula `=IFS(A1>=90, 'A', A1>=80, 'B', A1>=70, 'C', TRUE, 'D')` return when cell `A1` contains `84`?",
        "options": [
          "`'A'`",
          "`'B'`",
          "`'C'`",
          "`'D'`"
        ],
        "correct_option_index": 1,
        "explanation": "`IFS` evaluates conditions sequentially from left to right; since `84 >= 90` is false and `84 >= 80` is true, it immediately returns `'B'`."
      },
      {
        "id": "ex_6",
        "question_number": 6,
        "topic": "Text Transformation",
        "question_text": "Which modern dynamic Excel formula splits a comma-separated text string `'Laptop, Mouse, Keyboard'` in cell `A1` into separate columns?",
        "options": [
          "`=TEXTSPLIT(A1, ', ')`",
          "`=SPLIT_CELL(A1)`",
          "`=TRIM_TEXT(A1)`",
          "`=CONCAT_SPLIT(A1)`"
        ],
        "correct_option_index": 0,
        "explanation": "`TEXTSPLIT` splits text across columns or rows using specified delimiters, spilling the parsed values into adjacent cells."
      },
      {
        "id": "ex_7",
        "question_number": 7,
        "topic": "Dynamic Arrays (FILTER)",
        "question_text": "What is the purpose of the dynamic array formula `=FILTER(A2:C100, B2:B100 = 'Completed')` in Excel 365?",
        "options": [
          "It extracts and spills all matching rows from range `A2:C100` where column B equals 'Completed' into a dynamic result array",
          "It permanently deletes all non-completed rows from the workbook",
          "It converts text into uppercase",
          "It hides column B from the spreadsheet"
        ],
        "correct_option_index": 0,
        "explanation": "`FILTER` dynamically filters an array based on a boolean criteria array, automatically spilling matching records without manual macro copying."
      },
      {
        "id": "ex_8",
        "question_number": 8,
        "topic": "Pivot Tables",
        "question_text": "How do Pivot Tables summarize large transactional datasets in Excel?",
        "options": [
          "By dynamically aggregating, grouping, and cross-tabulating thousands of data rows into customizable summary tables with calculated fields and slicers",
          "By converting numbers into static PDF images",
          "By requiring users to write Python scripts for every calculation",
          "By deleting zero values from the sheet"
        ],
        "correct_option_index": 0,
        "explanation": "Pivot Tables provide drag-and-drop multidimensional data aggregation, allowing instant grouping by dates, categories, and custom calculated metrics."
      },
      {
        "id": "ex_9",
        "question_number": 9,
        "topic": "Interactive Slicers",
        "question_text": "What is the operational advantage of connecting a 'Slicer' to multiple Pivot Tables across an Excel dashboard?",
        "options": [
          "Clicking a button on the slicer filters all connected Pivot Tables and Pivot Charts simultaneously with a unified visual control",
          "It increases the Excel file size by 100MB",
          "It locks the spreadsheet with a password",
          "It forces the computer to restart"
        ],
        "correct_option_index": 0,
        "explanation": "Slicers provide visual filter buttons; configuring 'Report Connections' enables one slicer to filter multiple pivot tables and charts synchronously."
      },
      {
        "id": "ex_10",
        "question_number": 10,
        "topic": "Financial Modeling (NPV)",
        "question_text": "What does the `=NPV(discount_rate, value1, value2, ...)` function calculate in capital budgeting models?",
        "options": [
          "The Net Present Value of an investment's future cash inflows discounted at a specified rate to determine project profitability in today's currency value",
          "The total nominal interest paid on a credit card",
          "The percentage of employees promoted this year",
          "The physical depreciation rate of office desks"
        ],
        "correct_option_index": 0,
        "explanation": "`NPV` discounts a stream of future cash flows back to present value at the hurdle/discount rate, measuring whether an investment yields positive economic return."
      },
      {
        "id": "ex_11",
        "question_number": 11,
        "topic": "Financial Modeling (IRR)",
        "question_text": "In investment analysis, what does the Internal Rate of Return (`=IRR(values)`) represent?",
        "options": [
          "The annualized discount rate that makes the Net Present Value (NPV) of all project cash flows exactly equal to zero",
          "The inflation rate of the country",
          "The maximum tax rate applied to business revenue",
          "The interest rate charged by central banks"
        ],
        "correct_option_index": 0,
        "explanation": "IRR is the breakeven discount rate where total discounted future inflows equal the initial cash outlay; projects with IRR exceeding the cost of capital are viable."
      },
      {
        "id": "ex_12",
        "question_number": 12,
        "topic": "What-If Analysis (Goal Seek)",
        "question_text": "When is Excel's 'Goal Seek' tool utilized in financial planning?",
        "options": [
          "When you know the desired output result of a formula (e.g., Net Profit = $1,000,000) and want Excel to determine the required single input variable value (e.g., Units Sold)",
          "When you want to create a new chart",
          "When formatting fonts and colors",
          "When exporting files to Google Drive"
        ],
        "correct_option_index": 0,
        "explanation": "Goal Seek uses iterative backward calculation to find the exact input value required to achieve a target formula outcome."
      },
      {
        "id": "ex_13",
        "question_number": 13,
        "topic": "Data Validation",
        "question_text": "How does Excel's 'Data Validation' feature improve data integrity in corporate reporting templates?",
        "options": [
          "By restricting user cell inputs strictly to predefined dropdown lists, numeric ranges, or date constraints, preventing invalid data entry",
          "By verifying user identities using fingerprint scanners",
          "By encrypting the operating system",
          "By automatically translating text into French"
        ],
        "correct_option_index": 0,
        "explanation": "Data validation enforces input rules (such as restricted dropdown selections or positive numerical bounds), preventing data entry corruption in operational spreadsheets."
      },
      {
        "id": "ex_14",
        "question_number": 14,
        "topic": "Power Query in Excel",
        "question_text": "Why is Power Query in Excel preferred over manual copy-pasting for monthly recurring financial reports?",
        "options": [
          "It automates repetitive ETL steps (cleaning headers, unpivoting, merging files) so monthly reports refresh with a single click as new raw data is added",
          "It replaces the computer hard drive",
          "It eliminates all spreadsheet formulas",
          "It converts Excel into an HTML web server"
        ],
        "correct_option_index": 0,
        "explanation": "Power Query records data cleaning and shaping transformation recipes, allowing users to refresh incoming monthly data files seamlessly with zero manual rework."
      },
      {
        "id": "ex_15",
        "question_number": 15,
        "topic": "Three-Statement Modeling",
        "question_text": "How are the Income Statement, Balance Sheet, and Cash Flow Statement dynamically linked in an integrated financial model?",
        "options": [
          "Net Income from the Income Statement flows into the Cash Flow Statement and Retained Earnings on the Balance Sheet; the ending Cash on the Cash Flow Statement balances the Balance Sheet cash line",
          "They are three completely independent tables that never share any numbers",
          "All numbers are manually typed by the auditor",
          "The Balance Sheet is calculated by multiplying the Income Statement by 2"
        ],
        "correct_option_index": 0,
        "explanation": "Net income connects the P&L to Cash Flow and Equity; working capital changes reconcile operating cash, and the final calculated cash balance directly completes the Balance Sheet equation."
      }
    ]
  },
  {
    "id": "business-data-analytics",
    "slug": "business-data-analytics",
    "title": "Business Data Analytics",
    "category_id": "business-management",
    "category_name": "Business & Management",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Business Analytics",
      "A/B Testing",
      "Cohort Analysis",
      "RFM",
      "KPIs",
      "Decision Making"
    ],
    "description": "Benchmark your analytical decision-making skills across descriptive/predictive analytics, A/B testing statistical significance, customer cohort retention, and executive KPI modeling.",
    "questions": [
      {
        "id": "ba_1",
        "question_number": 1,
        "topic": "Analytics Taxonomy",
        "question_text": "What is the primary objective of 'Diagnostic Analytics' compared to 'Descriptive Analytics'?",
        "options": [
          "Descriptive explains 'What happened?'; Diagnostic analyzes data patterns and root causes to answer 'Why did it happen?'",
          "Descriptive predicts future stock prices; Diagnostic deletes old data",
          "Diagnostic analytics is only used in medical hospitals",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "Descriptive analytics summarizes historical metrics; Diagnostic analytics performs drill-down and anomaly isolation to uncover the underlying causes of observed performance."
      },
      {
        "id": "ba_2",
        "question_number": 2,
        "topic": "Central Tendency",
        "question_text": "When analyzing highly skewed data (e.g. employee annual salaries or residential house prices with extreme outliers), which metric of central tendency is most reliable?",
        "options": [
          "Arithmetic Mean",
          "Median (the middle value)",
          "Mode",
          "Mid-Range"
        ],
        "correct_option_index": 1,
        "explanation": "The median represents the 50th percentile and is robust to extreme statistical outliers that distort the arithmetic mean in skewed distributions."
      },
      {
        "id": "ba_3",
        "question_number": 3,
        "topic": "Correlation vs Causation",
        "question_text": "Why does a strong statistical correlation between ice cream sales and shark attacks not imply causation?",
        "options": [
          "Both variables are driven by a confounding lurking variable (warm summer weather increases both ice cream consumption and beach swimming)",
          "Correlation metrics are always calculated incorrectly",
          "Sharks do not eat ice cream",
          "Causation cannot be measured in business"
        ],
        "correct_option_index": 0,
        "explanation": "Correlation indicates simultaneous association; confounding variables often drive joint fluctuations without any direct causal link between the observed variables."
      },
      {
        "id": "ba_4",
        "question_number": 4,
        "topic": "Hypothesis Testing ($p$-value)",
        "question_text": "In a business experiment, what does a $p$-value of 0.03 indicate when testing at a 5% (0.05) significance level?",
        "options": [
          "The result is statistically significant, allowing us to reject the Null Hypothesis ($H_0$) and conclude the observed effect is unlikely due to random chance",
          "The experiment failed and must be canceled",
          "There is a 3% chance the company will go bankrupt",
          "The sample size was too small"
        ],
        "correct_option_index": 0,
        "explanation": "A $p$-value $< 0.05$ indicates that the probability of observing such data under the Null Hypothesis is below the significance threshold, justifying rejection of $H_0$."
      },
      {
        "id": "ba_5",
        "question_number": 5,
        "topic": "A/B Testing Framework",
        "question_text": "In an A/B test of an e-commerce checkout page, what is the role of the 'Control Group'?",
        "options": [
          "The group of users exposed to the existing, unmodified checkout experience to serve as a baseline for comparing the new 'Treatment' variant",
          "The group of users who are prevented from making purchases",
          "The software engineers monitoring the server",
          "The customer support team"
        ],
        "correct_option_index": 0,
        "explanation": "The Control group establishes the baseline performance benchmark against which the experimental Treatment group's conversion rate lift is measured."
      },
      {
        "id": "ba_6",
        "question_number": 6,
        "topic": "Customer Segmentation (RFM)",
        "question_text": "What three dimensions are evaluated in an RFM customer segmentation model?",
        "options": [
          "Recency (how recently they purchased), Frequency (how often they buy), and Monetary Value (total spend)",
          "Reach, Feedback, and Marketing",
          "Revenue, Forecast, and Management",
          "Retention, Functionality, and Margin"
        ],
        "correct_option_index": 0,
        "explanation": "RFM segmentation scores customers on Recency, Frequency, and Monetary value to identify Champions, Loyal Customers, At-Risk accounts, and Churned buyers."
      },
      {
        "id": "ba_7",
        "question_number": 7,
        "topic": "Cohort Analysis",
        "question_text": "How does a 'Cohort Analysis' measure customer retention over time?",
        "options": [
          "By grouping customers by a shared acquisition event (e.g. signup month) and tracking their ongoing activity/retention percentages across subsequent monthly intervals",
          "By adding all sales numbers together into a single total",
          "By sending promotional emails to customers on their birthdays",
          "By surveying employees about company culture"
        ],
        "correct_option_index": 0,
        "explanation": "Cohort tables track engagement decay over time for groups sharing a common start date, isolating whether product updates improve retention for newer cohorts."
      },
      {
        "id": "ba_8",
        "question_number": 8,
        "topic": "Core Business KPIs",
        "question_text": "How is Customer Churn Rate calculated over a monthly period?",
        "options": [
          "$\\text{Churn Rate} = \\frac{\\text{Customers Lost During Month}}{\\text{Total Customers at Start of Month}} \\times 100\\%$",
          "$\\text{Churn Rate} = \\text{Total Revenue} \\div 12$",
          "$\\text{Churn Rate} = \\text{New Customers} - \\text{Old Customers}$",
          "$\\text{Churn Rate} = \\text{Website Traffic} \\div \\text{Ad Spend}$"
        ],
        "correct_option_index": 0,
        "explanation": "Monthly churn percentage divides the count of canceling customers by the starting customer base, measuring customer attrition rate."
      },
      {
        "id": "ba_9",
        "question_number": 9,
        "topic": "Pareto Analysis (80/20 Rule)",
        "question_text": "How does the Pareto Principle apply to inventory and revenue management in business analytics?",
        "options": [
          "Roughly 80% of total company revenue is typically generated by approximately 20% of the customer base or top-selling product lines",
          "80% of employees do 20% of the work",
          "20% of inventory items cost zero dollars",
          "Revenue increases by 80% every 20 days"
        ],
        "correct_option_index": 0,
        "explanation": "Pareto analysis identifies high-leverage concentration: prioritizing the vital 20% of accounts or SKUs that drive 80% of overall business results."
      },
      {
        "id": "ba_10",
        "question_number": 10,
        "topic": "Price Elasticity of Demand",
        "question_text": "If a 10% increase in product price results in a 25% decrease in unit sales, how is the price elasticity characterized?",
        "options": [
          "Price Elastic ($|E| = 2.5 > 1$), meaning demand is highly sensitive to price changes and total revenue will decrease",
          "Price Inelastic ($|E| < 1$)",
          "Unitary Elastic",
          "Perfectly Inelastic"
        ],
        "correct_option_index": 0,
        "explanation": "Elasticity equals $% \\Delta Q / \\% \\Delta P = -25\\% / +10\\% = -2.5$. When absolute elasticity exceeds 1, price hikes lead to larger percentage drops in volume, reducing revenue."
      },
      {
        "id": "ba_11",
        "question_number": 11,
        "topic": "Sales Funnel Leaks",
        "question_text": "If an online retail funnel has 10,000 Product Page Views $\\rightarrow$ 2,000 Add to Cart $\\rightarrow$ 400 Initiate Checkout $\\rightarrow$ 360 Completed Purchases, where is the largest percentage drop-off occurring?",
        "options": [
          "Product Page Views to Add to Cart (80% drop-off)",
          "Add to Cart to Initiate Checkout (80% drop-off)",
          "Initiate Checkout to Completed Purchases (10% drop-off)",
          "Both Product $\\rightarrow$ Cart and Cart $\\rightarrow$ Checkout exhibit an identical 80% drop-off rate"
        ],
        "correct_option_index": 3,
        "explanation": "Both $10,000 \\rightarrow 2,000$ (loss of 8,000 / 80%) and $2,000 \\rightarrow 400$ (loss of 1,600 / 80%) represent the most severe drop-off stages in this funnel."
      },
      {
        "id": "ba_12",
        "question_number": 12,
        "topic": "Visual Storytelling",
        "question_text": "Which chart type is specifically designed to illustrate how positive and negative incremental values (e.g., revenues, discounts, COGS, taxes) bridge a starting gross revenue to final net profit?",
        "options": [
          "Waterfall Chart",
          "Pie Chart",
          "Radar Chart",
          "Scatter Plot"
        ],
        "correct_option_index": 0,
        "explanation": "Waterfall charts show running cumulative additions and deductions, visualizing how intermediate gains and costs bridge initial revenue to final net margin."
      },
      {
        "id": "ba_13",
        "question_number": 13,
        "topic": "Data Anomaly Detection",
        "question_text": "Why should business analysts inspect box plots or Z-score distributions before calculating average customer order values?",
        "options": [
          "A single rogue order of $10,000,000 (e.g. testing error or wholesale bulk order) can heavily distort the calculated arithmetic mean for standard retail customers",
          "Box plots delete database errors automatically",
          "Z-scores convert numbers into percentages",
          "Data anomalies cannot be detected with SQL"
        ],
        "correct_option_index": 0,
        "explanation": "Anomalous outliers skew averages; detecting and treating them (segmenting wholesale vs retail) prevents misleading business conclusions."
      },
      {
        "id": "ba_14",
        "question_number": 14,
        "topic": "Customer Lifetime Value (LTV)",
        "question_text": "In a subscription SaaS business with Average Monthly Revenue per User (ARPU) of $50 and a monthly churn rate of 5%, what is the estimated customer Lifetime Value (LTV)?",
        "options": [
          "$1,000",
          "$500",
          "$250",
          "$50"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Average Customer Lifespan} = 1 / \\text{Churn} = 1 / 0.05 = 20 \\text{ months}$. $\\text{LTV} = \\text{ARPU} \\times \\text{Lifespan} = \\$50 \\times 20 = \\$1,000$."
      },
      {
        "id": "ba_15",
        "question_number": 15,
        "topic": "Executive Analytics Reporting",
        "question_text": "What is the primary responsibility of a senior business analyst when presenting analytical findings to C-suite executives?",
        "options": [
          "Translating complex technical data into concise, strategic, actionable business recommendations that directly address revenue, cost, or risk drivers",
          "Reading raw SQL query syntax line-by-line",
          "Displaying 100 complex charts on a single slide",
          "Apologizing for using mathematics"
        ],
        "correct_option_index": 0,
        "explanation": "Executive reporting synthesizes data findings into executive summaries, quantifying business impact and outlining clear strategic action steps."
      }
    ]
  },
  {
    "id": "product-management-fundamentals",
    "slug": "product-management-fundamentals",
    "title": "Product Management Fundamentals",
    "category_id": "business-management",
    "category_name": "Business & Management",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Product Management",
      "Agile",
      "Scrum",
      "PRD",
      "User Stories",
      "Product Strategy"
    ],
    "description": "Assess your product leadership capability across user discovery, Product Requirement Documents (PRDs), Agile/Scrum execution, feature prioritization frameworks, and core product metrics.",
    "questions": [
      {
        "id": "pm_1",
        "question_number": 1,
        "topic": "Role Definition",
        "question_text": "At the intersection of which three core organizational pillars does a Product Manager primarily operate?",
        "options": [
          "Business (Strategy/ROI), Technology (Feasibility), and User Experience (Desirability)",
          "Accounting, Legal, and Facilities Management",
          "Human Resources, Hardware Assembly, and Janitorial",
          "Graphic Design, Copywriting, and Video Editing"
        ],
        "correct_option_index": 0,
        "explanation": "Product Managers bridge Business viability, Technology feasibility, and Customer/UX desirability to guide products to market success."
      },
      {
        "id": "pm_2",
        "question_number": 2,
        "topic": "Product Lifecycle",
        "question_text": "What are the four recognized sequential stages of the classic Product Life Cycle (PLC)?",
        "options": [
          "Introduction $\\rightarrow$ Growth $\\rightarrow$ Maturity $\\rightarrow$ Decline",
          "Ideation $\\rightarrow$ Coding $\\rightarrow$ Testing $\\rightarrow$ Deletion",
          "Design $\\rightarrow$ Marketing $\\rightarrow$ Billing $\\rightarrow$ Audit",
          "Hiring $\\rightarrow$ Budgeting $\\rightarrow$ Prototyping $\\rightarrow$ Exit"
        ],
        "correct_option_index": 0,
        "explanation": "Products navigate four distinct lifecycle phases, shifting strategic focus from customer acquisition (Introduction/Growth) to retention and efficiency (Maturity/Decline)."
      },
      {
        "id": "pm_3",
        "question_number": 3,
        "topic": "Agile & Scrum Roles",
        "question_text": "In standard Scrum methodology, who is primarily responsible for maximizing product value and managing the prioritized Product Backlog?",
        "options": [
          "Product Owner (PO)",
          "Scrum Master",
          "Lead Quality Assurance Engineer",
          "Chief Executive Officer"
        ],
        "correct_option_index": 0,
        "explanation": "The Product Owner represents customer/business interests, owning, ordering, and refining user stories in the Product Backlog for engineering sprints."
      },
      {
        "id": "pm_4",
        "question_number": 4,
        "topic": "User Story Format",
        "question_text": "What is the industry-standard structure for writing an agile User Story?",
        "options": [
          "'As a [type of user], I want [an action/goal] so that [a specific benefit/outcome]'",
          "'Please build this button in blue by Friday'",
          "'The database should run SQL queries faster'",
          "'Dear developer, kindly fix all bugs'"
        ],
        "correct_option_index": 0,
        "explanation": "The standard User Story template clearly establishes the target persona, the desired capability, and the underlying customer value driving the request."
      },
      {
        "id": "pm_5",
        "question_number": 5,
        "topic": "Acceptance Criteria",
        "question_text": "Why are Acceptance Criteria (often written in Given-When-Then BDD format) essential in a user story?",
        "options": [
          "They define the explicit, testable conditions and boundaries that a feature must satisfy to be considered complete and ready for release",
          "They determine the developer's hourly wage",
          "They replace the need for user interface design",
          "They convert agile teams into waterfall teams"
        ],
        "correct_option_index": 0,
        "explanation": "Acceptance criteria establish clear pass/fail definitions for developers and QA testers, removing ambiguity about what constitutes feature completion."
      },
      {
        "id": "pm_6",
        "question_number": 6,
        "topic": "Prioritization Frameworks (RICE)",
        "question_text": "How is the priority score calculated in the RICE Prioritization Framework?",
        "options": [
          "$\\text{Score} = \\frac{\\text{Reach} \\times \\text{Impact} \\times \\text{Confidence}}{\\text{Effort}}$",
          "$\\text{Score} = \\text{Revenue} + \\text{Cost}$",
          "$\\text{Score} = \\text{Reach} \\div \\text{Risk}$",
          "$\\text{Score} = \\text{Time} \\times \\text{Hourly Rate}$"
        ],
        "correct_option_index": 0,
        "explanation": "RICE scores candidate features by multiplying expected Reach, Impact, and Confidence, divided by estimated Engineering Effort (person-weeks)."
      },
      {
        "id": "pm_7",
        "question_number": 7,
        "topic": "MoSCoW Method",
        "question_text": "What do the four categories of the MoSCoW prioritization framework represent?",
        "options": [
          "Must have, Should have, Could have, and Won't have (this time)",
          "Marketing, Operations, Sales, Customers, Work",
          "Mobile, Software, Cloud, Open-source, Web",
          "Money, Output, Scale, Capital, Ownership"
        ],
        "correct_option_index": 0,
        "explanation": "MoSCoW categorizes backlog scope into non-negotiable requirements (Must), high-value additions (Should), nice-to-haves (Could), and out-of-scope items (Won't)."
      },
      {
        "id": "pm_8",
        "question_number": 8,
        "topic": "Minimum Viable Product",
        "question_text": "What is the primary purpose of building a Minimum Viable Product (MVP)?",
        "options": [
          "To launch the smallest functional version of a product that allows the team to validate core problem-solution hypotheses and collect validated customer learning with minimal effort",
          "To release a buggy, half-finished application and charge full price",
          "To fire half the engineering team",
          "To avoid doing market research"
        ],
        "correct_option_index": 0,
        "explanation": "An MVP tests core value propositions in the market with minimum investment, accelerating learning cycles and preventing building unwanted features."
      },
      {
        "id": "pm_9",
        "question_number": 9,
        "topic": "Product Requirements Document",
        "question_text": "What is the core purpose of a Product Requirements Document (PRD)?",
        "options": [
          "To communicate the product's purpose, target personas, user journeys, functional specs, success metrics, and release criteria to engineering and stakeholders",
          "To track employee daily attendance",
          "To serve as a legal tax filing document",
          "To write the CSS styling code"
        ],
        "correct_option_index": 0,
        "explanation": "A PRD serves as the guiding technical and business artifact aligning designers, developers, QA, and leadership on what is being built and why."
      },
      {
        "id": "pm_10",
        "question_number": 10,
        "topic": "North Star Metric",
        "question_text": "What constitutes a company's 'North Star Metric' in product management?",
        "options": [
          "A single key metric that best captures the core value delivered to customers and directly drives sustainable long-term business growth",
          "The total number of lines of code written by engineers",
          "The font size used on the company homepage",
          "The number of meetings held per week"
        ],
        "correct_option_index": 0,
        "explanation": "A North Star Metric aligns the entire company around delivering real customer value (e.g., Spotify: 'Time spent listening to music'; Airbnb: 'Nights booked')."
      },
      {
        "id": "pm_11",
        "question_number": 11,
        "topic": "AARRR Pirate Metrics",
        "question_text": "What are the 5 stages of Dave McClure's AARRR (Pirate Metrics) growth framework?",
        "options": [
          "Acquisition, Activation, Retention, Referral, and Revenue",
          "Auditing, Accounting, Reporting, Review, and Registration",
          "Advertising, Analytics, Redesign, ROI, and Restructure",
          "Authentication, Authorization, Routing, Rendering, and Release"
        ],
        "correct_option_index": 0,
        "explanation": "AARRR tracks customer lifecycle progression from discovery (Acquisition) and first value (Activation) to ongoing usage (Retention), advocacy (Referral), and monetization (Revenue)."
      },
      {
        "id": "pm_12",
        "question_number": 12,
        "topic": "User Discovery",
        "question_text": "What is the 'Mom Test' principle when conducting customer discovery interviews for a new product idea?",
        "options": [
          "Never ask people if your idea is good; instead, ask about their past specific behaviors, active pain points, and current solutions to uncover unbiased truth",
          "Ask your mother to invest in the company",
          "Only interview female users over the age of 50",
          "Pitch your product features enthusiastically for 45 minutes"
        ],
        "correct_option_index": 0,
        "explanation": "The Mom Test advocates asking about concrete past actions and active problems rather than asking hypothetical opinions, which people politely falsify."
      },
      {
        "id": "pm_13",
        "question_number": 13,
        "topic": "Product Roadmaps",
        "question_text": "Why are 'Outcome-Based / Theme-Based Roadmaps' (e.g. Now-Next-Later) increasingly preferred over static date-driven feature Gantt charts?",
        "options": [
          "They focus on solving customer problems and achieving measurable business goals while providing flexibility in technical execution, rather than committing to rigid feature dates",
          "They eliminate the need to do any engineering work",
          "They hide release plans from competitors",
          "They are easier to print on paper"
        ],
        "correct_option_index": 0,
        "explanation": "Outcome roadmaps align teams around strategic objectives and value milestones rather than locking teams into brittle feature-timeline commitments that ignore emerging insights."
      },
      {
        "id": "pm_14",
        "question_number": 14,
        "topic": "Growth Strategies",
        "question_text": "What defines a Product-Led Growth (PLG) go-to-market model (e.g. Slack, Figma, Dropbox)?",
        "options": [
          "The product itself drives customer acquisition, retention, and expansion through self-serve onboarding, freemium tiers, and viral loops, reducing reliance on heavy outbound sales",
          "Selling enterprise hardware through door-to-door salesmen",
          "Advertising exclusively on television commercials",
          "Banning free trials"
        ],
        "correct_option_index": 0,
        "explanation": "PLG uses the product as the primary vehicle for user onboarding, engagement, and conversion, allowing end-users to experience immediate value before purchasing."
      },
      {
        "id": "pm_15",
        "question_number": 15,
        "topic": "Managing Scope Creep",
        "question_text": "How should a Product Manager handle a major stakeholder requesting a new feature in the middle of an active development sprint?",
        "options": [
          "Assess the request's impact against sprint goals, log and prioritize it in the Product Backlog for future sprint planning, rather than disrupting the active committed sprint",
          "Immediately stop the sprint and force developers to work all night",
          "Delete the entire project repository",
          "Ignore the stakeholder and block their email address"
        ],
        "correct_option_index": 0,
        "explanation": "Scrum protects sprint focus; new ideas are evaluated against overall strategic priorities and groomed in the backlog for subsequent sprint planning cycles."
      }
    ]
  },
  {
    "id": "hr-analytics-talent-management",
    "slug": "hr-analytics-talent-management",
    "title": "HR Analytics & Talent Management",
    "category_id": "business-management",
    "category_name": "Business & Management",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "HR Analytics",
      "Talent Management",
      "eNPS",
      "Attrition",
      "Workforce Planning",
      "People Operations"
    ],
    "description": "Validate your HR analytics capability across turnover/attrition metrics, recruitment funnel analytics, eNPS engagement measurements, 9-box grids, and workforce capacity planning.",
    "questions": [
      {
        "id": "hr_1",
        "question_number": 1,
        "topic": "HR Analytics Maturity",
        "question_text": "What is the primary difference between operational HR reporting and predictive HR analytics?",
        "options": [
          "Operational reporting tracks historical headcount and attendance; predictive analytics uses statistical modeling to forecast future attrition risk and talent demand",
          "Operational reporting is for computers; predictive analytics is for paper forms",
          "Predictive analytics only tracks employee payroll",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "Operational reporting catalogs past transactional events; predictive analytics leverages regression and machine learning to forecast workforce trends and flight risks."
      },
      {
        "id": "hr_2",
        "question_number": 2,
        "topic": "Attrition Calculation",
        "question_text": "If a company starts the year with 1,000 employees, ends with 1,100, and experiences 105 employee departures throughout the year, what is the annual Turnover Rate?",
        "options": [
          "$10.0\\%$",
          "$10.5\\%$",
          "$9.5\\%$",
          "$15.0\\%$"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Average Headcount} = (1,000 + 1,100) / 2 = 1,050$. $\\text{Turnover Rate} = (105 / 1,050) \\times 100\\% = 10.0\\%$."
      },
      {
        "id": "hr_3",
        "question_number": 3,
        "topic": "Recruitment Metrics",
        "question_text": "How is the 'Cost per Hire' recruitment metric calculated?",
        "options": [
          "$\\text{Cost per Hire} = \\frac{\\text{Total Internal Recruitment Costs} + \\text{Total External Recruitment Costs}}{\\text{Total Number of Hires}}$",
          "$\\text{Cost per Hire} = \\text{Employee Annual Salary} \\div 12$",
          "$\\text{Cost per Hire} = \\text{Total Office Rent} \\div \\text{Headcount}$",
          "$\\text{Cost per Hire} = \\text{Job Board Ad Budget} \\times \\text{Applications}$"
        ],
        "correct_option_index": 0,
        "explanation": "Cost per Hire sums all internal recruiting expenses (recruiter salaries, software) and external expenses (agency fees, job ads) divided by the total number of hires."
      },
      {
        "id": "hr_4",
        "question_number": 4,
        "topic": "Engagement (eNPS)",
        "question_text": "How is Employee Net Promoter Score (eNPS) calculated from survey ratings (0-10)?",
        "options": [
          "$\\text{eNPS} = \\% \\text{ Promoters (9-10)} - \\% \\text{ Detractors (0-6)}$",
          "$\\text{eNPS} = \\text{Average Rating} \\times 10$",
          "$\\text{eNPS} = \\% \\text{ Passives (7-8)} \\div 2$",
          "$\\text{eNPS} = \\text{Total Responses} - \\text{Total Employees}$"
        ],
        "correct_option_index": 0,
        "explanation": "eNPS categorizes respondents into Promoters (9-10), Passives (7-8), and Detractors (0-6), subtracting the detractor percentage from the promoter percentage (-100 to +100)."
      },
      {
        "id": "hr_5",
        "question_number": 5,
        "topic": "Recruitment Funnel Conversion",
        "question_text": "What does a significant bottleneck between the 'Technical Interview' and 'Offer Extended' stages in a hiring funnel typically indicate?",
        "options": [
          "A mismatch between candidate interview skill evaluation and hiring manager expectations, or uncompetitive salary positioning",
          "The company website is offline",
          "The job description has too many spelling mistakes",
          "All candidates declined the offers"
        ],
        "correct_option_index": 0,
        "explanation": "Funnel conversion drop-offs pinpoint operational issues; high interview-to-offer failure suggests calibration gaps between screening criteria and interview panel benchmarks."
      },
      {
        "id": "hr_6",
        "question_number": 6,
        "topic": "Early Attrition",
        "question_text": "Why is '90-Day Early Attrition' closely monitored by talent leaders as a distinct KPI?",
        "options": [
          "It directly measures the effectiveness of onboarding programs, role clarity, and the accuracy of job expectations set during the recruitment process",
          "Employees cannot be fired after 90 days",
          "It determines when employee health insurance expires",
          "It is required for filing corporate tax returns"
        ],
        "correct_option_index": 0,
        "explanation": "Departures within 90 days typically reflect poor onboarding, cultural mismatch, or misaligned job expectations rather than long-term career stagnation."
      },
      {
        "id": "hr_7",
        "question_number": 7,
        "topic": "9-Box Talent Matrix",
        "question_text": "In executive talent planning, what two axes are evaluated in the classic 9-Box Grid?",
        "options": [
          "Current Performance (Low, Medium, High) vs Future Potential (Low, Medium, High)",
          "Age vs Salary",
          "Years of Experience vs Number of Projects",
          "Education Level vs Attendance"
        ],
        "correct_option_index": 0,
        "explanation": "The 9-Box Grid plots Performance against Potential to identify High Potentials (Star Talent), Core Contributors, and underperformers requiring development."
      },
      {
        "id": "hr_8",
        "question_number": 8,
        "topic": "Absenteeism (Bradford Factor)",
        "question_text": "What does the Bradford Factor formula ($B = S^2 \\times D$) measure in workplace absence management?",
        "options": [
          "It weights the disruptive impact of frequent, unplanned, short-term absences ($S$ instances) higher than a single long-term continuous absence ($D$ total days)",
          "The total overtime hours worked by an employee",
          "The employee's annual vacation allowance",
          "The average salary bonus percentage"
        ],
        "correct_option_index": 0,
        "explanation": "The Bradford Factor squares the number of absence spells ($S^2$), heavily penalizing unpredictable, repeated single-day absences that disrupt team operations."
      },
      {
        "id": "hr_9",
        "question_number": 9,
        "topic": "Training Evaluation",
        "question_text": "What are the four hierarchical levels in the Kirkpatrick Model of Training Evaluation?",
        "options": [
          "Level 1: Reaction $\\rightarrow$ Level 2: Learning $\\rightarrow$ Level 3: Behavior $\\rightarrow$ Level 4: Results (Business Impact)",
          "Level 1: Audio $\\rightarrow$ Level 2: Video $\\rightarrow$ Level 3: Reading $\\rightarrow$ Level 4: Exam",
          "Level 1: Cost $\\rightarrow$ Level 2: Duration $\\rightarrow$ Level 3: Room Size $\\rightarrow$ Level 4: Certificate",
          "Level 1: Basic $\\rightarrow$ Level 2: Intermediate $\\rightarrow$ Level 3: Advanced $\\rightarrow$ Level 4: Expert"
        ],
        "correct_option_index": 0,
        "explanation": "Kirkpatrick evaluates training from learner satisfaction (Reaction) and skill acquisition (Learning) to on-the-job application (Behavior) and organizational ROI (Results)."
      },
      {
        "id": "hr_10",
        "question_number": 10,
        "topic": "Compensation (Compa-Ratio)",
        "question_text": "What does a Compa-Ratio of 1.05 indicate about an employee's salary relative to their salary grade midpoint?",
        "options": [
          "The employee is paid 5% above the market midpoint for their salary grade band",
          "The employee is paid 5% below minimum wage",
          "The employee receives a 105% annual bonus",
          "The employee has worked at the company for 10.5 years"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Compa-Ratio} = \\text{Actual Salary} / \\text{Grade Midpoint}$. A ratio of 1.05 indicates pay is 5% higher than the competitive market midpoint."
      },
      {
        "id": "hr_11",
        "question_number": 11,
        "topic": "Diversity & Equity Metrics",
        "question_text": "How does tracking Pay Equity Analytics (e.g. Unadjusted vs Adjusted Gender Pay Gap) protect an enterprise?",
        "options": [
          "It identifies statistically significant compensation disparities across demographic cohorts after controlling for role, level, tenure, and location to ensure fair compensation compliance",
          "It automatically reduces all executive salaries by 50%",
          "It eliminates the need to pay taxes",
          "It publishes all employee bank accounts online"
        ],
        "correct_option_index": 0,
        "explanation": "Adjusted pay gap regressions isolate whether pay differences stem from legitimate factors (tenure, performance) or systemic bias, mitigating legal and retention risks."
      },
      {
        "id": "hr_12",
        "question_number": 12,
        "topic": "Flight Risk Modeling",
        "question_text": "Which machine learning approach is commonly applied in people analytics to predict individual employee flight risk (attrition likelihood)?",
        "options": [
          "Binary Logistic Regression or Gradient Boosted Trees trained on tenure, promotion history, compensation ratio, manager changes, and engagement survey signals",
          "K-Means clustering on employee home addresses",
          "Linear regression on office chair heights",
          "Running sentiment analysis on public weather reports"
        ],
        "correct_option_index": 0,
        "explanation": "Supervised classification models predict the probability of employee departure based on historical leading indicators, enabling proactive retention interventions."
      },
      {
        "id": "hr_13",
        "question_number": 13,
        "topic": "Human Capital ROI",
        "question_text": "How is Human Capital Return on Investment (HC ROI) calculated?",
        "options": [
          "$\\text{HC ROI} = \\frac{\\text{Revenue} - (\\text{Operating Expenses} - \\text{Total Compensation & Benefits Costs})}{\\text{Total Compensation & Benefits Costs}}$",
          "$\\text{HC ROI} = \\text{Total Revenue} \\div \\text{Total Employees}$",
          "$\\text{HC ROI} = \\text{Total Salaries} \\times 100\\%$",
          "$\\text{HC ROI} = \\text{Net Profit} + \\text{Office Rent}$"
        ],
        "correct_option_index": 0,
        "explanation": "HC ROI evaluates the financial return produced per dollar spent on total workforce compensation and benefits, measuring workforce productivity efficiency."
      },
      {
        "id": "hr_14",
        "question_number": 14,
        "topic": "Appraisal Biases",
        "question_text": "What is the 'Halo Effect' bias during annual employee performance reviews?",
        "options": [
          "When a manager's positive perception of one outstanding employee trait (e.g. charisma or punctuality) unfairly influences and inflates their ratings across all other unrelated competencies",
          "When all employees are given the exact same middle score",
          "When managers only rate employees who work in the morning",
          "When performance reviews are conducted anonymously"
        ],
        "correct_option_index": 0,
        "explanation": "The Halo Effect occurs when a single prominent positive attribute overshadows objective appraisal of specific distinct technical or behavioral competencies."
      },
      {
        "id": "hr_15",
        "question_number": 15,
        "topic": "Workforce Capacity Planning",
        "question_text": "What is the primary objective of Strategic Workforce Planning in expanding organizations?",
        "options": [
          "Aligning future business growth targets with required talent supply, identifying emerging skill gaps, and planning hiring, upskilling, and succession pipelines in advance",
          "Firing 10% of employees every quarter automatically",
          "Ordering office stationery in bulk",
          "Mandating 12-hour work days for all staff"
        ],
        "correct_option_index": 0,
        "explanation": "Strategic workforce planning analyzes future capability requirements against current talent inventory to proactively bridge skill deficits through hiring, reskilling, and succession."
      }
    ]
  },
  {
    "id": "financial-analysis-corporate-finance",
    "slug": "financial-analysis-corporate-finance",
    "title": "Financial Analysis & Corporate Finance",
    "category_id": "business-management",
    "category_name": "Business & Management",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Finance",
      "Corporate Finance",
      "Financial Statements",
      "DCF Valuation",
      "Ratios",
      "Working Capital"
    ],
    "description": "Assess your financial analysis expertise across financial statements (P&L, Balance Sheet, Cash Flow), liquidity/profitability ratios, DCF valuation, and capital budgeting.",
    "questions": [
      {
        "id": "fn_1",
        "question_number": 1,
        "topic": "Financial Statements",
        "question_text": "Which financial statement reports a company's financial position—assets, liabilities, and shareholders' equity—at a specific point in time?",
        "options": [
          "Balance Sheet",
          "Income Statement (P&L)",
          "Cash Flow Statement",
          "Statement of Retained Earnings"
        ],
        "correct_option_index": 0,
        "explanation": "The Balance Sheet provides a snapshot of financial health at a specific date, adhering to the fundamental identity: $\\text{Assets} = \\text{Liabilities} + \\text{Equity}$."
      },
      {
        "id": "fn_2",
        "question_number": 2,
        "topic": "Earnings Metrics",
        "question_text": "What does EBITDA represent in corporate financial analysis?",
        "options": [
          "Earnings Before Interest, Taxes, Depreciation, and Amortization",
          "Estimated Balance in Total Deposit Accounts",
          "Equity Balance Including Tax Deductions and Assets",
          "Earnings Before International Trade Deficit Allocations"
        ],
        "correct_option_index": 0,
        "explanation": "EBITDA measures pure operational profitability by stripping out the effects of capital structure (interest), tax jurisdictions, and non-cash accounting expenses (D&A)."
      },
      {
        "id": "fn_3",
        "question_number": 3,
        "topic": "Cash Flow Classification",
        "question_text": "Under which section of the Cash Flow Statement is the purchase of new factory machinery recorded?",
        "options": [
          "Cash Flow from Investing Activities (CapEx)",
          "Cash Flow from Operating Activities",
          "Cash Flow from Financing Activities",
          "Non-Operating Expense Section"
        ],
        "correct_option_index": 0,
        "explanation": "Purchases and sales of long-term property, plant, equipment (PP&E), and capital investments are classified under Investing Activities."
      },
      {
        "id": "fn_4",
        "question_number": 4,
        "topic": "Liquidity Ratios",
        "question_text": "What is the formula for the Quick Ratio (Acid-Test Ratio), and why does it exclude Inventory?",
        "options": [
          "$\\text{Quick Ratio} = \\frac{\\text{Cash} + \\text{Marketable Securities} + \\text{Accounts Receivable}}{\\text{Current Liabilities}}$; excludes inventory because inventory cannot be converted to cash immediately without discount",
          "$\\text{Quick Ratio} = \\text{Total Assets} \\div \\text{Total Debt}$",
          "$\\text{Quick Ratio} = \\text{Net Profit} \\div \\text{Revenue}$",
          "$\\text{Quick Ratio} = \\text{Current Assets} \\times \\text{Current Liabilities}$"
        ],
        "correct_option_index": 0,
        "explanation": "The Quick Ratio assesses immediate short-term liquidity by excluding inventory, which takes time to sell and liquidate during rapid cash demands."
      },
      {
        "id": "fn_5",
        "question_number": 5,
        "topic": "Profitability Ratios",
        "question_text": "How is Return on Equity (ROE) calculated?",
        "options": [
          "$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Average Shareholders' Equity}} \\times 100\\%$",
          "$\\text{ROE} = \\text{Gross Margin} \\times \\text{Asset Turnover}$",
          "$\\text{ROE} = \\text{Total Debt} \\div \\text{Shareholders' Equity}$",
          "$\\text{ROE} = \\text{EBITDA} \\div \\text{Total Assets}$"
        ],
        "correct_option_index": 0,
        "explanation": "ROE measures how efficiently management generates profit per dollar of equity capital invested by shareholders."
      },
      {
        "id": "fn_6",
        "question_number": 6,
        "topic": "Solvency & Leverage",
        "question_text": "What does a Debt-to-Equity (D/E) Ratio of 2.5 signify about a company's capital structure?",
        "options": [
          "The company has $2.50 of debt financing for every $1.00 of equity capital, indicating high financial leverage",
          "The company is 100% debt-free",
          "The company's stock price will increase by 250%",
          "The company has 2.5 times more cash than liabilities"
        ],
        "correct_option_index": 0,
        "explanation": "A D/E ratio of 2.5 indicates aggressive reliance on debt financing, magnifying potential returns on equity but elevating default risk during economic downturns."
      },
      {
        "id": "fn_7",
        "question_number": 7,
        "topic": "Working Capital Management",
        "question_text": "What constitutes 'Net Working Capital' (NWC)?",
        "options": [
          "$\\text{Net Working Capital} = \\text{Current Assets} - \\text{Current Liabilities}$",
          "$\\text{Net Working Capital} = \\text{Total Assets} - \\text{Total Debt}$",
          "$\\text{Net Working Capital} = \\text{Cash} + \\text{Long-Term Debt}$",
          "$\\text{Net Working Capital} = \\text{Gross Revenue} - \\text{Taxes}$"
        ],
        "correct_option_index": 0,
        "explanation": "Net Working Capital measures short-term operating liquidity and operational efficiency; positive NWC ensures short-term obligations can be comfortably funded."
      },
      {
        "id": "fn_8",
        "question_number": 8,
        "topic": "Time Value of Money (TVM)",
        "question_text": "What is the fundamental premise of the Time Value of Money principle?",
        "options": [
          "A dollar received today is worth more than a dollar received in the future due to its potential earning capacity (interest/investment return) and inflation",
          "Money loses 100% of its value every 10 years",
          "Future dollars are always worth twice as much as present dollars",
          "Interest rates can never be negative"
        ],
        "correct_option_index": 0,
        "explanation": "TVM states that capital available today can be invested to generate returns, making immediate cash flows more valuable than equivalent future receipts."
      },
      {
        "id": "fn_9",
        "question_number": 9,
        "topic": "DCF Valuation",
        "question_text": "In Discounted Cash Flow (DCF) valuation, what discount rate is applied to discount projected Unlevered Free Cash Flows (UFCF) to present value?",
        "options": [
          "Weighted Average Cost of Capital (WACC)",
          "Cost of Equity only",
          "Risk-Free Treasury Rate only",
          "Prime Lending Rate"
        ],
        "correct_option_index": 0,
        "explanation": "Unlevered Free Cash Flows represent cash available to all capital providers (debt and equity), so they are discounted at the blended Weighted Average Cost of Capital (WACC)."
      },
      {
        "id": "fn_10",
        "question_number": 10,
        "topic": "Capital Budgeting Rules",
        "question_text": "Why is Net Present Value (NPV) considered superior to the Payback Period method when evaluating competing capital projects?",
        "options": [
          "NPV accounts for the Time Value of Money and incorporates all project cash flows over the entire asset life, whereas Payback Period ignores cash flows after the cutoff date",
          "Payback Period is illegal under GAAP",
          "NPV does not require estimating cash flows",
          "Payback Period only works on software companies"
        ],
        "correct_option_index": 0,
        "explanation": "Payback Period ignores cash flows occurring beyond the breakeven milestone and neglects TVM; NPV properly discounts all cash flows across the complete timeline."
      },
      {
        "id": "fn_11",
        "question_number": 11,
        "topic": "Break-Even Analysis",
        "question_text": "How is the Break-Even Point (in units) calculated for a manufacturing firm?",
        "options": [
          "$\\text{Break-Even Units} = \\frac{\\text{Total Fixed Costs}}{\\text{Selling Price per Unit} - \\text{Variable Cost per Unit}}$",
          "$\\text{Break-Even Units} = \\text{Total Revenue} \\div \\text{Total Fixed Costs}$",
          "$\\text{Break-Even Units} = \\text{Fixed Costs} \\times \\text{Variable Costs}$",
          "$\\text{Break-Even Units} = \\text{Units Sold} \\div 2$"
        ],
        "correct_option_index": 0,
        "explanation": "Break-even units divide total fixed overhead by the Contribution Margin per unit (Price - Variable Cost), determining the volume where total profit equals zero."
      },
      {
        "id": "fn_12",
        "question_number": 12,
        "topic": "DuPont Analysis",
        "question_text": "What three component financial ratios form the standard 3-Step DuPont Analysis breakdown of Return on Equity (ROE)?",
        "options": [
          "$\\text{ROE} = \\text{Net Profit Margin} \\times \\text{Asset Turnover} \\times \\text{Financial Leverage (Equity Multiplier)}$",
          "$\\text{ROE} = \\text{Gross Margin} + \\text{Operating Margin} + \\text{EBITDA}$",
          "$\\text{ROE} = \\text{Current Ratio} \\times \\text{Quick Ratio} \\times \\text{Cash Ratio}$",
          "$\\text{ROE} = \\text{Stock Price} \\div \\text{Earnings per Share}$"
        ],
        "correct_option_index": 0,
        "explanation": "DuPont decomposes ROE into operating efficiency (Profit Margin), asset use efficiency (Asset Turnover), and financial leverage (Equity Multiplier)."
      },
      {
        "id": "fn_13",
        "question_number": 13,
        "topic": "Interest Coverage Ratio",
        "question_text": "What does an Interest Coverage Ratio of 1.2 indicate about a corporate borrower's credit risk?",
        "options": [
          "The company's operating income (EBIT) barely covers its debt interest expenses, indicating tight debt service capacity and elevated credit vulnerability",
          "The company has zero credit risk",
          "The company earns 120% profit margins",
          "The company is ready for an IPO"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Interest Coverage} = \\text{EBIT} / \\text{Interest Expense}$. A ratio below 1.5 indicates thin margin for error, signaling vulnerability to revenue drops or rate hikes."
      },
      {
        "id": "fn_14",
        "question_number": 14,
        "topic": "Capital Structure (Modigliani-Miller)",
        "question_text": "According to financial theory, what is the primary tax benefit of using Debt financing over Equity financing in corporate capital structures?",
        "options": [
          "Interest payments on debt are tax-deductible expenses (the 'Interest Tax Shield'), lowering the firm's effective income tax liability",
          "Debt financing eliminates all business risk",
          "Banks forgive debt after 5 years",
          "Debt holders receive voting rights in board elections"
        ],
        "correct_option_index": 0,
        "explanation": "Interest expense reduces taxable income, creating an interest tax shield that lowers the effective cost of debt compared to equity dividends, which are paid from after-tax earnings."
      },
      {
        "id": "fn_15",
        "question_number": 15,
        "topic": "Financial Variance Analysis",
        "question_text": "What is the purpose of conducting 'Budget vs Actual' Financial Variance Analysis at the close of every fiscal quarter?",
        "options": [
          "To identify discrepancies between planned budgets and actual operational performance, investigating underlying drivers (volume variances vs price/cost variances) to adjust strategy",
          "To fire employees who spent less than their allocated budget",
          "To rewrite historical accounting records",
          "To change the company's fiscal year end"
        ],
        "correct_option_index": 0,
        "explanation": "Variance analysis separates operational volume effects from pricing/spending deviations, helping executive management refine forecasting models and control operational spending."
      }
    ]
  },
  {
    "id": "sales-business-development",
    "slug": "sales-business-development",
    "title": "Sales & Business Development",
    "category_id": "business-management",
    "category_name": "Business & Management",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Sales",
      "Business Development",
      "B2B Sales",
      "Negotiation",
      "Lead Generation",
      "CRM"
    ],
    "description": "Evaluate your business development capabilities across inbound/outbound prospecting, B2B deal qualification (BANT/MEDDIC), consultative selling, and win-win negotiation tactics.",
    "questions": [
      {
        "id": "sd_1",
        "question_number": 1,
        "topic": "Sales Models",
        "question_text": "What is the primary difference between B2B (Business-to-Business) and B2C (Business-to-Consumer) sales cycles?",
        "options": [
          "B2B sales typically involve longer deal cycles, higher transaction values, multiple decision-makers/stakeholders, and rational ROI-driven evaluations",
          "B2B sales only occur over social media",
          "B2C sales require approval from a board of directors",
          "B2B sales never use contracts"
        ],
        "correct_option_index": 0,
        "explanation": "B2B involves complex buying committees, security/procurement reviews, and multi-month sales cycles, whereas B2C focuses on single consumers and emotional/instant buying decisions."
      },
      {
        "id": "sd_2",
        "question_number": 2,
        "topic": "Inbound vs Outbound",
        "question_text": "How does Inbound Sales differ from Outbound Sales prospecting?",
        "options": [
          "Inbound engages prospective leads who have already shown intent by visiting content, downloading guides, or requesting demos; Outbound initiates proactive cold outreach to targeted accounts",
          "Inbound is illegal, while Outbound is legal",
          "Outbound only uses email, while Inbound only uses phone calls",
          "Inbound sales require zero sales reps"
        ],
        "correct_option_index": 0,
        "explanation": "Inbound converts warm leads attracted via marketing content; Outbound identifies ideal customer profiles (ICPs) and initiates outbound prospecting (cold calling/email/social)."
      },
      {
        "id": "sd_3",
        "question_number": 3,
        "topic": "Sales Funnel Progression",
        "question_text": "What is the correct logical progression of stages in a standard enterprise sales pipeline?",
        "options": [
          "Lead Generation $\\rightarrow$ Qualification $\\rightarrow$ Discovery $\\rightarrow$ Proposal / Demo $\\rightarrow$ Negotiation $\\rightarrow$ Closed Won",
          "Closed Won $\\rightarrow$ Discovery $\\rightarrow$ Cold Call $\\rightarrow$ Billing",
          "Proposal $\\rightarrow$ Lead Generation $\\rightarrow$ Contract $\\rightarrow$ Discovery",
          "Marketing $\\rightarrow$ Closed Lost $\\rightarrow$ Cold Call $\\rightarrow$ Demo"
        ],
        "correct_option_index": 0,
        "explanation": "Deals progress methodically from initial lead capture and qualification to discovery of pain points, customized proposal/demo presentation, commercial negotiation, and closing."
      },
      {
        "id": "sd_4",
        "question_number": 4,
        "topic": "Lead Qualification (BANT)",
        "question_text": "What four qualification criteria are evaluated in the classic BANT framework?",
        "options": [
          "Budget, Authority (Decision Maker), Need (Pain Point), and Timeline (Purchase Horizon)",
          "Business, Advertising, Network, and Technology",
          "Billing, Accounting, Negotiation, and Taxes",
          "Brand, Audience, Name, and Target"
        ],
        "correct_option_index": 0,
        "explanation": "BANT qualifies whether a prospect has the financial budget, decision-making authority, genuine business need, and immediate timeline to purchase."
      },
      {
        "id": "sd_5",
        "question_number": 5,
        "topic": "Advanced Qualification (MEDDIC)",
        "question_text": "In complex enterprise sales, what does the 'E' and 'D' represent in the MEDDIC qualification methodology?",
        "options": [
          "Economic Buyer (person with budget release authority) and Decision Criteria (technical/commercial evaluation standards)",
          "Email Delivery and Database Cleanup",
          "Employee Directory and Desk Organization",
          "Engineering Department and Deployment Schedule"
        ],
        "correct_option_index": 0,
        "explanation": "MEDDIC identifies Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, and Champion to systematically de-risk enterprise deals."
      },
      {
        "id": "sd_6",
        "question_number": 6,
        "topic": "Outbound Cold Outreach",
        "question_text": "What makes a cold email prospecting campaign effective in generating enterprise discovery meetings?",
        "options": [
          "Highly personalized research highlighting a specific relevant business problem, social proof with industry peers, and a low-friction call-to-action (CTA)",
          "Sending a 10-page generic company brochure attachment to 50,000 random email addresses",
          "Writing the email subject line in all capital letters with multiple exclamation marks",
          "Asking the prospect to immediately sign a contract on the first email"
        ],
        "correct_option_index": 0,
        "explanation": "Effective cold outreach personalizes context, demonstrates clear business pain understanding, cites relevant customer proof points, and proposes a brief conversation."
      },
      {
        "id": "sd_7",
        "question_number": 7,
        "topic": "Discovery Call Methodology",
        "question_text": "What is the primary goal of an initial Discovery Call with a qualified sales prospect?",
        "options": [
          "Asking insightful, open-ended questions to uncover the prospect's underlying business challenges, root causes, financial impacts, and desired future state",
          "Talking continuously about company history and award trophies for 60 minutes",
          "Forcing the prospect to buy software on the spot",
          "Asking the prospect for their credit card number in the first minute"
        ],
        "correct_option_index": 0,
        "explanation": "Discovery focuses on diagnosing prospect pain points, evaluating impact, and understanding requirements rather than prematurely pitching generic features."
      },
      {
        "id": "sd_8",
        "question_number": 8,
        "topic": "Consultative Selling",
        "question_text": "What is the core principle of 'Consultative / Value-Based Selling'?",
        "options": [
          "Acting as a trusted advisor who diagnoses specific customer problems and tailors solutions that deliver measurable financial return or operational advantage",
          "Pushing product features aggressively regardless of customer requirements",
          "Offering the lowest price in the market to win at all costs",
          "Avoiding any discussions about pricing"
        ],
        "correct_option_index": 0,
        "explanation": "Consultative selling positions the representative as an expert advisor, aligning solution capabilities with the economic value and business outcomes sought by the buyer."
      },
      {
        "id": "sd_9",
        "question_number": 9,
        "topic": "Objection Handling",
        "question_text": "When a B2B prospect objects that 'Your price is significantly higher than competitor X', what is the recommended sales response?",
        "options": [
          "Acknowledge the concern and reframe conversation around Total Cost of Ownership (TCO), superior ROI, performance reliability, and the cost of competitor failure",
          "Immediately discount the price by 50% without asking questions",
          "Insult the competitor and argue with the prospect",
          "Hang up the phone immediately"
        ],
        "correct_option_index": 0,
        "explanation": "Price objections should be explored and reframed around distinct business value, ROI, and total cost of ownership rather than reacting with panic discounting."
      },
      {
        "id": "sd_10",
        "question_number": 10,
        "topic": "Pipeline Velocity",
        "question_text": "How is Sales Pipeline Velocity calculated to determine revenue throughput?",
        "options": [
          "$\\text{Velocity} = \\frac{\\text{Number of Qualified Opportunities} \\times \\text{Win Rate (\\%)} \\times \\text{Average Deal Size}}{\\text{Average Sales Cycle Length (Days)}}$",
          "$\\text{Velocity} = \\text{Total Calls Made} \\div \\text{Days in Month}$",
          "$\\text{Velocity} = \\text{Total Revenue} \\times 365$",
          "$\\text{Velocity} = \\text{Average Deal Size} \\div 100$"
        ],
        "correct_option_index": 0,
        "explanation": "Pipeline velocity measures revenue generated per day: increasing opportunities, win rate, or deal size, or reducing sales cycle length accelerates velocity."
      },
      {
        "id": "sd_11",
        "question_number": 11,
        "topic": "CRM Management",
        "question_text": "Why is disciplined Customer Relationship Management (CRM, e.g. Salesforce/HubSpot) hygiene essential for sales teams?",
        "options": [
          "It provides pipeline visibility, activity tracking, accurate revenue forecasting, deal progression records, and prevents customer details from disappearing when reps change",
          "It replaces the need to talk to customers",
          "It automatically signs contracts without human involvement",
          "It eliminates all sales quotas"
        ],
        "correct_option_index": 0,
        "explanation": "CRM platforms maintain institutional memory, track sales activities, forecast quarterly revenue, and ensure seamless handoffs between SDRs, AEs, and Account Managers."
      },
      {
        "id": "sd_12",
        "question_number": 12,
        "topic": "Customer Expansion",
        "question_text": "What is the difference between Up-selling and Cross-selling in account management?",
        "options": [
          "Up-selling encourages customers to upgrade to a premium tier or higher volume tier of the current product; Cross-selling sells complementary additional product lines",
          "Up-selling is for new customers; Cross-selling is for old customers",
          "Up-selling reduces revenue, while Cross-selling increases revenue",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "Up-selling expands value within the existing product category (higher tier/usage); Cross-selling introduces adjacent products/services that complement existing workflows."
      },
      {
        "id": "sd_13",
        "question_number": 13,
        "topic": "Negotiation Principles (BATNA)",
        "question_text": "In commercial contract negotiation, what does BATNA stand for?",
        "options": [
          "Best Alternative to a Negotiated Agreement",
          "Business Account Tax Negotiation Authority",
          "Base Annual Target Net Allocation",
          "Billing Authorization Terms and Notation"
        ],
        "correct_option_index": 0,
        "explanation": "BATNA is the most advantageous course of action a party can take if negotiations fail and no agreement can be reached; knowing your BATNA determines your reservation price."
      },
      {
        "id": "sd_14",
        "question_number": 14,
        "topic": "Win-Win Trade-Offs",
        "question_text": "When a client demands a 15% discount before signing a contract, how does an effective negotiator protect deal value?",
        "options": [
          "Asking for a concession in return (e.g. 'We can offer that price if you commit to a 2-year upfront contract and agree to be a public case study')",
          "Agreeing immediately with zero conditions",
          "Refusing to speak with the client again",
          "Canceling the contract entirely"
        ],
        "correct_option_index": 0,
        "explanation": "Effective negotiators never give concessions without receiving value in return (e.g., longer commitment terms, case study rights, faster payment terms)."
      },
      {
        "id": "sd_15",
        "question_number": 15,
        "topic": "Post-Sale Customer Handoff",
        "question_text": "Why is a structured handoff between the Account Executive (Sales) and the Customer Success / Implementation team crucial?",
        "options": [
          "It ensures all customer expectations, technical requirements, agreed timelines, and business success criteria documented during sales are executed flawlessly during onboarding",
          "It allows the salesperson to forget the client completely",
          "It doubles the customer's subscription price automatically",
          "It restarts the sales negotiation from scratch"
        ],
        "correct_option_index": 0,
        "explanation": "A seamless sales-to-success handoff preserves context, accelerates time-to-value for the customer, and establishes the foundation for high customer retention and renewal rates."
      }
    ]
  },
  {
    "id": "digital-marketing-social-media-ads",
    "slug": "digital-marketing-social-media-ads",
    "title": "Digital Marketing & Social Media Ads",
    "category_id": "growth-career",
    "category_name": "Marketing, Design & Career",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Digital Marketing",
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Social Media",
      "Content Marketing"
    ],
    "description": "Assess your digital marketing expertise across on-page/technical SEO, Google Search Ads Quality Score, Meta Ads targeting, funnel content strategy, and pixel tracking.",
    "questions": [
      {
        "id": "dm_1",
        "question_number": 1,
        "topic": "Marketing Channels",
        "question_text": "What is the primary difference between Organic Marketing (SEO/Content) and Paid Advertising (PPC/Paid Social)?",
        "options": [
          "Organic builds compounding long-term traffic through search rankings and valuable content without per-click media fees; Paid delivers immediate targeted traffic for active ad spend",
          "Organic marketing is illegal on search engines",
          "Paid advertising only works on radio stations",
          "Organic marketing requires paying Google for every website visitor"
        ],
        "correct_option_index": 0,
        "explanation": "Organic marketing builds sustainable long-term search equity and audience brand affinity; Paid advertising buys immediate traffic and conversions on a cost-per-click/impression basis."
      },
      {
        "id": "dm_2",
        "question_number": 2,
        "topic": "On-Page SEO",
        "question_text": "Which HTML element provides the clickable headline displayed on Google Search Engine Results Pages (SERPs) and is a critical on-page ranking factor?",
        "options": [
          "`<title>` tag",
          "`<footer>` tag",
          "`<script>` tag",
          "`<canvas>` tag"
        ],
        "correct_option_index": 0,
        "explanation": "The `<title>` tag tells search engines and users the exact topic of the page, acting as the primary anchor text headline on Google SERPs."
      },
      {
        "id": "dm_3",
        "question_number": 3,
        "topic": "Off-Page SEO",
        "question_text": "What makes an external backlink high-quality and valuable for improving your website's search engine domain authority?",
        "options": [
          "The link comes from an authoritative, topically relevant website with high editorial standards and natural contextual anchor text",
          "The link is purchased in bulk from automated link spam networks",
          "The link is hidden in invisible 1-pixel font at the bottom of a page",
          "The link redirects through 50 random websites"
        ],
        "correct_option_index": 0,
        "explanation": "Google evaluates backlink relevance, domain trust, and editorial naturalness; authoritative contextual links pass search equity (PageRank) to improve rankings."
      },
      {
        "id": "dm_4",
        "question_number": 4,
        "topic": "Technical SEO",
        "question_text": "What is the primary role of a `robots.txt` file located at the root of a website?",
        "options": [
          "Instructing search engine web crawlers (e.g. Googlebot) which URL paths they are permitted or disallowed from crawling and indexing on the site",
          "Styling website buttons and typography",
          "Storing customer credit card information",
          "Enforcing password complexity rules"
        ],
        "correct_option_index": 0,
        "explanation": "`robots.txt` provides crawler directives (Allow/Disallow), preventing bots from indexing private administrative directories or overloading server bandwidth."
      },
      {
        "id": "dm_5",
        "question_number": 5,
        "topic": "Keyword Search Intent",
        "question_text": "Which keyword represents 'Transactional' search intent, indicating the user is ready to make an immediate purchase?",
        "options": [
          "'Buy Dell XPS 15 laptop online discount'",
          "'What is a computer laptop'",
          "'History of laptop computers'",
          "'Laptop repair tutorial youtube'"
        ],
        "correct_option_index": 0,
        "explanation": "Transactional queries contain high-intent modifiers ('buy', 'discount', 'order') signaling that the user has completed research and is prepared to convert."
      },
      {
        "id": "dm_6",
        "question_number": 6,
        "topic": "Google Ads (Ad Rank)",
        "question_text": "How does Google Ads determine the position (Ad Rank) of a search ad in paid auction results?",
        "options": [
          "$\\text{Ad Rank} = \\text{Maximum CPC Bid} \\times \\text{Quality Score} + \\text{Ad Assets / Extensions Impact}$",
          "Highest bidder always wins, quality score is ignored",
          "Ads are sorted alphabetically by company name",
          "Ad positions are chosen by random lottery"
        ],
        "correct_option_index": 0,
        "explanation": "Google Ad Rank balances advertiser bid with Quality Score (Expected CTR, Ad Relevance, Landing Page Experience), allowing relevant ads to outrank higher bidders."
      },
      {
        "id": "dm_7",
        "question_number": 7,
        "topic": "Google Ads Bidding",
        "question_text": "When an e-commerce brand wants to optimize paid search campaigns specifically for profitability and revenue return, which automated smart bidding strategy should they select?",
        "options": [
          "Target ROAS (Target Return on Ad Spend)",
          "Maximize Clicks",
          "Manual CPM",
          "Target Impression Share"
        ],
        "correct_option_index": 0,
        "explanation": "Target ROAS predicts conversion values dynamically, adjusting real-time auction bids to maximize total return relative to the target revenue-to-spend ratio."
      },
      {
        "id": "dm_8",
        "question_number": 8,
        "topic": "Meta Ads Hierarchy",
        "question_text": "What is the three-level campaign structure utilized in Meta Ads Manager?",
        "options": [
          "Campaign Level (Objective) $\\rightarrow$ Ad Set Level (Audience, Budget, Placement, Schedule) $\\rightarrow$ Ad Level (Creative, Copy, URL)",
          "Account $\\rightarrow$ Folder $\\rightarrow$ File",
          "Image $\\rightarrow$ Video $\\rightarrow$ Text",
          "User $\\rightarrow$ Admin $\\rightarrow$ SuperAdmin"
        ],
        "correct_option_index": 0,
        "explanation": "Campaigns define the core business goal (Leads/Sales); Ad Sets define targeting, budget, and placements; Ads contain specific creative visual formats and ad copy."
      },
      {
        "id": "dm_9",
        "question_number": 9,
        "topic": "Lookalike Audiences",
        "question_text": "How does a Meta 'Lookalike Audience' find potential high-converting customers?",
        "options": [
          "Meta's machine learning algorithm identifies new users across its network whose demographic and behavioral patterns closely mirror those of your existing high-value customer custom list",
          "It shows ads to everyone living in the same postal code",
          "It sends spam emails to friends of your Facebook page followers",
          "It shows ads only to competitors"
        ],
        "correct_option_index": 0,
        "explanation": "Lookalike audiences leverage platform behavioral data to identify prospective users with profiles statistically similar to an uploaded seed list of high-LTV customers."
      },
      {
        "id": "dm_10",
        "question_number": 10,
        "topic": "Tracking (Meta Pixel / CAPI)",
        "question_text": "Why is implementing the Meta Conversions API (CAPI) alongside the browser-based Meta Pixel essential for modern ad tracking?",
        "options": [
          "CAPI transmits web conversion events directly from your backend server to Meta, bypassing browser ad-blockers, cookie restrictions, and iOS privacy limitations",
          "CAPI makes ads completely free of cost",
          "CAPI automatically writes ad headlines with AI",
          "CAPI deletes customer shopping carts after 24 hours"
        ],
        "correct_option_index": 0,
        "explanation": "Server-to-server CAPI ensures complete conversion data fidelity, overcoming browser tracking prevention (ITP, ad-blockers) to optimize ad delivery algorithms."
      },
      {
        "id": "dm_11",
        "question_number": 11,
        "topic": "Content Funnel Strategy",
        "question_text": "What type of marketing content is most effective at the Middle of the Funnel (MOFU / Consideration Stage)?",
        "options": [
          "Detailed comparison guides, product webinars, case studies, and solution whitepapers",
          "Viral memes with no product mention",
          "Immediate 'Buy Now' discount checkout pages",
          "General definitions of industry terms"
        ],
        "correct_option_index": 0,
        "explanation": "MOFU engages problem-aware prospects evaluating competing solutions, providing case studies, feature comparisons, and webinars to demonstrate product superiority."
      },
      {
        "id": "dm_12",
        "question_number": 12,
        "topic": "Email Marketing Metrics",
        "question_text": "What does a high Click-Through Rate (CTR) relative to email Open Rate indicate about an email marketing campaign?",
        "options": [
          "The email body copy, value proposition, and call-to-action (CTA) button were compelling and highly relevant to the recipients who opened the email",
          "The email was sent to the wrong recipients",
          "The subject line was misleading",
          "All emails were marked as spam"
        ],
        "correct_option_index": 0,
        "explanation": "High click-to-open ratio confirms that once opened, the email's editorial content and value proposition resonated strongly with the audience, driving action."
      },
      {
        "id": "dm_13",
        "question_number": 13,
        "topic": "Social Media Algorithms",
        "question_text": "What behavioral metric is most heavily weighted by organic social algorithms (LinkedIn, Instagram, YouTube) to determine viral reach distribution?",
        "options": [
          "High initial audience engagement velocity: meaningful comments, saves, and direct message shares relative to impressions within the first hour of posting",
          "The time of day the post was scheduled",
          "The physical size of the image file in megabytes",
          "The number of emojis in the caption"
        ],
        "correct_option_index": 0,
        "explanation": "Social algorithms measure engagement velocity and depth (conversations, saves, shares), promoting content that stimulates active community discussion and watch time."
      },
      {
        "id": "dm_14",
        "question_number": 14,
        "topic": "A/B Creative Testing",
        "question_text": "When running split tests on social media ad creatives, why should you test only one variable at a time (e.g., testing 2 different video hooks while keeping copy and audience identical)?",
        "options": [
          "To isolate and attribute the exact cause of performance differences without confounding variables",
          "Meta Ads Manager refuses to run ads with multiple variations",
          "To reduce ad spend to zero",
          "Because audiences dislike multiple options"
        ],
        "correct_option_index": 0,
        "explanation": "Testing single isolated variables (visual creative, hook, headline, or CTA) provides clear attribution regarding which creative element drove improved conversion rates."
      },
      {
        "id": "dm_15",
        "question_number": 15,
        "topic": "Influencer Attribution (UTM)",
        "question_text": "How does an e-commerce brand accurately attribute sales and revenue generated by individual social media influencers?",
        "options": [
          "By assigning each influencer a unique tagged UTM tracking link (`?utm_source=instagram&utm_medium=influencer&utm_campaign=creator_name`) and dedicated discount promo code",
          "By asking customers to write the influencer's name on a postcard",
          "By assuming all sales came from the influencer with the most followers",
          "By counting total video views"
        ],
        "correct_option_index": 0,
        "explanation": "Unique UTM parameters and vanity promo codes capture exact conversion attribution in analytics platforms, calculating true ROAS per influencer partner."
      }
    ]
  },
  {
    "id": "marketing-analytics-growth-metrics",
    "slug": "marketing-analytics-growth-metrics",
    "title": "Marketing Analytics & Growth Metrics",
    "category_id": "growth-career",
    "category_name": "Marketing, Design & Career",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Marketing Analytics",
      "CAC",
      "LTV",
      "ROAS",
      "GA4",
      "Attribution Models"
    ],
    "description": "Validate your quantitative marketing expertise across Customer Acquisition Cost (CAC), Lifetime Value (LTV), ROAS/MER, GA4 event analytics, and multi-touch attribution.",
    "questions": [
      {
        "id": "ma_1",
        "question_number": 1,
        "topic": "Customer Acquisition Cost",
        "question_text": "What is the formula for calculating Customer Acquisition Cost (CAC) over a specific marketing campaign period?",
        "options": [
          "$\\text{CAC} = \\frac{\\text{Total Marketing & Sales Expenses (Ad Spend, Agency Fees, Salaries)}}{\\text{Total New Customers Acquired}}$",
          "$\\text{CAC} = \\text{Total Revenue} \\div \\text{Total Clicks}$",
          "$\\text{CAC} = \\text{Total Visitors} \\times \\text{Conversion Rate}$",
          "$\\text{CAC} = \\text{Product Price} - \\text{Discount}$"
        ],
        "correct_option_index": 0,
        "explanation": "CAC measures total investment required to acquire a customer by dividing all fully loaded marketing and sales acquisition costs by the count of new customers gained."
      },
      {
        "id": "ma_2",
        "question_number": 2,
        "topic": "Unit Economics (LTV:CAC)",
        "question_text": "What is widely regarded as the healthy benchmark ratio for Customer Lifetime Value to Customer Acquisition Cost (LTV:CAC) in sustainable venture-backed businesses?",
        "options": [
          "$3:1$ (Lifetime Value is roughly 3 times the Acquisition Cost)",
          "$1:1$ (Breakeven on first sale with zero lifetime profit)",
          "$0.5:1$ (Spending double the customer value on ads)",
          "$100:1$"
        ],
        "correct_option_index": 0,
        "explanation": "An LTV:CAC ratio around 3:1 represents a balanced growth model: acquiring customers profitably while reinvesting sufficient capital to expand market share."
      },
      {
        "id": "ma_3",
        "question_number": 3,
        "topic": "Ad Performance Metrics",
        "question_text": "How is Return on Ad Spend (ROAS) calculated for a paid media campaign?",
        "options": [
          "$\\text{ROAS} = \\frac{\\text{Gross Revenue Generated from Ads}}{\\text{Total Direct Ad Spend}}$",
          "$\\text{ROAS} = \\text{Total Clicks} \\div \\text{Ad Spend}$",
          "$\\text{ROAS} = \\text{Ad Spend} - \\text{Net Profit}$",
          "$\\text{ROAS} = \\text{Cost per Click} \\times 100$"
        ],
        "correct_option_index": 0,
        "explanation": "ROAS evaluates advertising efficiency by dividing gross revenue attributable to ads by direct media spend (e.g., $5,000 revenue from $1,000 spend = 5.0x ROAS)."
      },
      {
        "id": "ma_4",
        "question_number": 4,
        "topic": "Blended Performance (MER)",
        "question_text": "What does the Marketing Efficiency Ratio (MER), also known as Blended ROAS, measure across an entire organization?",
        "options": [
          "$\\text{MER} = \\frac{\\text{Total Business Revenue Across All Channels}}{\\text{Total Advertising Spend Across All Channels}}$",
          "The number of emails sent per hour",
          "The average salary of marketing managers",
          "The bounce rate of the homepage"
        ],
        "correct_option_index": 0,
        "explanation": "MER provides a holistic top-level view of media efficiency, measuring total company revenue generated per dollar of total paid ad spend across all channels combined."
      },
      {
        "id": "ma_5",
        "question_number": 5,
        "topic": "CAC Payback Period",
        "question_text": "In a subscription business where CAC is $300 and the customer generates $50 in gross margin contribution per month, what is the CAC Payback Period?",
        "options": [
          "6 Months",
          "12 Months",
          "2 Months",
          "24 Months"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{CAC Payback Period} = \\text{CAC} / \\text{Monthly Gross Margin} = \\$300 / \\$50 = 6 \\text{ months}$, indicating the time required to recover upfront acquisition costs."
      },
      {
        "id": "ma_6",
        "question_number": 6,
        "topic": "Google Analytics 4 (GA4)",
        "question_text": "What fundamental architectural paradigm change distinguishes Google Analytics 4 (GA4) from Universal Analytics (UA)?",
        "options": [
          "GA4 is built on an Event-Based data model where every user interaction is tracked as an independent event with parameters, replacing UA's session/pageview-based model",
          "GA4 only tracks mobile smartphone traffic",
          "GA4 requires paying monthly server hosting fees",
          "GA4 deletes all historical data every 24 hours"
        ],
        "correct_option_index": 0,
        "explanation": "GA4 unifies web and app tracking around flexible event streams with custom parameters, replacing rigid session and pageview hierarchies."
      },
      {
        "id": "ma_7",
        "question_number": 7,
        "topic": "UTM Architecture",
        "question_text": "Which of the following URLs is properly structured with standard Google Analytics UTM campaign parameters?",
        "options": [
          "`https://site.com/course?utm_source=linkedin&utm_medium=cpc&utm_campaign=fall_bootcamp`",
          "`https://site.com/course#source_linkedin_cpc`",
          "`https://site.com/course/utm/linkedin/cpc`",
          "`https://site.com/course?google_tracking=on`"
        ],
        "correct_option_index": 0,
        "explanation": "Standard UTM tracking requires query parameters: `utm_source` (platform), `utm_medium` (channel type), and `utm_campaign` (specific campaign name)."
      },
      {
        "id": "ma_8",
        "question_number": 8,
        "topic": "Attribution Models (First vs Last)",
        "question_text": "How does a 'First-Touch Attribution' model evaluate marketing channels compared to 'Last-Touch'?",
        "options": [
          "First-Touch assigns 100% conversion credit to the initial channel that introduced the customer to the brand (top of funnel); Last-Touch gives 100% credit to the final touchpoint before purchase",
          "First-Touch is for mobile; Last-Touch is for desktop",
          "First-Touch divides credit equally across all touchpoints",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "First-touch highlights discovery channels (SEO, brand ads); Last-touch credits closing channels (branded search, direct, email), neither capturing the full multi-step journey."
      },
      {
        "id": "ma_9",
        "question_number": 9,
        "topic": "Data-Driven Attribution (DDA)",
        "question_text": "How does modern Data-Driven Attribution in Google Analytics 4 distribute conversion credit across touchpoints?",
        "options": [
          "By utilizing machine learning algorithms (Shapley value cooperative game theory) to analyze converting and non-converting paths and allocate fractional credit based on true incremental impact",
          "By giving all credit to the cheapest ad",
          "By assigning random percentages to each channel",
          "By sorting channels alphabetically"
        ],
        "correct_option_index": 0,
        "explanation": "Data-driven attribution calculates counterfactual incremental lift using fractional algorithmic models to reward touchpoints that statistically increase conversion probability."
      },
      {
        "id": "ma_10",
        "question_number": 10,
        "topic": "Conversion Rate Optimization",
        "question_text": "If a landing page receives 50,000 visitors and generates 2,250 lead form submissions, what is the Landing Page Conversion Rate?",
        "options": [
          "$4.5\\%$",
          "$2.25\\%$",
          "$9.0\\%$",
          "$0.45\\%$"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Conversion Rate} = (2,250 / 50,000) \\times 100\\% = 4.5\\%$."
      },
      {
        "id": "ma_11",
        "question_number": 11,
        "topic": "Funnel Leak Analysis",
        "question_text": "In a multi-step SaaS signup funnel, how is a 'High Leakage' drop-off stage diagnosed?",
        "options": [
          "By plotting micro-conversion drop-off percentages between consecutive steps and identifying the step with the steepest percentage decline in progressing users",
          "By counting total website pageviews",
          "By rebooting the server every hour",
          "By checking the CEO's calendar"
        ],
        "correct_option_index": 0,
        "explanation": "Funnel visualization isolates step-to-step drop-offs (e.g. 70% abandoning between payment details and confirm button), directing UX optimization to the highest-friction barriers."
      },
      {
        "id": "ma_12",
        "question_number": 12,
        "topic": "Cohort Retention Curves",
        "question_text": "What does a flattening horizontal retention curve indicate in product and growth marketing analytics?",
        "options": [
          "The product has achieved strong product-market fit with a stable core cohort of repeat active users who continue returning indefinitely",
          "All users have abandoned the product",
          "The company is losing money every day",
          "The website database is frozen"
        ],
        "correct_option_index": 0,
        "explanation": "A retention curve that flattens asymptotically above zero signifies that a predictable percentage of acquired users find ongoing value, preventing leaky-bucket churn."
      },
      {
        "id": "ma_13",
        "question_number": 13,
        "topic": "Marketing Mix Modeling (MMM)",
        "question_text": "What is the primary advantage of Marketing Mix Modeling (MMM) in modern privacy-first digital advertising?",
        "options": [
          "MMM uses top-down econometric regression on aggregate sales and media spend data, measuring macro channel effectiveness without relying on individual user tracking cookies",
          "MMM tracks individual users across private email accounts",
          "MMM eliminates the need for advertising budgets",
          "MMM operates strictly in real-time within 1 second"
        ],
        "correct_option_index": 0,
        "explanation": "MMM evaluates long-term macro media contributions and offline/online cross-channel synergies via statistical time-series regression without requiring user-level cookies or IDFA tracking."
      },
      {
        "id": "ma_14",
        "question_number": 14,
        "topic": "Diminishing Returns",
        "question_text": "In paid acquisition scaling, what happens when an ad campaign experiences 'Diminishing Marginal Returns'?",
        "options": [
          "As ad spend scales up beyond audience market capacity, the incremental CAC increases and marginal ROAS declines because ads reach saturated, lower-intent prospects",
          "Total revenue drops to zero immediately",
          "Ad costs decrease to zero",
          "The ad platform gives free bonus credits"
        ],
        "correct_option_index": 0,
        "explanation": "Audience saturation leads to higher ad frequencies and rising auction CPMs, causing the marginal revenue per additional dollar spent to decrease."
      },
      {
        "id": "ma_15",
        "question_number": 15,
        "topic": "Revenue Churn vs Customer Churn",
        "question_text": "Why is it possible for a SaaS business to experience 'Negative Net Revenue Churn' even while losing 3% of its customer logos each month?",
        "options": [
          "Because revenue expansion (upgrades, add-ons, higher usage) from existing retained customers exceeds the total revenue lost from canceling churned accounts",
          "Because the company switched to an annual fiscal calendar",
          "Because churn calculations ignore cancellations",
          "Because the bank made an accounting error"
        ],
        "correct_option_index": 0,
        "explanation": "Negative net revenue churn occurs when Net Retention Rate exceeds 100%: account expansion from healthy customers outweighs the MRR lost from departing logos."
      }
    ]
  },
  {
    "id": "ui-ux-design-figma",
    "slug": "ui-ux-design-figma",
    "title": "UI/UX Design & Figma",
    "category_id": "growth-career",
    "category_name": "Marketing, Design & Career",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "UI/UX",
      "Figma",
      "Design Systems",
      "User Research",
      "Wireframing",
      "Usability"
    ],
    "description": "Assess your end-to-end product design skills across UX research, Figma auto-layout, component variants, visual hierarchy, design systems, and WCAG accessibility standards.",
    "questions": [
      {
        "id": "ux_1",
        "question_number": 1,
        "topic": "UX vs UI Distinction",
        "question_text": "What is the core difference between User Experience (UX) design and User Interface (UI) design?",
        "options": [
          "UX focuses on user research, interaction flows, information architecture, and problem-solving; UI focuses on visual aesthetics, typography, color schemes, and interactive styling",
          "UX is for mobile apps, while UI is for desktop websites",
          "UX is written in HTML, while UI is written in CSS",
          "There is no difference"
        ],
        "correct_option_index": 0,
        "explanation": "UX designs the journey, structure, usability, and ease of task completion; UI crafts the visual interface, design tokens, iconography, and aesthetic polish."
      },
      {
        "id": "ux_2",
        "question_number": 2,
        "topic": "Design Thinking Stages",
        "question_text": "What are the five sequential stages of the Stanford d.school Design Thinking Process?",
        "options": [
          "Empathize $\\rightarrow$ Define $\\rightarrow$ Ideate $\\rightarrow$ Prototype $\\rightarrow$ Test",
          "Draw $\\rightarrow$ Code $\\rightarrow$ Market $\\rightarrow$ Sell $\\rightarrow$ Review",
          "Survey $\\rightarrow$ Budget $\\rightarrow$ Build $\\rightarrow$ Deploy $\\rightarrow$ Exit",
          "Wireframe $\\rightarrow$ Polish $\\rightarrow$ Launch $\\rightarrow$ Invoice $\\rightarrow$ Archive"
        ],
        "correct_option_index": 0,
        "explanation": "Design Thinking emphasizes human-centered problem solving: understanding user pain (Empathize), framing the problem (Define), brainstorming (Ideate), building artifacts (Prototype), and testing (Test)."
      },
      {
        "id": "ux_3",
        "question_number": 3,
        "topic": "Visual Hierarchy",
        "question_text": "How do UI designers establish effective Visual Hierarchy on a content-heavy web page?",
        "options": [
          "By varying font sizes, weights, color contrasts, scale, and whitespace to guide the user's eye naturally to the most important primary elements first",
          "By making all text elements the exact same size and color",
          "By flashing bright red borders around every paragraph",
          "By removing all images from the page"
        ],
        "correct_option_index": 0,
        "explanation": "Visual hierarchy uses size, weight, high contrast, and generous white space to establish clear reading priorities and effortless content scannability."
      },
      {
        "id": "ux_4",
        "question_number": 4,
        "topic": "Figma Auto-Layout",
        "question_text": "What is the primary benefit of using Figma's 'Auto-Layout' feature when designing UI components?",
        "options": [
          "Components dynamically adjust their padding, dimensions, and inner spacing automatically when their text content or screen width changes, behaving like flexbox in code",
          "It writes complete backend database code automatically",
          "It exports designs directly to iOS App Store without development",
          "It converts vector icons into bitmap JPEGs"
        ],
        "correct_option_index": 0,
        "explanation": "Auto-Layout mimics CSS flexbox: containers resize dynamically to accommodate changing content lengths and responsive layout shifts with consistent padding and gaps."
      },
      {
        "id": "ux_5",
        "question_number": 5,
        "topic": "Component Variants",
        "question_text": "In Figma, how do 'Component Variants' streamline design system maintenance?",
        "options": [
          "They bundle related states of a component (e.g. Button: Primary/Secondary, Hover/Active/Disabled, Small/Large) into a single unified master component with intuitive property toggles",
          "They duplicate the entire design file 50 times",
          "They prevent other designers from viewing the file",
          "They convert vector shapes into raster GIFs"
        ],
        "correct_option_index": 0,
        "explanation": "Variants organize component variations (states, sizes, types) into a clean dropdown matrix in the properties panel, preventing design system clutter."
      },
      {
        "id": "ux_6",
        "question_number": 6,
        "topic": "Design System Tokens",
        "question_text": "Why do enterprise product design teams define Design Tokens (for colors, typography, spacing, and border radii)?",
        "options": [
          "Tokens establish a single source of truth across design and engineering, ensuring design system updates cascade seamlessly to production CSS variables",
          "Tokens are used as cryptocurrency to pay freelance designers",
          "Tokens reduce the number of colors to only black and white",
          "Tokens delete legacy user interface code"
        ],
        "correct_option_index": 0,
        "explanation": "Design tokens encapsulate raw visual values into reusable semantic names (e.g. `--color-primary`, `--space-md`), creating a shared contract between Figma and frontend codebases."
      },
      {
        "id": "ux_7",
        "question_number": 7,
        "topic": "Figma Prototyping (Smart Animate)",
        "question_text": "How does Figma's 'Smart Animate' create seamless transitions between two prototype frames?",
        "options": [
          "It automatically identifies matching layer names across frames and smoothly interpolates differences in position, size, opacity, and rotation",
          "It downloads 3D animation videos from the internet",
          "It requires writing JavaScript code inside Figma",
          "It reloads the browser window on every click"
        ],
        "correct_option_index": 0,
        "explanation": "Smart Animate recognizes identical layer names in adjacent frames and automatically generates fluid physics-based transitions for movements, scale, and color shifts."
      },
      {
        "id": "ux_8",
        "question_number": 8,
        "topic": "Usability Heuristics (Nielsen)",
        "question_text": "According to Jakob Nielsen's 10 Usability Heuristics, what does 'Visibility of System Status' require?",
        "options": [
          "The system should always keep users informed about what is going on through appropriate feedback (e.g. loading spinners, progress bars, success toasts) within reasonable time",
          "The entire application source code must be visible on the homepage",
          "The company CEO must stream their screen live 24/7",
          "All server error logs must be displayed to the end-user"
        ],
        "correct_option_index": 0,
        "explanation": "System status visibility ensures users never feel stranded, providing immediate visual feedback during background processing or state transitions."
      },
      {
        "id": "ux_9",
        "question_number": 9,
        "topic": "Accessibility (WCAG Contrast)",
        "question_text": "To satisfy WCAG 2.1 AA accessibility guidelines, what is the minimum color contrast ratio required between normal body text and its background?",
        "options": [
          "$4.5:1$",
          "$1.5:1$",
          "$100:1$",
          "$2:1$"
        ],
        "correct_option_index": 0,
        "explanation": "WCAG 2.1 Level AA mandates a minimum contrast ratio of 4.5:1 for normal body text (and 3:1 for large text $\\ge 18\\text{pt}$) to ensure readability for visually impaired users."
      },
      {
        "id": "ux_10",
        "question_number": 10,
        "topic": "Information Architecture (Card Sorting)",
        "question_text": "What is the purpose of conducting 'Card Sorting' research exercises with target users?",
        "options": [
          "To understand how users naturally categorize and conceptualize information, guiding intuitive navigation menu structures and taxonomy",
          "To teach users how to play card games",
          "To test computer graphics card performance",
          "To design physical cardboard packaging"
        ],
        "correct_option_index": 0,
        "explanation": "Card sorting evaluates user mental models, revealing how users group content topics to design intuitive website navigation hierarchies and sitemaps."
      },
      {
        "id": "ux_11",
        "question_number": 11,
        "topic": "Wireframe Fidelity",
        "question_text": "When in the product design lifecycle should Low-Fidelity wireframes (grayscale paper/wire structures) be utilized instead of High-Fidelity prototypes?",
        "options": [
          "During early ideation and conceptual alignment, allowing rapid iteration on layout and functionality without getting distracted by colors, fonts, and pixel polish",
          "Immediately before launching the app to production",
          "Only when the designer has no internet connection",
          "When designing marketing billboards"
        ],
        "correct_option_index": 0,
        "explanation": "Low-fidelity wireframing focuses early discussions on structural problem-solving, layout hierarchy, and user flows before investing time in visual aesthetics."
      },
      {
        "id": "ux_12",
        "question_number": 12,
        "topic": "Hick's Law in UI Design",
        "question_text": "What does Hick's Law state, and how does it influence checkout and navigation design?",
        "options": [
          "The time it takes to make a decision increases logarithmically with the number and complexity of choices; reducing options accelerates user task completion",
          "Users always click on the largest image on a page",
          "Websites must load in under 1 millisecond",
          "Users only read the first three words of every paragraph"
        ],
        "correct_option_index": 0,
        "explanation": "Hick's Law ($T = b \\cdot \\log_2(n + 1)$) advocates simplifying choices, breaking complex multi-option forms into progressive disclosure steps to reduce cognitive overload."
      },
      {
        "id": "ux_13",
        "question_number": 13,
        "topic": "Fitts's Law",
        "question_text": "According to Fitts's Law, what two ergonomic factors make primary Call-to-Action (CTA) buttons easy and fast for users to click?",
        "options": [
          "Larger target surface size and closer physical distance to the user's cursor / thumb rest position",
          "Using neon green background color and italic fonts",
          "Placing buttons in the top-left corner of the screen",
          "Making buttons flash every 2 seconds"
        ],
        "correct_option_index": 0,
        "explanation": "Fitts's Law dictates that target acquisition time is a function of distance and target width; primary buttons should be generously sized and placed within effortless reach zones."
      },
      {
        "id": "ux_14",
        "question_number": 14,
        "topic": "Design System Governance",
        "question_text": "In Figma, how does publishing an updated Component Library to a team workspace maintain consistency across 20 design files?",
        "options": [
          "Figma notifies file maintainers with an update badge, allowing them to review component changes and update all linked instances with a single click",
          "It permanently deletes all previous project files",
          "It automatically deploys the code to AWS",
          "It locks all team members out of editing"
        ],
        "correct_option_index": 0,
        "explanation": "Figma's shared team libraries act as a centralized design system repository, broadcasting versioned component improvements to all consuming files seamlessly."
      },
      {
        "id": "ux_15",
        "question_number": 15,
        "topic": "Usability Testing Protocols",
        "question_text": "When moderating an unguided Usability Test session with a participant, why should the researcher practice the 'Think-Aloud Protocol'?",
        "options": [
          "Prompting users to verbalize their thoughts, expectations, and hesitations in real-time illuminates why user confusion or navigation friction occurs",
          "To test the participant's vocal singing voice",
          "To record audio for podcast episodes",
          "To tell the user whenever they make a mistake"
        ],
        "correct_option_index": 0,
        "explanation": "The Think-Aloud protocol reveals the user's internal mental model, providing qualitative insights into why certain UI elements cause friction or hesitation."
      }
    ]
  },
  {
    "id": "ecommerce-online-business",
    "slug": "ecommerce-online-business",
    "title": "E-Commerce & Online Business",
    "category_id": "growth-career",
    "category_name": "Marketing, Design & Career",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "E-Commerce",
      "D2C",
      "Shopify",
      "Conversion Rate",
      "Inventory",
      "Retail"
    ],
    "description": "Benchmark your e-commerce operations knowledge across D2C store optimization, checkout conversion funnels, inventory turnover, COD/RTO mitigation, and omnichannel growth.",
    "questions": [
      {
        "id": "ec_1",
        "question_number": 1,
        "topic": "Business Models",
        "question_text": "What is the primary operational difference between a Direct-to-Consumer (D2C) brand store and an Online Marketplace (e.g. Amazon / Flipkart)?",
        "options": [
          "In D2C, the brand owns the complete customer relationship, first-party data, pricing, and brand experience on its own standalone store; Marketplaces control the platform and customer relationship",
          "D2C brands cannot sell physical products",
          "Marketplaces do not allow credit card payments",
          "D2C brands only operate via physical retail stores"
        ],
        "correct_option_index": 0,
        "explanation": "D2C brands cultivate direct relationships, retain customer contact data, and command full brand control, whereas marketplaces provide massive built-in traffic but control customer data."
      },
      {
        "id": "ec_2",
        "question_number": 2,
        "topic": "Gross Merchandise Value",
        "question_text": "What does Gross Merchandise Value (GMV) measure for an online retail business?",
        "options": [
          "The total gross dollar value of all merchandise sold over a given time period through a customer-to-customer or e-commerce platform before deductions",
          "The physical weight of products stored in the warehouse",
          "The total net profit after taxes and salaries",
          "The cost of purchasing warehouse packaging tape"
        ],
        "correct_option_index": 0,
        "explanation": "GMV reflects the gross transaction volume processed across the store prior to factoring in discounts, returns, cancellations, and operational expenses."
      },
      {
        "id": "ec_3",
        "question_number": 3,
        "topic": "Cart Abandonment",
        "question_text": "What is an effective automated tactic for recovering potential revenue from abandoned e-commerce shopping carts?",
        "options": [
          "Triggering an automated multi-step email/SMS recovery sequence with cart item previews, customer reviews, and a time-limited incentive",
          "Deleting the user's account immediately",
          "Increasing the prices of the items in their cart",
          "Calling the customer repeatedly at midnight"
        ],
        "correct_option_index": 0,
        "explanation": "Automated abandoned cart workflows (via email/WhatsApp/SMS) remind high-intent shoppers of their selected items, addressing hesitation and recovering 10-20% of lost checkouts."
      },
      {
        "id": "ec_4",
        "question_number": 4,
        "topic": "Product Detail Page (PDP)",
        "question_text": "Which combination of elements on an e-commerce Product Detail Page (PDP) drives the highest conversion rate lift?",
        "options": [
          "High-resolution multi-angle photography/video, clear price and shipping disclosures, genuine customer reviews with photos, clear size/fit guide, and prominent Add-to-Cart CTA",
          "A single blurry thumbnail image and no product description",
          "Hiding the product price until after credit card details are entered",
          "Placing 50 unrelated advertisements on the page"
        ],
        "correct_option_index": 0,
        "explanation": "High-converting PDPs eliminate buying hesitation through comprehensive visual proof, social proof (reviews), transparent delivery expectations, and frictionless CTAs."
      },
      {
        "id": "ec_5",
        "question_number": 5,
        "topic": "Average Order Value (AOV)",
        "question_text": "Which e-commerce growth strategy is specifically designed to increase Average Order Value (AOV)?",
        "options": [
          "Implementing 'Frequently Bought Together' bundles, minimum spend free shipping thresholds (e.g. 'Add $15 for Free Shipping'), and post-purchase one-click upsells",
          "Offering 90% discounts on all single items",
          "Restricting customers to buying only one item per order",
          "Increasing the checkout loading time"
        ],
        "correct_option_index": 0,
        "explanation": "Tiered free shipping bars, bundle discounts, and cart drawer cross-sells incentivize shoppers to add complementary items, increasing the revenue basket per checkout."
      },
      {
        "id": "ec_6",
        "question_number": 6,
        "topic": "Checkout Optimization",
        "question_text": "Why do top-tier e-commerce brands offer 'Guest Checkout' options alongside social login (Apple/Google)?",
        "options": [
          "Forcing mandatory account registration with long passwords before purchase is a leading cause of checkout friction and cart abandonment",
          "Guest checkout makes products 50% cheaper",
          "Guest checkout is required by international maritime law",
          "Guest checkout prevents credit card fraud"
        ],
        "correct_option_index": 0,
        "explanation": "Eliminating mandatory registration barriers streamlines checkout flow, reducing cognitive friction and capturing sales from time-constrained buyers."
      },
      {
        "id": "ec_7",
        "question_number": 7,
        "topic": "Inventory Management",
        "question_text": "How is the Inventory Turnover Ratio calculated, and what does a high ratio signify?",
        "options": [
          "$\\text{Turnover} = \\frac{\\text{Cost of Goods Sold (COGS)}}{\\text{Average Inventory}}$; a high ratio indicates strong sales velocity and efficient capital utilization with low holding costs",
          "$\\text{Turnover} = \\text{Total Warehouse Area} \\div \\text{Number of Boxes}$",
          "$\\text{Turnover} = \\text{Units Sold} \\times 365$",
          "$\\text{Turnover} = \\text{Defective Items} \\div \\text{Total Items}$"
        ],
        "correct_option_index": 0,
        "explanation": "Inventory turnover measures how many times inventory is sold and replaced over a year; higher turnover indicates strong product demand and reduced deadstock holding risk."
      },
      {
        "id": "ec_8",
        "question_number": 8,
        "topic": "Logistics & Fulfillment",
        "question_text": "What is a Third-Party Logistics (3PL) provider responsible for in an e-commerce brand's supply chain?",
        "options": [
          "Outsourced warehousing, inventory receiving, automated pick-and-pack fulfillment, and carrier shipping coordination",
          "Designing the brand's logo and website theme",
          "Filing corporate intellectual property patents",
          "Managing the company's social media accounts"
        ],
        "correct_option_index": 0,
        "explanation": "3PL fulfillment partners manage warehouse infrastructure, automated order routing, inventory storage, and courier handoffs, allowing brands to scale shipping operations seamlessly."
      },
      {
        "id": "ec_9",
        "question_number": 9,
        "topic": "RTO (Return to Origin)",
        "question_text": "In Indian e-commerce with Cash on Delivery (COD) orders, what is Return to Origin (RTO) and how can it be mitigated?",
        "options": [
          "Undelivered orders returned to the seller; mitigated by automated OTP order confirmation, address verification APIs, and pre-payment discounts (UPI incentives)",
          "Products that customers keep forever without paying",
          "Tax refunds from the government",
          "Warehouse inventory stolen by employees"
        ],
        "correct_option_index": 0,
        "explanation": "RTO generates double shipping costs and locked inventory; brands reduce COD failures using automated WhatsApp confirmations, address validation, and instant UPI discounts."
      },
      {
        "id": "ec_10",
        "question_number": 10,
        "topic": "E-Commerce Tech Stacks",
        "question_text": "When should a high-scale retail brand consider a 'Headless E-Commerce' architecture (e.g. Shopify backend with custom Next.js frontend)?",
        "options": [
          "When they require complete frontend UI customization, lightning-fast web performance, and omnichannel content distribution across web, mobile apps, and IoT devices",
          "When they have zero software developers on their team",
          "When they want to eliminate credit card processing",
          "When their store has only 1 product"
        ],
        "correct_option_index": 0,
        "explanation": "Headless architecture decouples the frontend presentation layer from backend commerce logic via APIs, enabling bespoke user experiences and superior page speed."
      },
      {
        "id": "ec_11",
        "question_number": 11,
        "topic": "Payment Gateway Economics",
        "question_text": "What is the primary factor affecting Payment Success Rates on e-commerce checkouts in emerging markets?",
        "options": [
          "Frictionless support for popular local payment methods (UPI auto-switch, dynamic QR codes, stored cards, net banking, BNPL) with smart fallback payment routing",
          "The color of the checkout page header",
          "Using foreign currency conversions on domestic orders",
          "Disabling mobile responsive checkout"
        ],
        "correct_option_index": 0,
        "explanation": "Seamless native payment integrations and intelligent multi-gateway failover routing prevent payment drop-offs caused by bank downtime and OTP timeouts."
      },
      {
        "id": "ec_12",
        "question_number": 12,
        "topic": "Customer Retention & Loyalty",
        "question_text": "Why are Tiered VIP Loyalty Programs (e.g. Bronze, Silver, Gold with exclusive perks) highly effective in D2C retail?",
        "options": [
          "They gamify repeat purchases, increase customer switching costs, and significantly boost customer Lifetime Value (LTV) through status rewards",
          "They allow brands to stop shipping orders",
          "They replace customer support teams",
          "They make all products free for everyone"
        ],
        "correct_option_index": 0,
        "explanation": "Loyalty programs incentivize repeat transaction behavior and emotional brand affinity, turning one-time buyers into high-LTV repeat advocates."
      },
      {
        "id": "ec_13",
        "question_number": 13,
        "topic": "Cross-Border E-Commerce",
        "question_text": "What is 'DDP' (Delivered Duty Paid) in international cross-border e-commerce shipping?",
        "options": [
          "The seller assumes all responsibility, shipping costs, import duties, and customs taxes upfront so the international customer experiences zero surprise fees at delivery",
          "The customer must fly to the seller's country to pick up the package",
          "The postal service pays for the product",
          "Customs destroys the package after 3 days"
        ],
        "correct_option_index": 0,
        "explanation": "DDP shipping eliminates unexpected customs fees at the customer's doorstep, improving international checkout conversion and satisfaction."
      },
      {
        "id": "ec_14",
        "question_number": 14,
        "topic": "Omnichannel Commerce",
        "question_text": "What defines an effective 'Omnichannel' retail strategy?",
        "options": [
          "Providing a unified, synchronized customer experience across physical retail stores, online website, mobile app, and social marketplaces (e.g. Click-and-Collect / BOPIS)",
          "Selling only through physical wholesale distributors",
          "Running television ads once a year",
          "Deleting the company website after opening a retail store"
        ],
        "correct_option_index": 0,
        "explanation": "Omnichannel integrates inventory, customer loyalty, and order fulfillment across online and offline channels, allowing seamless cross-channel shopping journeys."
      },
      {
        "id": "ec_15",
        "question_number": 15,
        "topic": "Customer Review Verification",
        "question_text": "Why do leading online brands actively incentivize User-Generated Content (UGC) photo and video reviews on product pages?",
        "options": [
          "Authentic visual proof from real peers acts as powerful social validation, overcoming buyer skepticism and dramatically lifting checkout conversion rates",
          "To fill empty space on the web page",
          "To avoid paying product photographers",
          "Because search engines penalize text-only reviews"
        ],
        "correct_option_index": 0,
        "explanation": "UGC photos and verified customer testimonials provide authentic visual validation of quality, fit, and appearance, significantly reducing pre-purchase hesitation."
      }
    ]
  },
  {
    "id": "campus-placement-aptitude-reasoning",
    "slug": "campus-placement-aptitude-reasoning",
    "title": "Campus Placement Aptitude & Reasoning",
    "category_id": "growth-career",
    "category_name": "Marketing, Design & Career",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Aptitude",
      "Logical Reasoning",
      "Quantitative",
      "Placement Prep",
      "Problem Solving",
      "Verbal"
    ],
    "description": "Assess your readiness for campus recruitment screening tests across quantitative mathematics, logical puzzles, data interpretation, and verbal problem solving.",
    "questions": [
      {
        "id": "apt_1",
        "question_number": 1,
        "topic": "Percentages & Profit/Loss",
        "question_text": "An item is purchased for Rs. 800 and sold for Rs. 1,000. What is the profit percentage?",
        "options": [
          "$25.0\\%$",
          "$20.0\\%$",
          "$15.0\\%$",
          "$30.0\\%$"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Profit} = 1000 - 800 = 200$. $\\text{Profit \\%} = (\\text{Profit} / \\text{Cost Price}) \\times 100\\% = (200 / 800) \\times 100\\% = 25\\%$."
      },
      {
        "id": "apt_2",
        "question_number": 2,
        "topic": "Ratios & Proportions",
        "question_text": "If the ratio of two numbers $A:B$ is $3:5$ and their sum is $240$, what is the value of number $B$?",
        "options": [
          "$150$",
          "$90$",
          "$120$",
          "$160$"
        ],
        "correct_option_index": 0,
        "explanation": "Total ratio parts $= 3 + 5 = 8$. One part $= 240 / 8 = 30$. Therefore, $B = 5 \\times 30 = 150$."
      },
      {
        "id": "apt_3",
        "question_number": 3,
        "topic": "Time & Work",
        "question_text": "Worker A can complete a task in 12 days, and Worker B can complete the same task in 24 days. Working together, how many days will they take to finish the task?",
        "options": [
          "8 Days",
          "6 Days",
          "18 Days",
          "10 Days"
        ],
        "correct_option_index": 0,
        "explanation": "Combined 1-day work $= 1/12 + 1/24 = (2 + 1)/24 = 3/24 = 1/8$. Total days required $= 8$ days."
      },
      {
        "id": "apt_4",
        "question_number": 4,
        "topic": "Time, Speed & Distance",
        "question_text": "A train traveling at a uniform speed of 72 km/h crosses a static pole in 15 seconds. What is the length of the train?",
        "options": [
          "300 meters",
          "250 meters",
          "400 meters",
          "150 meters"
        ],
        "correct_option_index": 0,
        "explanation": "Speed in m/s $= 72 \\times (5/18) = 20 \\text{ m/s}$. $\\text{Distance (Length)} = \\text{Speed} \\times \\text{Time} = 20 \\times 15 = 300 \\text{ meters}$."
      },
      {
        "id": "apt_5",
        "question_number": 5,
        "topic": "Simple Interest",
        "question_text": "What is the Simple Interest earned on a principal sum of Rs. 10,000 invested at an annual interest rate of 8% for a period of 3 years?",
        "options": [
          "Rs. 2,400",
          "Rs. 2,597",
          "Rs. 1,800",
          "Rs. 3,200"
        ],
        "correct_option_index": 0,
        "explanation": "$\\text{Simple Interest} = (P \\times R \\times T) / 100 = (10,000 \\times 8 \\times 3) / 100 = \\text{Rs. } 2,400$."
      },
      {
        "id": "apt_6",
        "question_number": 6,
        "topic": "Probability",
        "question_text": "Two standard six-sided dice are rolled simultaneously. What is the probability that the sum of the numbers shown on top is equal to 7?",
        "options": [
          "$1/6$",
          "$1/12$",
          "$7/36$",
          "$1/4$"
        ],
        "correct_option_index": 0,
        "explanation": "Total outcomes $= 36$. Outcomes summing to 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6$ pairs. Probability $= 6/36 = 1/6$."
      },
      {
        "id": "apt_7",
        "question_number": 7,
        "topic": "Number Series Reasoning",
        "question_text": "Find the next missing number in the sequence: $3, 7, 15, 31, 63, \\,?$",
        "options": [
          "$127$",
          "$126$",
          "$128$",
          "$95$"
        ],
        "correct_option_index": 0,
        "explanation": "The pattern is $x_{n+1} = (x_n \\times 2) + 1$: $3\\times 2+1=7$, $7\\times 2+1=15$, $15\\times 2+1=31$, $31\\times 2+1=63$, $63\\times 2+1=127$."
      },
      {
        "id": "apt_8",
        "question_number": 8,
        "topic": "Blood Relations",
        "question_text": "Pointing to a photograph of a boy, Suresh says, 'He is the only son of my mother.' How is Suresh related to the boy if Suresh is an only child?",
        "options": [
          "Father",
          "Brother",
          "Uncle",
          "Cousin"
        ],
        "correct_option_index": 0,
        "explanation": "Suresh's mother's only son is Suresh himself (since he has no brothers). Therefore, the boy is Suresh's son, making Suresh the boy's father."
      },
      {
        "id": "apt_9",
        "question_number": 9,
        "topic": "Direction Sense",
        "question_text": "A person walks 10 km North, turns right and walks 6 km, then turns right again and walks 10 km. In which direction and at what distance are they from their starting point?",
        "options": [
          "6 km East",
          "6 km West",
          "10 km North",
          "0 km (Back at start)"
        ],
        "correct_option_index": 0,
        "explanation": "Moving 10 km North, 6 km East, and 10 km South cancels out the North-South movement, leaving the person exactly 6 km East of the origin."
      },
      {
        "id": "apt_10",
        "question_number": 10,
        "topic": "Linear Seating Arrangement",
        "question_text": "Five friends P, Q, R, S, and T sit in a row facing North. S is between T and Q. Q is to the immediate left of R. P is to the immediate left of T. Who sits in the exact middle?",
        "options": [
          "S",
          "T",
          "Q",
          "P"
        ],
        "correct_option_index": 0,
        "explanation": "The arrangement from left to right is: P, T, S, Q, R. S sits in the middle position."
      },
      {
        "id": "apt_11",
        "question_number": 11,
        "topic": "Syllogisms (Deductive Logic)",
        "question_text": "Statements: 1. All cats are mammals. 2. All mammals are animals. Conclusion: Which conclusion is strictly valid?",
        "options": [
          "All cats are animals",
          "All animals are cats",
          "No cats are animals",
          "Some cats are not mammals"
        ],
        "correct_option_index": 0,
        "explanation": "By transitive subset logic: $\\text{Cats} \\subseteq \\text{Mammals} \\subseteq \\text{Animals}$, confirming that all cats are necessarily animals."
      },
      {
        "id": "apt_12",
        "question_number": 12,
        "topic": "Coding-Decoding",
        "question_text": "In a certain code language, if `EARTH` is coded as `FBUUI`, how will `VENUS` be coded following the identical rule?",
        "options": [
          "`WFOWT`",
          "`WFOVT`",
          "`UEOTR`",
          "`VGOWT`"
        ],
        "correct_option_index": 0,
        "explanation": "Each letter is shifted forward by $+1$ in the alphabet: $V\\rightarrow W, E\\rightarrow F, N\\rightarrow O, U\\rightarrow V, S\\rightarrow T$ (`WFOWT`)."
      },
      {
        "id": "apt_13",
        "question_number": 13,
        "topic": "Data Interpretation",
        "question_text": "In a college department pie chart representing 1,200 students, the Computer Science sector has a central angle of $108^\\circ$. How many students are enrolled in Computer Science?",
        "options": [
          "$360$",
          "$300$",
          "$420$",
          "$240$"
        ],
        "correct_option_index": 0,
        "explanation": "A complete circle is $360^\\circ$. Proportion $= 108^\\circ / 360^\\circ = 0.30$ (or $30\\%$). $\\text{Students} = 1,200 \\times 0.30 = 360$ students."
      },
      {
        "id": "apt_14",
        "question_number": 14,
        "topic": "Verbal Sentence Correction",
        "question_text": "Identify the grammatically correct sentence adhering to standard subject-verb agreement rules:",
        "options": [
          "The team of software engineers is deploying the production release today.",
          "The team of software engineers are deploying the production release today.",
          "The team of software engineers have deployed the production release today.",
          "The team of software engineers were deploying the production release today."
        ],
        "correct_option_index": 0,
        "explanation": "The collective subject noun 'team' is singular; prepositional phrase 'of software engineers' does not change the singular verb requirement ('is deploying')."
      },
      {
        "id": "apt_15",
        "question_number": 15,
        "topic": "Critical Reasoning",
        "question_text": "Which assumption must be true for the statement: 'Company X implemented flexible remote work, causing quarterly employee turnover to decline by 40%'?",
        "options": [
          "Flexible remote work was a significant factor contributing to employee retention at Company X",
          "All other companies in the city shut down",
          "Company X doubled all employee salaries at the same time",
          "Employees no longer need to work"
        ],
        "correct_option_index": 0,
        "explanation": "The claim directly assumes a positive causal relationship between the introduction of remote work flexibility and improved employee retention."
      }
    ]
  },
  {
    "id": "business-communication-workplace-skills",
    "slug": "business-communication-workplace-skills",
    "title": "Business Communication & Workplace Skills",
    "category_id": "growth-career",
    "category_name": "Marketing, Design & Career",
    "duration_minutes": 15,
    "total_questions": 15,
    "passing_percentage": 60,
    "tags": [
      "Business Communication",
      "Email Etiquette",
      "Workplace Skills",
      "Active Listening",
      "Negotiation",
      "Interview Skills"
    ],
    "description": "Benchmark your workplace communication readiness across business email etiquette, active listening, cross-functional collaboration, conflict resolution, and behavioral interview methods.",
    "questions": [
      {
        "id": "bc_1",
        "question_number": 1,
        "topic": "Communication Foundations",
        "question_text": "What are the recognized '7 Cs of Effective Business Communication'?",
        "options": [
          "Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous",
          "Complex, Clever, Casual, Constant, Creative, Colorful, and Critical",
          "Commanding, Controlled, Certified, Closed, Cautious, Central, and Calm",
          "Corporate, Commercial, Contractual, Capital, Compliant, Certified, and Clear"
        ],
        "correct_option_index": 0,
        "explanation": "The 7 Cs provide a universal framework for professional communication, ensuring messages are clear, brief, evidence-grounded, error-free, and respectful."
      },
      {
        "id": "bc_2",
        "question_number": 2,
        "topic": "Active Listening",
        "question_text": "Which behavior demonstrates 'Active Listening' during a collaborative team problem-solving meeting?",
        "options": [
          "Paraphrasing key points to confirm understanding, maintaining appropriate eye contact, and asking clarifying questions without interrupting",
          "Checking social media notifications while someone else is speaking",
          "Formulating your own counter-argument while ignoring the speaker's points",
          "Interrupting immediately after the first sentence"
        ],
        "correct_option_index": 0,
        "explanation": "Active listening focuses fully on understanding the speaker's message and underlying intent, using paraphrasing and clarifying inquiries before responding."
      },
      {
        "id": "bc_3",
        "question_number": 3,
        "topic": "Email Subject Lines",
        "question_text": "Which of the following email subject lines follows corporate professional best practices?",
        "options": [
          "[Action Required] Q3 Marketing Budget Proposal - Review by Thursday 5 PM",
          "URGENT PLEASE READ THIS RIGHT NOW!!!!!!",
          "Hey",
          "Question about the thing we discussed earlier"
        ],
        "correct_option_index": 0,
        "explanation": "Effective business subject lines state the action status, project topic, and explicit deadline clearly, facilitating rapid prioritization by recipients."
      },
      {
        "id": "bc_4",
        "question_number": 4,
        "topic": "Email Etiquette (CC vs BCC)",
        "question_text": "When should the 'BCC' (Blind Carbon Copy) field be used in professional corporate email communication?",
        "options": [
          "When sending a mass announcement to external clients or large candidate lists to protect individual recipient email privacy and prevent accidental 'Reply-All' storms",
          "To secretly insult colleagues without their knowledge",
          "On all daily team check-in emails",
          "When submitting your annual resignation letter"
        ],
        "correct_option_index": 0,
        "explanation": "BCC conceals individual email addresses from public view in mass distributions, preserving privacy and eliminating disruptive 'Reply-All' reply loops."
      },
      {
        "id": "bc_5",
        "question_number": 5,
        "topic": "Constructive Feedback (SBI Model)",
        "question_text": "What three components make up the SBI (Situation-Behavior-Impact) feedback delivery model?",
        "options": [
          "Describing the specific Situation (when/where), the observable Behavior (what happened), and the concrete Impact on the project or team",
          "Salary, Bonus, and Incentive",
          "Software, Backend, and Infrastructure",
          "Summary, Briefing, and Inspection"
        ],
        "correct_option_index": 0,
        "explanation": "The SBI model grounds feedback in objective, non-judgmental facts: anchoring to a specific event, describing concrete observable actions, and detailing the resulting operational effect."
      },
      {
        "id": "bc_6",
        "question_number": 6,
        "topic": "Conflict Resolution",
        "question_text": "According to the Thomas-Kilmann Conflict Mode Instrument, which approach seeks a 'Win-Win' solution where both parties' underlying concerns are fully addressed?",
        "options": [
          "Collaborating Mode",
          "Avoiding Mode",
          "Competing (Forcing) Mode",
          "Accommodating Mode"
        ],
        "correct_option_index": 0,
        "explanation": "Collaboration pairs high assertiveness with high cooperativeness, exploring root concerns to construct integrative solutions satisfying both parties."
      },
      {
        "id": "bc_7",
        "question_number": 7,
        "topic": "Meeting Governance (MoM)",
        "question_text": "Why is it mandatory to document and distribute Minutes of Meeting (MoM) within 24 hours of an executive decision meeting?",
        "options": [
          "To provide a clear written record of agreed decisions, assigned Action Items with designated individual owners, and specific completion deadlines",
          "To rate which employee spoke the most words",
          "To convert the meeting recording into an audio podcast",
          "To cancel all future company meetings"
        ],
        "correct_option_index": 0,
        "explanation": "Minutes of Meeting establish alignment and operational accountability, documenting decisions, task assignments, responsible owners, and target completion dates."
      },
      {
        "id": "bc_8",
        "question_number": 8,
        "topic": "Executive Presentation Design",
        "question_text": "When presenting analytical data findings to senior executive stakeholders, how should slide presentations be structured?",
        "options": [
          "Bottom-Line-Up-Front (BLUF): State the core recommendation and business impact first, followed by supporting data evidence and risk mitigations",
          "Hide the conclusion until the final 60 seconds of the presentation",
          "Fill every slide with 50 lines of unformatted text",
          "Read slides word-for-word without looking at the audience"
        ],
        "correct_option_index": 0,
        "explanation": "Executive communication values brevity: leading with the strategic outcome and recommendation (BLUF) respects time constraints and frames the subsequent supporting evidence."
      },
      {
        "id": "bc_9",
        "question_number": 9,
        "topic": "Asynchronous Communication",
        "question_text": "What is an effective practice for team collaboration across remote and distributed time zones using tools like Slack or Teams?",
        "options": [
          "Writing comprehensive, self-contained messages with full context, links, and clear next steps, allowing colleagues to respond thoughtfully on their own schedule without requiring immediate sync calls",
          "Sending 'Hi' and waiting 30 minutes for a response before typing the question",
          "Calling team members at 2:00 AM on their personal phones",
          "Demanding instant responses within 10 seconds to all messages"
        ],
        "correct_option_index": 0,
        "explanation": "Asynchronous communication provides complete self-contained context and clear action calls upfront, fostering productive deep work without constant interruption."
      },
      {
        "id": "bc_10",
        "question_number": 10,
        "topic": "Assertiveness in Negotiation",
        "question_text": "How does 'Assertive' communication differ from 'Aggressive' or 'Passive' communication styles?",
        "options": [
          "Assertive communication expresses one's needs, boundaries, and opinions clearly, directly, and respectfully while actively valuing and listening to the rights of others",
          "Assertive communication involves shouting louder than anyone else",
          "Assertive communication means agreeing with everything to avoid conflict",
          "Assertive communication ignores all team feedback"
        ],
        "correct_option_index": 0,
        "explanation": "Assertiveness strikes the healthy balance: standing firm on boundaries and values with clear, respectful dialogue without becoming hostile (aggressive) or submissive (passive)."
      },
      {
        "id": "bc_11",
        "question_number": 11,
        "topic": "Video Conference Etiquette",
        "question_text": "What is the standard professional etiquette regarding microphone management on large virtual conference calls (e.g. Zoom / Google Meet)?",
        "options": [
          "Keep your microphone muted by default when not speaking to eliminate background ambient noise, unmuting only when contributing to the discussion",
          "Leave the microphone unmuted while having conversations with family members",
          "Play loud music in the background to keep the team energized",
          "Never turn on your computer screen"
        ],
        "correct_option_index": 0,
        "explanation": "Muting microphones by default prevents background noise, typing interference, and echo feedback, ensuring crisp audio clarity for active speakers."
      },
      {
        "id": "bc_12",
        "question_number": 12,
        "topic": "Handling Client Escalations",
        "question_text": "When an enterprise client calls with an angry complaint regarding a service outage, what is the best initial de-escalation response?",
        "options": [
          "Listen actively without interrupting, express genuine professional empathy for the business disruption, take ownership, and outline clear immediate action steps toward resolution",
          "Blame another department and hang up the phone",
          "Argue with the client and tell them they are overreacting",
          "Promise a full refund before investigating the issue"
        ],
        "correct_option_index": 0,
        "explanation": "De-escalation requires validating customer frustration with empathy, taking accountability on behalf of the company, and presenting a concrete remediation roadmap."
      },
      {
        "id": "bc_13",
        "question_number": 13,
        "topic": "Time Management (Eisenhower Matrix)",
        "question_text": "According to the Eisenhower Decision Matrix, how should tasks that are 'Important but Not Urgent' (e.g. long-term skill development, strategic planning, relationship building) be handled?",
        "options": [
          "Schedule dedicated, non-negotiable calendar time to execute them proactively before they turn into urgent crises",
          "Delegate them immediately to random colleagues",
          "Delete them and never do them",
          "Spend 100% of your day only on urgent trivial tasks"
        ],
        "correct_option_index": 0,
        "explanation": "Quadrant II (Important, Not Urgent) tasks drive long-term strategic growth and career mastery; they must be proactively scheduled to prevent constant reactive firefighting."
      },
      {
        "id": "bc_14",
        "question_number": 14,
        "topic": "Behavioral Interviews (STAR Method)",
        "question_text": "When answering behavioral interview questions (e.g., 'Describe a time you resolved a major team conflict'), what does the STAR method stand for?",
        "options": [
          "Situation (Context), Task (Objective/Challenge), Action (Your specific steps), and Result (Measurable outcome achieved)",
          "Speaking, Talking, Arguing, and Rehearsing",
          "Skills, Training, Academics, and References",
          "Strategy, Timing, Advertising, and Revenue"
        ],
        "correct_option_index": 0,
        "explanation": "The STAR method structures behavioral responses with storytelling clarity: setting the context (Situation/Task), highlighting your personal contribution (Action), and quantifying positive impact (Result)."
      },
      {
        "id": "bc_15",
        "question_number": 15,
        "topic": "Cross-Cultural Sensitivity",
        "question_text": "In global multinational corporations, why is cross-cultural communication sensitivity essential for business success?",
        "options": [
          "It prevents misunderstandings caused by differing cultural norms regarding directness, hierarchy, feedback styles, and time orientation, fostering inclusive team trust",
          "It mandates that all international employees speak only one global dialect",
          "It eliminates all cultural differences across countries",
          "It replaces business contracts with handshake agreements"
        ],
        "correct_option_index": 0,
        "explanation": "Cross-cultural awareness appreciates differences in high-context vs low-context communication and egalitarian vs hierarchical leadership, ensuring effective international team collaboration."
      }
    ]
  }
];

/**
 * Lookup helper to retrieve assessment by ID or slug
 * Checks static catalog first, then user-created custom assessments in localStorage
 * 
 * @param {string} idOrSlug - Assessment id or url slug
 * @returns {object|null}
 */
export function getAssessmentById(idOrSlug) {
  const staticFound = assessmentsList.find(
    (a) => a.id === idOrSlug || a.slug === idOrSlug
  );
  if (staticFound) return staticFound;

  if (typeof window !== "undefined") {
    try {
      const customList = JSON.parse(localStorage.getItem("campussutras_custom_assessments") || "[]");
      const customFound = customList.find(
        (a) => a.id === idOrSlug || a.slug === idOrSlug
      );
      if (customFound) return customFound;
    } catch (e) {}
  }

  return null;
}
