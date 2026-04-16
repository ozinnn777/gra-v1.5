export async function callAI(prompt) {
  const provider = process.env.AI_PROVIDER || "mock";

  if (provider === "mock") {
    return mockResponse();
  }

  if (provider === "openai") {
    return callOpenAI(prompt);
  }

  return "No provider configured";
}

function mockResponse() {
  return JSON.stringify({
    title: "You’ve Already Changed. You Just Don’t Know It Yet",
    script: "You think nothing changed... but it did...",
    blocks: [
      "You think nothing changed...",
      "But something inside you shifted...",
      "And you didn’t even notice..."
    ],
    score: {
      overall: 85,
      hook_strength: 80,
      mid_retention: 82,
      emotional_peak: 88,
      tts_rhythm: 84,
      fourth_wall_impact: 86
    }
  });
}