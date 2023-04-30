import {getSigner} from "./getSigner";
import {parseEther} from "ethers";
import {testChain} from "../../data/slices/IrobConfigSlice";

export async function signAndSendDeposit(address: string, deposit: string) {

    const signer = await getSigner()
    const tx = await signer.sendTransaction({
        to: address,
        value: parseEther(deposit),
        chainId: testChain
    })

    return await tx.wait()

}