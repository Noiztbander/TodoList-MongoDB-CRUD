const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = model("Note", noteSchema);
