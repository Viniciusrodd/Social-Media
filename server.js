
//INSTALANDO DEPÊNDENCIAS
const express = require('express')
const app = express()
const sequelize = require('sequelize')
const bodyparser = require('body-parser')
const path = require('path');



//IMPORTANDO CONEXÃO
const connection = require('./src/connection/connection')



//IMPORTANDO MINHAS TABELAS
const recordModel = require('./src/models/recordModel')



//AUTENTICANDO CONEXÃO COM BANCO DE DADOS
connection.authenticate()
    .then(() =>{
        console.log('Data base Social-media connected')
    })
    .catch((erro) =>{
        console.log(`erro ${erro}`)
    })



//SINCRONIZANDO AS TABELAS COM BANCO DE DADOS
connection.sync({force: false})
    .then(() =>{
        console.log('Database synced')
    })
    .catch((error) =>{
        console.log('Erro de sincronização')
    })



//SETANDO EJS COMO VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'));



//USANDO PASTA PUBLIC PARA ARQUIVOS ESTÁTICOS
app.use(express.static('public'))



//USANDO MIDDLEWARE BODY-PARSER
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())



//IMPORTANDO CONTROLLERS COM ROUTER
const userController = require('./src/controllers/usersController')
//FAZENDO EXPRESS USAR ROTAS DEFINIDAS POR ROUTER COM PREFIXO /
app.use('/', userController)



//ABRINDO SERVER
app.listen(8500, ()=>{
    console.log('Aplication working')
})