// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// OPEYEMI COMMENT

// In order to call a contract where the EOA wont be the msg.sender
// We need to call the function from another contract...which is this contract im creating
// Therefore my wallet is the EOA in the tx.orign while the contract is the address of the msg.sender

contract EventCallerContract {
    function callEvent(address alchemyContract) external {
        (bool success, ) = alchemyContract.call(
            abi.encodeWithSignature("attempt()")
        );
        require(success);
    }
}
