// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Feedback {
    ISemaphore public semaphore;

    uint256 public groupId;


    uint256 public feedbackA = 130;
    uint256 public feedbackB = 90;
    uint256 public feedbackC = 70;

   
    event FeedbackAdded(uint256 indexed groupId, uint256 feedbackType, uint256 newValue);

    constructor(address semaphoreAddress, uint256 _groupId) {
        semaphore = ISemaphore(semaphoreAddress);
        groupId = _groupId;

        semaphore.createGroup(groupId, 20, address(this));
    }

    function joinGroup(uint256 identityCommitment) external {
        semaphore.addMember(groupId, identityCommitment);
    }

    function sendFeedback(
        uint256 feedback,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        
        if (feedback == 1) {
            feedbackA++;
            
            emit FeedbackAdded(groupId, feedback, feedbackA);
        } else if (feedback == 2) {
            feedbackB++;
            
            emit FeedbackAdded(groupId, feedback, feedbackB);
        } else if (feedback == 3) {
            feedbackC++;
            
            emit FeedbackAdded(groupId, feedback, feedbackC);
        }

        semaphore.verifyProof(groupId, merkleTreeRoot, feedback, nullifierHash, groupId, proof);
    }
}