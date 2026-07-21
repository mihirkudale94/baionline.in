import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots, FaSyncAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./AIChatbot.css";

// Retrieve API base dynamically
const isLocalFrontend = typeof window !== "undefined"
  && ["localhost", "127.0.0.1"].includes(window.location.hostname)
  && window.location.port === "5173";

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (isLocalFrontend ? `http://${window.location.hostname}:8000/api` : "/api");

const INITIAL_MESSAGE = {
  sender: "bot",
  text: "Namaste! I can help you explore BAI's history, leadership, regional centres, membership, and industry resources.",
};

const getFallbackReply = (query) => {
  const q = query.toLowerCase();
  if (q.includes("founded") || q.includes("history") || q.includes("1941") || q.includes("start") || q.includes("jackson")) {
    return "🏗️ BAI History & Foundation\n\nBuilders Association of India was founded in 1941 in Pune, under the guidance of Brig. C.V.S. Jackson of the Military Engineering Services (MES). It started with 250 members across 3 regional centers. The BAI Pune Centre is located right where the historical 'Jackson Hut' office stands in Pune.";
  }
  if (q.includes("chairman") || q.includes("president") || q.includes("gujar") || q.includes("ajay") || q.includes("leader") || q.includes("vice chairman") || q.includes("secretary") || q.includes("treasurer") || q.includes("governing")) {
    return "👤 BAI Pune Governing Council 2026-27\n\n• Chairman: Shri Ajay Gujar (Chairman BAI Pune)\n• Vice Chairman: Shri Rajaram Hajare (Vice Chairman BAI Pune)\n• Secretary: Shri Mahesh Rathi (Secretary BAI Pune)\n• Jt. Secretary: Shri Sanjay Apte (Jt Secretary BAI Pune)\n• Treasurer: Shri Sushil Agarwal (Treasurer BAI Pune)";
  }
  if (q.includes("member") || q.includes("join") || q.includes("register")) {
    return "✍️ Membership Enrollment & Stats\n\nBAI represents over 25,000+ direct corporate members (construction companies, developers, contractors) and 2 Lakh+ indirect members across India. You can submit an inquiry via our About/Membership page to join.";
  }
  if (q.includes("centre") || q.includes("office") || q.includes("location") || q.includes("where")) {
    return "📍 Regional Offices & Centres\n\nBAI operates through more than 264+ city centres across India organized into Northern, Western, Southern I & II, and Eastern regions. You can view all centres on our Centres page!";
  }
  if (q.includes("machinery") || q.includes("rent") || q.includes("jcb") || q.includes("equipment") || q.includes("wheeling")) {
    return "🚜 Machinery Exchange (Wheeling & Dealing)\n\nThrough our Wheeling & Dealing portal, BAI members can rent, hire, or list heavy machinery like JCB loaders, concrete pumps, road rollers, and excavators.";
  }
  if (q.includes("publication") || q.includes("journal") || q.includes("icj") || q.includes("magazine")) {
    return "📖 Indian Construction Journal (ICJ)\n\nBAI publishes the official monthly journal 'Indian Construction' featuring cost indices, steel prices, cement price trends, and legal circular updates. You can download PDF issues on our Publications page.";
  }
  return "👋 Welcome to BAI AI Assistant!\n\nI can assist you with:\n• BAI History: Ask about our 1941 foundation by Brig. C.V.S. Jackson.\n• Leadership: Ask about Chairman Shri Ajay Gujar & Governing Council.\n• Centres: Inquire about local centers and regional office addresses.\n• Machinery exchange: Rent machinery on Wheeling & Dealing.\n• Publications: Monthly Indian Construction cost indices.\n\nHow can I help you build today?";
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll the chat pane only (never the page, and only while open)
  const scrollToBottom = () => {
    const pane = messagesEndRef.current?.parentElement;
    if (pane) pane.scrollTop = pane.scrollHeight;
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  const handleSendMessage = async (textToSend) => {
    const msgText = textToSend || input.trim();
    if (!msgText) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: msgText }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msgText }),
      });

      if (!response.ok) {
        throw new Error("Chat server error");
      }

      const data = await response.json();
      const cleanReply = (data.reply || "").replaceAll("**", "");
      setMessages((prev) => [...prev, { sender: "bot", text: cleanReply }]);
    } catch (err) {
      console.warn("Backend chat API endpoint unavailable, providing instant local response:", err);
      const fallbackReply = getFallbackReply(msgText);
      setMessages((prev) => [...prev, { sender: "bot", text: fallbackReply }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const suggestions = [
    "Tell me about BAI History",
    "Who is the current Chairman?",
    "Where is the closest Centre?",
    "How can I rent machinery?",
  ];

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
                  <div className="chat-bubble">
                    <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
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

            {/* Suggestion Chips */}
            {messages.length === 1 && !isTyping && (
              <div className="chatbot-suggestions">
                <span className="suggestions-label">Popular questions</span>
                <div className="suggestions-grid">
                  {suggestions.map((sug) => (
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
