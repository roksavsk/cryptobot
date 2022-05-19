const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
const axios = require("axios");
const User = require("../models/user.model");

function start(username, chatId, res) {
    User.create(username);
    axios.post(`${TELEG_API}/sendMessage`,
        {
            chat_id: chatId,
            text: "Welcome to Cryptocurrency commutator! Press /help for more instructions."
        })
        .then((response) => { 
            res.status(200).send(response);
        }).catch((error) => {
            res.send(error);
        });
}

module.exports = start;