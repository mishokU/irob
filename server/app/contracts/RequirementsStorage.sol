// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./StringUtils.sol";
import "./Alive.sol";

contract RequirementsStorage is Alive {

    address payable private buyer;
    address payable private seller;

    mapping(string => Requirement) public requirements;
    string[] public requirementNames;

    uint depositCost = 0;

    struct Requirement {
        uint maxValue;
    }

    event RequirementEvent(
        address indexed _from,
        string _name,
        uint _value
    );

    constructor(address payable _seller, uint _deposit){
        require(
            tx.origin != _seller,
            "Addresses of buyer and seller can not be equal"
        );
        buyer = payable(tx.origin);
        seller = _seller;
        depositCost = _deposit;
    }

    function addRequirement(string calldata _name, uint _maxValue) public {
        if (!contains(_name)) {
            requirementNames.push(_name);
            requirements[_name] = Requirement(_maxValue);
        }
    }

    function getRequirementsSize() public view returns (uint) {
        return requirementNames.length;
    }

    function getDepositCost() public view returns (uint) {
        return depositCost;
    }

    function getAllRequirements() public {
        for (uint i = 0; i < requirementNames.length; i++) {
            Requirement memory requirement = requirements[requirementNames[i]];
            emit RequirementEvent(buyer, requirementNames[i], requirement.maxValue);
        }
    }

    function sendDeposit(uint progress) public {
        require(msg.sender == buyer, "Failure! Send deposit can only owner");
        if (isContractEnded() && isAlive) {
            if (depositCost != 0) {
                uint maxProgress = 100;
                bool isSend = false;
                if (progress >= maxProgress) {
                    isSend = buyer.send(depositCost);
                } else {
                    isSend = seller.send(depositCost);
                }
                require(isSend, "Failure! Ether not send. Error: 1");
                isAlive = false;
            }
        }
    }

    function contains(string calldata _name) private view returns (bool){
        bool isContains = false;
        for (uint i = 0; i < requirementNames.length; i++) {
            if (StringUtils.equal(requirementNames[i], _name)) {
                isContains = true;
                break;
            }
        }
        return isContains;
    }

    function isContractEnded() private view returns (bool) {
        string memory durationDays = "Duration days";
        if (requirements[durationDays].maxValue >= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

}