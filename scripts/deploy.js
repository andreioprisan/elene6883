async function main() {
    const BillboardNFT = await ethers.getContractFactory("BillboardNFT")
  
    const myNFT = await BillboardNFT.deploy()
    await myNFT.deployed()
    console.log("Contract deployed to address:", myNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  