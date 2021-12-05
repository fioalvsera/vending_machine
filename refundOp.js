const fs = require('fs')
const csv = require('csv')
const parse = require('csv-parse/lib/sync')
const stringify = require("csv-stringify/lib/sync")
const { FILE } = require("dns")

console.log(-Math.abs(5))


const FILE_ADDRESS = "/home/fiorellaalvarado/code/vending_machine/coinKeep.csv"

const data = fs.readFileSync(FILE_ADDRESS, 'utf8')
let parsedData = parse(data, {columns: true})

const writeCoinInfo = async (newCoinInfo) => {

    if(!fs.existsSync(FILE_ADDRESS)) initCoinInfo()
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

let newCoinInfo = { Coins1: 0, Coins2: 1, Coins5: 0, Coins10: 9 }

const numToNegative = (parsedData, newCoinInfo) => {
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

console.log(numToNegative(parsedData, newCoinInfo))

let newCoinInfoNeg = numToNegative(parsedData, newCoinInfo)

writeCoinInfo(newCoinInfoNeg[0])

//writeCoinInfo((newCoinInfo))

/*let credit = 153
let refund = {
    "Coins1": 0,
    "Coins2": 0,
    "Coins5": 0,
    "Coins10": 0
    }

const refundCoins = (parsedData, credit, refund) => {
    for(let i = 0; i < 4; i++){
        let amountToRefund = 0
        let coinNumber = 0
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
            refund[coinNumber[0]] = parseInt(parsedData[0][coinNumber[0]])
        } else {
            credit = credit - (amountToRefund * coinNumber[1])
            refund[coinNumber[0]] = amountToRefund
        }

    }return refund
}

console.log(refundCoins(parsedData, credit,refund))*/
