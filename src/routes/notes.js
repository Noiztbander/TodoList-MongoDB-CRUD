const router = require("express").Router();
const note = require("../models/Note");
const { verifyAuthentication } = require("../helpers/auth");

// receive data and render pages
router.get("/notes/add", verifyAuthentication, (req, res, next) => {
  res.render("notes/new-note");
});

router.get("/notes", verifyAuthentication, async (req, res, next) => {
  /* moongose tiene la funcion lean(). Esto te obtiene un objeto Json (en vez de una orden moongose).
  Ademas, le aplicamos un filtro (writedByUser) para que solo te traiga las notas de dicho usuario */
  const notes = await note
    .find({ writedByUser: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id", verifyAuthentication, async (req, res, next) => {
  // obtenemos los parametros de la URL con la req.params
  const foundNote = await note.findById(req.params.id);
  res.render("notes/edit-note", {
    foundNote,
    title: foundNote.title,
    description: foundNote.description,
    id: foundNote._id,
  });
});

// update data
router.put("/notes/edit-note/:id", verifyAuthentication, async (req, res) => {
  const { title, description } = req.body;
  await note.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
  });
  req.flash("succes_msg", "Your note has been updated!");
  res.redirect("/notes");
});

// delete data
router.delete(
  "/notes/delete-note/:id",
  verifyAuthentication,
  async (req, res) => {
    await note.findByIdAndDelete(req.params.id);
    req.flash("succes_msg", "Your note has been deleted!");
    res.redirect("/notes");
  }
);

// create data
router.post("/notes/new-note", verifyAuthentication, async (req, res, next) => {
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
    /* Al final, le agregamos el id almacenado en session del usuario a cada nota y asi cuando nos traigamos las notas en All notes, solo saldran las notas del usuario logeado */
    newNote.writedByUser = req.user.id;
    await newNote.save();
    req.flash("succes_msg", "Note added Successfully!");
    res.redirect("/notes");
  }
});

module.exports = router;
