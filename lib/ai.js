export async function callAI(prompt) {
  const provider = process.env.AI_PROVIDER || "mock";

  try {
    if (provider === "mock") {
      return parseResponse(mockResponse());
    }

    if (provider === "openai") {
      const res = await callOpenAI(prompt);
      return parseResponse(res);
    }

    return "No provider configured";

  } catch (err) {
    console.error("PRIMARY AI FAILED:", err);

    // 🔥 fallback automático
    try {
      console.log("Trying fallback (mock)...");
      return parseResponse(mockResponse());
    } catch {
      return "Erro total na IA";
    }
  }
}

// ---------------- OPENAI ----------------

async function callOpenAI(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data.choices?.[0]?.message?.content;
}

// ---------------- PARSER ----------------

function parseResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    // tenta extrair JSON mesmo quebrado
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }

    return {
      title: "Erro de parsing",
      script: text,
      blocks: [],
      score: {},
    };
  }
}

// ---------------- MOCK ----------------

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