require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

module.exports = {
  solidity: "0.8.10",
  networks: {
    kovan: {
      url: process.env.KOVAN_URL || "",
      // gas: 8000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: true, //process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COIN_MARKET_CAP
  },
  etherscan: {
    apiKey: process.env.ETH_SCAN_API_KEY,
  },
  mocha: {
    timeout: 100000,
    // enableTimeouts: false,
  },
};
