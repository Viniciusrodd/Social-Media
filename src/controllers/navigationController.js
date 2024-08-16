
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
    publicationModel.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
        .then((publicationData) =>{
            if(userAuth){
                const user = req.session.user
                recordModel.findOne({
                    where: {
                        id: user.id
                    }
                })
                .then((recordData) =>{
                    res.render('paginasBase/homePage',{
                        dadosPublications: publicationData,
                        user,
                        dadosRecord: recordData
                    })
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



//VIEW DE EDIT PROFLE
router.get('/editPubli/:id', (req, res) =>{
    var idVar = req.params.id

    if(isNaN(idVar)){
        res.redirect('/paginasBase/homePage')
    }else{
        publicationModel.findByPk(idVar)
            .then((dados) =>{
                if(dados != undefined){
                    res.render('userEjs/editPubli',{
                        dadosPegos: dados
                    })
                }else{
                    res.redirect('/paginasBase/homePage')                    
                }
            })
    }

})

module.exports = router