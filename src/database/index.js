import Sequelize from 'sequelize'
import mongoose from 'mongoose';
import configDatabase from '../config/database'
import User from '../app/models/User'
import Product from '../app/models/Products'
import Category from '../app/models/Category';

/**Essa classe Database configura as conexões com os bancos de dados da aplicação:
Banco relacional (MySQL/PostgreSQL) com Sequelize:
Inicializa a conexão usando configDatabase.
Inicializa os modelos User, Product e Category.
Configura associações entre os modelos, se existirem.
Banco NoSQL (MongoDB) com Mongoose:
Conecta ao banco devburger para armazenar dados de pedidos ou outros documentos.
Basicamente, centraliza e inicializa todas as conexões de banco da aplicação. */

const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.concection = new Sequelize(configDatabase);
        models.map((model) => model.init(this.concection)).map(model=> model.associate && model.associate(this.concection.models));
    }

    mongo(){
        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburger')
    }
}

export default new Database();