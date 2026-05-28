import Nav from '../components/Nav'
import MintPanel from '../components/MintPanel'
export default function Home() {
  return (
    <div>
      <Nav />
      <main style={{maxWidth:1000,margin:'24px auto',padding:16}}>
        <header>
          <h1>Projeto NFT — Mint & Galeria</h1>
          <p>Contrato Polygon: <code>{process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}</code></p>
        </header>
        <section style={{marginTop:24}}>
          <MintPanel />
        </section>
        <section style={{marginTop:24}}>
          <h3>Sobre</h3>
          <p>Integração com OpenSea e mint direto pela carteira do usuário.</p>
        </section>
      </main>
    </div>
  )
}
