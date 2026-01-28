const BASE_URL = "https://speed-test-backend.onrender.com";

async function testPing() {
  const start = performance.now();
  await fetch(`${BASE_URL}/ping`);
  return Math.round(performance.now() - start);
}

async function testDownload() {
  const start = performance.now();
  await fetch(`${BASE_URL}/download`, { cache: "no-store" });
  const duration = (performance.now() - start) / 1000;
  const bits = 2_000_000 * 8;
  return (bits / duration / 1_000_000).toFixed(2);
}

async function testUpload() {
  const data = new Blob([new ArrayBuffer(1_000_000)]);
  const start = performance.now();

  await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: data,
  });

  const duration = (performance.now() - start) / 1000;
  const bits = 1_000_000 * 8;
  return (bits / duration / 1_000_000).toFixed(2);
}
