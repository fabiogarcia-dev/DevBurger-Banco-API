
/**Esse arquivo exporta as configurações de autenticação JWT, definindo um segredo (secret) 
 para gerar/verificar tokens e o tempo de expiração (expiresIn) dos tokens, que neste caso é de 5 dias. */

export default {
    secret: '975359016138b0223ab789505f7dbeca',
    expiresIn: '5d',
};