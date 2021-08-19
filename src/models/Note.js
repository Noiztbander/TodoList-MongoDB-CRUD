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
	},
  writedByUser: {type: String}
});

module.exports = model("Note", noteSchema);
