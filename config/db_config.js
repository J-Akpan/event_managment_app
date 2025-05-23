const { Sequelize } = require('sequelize')
require('dotenv').config()

//db connectikon
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
)

const dbInstance = async () => {
    try {
        await db.authenticate()
        await db.sync({ alter: true, logging:false })
        console.log('database connection successful')

    } catch (error) {
        throw error
    }
}
dbInstance()

module.exports = db










