//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ModaNFT is ERC721, Ownable {

  uint256 public totalSupply;

  function mint(address to) public onlyOwner() {
    require(to != address(0), "Invalid address");

    _safeMint(to, totalSupply);
    totalSupply++;
  }
}
