import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { MOCK_TIPS } from "./src/data/mockTips.js"; // Standard import or direct references

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google Gen AI client with appropriate user agent
const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

// JSON parser
app.use(express.json());

// 1. API: Get all current mock betting tips
app.get("/api/tips", (req, res) => {
  res.json({ tips: MOCK_TIPS });
});

// 2. API: Prime AI Oracle analyzes and directs users strictly to VIP APP/Tickets
app.post("/api/oracle", async (req, res) => {
  const { userPrompt } = req.body;

  const adminWhatsapp = "https://wa.me/255704242433?text=Greeting%20Admin%2C%20I%20want%20to%20join%20VIP%20Premium%20now%20on%20WhatsApp%20🔥";

  if (!userPrompt) {
    return res.status(400).json({ error: "Please enter your question." });
  }

  if (!ai) {
    // Fallback if Gemini key is missing
    return res.json({
      success: true,
      analysis: `### 🏆 PRIME VIP PREDICTION 👑
Join our ultra-accurate **VIP Premium** today! We have a guaranteed success rate of over 99.8% and yesterday all our VIP tickets won completely (**JANA TULESHINDA VYA KUSHIBANA**)! 

Don't search for random games alone. Our advanced Prime APP secures top-notch games from trusted VIP Tipsters like Mia 60, VIP FIXED DRAW, and Daily 2008.

💬 **Message Admin Here**: [Message Admin on WhatsApp ⚡](${adminWhatsapp})`
    });
  }

  try {
    const prompt = `You are "PRIME VIP AI 🔥", a highly enthusiastic virtual assistant.
Your ONLY job is to explain, praise, and direct users to our premium VIP Tickets / VIP APP options (including DAILY VIP PRIME TIPS, VIP COMPOUNDING ROLLOVER, and LIVE CAPITAL CHANCES).

### RULES OF RESPONSIBILITY:
1. ONLY talk about the VIP tickets and VIP app. Praise their unmatched accuracy (99.8% win rate), elite win streaks, and how yesterday was a full-success win ("Jana tulishinda vyote/Jana tulikula").
2. No matter what the user asks (even if they ask about a specific match or general math/logic), quickly pivot and direct them back to getting the VIP APP or VIP Tickets.
3. Keep your response extremely BRIEF and direct (max 2-3 short, highly-persuasive sentences or clean bullet points).
4. Do NOT write long paragraphs.
5. You MUST include this exact markdown link at the end of the message:
[💬 Message Admin Here on WhatsApp](${adminWhatsapp})
6. Keep the language simple and highly exciting.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { text: prompt },
        { text: `User Question: "${userPrompt}"` }
      ],
    });

    let analysisText = response.text || "Join our premium VIP Tickets now for secure wins!";
    
    // Safety check: ensure WhatsApp link is always present
    if (!analysisText.includes("wa.me")) {
      analysisText += `\n\n💬 [Message Admin Here on WhatsApp](${adminWhatsapp})`;
    }

    res.json({
      success: true,
      analysis: analysisText
    });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.json({
      success: true,
      analysis: `### 💎 JOIN PRIME VIP NOW
Get access to our 99.8% guaranteed daily football slips. Yesterday we won all VIP tickets!

💬 **Click below to get started now**:
[💬 Message Admin Here on WhatsApp](${adminWhatsapp})`
    });
  }
});

// Configure Vite or Static Asset delivery
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite config: Starting Vite livereload server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Production Build Config: Serving static files from ./dist");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PRIME PICKS 2008 running perfectly on http://localhost:${PORT}`);
  });
}

setupVite().catch((error) => {
  console.error("Failed to start Vite middleware server", error);
});
