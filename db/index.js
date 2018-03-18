const Sequelize = require('sequelize');
const Product = require('./products');
const User = require('./users');

const users = [{ name: 'dan' }, { name: 'ben' }, { name: 'ray' }];
const products = [{ name: 'foo' }, { name: 'bar' }, { name: 'bazz' }];

const sync = () => {
    return Product.sync({ force: true })
        .then(() => {
            return User.sync({ force: true })
        })
        .catch(console.error);
}

const seed = () => {
    return Promise.all(products.map(product => {
            Product.create(product);
        }))
        .then(() => {
            return Promise.all(users.map(user => {
                User.create(user);
            }))
        })
        .catch(console.error);
}

module.exports = {
    sync,
    seed,
    models: {
        Product,
        User
    }
}