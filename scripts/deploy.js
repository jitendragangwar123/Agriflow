const ethers = require('ethers');
require('dotenv').config();

async function main() {
    const url = process.env.MUMBAI_URL;
    let privateKey = process.env.PRIVATE_KEY;
    let artifacts = await hre.artifacts.readArtifact("AgriMart");
    const provider = new ethers.providers.JsonRpcProvider(url);
    let wallet = new ethers.Wallet(privateKey, provider);
    // Create an instance of a Faucet Factory
    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
    let agriMart = await factory.deploy();
    console.log("AgriMart address:", agriMart.address);
    await agriMart.deployed();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });