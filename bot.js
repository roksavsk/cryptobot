const express = require("express");

const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
const { SERVER_URL } = process.env;

const start = require("./controllers/start");
const help = require("./controllers/help");
const recent = require("./controllers/recent");
const coininfo = require("./controllers/coininfo");
const favourite = require("./controllers/favourite");
const getCoins = require("./controllers/getCoins");
const addFavourite = require("./controllers/addFavourite");
const deleteFavourite = require("./controllers/deleteFavourite");

app.get("/", (req, res) => {
  res.send("Welcome to Cryptocurrency commutator!");
});

app.post("/", async (req, res) => {
  if (!req.body.callback_query) {
    const chatId = req.body.message.chat.id;
    const { username } = req.body.message.chat;
    const sentMessage = req.body.message.text;

    if (sentMessage === "/start") {
      start(username, chatId, res);
    } else if (sentMessage === "/help") {
      help(chatId, res);
    } else if (sentMessage === "/listRecent") {
      recent(chatId, res);
    } else if (sentMessage === `/${await getCoins(sentMessage)}`) {
      coininfo(chatId, username, sentMessage, res);
    } else if (sentMessage === "/listFavourite") {
      favourite(chatId, username, res);
    } else if (sentMessage.match("/addToFavourite")) {
      const currency = sentMessage.replace("/addToFavourite", "").trim();
      addFavourite(chatId, username, currency, res);
    } else if (sentMessage.match("/deleteFavourite")) {
      const currency = sentMessage.replace("/deleteFavourite", "").trim();
      deleteFavourite(chatId, username, currency, res);
    } else {
      console.log("Wrong command");
      help(chatId, res);
    }
  } else if (req.body.callback_query) {
    const chatId = req.body.callback_query.from.id;
    const { username } = req.body.callback_query.from;
    const currency = req.body.callback_query.data;
    const command =
      req.body.callback_query.message.reply_markup.inline_keyboard[0][0].text;

    if (command === "Add to favourite") {
      addFavourite(chatId, username, currency, res);
    } else if (command === "Remove from favourite") {
      deleteFavourite(chatId, username, currency, res);
    }
  }
});

const init = async () => {
  const res = await axios.post(`${TELEG_API}/setwebhook?url=${SERVER_URL}`);
  console.log(res.data);
};

app.listen(PORT, async () => {
  await init();
  console.log(`My server is running on http://localhost:${PORT}`);
});
