const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestap, data, previousHash = ''){
        this.index = index;
        this.timestap = timestap;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestap + JSON.stringify(this.data)).toString()
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]

    }
    createGenesisBlock(){
        return new Block(0, "31/07/2022","First Block",'0')
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
}

let example = new BlockChain()
example.addBlock(new Block(1,'31/07/22',{amount: 4}))
example.addBlock(new Block(2,'31/07/22',{amount: 11}))

console.log(JSON.stringify(example, null, 4))