const config = require('../../config/config');
// TWILIO
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// mensaje SMS al cliente
function enviarSms(telefono) {
    client.messages.create({
        body: 'Su pedido ha sido recibido y se encuentra en proceso.',
        from: config.TWILIO_NUM_SMS,
        to: telefono
    })
        .then(message => loggerInfo.info(`SMS_id: ${message.sid} - Enviado a: ${message.to}`))
        .catch(err => loggerWarn.warn(err.message))
}

// mensaje de WhatsApp al admin
function enviarWhatsApp(cliente) {
    client.messages.create({
        body: `Nuevo Pedido de ${cliente.nombre} - ${cliente.email}`,
        from: `whatsapp:${config.TWILIO_NUM_WHATSAPP}`,
        to: `whatsapp:${config.ADMIN_WHATSAPP}`
    })
        .then(message => loggerInfo.info(`WhatsApp_id: ${message.sid} - Enviado a: ${message.to}`))
        .catch(err => loggerWarn.warn(err.message))
}

module.exports = {
    enviarSms,
    enviarWhatsApp
};

