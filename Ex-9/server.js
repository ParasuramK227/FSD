const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));
const userSchema = new mongoose.Schema({ username: String, password: String });
const User = mongoose.model("User", userSchema);
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "Signup successful" });
});
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.cookie("authUser", username, { httpOnly: true });
    res.json({ message: "Login successful" });
});
app.get("/dashboard", (req, res) => {
    if (!req.cookies.authUser) return res.status(401).json({ message: "Unauthorized access" });
    res.json({ message: `Welcome ${req.cookies.authUser}, this is your dashboard!` });
});
app.post("/logout", (req, res) => {
    res.clearCookie("authUser");
    res.json({ message: "Logged out successfully" });
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));