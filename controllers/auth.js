const User = require("../models/user");
const Note = require("../models/Note");
const Task = require("../models/tasks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token,
      user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
     });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// change password

exports.changePass = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Get user from token (not email)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteAcc = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    await Note.deleteMany({ user: req.user.id });
    await Task.deleteMany({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "Account deleted successfully" });

  } catch (error) {
    console.log("DELETE ACCOUNT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({ user: req.user.id });

    res.json({ message: "All your notes deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.id });

    res.json({ message: "All your tasks deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


