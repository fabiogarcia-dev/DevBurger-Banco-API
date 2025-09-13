import User from '../models/User'
import *as Yup from 'yup'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

/**O SessionController gerencia login de usuários:
Valida entrada com Yup (email e password)
Verifica se o usuário existe
Confere a senha com hash armazenado
Gera JWT com informações do usuário
Retorna dados do usuário + token para autenticação em rotas protegidas
Se qualquer passo falhar, retorna 401 Unauthorized
Facilita a autenticação segura do front-end. */

class SessionController{
    async store(request, response){
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIncorrect = () => {
            response.status(401).json({message:'Make sure your email or password are correct'});
        }
            if(!isValid){
                return emailOrPasswordIncorrect();
            }


        const {email, password} = request.body;

        const user = await User.findOne({
            where:{
                email,
            },
        });

        if(!user){
            return emailOrPasswordIncorrect();
        }

    const isSamePassword = await user.CheckPassword(password);
         if(!isSamePassword){
            return emailOrPasswordIncorrect();
        }
        
        return response.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            token:jwt.sign({id: user.id, name: user.name}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        })
    }
}

export default new SessionController();