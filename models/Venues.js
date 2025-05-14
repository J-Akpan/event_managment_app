const {Sequelize, DataTypes, ENUM, hasMany} = require('sequelize')
const db = require('../config/db_config')
const Events = require('./Events')
const { FOREIGNKEYS } = require('sequelize/lib/query-types')

const Venue = db.define(
    'Venue', {
        venueId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        location: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        capacity: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        amenities: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        availability: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
    }
)

Venue.hasMany(Events, {foreignKey: 'venueId'} )
// database associations
// Venue.hasMany(Events, {foreignKeys: 'eventId'})
// Events.belongsTo(Venue) 



module.exports = Venue
return Venue