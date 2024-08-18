

const sequelize = require('sequelize');
const publicationModel = require('../models/publicationModel');
const recordModel = require('../models/recordModel');

const defineRelation = () =>{
    recordModel.hasMany(recordModel)
    publicationModel.belongsTo(recordModel)
}

module.exports = defineRelation