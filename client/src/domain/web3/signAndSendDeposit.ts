import {getSigner} from "./getSigner";
import {parseEther} from "ethers";

export async function signAndSendDeposit(address: string, deposit: string) {

    const signer = await getSigner()
    const tx = await signer.sendTransaction({
        to: '0xd4039eB67CBB36429Ad9DD30187B94f6A5122215',
        value: parseEther("2"),
        chainId: '0x539'
    })

    console.log(tx)

}