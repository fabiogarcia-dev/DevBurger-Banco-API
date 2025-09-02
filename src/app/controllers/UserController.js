/**
 * store => Cadastrar / Adcionar
 * index => Listar Varios
 * show => Listar apenas um
 * update => Atualzar
 * delete => Deletar 
 */
import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup'  //forma para pegar todas as funções da biblioteca mesmo sendo individual.


class UserController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório')           // Campo obrigatório
                .min(3, 'Nome deve ter no mínimo 3 letras') // Mínimo 3 caracteres
                .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome inválido — use apenas letras e espaços'),
            email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
            password: Yup.string().min(6).required('Senha é obrigatória'),
            admin: Yup.boolean(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }


        const { name, email, password, admin } = request.body;

        const userExists = await User.findOne({      // codigo para validar se o email ja existe no banco
            where: {
                email,
            },
        });

        if (userExists) {
            return response.status(409).json({ error: 'User already exists' });  //condição para mostrar o erro de duplicidade para front
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        });
        return response.status(201).json({
            id: user.id,
            name,
            email,
            admin,
        });
    }
}

export default new UserController();