import jwt from 'jsonwebtoken'
import autConfig from '../../config/auth.js';

/**O authMiddleware garante que apenas usuários autenticados possam acessar certas rotas:
Verifica se o token foi enviado (Authorization header).
Extrai o token do formato Bearer <token>.
Valida o token usando o segredo JWT.
Adiciona userId e userName ao objeto request para uso nas rotas.
Retorna erro 401 se o token não existir ou for inválido.
Permite o acesso se o token for válido. */

function authMiddleware(request, response, next) {
   const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const token = authToken.split(' ').at(1);

    try{
        jwt.verify(token, autConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error(); 
            }
            request.userId = decoded.id;
            request.userName = decoded.name;

        });
    } catch {
        return response.status(401).json({ error: 'Token invalid' });
    }
    
    return next();
}

export default authMiddleware;





// mapa de estrutura da aplicação 
// request -> middleware -> controller -> model -> database -> response