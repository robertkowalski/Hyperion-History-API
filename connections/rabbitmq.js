const amqp = require('amqplib');

async function amqpConnect() {
    const amqp_username = process.env.AMQP_USER;
    const amqp_password = process.env.AMQP_PASS;
    const amqp_host = process.env.AMQP_HOST;
    const amqp_vhost = 'hyperion';
    const amqp_url = `amqp://${amqp_username}:${amqp_password}@${amqp_host}/%2F${amqp_vhost}`;
    let channel, confirmChannel, connection;
    try {
        connection = await amqp.connect(amqp_url);
        channel = await connection.createChannel();
        confirmChannel = await connection.createConfirmChannel();
    } catch (e) {
        console.log(e);
    }

    connection.on('error', (err) => {
        console.log("[AMQP] error");
        console.log(err);
    });

    return [channel, confirmChannel];
}

module.exports = {
    amqpConnect
};
