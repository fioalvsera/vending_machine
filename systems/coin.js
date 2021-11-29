const util = require("../util.js")
const fs = require('fs')
const csv = require('csv')
const parse = require('csv-parse/lib/sync')
const stringify = require("csv-stringify/lib/sync")
const { FILE } = require("dns")

const FILE_ADDRESS = "/home/fiorellaalvarado/code/vending_machine/coinKeep.csv"

const insertCoins = async function(credit)  {

    let coin1 = await util.readLineAsync("How many coins of 1 do you want to enter?")
    let coin2 = await util.readLineAsync("How many coins of 2 do you want to enter?")
    let coin5 = await util.readLineAsync("How many coins of 5 do you want to enter?")
    let coin10 = await util.readLineAsync("How many coins of 10 do you want to enter?")
    let coinTracker = {
        "Coins1": coin1,
        "Coins2": coin2,
        "Coins5": coin5,
        "Coins10": coin10
    }
    credit = coin1 * 1 + coin2 * 2 + coin5 * 5 + coin10 * 10
    return [credit, coinTracker]
}

const writeCoinInfo = async (newCoinInfo) => {
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
       return parsedData
    }

    parsedData = addNewCoinInfo(parsedData, newCoinInfo)

    const write = (newCoinInfo, FILE_ADDRESS) => {
        const data = stringify(newCoinInfo, {
           header: true,
           columns: ["Coins1","Coins2","Coins5","Coins10"]
       })
       fs.writeFileSync(FILE_ADDRESS, data)
    }

    write(parsedData, FILE_ADDRESS)

    }

module.exports = {
        insertCoins: insertCoins,
        writeCoinInfo: writeCoinInfo
}
