const { expect } = require("chai");
const { ethers } = require("hardhat");

const utils = require("../scripts/utils");

describe("MetadataAsNumbers", () => {
  let metadata;

  beforeEach(async () => {
    const Metadata = await ethers.getContractFactory("MetadataAsNumbers");
    metadata = await Metadata.deploy();
    await metadata.deployed();
  });

  it("Should have count of 0", async () => {
    expect(await metadata.count()).to.equal(0);
  });

  it.only("should set data from first THE SOUND", async () => {
    const hash = "0x4688174a2d788ed969a32d3af25132cb48a45a4d10982c7f1f21b93067057b2a";
    const data = require("../data/The_Sound_10d.json");

    // 1 => 67
    // 3 => [212,226]
    // 6 => [89,100,181,199]

    // new file
    // Row 0 x=0 .. y=216 
    // Row 1 x=1 .. y=217
    // Row 3 x=28
    // Row? x=4038 ..y[1, 2]

    const [ x, y ] = utils.doMapping(data, 15, 0);
    // const [ x, y ] = utils.doMapping(data, 0, 0);
    await metadata.setData(hash, x, y); //, 255, 4418

    // const count = await metadata.pointCount(hash);
    // expect(count).to.equal(3); // 

    // const [ x1, y1 ] = await metadata.getPoint(hash, 0);
    // expect(x1).to.equal(0);
    // expect(y1).to.equal(216);

    // const [ x2, y2 ] = await metadata.getPoint(hash, 1);
    // expect(x2).to.equal(1);
    // expect(y2).to.equal(31);

    // const [ x3, y3 ] = await metadata.getPoint(hash, 2);
    // expect(x3).to.equal(28);
    // expect(y3).to.equal(217);

    const [ xn, yn ] = await metadata.getPoint(hash, 13);
    expect(xn).to.equal(153);
    expect(yn).to.equal(141);

    const [ xn1, yn1 ] = await metadata.getPoint(hash, 14);
    expect(xn1).to.equal(153);
    expect(yn1).to.equal(193);
  });

  it("should set data from first 50 x values HYDRA_10", async () => {
    const hash = "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b279e";
    const data = require("../data/HYDRA_10.json");

    const [ x, y ] = utils.doMapping(data, 50, 0);
    await metadata.setData(hash, x, y);

    const count = await metadata.pointCount(hash);
    expect(count).to.equal(97);
  });

  it("should set data from HYDRA_10 as uints", async () => {
    const hash = "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b279e";
    const data = require("../data/HYDRA_10.json");

    const [ x, y ] = utils.doMapping(data, 50, 0);
    await metadata.setData(hash, x, y);

    const count = await metadata.pointCount(hash);
    expect(count).to.equal(50);
  });

  it("should set data from HYDRA_10 as uints in 2 batches", async () => {
    const hash = "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b279e";
    const data = require("../data/HYDRA_10.json");

    console.log(data.coords.x.length);
    console.log(data.coords.y.length);

    // first chunk // 1 => 67
    const [ x1, y1 ] = utils.doMapping(data, 1, 0);
    expect(x1.length).to.equal(1);
    expect(y1.length).to.equal(1);
    expect(x1[0]).to.equal(1);
    expect(y1[0]).to.eql([67]);

    await metadata.setData(hash, x1, y1);
    let count = await metadata.pointCount(hash);
    expect(count).to.equal(1);

    // second chunk // 3 => 212,226
    const [ x2, y2 ] = utils.doMapping(data, 1, 1);
    expect(x2.length).to.equal(1);
    expect(y2.length).to.equal(1);
    expect(x2[0]).to.equal(3);
    expect(y2[0]).to.eql([212, 226]);
  });

  it("should set data from Sound_10 in 50 chunks", async () => {
    const hash = "0x4688174a2d788ed969a32d3af25132cb48a45a4d10982c7f1f21b93067057b2c";
    const data = require("../data/The_Sound_10d.json");

    expect(data.coords.x.length).to.equal(552);
    expect(data.coords.y.length).to.equal(552);

    const [ x, y ] = utils.doMapping(data, 0, 0);
    expect(x.length).to.equal(477);
    // expect(y.length).to.equal(1473);

    for (j = 0; j < 12; j++) {
      
      const x1 = x.slice(j * 50, (j + 1) * 50);
      const y1 = y.slice(j * 50, (j + 1) * 50);

      const tx = await metadata.setData(hash, x1, y1);
      console.log(`j: ${j} => ${tx.hash}`);
      const x_count = await metadata.uniqueX(hash);
      console.log(`x_count: ${x_count}`);
    };

    const count = await metadata.pointCount(hash);
    expect(count).to.equal(552);
  });

  it("should set data from HYDRA_80 as uints", async () => {
    const hash = "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b279e";
    const data = require("../data/HYDRA_80.json");
    const coords = new Map();

    const [ x, y ] = utils.doMapping(data, 50, 0);
    await metadata.setData(hash, x, y);

    const count = await metadata.pointCount(hash);
    expect(count).to.equal(50);
  });

  it.skip("should set data as arrays", async () => {
    const hash = "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b279e";
    const data = require("../data/fingerprint.json");
    const coords = new Map();

    data.coords.forEach((element) => {
      let y = [];

      // map x to an array of y values
      if (coords.has(element.x)) {
        y = coords.get(element.x);
      }

      y.push(element.y);
      coords.set(element.x, y);
    });

    const x = []; // array of x values
    const y = []; // array of y array values

    const values = Array.from(coords.values());
    const keys = Array.from(coords.keys());

    const limit = 60;
    for (let j = 0; j < values.length / limit; j++) {
      for (let i = 0; i < limit; i++) {
        x.push(keys[i]);
        y.push(values[i]);
      }

      for (let i = 0; i < x.length; i++) {
        console.log(x[i] + " => " + y[i]);
      }

      console.log(x.length);

      await metadata.setData(hash, x, y);
    }

    const count = await metadata.pointCount(hash);
    expect(count).to.equal(88);
  });
});
