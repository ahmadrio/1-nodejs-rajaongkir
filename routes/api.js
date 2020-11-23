const express = require('express')
const router = express.Router()
const axios = require('axios')
const { response } = require('express')

const RajaongkirController = require('../controllers/RajaongkirController')

router.get('/ongkos/:asal/:tujuan/:berat/:kurir', RajaongkirController.ongkos)

module.exports = router
