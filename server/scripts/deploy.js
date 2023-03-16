const hre = require("./config")

module.exports = {
    deployTestContract,
    deployContract
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
        console.log(e)
        return 0;
    }
}

async function deployContract(sellerAddress, listRequirements, depositCost) {
    try {
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

        const [owner,  feeCollector, operator] = await hre.ethers.getSigners();

        const data = await owner.sendTransaction({
            to: process.env.DEPOSIT_ADDRESS,
            value: hre.ethers.utils.parseEther(depositCost.toString())
        });

        return {
            requirementsContractAddress: requirements.address,
            depositTransferData: data
        }

    } catch (e){
        console.log("Deploy real contract error: " + e.message)
    }
}