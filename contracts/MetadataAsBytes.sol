// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MetadataAsBytes {

    bytes public data;

    function pointCount() public view returns (uint256) {
        return data.length / 3;
    }

    function setData(bytes memory _data) public {
        require(data.length == 0, "Data already set");
        data = _data;
    }

    function getPoint(uint32 index) public view returns(bytes1, bytes1[] memory) {
        require(index < data.length / 3, "Index out of bounds");
        bytes1 n = data[index * 3];
        bytes1[] memory m = new bytes1[](2);
        m[0] = data[index * 3 + 1];
        m[1] = data[index * 3 + 2];
        
        return (n, m);
    }
}