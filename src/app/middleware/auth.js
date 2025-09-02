import jwt from 'jsonwebtoken'
import autConfig from '../../config/auth.js';


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