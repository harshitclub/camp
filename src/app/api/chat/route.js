import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/chatbotKnowledge";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  "";

const FALLBACK_RESPONSE = `Welcome to Campussutras Private Limited (Academic Desk).

Here are direct links to explore our official programs:
- 12 Industry Bootcamps: https://campussutras.com/courses
- Free Skill Diagnostics: https://campussutras.com/assessments
- Project Internships: https://campussutras.com/internship
- Certificate Verification: https://campussutras.com/verify-certificate
- Contact Desk: https://campussutras.com/contact
- Privacy Policy: https://campussutras.com/privacy-and-policy
- Terms & Conditions: https://campussutras.com/terms-and-conditions

Admissions & Support: info@campussutras.com
Contact Person: Raju Kumar (raju.kumar@campussutras.com)
Office: Noida, Uttar Pradesh, India`;

// Guardrail patterns to intercept prompt injection, API key probing, and jailbreak attempts
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /(reveal|leak|print|show|output|dump|repeat)\s+(the\s+)?(system\s+prompt|developer\s+prompt|system\s+instructions)/i,
  /what\s+(is|are)\s+your\s+(system\s+prompt|hidden\s+prompt|system\s+instructions)/i,
  /api[_\s-]?key/i,
  /\b(jailbreak|dan\s+mode|unrestricted\s+ai|developer\s+mode)\b/i,
  /repeat\s+everything\s+above/i,
];

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    const rawMessages = body?.messages || [];

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!apiKey) {
      return new Response(FALLBACK_RESPONSE, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Google Gemini strictly requires conversation to start with a 'user' message.
    // Sanitize payload to protect against token-bombing: max 1000 chars per message, last 8 messages.
    const cleanMessages = [];
    for (const msg of rawMessages.slice(-8)) {
      const text = (msg.content || "").trim().slice(0, 1000);
      if (!text) continue;

      // Skip leading non-user messages
      if (cleanMessages.length === 0 && msg.role !== "user") {
        continue;
      }

      cleanMessages.push({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: text,
      });
    }

    if (cleanMessages.length === 0) {
      return new Response(
        "How may I assist you with Campussutras technical bootcamps, internships, or certifications today?",
        {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }
      );
    }

    // Intercept prompt injection and API abuse attempts without calling external LLM API
    const latestUserQuery = cleanMessages[cleanMessages.length - 1]?.content || "";
    if (INJECTION_PATTERNS.some((pat) => pat.test(latestUserQuery))) {
      return new Response(
        "I am the Campussutras Academic Counselor, dedicated to guiding you through our technical bootcamps, internships, skill assessments, and certificate verification. How may I assist your career path today?",
        {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }
      );
    }

    // Primary Engine: Vercel AI SDK with gemini-flash-lite-latest (fastest & high availability)
    try {
      const google = createGoogleGenerativeAI({ apiKey });
      const result = streamText({
        model: google("gemini-flash-lite-latest"),
        system: CHATBOT_SYSTEM_PROMPT,
        messages: cleanMessages,
        temperature: 0.6,
        maxTokens: 800,
      });

      return result.toTextStreamResponse();
    } catch (aiSdkErr) {
      console.warn(
        "[Chatbot] Primary streamText notice, trying secondary fallback:",
        aiSdkErr?.message
      );

      // Secondary Resilient Engine: Direct Google Generative AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-lite-latest",
        systemInstruction: CHATBOT_SYSTEM_PROMPT,
      });

      const userQuery = cleanMessages[cleanMessages.length - 1].content;
      const history = cleanMessages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      try {
        const chat = model.startChat({ history });
        const streamResult = await chat.sendMessageStream(userQuery);

        const encoder = new TextEncoder();
        const customStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of streamResult.stream) {
                const text = chunk.text();
                if (text) controller.enqueue(encoder.encode(text));
              }
            } catch (e) {
              console.error("Direct stream chunk error:", e);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(customStream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      } catch (streamErr) {
        console.warn(
          "[Chatbot] Direct stream error, falling back to non-streaming content:",
          streamErr?.message
        );
        const res = await model.generateContent(userQuery);
        const text = res.response.text();
        return new Response(text || FALLBACK_RESPONSE, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    }
  } catch (err) {
    console.error("[Chatbot API Fatal Error]:", err);
    return new Response(FALLBACK_RESPONSE, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
