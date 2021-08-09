const router = require("express").Router();

router.get("/", (req,res,next)=>{
	res.render("index.hbs");
});

router.get("/about", (req,res,next)=>{
	res.render("about.hbs");
});

module.exports = router;