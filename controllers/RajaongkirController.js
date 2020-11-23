const configResponse = require('../config/response')
const Cost = require('../models/Cost')
const RajaOngkirService = require('../services/RajaOngkir')
const _ = require('lodash')

exports.cost = (req, res) => {
    const params = {
        origin: req.params.origin,
        destination: req.params.destination,
        weight: req.params.weight,
        courier: req.params.courier,
    }

    Cost.findAndCountAll({
        where: params
    })
    .then(result => {
        if (result.count > 0) {
            configResponse.success(JSON.parse(result.rows[0].results), res)
        } else {
            let response_results = async () => {
                return await RajaOngkirService.getCost(params)
            }

            response_results()
                .then(response => {
                    if (typeof response !== 'undefined') {
                        // save database
                        let data = _.assign(params, {results: JSON.stringify(response)})
                        Cost.build(data).save()

                        configResponse.success(response, res)
                    }
                })
                .catch(error => console.log(error))
        }
    })

}
