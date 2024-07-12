
const express = require('express')
const router = express.Router()

router.get('/testando/router', (req, res) =>{
    res.render('userEjs/record')
})


module.exports = router