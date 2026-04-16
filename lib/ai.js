export async function callAI(prompt) {
  const provider = process.env.AI_PROVIDER || "openai";

  if (provider === "openai") {
    return callOpenAI(prompt);
  }

  return "No provider configured";
}

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
    console.error(data);
    throw new Error("Erro na OpenAI");
  }

  return data.choices?.[0]?.message?.content;
}