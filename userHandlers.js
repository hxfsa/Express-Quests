const database = require("./database");
const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("ERROR");
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
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  const SQL =
    "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)";
  database
    .query(SQL, [firstname, lastname, email, city, language])
    .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
    .catch((err) => {
      console.error("error");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
