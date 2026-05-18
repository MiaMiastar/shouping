import { chromium } from "playwright";
import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = createServer((request, response) => {
  const requestedPath = normalize(decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname));
  const filePath = join(root, requestedPath === "/" ? "index.html" : requestedPath);
  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime[extname(filePath)] ?? "application/octet-stream" });
  createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const url = process.env.APP_URL ?? `http://127.0.0.1:${port}/`;

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const browserMessages = [];
page.on("console", (message) => browserMessages.push(`[${message.type()}] ${message.text()}`));
page.on("pageerror", (error) => browserMessages.push(`[pageerror] ${error.message}`));
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".map-stage", { timeout: 10000 }).catch(async (error) => {
  console.error(await page.content());
  console.error(browserMessages.join("\n"));
  throw error;
});
await page.waitForTimeout(1200);

const result = await page.evaluate(() => {
  const stage = document.querySelector(".map-stage");
  const rect = stage.getBoundingClientRect();
  const backgroundImage = getComputedStyle(stage).backgroundImage;
  const sample = document.elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2).some((node) => {
    return node.classList?.contains("map-stage") || node.classList?.contains("resource-hotspots");
  });
  return {
    width: rect.width,
    height: rect.height,
    imageLoaded: backgroundImage.includes("User%20attachment.png") || backgroundImage.includes("User attachment.png"),
    mapAtCenter: sample,
    title: document.querySelector("h1")?.textContent ?? "",
    hotspotCount: document.querySelectorAll(".hotspot").length,
    drillTitle: document.querySelector(".compute-heading h2, .selected-summary h2")?.textContent ?? "",
    computeStatCount: document.querySelectorAll(".compute-kpi").length,
    serviceMetricCount: document.querySelectorAll(".service-big-number").length,
    serviceTagCount: document.querySelectorAll(".service-tag-grid span").length,
    regionCount: document.querySelectorAll(".topology-node").length,
  };
});

await page.screenshot({ path: "dist/verification-screen.png", fullPage: true });
await browser.close();
server.close();

if (
  !result.imageLoaded ||
  result.width < 500 ||
  result.height < 350 ||
  result.hotspotCount < 6 ||
  !result.drillTitle ||
  (result.drillTitle === "算力资源" && (result.computeStatCount < 7 || result.regionCount < 8)) ||
  (result.drillTitle === "SCP卡片" && (result.serviceMetricCount < 2 || result.serviceTagCount < 14))
) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(result, null, 2));
