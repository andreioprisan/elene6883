require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/BillboardNFT.sol/BillboardNFT.json")
const contractAddress = process.env.CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 300000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "Transaction hash:",
              hash,
              "\nCheck mempool for transaction status"
            )
          } else {
            console.log(
              "Whoops, something went wrong:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("promise error:", err)
    })
}


mintNFT(
  "ipfs://REPLACEME_imgurl"
)
