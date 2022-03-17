// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IMetadata {
    function pointCount() external view returns (uint256);

    function getPoint(uint256 index) external view returns(bytes2, bytes2[] memory);
}