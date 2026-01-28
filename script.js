const BASE_URL = "https://speed-test-backend.onrender.com";

const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const spinner = document.getElementById("spinner");

function toggleMode() {
  document.body.classList.toggle("light");
}

async function startTest() {
  btn.disabled = true;
  spinner.style.display = "block";
  resultEl.innerHTML = "";
  statusEl.innerText = "⏳ Waking up server (first test may take time)...";

  try {
    const pingStart = performance.now();
    const pingRes = await fetch(`${BASE_URL}/ping`);
    const pingData = await pingRes.json();
    const pingTime = Math.round(performance.now() - pingStart);

    statusEl.innerText = "📥 Testing download speed...";
    const downloadSpeed = await testDownload();

    statusEl.innerText = "📤 Testing upload speed...";
    const uploadSpeed = await testUpload();

    statusEl.innerText = "🌍 Fetching network info...";
    const info = await fetch("https://ipapi.co/json/").then(r => r.json());

    resultEl.innerHTML = `
      📶 <b>Ping:</b> ${pingData.ping} ms<br>
      ⏱️ <b>Latency:</b> ${pingTime} ms<br>
      ⬇️ <b>Download:</b> ${downloadSpeed} Mbps<br>
      ⬆️ <b>Upload:</b> ${uploadSpeed} Mbps<br><br>
      🌍 <b>Location:</b> ${info.city}, ${info.country_name}<br>
      🏢 <b>ISP:</b> ${info.org}
    `;

    statusEl.innerText = "✅ Test completed successfully";
  } catch (e) {
    statusEl.innerText =
      "⚠️ Server starting. Please wait 30 seconds and retry.";
  } finally {
    spinner.style.display = "none";
    btn.disabled = false;
  }
}

async function testDownload() {
  const size = 5 * 1024 * 1024; // 5MB
  const start = performance.now();
  await fetch(`https://speed.cloudflare.com/__down?bytes=${size}`);
  const duration = (performance.now() - start) / 1000;
  return ((size * 8) / duration / 1024 / 1024).toFixed(2);
}

async function testUpload() {
  const size = 2 * 1024 * 1024; // 2MB
  const data = new Uint8Array(size);
  const start = performance.now();
  await fetch("https://httpbin.org/post", {
    method: "POST",
    body: data
  });
  const duration = (performance.now() - start) / 1000;
  return ((size * 8) / duration / 1024 / 1024).toFixed(2);
}
