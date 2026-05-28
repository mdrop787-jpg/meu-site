import axios from 'axios'
export default async function handler(req, res) {
  try {
    const { collection, asset_contract_address, limit = 10 } = req.query
    const base = 'https://api.opensea.io/api/v1/assets'
    const params = new URLSearchParams()
    if (collection) params.append('collection', collection)
    if (asset_contract_address) params.append('asset_contract_address', asset_contract_address)
    params.append('limit', limit)
    const url = `${base}?${params.toString()}`
    const headers = {}
    if (process.env.OPENSEA_API_KEY) headers['X-API-KEY'] = process.env.OPENSEA_API_KEY
    const resp = await axios.get(url, { headers })
    res.status(200).json(resp.data)
  } catch (err) {
    console.error(err?.response?.data || err.message || err)
    res.status(500).json({ error: 'Erro ao buscar OpenSea' })
  }
}
