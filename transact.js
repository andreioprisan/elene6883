import Mcp from "mcp.js";

const abi = require("./abi.json");

const mcp = new Mcp();

mcp.Contract.setProvider("https://huygens.computecoin.network");

const billboard_nft_smart_contract_id = "REPLACEME";
const billboard_purchaser_from_user_account = "REPLACEME";
const billboard_purchase_amount = "REPLACEME";

const Contract = new mcp.Contract(abi, billboard_nft_smart_contract_id);

// Query
Contract.methods.xxx().call()
.then(res => {
    console.log(res.toString());
})

// Transaction
Contract.methods.xxx().sendToBlock({
    from: billboard_purchaser_from_user_account,
    amount: billboard_purchase_amount
})
.then(res => {
    if(!res) {
        throw new Error("Transaction Failed.")
    } else {
        const hash = res.msg;   // blockHash
    } 
})