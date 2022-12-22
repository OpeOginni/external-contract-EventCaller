// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const url = process.env.GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("EventCallerContract");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  const alchemyContractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let eventCallerContract = await factory.deploy();

  console.log("eventCallerContract address:", eventCallerContract.address);

  await eventCallerContract.deployed();

  console.log("Contract Deployed");
  console.log("#############################################");

  await eventCallerContract.callEvent(alchemyContractAddress);
  console.log("Event Has been Called 🎉");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
