const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

let instanciaMySQL = null;

class MySQLDao extends IDao {

    constructor() {
        super();

    }

    static getInstance() {
        if (!instanciaMySQL) {
            instanciaMySQL = new MySQLDao();
        }

        return instanciaMySQL;
    }

}

module.exports = MySQLDao;