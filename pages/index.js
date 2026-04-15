const generate = async () => {
  if (!topic.trim()) return;

  setStep("generating");
  setError(null);

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro na API");
    }

    setResult(data);
    setStep("result");

  } catch (err) {
    setError("Erro ao gerar roteiro");
    setStep("config");
  }
};