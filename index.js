const coinSystem = require("./coin_system.js")

const main = async () => {
    let credit = 0

    credit = await coinSystem.runCoinSystem(credit)

    console.log(`Your new credit is ${credit}`)

    process.exit(0)

}
main()
