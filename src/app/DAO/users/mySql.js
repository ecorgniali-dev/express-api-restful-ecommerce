const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const { loggerError } = require('../../../config/log4js');
const knex = require('knex')(mySql);
const UserDTO = require('../../DTO/userDTO');

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
                table.string('foto');
            });
        }
    }

    async create(user) {
        let newUserId = await knex(this.tableName).insert(user);
        let newUser = await this.readId(newUserId[0]);
        return newUser;
    }

    async read(user = {}) {
        return await knex.from(this.tableName).select('*').where(user);
    }

    async readId(id) {
        let user = await knex.from(this.tableName).select('*').where({ id: id });
        if (user.length) {
            let userDTO = new UserDTO(user[0].id, user[0].email, user[0].password, user[0].nombre, user[0].direccion, user[0].edad, user[0].telefono, user[0].foto);
            return userDTO.ToJSON();
        } else {
            return false;
        }
    }

    async update(id, data) {
        return await knex(this.tableName).where({ id: id }).update(data);
    }

    async delete(id) {
        return await knex(this.tableName).where({ id: id }).del();
    }

}

module.exports = MySQLDao;