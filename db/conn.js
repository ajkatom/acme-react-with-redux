const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/users_and_products_redux_db', {
    logging: false
});


module.exports = conn;