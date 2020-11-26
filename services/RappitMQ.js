const amqp = require('amqplib')

const RappitMQ = {
    customer: (queueName) => {
        amqp.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel()
                    .then(ch => {
                        const queue = ch.assertQueue(queueName, { durable: false })
                        if (queue) {
                            queue
                                .then(() => {
                                    return ch.consume(
                                        queueName,
                                        msg => console.log('- Received', msg.content.toString()),
                                        { noAck: true })
                                })
                                .then(() => {
                                    console.log('* Waiting for messages. Ctrl+C to exit.')
                                })
                        }
                    })
            })
            .catch(console.warn)
    },

    producer: (queueName, message) => {
        amqp.connect('amqp://localhost')
        .then(conn => {
            return conn.createChannel()
                .then(ch => {
                    ch.assertQueue(queueName, { durable: false })
                    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
                    console.log('- Send', message)
                })
                .finally(() => {
                    setTimeout(() => conn.close(), 500)
                })
        })
        .catch(console.warn)
    }
}

module.exports = RappitMQ
