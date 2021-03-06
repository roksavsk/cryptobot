const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
const axios = require("axios");

function help(chatId, res) {
    axios.post(`${TELEG_API}/sendMessage`,
    {
        chat_id: chatId,
        text: "How to use bot:\n/listRecent - the most popular cryptocurrency list;\n/{currency_symbol} - get more info about currency;\n/addToFavourite {currency_symbol} - add currency to Favourite;\n/listFavourite - list of your favourite currencies;\n/deleteFavourite {currency_symbol} - remove currency from Favourite;"
    })
    .then((response) => { 
        res.status(200).send(response);
    }).catch((error) => {
        res.send(error);
    });
}

module.exports = help;