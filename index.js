const coinSystem = require("./coin_system.js")
const util = require("./util.js")
const products = require("./products.js")

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

        switch(usersResponse){

            case "1":
                credit = credit + await coinSystem.runCoinSystem(credit)
                console.log(`Your new credit is ${credit}`)
                break;
            case "2":
                credit = await products.buyProducts(credit, products.products)
                console.log(`This is your actual ${credit}`)
                break;

            case "3":
                continueUsingVendingMachine = false
                break;

            default:
                console.log("error")
        }
        await util.readLineAsync("continue")
        console.log("\n")
    } while (continueUsingVendingMachine)


    process.exit(0)

}
main()
