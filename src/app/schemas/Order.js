import mongoos from "mongoose"

/**O OrderSchema define a estrutura de pedidos no MongoDB usando Mongoose.
 Cada pedido armazena informações do usuário (id e name), uma lista de produtos com detalhes como id, name, price, category, url e quantity, além de um status do pedido. 
 O schema também registra automaticamente timestamps (createdAt e updatedAt). */

const OrderSchema = new mongoos.Schema({
    user: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
    },
    products: [
        {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    },

);
export default mongoos.model('Order', OrderSchema);   