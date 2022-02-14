const Sequelize = require('sequelize')

const db = new Sequelize('crudnode', 'root', '', {
   dialect: 'mysql'

})


db.sync({})
db.authenticate().then(() => console.log('berhasil terkoneksi ke db'))

module.exports = db
