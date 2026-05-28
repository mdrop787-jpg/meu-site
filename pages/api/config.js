import fs from 'fs'
import path from 'path'
const cfgPath = path.join(process.cwd(), 'data', 'site-config.json')
export default function handler(req, res) {
  const { method } = req
  if (method === 'GET') {
    const raw = fs.readFileSync(cfgPath, 'utf8')
    return res.status(200).json(JSON.parse(raw))
  }
  if (method === 'POST') {
    const pwd = req.headers['x-admin-password']
    if (pwd !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' })
    fs.writeFileSync(cfgPath, JSON.stringify(req.body, null, 2))
    return res.status(200).json({ ok: true })
  }
  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
