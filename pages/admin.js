import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Admin() {
  const [config, setConfig] = useState(null)
  const [pwd, setPwd] = useState('')
  useEffect(()=>{ fetchConfig() },[])
  async function fetchConfig() {
    const r = await axios.get('/api/config')
    setConfig(r.data)
  }
  async function save() {
    await axios.post('/api/config', config, { headers: { 'x-admin-password': pwd } })
    alert('Salvo (ou erro se senha inválida)')
    fetchConfig()
  }
  if (!config) return <div><Nav /><main style={{padding:24}}>Carregando...</main></div>
  return (
    <div>
      <Nav />
      <main style={{maxWidth:800,margin:'24px auto',padding:16}}>
        <h2>Painel Admin (MVP)</h2>
        <label>Senha Admin</label>
        <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
        <div style={{marginTop:12}}>
          <label>saleActive</label>
          <input type="checkbox" checked={config.saleActive} onChange={e=>setConfig({...config, saleActive: e.target.checked})} />
        </div>
        <div>
          <label>priceWei</label>
          <input value={config.priceWei} onChange={e=>setConfig({...config, priceWei: e.target.value})} />
        </div>
        <div>
          <label>maxPerWallet</label>
          <input value={config.maxPerWallet} onChange={e=>setConfig({...config, maxPerWallet: Number(e.target.value)})} />
        </div>
        <div style={{marginTop:12}}>
          <button onClick={save}>Salvar</button>
        </div>
      </main>
    </div>
  )
}
