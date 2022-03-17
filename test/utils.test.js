const { expect } = require("chai");
const utils = require("../scripts/utils");

describe("Utils", () => {

  it("Should parse data 1 point", async () => {
    const data = require("../data/HYDRA_10.json");

    const [ x1, y1 ] = utils.doMapping(data, 1, 0);

    expect(x1.length).to.equal(1);
    expect(y1.length).to.equal(1);

    expect(x1[0]).to.equal(1);
  });

  it("Should parse data into 50 points", async () => {
    const data = require("../data/HYDRA_10.json");

    const [ x1, y1 ] = utils.doMapping(data, 50, 0);

    expect(x1.length).to.equal(50);
    // expect(y1.length).to.equal(50);

    expect(x1[0]).to.equal(1); // 1 => 67
    expect(x1[1]).to.equal(3); // 3 => 212,226
    expect(x1[49]).to.equal(84); // 6 => 89,100,181,199

    expect(y1[0].length).to.equal(1); // 1 => 67
    expect(y1[1].length).to.equal(2); // 3 => 212,226
    expect(y1[2].length).to.equal(4); // 6 => 89,100,181,199
  });

  it("Should parse data into 100 points", async () => {
    const data = require("../data/HYDRA_10.json");

    const [ x1, y1 ] = utils.doMapping(data, 100, 0);

    expect(x1.length).to.equal(100);
    expect(x1[0]).to.equal(1);
  });
});
