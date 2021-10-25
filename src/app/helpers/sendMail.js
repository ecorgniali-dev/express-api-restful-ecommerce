const transporterGm = require('../email/gmail');
const config = require('../../config/config');
const { loggerInfo, loggerWarn} = require('../../config/log4js');

function enviarMail(orderItems, cliente) {

    const template = orderItems.map((producto) => `<tr><td>${producto.item.codigo}</td><td>${producto.item.nombre}</td><td>${producto.cantidad}</td><td>${producto.item.precio}</td></tr>`).join('');

    // envio de email al admin
    transporterGm.sendMail({
        from: config.GMAIL_USER,
        to: config.ADMIN_EMAIL,
        subject: `Nuevo Pedido de ${cliente.email}`,
        html: `
            <div>
                <h4>Productos:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${template}
                    </tbody>
                </table>
                                
                <h4>Dirección de entrega:</h4>
                <p>${cliente.direccion}</p>
            </div>`
    }, (err, info) => {
        if (err) {
            loggerWarn.warn(err.message)
            return err
        }
        loggerInfo.info(info);
    });

}

module.exports = enviarMail;