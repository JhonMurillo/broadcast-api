'use strict'

const express = require('express')
const chalk = require('chalk')
const path = require('path')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')
// const socketIo = require('socket.io');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const { connect } = require('../src/kafka/index')
const { send } = require('../src/kafka/producer')
const { runConsumer } = require('../src/kafka/consumer')
const { start } = require('../src/socket/index')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Broadcast App working properly')
})

app.post('/send', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await send({ messages });
        res.status(200).json({
            ID: uuidv4(),
            message: 'message sent!!',
            response
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal Error:' + error.message
        })
    }
})

app.use((err, req, res, next) => {
    if (err.message.match(/not found/)) {
        res.status(404).send({ error: err.message })
    }
    if (err.message.match(/bad request/)) {
        res.status(400).send({ error: err.message })
    }
    res.status(500).send({ error: err.stack })
})

function handleFatalError(err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandleRejection', handleFatalError)

const server = app.listen(port, async () => {
    start(server);
    await connect();
    await runConsumer();
    console.log(`${chalk.green('[broadcast-app]')} ${chalk.yellowBright(`server listening on port ${port}`)}`)
})


// const io = socketIo(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {

//     setInterval(() => { socket.emit('welcome_event', { iam: uuidv4(), message: 'Welcome to Broadcast App', date: new Date() }); }, 3000);

//     socket.on('response_event', async (data) => {

//         await send({
//             "messages": [
//                 {
//                     "value":JSON.stringify(data)
//                 }
//             ]
//         });
//     });
// });

module.exports = server