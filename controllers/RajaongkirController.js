const axios = require('axios')
const db = require('../config/database')
const configResponse = require('../config/response')

axios.defaults.baseURL = process.env.RO_URL_DEFAULT
axios.defaults.headers.common['key'] = process.env.RO_API_KEY
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

exports.ongkos = (req, res) => {
    const param = req.params
    db.query(`select * from ongkos where asal = ? and tujuan = ? and berat = ? and kurir = ?`,
        [param.asal, param.tujuan, param.berat, param.kurir],
        (err, results) => {
            if (err) throw err

            if (results.length > 0) {
                configResponse.success(JSON.parse(results[0].results), res)
            } else {
                axios.post('/cost', {
                        origin: param.asal,
                        destination: param.tujuan,
                        weight: param.berat,
                        courier: param.kurir,
                    })
                    .then(response => {
                        const data = response.data
                        db.query(`insert into ongkos(asal, tujuan, berat, kurir, results) values (?, ?, ?, ?, ?)`,
                            [param.asal, param.tujuan, param.berat, param.kurir, JSON.stringify(data.rajaongkir.results)],
                            (err, result) => {
                                if (err) throw err
                            })
                        configResponse.success(data.rajaongkir.results, res)
                    })
                    .catch(err => res.send(err))
            }
        })

}
