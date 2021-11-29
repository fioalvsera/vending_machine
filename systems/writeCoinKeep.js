const insertCoins = require("./coin.js")
const util = require("../util.js")
const fs = require('fs')
const csv = require('csv')
const parse = require('csv-parse/lib/sync')
const stringify = require("csv-stringify/lib/sync")
const { FILE } = require("dns")

const writeCoinInfo = async (newCoinInfo) => {

const FILE_ADDRESS = "/home/fiorellaalvarado/code/vending_machine/coinKeep.csv"

/*let credit = 0

let CoinInfo = await insertCoins.insertCoins(credit)
let newCoinInfo = CoinInfo[1]

console.log(newCoinInfo)*/

const data = fs.readFileSync(FILE_ADDRESS, 'utf8')
let parsedData = parse(data, {columns: true})

const addNewCoinInfo = (parsedData, newCoinInfo) => {

   for(let i = 0; i < 4; i++){
       let coinNumber = 0
       switch(i) {
           case 0: coinNumber = "Coins1"
           break;
           case 1: coinNumber = "Coins2"
           break;
           case 2: coinNumber = "Coins5"
           break;
           case 3: coinNumber = "Coins10"
           break;
       }
       parsedData[0][coinNumber] = parseInt(parsedData[0][coinNumber]) + parseInt(newCoinInfo[coinNumber])
   }
   console.table(parsedData)
   return parsedData
}

parsedData = addNewCoinInfo(parsedData, newCoinInfo)
console.log(parsedData)

const write = (newCoinInfo, FILE_ADDRESS) => {
    const data = stringify(newCoinInfo, {
       header: true,
       columns: ["Coins1","Coins2","Coins5","Coins10"]
   })
   fs.writeFileSync(FILE_ADDRESS, data)
}

write(parsedData, FILE_ADDRESS)

}

writeCoinInfo()

module.exports = {
    writeCoinInfo
}