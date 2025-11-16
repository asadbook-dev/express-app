const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin07!',
	database: 'contacts',
});

db.connect(err => {
	if (err) {
		console.log(`Error while connecting to DB: ${err}`);
		return;
	}
	console.log('Connected DB');
});

module.exports = db;
