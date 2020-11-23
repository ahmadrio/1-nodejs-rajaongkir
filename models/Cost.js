const { Sequelize, DataTypes } = require('sequelize')
const connection = require('../config/database')

const Cost = connection.define('cost', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: DataTypes.INTEGER
    },
    destination: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.INTEGER
    },
    courier: {
        type: DataTypes.STRING
    },
    results: {
        type: DataTypes.JSON
    }
}, {
    timestamps: true,
})

module.exports = Cost
