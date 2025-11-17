const express = require('express');
const { getContacts, saveContacts } = require('../helpers/utils');
const db = require('../helpers/db');

const router = express.Router();

router.get('/add', (req, res) => {
	res.render('add', { title: 'Add contact' });
});

router.post('/add', (req, res) => {
	const { name, email, mobile } = req.body;
	const id = global.crypto.randomUUID();
	const createQuery = 'INSERT INTO users (id, email, name, mobile) VALUES (?, ?, ?, ?)';
	const createValues = [id, email, name, mobile];
	db.query(createQuery, createValues, (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		res.redirect('/');
	});
});

router.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	const updateQuery = 'SELECT * FROM users WHERE id = ?';
	const updateValue = [id];

	db.query(updateQuery, updateValue, (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		if (!result.length) return res.status(404).json({ message: 'Contact is not found' });
		res.render('edit', { title: 'Edit contact', contact: result[0] });
	});
});

router.post('/edit/:id', (req, res) => {
	const id = req.params.id;
	const { name, email, mobile } = req.body;
	const updateQuery = 'UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?';
	const updateValues = [name, email, mobile, id];

	db.query(updateQuery, updateValues, (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		res.redirect('/');
	});
});

router.get('/delete/:id', (req, res) => {
	const id = req.params.id;

	const deleteQuery = 'DELETE FROM users WHERE id = ?';
	const deleteValue = [id];

	db.query(deleteQuery, deleteValue, (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		res.redirect('/');
	});
});

module.exports = router;
