const util = require("../util.js")

const insertCoins = async function(credit)  {

    let coin1 = await util.readLineAsync("How many coins of 1 do you want to enter?")
    let coin2 = await util.readLineAsync("How many coins of 2 do you want to enter?")
    let coin5 = await util.readLineAsync("How many coins of 5 do you want to enter?")
    let coin10 = await util.readLineAsync("How many coins of 10 do you want to enter?")
    credit = coin1 * 1 + coin2 * 2 + coin5 * 5 + coin10 * 10
    return credit
}

module.exports = {
        insertCoins
}
