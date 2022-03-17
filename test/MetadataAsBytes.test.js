const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MetadataAsBytes", () => {
  let metadata;

  const toFixLengthBytes = (i) => {
    let j = Number(i).toString(16);
    console.log(j.length);

    j = j.padStart(4, "0");
    console.log(j);

    const bytes = ethers.utils.hexlify("0x" + j);
    return bytes;
  };

  beforeEach(async () => {
    const Metadata = await ethers.getContractFactory(
      "MetadataBytesCompressedWithMapsAndArrays"
    );
    metadata = await Metadata.deploy();
    await metadata.deployed();
  });

  it("Should have count of 0", async () => {
    expect(await metadata.count()).to.equal(0);
  });

  // it.only("should set data bytes", async () => {
  //   const hash = "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b279e";
  //   const data = require("../data/HYDRA_80.json");
  //   const coords = new Map();
    
  //   data.coords.forEach((element) => {

  //     let y = [];
  //     const x_byte = toFixLengthBytes(element.x);

  //     if (coords.has(x_byte)) {
  //       y = coords.get(x_byte);
  //     }

  //     const y_byte = toFixLengthBytes(element.y);
  //     y.push(y_byte);

  //     coords.set(x_byte, y);
  //   });

  //   const x = []; // array of x values
  //   const y = []; // array of y array values

  //   const values = Array.from(coords.values());
  //   const keys = Array.from(coords.keys());

  //   const limit = 50;
  //   for (let i = 0; i < limit; i++) {
  //     x.push(keys[i]);
  //     y.push(values[i]);
  //   };

  //   for (let i = 0; i < x.length; i++) {
  //     console.log(x[i] + " => " + y[i]);
  //   }

  //   let fingerprint = {
  //     shape: [x.length, 352],
  //     coords: []
  //   };

  //   console.log(x.length);

  //   // const hack_x = ["0x006E"];
  //   // const hack_y = [["0x009C","0x00EB","0x0111","0x0185"]];

  //   await metadata.setData(hash, x, y);
  //   const count = await metadata.pointCount();

  //   // expect(count).to.equal(7);

  // });
});
