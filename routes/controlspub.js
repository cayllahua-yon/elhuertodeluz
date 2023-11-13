const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn }= require('../lib/auth'); //solo voy importar el metodo isloggedIn tambien isNotLoggedIN

const pool = require('../database');

router.get('/controlpub',  isLoggedIn, async(req, res) => {  // renderisa 
    
    const consasns =  await pool.query('SELECT value FROM statenftsensor ORDER by id DESC LIMIT 1'); // act stado  sensor nft
    
    const consawln =  await pool.query('SELECT value FROM statenftwaterlevel ORDER by id DESC LIMIT 1'); //  stado water level NFT    
     
    const consasb =  await pool.query('SELECT value FROM statenftbomb ORDER by id DESC LIMIT 1'); // act stado  bomba nft
    const consabn =  await pool.query('SELECT value FROM actbombnft ORDER by id DESC LIMIT 1');  // manual
    
    const consass =  await pool.query('SELECT value FROM stateseedling ORDER by id DESC LIMIT 1'); // stado act almacigo auto
    const consabs =  await pool.query('SELECT value FROM actbombseedling ORDER by id DESC LIMIT 1');  // manual

    const consasps =  await pool.query('SELECT value FROM statepostseedling ORDER by id DESC LIMIT 1'); // estado act POST almacigo auto
    const consabps =  await pool.query('SELECT value FROM actbombpostseedling ORDER by id DESC LIMIT 1');  // manual
    
    const consalt =  await pool.query('SELECT value FROM actlighting ORDER by id DESC LIMIT 1');  //  Alumbrado FOCO  ****

    const consasnsc =  await pool.query('SELECT value FROM statenftsensorconsultation ORDER by id DESC LIMIT 1'); // act stado  sensor nft

    res.render('controlpub', { conasns: consasns, conawln: consawln, conasb: consasb,  conabn: consabn, conass: consass, conabs: consabs , conasps: consasps, conabps: consabps, conalt: consalt,  conasnsc: consasnsc });
       
});

module.exports = router;