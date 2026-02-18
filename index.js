require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://notebook-seven-zeta.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use("/note", routes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Notebook API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
