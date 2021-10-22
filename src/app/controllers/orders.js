const daoFactory = require('../DAO/DAOFactory');
const config = require('../../config/config');

class OrderController {

    constructor() {
        this.orderDao = daoFactory.getPersistencia('orders', config.PERSISTENCIA);
    }

    async list() {
        return await this.orderDao.read();
    }

    async listId(id) {
        return await this.orderDao.readId(id);
    }

    async save(cliente, carrito) {
        return await this.orderDao.create(cliente, carrito);
    }

    async update(id, data) {
        return await this.orderDao.update(id, data);
    }

    async delete(id) {
        return await this.orderDao.delete(id);
    }

}

module.exports = new OrderController();