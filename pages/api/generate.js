import { callAI } from "../../lib/ai";
import { buildPrompt } from "../../lib/prompt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic, language, channelType, duration } = req.body;

    const prompt = buildPrompt({
      topic,
      language,
      channelType,
      duration,
    });

    const result = await callAI(prompt);

    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao gerar roteiro" });
  }
}