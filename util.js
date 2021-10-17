const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const readLineAsync = async (message) => {
    return new Promise((resolve, reject) => {
        readline.question(message, (answer) => {
        resolve(answer)
        })
    })
}

module.exports = {
    readLineAsync: readLineAsync
}