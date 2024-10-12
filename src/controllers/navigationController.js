
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
        ],
        include: [
            {
                model: recordModel,
                attributes: ['fullName', 'userName', 'image']
            }
        ]
    })
    .then((publicationData) =>{
        if(req.session.user){
            const user = req.session.user

            // Convertendo a imagem BLOB para Base64
            publicationData.forEach(publication => {
                if (publication.record && publication.record.image) {
                    // Convertendo a imagem em Base64
                    publication.record.image = publication.record.image.toString('base64');
                    // Adicionando o prefixo para a URL de dados
                    publication.record.image = `data:image/jpeg;base64,${publication.record.image}`;
                }
            });

            res.render('paginasBase/homePage',{
                dadosPublications: publicationData,
                userData: user
            })
        }else{
            res.redirect('/login?error=Preciso fazer login para acessar.')
        }  
    })
    .catch((error) =>{
        console.log(`error in get publications data`)
        res.redirect('/homepage?error=Erro ao carregar publicações.');
    })
})



//ROTA DE LOGOUT
router.get('/logout', (req, res) =>{
    req.session.user = undefined
    res.redirect('/login')
})



//ROTA DE PROFILE
router.get('/profile', userAuth, (req, res) =>{
    const user = req.session.user;

    // Buscar as publicações do usuário
    publicationModel.findAll({
        order: [['id', 'DESC']],
        where: { userId: req.session.user.id }
    })
    .then((publicationData) => {

        // Buscar dados do usuário, incluindo o campo da imagem
        recordModel.findOne({
            where: { id: user.id }  // Usando o id do usuário logado
        })
        .then((userData) => {
            // Verifique se a imagem existe antes de tentar convertê-la
            if (userData && userData.image) {
                // Convertendo a imagem em Base64
                userData.image = userData.image.toString('base64');
                // Adicionando o prefixo para a URL de dados
                userData.image = `data:image/jpeg;base64,${userData.image}`;
            }
            
            res.render('paginasBase/profile', {
                dadosRecord: userData,  // Inclui os dados completos do usuário, inclusive a imagem
                dadosPublications: publicationData
            });
        })
        .catch((error) => {
            console.error(`Erro ao buscar dados do usuário: ${error}`);
            res.redirect('/errorPage');
        });
    })
    .catch((error) => {
        console.error(`Erro ao buscar publicações: ${error}`);
        res.redirect('/errorPage');
    });
        
})



//VIEW DE EDIT PROFLE
router.get('/editPubli/:id', userAuth, (req, res) =>{
    var idVar = req.params.id

    if(isNaN(idVar)){
        res.redirect('/paginasBase/homePage')
    }else{
        publicationModel.findByPk(idVar)
            .then((dados) =>{
                if(dados != undefined){
                    res.render('userEjs/editPubli',{
                        dadosPegos: dados,
                        idPego: idVar
                    })
                }else{
                    res.redirect('/paginasBase/homePage')                    
                }
            })
    }

})

module.exports = router