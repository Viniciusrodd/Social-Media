
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const recordModel = require('../models/recordModel')
const { where } = require('sequelize')
const bcrypt = require('bcryptjs')
const userAuth = require('../middlewares/authenticate')


//ROTA DA HOME PAGE
router.get('/homepage', userAuth, (req, res) =>{
    if(userAuth){
        res.render('paginasBase/homePage')
    }else{
        res.redirect('/login?error=Preciso fazer login para acessar.')
    }  
})



//ROTA DE LOGOUT
router.get('/logout', (req, res) =>{
    req.session.user = undefined
    res.redirect('/login')
})



//ROTA DE PROFILE
router.get('/profile', userAuth, (req, res) =>{
    
    recordModel.findByPk(3)
        .then((dadosPegos) =>{
            res.render('paginasBase/profile', {
                dadosRecord: dadosPegos
            })
        })
        .catch((error) =>{
            console.log(error)
        })
})

module.exports = router