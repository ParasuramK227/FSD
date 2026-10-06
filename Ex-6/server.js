const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;
// Handlebars setup
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => res.render('quiz'));
app.post('/submit', (req, res) => {
    const { name, answer } = req.body;
    const score = (answer === "Delhi") ? 1 : 0;
    res.render('result', { name, answer, score });
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
