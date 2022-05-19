const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
const axios = require("axios");
const findUser = require("./findUser");

async function favourite(chatId, username, res) {
    const data = await findUser(username);
    let recent;
    await axios.get("http://localhost:3000/api/currencies/recent").then((response) => {
        recent = response.data.reverse(); 
    }).catch((error) => {
        console.log(error);
    });
    let favouriteList = "";
    recent.forEach( elem => {
        if (data.includes(elem.cryptoName)){
            favouriteList += `\n/${elem.cryptoName} $${elem.averagePrice}`;
    }
    });
    axios.post(`${TELEG_API}/sendMessage`,
    {
        chat_id: chatId,
        text: favouriteList.length ? `Here is the list of your favourite currency: ${favouriteList}` : "You have no favourite currency yet add some from the recent list"
    })
    .then((response) => res.status(200).send(response.data)).catch((error) => res.send(error));
}

module.exports = favourite;