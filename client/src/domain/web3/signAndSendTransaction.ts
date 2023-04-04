import {ethereum, localChain} from "./isMetamaskAvailable";
import {ethers} from "ethers";
import {getSigner} from "./getSigner";

function verifyMessage(message: any, address: any, signature: any) {
    try {
        const signerAddr = ethers.verifyMessage(message, signature);
        return signerAddr === address;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function signAndSendTransaction(address: string, data: string) {

    const signer = await getSigner()
    const signature = await signer.signMessage(data);

    if (verifyMessage(data, address, signature)) {
        const transactionParameters = {
            from: address, data: data, chainId: localChain
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