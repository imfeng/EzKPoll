//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Feedback {
    ISemaphore public semaphore;

    address public owner;

    uint256 public groupId;

    constructor(address semaphoreAddress, uint256 _groupId) {
        semaphore = ISemaphore(semaphoreAddress);
        groupId = _groupId;
        owner = msg.sender;

        semaphore.createGroup(groupId, 20, address(this));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function joinGroup(uint256 identityCommitment) public onlyOwner(){
        semaphore.addMember(groupId, identityCommitment);
    }

    function verifyVote(
        uint256 vote,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        semaphore.verifyProof(groupId, merkleTreeRoot, vote, nullifierHash, groupId, proof);
    }
}

