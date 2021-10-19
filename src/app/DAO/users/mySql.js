const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const { loggerError } = require('../../../config/log4js');
const knex = require('knex')(mySql);

let instanciaMySQL = null;

class MySQLDao extends IDao {

    constructor() {
        super();

        this.tableName = 'usuarios';
        this.createTable(this.tableName);
    }

    static getInstance() {
        if (!instanciaMySQL) {
            instanciaMySQL = new MySQLDao();
        }

        return instanciaMySQL;
    }

    async createTable(tableName) {
        const exists = await knex.schema.hasTable(tableName);
        if (!exists) {
            return await knex.schema.createTable(tableName, table => {
                table.increments('id');
                table.string('email').unique().notNullable();
                table.string('password').notNullable();
                table.string('nombre').notNullable();
                table.string('direccion').notNullable();
                table.integer('edad').unsigned().notNullable();
                table.string('telefono').notNullable();
                table.string('foto').notNullable();
            });
        }
    }

    async create(user) {
        return await knex(this.tableName).insert(user);
    }

    async read(user) {
        return await knex.from(this.tableName).select('*').where(user);
    }

    async readId(id) {
        return await knex.from(this.tableName).select('*').where({ id: id });
    }

    async update(id, data) {
        return await knex(this.tableName).where({ id: id }).update(data);
    }

    async delete(id) {
        return await knex(this.tableName).where({ id: id }).del();
    }

}

module.exports = MySQLDao;