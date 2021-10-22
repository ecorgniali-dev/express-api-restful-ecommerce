const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const { loggerError } = require('../../../config/log4js');
const knex = require('knex')(mySql);

let instanciaMySQL = null;

class MySQLDao extends IDao {

    constructor() {
        super();

        this.tableName = 'ordenes';
        // this.createTable(this.tableName);
    }

    static getInstance() {
        if (!instanciaMySQL) {
            instanciaMySQL = new MySQLDao();
        }

        return instanciaMySQL;
    }

}

module.exports = MySQLDao;