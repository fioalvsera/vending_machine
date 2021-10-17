
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

let printWelcome = async function(credit)  {
    console.log("This is a Vending Machine")
    console.log(`Your credit is ${credit}`)
    console.log("Type '1' if you wish to add credit")
    console.log("Type '2' if you wish to see the  products")
    return await readLineAsync("What do you wish to do?")
}

module.exports = {
    printWelcome
}