// auntenticar al usuario  signIn singUp, Logout
const express = require('express');
const router = express.Router();

const passport = require('passport'); // me traigo el modulo que he definido y utilizare su metodo autenticate()
const { isLoggedIn, isNotLoggedIn }= require('../lib/auth'); //solo voy importar el metodo isloggedIn y isNotLoggedIN

const pool = require('../database');

//--------Para signUp: registar un usuario--------
// enrutador signup para que vea un formulario  -vamos a renderisar el formulario  -- asimismo isNotLoggedIn si tubieramos un problema
router.get('/signup', isLoggedIn, (req, res) =>{
    res.render('auth/signup');
});  // no deberia protegerlo porque es para que se registe 

// para recibir los datos de ese formulario
// router.post('/signup', (req, res) => {
//     passport.autheticate('local.signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });
//     // req.body
//     res.send('Received');
// });

// o tambien asi podemos escribir el enrutador  - tener encuenta para crear una cuenta isNotLoggedIn
router.post('/signup', isLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

//-----------------------para SignIn------ logearme------
router.get('/signin',isNotLoggedIn, (req, res) => {
    res.render('auth/signin'); // con esto renderisamos 
});

router.post('/signin', isNotLoggedIn, async (req, res, next) => { // aqui cambiamos ya que se valida los datos sino puedes usar como en signup
        
    passport.authenticate('local.signin', { //con esto tenemos nuestro proceso de auntentificacion para que funcione
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res , next); // al final es un middleware
        
});

router.get('/profile',  isLoggedIn, async(req, res) => {  // primero antes de ejecutar la logica renderisa algo primero, isloggedin
    
    const consph =  await pool.query('SELECT value FROM ph ORDER by id DESC LIMIT 1');  
    const consec =  await pool.query('SELECT value FROM ec ORDER by id DESC LIMIT 1');  
    const conswt =  await pool.query('SELECT value FROM watertemp ORDER by id DESC LIMIT 1');  
    const conswf =  await pool.query('SELECT value FROM waterflow ORDER by id DESC LIMIT 1');  
    const consat =  await pool.query('SELECT value FROM airtemp ORDER by id DESC LIMIT 1');  
    const consah =  await pool.query('SELECT value FROM airhr ORDER by id DESC LIMIT 1');  
    const consslh =  await pool.query('SELECT value FROM seedlinghumidity ORDER by id DESC LIMIT 1');
    const consb =  await pool.query('SELECT value FROM buoy ORDER by id DESC LIMIT 1');     //SELECT SUM(value) FROM `waterconsumption`;
    const constwc =  await pool.query('SELECT SUM(value) FROM waterconsumption');
      
    res.render('profile', {conph: consph, conec: consec, conwt: conswt,
                           conwf: conswf, conat: consat, conah: consah,
                           conslh: consslh, conb: consb, contwc: constwc });
});

// limpiar la session terminar con sesion existente
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut(); // passport nos da un metodo
    res.redirect('/signin'); // le redirecionamos a la signin para que si desea loguearse 
});

module.exports = router;