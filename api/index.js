const express = require("express");
const cors = require("cors");
const ethers = require("ethers");
const utils = require("../scripts/utils");
const Metadata = require("../artifacts/contracts/MetadataAsNumbers.sol/MetadataAsNumbers.json");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const address = req.query.contract;
  const id = req.query.id;
  console.log(address);

  const rpcUrl = process.env.KOVAN_URL;
  console.log(rpcUrl);

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(address, Metadata.abi, provider);

  const count = await contract.pointCount(id);

  const calls = [];
  for (let i = 0; i < count; i++) {
    calls.push(contract.getPoint(id, i));
  }

  const points = await Promise.all(calls);
  // const metadata = await contract.metadata(id);

  const result = {
    coords: {
      y: points.map((point) => point[1]),
      x: points.map((point) => point[0]),
    },
    title: "Hydra",
    artist: "ROBY",
    email: "sean@modadao.io",
    update: true,
    song_id: id,
    dist_freq_full: "11",
    dist_time_full: "5",
    upload_date: "", // metadata.created, //"2022-02-21 11:15:25.135312",
    "length (s)": 202,
    bpm: 135,
    "dominant pitch": "C#",
    version: "2.1.0",
  };

  res.setHeader("Content-Type", "application/json");
  res.json(result);
});

app.post("/", async (req, res) => {
  const chunk = req.query.chunk || 100;
  
  const rpcUrl = process.env.NODE;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const key = req.query.key || process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(key, provider);

  const address = req.query.address;
  const contract = new ethers.Contract(
    address,
    Metadata.abi,
    wallet.provider
  );

  const contractWithSigner = contract.connect(wallet);
  const id = req.query.id;

  const receipts = [];

  for (let i = 0; i < req.body.coords.x.length / chunk; i++) {
    const [ x, y ] = utils.doMapping(req.body, chunk, i * chunk);
    const tx = await contractWithSigner.setData(id, x, y);
    const receipt = await tx.wait();
    receipts.push(receipt);

    console.log(receipt);
  }

  res.json(receipts);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
