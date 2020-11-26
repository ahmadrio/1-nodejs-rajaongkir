const configResponse = require('../config/response')
const Cost = require('../models/Cost')
const RajaOngkirService = require('../services/RajaOngkir')
const _ = require('lodash')
const { Op } = require("sequelize")
const RabbitMQ = require('../services/RappitMQ')

exports.cost = (req, res) => {
    const reqBody = {
        origin: req.body.origin,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: req.body.courier,
    }

    const tempResults = []
    const tempPromise = []
    _.forEach(reqBody.destination, (destination_id, destination_index) => {
        tempPromise.push(Cost.findAndCountAll({
            where: {
                [Op.and]: {
                    origin: req.body.origin,
                    weight: req.body.weight,
                    courier: req.body.courier,
                    destination: destination_id
                }
            }
        })
        .then(async result => {
            const newResults = []

            if (result.count > 0) {
                for (const item of result.rows) {
                    newResults.push(JSON.parse(item.results))
                }

                tempResults.push(_.flatten(newResults))
            } else {
                let newParams = {
                    origin: reqBody.origin,
                    destination: destination_id,
                    weight: reqBody.weight,
                    courier: reqBody.courier
                }

                const RO_results = await RajaOngkirService.getCost(newParams)
                let data = _.assign(newParams, {
                    results: JSON.stringify(RO_results)
                })
                Cost.build(data).save()
                tempResults.push(RO_results)
            }

            return tempResults
        })
        .catch(error => { throw error }))
    })

    Promise.all(tempPromise).then(resp => {
        const data = _.uniq(_.flattenDeep(resp))

        data.forEach((item, index) => {
            RabbitMQ.customer(`queue_${item.query.origin}_${item.query.destination}_${item.query.weight}_${item.query.courier}`)
            RabbitMQ.producer(`queue_${item.query.origin}_${item.query.destination}_${item.query.weight}_${item.query.courier}`, item)
        })

        configResponse.success(data, res)
    })
    .catch(error => { throw error })

}
