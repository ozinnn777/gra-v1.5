import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [provider, setProvider] = useState("auto");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          provider,
          systemPrompt: buildPrompt()
        })
      });

      const data = await res.json();
      setResult(data);

    } catch {
      alert("Erro ao gerar");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 30, fontFamily: "monospace", background: "#0a0a0f", color: "#eee", minHeight: "100vh" }}>
      
      <h2>GRA v1.6</h2>

      <textarea
        placeholder="Digite o tema..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <div style={{ marginBottom: 20 }}>
        {["auto", "openrouter", "openai"].map((p) => (
          <button
            key={p}
            onClick={() => setProvider(p)}
            style={{
              marginRight: 10,
              padding: 8,
              background: provider === p ? "#6d28d9" : "#222",
              color: "#fff",
              border: "none"
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <button onClick={generate} disabled={loading}>
        {loading ? "Gerando..." : "Gerar roteiro"}
      </button>

      {result && (
        <pre style={{ marginTop: 30, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

function buildPrompt() {
  return `
You are GRA v1.6.

Generate a cinematic storytelling script with emotional depth.

Return JSON:
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
}