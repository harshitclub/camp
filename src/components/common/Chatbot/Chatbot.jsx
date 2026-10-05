"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import styles from "./Chatbot.module.css";
import { 
  MessageSquare, 
  X, 
  Send, 
  RotateCcw, 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  HelpCircle,
  ArrowUpRight,
  Bot,
  Sparkles
} from "lucide-react";

const INITIAL_MESSAGE = {
  id: "welcome-msg",
  role: "assistant",
  content: `Welcome to the **Campussutras Academic Desk**.

I can assist you with:
- **90-Day Bootcamps:** Full Stack, AI & Python, Data Analytics, Cloud & DevOps
- **Free Skill Diagnostics:** 30+ tests across Web, AI, Java, Python & SQL
- **Project Internships:** Hands-on industry projects & hiring eligibility
- **Credential Verification:** Instant public validation of certificates

How may I assist your career path today?`,
};

const SUGGESTIONS = [
  {
    label: "Recommend a bootcamp for me",
    icon: GraduationCap,
  },
  {
    label: "Are the skill diagnostic tests free?",
    icon: HelpCircle,
  },
  {
    label: "How to verify a certificate?",
    icon: ShieldCheck,
  },
  {
    label: "Project internship program details",
    icon: Briefcase,
  },
];

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading, scrollToBottom]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: query,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Exclude initial assistant greeting so conversation cleanly starts with user message
      const apiPayload = newMessages
        .filter((m) => m.id !== "welcome-msg")
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (!response.body) {
        const fallbackText = await response.text();
        setMessages((prev) => [
          ...prev,
          {
            id: `ast_${Date.now()}`,
            role: "assistant",
            content: fallbackText || "I received your message. How else may I assist you?",
          },
        ]);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      const assistantMsgId = `ast_${Date.now()}`;
      let hasInsertedBubble = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        if (!hasInsertedBubble && accumulatedText.trim().length > 0) {
          hasInsertedBubble = true;
          setMessages((prev) => [
            ...prev,
            { id: assistantMsgId, role: "assistant", content: accumulatedText },
          ]);
        } else if (hasInsertedBubble) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: accumulatedText } : m
            )
          );
        }
      }

      // If stream finished without any text chunks, show fallback
      if (!hasInsertedBubble && accumulatedText.trim().length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: assistantMsgId,
            role: "assistant",
            content:
              "For detailed information regarding Campussutras programs, please visit our [Courses Hub](https://campussutras.com/courses) or contact [info@campussutras.com](mailto:info@campussutras.com).",
          },
        ]);
      }
    } catch (err) {
      console.error("[Chatbot Error]:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ast_${Date.now()}`,
          role: "assistant",
          content:
            "I apologize, but I encountered a temporary network delay. Please feel free to explore our [Course Catalog](https://campussutras.com/courses) or email our admissions desk at [info@campussutras.com](mailto:info@campussutras.com).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Inline formatting helper: handles markdown links [text](url) and bold **text**
  const formatInlineText = (text, keyPrefix) => {
    if (!text) return null;

    const parts = [];
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[a-zA-Z0-9_\-\/?#=&%.:]*)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const href = match[2];
      const isExternal = href.startsWith("http://") || href.startsWith("https://");

      parts.push(
        <a
          key={`${keyPrefix}-link-${match.index}`}
          className={styles.chatLink}
          href={href}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {match[1]} <ArrowUpRight size={10} style={{ display: "inline" }} />
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Process bold syntax **text**
    return parts.map((part, pIdx) => {
      if (typeof part !== "string") return part;
      const subParts = part.split(/(\*\*[^*]+\*\*)/g);
      return subParts.map((sub, sIdx) => {
        if (sub.startsWith("**") && sub.endsWith("**")) {
          return <strong key={`${keyPrefix}-b-${pIdx}-${sIdx}`}>{sub.slice(2, -2)}</strong>;
        }
        return sub;
      });
    });
  };

  // Structured block parser: groups consecutive bullet points into <ul> tags and wraps paragraphs
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const lines = content.split("\n");
    const blocks = [];
    let currentList = null;

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const itemText = trimmed.replace(/^[-*]\s+/, "");
        if (!currentList) {
          currentList = { type: "list", items: [] };
          blocks.push(currentList);
        }
        currentList.items.push(itemText);
      } else {
        currentList = null;
        if (trimmed.length > 0) {
          blocks.push({ type: "paragraph", text: trimmed });
        }
      }
    }

    return blocks.map((block, bIdx) => {
      if (block.type === "list") {
        return (
          <ul key={`b-${bIdx}`} className={styles.chatList}>
            {block.items.map((item, itemIdx) => (
              <li key={`li-${bIdx}-${itemIdx}`} className={styles.chatListItem}>
                {formatInlineText(item, `li-${bIdx}-${itemIdx}`)}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={`b-${bIdx}`} className={styles.chatParagraph}>
          {formatInlineText(block.text, `p-${bIdx}`)}
        </p>
      );
    });
  };

  // Only render messages with non-empty text content
  const visibleMessages = messages.filter(
    (m) => m.content && m.content.trim().length > 0
  );

  // Hide the chatbot widget on all admin portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          className={styles.floatingTrigger}
          onClick={() => setIsOpen(true)}
          aria-label="Open Academic Counselor"
        >
          <div className={styles.triggerIconWrap}>
            <MessageSquare size={15} />
          </div>
          <span>Academic Counselor</span>
          <span className={styles.onlineDot} />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-modal="true">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIcon}>
                <Bot size={15} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerTitleRow}>
                  <h4 className={styles.headerTitle}>Campussutras Desk</h4>
                  <span className={styles.officialBadge}>Official</span>
                </div>
                <div className={styles.headerSubtitle}>
                  <span className={styles.statusIndicator} />
                  <span>Academic Counselor • Online</span>
                </div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset chat"
              >
                <RotateCcw size={13} />
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {visibleMessages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`${styles.messageRow} ${
                    isUser ? styles.userRow : styles.assistantRow
                  }`}
                >
                  {!isUser && (
                    <div className={styles.avatarIcon} title="Campussutras Desk">
                      <Bot size={12} />
                    </div>
                  )}
                  <div
                    className={`${styles.bubble} ${
                      isUser ? styles.userBubble : styles.assistantBubble
                    }`}
                  >
                    {renderFormattedContent(m.content)}
                  </div>
                </div>
              );
            })}

            {/* Quick Suggestions Chips (only shown on initial greeting and not while loading) */}
            {visibleMessages.length === 1 && !isLoading && (
              <div className={styles.suggestionsContainer}>
                <div className={styles.suggestionsHeader}>
                  <Sparkles size={11} className={styles.suggestionsSparkle} />
                  <span>Suggested Inquiries</span>
                </div>
                <div className={styles.suggestionsGrid}>
                  {SUGGESTIONS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={styles.suggestionBtn}
                        onClick={() => sendMessage(item.label)}
                        disabled={isLoading}
                      >
                        <div className={styles.suggestionIconWrap}>
                          <Icon size={12} />
                        </div>
                        <span className={styles.suggestionLabel}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className={styles.loadingRow}>
                <div className={styles.avatarIcon}>
                  <Bot size={12} />
                </div>
                <div className={styles.loadingBox}>
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className={styles.footerWrap}>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className={styles.chatInput}
                placeholder="Ask about bootcamps, exams, certificates..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                maxLength={500}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={13} />
              </button>
            </form>
            <div className={styles.microDisclaimer}>
              <span>Campussutras Academic AI • Verified Platform Guidance</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
