
const util = require("./util.js")

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

//console.log(products["01"].quantity)


const buyProducts = async(credit, products) => {

    let continueBuying = true
    console.log("Welcome")
    do {
    console.log(`"Your credit is ${credit}"`)
    console.log("This are the products:")
    console.log(products)
    let productWanted = await util.readLineAsync(" If you wish to exit, type 'exit'\n What do you wish to buy?")
    switch(productWanted){
        case "01":
            if(credit >= products["01"].quantity){
                console.log("Here is your CocaCola")
                products["01"].quantity = products["01"].quantity - 1
                credit = credit - products["01"].price
            } else {
                console.log("You don't have enough credit")
            }
            break;

        case "02":
            if(credit >= products["02"].quantity){
                console.log("Here is your Picaronas")
                products["02"].quantity = products["02"].quantity - 1
                credit = credit - products["02"].price
            } else {
                console.log("You don't have enough credit")
            }
            break;

        case "03":
            if(credit >= products["03"].quantity){
                console.log("Here is your Twix")
                products["03"].quantity = products["03"].quantity - 1
                credit = credit - products["03"].price
            } else {
                console.log("You don't have enough credit")
            }
            break;

        case "exit":
            continueBuying = false
            break;
    }
    let continueQuestion = await util.readLineAsync("If you want to continue type 'continue' otherwise type 'exit'")

    if(continueQuestion == "exit"){
        continueBuying = false
    } else if(continueQuestion == "continue"){
        continueBuying = true
    } else {
        console.log("error")
    }

    console.log("\n-----\n")
    } while(continueBuying)

    return credit
}

let credit = 20

module.exports = {
    buyProducts: buyProducts,
    products: products
}