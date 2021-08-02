const express = require("express");
const path = require("path");
const exhbs = require("express-handlebars");

// Initializations
const app = express();

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
app.use(express.urlencoded({extended: false}));

// Global Variables

// Routes

// static Files

// Server Listenner
app.listen(app.get("port"), () =>{
	console.log("Server on port", app.get("port"));
});