require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const hre = require("hardhat");

const main = async () => {
  const hash =
    "0xd7a297382315cb9e956ee85d078619899e6c72e87038a53715bf5d91319b2700"; // 98
  const data = require("../data/HYDRA_80.json");

  // console.log(data.coords);
  const coords = new Map();
  let x = [];
  let y = [];

  data.coords.forEach((element) => {
    x.push(element.x);
    y.push(element.y);

    console.log(element.x);
    console.log(element.y);

    const x_byte = ethers.utils.hexlify(element.x);
    console.log(x_byte);

    let fixed = [];

    if (x_byte.length === 1) {
      fixed = [0, 0, x_byte[0]];
    }

    if (x_byte.length === 2) {
      fixed = [0, x_byte[0], x_byte[1]];
    }

    if (x_byte.length === 3) {
      fixed = x_byte;
    }

    console.log(fixed);
  });

  x = x.sort((a, b) => a - b);
  y = y.sort((a, b) => a - b);

  const rpcUrl = process.env.NODE;
  console.log(rpcUrl);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const key = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(key, provider);

  const address = "0x14955Eb668a87Ff696e5D26C37f7fc8103a213b9"; // bytes
  const Metadata = require("../artifacts/contracts/MetadataAsBytes.sol/MetadataAsBytes.json");
  const contract = new hre.ethers.Contract(
    address,
    Metadata.abi,
    wallet.provider
  );

  // const z = [];
  // const n = [];
  const bytes = [];

  coords.forEach((value, key) => {
    // z.push(key);
    // n.push(value);

    // console.log(key);
    const z_byte = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(key));
    // console.log(z_byte);

    // console.log(value);
    const n_byte = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));
    // console.log(n_byte);

    bytes.push(z_byte);
    bytes.push(n_byte);
  });

  const contractWithSigner = contract.connect(wallet);
  const tx = await contractWithSigner.setData(bytes);
  log(tx);

  return tx;
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
