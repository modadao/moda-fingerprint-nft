// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MetadataBytesCompressedWithMapsAndArrays {

    // x values in an array to iterate over
    bytes2[] public x_array;

    // x => array of y
    mapping(bytes2 => bytes2[]) public y_map;

    uint256 private _count;

    function setData(bytes2[] memory x, bytes2[][] memory y) public {
        require(x.length == y.length, "x and y must have the same length");

        for (uint256 i = 0; i < x.length; i++) {
            bytes2 _x_value = x[i];
            x_array.push(_x_value);
            y_map[_x_value] = y[i];

            _count += y[i].length;
        }
    }
    
    function pointCount() external view returns (uint256) {
        return _count;
    }

    function getPoint(uint256 index) external view returns(bytes2 x, bytes2 y) {
        uint256 count = 0;
        for (uint256 i = 0; i < x_array.length; i++) {
            
            bytes2[] memory _y = y_map[x_array[i]];

            for (uint256 j = 0; j < _y.length; j++) {
                if (count == index) {
                    return (x_array[i], _y[j]);
                }
                count++;
            }
        }

        return (0, 0);
    }
}