const BASE_URL = "https://speed-test-backend.onrender.com";

function startTest() {
  const status = document.getElementById("status");
  const result = document.getElementById("result");
  const button = document.getElementById("startBtn");

  result.innerText = "";
  status.innerText = "⏳ Waking up server (first time may take ~30s)...";
  button.disabled = true;
  button.innerText = "Testing...";

  const startTime = performance.now();

  fetch(`${BASE_URL}/ping`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Server error");
      }
      return response.json();
    })
    .then(data => {
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);

      status.innerText = "✅ Test completed";
      result.innerText = `Ping: ${data.ping} ms\nLatency: ${latency} ms`;
    })
    .catch(error => {
      console.error(error);
      status.innerText =
        "❌ Server is starting. Please wait 30 seconds and try again.";
    })
    .finally(() => {
      button.disabled = false;
      button.innerText = "Start Test";
    });
}
