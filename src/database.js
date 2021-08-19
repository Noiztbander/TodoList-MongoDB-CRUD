const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.URL_ATLAS || "mongodb://localhost/notes-db-app";

mongoose.connect(uri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify:false,
	useUnifiedTopology:true
}).then((db)=>{
	console.log("DB is connected");
}).catch((err)=>{
	console.error(err);
});