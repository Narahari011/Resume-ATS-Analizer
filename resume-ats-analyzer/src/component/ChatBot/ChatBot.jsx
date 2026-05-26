import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const QUICK_PROMPTS = [
  { icon: "🔍", text: "What skills am I missing?" },
  { icon: "📈", text: "How can I improve my resume score?" },
  { icon: "💡", text: "Give me project ideas for frontend developer jobs" },
  { icon: "🔑", text: "Suggest keywords for React developer roles" },
  { icon: "✍️", text: "Rewrite my resume summary" },
  { icon: "🎯", text: "How should I answer interview questions?" },
];

const SYSTEM_PROMPT = `You are an expert resume analyzer and career coach assistant for a platform called Resume ATS.
You help users improve their resumes, identify skill gaps, suggest projects, recommend keywords, and prepare for interviews.
Give concise, actionable, and friendly advice. Use bullet points or numbered lists when helpful.`;

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const newUserMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, newUserMsg];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: updatedMessages,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const botText = data?.content?.[0]?.text || "Sorry, I could not get a response.";

      setMessages((prev) => [...prev, { role: "assistant", content: botText }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Server connect అవ్వలేదు. Backend run అవుతుందా check చేయండి." },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="cb-wrapper">
      <div className="cb-header">
        <div className="cb-header-left">
          <div className="cb-avatar">N</div>
          <div>
            <h1 className="cb-title">Hello, Narahari</h1>
            <p className="cb-subtitle">Resume AI Assistant</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button className="cb-clear-btn" onClick={() => setMessages([])}>🗑 Clear</button>
        )}
      </div>

      {messages.length === 0 && (
        <div className="cb-prompts-section">
          <p className="cb-prompts-label">Quick questions</p>
          <div className="cb-prompts-grid">
            {QUICK_PROMPTS.map((p, i) => (
              <button key={i} className="cb-prompt-card" onClick={() => sendMessage(p.text)}>
                <span className="cb-prompt-icon">{p.icon}</span>
                <span className="cb-prompt-text">{p.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="cb-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`cb-message cb-message--${msg.role === "user" ? "user" : "bot"}`}>
            {msg.role === "assistant" && <div className="cb-bot-icon">✦</div>}
            <div className="cb-bubble">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="cb-message cb-message--bot">
            <div className="cb-bot-icon">✦</div>
            <div className="cb-bubble cb-typing"><span /><span /><span /></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="cb-input-area">
        <div className="cb-input-box">
          <textarea
            ref={inputRef}
            className="cb-textarea"
            placeholder="Ask anything about your resume..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            rows={1}
            disabled={isLoading}
          />
          <div className="cb-input-actions">
            <span className="cb-mic-btn">🎤</span>
            <button
              className={`cb-send-btn ${input.trim() ? "cb-send-btn--active" : ""}`}
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
            >↑</button>
          </div>
        </div>
        <p className="cb-hint">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}