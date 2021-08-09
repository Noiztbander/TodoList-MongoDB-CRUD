const router = require("express").Router();
const note = require("../models/Note");

// render pages
router.get("/notes/add", (req, res, next) => {
  res.render("notes/new-note");
});

router.get("/notes", async (req, res, next) => {
  // moongose tiene la funcion lean(). Esto te obtiene un objeto Json (en vez de una orden moongose)
  const notes = await note.find({}).lean();
  res.render("notes/all-notes", { notes });
});

// receive data
router.post("/notes/new-note", async (req, res, next) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({
      text: "Please write a Title!",
    });
  } else if (!description) {
    errors.push({
      text: "Please write a description!",
    });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", { errors, title, description });
  } else {
    const newNote = new note({ title: title, description: description });
    await newNote.save();
    res.redirect("/notes");
  }
});

module.exports = router;
