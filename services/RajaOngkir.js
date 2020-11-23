require('dotenv').config()
const axios = require('axios')

axios.defaults.baseURL = process.env.RO_URL_DEFAULT
axios.defaults.headers.common['key'] = process.env.RO_API_KEY
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

module.exports = {
    getCost: (params) => {
        return new Promise((resolve, reject) => {
            axios.post('/cost', params)
            .then(response => {
                resolve(response.data.rajaongkir.results)
            })
            .catch(err => reject(err))
        })
    }
}
