import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots, FaSyncAlt, FaCopy, FaCheck, FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import "./AIChatbot.css";

// Retrieve API base dynamically
const isLocalFrontend = typeof window !== "undefined"
  && ["localhost", "127.0.0.1"].includes(window.location.hostname)
  && window.location.port === "5173";

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (isLocalFrontend ? `http://${window.location.hostname}:8000/api` : "/api");

const INITIAL_MESSAGE = {
  sender: "bot",
  text: "Namaste! I can help you explore BAI Pune Centre's history, leadership, membership, and industry resources.",
};

const DEFAULT_SUGGESTIONS = [
  "How do I become a member?",
  "Tell me about the WBSC Awards",
  "What events does BAI Pune Centre organize?",
  "How can I rent machinery on Wheeling & Dealing?",
];

const getFallbackReply = (query) => {
  const q = query.toLowerCase();
  if (q.includes("founded") || q.includes("history") || q.includes("1941") || q.includes("start") || q.includes("jackson")) {
    return "🏗️ BAI Pune Centre History & Foundation\n\nBuilders Association of India was founded in 1941 in Pune, under the guidance of Brig. C.V.S. Jackson of the Military Engineering Services (MES). It started with 250 members across 3 regional centres. This is BAI Pune Centre — the Mother Centre, based right where the historical 'Jackson Hut' office stands in Pune.";
  }
  if (q.includes("chairman") || q.includes("president") || q.includes("gujar") || q.includes("ajay") || q.includes("leader") || q.includes("vice chairman") || q.includes("secretary") || q.includes("treasurer") || q.includes("governing")) {
    return "👤 BAI Pune Centre Governing Council 2026-27\n\n- **Chairman**: Shri Ajay Gujar\n- **Vice Chairman**: Shri Rajaram Hajare\n- **Secretary**: Shri Mahesh Rathi\n- **Jt. Secretary**: Shri Sanjay Apte\n- **Treasurer**: Shri Sushil Agarwal";
  }
  if (q.includes("wbsc") || q.includes("well built structure") || q.includes("award") || q.includes("competition") || q.includes("shirke")) {
    return "🏆 WBSC Awards — Well Built Structure Competition\n\nNow in its 30th edition, WBSC is BAI Pune Centre's flagship recognition programme celebrating construction excellence across categories like Residential, Commercial, Infrastructure and more. Visit the WBSC Awards page for entry details.";
  }
  if (q.includes("event") || q.includes("seminar") || q.includes("convention") || q.includes("workshop") || q.includes("site visit")) {
    return "📅 Events at BAI Pune Centre\n\nBAI Pune Centre regularly hosts technical seminars, workshops, industrial and technical site visits, networking meets and its annual convention. Check the Events page for upcoming dates and the event calendar.";
  }
  if (q.includes("member") || q.includes("join") || q.includes("register")) {
    return "✍️ Membership at BAI Pune Centre\n\nBAI Pune Centre welcomes builders, contractors, developers and allied professionals as members, as part of BAI's nationwide network. Categories include Life, Corporate, Associate and Student Member. You can start an application from the Membership page.";
  }
  if (q.includes("machinery") || q.includes("rent") || q.includes("jcb") || q.includes("equipment") || q.includes("wheeling")) {
    return "🚜 Machinery Exchange (Wheeling & Dealing)\n\nThrough our Wheeling & Dealing portal, BAI Pune Centre members can rent, hire, or list heavy machinery like JCB loaders, concrete pumps, road rollers, and excavators.";
  }
  if (q.includes("publication") || q.includes("journal") || q.includes("icj") || q.includes("magazine")) {
    return "📖 Indian Construction Journal (ICJ)\n\nBAI publishes the official monthly journal 'Indian Construction' featuring cost indices, steel prices, cement price trends, and legal circular updates. You can download PDF issues on our Publications page.";
  }
  if (q.includes("contact") || q.includes("address") || q.includes("office") || q.includes("location")) {
    return "📍 BAI Pune Centre Office\n\n**Address**: B.G. Shirke Activity Centre, 23, 24 & 25 \"Sangam\", Phase II, Near Sangam Bridge, Pune - 411001\n\n**Email**: bai.punecentre@gmail.com";
  }
  return "👋 Welcome to the BAI Pune Centre Assistant!\n\nI can assist you with:\n- **History**: BAI Pune Centre's 1941 founding by Brig. C.V.S. Jackson\n- **Leadership**: Chairman Shri Ajay Gujar & the Governing Council\n- **Machinery exchange**: Rent machinery on Wheeling & Dealing\n- **Publications**: Monthly Indian Construction cost indices\n\nHow can I help you build today?";
};

