// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Alive.sol";

contract DepositHolder is Alive {

    address payable private deposit;
    address payable private buyer;
    address payable private seller;

    uint depositCost = 0;

    //Buyer called this contract
    constructor(address payable _seller, address payable _buyer, address payable _deposit, uint8 _depositCost){
        buyer = _buyer;
        deposit = _deposit;
        seller = _seller;
        depositCost = _depositCost;
    }

    function takeDeposit() internal {
        bool sent = deposit.send(depositCost);
        require(sent, "Failed to send Ether");
    }

    // Think how to send
    function sendDeposit(uint progress) payable public {
        require(
            msg.sender == buyer ||
            msg.sender == deposit ||
            msg.sender == seller, "Failure! Send deposit can only owner");

        if (isContractAlive()) {
            if (depositCost != 0) {
                uint maxProgress = 100;
                bool isSend = false;
                if (progress >= maxProgress) {
                    isSend = buyer.send(depositCost);
                } else {
                    isSend = seller.send(depositCost);
                }
                require(isSend, "Failure! Ether not send. Error: 1");
                disableContract();
            }
        }
    }

}