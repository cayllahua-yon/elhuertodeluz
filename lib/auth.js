//tambien podriamos ponerlo dentro de helpers.js
module.exports = {
    isLoggedIn(req, res, next) { // saber si esta logeado o no - lo ejecutaremos en las rutas de express x ruta procesaremos estos datos
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req, res, next) {
        if(!req.isAuthenticated()){ // si el usuario no esta autenticado 
            return next();
        }
        return res.redirect('/profile'); // si esta autenticado enviarlo a profile y ya no a signin 
    }
}
//nesecitos importar paara proteger por ejemplo en authentication.js