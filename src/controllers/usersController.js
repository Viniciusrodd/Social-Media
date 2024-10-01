
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const recordModel = require('../models/recordModel')
const publicationModel = require('../models/publicationModel')
const { where } = require('sequelize')
const bcrypt = require('bcryptjs')
const userAuth = require('../middlewares/authenticate')



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
    var maleVar = req.body.radio
    var femaleVar = req.body.radio

    var campos = {
        nameVar,
        userNameVar,
        emailVar,
        passwordVar,
        maleVar,
        femaleVar,
    }

    //VERIFICAÇÕES:
    if(!campos){
        res.redirect('/cadastro?error=Insira os campos corretamente.')
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
                    email: dadosLogin.email,
                    userName: dadosLogin.userName
                }
                res.redirect('/homepage')
            }else{
                res.redirect('/login?error=Preencha os dados corretamente.')
            }
        }else{
            res.redirect('/login?error=Preencha os dados corretamente.')
        }
    })
})



//ROTA DE CRIAÇÃO DE PUBLICAÇÃO
router.post('/publications/postings', (req, res) =>{
    var titleVar = req.body.title
    var publiArea = req.body.publiBody

    if(titleVar && publiArea != undefined){
        publicationModel.create({
            title: titleVar,
            body: publiArea
        })
        .then(() =>{
            console.log('Publications data created')
            res.redirect('/homepage')
        })
        .catch((error) =>{
            console.log(`error to created publications data ${error}`)
        })
    }else{
        res.redirect('/homepage?error=Preencha todos os campos para fazer publicação.')
    }

})



//ROTA DE DELETAR PUBLICAÇÕES
router.post('/publications/delete', (req, res) =>{
    var idVar = req.body.id

    if(idVar != undefined){
        publicationModel.destroy({
            where: {
                id: idVar
            }
        })
        .then(() =>{
            res.redirect('/homepage')
        })    
        .catch(() =>{
            res.redirect('/homepage')
        })
    }
})


    
//ROTA DE EDIÇÃO DE PUBLICAÇÕES
router.post('/editprofile', (req, res) =>{
    var idVar = req.body.id;
    var titleVar = req.body.title
    var bodyPubli = req.body.publiBody

    publicationModel.update({
        title: titleVar,
        body: bodyPubli
    }, {
        where: {
            id: idVar
        }
    })
    .then(() =>{
        res.redirect('/homepage')
    })
    .catch((error) =>{
        console.log(`Update profile filed ${error}`)
    })

})



/*
ROTA PRA SALVAR PERFIL

router.post('/savingProfile', (req, res) => {
    var dateVar = req.body.date;
    var cityVar = req.body.city;
    var countryVar = req.body.country;
    var aboutVar = req.body.about;

    // Validando se todos os campos necessários estão presentes
    if (!dateVar || !cityVar || !countryVar || !aboutVar) {
        console.log("Campos obrigatórios estão faltando");
        return res.redirect('/profile'); // Redirecionar de volta para a página de perfil
    }

    // Criando o perfil no banco de dados
    profileModel.create({
        date: dateVar,
        city: cityVar,
        country: countryVar,
        about: aboutVar
    })
    .then(() => {
        console.log("Dados do perfil criados com sucesso");
        res.redirect('/homepage'); // Redirecionar para a página inicial após o sucesso
    })
    .catch((error) => {
        console.log("Erro ao criar dados do perfil:", error);
        res.redirect('/profile'); // Redirecionar de volta para a página de perfil em caso de erro
    });
});
*/



module.exports = router