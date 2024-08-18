
const sequelize = require('sequelize')
const connection = require('../connection/connection')

const publication = connection.define('publication', {
    UserName: {
        type: sequelize.STRING,
        allownull: false
    },
    title: {
        type: sequelize.STRING,
        allownull: false
    },
    body: {
        type: sequelize.TEXT,
        allownull: false
    }
})


publication.sync({force: false})
    .then(() =>{
        console.log('Publication table synced')
    })
    .catch((error) =>{
        console.log(`error in created publication table ${error}`)
    })

    
module.exports = publication