import useSWR from 'swr'
import axios from 'axios'
const fetcher = url => axios.get(url).then(r => r.data)
export default function GalleryList({ limit = 10 }) {
  const slug = process.env.NEXT_PUBLIC_OPENSEA_COLLECTION_SLUG
  const url = `/api/opensea-proxy?collection=${encodeURIComponent(slug)}&limit=${limit}`
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 0 })
  if (error) return <div>Erro ao carregar galeria</div>
  if (!data) return <div>Carregando...</div>
  const assets = data.assets || data
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
      {assets.map(a => (
        <div key={a.token_id} style={{border:'1px solid #eee',padding:8,borderRadius:8}}>
          <img src={a.image_preview_url || a.image_url} alt={a.name} style={{width:'100%',height:180,objectFit:'cover'}} />
          <div style={{marginTop:8}}>
            <strong>{a.name || `#${a.token_id}`}</strong>
            <div style={{fontSize:12,color:'#666'}}>{a.asset_contract?.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
