const { kafkaClient } = require('./index')
const { KAFKA_TOPIC_NAME = 'broadcast-app' } = process.env


const send = async ({ messages = [
    { value: 'Hello KafkaJS user!' },
] }) => {
    const producer = kafkaClient.producer()
    await producer.connect()
    const result = await producer.send({
        topic: KAFKA_TOPIC_NAME,
        messages,
    })
    await producer.disconnect()
    return result;
};

module.exports = {
    send
}