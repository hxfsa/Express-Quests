const database = require("./database");
const getUsers = (req, res) => {
  let SQL = "SELECT id, firstname, lastname, email, city, language FROM users";
  const sqlValues = [];
  const language = req.query.language;
  const city = req.query.city;

  if (language !== null) {
    SQL = "SELECT id, firstname, lastname, email, city, language FROM users WHERE language = ?";
    sqlValues.push(language);
  }

  if (city !== null) {
    SQL = "SELECT id, firstname, lastname, email, city, language FROM users WHERE city = ?";
    sqlValues.push(city);
  }

  database
    .query(SQL, sqlValues)
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
    .query("select id, firstname, lastname, email, city, language from users where id = ?", [id])
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
  const { firstname, lastname, email, city, language, username, hashedPassword } = req.body;
  const SQL =
    "INSERT INTO users(firstname, lastname, email, city, language, username, hashedPassword) VALUES (?, ?, ?, ?, ?, ?, ?)";
  database
    .query(SQL, [firstname, lastname, email, city, language, username, hashedPassword])
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error("error");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, username, hashedPassword } = req.body;
  const SQL =
    "UPDATE USERS set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, username = ?, hashedPassword = ? WHERE id = ?";
  database
    .query(SQL, [firstname, lastname, email, city, language, id, username, hashedPassword])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("error updating the user");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send("Error updating the user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
};
