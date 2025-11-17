const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('contact', 'root', 'admin07!', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;

// const mysql = require('mysql2');

// const db = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'admin07!',
// 	database: 'contact',
// });

// db.connect(err => {
// 	if (err) {
// 		console.log(`Error while connecting to DB: ${err}`);
// 		return;
// 	}
// 	console.log('Connected DB');
// });

// module.exports = db;
