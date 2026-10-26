import { chromium } from 'playwright-core';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const OUT = './evidence';
fs.mkdirSync(OUT, { recursive: true });

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/home/box/.cache/ms-playwright/chromium-1181/chrome-linux/chrome',
    '/home/box/.cache/ms-playwright/chromium-1169/chrome-linux/chrome',
  ].filter(Boolean);
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // search ms-playwright cache
  const base = '/home/box/.cache/ms-playwright';
  if (fs.existsSync(base)) {
    for (const d of fs.readdirSync(base)) {
      const p = path.join(base, d, 'chrome-linux', 'chrome');
      if (fs.existsSync(p)) return p;
      const p2 = path.join(base, d, 'chrome-linux64', 'chrome');
      if (fs.existsSync(p2)) return p2;
    }
  }
  return null;
}

const consoleLogs = [];
const pageErrors = [];

const executablePath = await findChrome();
console.log('Chrome:', executablePath);

const browser = await chromium.launch({
  headless: true,
  executablePath: executablePath || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
page.on('console', (msg) => {
  const entry = { type: msg.type(), text: msg.text() };
  consoleLogs.push(entry);
  console.log(`[console.${entry.type}] ${entry.text}`);
});
page.on('pageerror', (err) => {
  pageErrors.push({ message: err.message, stack: err.stack });
  console.log(`[pageerror] ${err.message}`);
});

await page.goto('http://localhost:5000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4000);

const result = await page.evaluate(() => {
  const ownersSym = Symbol.for('module-federation.shared-cache-owners');
  const cache = globalThis.__mf_module_cache__;
  let owners = null;
  try {
    owners = cache?.[ownersSym] ?? null;
    if (owners && typeof owners === 'object') {
      owners = JSON.parse(JSON.stringify(owners, (_k, v) => (typeof v === 'function' ? '[fn]' : typeof v === 'symbol' ? String(v) : v)));
    }
  } catch (e) {
    owners = { error: String(e) };
  }

  let shareSummary = null;
  try {
    const share = cache?.share;
    if (share) {
      shareSummary = {};
      for (const [pkg, versions] of Object.entries(share)) {
        shareSummary[pkg] = {};
        if (versions && typeof versions === 'object') {
          for (const [ver, info] of Object.entries(versions)) {
            shareSummary[pkg][ver] = {
              from: info?.from,
              loaded: info?.loaded,
              useIn: info?.useIn,
              version: info?.version ?? ver,
              scope: info?.scope,
              shareConfig: info?.shareConfig
                ? {
                    singleton: info.shareConfig.singleton,
                    requiredVersion: info.shareConfig.requiredVersion,
                    strictVersion: info.shareConfig.strictVersion,
                  }
                : undefined,
            };
          }
        }
      }
    }
  } catch (e) {
    shareSummary = { error: String(e) };
  }

  return {
    title: document.title,
    bodyText: document.body?.innerText?.slice(0, 4000),
    crashes: globalThis.__SKEW_CRASHES__ || null,
    dump: globalThis.__SKEW_DUMP__ || null,
    hasRemoteA: !!document.querySelector('[data-app="remote_a"]'),
    hasRemoteB: !!document.querySelector('[data-app="remote_b"]'),
    hasRemoteC: !!document.querySelector('[data-app="remote_c"]'),
    remoteAError: document.querySelector('#remote-a-error')?.innerText || null,
    remoteBError: document.querySelector('#remote-b-error')?.innerText || null,
    owners,
    shareSummary,
    cacheKeys: cache ? Object.keys(cache) : null,
    federationKeys: globalThis.__FEDERATION__ ? Object.keys(globalThis.__FEDERATION__) : null,
  };
});

await page.screenshot({ path: path.join(OUT, 'host-screenshot.png'), fullPage: true });

const report = {
  consoleLogs,
  pageErrors,
  result,
  ts: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT, 'capture-report.json'), JSON.stringify(report, null, 2));
console.log('\n===== CAPTURE SUMMARY =====');
console.log(JSON.stringify({
  pageErrors: pageErrors.map((e) => e.message),
  consoleErrors: consoleLogs.filter((l) => l.type === 'error').map((l) => l.text),
  hasRemoteA: result.hasRemoteA,
  hasRemoteB: result.hasRemoteB,
  hasRemoteC: result.hasRemoteC,
  crashes: result.crashes,
  remoteAError: result.remoteAError,
  remoteBError: result.remoteBError,
}, null, 2));

await browser.close();
