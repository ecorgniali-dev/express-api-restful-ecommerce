const IDao = require('../IDao');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let instaciaFileSystem = null;

class FileSystemDao extends IDao {

    constructor() {
        super();

        this.urlPath = 'src/dbFile/messages.txt';
    }

    static getInstance() {
        if (!instaciaFileSystem) {
            instaciaFileSystem = new FileSystemDao();
        }

        return instaciaFileSystem;
    }

}

module.exports = FileSystemDao;