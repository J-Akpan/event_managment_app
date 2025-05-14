const {Sequelize, DataTypes, ENUM} = require('sequelize')
const db = require('../config/db_config')
const Booking = require('./Bookings')
const Ticket = require('./Tickets')

const Event = db.define(
    'Event', {
        eventId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        startDate: {
            type: DataTypes.DATE, 
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE, 
            allowNull: true,
        },
        venueId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
    }
)
Event.hasMany(Booking, {foreignKey:'eventId'})
Booking.belongsTo(Event)

// Event.hasMany(Ticket, {foreignKey:'ticketId'})
// Ticket.belongsTo(Event)

module.exports = Event
return Event