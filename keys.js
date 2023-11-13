//se exporta un objeto database para la configuracion de conexion db, se almacena claves o numero de puerto, otras caracteres reservados
// para cuando usemos un proveedor
// module.exports = {
//     database:{
//         host: process.env.HOST_DB, 
//         user: process.env.USER_DB, 
//         password: process.env.PASSWORD_BD,
//         database: process.env.NAME_DATABASE   
//     }
// };
// para facilitar he colocado los datos de variable local aqui pero ustedes añadir en .env y consumirlos aqui
module.exports = {
    database:{
        host: 'localhost', 
        user: 'root', 
        password: '',
        database: 'dbhydroponic'   
    }
};