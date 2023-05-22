const database = require("./database");
const getUsers = (req, res) => {
    database
      .query("SELECT * FROM users")
      .then((result) => {
        res.json(result[0])
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("ERROR")
      });
  };

  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.status(200).json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error");
      });
  };

  module.exports = {
    getUsers,
    getUserById,
  };
  