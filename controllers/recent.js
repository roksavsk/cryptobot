const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
const axios = require("axios");

async function recent(chatId, res) {    
    let recentData;
    await axios.get("http://localhost:3000/api/currencies/recent").then((response) => {
        recentData = response.data.reverse(); 
    }).catch((error) => {
        console.log(error);
    });
    let recentList = "";
    recentData.forEach(elem => {
        recentList += `\n/${elem.cryptoName} $${elem.averagePrice}`;
    });
    axios.post(`${TELEG_API}/sendMessage`,
        {
            chat_id: chatId,
            text: `Here is the list of the most popular currency: ${recentList}`
        })
        .then((response) => res.status(200).send(response)).catch((error) => res.send(error));
}

module.exports = recent;