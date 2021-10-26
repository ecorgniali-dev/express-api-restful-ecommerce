const { Router } = require('express');
const router = Router();
const passport = require('../app/controllers/auth/passport');
const upload = require('../app/middlewares/multer');

//-----------LOGIN----------------
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

//-----------REGISTRO----------------
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