const IDao = require('../IDao');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fsDaoProducts = require('../products/fileSystem').getInstance();

let instaciaFileSystem = null;

class FileSystemDao extends IDao {

    constructor() {
        super();

        this.urlPath = 'src/dbFile/orders.txt';
    }

    static getInstance() {
        if (!instaciaFileSystem) {
            instaciaFileSystem = new FileSystemDao();
        }

        return instaciaFileSystem;
    }

}

module.exports = FileSystemDao;