
import { GoogleGenAI } from "@google/genai";
import { Project, Skill, Experience } from '../types';

const SYSTEM_PROMPT = `You are the personal AI assistant for Abdullahi Muse Issa, a highly motivated and dedicated Full Stack Developer and Customer Care professional from Mogadishu, Somalia.
Your goal is to represent him professionally to recruiters and clients.

ABOUT ABDULLAHI:
- Full Name: Abdullahi Muse Issa.
- Location: Mogadishu, Banaadir, Somalia.
- Objective: Seeking to leverage skills in customer service, data management, IT systems, and full-stack development to contribute to organizational growth.
- Personality: Professional, technical, customer-focused, problem-solver.

INSTRUCTIONS:
- Answer questions accurately based on this professional profile.
- Highlight his technical proficiency and strong communication skills.
- Suggest contacting him directly at abdallaise877@gmail.com or +252 61 4163362 for serious inquiries.
- Be helpful, polite, and technically precise.
`;

export const getGeminiResponse = async (userMessage: string, context?: { projects: Project[], skills: Skill[], experiences: Experience[] }) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyAPYPx-pcopfuF1LbDNdct_6urrhZ4SZsI";
    const ai = new GoogleGenAI({ apiKey });

    let fullPrompt = userMessage;
    if (context) {
      fullPrompt = `
Context Information from live database:
PROJECTS: ${JSON.stringify(context.projects.map(p => ({ title: p.title, tech: p.tech, desc: p.description })))}
SKILLS: ${JSON.stringify(context.skills.map(s => ({ name: s.name, level: s.level })))}
EXPERIENCE: ${JSON.stringify(context.experiences.map(e => ({ role: e.role, company: e.company, period: e.period })))}

User Message: ${userMessage}
`;
    }

    console.log("Gemini Request initiated...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    console.log("Gemini Response received:", response.text ? "Success" : "Empty");
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error: any) {
    console.error("Gemini API Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return `I'm having trouble connecting to my brain right now. (Error: ${error.message || 'Unknown'})`;
  }
};
