import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [engine, setEngine] = useState("auto");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          engine,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Erro ao gerar" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>GRA v1.5</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Digite o tema..."
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <h3>Motor de IA:</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["auto", "openai", "openrouter"].map((e) => (
          <button
            key={e}
            onClick={() => setEngine(e)}
            style={{
              padding: 10,
              background: engine === e ? "black" : "#eee",
              color: engine === e ? "white" : "black",
            }}
          >
            {e}
          </button>
        ))}
      </div>

      <button onClick={generate} disabled={loading}>
        {loading ? "Gerando..." : "Gerar roteiro"}
      </button>

      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}