// Parses one SSE "data: {...}" chunk buffer, returning parsed events and any leftover partial buffer.
const parseSseBuffer = (buffer) => {
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() || "";
  const events = [];
  for (const part of parts) {
    const line = part.trim();
    if (!line.startsWith("data:")) continue;
    const jsonStr = line.slice("data:".length).trim();
    try {
      events.push(JSON.parse(jsonStr));
    } catch {
      // ignore malformed chunk
    }
  }
  return { events, remainder };
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const messagesEndRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  // Auto-scroll the chat pane only (never the page, and only while open)
  const scrollToBottom = () => {
    const pane = messagesEndRef.current?.parentElement;
    if (pane) pane.scrollTop = pane.scrollHeight;
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  const appendToken = (token) => {
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      next[next.length - 1] = { ...last, text: last.text + token };
      return next;
    });
  };

  const finishStreaming = (suggestions) => {
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      next[next.length - 1] = { ...last, streaming: false, suggestions };
      return next;
    });
  };

  const streamReply = async (msgText) => {
    const response = await fetch(`${API_BASE}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msgText }),
    });

    if (!response.ok || !response.body) {
      throw new Error("Chat stream unavailable");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let botMessageStarted = false;

    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const { events, remainder } = parseSseBuffer(buffer);
      buffer = remainder;

      for (const evt of events) {
        if (evt.token) {
          if (!botMessageStarted) {
            botMessageStarted = true;
            setIsTyping(false);
            setMessages((prev) => [...prev, { sender: "bot", text: evt.token, streaming: true }]);
          } else {
            appendToken(evt.token);
          }
        } else if (evt.done) {
          if (botMessageStarted) {
            finishStreaming(evt.suggestions || []);
          }
        }
      }
    }

    if (!botMessageStarted) {
      throw new Error("Empty chat stream");
    }
  };

  const handleSendMessage = async (textToSend) => {
    const msgText = textToSend || input.trim();
    if (!msgText) return;

    setMessages((prev) => [...prev, { sender: "user", text: msgText }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      await streamReply(msgText);
    } catch (err) {
      console.warn("Chat stream unavailable, providing instant local response:", err);
      const fallbackReply = getFallbackReply(msgText);
      setMessages((prev) => [...prev, { sender: "bot", text: fallbackReply, suggestions: DEFAULT_SUGGESTIONS }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRegenerate = (idx) => {
    const precedingUserMsg = messages[idx - 1];
    if (!precedingUserMsg || precedingUserMsg.sender !== "user") return;
    // Slice off the preceding user message too - handleSendMessage re-appends it,
    // so keeping it here would duplicate it.
    setMessages((prev) => prev.slice(0, idx - 1));
    handleSendMessage(precedingUserMsg.text);
  };

  const handleCopy = (idx, text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedIdx(idx);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedIdx(null), 1500);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const lastMessage = messages[messages.length - 1];
  const showFollowUps = messages.length > 1 && !isTyping
    && lastMessage?.sender === "bot" && !lastMessage.streaming
    && lastMessage.suggestions?.length > 0;

  return (
    <div className="ai-chatbot-wrapper">
      {/* Floating Action Button */}
      <motion.button
        className={`chatbot-float-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title={isOpen ? "Close BAI Assistant" : "Open BAI Assistant"}
        aria-label={isOpen ? "Close BAI Assistant" : "Open BAI Assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
        {!isOpen && (
          <span className="pulse-dot"></span>
        )}
      </motion.button>

      {/* Chat Drawer/Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-label="BAI AI Assistant"
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="bot-info">
                <div className="bot-avatar-badge">
                  <FaRobot />
                </div>
                <div>
                  <h4>BAI AI Assistant</h4>
                  <span className="online-tag">Online</span>
                </div>
              </div>
              <div className="header-actions">
                {messages.length > 1 && (
                  <button
                    className="clear-chat-btn"
                    onClick={handleClearChat}
                    title="Reset Conversation"
                    aria-label="Reset Conversation"
                  >
                    <FaSyncAlt />
                  </button>
                )}
                <button
                  className="close-window-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-bubble-row ${msg.sender}`}>
                  {msg.sender === "bot" && (
                    <div className="bot-bubble-icon">
                      <FaRobot />
                    </div>
                  )}
                  <div className="chat-bubble-col">
                    <div className={`chat-bubble ${msg.streaming ? "streaming" : ""}`}>
                      {msg.sender === "bot" ? (
                        <div className="markdown-content">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      ) : (
                        <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                      )}
                    </div>
                    {msg.sender === "bot" && !msg.streaming && idx > 0 && (
                      <div className="message-actions">
                        <button
                          className="message-action-btn"
                          onClick={() => handleCopy(idx, msg.text)}
                          title="Copy response"
                          aria-label="Copy response"
                        >
                          {copiedIdx === idx ? <FaCheck /> : <FaCopy />}
                        </button>
                        <button
                          className="message-action-btn"
                          onClick={() => handleRegenerate(idx)}
                          title="Regenerate response"
                          aria-label="Regenerate response"
                          disabled={isTyping}
                        >
                          <FaRedo />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble-row bot">
                  <div className="bot-bubble-icon">
                    <FaRobot />
                  </div>
                  <div className="chat-bubble typing-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Onboarding Suggestion Chips (first open only) */}
            {messages.length === 1 && !isTyping && (
              <div className="chatbot-suggestions">
                <span className="suggestions-label">Popular questions</span>
                <div className="suggestions-grid">
                  {DEFAULT_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      className="suggestion-pill"
                      onClick={() => handleSendMessage(sug)}
                    >
                      <span>{sug}</span>
                      <span className="suggestion-arrow" aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic follow-up chips after the latest bot reply */}
            {showFollowUps && (
              <div className="chatbot-suggestions followups">
                <span className="suggestions-label">Ask a follow-up</span>
                <div className="suggestions-grid">
                  {lastMessage.suggestions.map((sug) => (
                    <button
                      key={sug}
                      className="suggestion-pill"
                      onClick={() => handleSendMessage(sug)}
                    >
                      <span>{sug}</span>
                      <span className="suggestion-arrow" aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="chatbot-footer">
              <div className="chatbot-composer">
                <input
                  type="text"
                  aria-label="Message BAI AI Assistant"
                  placeholder="Ask a question about BAI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isTyping}
                />
                <button
                  className="chat-send-btn"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <span className="chatbot-disclaimer">AI responses may need verification.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbot;
