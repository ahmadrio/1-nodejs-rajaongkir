const express = require('express')
const router = express.Router()
const RajaongkirController = require('../controllers/RajaongkirController')
const validate = require('../helpers/validate')
const valRajaOngkir = require('./validations/rajaongkir')

router.get('/cost', validate(valRajaOngkir.getCost), RajaongkirController.cost)

module.exports = router
