import {getSigner} from "./getSigner";
import {parseEther} from "ethers";
import {testChain} from "../../data/slices/IrobConfigSlice";

export async function signAndSendDeposit(address: string, deposit: string) {

    const signer = await getSigner()
    const tx = await signer.sendTransaction({
        to: address,
        value: parseEther(deposit),
        chainId: '0x539'
    })

    console.log(tx)

    const result = await tx.wait()

    console.log("transfer result: ")
    console.log(result)

    return result

}