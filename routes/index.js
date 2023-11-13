const express = require('express');
const router = express.Router(); // este metodo devuelve un objeto

router.get('/',(req, res) => {
    // res.send('hello world');
    res.render('index'); // renderiisando a /views/index.hbs
});

module.exports = router;