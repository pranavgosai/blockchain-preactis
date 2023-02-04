// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Wallet {
    mapping (address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Cannot deposit 0 or negative value");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        require(address(this).balance >= amount, "Contract does not have enough balance");
        address payable sender = msg.sender;
        sender.transfer(amount);
        balances[msg.sender] -= amount;
    }

    function transfer(address payable recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        require(recipient != address(0), "Invalid recipient address");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }
}