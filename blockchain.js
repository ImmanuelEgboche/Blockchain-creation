const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestap, data, previousHash = ''){
        this.index;
        this.timestap;
        this.data;
        this.previousHash;
        this.hash = '';
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
    add
}