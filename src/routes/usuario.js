const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');


///////////INDEX///////////INDEX///////////INDEX///////////INDEX///////////
///////////INDEX///////////INDEX///////////INDEX///////////INDEX///////////
router.get('/', (req, res) => {
    res.render('partials/index');
});
router.get('/about', (req, res) => {
    res.render('partials/about');
});
router.get('/users/logout', isAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/')
});




///////////USUARIO///////////USUARIO///////////USUARIO///////////USUARIO///////////
///////////USUARIO///////////USUARIO///////////USUARIO///////////USUARIO///////////
///////////USUARIO///////////USUARIO///////////USUARIO///////////USUARIO///////////




router.post('/users/ingresar', passport.authenticate('Ingreso', {
    successRedirect: '/menu',
    failureRedirect: '/',
    failureFlash: true,
}));
///////////GUARDAR UN NUEVO USUARIO
router.post('/users/registrar', async (req, res, next) => {
    const errors = [];
    const { tipo, CURP, CVU, RFC, nombre, apellidos, direccion, telefono, lugarNacimiento, edad, licenciatura, maestria, doctorado, especialidad, matricula, password, confirm_password } = req.body;
    if(tipo == null){
        errors.push({ text: "Colocar un tipo de Usuario" });
    }
    if (licenciatura == null){
        errors.push({ text: "Colocar al menos al menos la ingeneria" });
    }
    if (password != confirm_password) {
        errors.push({ text: "La contraseña no es igual" });
    }
    if (password.length < 4) {
        errors.push({ text: "colocar una contraseña mayor a 4 digitos" });
    }
    if (errors.length > 0) {
        res.render("users/registrarUsuario", { errors, tipo, CURP, CVU, RFC, nombre, apellidos, direccion, telefono, lugarNacimiento, edad, licenciatura, maestria, doctorado, especialidad, matricula });
    }
    else {
        const matriculaUser = await User.findOne({ matricula: matricula });
        if (matriculaUser) {
            req.flash('error_msg', 'La matricula ya esta registrado');
            res.redirect('/users/registrar');
        }
        const newUser = new User({ tipo, CURP, CVU, RFC, nombre, apellidos, direccion, telefono, lugarNacimiento, edad, licenciatura, maestria, doctorado, especialidad, matricula, password });
        await newUser.save();
        req.flash('sucess_msg', ' Usuario Registrado exitosamente');
        res.redirect('/');
    }
});

module.exports = router;

