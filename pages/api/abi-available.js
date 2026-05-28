import fs from 'fs'
import path from 'path'
export default function handler(req, res) {
  const abiPath = path.join(process.cwd(), 'data', 'abi.json')
  return res.status(200).json({ available: fs.existsSync(abiPath) })
}
