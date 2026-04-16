import { generateScript } from "../../lib/ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic, engine } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Sem tema" });
    }

    const prompt = `Create a YouTube script about: ${topic}`;

    const result = await generateScript(prompt, engine);

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}