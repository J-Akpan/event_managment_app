const {Sequelize, DataTypes, ENUM} = require('sequelize')
const db = require('../config/db_config')
const Payment = require('./Payment')

const Ticket = db.define(
    'Ticket', {
        ticketId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        eventId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        ticketType: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        quantityAvailable: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        validFrom: {
            type: DataTypes.DATE, 
            allowNull: true,
        },
        validUntil: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }
)

Ticket.hasOne(Payment, {foreignKeys: 'paymentId'})
Payment.belongsTo(Ticket) 


module.exports = Ticket
return Ticket