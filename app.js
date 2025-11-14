require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { getContacts } = require('./helpers/utils');

const app = express();
const PORT = process.env.PORT;

// View engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
	const contacts = getContacts();
	res.render('home');
});
app.use('/contacts', require('./routes/contact.route'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
