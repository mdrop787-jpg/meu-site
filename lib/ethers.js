import { ethers } from 'ethers'
export function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  const rpc = process.env.RPC_PROVIDER || 'https://rpc-mumbai.maticvigil.com/'
  return new ethers.JsonRpcProvider(rpc)
}
export const minimalAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function ownerOf(uint256) view returns (address)",
  "function balanceOf(address) view returns (uint256)"
]
