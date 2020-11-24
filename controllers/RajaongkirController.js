const configResponse = require('../config/response')
const Cost = require('../models/Cost')
const RajaOngkirService = require('../services/RajaOngkir')
const _ = require('lodash')
const { Op } = require("sequelize")

exports.cost = (req, res) => {
    const reqBody = {
        origin: req.body.origin,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: req.body.courier,
    }

    Cost.findAndCountAll({
        where: {
            [Op.and]: {
                origin: req.body.origin,
                weight: req.body.weight,
                courier: req.body.courier,
            },
            destination: {
                [Op.in]: req.body.destination
            }
        }
    })
    .then(async result => {
        const newResults = []

        if (result.count > 0) {
            for (const item of result.rows) {
                newResults.push(JSON.parse(item.results))
            }

            configResponse.success(_.flatten(newResults), res)
        } else {
            reqBody.destination.forEach((item, index) => {
                let newParams = {
                    origin: reqBody.origin,
                    destination: item,
                    weight: reqBody.weight,
                    courier: reqBody.courier
                }
                newResults.push(RajaOngkirService.getCost(newParams))
            })

            Promise.all(newResults)
                .then(response => {
                    let responseFilter = _.flatten(response)
                    _.forEach(responseFilter, (items, index) => {
                        const data = _.assign(items.query, {
                            results: JSON.stringify(items.results)
                        })
                        Cost.build(data).save()
                    })

                    configResponse.success(
                        _.flatten(_.map(responseFilter, (items, index) => items.results))
                    , res)
                })
                .catch(error => { throw error })
        }
    })
    .catch(error => { throw error })

}
