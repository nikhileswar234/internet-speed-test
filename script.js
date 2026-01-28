const startBtn = document.getElementById("startBtn");
const downloadEl = document.getElementById("download");
const uploadEl = document.getElementById("upload");
const pingEl = document.getElementById("ping");
const statusEl = document.getElementById("status");
const darkToggle = document.getElementById("darkToggle");

// Dark mode
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// Smaller test files (FASTER)
const downloadTestUrl =
  "https://speed.cloudflare.com/__down?bytes=1500000";

async function testPing() {
  const start = performance.now();
  await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
  return Math.round(performance.now() - start);
}

async function testDownload() {
  const start = performance.now();
  await fetch(downloadTestUrl, { cache: "no-store" });
  const duration = (performance.now() - start) / 1000;
  const bits = 1_500_000 * 8;
  return (bits / duration / 1_000_000).toFixed(2);
}

async function testUpload() {
  const data = new Blob([new ArrayBuffer(800000)]);
  const start = performance.now();

  await fetch("https://httpbin.org/post", {
    method: "POST",
    body: data,
  });

  const duration = (performance.now() - start) / 1000;
  const bits = 800_000 * 8;
  return (bits / duration / 1_000_000).toFixed(2);
}

startBtn.onclick = async () => {
  startBtn.disabled = true;

  downloadEl.textContent = "-- Mbps";
  uploadEl.textContent = "-- Mbps";
  pingEl.textContent = "-- ms";

  statusEl.textContent = "Checking ping...";
  const ping = await testPing();
  pingEl.textContent = ping + " ms";

  statusEl.textContent = "Testing download speed...";
  const download = await testDownload();
  downloadEl.textContent = download + " Mbps";

  statusEl.textContent = "Testing upload speed...";
  const upload = await testUpload();
  uploadEl.textContent = upload + " Mbps";

  statusEl.textContent = "Test completed ✔";
  startBtn.disabled = false;
};
