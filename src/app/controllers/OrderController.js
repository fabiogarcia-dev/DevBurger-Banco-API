import * as Yup from 'yup'
import Order from '../schemas/Order'
import Products from '../models/Products'
import Category from '../models/Category'
import User from '../models/User'

/**O OrderController gerencia pedidos:
Criar pedido (store)
Valida produtos e quantidade
Busca produtos no banco
Formata e salva no MongoDB
Inclui usuário e status
Listar pedidos (index)
Retorna todos os pedidos
Atualizar status do pedido (update)
Apenas admins
Atualiza status de um pedido específico
Validação com Yup para entrada de dados
Controle de acesso baseado em admin
Integração Sequelize + MongoDB (produtos vêm do SQL, pedidos vão para NoSQL) */

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array().required().of(Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required(),
            }))
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { products } = request.body;

        const ProductsIds = products.map(product => product.id);

        const findProducts = await Products.findAll({
            where: {
                id: ProductsIds,
            },
            
            include: [{
               model: Category,
               as: 'category',
               attributes: ['name'], 
            }]
            
        });

        const formattedProducts = findProducts.map(product => {
            const productIndex = products.findIndex((item)=> item.id === product.id);

            const newPrduct = {
                id: product.id,
                name: product.name,
                Category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity,
            };
            
            return newPrduct;
            
        });

        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: formattedProducts,
            status: 'Pedido realizado',
        };


        const createdOrder = await Order.create(order);

        return response.status(201).json(createdOrder);
    }

    async index(request, response) {
        const orders = await Order.find();

        return response.json(orders);
    }

    async update(request, response) {
        const schema = Yup.object({
            status: Yup.string().required(),
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

        const{ id} = request.params;
        const { status } = request.body;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }

        return response.json({ message: 'Status updated sucessfully' });
    }
}



export default new OrderController();