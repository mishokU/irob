import {ethereum} from "./isMetamaskAvailable";
import {ethers, JsonRpcSigner} from "ethers";

export async function getSigner(): Promise<JsonRpcSigner> {
    //const metaMaskProvider = ethereum.providers.find((provider: any) => provider.isMetaMask);
    //await metaMaskProvider.request({method: 'eth_requestAccounts'});
    const provider = new ethers.BrowserProvider(ethereum);
    return await provider.getSigner()
}