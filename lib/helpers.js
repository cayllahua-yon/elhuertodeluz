const bcrypt = require('bcryptjs');
const helpers = {}; // objeto multiples metodos que se puede reutilizar

helpers.encryptPassword = async (password) => { // para registrarnos (este metodo)
   const salt = await bcrypt.genSalt(10); // general un hash 10 veces 
   const hash = await bcrypt.hash(password, salt); // va cifrar la contraseña
    return hash;
};

 //este metodo  es para el logeo
helpers.matchPassword = async (password, savePassword) => { // para el logeo
    try {
       return await bcrypt.compare(password, savePassword);              
    } catch (error) {
        console.log(error); 
    }
};

module.exports = helpers;