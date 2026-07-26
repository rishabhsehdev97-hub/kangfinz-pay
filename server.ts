import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Route for Ask AI Copilot
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { prompt, userContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Smart offline / fallback responses tailored to Kangfinz Pay
      const lower = prompt.toLowerCase();
      let fallbackText = "I analyzed your Kangfinz Pay financial snapshot. You are currently saving consistently towards your Emergency Fund! Keep maintaining a 20% savings buffer each month.";
      
      if (lower.includes("spend") || lower.includes("zomato") || lower.includes("uber") || lower.includes("where")) {
        fallbackText = "Your top spending category this month is Dining & Food (₹4,850 on Zomato & restaurants), followed by Utilities & Bills (₹3,840). You saved ₹12,400 compared to last month!";
      } else if (lower.includes("afford") || lower.includes("buy") || lower.includes("15000") || lower.includes("15,000")) {
        fallbackText = "Based on your Bank Balance of ₹1,84,250 and your remaining Emergency Fund target (₹22,000), yes! You can comfortably afford a ₹15,000 purchase without interrupting your goal timeline.";
      } else if (lower.includes("goal") || lower.includes("emergency") || lower.includes("save")) {
        fallbackText = "You have saved ₹78,000 out of ₹1,00,000 (78% complete) for your Emergency Fund! Depositing just ₹733 per day for the next 30 days will reach your milestone.";
      } else if (lower.includes("invest") || lower.includes("portfolio")) {
        fallbackText = "Your current investment total is ₹3,45,000 across mutual funds and equity. Your overall portfolio yields a projected +12.4% annual growth.";
      }

      return res.json({
        reply: fallbackText,
        source: "local-intelligence"
      });
    }

    const systemInstruction = `You are Kangfinz AI, a world-class personal wealth and financial advisor embedded inside the Kangfinz Pay mobile fintech app.
User Profile context:
- Name: Rishabh
- Bank Balance: ₹1,84,250
- Cash: ₹12,500
- Wallet: ₹4,800
- Investments: ₹3,45,000
- Net Worth: ₹5,46,550
- Emergency Fund Progress: 78% (₹78,000 / ₹1,00,000 - ₹22,000 remaining)
- Recent Transactions: Zomato (₹420), Uber (₹280), Amazon (₹1,499), Electricity Bill (₹2,350)

Provide concise, friendly, encouraging, and actionable financial insights. Keep responses concise (2 to 4 sentences max), formatted nicely with bullet points or clean numbers if appropriate. Use Rupee symbol (₹).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({
      reply: response.text || "I'm keeping an eye on your finances. You're doing great with your Emergency Fund goal!",
      source: "gemini-3.6-flash"
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      reply: "Based on your current cash flows, your Emergency Fund target is well within reach this month. Continue prioritizing essential expenses!",
      error: error?.message || "Internal error"
    });
  }
});

// API Route for dynamic daily AI Insight
app.get("/api/ai-insight", async (req, res) => {
  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        insight: "You're on track to reach your emergency fund this month.",
        quote: "Every small financial decision today builds a stronger tomorrow.",
        tips: [
          "Automate ₹2,000 weekly into high-yield savings.",
          "You saved ₹1,250 on food orders compared to last week!",
          "Consider reviewing your Electricity Bill auto-pay settings."
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Generate 1 short financial progress sentence for Rishabh who is at 78% of his ₹1,00,000 Emergency Fund goal.",
      config: {
        systemInstruction: "You are Kangfinz AI. Return a single inspiring 1-sentence financial insight. Keep it brief and motivating.",
        temperature: 0.8,
      },
    });

    return res.json({
      insight: response.text?.trim() || "You're on track to reach your emergency fund this month.",
      quote: "Every small financial decision today builds a stronger tomorrow.",
      tips: [
        "Automate ₹2,000 weekly into high-yield savings.",
        "You saved ₹1,250 on food orders compared to last week!",
        "Consider reviewing your Electricity Bill auto-pay settings."
      ]
    });
  } catch (error) {
    return res.json({
      insight: "You're on track to reach your emergency fund this month.",
      quote: "Every small financial decision today builds a stronger tomorrow.",
      tips: [
        "Automate ₹2,000 weekly into high-yield savings.",
        "You saved ₹1,250 on food orders compared to last week!"
      ]
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Kangfinz Pay" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kangfinz Pay server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
