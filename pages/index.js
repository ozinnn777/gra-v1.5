import { useState } from "react";

export default function Home() {
  const [resposta, setResposta] = useState(null);

  const testar = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic: "teste"
      })
    });

    const data = await res.json();
    setResposta(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>GRA funcionando</h1>

      <button onClick={testar}>
        Testar API
      </button>

      {resposta && (
        <pre>{JSON.stringify(resposta, null, 2)}</pre>
      )}
    </div>
  );
}