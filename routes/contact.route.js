const express = require('express');

const router = express.Router();

router.get('/add', (req, res) => {
	res.render('add', { title: 'Add contact' });
});

router.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	res.render('edit', { id, title: 'Edit contact' });
});

router.get('/delete/:id', (req, res) => {
	const id = req.params.id;
	res.redirect('/');
});

module.exports = router;
