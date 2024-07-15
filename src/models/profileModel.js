
const sequelize = require('sequelize')
const connection = require('../connection/connection')


const profile = connection.define('profile',{
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    date: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    country: {
        type: sequelize.STRING,
        allowNull: false
    },
    about: {
        type: sequelize.STRING,
        allowNull: false
    }
})


profile.sync({force: false})
.then(() =>{
    console.log('Profile table created')
})
.catch((error) =>{
    console.log(`error at create profile table ${error}`)
})


module.exports = profile