// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Alive {

    bool internal isAlive = true;

    constructor(){}

    function disableContract() internal {
        isAlive = false;
    }

    function isContractAlive() public view returns (bool)  {
        return isAlive;
    }

}