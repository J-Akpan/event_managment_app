const {Sequelize, DataTypes, ENUM, hasMany} = require('sequelize')
const db = require('../config/db_config')
const Events= require('./Events')
const Venue = require('./Venues')
const Artist = require('./Artist')
const { FOREIGNKEYS } = require('sequelize/lib/query-types')

const User = db.define(
    'User', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        username: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        userType: {
            type: DataTypes.ENUM('Artist', 'Venue Owner', 'Event Organizer'),
            allowNull: false,
        },
    }
)



// Database associations
User.hasMany(Events, { foreignKey: 'userId' }); // Assuming userId is the foreign key in Events
Events.belongsTo(User, { foreignKey: 'userId' }); // Correct association

User.hasOne(Artist, { foreignKey: 'userId' }); // Assuming userId is the foreign key in Artist
Artist.belongsTo(User, { foreignKey: 'userId' }); // Correct association

User.hasOne(Venue, { foreignKey: 'userId' }); // Assuming userId is the foreign key in Venue
Venue.belongsTo(User, { foreignKey: 'userId' }); // Correct association





module.exports = User
return User