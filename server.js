
//INSTALANDO DEPÊNDENCIAS
const express = require('express')
const app = express()
const sequelize = require('sequelize')
const bodyparser = require('body-parser')


//IMPORTANDO CONEXÃO
const connection = require('./src/connection/connection')

//AUTENTICANDO CONEXÃO COM BANCO DE DADOS
connection.authenticate()
    .then(() =>{
        console.log('banco de dados social-meida conectado')
    })
    .catch((erro) =>{
        console.log(`erro ${erro}`)
    })

app.get('/', (req, res) =>{
    
})



//USANDO MIDDLEWARE BODY-PARSER
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())



//ABRINDO SERVER
app.listen(8500, ()=>{
    console.log('aplicação rodando')
})