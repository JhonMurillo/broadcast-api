const notifier = require('node-notifier');
const io = require("socket.io-client");
const open = require('open');
const toast = require('powertoast');






const API = 'http://localhost:3001';

const socket = io.connect(API);

socket.on('broadcast', (data) => {

    const { ID, title, message, type } = JSON.parse(data)

    // toast({
    //     message,
    //     onClick: `${API}/notification/${ID}`
    // }).catch(err => console.error(err));


    notifier.notify({
        title: title,
        message: message,
        sound: true,
        wait: true,
        timeout: 1,
        actions: 'View',
        reply: true
        // appName: 'Broadcast APP'
    },
        async (error, response, metadata) => {
            console.log(response, metadata);
            if(error) throw error;
            if(response === 'activate'){
                await open(`${API}/notification/${ID}`);
            }


        });

        // notifier.on('click', function (notifierObject, options, event) {
        //     // Triggers if `wait: true` and user clicks notification
        //     await open(`${API}/notification/${ID}`);

        //     console.log(notifierObject,options, event )
        //   });
});
