import mongoos from "mongoose"

const OrderSchema = new mongoos.Schema({
    user: {
        id:{
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