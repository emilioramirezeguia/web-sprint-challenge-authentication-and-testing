const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const Auth = require("./auth-model");

// Register a new user
router.post("/register", (req, res) => {
  const user = req.body;

  // hash the password
  const rounds = 8;
  const hash = bcryptjs.hashSync(user.password, rounds);

  user.password = hash;
  // save the user to the database
  Auth.add(user)
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
