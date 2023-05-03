import {getSigner} from "./getSigner";
import {parseEther} from "ethers";

export async function signAndSendDeposit(address: string, deposit: string, chainHexId: string) {

    const signer = await getSigner()
    const tx = await signer.sendTransaction({
        to: address,
        value: parseEther(deposit),
        chainId: chainHexId
    })

    return await tx.wait()

}