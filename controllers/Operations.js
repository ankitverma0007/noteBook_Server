const Note = require("../models/Note");

exports.read = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.write = async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });
    res.status(201).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate({
      _id: req.params.id,
      user: req.user.id
      },
      {
        title: req.body.title,
        description: req.body.description
      },
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
