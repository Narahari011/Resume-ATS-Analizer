exports.chat = async (req, res) => {
  try {
    const { messages, system } = req.body;

    console.log("CO KEY:", process.env.CO_API_KEY ? "✅ Found" : "❌ Missing");

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "USER" : "CHATBOT",
      message: msg.content,
    }));

    const lastMessage = messages[messages.length - 1].content;

    const response = await fetch("https://api.cohere.com/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "command-r-plus-08-2024",
        message: lastMessage,
        chat_history: chatHistory,
        preamble: system,
      }),
    });

    const data = await response.json();

    if (data.message) {
      console.error("Cohere error:", data.message);
      return res.status(500).json({ error: data.message });
    }

    const reply = data.text || "Sorry, no response.";
    res.json({ content: [{ text: reply }] });

  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};