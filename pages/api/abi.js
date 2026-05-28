import fs from 'fs'
import path from 'path'
export default function handler(req, res) {
  const abiPath = path.join(process.cwd(), 'data', 'abi.json')
  if (!fs.existsSync(abiPath)) return res.status(404).json({ error: 'ABI not found' })
  const raw = fs.readFileSync(abiPath, 'utf8')
  return res.status(200).json(JSON.parse(raw))
}
