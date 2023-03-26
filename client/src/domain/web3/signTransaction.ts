import {ethereum} from "./isMetamaskAvailable";
import {ethers} from "ethers";

function verifyMessage(message: any, address: any, signature: any) {
    try {
        const signerAddr = ethers.verifyMessage(message, signature);
        return signerAddr === address;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function signTransaction(address: string, data: string) {

    const metaMaskProvider = ethereum.providers.find((provider: any) => provider.isMetaMask);
    await metaMaskProvider.request({method: 'eth_requestAccounts'});
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(data);

    if (verifyMessage(data, address, signature)) {
        const transactionParameters = {
            from: address, data: data, chainId: '0x539'
        };

        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction', params: [transactionParameters],
        });

        const transactionReceipt = await ethereum.request({
            method: 'eth_getTransactionReceipt', params: [txHash]
        })

        if(transactionReceipt === null){
            throw Error("No contract address!")
        }

        return transactionReceipt.contractAddress

    } else {
        throw Error("Message not verified!")
    }

}