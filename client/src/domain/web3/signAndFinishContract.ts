import {getSigner} from "./getSigner";
import {ethers, parseEther} from "ethers";
import Web3 from "web3";

export async function signAndFinishContract(address: string) {

    console.log(address)

    const signer = await getSigner()

    const abi = ["function sendDeposit(uint progress) payable public"]

    const checkedAddress = Web3.utils.toChecksumAddress(address)

    const depositHolder = new ethers.Contract(signer.address, abi, signer)

    const result = await depositHolder.sendDeposit(0)

    await result.wait()

    console.log(result)

    // const tx = await signer.sendTransaction({
    //     to: '0xd4039eB67CBB36429Ad9DD30187B94f6A5122215',
    //     value: parseEther(deposit),
    //     chainId: '0x539'
    // })

    //console.log(tx)

}