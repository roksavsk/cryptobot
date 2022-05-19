const sql = require("../models/db");

function findUser(user) {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT cryptoCurrency FROM ${user}`, (err, result) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            if (result.length) {
                const data = [];
                result.forEach(element => {
                    data.push(element.cryptoCurrency)
                });
                console.log(data);
                resolve(data); 
            } else if (!result.length) {
                console.log("No currency");
                resolve([]);
            }
        });
    });
}

module.exports = findUser;