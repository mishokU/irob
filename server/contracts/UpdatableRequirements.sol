// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract UpdatableRequirements {

    //Means the main wallet
    address payable private buyer;
    address payable private seller;

    mapping(string => Requirement) public requirements;
    string[] public requirementNames;

    uint requirementsSize = 0;
    uint depositCost = 0;
    bool isActive = true;

    struct Requirement {
        uint value;
        uint maxValue;
    }

    constructor(address payable _seller) {
        require(
            tx.origin != _seller,
            "Addresses of buyer and seller can not be equal"
        );
        buyer = payable(tx.origin);
        seller = _seller;
    }

    function addRequirement(string calldata _name, uint _maxValue) public {
        requirementNames.push(_name);
        requirements[_name] = Requirement(0, _maxValue);
    }

    //The main function in smart contract
    function updateRequirement(string calldata name) public {
        if (!isContractEnded()) {
            if (requirements[name].value != requirements[name].maxValue) {
                requirements[name].value += 1;
            }
        } else {
            sendDeposit();
        }
    }

    function getRequirementsSize() public view returns (uint) {
        return requirementNames.length;
    }

    function getCurrentProgress() public view returns (uint) {
        uint currentProgress = 0;
        for (uint i = 0; i < requirementNames.length; i++) {
            Requirement memory requirement = requirements[requirementNames[i]];
            currentProgress += (requirement.value * 100) / requirement.maxValue;
        }
        return currentProgress;
    }

    function isContractEnded() private view returns (bool) {
        string memory durationDays = "Duration days";
        if (requirements[durationDays].value >= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function sendDeposit() private {
        uint maxProgress = 100;
        bool isSend = false;
        if (getCurrentProgress() >= maxProgress) {
            isSend = buyer.send(depositCost);
        } else {
            isSend = seller.send(depositCost);
        }
        require(isSend, "Failure! Ether not send. Error: 1");
        isActive = false;
    }

}