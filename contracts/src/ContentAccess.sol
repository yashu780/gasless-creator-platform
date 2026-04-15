// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ContentAccess {
    mapping(uint => address) public contentCreator;
    mapping(uint => uint) public price;
    mapping(address => mapping(uint => bool)) public hasAccess;

    event ContentCreated(uint contentId, address creator, uint price);
    event ContentPurchased(address user, uint contentId);

    function createContent(uint contentId, uint _price) external {
        require(contentCreator[contentId] == address(0), "Already exists");

        contentCreator[contentId] = msg.sender;
        price[contentId] = _price;

        emit ContentCreated(contentId, msg.sender, _price);
    }

    function buyContent(uint contentId) external payable {
        require(msg.value >= price[contentId], "Not enough ETH");

        address creator = contentCreator[contentId];
        payable(creator).transfer(msg.value);

        hasAccess[msg.sender][contentId] = true;

        emit ContentPurchased(msg.sender, contentId);
    }

    function checkAccess(address user, uint contentId) external view returns (bool) {
        return hasAccess[user][contentId];
    }
}