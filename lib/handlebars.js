const dayjs = require('dayjs');
const helpers = {}; 

helpers.dayjs = (timestamp) => { 
    const dayJsObject = dayjs(timestamp);
    return dayJsObject.format('YYYY-MM-DD');
};

helpers.majuscula = (valor) => {
    return valor.toUpperCase()
};

helpers.incre = (i) => {
    return i + 1; 
};

helpers.json = (context) => {
    return JSON.stringify(context);
};

module.exports = helpers;