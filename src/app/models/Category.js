import { Sequelize, Model } from "sequelize";

/**O modelo Category faz o seguinte
Representa a tabela de categorias no banco.
Armazena nome e caminho do arquivo.
Cria um campo virtual url que gera a URL completa da imagem da categoria.
Pode ser usado em consultas Sequelize (findAll, create, update, etc). */

class Category extends Model {
    static init(sequelize){
        super.init(
            {
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url:{
                type: Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:3001/categories-file/${this.path}`;
                }
            }
            },       
        {
            sequelize,
        }
    );

    return this;

    }  
    
}

export default Category;