import { execFileSync } from 'node:child_process'

const apps = ['header', 'footer', 'products', 'host']
const sharedPaths = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'packages/shared/',
  'packages/types/',
  'packages/ui/',
  'packages/config/',
  '.github/',
]

const zeroSha = /^0+$/
let baseRef = process.env.BASE_REF || 'origin/main'
const headRef = process.env.HEAD_REF || 'HEAD'

if (!baseRef || zeroSha.test(baseRef)) {
  try {
    baseRef = execFileSync('git', ['rev-parse', 'HEAD^'], { encoding: 'utf8' }).trim()
  } catch {
    baseRef = headRef
  }
}

const changedFiles = execFileSync('git', ['diff', '--name-only', `${baseRef}...${headRef}`], {
  encoding: 'utf8',
})
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

const affected = new Set()
const markAll = () => apps.forEach((app) => affected.add(app))

for (const file of changedFiles) {
  if (file.startsWith('apps/header/')) affected.add('header')
  if (file.startsWith('apps/footer/')) affected.add('footer')
  if (file.startsWith('apps/products/')) affected.add('products')
  if (file.startsWith('apps/host/')) affected.add('host')

  if (sharedPaths.some((path) => file.startsWith(path))) {
    markAll()
  }
}

process.stdout.write(JSON.stringify([...affected].sort()))
