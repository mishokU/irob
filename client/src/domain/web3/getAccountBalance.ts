import {ethereum} from "./isMetamaskAvailable";
import {ethers, formatEther} from "ethers";

export async function getAccountBalance(address: string): Promise<number> {
    const metaMaskProvider = ethereum.providers.find((provider: any) => provider.isMetaMask);
    await metaMaskProvider.request({method: 'eth_requestAccounts'});
    const provider = new ethers.BrowserProvider(ethereum);
    const balance =  await provider.getBalance(address)
    return Number(formatEther(balance))
}