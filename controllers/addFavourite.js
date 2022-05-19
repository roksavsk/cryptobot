const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
const axios = require("axios");
const User = require("../models/user.model");
const findUser = require("./findUser");

async function addFavourite(chatId, username, currency, res) {
    const data = await findUser(username);
    const check = data.includes(currency);
    if (!check) { User.add(username, currency); };
    axios.post(`${TELEG_API}/sendMessage`,
    {
        chat_id: chatId,
        text: check ? "Currency is already in the list" : `Currency was added to favourite: ${currency}`
    })
    .then((response) => res.status(200).send(response.data)).catch((error) => {
        console.log(error);
        return res.status(500);
    });
}

module.exports = addFavourite;