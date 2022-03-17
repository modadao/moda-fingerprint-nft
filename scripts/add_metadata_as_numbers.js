require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const hre = require("hardhat");
const utils = require("./utils");

const main = async () => {

  const rpcUrl = process.env.KOVAN_URL;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const key = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(key, provider);

  const address = process.env.CONTRACT || "0x5FfFA5E56A57B3864A105e1afE9DfF886cf5756b";
  const Metadata = require("../artifacts/contracts/MetadataAsNumbers.sol/MetadataAsNumbers.json");
  const contract = new hre.ethers.Contract(
    address,
    Metadata.abi,
    wallet.provider
  );

  const contractWithSigner = contract.connect(wallet);

  // sha256sum data.json
  const hash =
    "0x4688174a2d788ed969a32d3af25132cb48a45a4d10982c7f1f21b93067057b2a";
  const data = require("../data/The_Sound_10d.json");

  console.log(data.coords.x.length);
  console.log(data.coords.y.length);
  // console.log("here")
  
  for (let i = 0; i < 6; i++) {

    console.log(i);

    const [ x, y ] = utils.doMapping(data, 100, i * 100);
    const tx = await contractWithSigner.setData(hash, x, y); //255, 4418

    await tx.wait();
    console.log(tx.hash);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
