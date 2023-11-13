const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //protegemos las rutas que uno debe acceder solo logeado

router.get('/add', isLoggedIn, (req, res) => {
    // res.send('Form')
    res.render('cultivations/add');
});

router.post('/add', isLoggedIn, async(req, res) => { //encargado de recibir los datos del formulario

    const { name, date_inicio, date_germination, date_mediumdose, date_fulldose, date_firsttransplant, date_finaltransplant, date_harvest, quantity, observation } = req.body;  // destructuren de JS
    
    const newCultivation = {
        name,
        date_inicio,
        date_germination,
        date_mediumdose,
        date_fulldose,
        date_firsttransplant,
        date_finaltransplant,
        date_harvest,
        quantity,
        observation        
        // module_id,
        // plant_id,
        // user_id          // ***IMPORTANTE***  // user_id: req.user.id  // tomar el id de la session del usuario y almacenarlo con esa tarea
                             //*** TAMBIEN TIENES QUE MODIFICAR AL OBTENERLOS****
    }; 

   await pool.query('INSERT INTO cultivation set ?', [newCultivation]); 
    req.flash('success', 'Cultivo guardado con éxito'); 
    res.redirect('/cultivations'); 
});

// al enviar datos usamos get
router.get('/', isLoggedIn, async(req,res) => { // voy enviar los cultivationss que he almacenado en db
    const cultivations = await pool.query('SELECT * FROM cultivation'); // al realizar esta consulta los enlaces se almacenan 
     //*****IMPORTANTE ***** 
    // const cultivations = await pool.query('SELECT * FROM cultivation WHERE user_id = ?', [req.user.id]); //**es el id de la session que tiene su id 

    res.render('cultivations/list', { cultivations }); // pero se resume asi 
});

router.get('/delete/:id', isLoggedIn, async(req,res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM cultivation WHERE ID = ?', [id]);

    req.flash('success', 'Cultivo eliminado con éxito');
    res.redirect('/cultivations');  
});

//ruta pra editar los cultivos que viene de cultivo.hbs
router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;  

    const cultivations =  await pool.query('SELECT * FROM cultivation WHERE id = ?', [id]);  
    
    res.render('cultivations/edit', {cultivation: cultivations[0] }); // todos los enlaces de cultivations se parasan por aqui para ser consumido de edit.hbs
});
  
router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { name, date_inicio, date_germination, date_mediumdose, date_fulldose, date_firsttransplant, date_finaltransplant, date_harvest, quantity, observation } = req.body; // estos son los datos nuevos que me estan enviando
        //guardamos en un nuevo objeto
        const newCultivation = {
            name,
            date_inicio,
            date_germination,
            date_mediumdose,
            date_fulldose,
            date_firsttransplant,            
            date_finaltransplant,
            date_harvest,
            quantity,
            observation
        };    
        
        await pool.query('UPDATE cultivation set ? WHERE id = ?', [newCultivation, id]); // actuializame de la tabla estos conjunto de datos donde coincida el id
        
        req.flash('success', 'Cultivo actualizado con éxito');
        res.redirect('/cultivations'); 
});

module.exports = router;