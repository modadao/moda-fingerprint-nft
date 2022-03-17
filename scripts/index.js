// 1
// 9999
// 1
// 8888
// 1
// 7777

// 199991888817777 // => to hex

// 0x01 & 0x270F & 

// 0x01270F01


const hh = require("hardhat");

const z = hh.ethers.BigNumber.from(1);
const z_bytes = hh.ethers.utils.hexlify(z);
// console.log(z_bytes);
// const z_array = hh.ethers.utils.arrayify(z_bytes);
// console.log(z_array);

const z_result = z_bytes.replace(/^0x/, "");
console.log(z_result);


const y = hh.ethers.BigNumber.from(9999);
const y_bytes = hh.ethers.utils.hexlify(y);
// console.log(y_bytes);

const y_result = y_bytes.replace(/^0x/, "");
console.log(y_result);


const result = z_result + y_result;
console.log(result);


// const y_array = hh.ethers.utils.arrayify(y_bytes);
// console.log(y_array);


// console.log(y_array);

// console.log(y.toHexString());

// // string of bytes as hex
// await contractWithSigner.setData("0x");


999999

0609