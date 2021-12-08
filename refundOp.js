const util = require('./util.js')

const theOne = async function()  {
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

    let credit = 0

    let [newCoinCredit, newCoinInfo] = await insertCoins(credit)
    let toTry = newCoinInfo["Coins1"]

    console.log(toTry)
    console.log("THis is it:")
    console.log(newCoinInfo)
}

theOne()
