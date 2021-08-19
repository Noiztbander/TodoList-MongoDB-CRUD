const router = require("express").Router();
const passport = require("passport");

const userModel = require("../models/User");

router.get("/users/signin", (req, res, next) => {
  res.render("users/signin");
});

router.get("/users/signup", (req, res, next) => {
  res.render("users/signup");
});

/* Ponemos local dentro de authenticate, porque asi nos lo pide la documentacion. De esta manera ejecutamos a las funciones que estan dentro del archivo passport.js. Mirara de autentificar el usuario desde la base de datos y si lo logra, lo guardara en session */
router.post("/users/signin", passport.authenticate("local", {
	successRedirect: "/notes",
	failureRedirect: "/users/signin",
	failureFlash: true
}));

router.post("/users/signup", async (req, res) => {
  const { userName, userEmail, userPassword, userConfirmPassword } = req.body;
  const errors = [];
  // console.log(req.body);
  if (userName.length <= 0 || userName.length == "") {
    errors.push({ text: "Please insert your Name!" });
  }
  if (userEmail <= 0) {
    errors.push({ text: "Please Insert an Email!" });
  }
  if (userPassword <= 0) {
    errors.push({ text: "you must write a password!" });
  }
  if (userPassword != userConfirmPassword) {
    errors.push({ text: "Pasword do not match!" });
  }
  if (userPassword.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      userName,
      userEmail,
      userPassword,
      userConfirmPassword,
    });
  } else {
    // primero, buscamos si existe el email recogido desde req.body y lo comparamos con algun email que ya exista en la base de datos.
    // si no existe ese email, procedemos a guardar el nuevo usuario
    const emailFound = await userModel.findOne({ email: userEmail });

    if (emailFound) {
      req.flash("error_msg", "Email already used!");
      res.redirect("/users/signup");
    }

    const newUser = new userModel({
      name: userName,
      email: userEmail,
      password: userPassword,
    });
    newUser.password = await newUser.encryptPassword(userPassword);
    await newUser.save();
    req.flash("succes_msg", "Account succesfully saved!");
    res.redirect("/users/signin");
  }
});

module.exports = router;
