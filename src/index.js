const express = require("express");
const path = require("path");
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");

// Initializations
const app = express();
require("./database");

// Settings
app.set("port",process.env.PORT || 3500);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exhbs({
	defaultLayout: "main",
	layoutsDir: path.join(app.get("views"), "layouts"),
	partialsDir: path.join(app.get("views"), "partials"),
	extname: ".hbs"
}));
app.set("view engine", ".hbs");

// Middlewares
/* urlencoded sirve para que exprees entienda los req de los formularios */
app.use(express.urlencoded({extended: false}));
/* methodOverride nos sirve para que nuestros formularios puedan enviar otros metodos, no solo POST, tambien GET, PUT, CATCH */
app.use(methodOverride("_method"));
app.use(session({
	secret: "mysecretapp",
	resave: true,
	saveUninitialized: true
}));

// Global Variables

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

// static Files
app.use(express.static(path.join(__dirname,"public")));

// Server Listenner
app.listen(app.get("port"), () =>{
	console.log("Server on port", app.get("port"));
});