import {ethereum} from "./isMetamaskAvailable";
import {ethers} from "ethers";
import {getSigner} from "./getSigner";
import Web3 from "web3";
import {wait} from "@testing-library/user-event/dist/utils";

function verifyMessage(message: any, address: any, signature: any) {
    try {
        const signerAddr = ethers.verifyMessage(message, signature);
        return signerAddr === address;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function signAndCreateContract(address: string, data: string, depositCost: string, chainHexId: string) {

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await getSigner()
    const signature = await signer.signMessage(data);

    if (verifyMessage(data, address, signature)) {

        const ether = "0x" + Web3.utils.toBN(Web3.utils.toWei(depositCost, "ether")).toString(16)

        const transactionParameters = {
            from: address,
            data: data,
            chainId: chainHexId,
            gasLimit: 3000000,
            value: ether
        };

        // As with any RPC call, it may throw an error
        const txHash: any = await ethereum.request({
            method: 'eth_sendTransaction', params: [transactionParameters],
        });

        await provider.waitForTransaction(txHash, 1, 150000)

        const transactionReceipt = await ethereum.request({
            method: 'eth_getTransactionReceipt', params: [txHash]
        })

        if (!transactionReceipt) {
            throw Error("No contract address!")
        }

        // @ts-ignore
        return transactionReceipt.contractAddress

    } else {
        throw Error("Message not verified!")
    }

}