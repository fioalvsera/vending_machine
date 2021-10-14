const coinSystem = require("./coin_system.js")
const welcome = require("./welcome.js")

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

async function readLineAsync(message) {
    return new Promise((resolve, reject) => {
        readline.question(message, (answer) => {
        resolve(answer);
        });
    });
}

const main = async function() {
    let credit = 0

    let userResponse = await welcome.printWelcome(credit)

    switch(userResponse) {
        case "1":
            credit = await coinSystem.runCoinSystem(credit)
            console.log(`Your new credit is ${credit}`)
        break;

        case "2":
            console.log("This are your products")
        break;

        default:
            console.log("error")
    }

    process.exit(0)
}
main()
