
const util = require("../util.js")

let products = {
    "01": {
        name: "CocaCola",
        price: 7,
        quantity: 5
    },
    "02": {
        name: "Picaronas",
        price: 10,
        quantity: 6
    },
    "03": {
        name: "Twix",
        price: 4,
        quantity: 8
    }
}

const deliverProduct = (credit, products, productId) => {
    if(products[productId].quantity <= 0){
        console.log("\nThere's no more of that product\n")
        return [credit, products]
    }

    if(products[productId].price > credit){
        console.log("\nYou don't have enough credit\n")
        return [credit, products]
    }

    console.log(`Here is your ${products[productId].name}`)
    products[productId].quantity = products[productId].quantity - 1
    credit = credit - products[productId].price

    return credit
}

const buyProducts = async(credit, products) => {

    let continueBuying = true
    do {
        console.log(`Your credit is ${credit}`)
        console.log("This are the products:")
        console.table(products)
        let productWanted = await util.readLineAsync(" If you wish to exit, type 'exit'\n What do you wish to buy?")
        switch(productWanted){
            case "01":
                credit = deliverProduct(credit, products, "01")
                break;

            case "02":
                credit = deliverProduct(credit, products, "02")
                break;

            case "03":
                credit = deliverProduct(credit, products, "03")
                break;

            case "exit":
                continueBuying = false
                break;
        }

        let continueQuestion = await util.readLineAsync("If you want to exit, type '3'")
        if(continueQuestion == "3"){
            continueBuying = false
        }

        console.log("\n-----\n")
    } while(continueBuying)

    return credit
}

module.exports = {
    buyProducts: buyProducts,
    products: products
}