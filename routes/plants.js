const express = require('express'); //requerir
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{
    res.render('plants/add');
});

router.post('/add', isLoggedIn, async(req, res) => {    
    const { name_common, name_scientific, epoch_seeding, period_harvest, percentage_germination, purity, profundity, distance_line, distance_seed, net_weight, date_packing, date_expiration, lot, observation  } = req.body;  
    const newPlant = {
        name_common,
        name_scientific,
        epoch_seeding,
        period_harvest,
        percentage_germination,
        purity,
        profundity,
        distance_line,
        distance_seed,
        net_weight,
        date_packing,
        date_expiration,
        lot,
        observation
    }; 

   await pool.query('INSERT INTO plant set ?', [newPlant]); 
    // res.send('received');
    req.flash('success', 'Planta guardada con éxito.');
    res.redirect('/plants');
});

router.get('/', isLoggedIn, async (req, res) => {
    const plants = await pool.query('SELECT * FROM plant');
    
    res.render('plants/list', { plants });
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM plant WHERE ID = ?', [id]);

    req.flash('success', 'Planta eliminada con éxito.');
    res.redirect('/plants');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const plants = await pool.query('SELECT * FROM plant WHERE id = ?', [id]);
    res.render('plants/edit', { plant: plants[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { name_common, name_scientific, epoch_seeding, period_harvest, percentage_germination, purity, profundity, distance_line, distance_seed, net_weight, date_packing, date_expiration, lot, observation  } = req.body;  
    const newPlant = {
        name_common,
        name_scientific,
        epoch_seeding,
        period_harvest,
        percentage_germination,
        purity,
        profundity,
        distance_line,
        distance_seed,
        net_weight,
        date_packing,
        date_expiration,
        lot,
        observation
    }; 
    await pool.query('UPDATE plant SET ? WHERE id = ?', [newPlant, id]);
    req.flash('success', 'Planta actualizada con éxito.');
    res.redirect('/plants');
});

module.exports = router;