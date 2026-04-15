/**
 * Prints your LAN dev URL, a terminal QR, and writes dev-qr.png for scanning from your phone.
 * Run `npm run dev` first, then `npm run dev:qr` (default port 5173; override with PORT=5174).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outPng = path.join(root, 'dev-qr.png')

/** Prefer Wi‑Fi/Ethernet (en*) and typical home LAN ranges; deprioritize Docker/VPN-style interfaces. */
function rankedLanIPv4() {
  const nets = os.networkInterfaces()
  /** @type {{ name: string; address: string; score: number }[]} */
  const out = []
  for (const name of Object.keys(nets)) {
    for (const iface of nets[name] ?? []) {
      if (iface.family !== 'IPv4' || iface.internal) continue
      const address = iface.address
      const n = name.toLowerCase()
      let score = 0
      if (n.startsWith('en')) score += 25
      if (n.includes('bridge') || n.includes('docker') || n.includes('vbox') || n === 'awdl0')
        score -= 60
      if (address.startsWith('192.168.')) score += 100
      else if (address.startsWith('10.')) score += 55
      else if (address.startsWith('172.')) {
        const second = Number(address.split('.')[1])
        if (second >= 16 && second <= 31) score += 15
        else score += 40
      } else if (address.startsWith('169.254.')) score -= 30
      out.push({ name, address, score })
    }
  }
  out.sort((a, b) => b.score - a.score)
  return out
}

const port = Number(process.env.PORT || process.env.VITE_PORT || 5173)
const ranked = rankedLanIPv4()
const best = ranked[0]
if (!best) {
  console.error('Could not find a LAN IPv4 address. Connect to Wi‑Fi and try again.')
  process.exit(1)
}

const ip = best.address
const url = `http://${ip}:${port}`

await QRCode.toFile(outPng, url, {
  width: 400,
  margin: 2,
  errorCorrectionLevel: 'M',
  color: { dark: '#22242cff', light: '#ffffffff' },
})

const terminal = await QRCode.toString(url, { type: 'terminal', small: true })

console.log('\nScan this URL on your phone (same Wi‑Fi as this Mac):\n')
console.log(url)
if (ranked.length > 1) {
  console.log('\nIf that fails, try these URLs (correct interface first):\n')
  for (const { name, address } of ranked.slice(0, 5)) {
    console.log(`  http://${address}:${port}  (${name})`)
  }
}
console.log('\nTerminal QR (if your terminal supports it):\n')
console.log(terminal)
console.log(`\nPNG saved: ${outPng}`)
console.log('Open that image on your Mac, then scan it with the phone camera.\n')
console.log(
  'Cannot connect? Same Wi‑Fi (not guest isolation), turn off VPN on Mac/phone, and check',
)
console.log(
  'System Settings → Network → Firewall (allow incoming for Node). Vite must use port',
  port,
  '(npm run dev uses strictPort; free 5173 or set PORT=… for both).\n',
)
