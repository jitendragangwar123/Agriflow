const ethers = require('ethers');
require('dotenv').config();

async function main() {
    const url = process.env.MUMBAI_URL;
    let privateKey = process.env.PRIVATE_KEY;
    let artifacts = await hre.artifacts.readArtifact("Agriflow");
    const provider = new ethers.providers.JsonRpcProvider(url);
    let wallet = new ethers.Wallet(privateKey, provider);
    // Create an instance of a Faucet Factory
    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
    let agriflow = await factory.deploy();
    console.log("Agriflow address:", agriflow.address);
    await agriflow.deployed();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });