const sql = require("./db");

const User = function(user) {
    this.username = user.username;
    this.cryptoCurrency = user.cryptoCurrency;
};

User.create = (username) => {
    sql.query(`CREATE TABLE IF NOT EXISTS ${username} (id INT AUTO_INCREMENT PRIMARY KEY, cryptoCurrency VARCHAR(50), UNIQUE (cryptoCurrency)) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      console.log("Created user");
    });
};

User.add = (username, currency) => {
  sql.query(`INSERT INTO ${username} (cryptoCurrency) VALUES ('${currency}')`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log("Add currency: ", { username: currency});
  });
};

User.remove = (username, currency) => {
  sql.query(`DELETE FROM ${username} WHERE cryptoCurrency = '${currency}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log("Remove currency: ", { username: currency});
  });
};

module.exports = User;