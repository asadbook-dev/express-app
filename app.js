require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
// const { getContacts } = require('./helpers/utils');
const sequelize = require('./helpers/db');
const User = require('./models/user.model');

const app = express();
const PORT = process.env.PORT;

sequelize
	.authenticate()
	.then(() => {
		console.log('COnnected DB ');
		return sequelize.sync();
	})
	.then(() => console.log('Model was successfully synced!'))
	.catch(err => console.log(`Error connected DB: ${err}`));

// View engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json()); // json parse qilib beradi
app.use(express.urlencoded({ extended: true })); // form data ni ishlataolishimizga imkon beradi
// extended
// false - oddiy formatda datalarni qabul qiladi key=value
// true - nested object (user[name] = ALI)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
	try {
		const users = await User.findAll({ raw: true });
		res.render('home', { title: 'Home page', contacts: users });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
	// const userQuery = 'SELECT * FROM users';
	// db.query(userQuery, (err, results) => {
	// 	if (err) return res.status(500).json({ error: err.message });
	// 	res.render('home', { title: 'Home page', contacts: results });
	// });
	// const contacts = getContacts();
	// res.render('home', { title: 'Home page', contacts });
});
app.use('/contact', require('./routes/contact.route'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
