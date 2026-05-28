import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import fs from 'fs'
export default function MintPanel() {
  const [status, setStatus] = useState('')
  const [mintCount, setMintCount] = useState(1)
  const [abi, setAbi] = useState(null)

  useEffect(() => {
    // tenta carregar ABI gerada em tempo de build / dev
    fetch('/api/abi-available').then(r => r.json()).then(j => {
      if (j.available) {
        fetch('/api/abi').then(r => r.json()).then(data => setAbi(data))
      }
    }).catch(()=>{})
  }, [])

  async function mint() {
    try {
      setStatus('Conectando carteira...')
      if (!window.ethereum) throw new Error('MetaMask não encontrada')
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      let contract
      if (abi) {
        contract = new ethers.Contract(contractAddress, abi, signer)
      } else {
        const abiFragment = ["function mint(uint256) payable", "function mint() payable"]
        contract = new ethers.Contract(contractAddress, abiFragment, signer)
      }
      const fnName = process.env.MINT_FUNCTION_NAME || 'mint'
      setStatus('Enviando transação...')
      let tx
      try {
        tx = await contract[fnName](mintCount, { value: 0 })
      } catch (err) {
        tx = await contract[fnName]()
      }
      setStatus('Transação enviada. Aguardando confirmação...')
      await tx.wait()
      setStatus('Mint concluído com sucesso!')
    } catch (err) {
      console.error(err)
      setStatus('Erro: ' + (err?.message || err))
    }
  }

  return (
    <div style={{border:'1px solid #ddd',padding:16,borderRadius:8}}>
      <h3>Mint</h3>
      <label>Quantidade</label>
      <input type="number" min="1" value={mintCount} onChange={(e)=>setMintCount(Number(e.target.value))} />
      <div style={{marginTop:8}}>
        <button onClick={mint}>Mintar agora</button>
      </div>
      <p style={{marginTop:8}}>{status}</p>
      <p style={{fontSize:12,color:'#666'}}>ABI carregada: {abi ? 'sim' : 'não (usando fragment)'}</p>
    </div>
  )
}
