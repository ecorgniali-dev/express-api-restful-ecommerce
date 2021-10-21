const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../users');
const config = require('../../../config/config');
const transporterGm = require('../../email/gmail');
const { loggerInfo, loggerWarn, loggerError } = require('../../../config/log4js');

// LocalStrategy de "login"
passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    async(req, username, password, done) => {
        // chequeamos si el usuario existe en mongo
        const user = await userController.list({ email: username });

        // usuario no existe
        if (!user.length) {
            return done(null, false, loggerWarn.warn('Usuario no existe!'));
        }

        // usuario existe pero esta mal la contraseña
        if (!isValidPassword(user[0], password)) {
            return done(null, false, loggerWarn.warn('Password incorrecto!'));
        }

        // credenciales correctas
        return done(null, user[0]);

    }
))

// validar password
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}


passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {

        findOrCreateUser = async() => {
            // buscar en mongo el username
            const user = await userController.list({ email: username });

            // usuario ya existe
            if (user.length) {
                return done(null, false, loggerWarn.warn('Usuario ya existe'));
            }

            let { nombre, direccion, edad, telefono } = req.body;
            let foto = req.file == undefined ? null : req.file.filename;
            
            // creamos el susuario
            const newUser = {
                email: username,
                password: createHash(password),
                nombre: nombre,
                direccion: direccion,
                edad: edad,
                telefono: telefono,
                foto: foto
            }

            const userSaved = await userController.save(newUser);

            //envio aviso logueo con Gmail
            /*
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
            */

            return done(null, userSaved);

        }

        process.nextTick(findOrCreateUser);

    }
));

// hashear pass
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};


// serializar
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// deserializar
passport.deserializeUser(async(id, done) => {
    let user = await userController.listId(id);
    done(null, user)
});

module.exports = passport;