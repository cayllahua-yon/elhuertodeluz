// conexion a mysql ..nota  convertir collbasck a promesas en node
const mysql = require('mysql'); 
const { promisify } = require('util');

const { database } = require('./keys'); // uitlizamos el destructuri y tramemos solo el  database
const pool = mysql.createPool(database); //nos genera esta conexion ala bd

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }
    
    if(connection) connection.release();
    console.log('DB is Connected'); 
    return;
});

pool.query = promisify(pool.query) //le enviamos pool su metodo que enpiese  async awey -> ahora puedo utilizar promesas
module.exports = pool;    // exporto pool para realizar las consultas