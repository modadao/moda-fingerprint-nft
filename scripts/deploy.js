const hre = require("hardhat");

const main = async () => {
  const metadata_number_factory = await hre.ethers.getContractFactory("MetadataAsNumbers");
  const metadata_number = await metadata_number_factory.deploy();

  await metadata_number.deployed();

  console.log("Metadata as numbers deployed to: ", metadata_number.address);


  // const metadata_bytes_factory = await hre.ethers.getContractFactory("MetadataAsBytes");
  // const metadata_bytes = await metadata_bytes_factory.deploy();

  // await metadata_bytes.deployed();

  // console.log("Metadata as bytes deployed to: ", metadata_bytes.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
