
const sequelize = require('sequelize')

const connection = new sequelize('social-media', 'root', 'bravogamessempre123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection
