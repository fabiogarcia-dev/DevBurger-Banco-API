import { Sequelize, Model } from "sequelize";

/**O modelo Product:
Representa a tabela de produtos no banco.
Possui campos físicos (name, price, path, offer) e virtual (url).
Permite gerar a URL da imagem do produto dinamicamente.
Relaciona cada produto a uma categoria com belongsTo.
Pode ser usado em consultas Sequelize (findAll, create, update, etc). */

class Product extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            path: Sequelize.STRING,
            offer: Sequelize.BOOLEAN,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:3001/products-file/${this.path}`;
                }
            }
        },        
        {
            sequelize,
        }
    );

    return this;
    
    }

    static associate(models){
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });
    }
}

export default Product;