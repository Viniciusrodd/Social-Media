
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const recordModel = require('../models/recordModel')
const { where } = require('sequelize')
const bcrypt = require('bcryptjs')
const userAuth = require('../middlewares/authenticate')
const profileModel = require('../models/profileModel')



//ROTA CADASTRO
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

    //VERIFICAÇÕES:
    if(!nameVar || !userNameVar || !emailVar || !passwordVar){
        res.redirect('userEjs/record')
    }
    if(!maleVar && !femaleVar){
        res.redirect('userEjs/record')
    }
    //VERIFICAÇÃO DE EXISTENCIA DE EMAIL E GERAÇÃO DE HASH
    recordModel.findOne({
        where: {
            email: emailVar
        }
    })
    .then((dadosEmail) =>{
        if(dadosEmail == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(passwordVar, salt)

            recordModel.create({
                fullName: nameVar,
                userName: userNameVar,
                email: emailVar,
                password: hash
            })
            .then(() =>{
                console.log('Table Fields created')
                res.redirect('/login')
            })
            .catch((error) =>{
                console.log(`erro ao criar campos ${error}`)
            })
        }else{
            //gerando msg de aviso sobre email já existente no front com queryparams
            //queryparams(não é recomendável por segurança)
            res.redirect('/cadastro?error=Email já está em uso, tente outro.')
        }
    })
})



//ROTA DE LOGIN
router.get('/login', (req, res) =>{
    res.render('userEjs/login')
})



//ROTA DE AUTENTICAÇÃO DE USER
router.post('/authenticate', (req, res) =>{
    var emailVar = req.body.email
    var passwordVar = req.body.password

    recordModel.findOne({
        where: {
            email: emailVar,
        }
    })
    .then((dadosLogin) =>{
        if(dadosLogin != undefined){
            //validar senha com Bcrypt
            var correct = bcrypt.compareSync(passwordVar, dadosLogin.password)
            if(correct){
                //criando sessão
                req.session.user = {
                    id: dadosLogin.id,
                    email: dadosLogin.email
                }
                res.redirect('/homepage')
            }else{
                res.redirect('/login?error=Email inválido.')
            }
        }else{
            res.redirect('/login?error=Email inválido.')
        }
    })
})



//ROTA PARA SALVAR ALTERAÇÕES DE PROFILE/ATUALIZANDO NAME DO CADASTRO
router.post('/savingProfile', (req, res) =>{
    var dateVar = req.body.date
    var cityVar = req.body.city
    var countryVar = req.body.country
    var aboutVar = req.body.about

    profileModel.create({
            date: dateVar,
            city: cityVar,
            country: countryVar,
            about: aboutVar
        })
   
    .then(() =>{
        res.redirect('/homepage')
    })
    .catch((error) =>{
        console.log(error);
        res.redirect('/profile')
    })
}) 




module.exports = router