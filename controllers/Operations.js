const Note = require("../models/Note");

// READ NOTES
exports.read = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE NOTE
exports.write = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// DELETE NOTE (SECURE)
exports.deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ensure ownership
    });

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// UPDATE NOTE (SECURE)
exports.update = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id, // ensure ownership
      },
      {
        title,
        description,
      },
      { new: true } // returns updated document
    );
    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
