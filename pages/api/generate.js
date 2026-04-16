import { generateScript } from "../../lib/ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic, systemPrompt, provider } = req.body;

    const result = await generateScript({
      topic,
      systemPrompt,
      provider
    });

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: "Generation failed" });
  }
}