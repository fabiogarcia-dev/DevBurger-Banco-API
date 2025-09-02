import Sequelize from 'sequelize'
import mongoose from 'mongoose';
import configDatabase from '../config/database'
import User from '../app/models/User'
import Product from '../app/models/Products'
import Category from '../app/models/Category';

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