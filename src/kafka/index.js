const { Kafka } = require('kafkajs');

const { KAFKA_SERVERS = '', KAFKA_NUM_PARTITIONS = 1, KAFKA_REPLICATION_FACTOR = 1, KAFKA_TOPIC_NAME = 'broadcast-app' } = process.env

const kafka = new Kafka({
    clientId: 'broadcast-app',
    brokers: KAFKA_SERVERS.split(',')
});


const connect = async () => {
    const admin = kafka.admin();
    await admin.connect();

    const topis = await admin.listTopics()

    if (!topis.includes(KAFKA_TOPIC_NAME)) {
        await admin.createTopics({
            topics: [{
                topic: KAFKA_TOPIC_NAME,
                numPartitions: +KAFKA_NUM_PARTITIONS,
                replicationFactor: +KAFKA_REPLICATION_FACTOR
            }
            ],
        });
    }

    await admin.disconnect();
};

module.exports = {
    kafkaClient: kafka,
    connect
}