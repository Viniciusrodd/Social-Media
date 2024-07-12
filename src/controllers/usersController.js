
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const recordModel = require('../models/recordModel')



//ROTA PRINCIPAL
router.get('/cadastro', (req, res) =>{
    res.render('userEjs/record')
})



//ROTA DE CRIAÇÃO DE DADOS NA TABELA RECORD
router.post('/savingRecords', (req, res) =>{
    var nameVar = req.body.name
    var userNameVar = req.body.username
    var emailVar = req.body.email
    var passwordVar = req.body.password
    var maleVar = req.body.male
    var femaleVar = req.body.female

    if(!nameVar || !userNameVar || !emailVar || !passwordVar){
        res.redirect('userEjs/record')
    }

    if(!maleVar && !femaleVar){
        res.redirect('userEjs/record')
    }

    recordModel.create({
        fullName: nameVar,
        userName: userNameVar,
        email: emailVar,
        password: passwordVar
    })
    .then(() =>{
        console.log('Table Fields created')
        res.render('userEjs/login')
    })
    .catch((error) =>{
        console.log(`erro ao criar campos ${error}`)
    })
})


module.exports = router