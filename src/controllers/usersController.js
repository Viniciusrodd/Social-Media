
const express = require('express')
const router = express.Router()

router.get('/testando/router', (req, res) =>{
    res.render('userEjs/registro')
})


module.exports = router