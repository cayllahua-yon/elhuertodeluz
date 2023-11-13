// archivos que van arrancar la aplicacion
const express = require('express'); 
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash  = require ('connect-flash');   //Este es un middleware
const session = require('express-session'); //Almacena en la memoria del servidor tambien en bd
const MySQLStore = require('express-mysql-session'); //le voy dar ala propiedad store para darle la conexion ala base de datos
const passport = require('passport'); // definir autentificacion sino para ejecutar su codigo principal, utilizar sus metodos y usarlo dentro de Middleware

const { database } = require('./keys');

//---------Initialization ---------
const app = express();   //express inicializate app es mi aplicacion  
require('./lib/passport'); //Esta aplicacion se entere de la autenticacion que estoy haciendo

//---------Setting---------- Las configuracion que requiere mi servidor de express
app.set('port', process.env.PORT || 4000);    //|| 4000    //validamos si existe un puerto en nuestro servidor
app.set('views', path.join(__dirname, 'views'));     //decirle a node que la carpeta views esta aqui
// unir directorios con path.join -- en exphbs requeria de una funcion por eso se añade exphbs.engine({})
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),    //  nuestra vista
    partialsDir: path.join(app.get('views'), 'partials'),  //Pedasos de codigo para reutilizar he inportar en las vistas
    extname: '.hbs',                                // nombre abreviado que llevara las handlebars -> .hbs
    helpers: require('./lib/handlebars.js')  // requerir funciones creadas en /lib/handlebars.js 
                                        
}));  

app.set('view engine', '.hbs'); // para utilizar le damos nuestro nombre de motor .hbs. 

//------Middlewares --------- son funciones que se ejecutan cada ves que un usuario envie una peticion / una aplicacion cliente envie una al servidor
// morgan : muestra las peticion por pantalla que van llegando
app.use(session({
    secret: 'yonmysqlnodesession',
    resave: false,              //para que no renueve la session
    saveUninitialized: false,   // para que no se vuleva a establecer la session
    store: new MySQLStore(database)     //donde guardar la session -> en este lo guardamos dentro de la base de datos
                                        
})); // una ves tenga la session se configuro como un objeto
app.use(flash()); // utilizando la funcionalidad 
app.use(morgan('dev')); // determinado tipo de mensaje por consola (para ver que llega a nuestro servidor)
app.use(express.urlencoded({extended:false})); // aceptar desde los formularios los datos que envien los usuarios :: con false acepta datos como int float pero no imagenes
app.use(express.json()); // para recibir json
app.use(passport.initialize()); // inicializara passport
app.use(passport.session()); 

//-----------Global Variables----------- nombre de mi aplicacion podria acceder de cualquier vista
app.use((req, res, next) => {  
    app.locals.success = req.flash('success'); //vamos hacerlo disponibles en todas mis vistas: primero almaceno esa variable en /router/
    app.locals.message = req.flash('message'); // nota_ flash para que funcione tiene que ser almacenado en una funcion, utilizar nuestro modulo express-session
    
    app.locals.user = req.user; // este es el dato de sessesion del usuario : ahora va ser accedido de cualquier vista
    next();
});

//-------------Routes  ---------------- url de nuestro servidor
app.use(require('./routes'));  // ../routes/index.js     tambien se tiene que importar de su carpeta
app.use(require('./routes/authentication')) ;  // para autentificar al usuario
app.use('/cultivations', require('./routes/cultivations'));  //para almacenar los enlaces  :: para pedir todas las listas links

app.use('/plants', require('./routes/plants')); 
app.use('/persons', require('./routes/persons')); 
app.use('/consultations', require('./routes/consultations')); 
app.use(require('./routes/controlspub')); 

//----------Public -------------- archivos publicos donde el navegador pueda acceder
app.use(express.static(path.join(__dirname, 'public'))); //el metodo static tambien recibe una direcion

//-----------------------404---------------------------------
app.use((req, res, next) => {
    res.status(404).render("404");
  });

//--------- Starting the server--------------
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));           
}); 