const SHA256 = require("crypto-js/sha256");
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount

    }
}
class Block{
    constructor( timestap, transactions, previousHash = ''){
        this.timestap = timestap;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
        this.nonce = 0 
        // lol 
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestap + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce ++
            this.hash = this.calculateHash()
        }
        console.log("Block mined:" + this.hash)
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransactions = []
        this.miningReward = 100

    }
    createGenesisBlock(){
        return new Block(0, "31/07/2022","First Block",'0')
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions)
        // in the real world calling all pending transactions would take way too long and 
        // block size cant be bigger than 1mb 
        block.mineBlock(this.difficulty)
        console.log("\n Block successfully mined")
        this.chain.push(block)
    }

    // adding validity
    isChainVaild(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false
            }
            return true 

        }
    }
}

let example = new BlockChain()



// adding to chain after block has been created


// console.log(JSON.stringify(example, null, 4))