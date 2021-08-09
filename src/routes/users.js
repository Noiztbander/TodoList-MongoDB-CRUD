const router = require("express").Router();

router.get("/users/signin", (req,res,next)=>{
	res.render("users/signin");
});

router.get("/users/signup", (req,res,next)=>{
	res.render("users/signup");
});

module.exports = router;