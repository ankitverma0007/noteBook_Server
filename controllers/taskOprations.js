const Task = require("../models/tasks");

exports.read = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user.id });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.write = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete({
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
    const updated = await Task.findByIdAndUpdate({
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
