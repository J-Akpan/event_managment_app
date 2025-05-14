const {Sequelize, DataTypes, ENUM, hasMany} = require('sequelize')
const db = require('../config/db_config')
// const Events= require('./Events')
const { FOREIGNKEYS } = require('sequelize/lib/query-types')

const Bookings = db.define(
    'Bookings', {
        bookingId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        artistId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        eventId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        paymentStatus: {
            type: DataTypes.ENUM('Not paid', 'Part payment', 'Full payment')
        },
    }
)




module.exports = Bookings
return Bookings