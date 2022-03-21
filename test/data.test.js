const { expect } = require("chai");
const { ethers } = require("hardhat");
const np = require("number-pairings");

describe("Metadata", () => {

  const test_points = "0x7f8889b591018302ee04d2072f0a050d54155d1a171f4a27b22e0e34e33c3143f84c3854f15e2367ce71f277ad93349f3cabbdb8b7c62ad416e27bf159f9a84c1360dc01108e14b92a1f3f2247156b9b75eb8bf697b1d96f09b1196b77e70154b44ed0e16baada3340ed85012d33588213aa182d288c2ef39492c7b4d5abbdda01639f85e8a0aa01124601211901566c25d2547572477ce422254d5401124cf736013ccbb0c5016dbf0128b79b2ecb8c45d00113ce019054d85a1eb3589fe8390110e60172de68397818014ccbc2e0013e74018796990d01084120ba2cb7850442f74b2101b487675b012ee90125c33d565986e84bf32f016f8801621f0187a201af09bb9dddb3016229014b4801d2a231a038ac50a65996773ca56201434d6b1001b0f0b810e1b3011fd501308c448593c1018cf9019cfbf1ea016fa30179de2fd58b5365b30168ebdf1a016240f77a01385c0149c301d2b90205a801b68b01d0d70128fb01b2e549d352605a8f6edd794e9b77b36bcfa1ddda010b5b011b78014ea50160a601716d019b49f2030180df018edc01efdf021c1601451101e04501dc6c01b88252725b7864f76eef7960844a8fada7deb4acc1f3cfb3ddecec9efbc9011b8a013d2f017332019ef49ca701af4f011a15015bcb0201cc02595401ec050246000158885906be58e8a001d10001ba6f022aaa01a641012c3766d670e47b6b866b91e49dd6aa41d258e0a7feb0010e6a019d3e01786a027c8c026adb01d2f6bd3101407a019d4ad8d801f9f0023b80ea1002141801ea3676ac7d7c88929421acaab9a4c717d50301116d0121b6016794eb7601dca202162e027ca601aa04a8170165f101e08902d1d20273d1a822c237cff701cd688ccdf7e10228c9029a07026d3a01737c017f7d02c15ac4b60140a2015240019d7201c5e101f03401101301205102102d024cab0132940167b002ddcc01af9b020415a169bafad66fe4df01e481b04cf68d02ac75023bbcabb302b37602e77f027aa1c74ed53a0101d40111a40143ea01559e018d9001a12801c9c301dec60220a50297e2f3de02fd57ebae0171ea0271c603434a0132b6026041bff4cda1dbc4ea6001090301190a01298a014bf5015de001704401967701aa4601be8e01e8890214680259c202a35d02d6cc01dafa023582024cd702fd66031609034d98021474033e4a02558202b840dd27021276032c9c011a9e012b29015fa001720f0184f701ac3201d55101ea9602742102d947ed2ffc5a010bfe013dc0014f48019a2201c44602316a0248a902913c02f89e0358000391cb03af69035fd2035aa80104ea019156022505023c020283cf02dbc20304ee03202c010efb011f2e012fda01529d0164b4017744019dcf01b1ca01c63e01fa730255a102b85f0148f301e4d7029efb026fd20340fe03aa1303a4b103e0fa03f75e01223a0132fc014437016818017abe01df1303396701631b026db1028864039cac0408610129d401d39901e8d3022b5702427502bd2202d71602f18303b7ba025c3801aa9301bedb0322c8033e8a015e2e017918021ef403f1d401511e043939014120019df0";

  it("Should set as uint16", async () => {
    const Metadata = await ethers.getContractFactory("Metadata");
    const metadata = await Metadata.deploy();
    await metadata.deployed();

    await metadata.set16(1);
  });

  it("Should set as uint16 256", async () => {
    const Metadata = await ethers.getContractFactory("Metadata");
    const metadata = await Metadata.deploy();
    await metadata.deployed();

    await metadata.set16(256);
  });

  it("Should set as uint32", async () => {
    const Metadata = await ethers.getContractFactory("Metadata");
    const metadata = await Metadata.deploy();
    await metadata.deployed();

    await metadata.set32([4294967295]);
  });

  it("Should set as array", async () => {
    const pair = np.Cantor();
    const data = require("../data/fingerprint.json");

    const Metadata = await ethers.getContractFactory("Metadata");
    const metadata = await Metadata.deploy();
    await metadata.deployed();

    const points = [];

    data.coords.forEach((element) => {
      const z = pair.join(element.x, element.y);
      points.push(z);
    });

    console.log(points.length);

    await metadata.setDataAsArray(points);
    expect(await metadata.count()).to.equal(points.length);
  });

  it("Should set as bytes", async () => {
    const pair = np.Cantor();
    const data = require("../data/fingerprint.json");

    const Metadata = await ethers.getContractFactory("Metadata");
    const metadata = await Metadata.deploy();
    await metadata.deployed();

    let points;

    data.coords.forEach((element) => {
      const z = pair.join(element.x, element.y);

      if (z) {
        const z_number = ethers.BigNumber.from(z);
        const z_bytes = ethers.utils.hexlify(z_number);

        const z_result = z_bytes.replace(/^0x/, "");
        console.log(z_result);
  
        points += z_result;
      }
    });

    await metadata.setData(points);
    expect(await metadata.getDataAsArray()).to.deep.equal(points);
    expect(await metadata.count()).to.equal(points.length);
  });
});
