const {Sequelize, DataTypes, ENUM} = require('sequelize')
const db = require('../config/db_config')

const Payment = db.define(
    'Payment', {
        paymentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        regId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        amount: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
    }
)

module.exports = Payment
return Payment