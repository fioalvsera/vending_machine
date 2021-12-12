const coins = require("./coin.js")

let inc =  ((credit - products[productId].price))[0]

let prob = { Coins1: 0, Coins2: 0, Coins5: 0, Coins10: 0 }

console.log(inc === prob)
console.log(Object.is(inc, prob))
console.log(JSON.stringify(inc) === JSON.stringify(prob))

if (JSON.stringify(inc) === JSON.stringify(prob)){
    console.log("Yeah?")
} else {
    console.log("no?")
}
