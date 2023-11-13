// definir los metodos de autentificacion . y define que tipo de autentificaion requiero
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
//con estos dos ya podemos crearlo
const pool = require('../database');
const helpers = require('../lib/helpers'); //quiero los dos metos o todo

var passwordValidator = require('password-validator');
var schema = new passwordValidator();

//----- esto es para el login-iniciar session  -----
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',  // atravez de que campo voy recibir de la vista
    passwordField: 'password',
    passReqToCallback: true    // pasaremos el objeto callback
}, async (req, username, password, done) => { // done : para terminar con el proceso y siga con el resto del codigo

    const rows = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
   
    if(rows.length > 0){
       
        const user  = rows[0]; // almacenamos ese usuario que he encontrado
        const status = rows[0].status; 
        
        const validPassword = await helpers.matchPassword(password, user.password); // al terminar la comparacion me devolera un true o false
        
        if(status == 0){
            done(null, false, req.flash('message', 'Usuario Inactivo'));

        } else if(validPassword){
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));

        }
        
    } else {
         return done(null, false, req.flash('message' ,'El nombre de usuario no existe.'));
     
    }
}));

//----- para registar-- creando un objeto de configuracion, luego que va hacer al momento de autentificarse
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
     
    const { name } =  req.body;   
    const newUser = {
        username,
        password,
        name
    }; // ahora vamos a importar nuestra conexion    
    
    schema
        .is().min(8, 'Minimo 8 caracteres')              // Minimum length 8
        .is().max(100, 'Maximo 100 caracteres')                                  // Maximum length 100
        .has().uppercase(1, 'Debe contener almenos una letra mayúscula')                              // Must have uppercase letters
        .has().lowercase(1, 'Debe contener almenos una letra minúscula')                              // Must have lowercase letters
        .has().digits(1,'Debe tener al menos 1 digitos')    // Must have at least 2 digits
        .has().symbols(1, 'Debe tener almenos 1 símbolo')
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

        
         const err = schema.validate(req.body.password, { details: true });

        if(schema.validate(req.body.password) == true){

            newUser.password = await helpers.encryptPassword(password);  // antes de guardar se cifra 
            const result = await pool.query('INSERT INTO user SET ?', [newUser]);
            
            newUser.id = result.insertId; // opteniendo el id del usuario
            return done(null, newUser); //null para un error-- voy devolver el newUser para que los almacaene en una sesion

        } else {
            
            return done(null, false, req.flash('message', err[0].message));
            
        }   
    
})); // una instanciacion strategy(lo que queremos recibir)
// para los otros datos se usa un req.body 
// luego agregamos algunos middleware

// serializar  : estoy guardando el id del usuario enla sesion
passport.serializeUser((user, done) => { // vamos usar el usuario y un callback par aque continue
    done(null, user.id); // gracias al id vamos a guardar la session y luego sereializarlo de la sesion
});

//deserializar : estoy tomando el id almacenado para volver a optener esos datos 
passport.deserializeUser( async (id, done) => {  // para deserilizar requiero hacer la consulta ala base de datos por el id
    const rows = await pool.query('SELECT * FROM user WHERE id = ?', [id]); // devuelve una filas en lo generar un arreglo
    done(null, rows[0]); // solo el indice 0 
});
