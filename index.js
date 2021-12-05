
const coins = require("./systems/coin.js")
const util = require("./util.js")
const products = require("./systems/product.js")
const { numToNegative } = require("./systems/coin.js")

const main = async () => {

    let continueUsingVendingMachine = true
    let credit = 0

    console.log("This is a Vending Machine")

    do {
        console.log(`Your credit is ${credit}`)
        console.log("Type '1' if you wish to add credit")
        console.log("Type '2' if you wish to see the products")
        console.log("Type '3' if you wish to be refunded")
        console.log("Type '4' if you wish to exit")
        let usersResponse = await util.readLineAsync("What do you wish to do?")
        let systemResponse = ""
        console.log("\n-----\n")
        switch(usersResponse){

            case "1":
                let [newCoinCredit, newCoinInfo] = await coins.insertCoins(credit)
                coins.writeCoinInfo(newCoinInfo)
                credit = credit + newCoinCredit
                systemResponse = `Your new credit is ${credit}`
                break;
            case "2":
                credit = await products.buyProducts(credit, products.products)
                systemResponse = `This is your current ${credit} credit`
                break;

            case "3":
                let [refund, newCreditInfo] = await coins.runRefundSystem(credit)
                console.log("Your refund is:")
                console.table(refund)
                credit = newCreditInfo
                let negCoinInfo = numToNegative(refund)
                coins.writeCoinInfo(negCoinInfo[0])
                break;

            case "4":
                continueUsingVendingMachine = false
                process.exit(0)

            default:
                systemResponse = "Option is not allowed"
        }
        console.log("\n-----\n")
        console.log(systemResponse)
        await util.readLineAsync("Continue")
        console.log("\n")
    } while (continueUsingVendingMachine)


    process.exit(0)

}
main()
