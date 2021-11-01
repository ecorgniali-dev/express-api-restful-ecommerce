const transporterGm = require('../email/gmail');
const config = require('../../config/config');
const { loggerInfo, loggerWarn, loggerError } = require('../../config/log4js');

function enviarMailOrdenGenerada(orderItems, cliente) {

    const template = orderItems.map((producto) => `<tr><td>${producto.codigo}</td><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>${producto.precio}</td></tr>`).join('');

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

function enviarMailRegistroUsuario(newUser) {

    //envio aviso logueo con Gmail
    transporterGm.sendMail({
        from: config.GMAIL_USER,
        to: config.ADMIN_EMAIL,
        subject: 'Nuevo Registro de Usuario',
        html: `
                <p>Email: ${newUser.email}</p>
                <p>Nombre: ${newUser.nombre}</p>
                <p>Dirección: ${newUser.direccion}</p>
                <p>Edad: ${newUser.edad}</p>
                <p>Teléfono: ${newUser.telefono}</p>
            `
    }, (err, info) => {
        if (err) {
            loggerError.error(err)
            return err
        }
        loggerInfo.info(info);
    });

}

function enviarMailErrorServer(error, host) {

    //envio aviso error servidor al admin
    transporterGm.sendMail({
        from: config.GMAIL_USER,
        to: config.ADMIN_EMAIL,
        subject: 'Ha ocurrido un error en el servidor',
        html: `
                <h1>Ups! ha ocurrido un error en el servidor ${host} !!</h1>
                <fieldset>
                    <legend>Detalle:</legend>
                    <p>${error}</p>
                </fieldset>
            `
    }, (err, info) => {
        if (err) {
            loggerError.error(err)
            return err
        }
        loggerInfo.info(info);
    });

}

module.exports = {
    enviarMailOrdenGenerada,
    enviarMailRegistroUsuario,
    enviarMailErrorServer
};