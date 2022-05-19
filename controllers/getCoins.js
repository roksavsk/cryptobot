const axios = require("axios");

async function getCoins(text) {
    const currencies = [];
    await axios
    .get("http://localhost:3000/api/currencies/recent")
    .then(response => {
        response.data.forEach(item => {
            currencies.push(item.cryptoName);
        });
        console.log("Data is saved");
    })
    .catch(error => {
        console.log("error", error);
    });
    const findCoin = currencies.filter(el => `/${el}` === text);
    return findCoin[0];
}

module.exports = getCoins;