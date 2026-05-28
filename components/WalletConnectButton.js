import { useEffect, useState } from 'react'
export default function WalletConnectButton() {
  const [address, setAddress] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0] || null)
      })
    }
  }, [])
  async function connect() {
    if (!window.ethereum) {
      alert('Instale MetaMask ou use um navegador com carteira Web3.')
      return
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAddress(accounts[0])
  }
  return (
    <div>
      {address ? (
        <span style={{fontFamily:'monospace'}}>{address.slice(0,6)}...{address.slice(-4)}</span>
      ) : (
        <button onClick={connect}>Conectar carteira</button>
      )}
    </div>
  )
}
