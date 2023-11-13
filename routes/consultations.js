const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //protegemos las rutas que uno debe acceder solo logeado


//----------------------------------Humedad Ambiente----------------------------
router.get('/consultationAirHr', isLoggedIn, (req, res) => {    
  // res.send("mensaje al navegador") 
  res.render('consultations/consultationAirHr');
});

router.post('/consultationAirHr', isLoggedIn, async(req, res) => {
  const { date_start, date_end } = req.body;  
  const consultationsAirHr =  await pool.query('SELECT * FROM airhr WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  
  res.render('consultations/consultationAirHr', {consultation: consultationsAirHr }); // lo consumimos en consultations/name.hbs

});

//-------------------------------AirTemp--------------------------
//ruta pra editar los consultations que viene de consultationAirTemp.hbs
router.get('/consultationAirTemp', isLoggedIn, (req, res) => {
   
res.render('consultations/consultationAirTemp');
});

router.post('/consultationAirTemp', isLoggedIn, async(req, res) => {

  const { date_start, date_end } = req.body; 

  const consultationsAirTemp =  await pool.query('SELECT * FROM airtemp WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  

  res.render('consultations/consultationAirTemp', {consultation: consultationsAirTemp });

});

//-------------------------------Conductividad Electrica--------------------------
router.get('/consultationEc', isLoggedIn, (req, res) => {
     
  res.render('consultations/consultationEc');
  });
  
  router.post('/consultationEc', isLoggedIn, async(req, res) => {
  
    const { date_start, date_end } = req.body; 
  
    const consultationsEc =  await pool.query('SELECT * FROM ec WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  
  
    res.render('consultations/consultationEc', {consultation: consultationsEc });
  
  });
  //-------------------------------potencial de Hidrogeno--------------------------
router.get('/consultationPh', isLoggedIn, (req, res) => {
      
  res.render('consultations/consultationPh');
  });
  
  router.post('/consultationPh', isLoggedIn, async(req, res) => {
  
    const { date_start, date_end } = req.body; 
  
    const consultationsPh =  await pool.query('SELECT * FROM ph WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  
  
    res.render('consultations/consultationPh', {consultation: consultationsPh });
  
  });

  //-------------------------------temperatura agua--------------------------
  router.get('/consultationWaterTemp', isLoggedIn, (req, res) => {
       
  res.render('consultations/consultationWaterTemp');
  });
  
  router.post('/consultationWaterTemp', isLoggedIn, async(req, res) => {
  
    const { date_start, date_end } = req.body; 
  
    const consultationsWaterTemp =  await pool.query('SELECT * FROM watertemp WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  
  
    res.render('consultations/consultationWaterTemp', {consultation: consultationsWaterTemp });
  
  });
//--------------------------humedad de almacigo- seedling----------------------------
router.get('/consultationSeedlingH', isLoggedIn, (req, res) => {
   
res.render('consultations/consultationSeedlingH');
});

router.post('/consultationSeedlingH', isLoggedIn, async(req, res) => {

  const { date_start, date_end } = req.body; 

  const consultationsSeedlingH =  await pool.query('SELECT * FROM seedlinghumidity WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  

  res.render('consultations/consultationSeedlingH', {consultation: consultationsSeedlingH });

});

//-------------------------------consumo agua--------------------------
router.get('/consultationConsumptionWater', isLoggedIn, (req, res) => {
    
res.render('consultations/consultationConsumptionWater');
});

router.post('/consultationConsumptionWater', isLoggedIn, async(req, res) => {

  const { date_start, date_end } = req.body; 

  const consultationsCw =  await pool.query('SELECT * FROM waterconsumption WHERE date_register BETWEEN ? AND ?', [date_start, date_end]);  

  res.render('consultations/consultationConsumptionWater', {consultation: consultationsCw });

});

module.exports = router;