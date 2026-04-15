import { callAI } from "../../lib/ai";
import { buildPrompt } from "../../lib/prompt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic } = req.body;

  const prompt = buildPrompt(topic);
  const result = await callAI(prompt);

  res.status(200).json({ result });
}