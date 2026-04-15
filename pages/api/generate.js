export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic } = req.body;

    return res.status(200).json({
      title: "Test title",
      script: `This is a test script about ${topic}`,
      blocks: ["block1", "block2", "block3"],
      score: {
        overall: 80,
        hook_strength: 80,
        mid_retention: 75,
        emotional_peak: 85,
        tts_rhythm: 70,
        fourth_wall_impact: 80
      }
    });

  } catch (e) {
    return res.status(500).json({ error: "erro interno" });
  }
}