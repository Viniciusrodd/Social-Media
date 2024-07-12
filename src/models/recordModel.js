

const sequelize = require('sequelize')
const connection = require('../connection/connection')

const record = connection.define('record',{
    fullName: {
        type: sequelize.STRING,
        allownull: false
    },
    userName: {
        type: sequelize.STRING,
        allownull: false
    },
    email: {
        type: sequelize.STRING,
        allownull: false
    },
    password: {
        type: sequelize.STRING,
        allownull: false
    }
})

record.sync({force: false})
    .then(() =>{
        console.log('Record table synced')
    })
    .catch((error) =>{
        console.log('the connection with Record table going wrong ${error}')
    })

module.exports = record