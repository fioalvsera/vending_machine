
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

const runCoinSystem = async function(credit)  {

    let coin1 = await readLineAsync("How many coins of 1 do you want to enter?")
    let coin2 = await readLineAsync("How many coins of 2 do you want to enter?")
    let coin5 = await readLineAsync("How many coins of 5 do you want to enter?")
    let coin10 = await readLineAsync("How many coins of 10 do you want to enter?")
    credit = coin1 * 1 + coin2 * 2 + coin5 * 5 + coin10 * 10
    return credit
}



module.exports = {
    runCoinSystem
}
