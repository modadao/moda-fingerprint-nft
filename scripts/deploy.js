const hre = require("hardhat");

const main = async () => {
  const metadata_number_factory = await hre.ethers.getContractFactory("MetadataAsNumbers");
  const metadata_number = await metadata_number_factory.deploy();

  await metadata_number.deployed();

  console.log("Metadata as numbers deployed to: ", metadata_number.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
