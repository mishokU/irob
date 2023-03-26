const hre = require("./config")

const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");
const {hexlify, concat} = require("@ethersproject/bytes");

module.exports = {
    deployTestContract,
    getContractData
}


async function getContractData(sellerAddress, buyerAddress, depositCost) {

    const DepositHolder = await hre.ethers.getContractFactory("DepositHolder");

    const depositAddress = process.env.DEPOSIT_ADDRESS


    return hexlify(concat([
        DepositHolder.bytecode,
        DepositHolder.interface.encodeDeploy([sellerAddress, buyerAddress, depositAddress, depositCost])
    ]));

}

async function deployTestContract(listRequirements, sellerAddress, depositCost) {
    try {

        const Lib = await hre.ethers.getContractFactory("StringUtils");
        const lib = await Lib.deploy();
        await lib.deployed();

        const Requirements = await hre.ethers.getContractFactory("RequirementsStorage", {
            libraries: {
                StringUtils: lib.address
            }
        });

        const requirements = await Requirements.deploy(sellerAddress, depositCost);
        await requirements.deployed();
        let fullEther = 0.0;

        for (const requirement of listRequirements) {
            const data = await requirements.addRequirement(requirement.type, requirement.value);
            fullEther += Number(hre.ethers.utils.formatEther(data.gasLimit * 1000000000))
        }
        fullEther += Number(hre.ethers.utils.formatEther(requirements.deployTransaction.gasLimit * 1000000000))
        return fullEther
    } catch (e) {
        console.log("Error: ")
        console.log(e)
        return 0;
    }
}

async function deployContract(buyerAddress, sellerAddress, listRequirements, depositCost) {
    try {

        hre.network = setupHreEnvironment(buyerAddress);

        const Lib = await hre.ethers.getContractFactory("StringUtils");
        const lib = await Lib.deploy();
        await lib.deployed();

        const Requirements = await hre.ethers.getContractFactory("RequirementsStorage", {
            libraries: {
                StringUtils: lib.address
            }
        });

        /*
            Creating smart contract with requirements
        */

        const requirements = await Requirements.deploy(sellerAddress, depositCost);
        await requirements.deployed();
        let fullEther = 0.0;
        for (const requirement of listRequirements) {
            const data = await requirements.addRequirement(requirement.type, requirement.value);
            fullEther += Number(hre.ethers.utils.formatEther(data.gasLimit * 1000000000))
        }

        /*
            Transfer eth deposit from buyer account to deposit account
        */

        const [owner] = await hre.ethers.getSigners();

        console.log(owner)

        const data = await owner.sendTransaction({
            to: process.env.DEPOSIT_ADDRESS,
            value: hre.ethers.utils.parseEther(depositCost.toString())
        });

        return {
            requirementsContractAddress: requirements.address,
            depositTransferData: data,
            error: null
        }

    } catch (e) {
        const message = "Deploy real contract error: " + e.message
        console.log(message)
        return {
            error: message
        }
    }
}

function setupHreEnvironment(account) {

    const networkName = process.env.PROVIDER_NAME

    const networkConfig = {
        url: process.env.PROVIDER_KEY,
        accounts: [account]
    }

    const provider = lazyObject(() => {
        return createProvider(
            networkName,
            networkConfig,
            hre.config.paths,
            hre.artifacts
        );
    });

    return {
        name: networkName,
        config: networkConfig,
        provider,
    }
}