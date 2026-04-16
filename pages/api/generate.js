import { generateScript } from "../../lib/ai";

export default async function handler(req, res) {
  // 🔒 Permitir apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 📥 Dados vindos do front
    const { topic, language, channelType, duration } = req.body;

    // 🧠 Validação mínima (evita chamada inútil na API)
    if (!topic || topic.trim().length < 3) {
      return res.status(400).json({ error: "Tema inválido ou muito curto" });
    }

    // 🧱 Monta prompt (simples por enquanto — depois entra GRA completo)
    const prompt = `
Create a YouTube script.

Topic: ${topic}
Language: ${language || "English"}
Channel Type: ${channelType || "Storytelling"}
Duration: ${duration || "8-10 minutes"}

Structure:
- Strong hook
- Emotional storytelling
- Mid-video engagement
- Reflective ending

Return ONLY JSON in this format:
{
  "title": "",
  "script": "",
  "blocks": [],
  "score": {
    "overall": 0,
    "hook_strength": 0,
    "mid_retention": 0,
    "emotional_peak": 0,
    "tts_rhythm": 0,
    "fourth_wall_impact": 0
  }
}
`;

    // 🤖 Chama a IA
    const aiResponse = await generateScript(prompt);

    // 🧼 Limpa resposta (remove ```json se vier)
    const clean = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (parseError) {
      console.error("Erro ao fazer parse do JSON:", clean);

      return res.status(500).json({
        error: "Resposta da IA inválida",
        raw: clean, // útil pra debug
      });
    }

    // ✅ Resposta final
    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Erro geral:", err);

    return res.status(500).json({
      error: err.message || "Erro interno no servidor",
    });
  }
}