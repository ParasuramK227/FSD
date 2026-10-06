const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./student');
const app = express();
const PORT = 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Home Page - Show all students
app.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("studentList", { students });
});
// Add Student Form
app.get("/add", (req, res) => {
    res.render("addStudent");
});
// Save Student
app.post("/add", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.redirect("/");
});
// Edit Student Form
app.get("/edit/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render("editStudent", { student });
});
// Update Student
app.post("/edit/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});
// Delete Student
app.get("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});