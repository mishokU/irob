import {getSigner} from "./getSigner";
import {ethers} from "ethers";
import Web3 from "web3";

export async function signAndFinishContract(address: string) {

    console.log(address)

    const signer = await getSigner()

    console.log(signer)

    const abi = ["function sendDeposit(uint progress) payable public"]

    const checkedAddress = Web3.utils.toChecksumAddress(address)

    console.log(checkedAddress)

    const depositHolder = new ethers.Contract(checkedAddress, abi, signer)

    const result = await depositHolder.sendDeposit(0)

    result.chainId = 1337
    result.gasLimit = 30000;

    await result.wait()

    console.log(result)

    // const tx = await signer.sendTransaction({
    //     to: '0xd4039eB67CBB36429Ad9DD30187B94f6A5122215',
    //     value: parseEther(deposit),
    //     chainId: '0x539'
    // })

    //console.log(tx)

}