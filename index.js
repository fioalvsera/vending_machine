
const coinSystem = require("./coin_system.js")


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

const main = async () => {

    let credit = 0
    console.log("This is a Vending Machine")
    console.log(`Your credit is ${credit}`)
    console.log("Type '1' if you wish to add credit")
    console.log("Type '2' if you wish to see the products")
    let usersResponse = await readLineAsync("What do you wish to do?")

    switch(usersResponse){

        case "1":
            credit = await coinSystem.runCoinSystem(credit)
            console.log(`Your new credit is ${credit}`)
            break;
        case "2":
            console.log("This are our Products")
            break;

        default:
            console.log("error")
    }

    process.exit(0)

}
main()
