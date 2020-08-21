const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("./auth-model");

const signToken = require("../helpers/signToken");
const { validateUser } = require("./authenticate-middleware");

// Register new user
router.post("/register", validateUser, (req, res) => {
  const user = req.body;

  // hash the password
  const rounds = 8;
  const hash = bcryptjs.hashSync(user.password, rounds);

  user.password = hash;
  // save the user to the database
  Users.add(user)
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Login existing user
router.post("/login", validateUser, (req, res) => {
  const user = req.body;

  Users.findBy({ username: user.username })
    .then((users) => {
      const foundUser = users[0];

      if (user && bcryptjs.compareSync(user.password, foundUser.password)) {
        const token = signToken(foundUser);

        res.status(200).json({
          message: "Welcome to our API. Here's your token...",
          token,
        });
      } else {
        res
          .status(401)
          .json({ message: "Sorry, you're not authorized to use our API." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
