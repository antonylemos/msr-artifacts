#!/usr/bin/env node
/**
 * dev-remote-server.js
 * Serves a built MFE's dist/ folder as a static file server with CORS.
 * Useful when you want to run the shell in dev mode against pre-built remotes.
 *
 * Usage: node scripts/dev-remote-server.js --dir ./apps/mfe-vue2-checkout/dist --port 3001
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const { URL } = require('url')

const args = process.argv.slice(2)
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null }

const dir  = path.resolve(get('--dir')  || './dist')
const port = parseInt(get('--port') || '8080', 10)

const MIME = {
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.css':  'text/css',
  '.html': 'text/html',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.svg':  'image/svg+xml',
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`)
  const filePath = path.join(dir, url.pathname)

  // CORS — required for Module Federation cross-origin script loading
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404)
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    fs.createReadStream(filePath).pipe(res)
  })
})

server.listen(port, () => {
  console.log(`Serving ${dir} on http://localhost:${port}`)
})
