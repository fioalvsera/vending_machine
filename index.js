const insertCoins = require("./systems/coin.js")
const util = require("./util.js")
const products = require("./systems/product.js")

const main = async () => {

    let continueUsingVendingMachine = true
    let credit = 0

    console.log("This is a Vending Machine")

    do {
        console.log(`Your credit is ${credit}`)
        console.log("Type '1' if you wish to add credit")
        console.log("Type '2' if you wish to see the products")
        console.log("Type '3' if you wish to exit")
        let usersResponse = await util.readLineAsync("What do you wish to do?")
        let systemResponse = ""
        console.log("\n-----\n")
        switch(usersResponse){

            case "1":
                credit = credit + await insertCoins.insertCoins(credit)
                systemResponse = `Your new credit is ${credit}`
                break;
            case "2":
                credit = await products.buyProducts(credit, products.products)
                systemResponse = `This is your current ${credit} credit`
                break;

            case "3":
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
