const { Router } = require('express');
const router = Router();
const passport = require('../app/controllers/auth/passport');
const upload = require('../app/middlewares/multer');


/**
 * @swagger
 * tags:
 *   name: Auth
 */
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: 'Login de usuario'
 *     description: Login de usuario
 *     tags: [Auth]
 *     parameters:
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Campos necesarios para el login'
 *       schema:
 *         type: 'object'
 *         properties:
 *           username:
 *             type: 'string'
 *             required: true
 *           password:
 *             type: 'string'
 *             required: true
 *     responses:
 *       200:
 *         description: 'operación exitosa'
 *       404:
 *         description: 'usuario o contraseña incorrecta'
 */
router.post('/login', (req, res, next) => {
    return passport.authenticate('login', (error, accessToken) => {
        if (error !== null) {
            return res.status(404).json({
                error: err
            });
        }

        return res.status(200).json({
            accessToken
        });
    })(req, res, next);
});


/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: 'Registro de usuario'
 *     description: Registro de un nuevo usuario
 *     tags: [Auth]
 *     parameters:
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Campos necesarios para el registro'
 *       schema:
 *         type: 'object'
 *         properties:
 *           username:
 *             type: 'string'
 *             example: 'username@correo.com'
 *             required: true
 *           password:
 *             type: 'string'
 *             example: 'mypassword'
 *             required: true
 *           nombre:
 *             type: 'string'
 *             example: 'Juan Perez'
 *             required: true
 *           direccion:
 *             type: 'string'
 *             example: 'Av. Siempre Viva 742'
 *             required: true
 *           edad:
 *             type: 'integer'
 *             example: 25
 *             required: true
 *           telefono:
 *             type: 'string'
 *             example: +5401112345678
 *             required: true
 *           foto:
 *             type: 'string'
 *     responses:
 *       200:
 *         description: 'operación exitosa'
 *       404:
 *         description: 'fallo en el registro'
 */
router.post('/signup', upload.single('foto'), (req, res, next) => {
    return passport.authenticate('signup', (err) => {
        if (err) {
            return res.status(404).json({
                error: err
            });
        }

        return res.status(200).json({ success: 'Registro exitoso!' });
    })(req, res, next);
});


module.exports = router;