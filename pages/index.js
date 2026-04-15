import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Erro ao gerar roteiro");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>G.R.A v1.5</h1>

      <textarea
        placeholder="Digite o tema do vídeo..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "100%",
          height: 100,
          marginBottom: 20,
          padding: 10
        }}
      />

      <button onClick={generate} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Roteiro"}
      </button>

      <pre style={{ marginTop: 30, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}