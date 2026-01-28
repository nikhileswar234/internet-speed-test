const startBtn = document.getElementById("startBtn");
const downloadEl = document.getElementById("download");
const uploadEl = document.getElementById("upload");
const pingEl = document.getElementById("ping");
const statusEl = document.getElementById("status");
const darkToggle = document.getElementById("darkToggle");

// Dark mode toggle
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// Test file (safe public file)
const testFile =
  "https://speed.cloudflare.com/__down?bytes=5000000";

async function testDownload() {
  const startTime = performance.now();
  await fetch(testFile, { cache: "no-store" });
  const endTime = performance.now();

  const duration = (endTime - startTime) / 1000;
  const bitsLoaded = 5_000_000 * 8;
  return (bitsLoaded / duration / 1_000_000).toFixed(2);
}

async function testPing() {
  const start = performance.now();
  await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
  const end = performance.now();
  return Math.round(end - start);
}

async function testUpload() {
  const data = new Blob([new ArrayBuffer(2_000_000)]);
  const start = performance.now();

  await fetch("https://httpbin.org/post", {
    method: "POST",
    body: data,
  });

  const end = performance.now();
  const duration = (end - start) / 1000;
  const bits = 2_000_000 * 8;
  return (bits / duration / 1_000_000).toFixed(2);
}

startBtn.onclick = async () => {
  downloadEl.textContent = "-- Mbps";
  uploadEl.textContent = "-- Mbps";
  pingEl.textContent = "-- ms";
  statusEl.textContent = "Testing network speed...";

  try {
    const ping = await testPing();
    pingEl.textContent = ping + " ms";

    const download = await testDownload();
    downloadEl.textContent = download + " Mbps";

    const upload = await testUpload();
    uploadEl.textContent = upload + " Mbps";

    statusEl.textContent = "Test completed ✔";
  } catch (e) {
    statusEl.textContent = "Test failed. Check connection.";
  }
};
