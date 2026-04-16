export async function generateScript({ topic, systemPrompt, provider }) {
  try {
    if (provider === "openai") {
      return await callOpenAI(systemPrompt, topic);
    }

    if (provider === "openrouter") {
      return await callOpenRouter(systemPrompt, topic);
    }

    // AUTO MODE
    try {
      return await callOpenRouter(systemPrompt, topic);
    } catch {}

    try {
      return await callOpenAI(systemPrompt, topic);
    } catch {}

    return fakeResponse(topic);

  } catch {
    return fakeResponse(topic);
  }
}

// ---------------- OPENAI ----------------

async function callOpenAI(systemPrompt, topic) {
  if (!process.env.OPENAI_API_KEY) throw new Error("No OpenAI key");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: topic }
      ],
      temperature: 0.8
    })
  });

  const data = await res.json();
  return safeParse(data);
}

// ---------------- OPENROUTER ----------------

async function callOpenRouter(systemPrompt, topic) {
  if (!process.env.OPENROUTER_API_KEY) throw new Error("No OpenRouter key");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: topic }
      ]
    })
  });

  const data = await res.json();
  return safeParse(data);
}

// ---------------- SAFE PARSE ----------------

function safeParse(data) {
  try {
    const text = data.choices?.[0]?.message?.content || "";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return fakeResponse("Parsing failed");
  }
}

// ---------------- FALLBACK ----------------

function fakeResponse(topic) {
  return {
    title: topic || "Fallback Title",
    script: "Fallback mode: script generated without external AI.",
    blocks: [
      "This is a fallback block.",
      "No API connected.",
      "System still functional."
    ],
    score: {
      overall: 60,
      hook_strength: 60,
      mid_retention: 60,
      emotional_peak: 60,
      tts_rhythm: 60,
      fourth_wall_impact: 60
    }
  };
}