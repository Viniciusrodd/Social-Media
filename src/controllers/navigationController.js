
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const recordModel = require('../models/recordModel')
const publicationModel = require('../models/publicationModel')
const { where } = require('sequelize')
const bcrypt = require('bcryptjs')
const userAuth = require('../middlewares/authenticate')


//ROTA DA HOME PAGE
router.get('/homepage', userAuth, (req, res) =>{
    publicationModel.findAll()
        .then((publicationData) =>{
            if(userAuth){
                res.render('paginasBase/homePage',{
                    dadosPublications: publicationData
                })
            }else{
                res.redirect('/login?error=Preciso fazer login para acessar.')
            }  
        })
        .catch((error) =>{
            console.log(`error in get publications data`)
        })
})



//ROTA DE LOGOUT
router.get('/logout', (req, res) =>{
    req.session.user = undefined
    res.redirect('/login')
})



//ROTA DE PROFILE
router.get('/profile', userAuth, (req, res) =>{
    
    recordModel.findByPk(1)
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