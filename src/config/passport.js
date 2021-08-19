const passport = require("passport");
// import { Strategy as LocalStrategy } from "passport-local";
const localStrategy = require("passport-local").Strategy;
const userModel = require("../models/User");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
			// comprobamos que exista el usuario mediante el Email entregado en el formulario.
      const userFound = await userModel.findOne({ email: email });
      if (!userFound) {
				// si no existe el email, retornamos false
        return done(null, false, { message: "No user found!" });
      } else {
				// si existe el usuario, comprobamos que la contraseña entregada, mediante el formulario, coincide con la que tenemos en la base de datos
        const match = await userFound.matchPassword(password);
        if (match) {
					// si coincide la contraseña, retornamos la info del usuario encontrado en la DB
          return done(null, userFound);
        } else {
					// si no coincide la contraseña, retornamos false
          return done(null, false, { message: "Incorrect password!" });
        }
      }
    }
  )
);

// Si el usuario se loggea, almacenamos en SESSION el id del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Si queremos quitar al usuario de la session, hacemos el proceso inverso, obtenemos los datos del usuario mediante el ID y lo eliminamos de la session
passport.deserializeUser((id, done)=>{
	userModel.findById(id, (err, user)=>{
		done(err, user);
	});
});
