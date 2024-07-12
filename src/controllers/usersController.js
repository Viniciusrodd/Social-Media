
const express = require('express')
const router = express.Router()

router.get('/testando/router', (req, res) =>{
    res.render('userEjs/pagPrincipal')
})


module.exports = router