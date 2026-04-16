import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        language: "English",
        channelType: "Storytelling",
        duration: "10 min",
      }),
    });

    const data = await res.json();
    setOutput(data.result);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>GRA v1.4</h1>

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Digite o tema..."
        style={{ width: "100%", height: 100 }}
      />

      <button onClick={generate}>
        Gerar roteiro
      </button>

      <pre>{output}</pre>
    </div>
  );
}