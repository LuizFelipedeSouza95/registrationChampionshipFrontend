const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
const path = require("path");
const adminAuth = require("../middlewares/adminAlth");
const getUser = require("../middlewares/getUser");
const getUserAuthenticate = require("../middlewares/getUserAuthenticate");
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
//const jwtSecret = "jhgcdfjyhgcvjhgdjghvfckjhgfdkhgcmjhgfjkhdckhg";
require("dotenv").config();
const PORT = process.env.PORT || "3004";

app.use(
  session({
    secret: "c076df8a-d600-46f9-8e18-6e765eaf22a6",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    rolling: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "."));

app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());

app.get("/users", adminAuth, async function (req, res) {
  const user = req.session.user;
  res.render("./pages/admin/users.ejs", { user: user });
});

app.get("/login", function (req, res) {
  res.render("./pages/login.ejs");
});

app.get("/home", function (req, res) {
  res.render("./pages/home.ejs");
});

app.get("/rounds", getUser, async function (req, res) {
  res.render("./pages/rounds.ejs");
});

app.get("/classificacao", getUser, function (req, res) {
  const user = req.session.user;
  res.render("./pages/classification.ejs", { user: user });
});

app.get("/yourGames", getUser, function (req, res) {
  const user = req.session.user;
  res.render("./pages/yourGames.ejs", { user: user });
});

app.get("/create-account", function (req, res) {
  res.render("./pages/createAccount.ejs");
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/home");
});

app.post("/authenticate", getUserAuthenticate, async function (req, res) {
  const email = req.query.email;
  const password = req.query.password;

  const user = res.locals.users;

  const getUserByEmail = user.filter((user) => {
    const userByEmail = user.email === email;
    return userByEmail;
  });

  if (user === undefined) {
    res.json({ email: false });
  } else {
    const correct = bcrypt.compareSync(password, getUserByEmail[0].password);
    if (correct) {
      req.session.user = {
        name: getUserByEmail[0].name,
        email: getUserByEmail[0].email,
        admin: getUserByEmail[0].admin,
      };

      res.json(req.session.user);
    } else {
      res.json({ password: false });
    }
  }
});

app.listen(PORT, async () => {
  console.info(`⚡️Server is running at http://localhost:${PORT}/home`);
});
