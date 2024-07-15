
//INSTALANDO DEPÊNDENCIAS
const express = require('express')
const app = express()
const sequelize = require('sequelize')
const bodyparser = require('body-parser')
const path = require('path');
const session = require('express-session')
const userAuth = require('./src/middlewares/authenticate')


//IMPORTANDO CONEXÃO
const connection = require('./src/connection/connection')



//IMPORTANDO MINHAS TABELAS
const recordModel = require('./src/models/recordModel')



//LÓGICA DE EXCLUSÃO DE DADOS DA TABELA RECORD PARA TESTES
function destroyData() {
    recordModel.destroy({
        where: {}
    })
    .then(() =>{
        console.log('deleted datas')
    })
    .catch((error) =>{
        console.log('error in delete datas')
    })
}



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



//USANDO 'SESSÃO' PARA ARMAZENAR DADOS DO USER
app.use(session({
    secret: 'textoqualquerparaaumentarsegurançadesessão',
    cookie: {
        maxAge: 3000000000
    }
}))



//IMPORTANDO CONTROLLERS COM ROUTER
const userController = require('./src/controllers/usersController')
const navigationController = require('./src/controllers/navigationController')
//FAZENDO EXPRESS USAR ROTAS DEFINIDAS POR ROUTER COM PREFIXO /
app.use('/', userController)
app.use('/', navigationController)



//ABRINDO SERVER
app.listen(8500, ()=>{
    console.log('Aplication working')
})