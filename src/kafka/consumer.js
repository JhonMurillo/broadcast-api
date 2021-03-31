const { kafkaClient } = require('./index')
const { get } = require('../socket/index')
const { v4: uuidv4 } = require('uuid');
const { KAFKA_TOPIC_NAME = 'broadcast-app' } = process.env

const consumer = kafkaClient.consumer({ groupId: 'broadcast-app' })

const runConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: KAFKA_TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const { socketServer, socketIO } = get();
                socketIO.sockets.emit('broadcast', message.value.toString());
            } catch (error) {
                console.log(error)
                process.exit(1)
            }
        },
    })
}

module.exports = {
    runConsumer
}