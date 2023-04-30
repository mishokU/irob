import {getSigner} from "./getSigner";
import {ethers} from "ethers";
import Web3 from "web3";
import {testChainId} from "../../data/slices/IrobConfigSlice";

export async function signAndFinishContract(address: string, progress: number) {

    const signer = await getSigner()

    const abi = ["function sendDeposit(uint progress) payable public"]

    const checkedAddress = Web3.utils.toChecksumAddress(address)

    const depositHolder = new ethers.Contract(checkedAddress, abi, signer)

    const result = await depositHolder.sendDeposit(progress)

    result.chainId = testChainId
    result.gasLimit = 30000;

    await result.wait()

}