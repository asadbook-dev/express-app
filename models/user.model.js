const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const User = sequelize.define(
	'User',
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		email: { type: DataTypes.STRING, unique: true, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
		mobile: { type: DataTypes.STRING, allowNull: false },
	},
	{ timestamps: true }
);

module.exports = User;
