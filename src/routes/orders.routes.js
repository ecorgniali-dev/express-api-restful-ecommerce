const { Router } = require('express');
const router = Router();
const shoppingCartController = require('../app/controllers/shoppingCarts');
const ordersController = require('../app/controllers/orders');
const { loggerInfo, loggerError, loggerWarn } = require('../config/log4js');
const sendMail = require('../app/helpers/sendMail');

router.get('/listar', async (req, res) => {
    try {
        let ordenes = await ordersController.list({ email: req.user.email });
        res.render('ordenes', { ordenes: ordenes });
    } catch (error) {
        loggerError.error(error.message);
        res.json({ status: 'error' })
    }
});

router.post('/agregar', async (req, res) => {
    try {
        let cliente = {
            email: req.user.email,
            direccion: req.user.direccion
        }
        const itemsClientCart = await shoppingCartController.list(req.user.id);
        if (itemsClientCart.length) {
            let data = await ordersController.save(cliente, itemsClientCart);
            if (data.estado == 'generada') {
                sendMail(data.productos, cliente);
                res.json({ status: "ok", descripcion: 'Orden generada con exito' });
            }
        } else {
            res.status(404).json({ error: 'Antes de generar un pedido debe agregar productos al carrito' });
        }
    } catch (error) {
        loggerError.error(error.message);
    }

});

router.put('/actualizar/:id', async (req, res) => {
    try {
        res.json(await ordersController.update(req.params.id, req.body));
    } catch (error) {
        loggerError.error(error.message);
    }
});

router.delete('/borrar/:id', async (req, res) => {
    try {
        res.json(await ordersController.delete(req.params.id));
    } catch (error) {
        loggerError.error(error.message);
    }
});

router.put('/confirmar/:id', async (req, res) => {
    try {
        res.json(await ordersController.update(req.params.id, { estado: 'enviada' }));
    } catch (error) {
        loggerError.error(error.message);
    }
});

module.exports = router;