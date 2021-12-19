const util = require("../util.js")
const coins = require("./coin.js")

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
    if(products[productId] == undefined){
        console.log("\nWe don't have that product\n")
        return credit

    }

    if(products[productId].quantity <= 0){
        console.log("\nThere's no more of that product\n")
        return credit
    }

    if(products[productId].price > credit){
        console.log("\nYou don't have enough credit\n")
        return credit
    }

    let amountToRefund = credit - products[productId].price
    let [_refundedCoins, finalCredit] = coins.refundCoins(amountToRefund)
    if(finalCredit !== 0 && amountToRefund !== 0){
        console.log("\You can't make this purchase, or else, we won't be able to give you a refund")
        return credit
    }
    console.log(`Here is your ${products[productId].name}`)
    products[productId].quantity = products[productId].quantity - 1
    credit = credit - products[productId].price

    return credit
}

const buyProducts = async(credit, products) => {
    console.log(`Your credit is ${credit}`)
    console.log("This are the products:")
    console.table(products)
    let productWanted = await util.readLineAsync(" If you wish to exit, type 'exit'\n What do you wish to buy?")
    credit = deliverProduct(credit, products, productWanted)
    return credit
}

module.exports = {
    buyProducts: buyProducts,
    products: products
}