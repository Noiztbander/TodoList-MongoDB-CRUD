const router = require("express").Router();

router.get("/notes", (req,res,next)=>{
	res.send("notes from DB");
});

module.exports = router;