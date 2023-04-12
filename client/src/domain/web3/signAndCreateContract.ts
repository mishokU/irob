import {ethereum, localChain} from "./isMetamaskAvailable";
import {ethers, parseEther} from "ethers";
import {getSigner} from "./getSigner";
import Web3 from "web3";

function verifyMessage(message: any, address: any, signature: any) {
    try {
        const signerAddr = ethers.verifyMessage(message, signature);
        return signerAddr === address;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function signAndCreateContract(address: string, data: string, depositCost: string) {

    console.log(data)

    const signer = await getSigner()
    const signature = await signer.signMessage(data);

    if (verifyMessage(data, address, signature)) {

        const ether = "0x" + Web3.utils.toBN(Web3.utils.toWei(depositCost, "ether")).toString(16)

        const transactionParameters = {
            from: address,
            data: data,
            chainId: localChain,
            gasLimit: 3000000,
            value: ether
        };

        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction', params: [transactionParameters],
        });

        console.log(txHash)

        const transactionReceipt = await ethereum.request({
            method: 'eth_getTransactionReceipt', params: [txHash]
        })

        console.log("contract")
        console.log(transactionReceipt)

        if(!transactionReceipt){
            throw Error("No contract address!")
        }

        // @ts-ignore
        return transactionReceipt.contractAddress

    } else {
        throw Error("Message not verified!")
    }

}