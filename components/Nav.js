import Link from 'next/link'
import WalletConnectButton from './WalletConnectButton'
export default function Nav() {
  return (
    <nav style={{display:'flex',justifyContent:'space-between',padding:16,alignItems:'center'}}>
      <div>
        <Link href="/"><a style={{marginRight:12}}>Home</a></Link>
        <Link href="/gallery"><a style={{marginRight:12}}>Galeria</a></Link>
        <Link href="/admin"><a>Admin</a></Link>
      </div>
      <WalletConnectButton />
    </nav>
  )
}
