//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Sport {
    string private greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

     function sendTip(address to) public payable {
        payable(to).transfer(msg.value);
    }
}
