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
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I'm having trouble connecting to the BAI server. Please try again in a few moments.",
        },
      ]);
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
                  <span className="online-tag">Ready to help</span>
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
