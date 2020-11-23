const express = require('express')
const router = express.Router()
const axios = require('axios')
const { response } = require('express')

const RajaongkirController = require('../controllers/RajaongkirController')

router.get('/cost/:origin/:destination/:weight/:courier', RajaongkirController.cost)

module.exports = router
