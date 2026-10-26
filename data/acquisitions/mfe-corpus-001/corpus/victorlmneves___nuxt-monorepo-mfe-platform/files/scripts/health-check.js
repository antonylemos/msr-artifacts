#!/usr/bin/env node
/**
 * health-check.js
 * Polls all MFE remoteEntry.js URLs until they respond (or times out).
 * Run before starting the shell in production/CI to avoid blank pages.
 *
 * Usage: node scripts/health-check.js [--timeout 60]
 */

const http = require('http')
const https = require('https')
const { URL } = require('url')

const REMOTES = [
  { name: 'mfe-vue2-checkout', url: process.env.CHECKOUT_REMOTE_URL || 'http://localhost:3001/remoteEntry.js' },
  { name: 'mfe-vue2-admin',    url: process.env.ADMIN_REMOTE_URL    || 'http://localhost:3002/remoteEntry.js' },
  { name: 'mfe-vue3-profile',  url: process.env.PROFILE_REMOTE_URL  || 'http://localhost:3003/remoteEntry.js' },
  { name: 'mfe-vue3-dashboard',url: process.env.DASHBOARD_REMOTE_URL|| 'http://localhost:3004/remoteEntry.js' },
]

const args = process.argv.slice(2)
const timeoutIdx = args.indexOf('--timeout')
const TIMEOUT_SEC = timeoutIdx >= 0 ? parseInt(args[timeoutIdx + 1], 10) : 60
const INTERVAL_MS = 2000

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr)
    const lib = parsed.protocol === 'https:' ? https : http
    const req = lib.get(urlStr, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400)
    })
    req.on('error', () => resolve(false))
    req.setTimeout(3000, () => { req.destroy(); resolve(false) })
  })
}

async function waitForAll() {
  const deadline = Date.now() + TIMEOUT_SEC * 1000
  const pending = new Set(REMOTES.map((r) => r.name))

  console.log(`\nWaiting for ${REMOTES.length} remotes (timeout: ${TIMEOUT_SEC}s)...\n`)

  while (pending.size > 0 && Date.now() < deadline) {
    for (const remote of REMOTES) {
      if (!pending.has(remote.name)) continue
      const ok = await checkUrl(remote.url)
      if (ok) {
        console.log(`  ✓  ${remote.name}  (${remote.url})`)
        pending.delete(remote.name)
      }
    }
    if (pending.size > 0) {
      process.stdout.write(`  ⏳ Still waiting: ${[...pending].join(', ')}\r`)
      await new Promise((r) => setTimeout(r, INTERVAL_MS))
    }
  }

  if (pending.size > 0) {
    console.error(`\n✗ Timed out waiting for: ${[...pending].join(', ')}`)
    process.exit(1)
  }

  console.log('\n✓ All remotes healthy — shell can start.\n')
}

waitForAll()
