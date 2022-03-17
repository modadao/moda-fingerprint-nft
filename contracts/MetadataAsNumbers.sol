// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

struct Meta {
    uint256 created;
    address owner;
    uint8 x_shape;
    uint8 y_shape;
}

contract MetadataAsNumbers {

    mapping (bytes32 => Meta) public metadata;

    // x values in an array to iterate over
    mapping(bytes32 => uint32[]) public x_array;

    // id => x => array of y
    mapping(bytes32 => mapping(uint32 => uint32[])) public y_map;
    mapping(bytes32 => uint256) private _count;

    uint256 public total;

    function uniqueX(bytes32 id) public view returns (uint256) {
        return x_array[id].length;
    }

    function pointCount(bytes32 id) external view returns (uint256) {
        return _count[id];
    }

    function setData(bytes32 id, uint32[] memory x, uint32[][] memory y, uint8 x_shape, uint8 y_shape) public {
        require(metadata[id].owner == msg.sender || metadata[id].owner == address(0));
        require(x.length == y.length, "x and y must have the same length");

        for (uint256 i = 0; i < x.length; i++) {
            uint32 _x_value = x[i];
            x_array[id].push(_x_value);
            y_map[id][_x_value] = y[i];

            _count[id] += y[i].length;
        }

        // Do not reset if appending
        if (metadata[id].owner == address(0)) {
            metadata[id] = Meta({created: block.timestamp, owner: msg.sender, x_shape: x_shape, y_shape: y_shape});
        }
        
        total++;
    }

    function getPoint(bytes32 id, uint32 index) external view returns(uint32 x, uint32 y) {
        uint256 count = 0;
        for (uint32 i = 0; i < x_array[id].length; i++) {
            
            uint32[] memory _y = y_map[id][x_array[id][i]];

            for (uint32 j = 0; j < _y.length; j++) {
                if (count == index) {
                    return (x_array[id][i], _y[j]);
                }
                count++;
            }
        }

        return (0, 0);
    }
}