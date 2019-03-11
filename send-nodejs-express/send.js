var express = require('express')
var app = express();

var ampq = require('amqplib/callback_api');

const port = 3001;

ampq.connect('amqp://192.168.99.100', (err, conn)=>{
    if(err){
        console.log(err)
    }

    
    conn.createChannel((err, ch)=>{
        var queue = 'firstQueue';
        var message = {type:'2', content: 'Hello RabbitMQ'}

        ch.assertQueue(queue, {durable: false});
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
        console.log('message was sent');
    })
})


app.listen(port, ()=>console.log(`App listening on port ${port}`))