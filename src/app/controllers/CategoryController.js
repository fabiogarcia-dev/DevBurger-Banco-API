/**Criar categoria (store)
Apenas admins
Evita duplicidade
Salva imagem opcional
Atualizar categoria (update)
Apenas admins
Atualiza nome e/ou imagem
Evita duplicidade
Listar categorias (index)
Retorna todas as categorias do banco
Validação com Yup para evitar dados inválidos.
Controle de acesso baseado em admin do usuário.
Respostas claras para front-end (400, 401, 201, 200). */
import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

/**Contém os métodos para gerenciar categorias:
store → criar categoria
update → atualizar categoria
index → listar todas as categorias */
class CategoryController {
    /**Valida o corpo da requisição (request.body) para garantir que o campo name exista.
abortEarly: false → retorna todos os erros de validação, não apenas o primeiro. */
    async store(request, response) { 
        const schema = Yup.object({
            name: Yup.string().required(),  
        });

         try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

            /**Verifica se o usuário logado é administrador. Apenas admins podem criar categorias.
request.userId → assumidamente obtido via middleware de autenticação. */
        const {admin: isAdmin} = await User.findByPk(request.userId);

        if(!isAdmin) {
            return response.status(401).json();
        }

        /**Pega o arquivo enviado (request.file) e o nome da categoria.
Verifica se já existe uma categoria com o mesmo nome → evita duplicidade. */
        const { filename: path } = request.file;
         
        const { name } = request.body;

         const categoryExists = await Category.findOne({      // codigo para validar se o email ja existe no banco
            where: {
                name,
            },
        });

        if (categoryExists) {
            return response.status(400).json({ error: 'Category already exists' });  //condição para mostrar o erro de duplicidade para front
        }

         const { id } = await Category.create({
            name,
            path,
        }); 

    return response.status(201).json({id, name});
}

    /**Valida o novo nome da categoria.
Verifica permissões de admin.
Confirma se a categoria com o id passado existe. */
async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),  
        });

         try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const {admin: isAdmin} = await User.findByPk(request.userId);

        if(!isAdmin) {
            return response.status(401).json();
        }

        const { id } = request.params;

        const categoryExists = await Category.findByPk(id);
        if(!categoryExists) {
            return response.status(400).json({ message: 'Make sure your category ID is correct' });
        }

        let path;
        if (request.file) {
            path = request.file.filename;
        }
         
        const { name } = request.body;

        if(name){
            const categoryNameExists = await Category.findOne({      // codigo para validar se o email ja existe no banco
                where: {
                    name,
                },
            });

        if (categoryNameExists && categoryNameExists.id != +id) {
            return response.status(400).json({ error: 'Category already exists' });  //condição para mostrar o erro de duplicidade para front
        } 

        await Category.update(
            {
                name,
                path,
            },
            {
                where: { id },
            },
        );

    return response.status(200).json();
    }
}

async index(request, response) {
    const categories = await Category.findAll();

    return response.status(200).json(categories);
}
}

export default new CategoryController();