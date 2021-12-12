const util = require("../util.js")
const fs = require('fs')
const csv = require('csv')
const parse = require('csv-parse/lib/sync')
const stringify = require("csv-stringify/lib/sync")
const { FILE } = require("dns")

const FILE_ADDRESS = "/home/fiorellaalvarado/code/vending_machine/coinKeep.csv"

const insertCoins = async function(credit)  {

    let coin1 = await util.readLineAsync("How many coins of 1 do you want to enter?")
    coin1 = changeUndefinedToCero(coin1)
    let coin2 = await util.readLineAsync("How many coins of 2 do you want to enter?")
    coin2 = changeUndefinedToCero(coin2)
    let coin5 = await util.readLineAsync("How many coins of 5 do you want to enter?")
    coin5 = changeUndefinedToCero(coin5)
    let coin10 = await util.readLineAsync("How many coins of 10 do you want to enter?")
    coin10 = changeUndefinedToCero(coin10)
    let coinTracker = {
        "Coins1": coin1,
        "Coins2": coin2,
        "Coins5": coin5,
        "Coins10": coin10
    }
    credit = coin1 * 1 + coin2 * 2 + coin5 * 5 + coin10 * 10
    return [credit, coinTracker]
}

const changeUndefinedToCero = (num) => {
    if(num == ''){
        num = 0
        return num
    }
    return num
}

const writeCoinInfo = async (newCoinInfo) => {

    let parsedData = readCoinsInfo()

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
    console.log("Current coins on system:")
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

const initCoinInfo = () =>{
    let defaultCoinInfo = [{Coins1: 0, Coins2: 0, Coins5: 0, Coins10: 0}]
    const data = stringify(defaultCoinInfo, {
        header: true,
        columns: ["Coins1","Coins2","Coins5","Coins10"]
    })
    fs.writeFileSync(FILE_ADDRESS, data)
}

const refundCoins = (credit) => {
    let parsedData = readCoinsInfo()
    let refundData = {
        "Coins1": 0,
        "Coins2": 0,
        "Coins5": 0,
        "Coins10": 0
    }
    const COIN_TYPES = ["coins1", "coins2", "coins5", "coins10"]
    for(let i = 0; i < COIN_TYPES.length; i++){
        let amountToRefund = 0
        let coinNumber = []
        switch(i) {
            case 0: coinNumber = ["Coins10",10]
            break;
            case 1: coinNumber = ["Coins5",5]
            break;
            case 2: coinNumber = ["Coins2",2]
            break;
            case 3: coinNumber = ["Coins1",1]
            break;
        }
        amountToRefund = Math.floor(credit / coinNumber[1])
        if(amountToRefund > parsedData[0][coinNumber[0]]){
            credit = credit - parseInt((parsedData[0][coinNumber[0]] * coinNumber[1]))
            refundData[coinNumber[0]] = parseInt(parsedData[0][coinNumber[0]])
        } else {
            credit = credit - (amountToRefund * coinNumber[1])
            refundData[coinNumber[0]] = amountToRefund
        }

    }

    return [refundData, credit]
}

const readCoinsInfo = () => {

    if(!fs.existsSync(FILE_ADDRESS)) initCoinInfo()
    const data = fs.readFileSync(FILE_ADDRESS, 'utf8')
    let parsedData = parse(data, {columns: true})

    return parsedData
}

const numToNegative = (newCoinInfo) => {
    let parsedData = readCoinsInfo()
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
        parsedData[0][coinNumber] = -Math.abs(newCoinInfo[coinNumber])
    }
    return parsedData
}



module.exports = {
        insertCoins: insertCoins,
        writeCoinInfo: writeCoinInfo,
        refundCoins: refundCoins,
        numToNegative: numToNegative
}
