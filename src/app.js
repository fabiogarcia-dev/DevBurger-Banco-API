import express from 'express'
import routes from './routes'
import './database'
import { resolve } from 'node:path'
import cors from 'cors'

/**Essa classe App configura o servidor Express da aplicação:
Middlewares:
express.json() → permite receber requisições JSON.
cors() → habilita compartilhamento de recursos entre domínios.
express.static() → serve arquivos estáticos das pastas de upload para produtos e categorias (/products-file e /categories-file).
Rotas:
Usa as rotas definidas no arquivo routes.
Basicamente, inicializa o servidor, aplica middlewares e disponibiliza endpoints e arquivos estáticos. */

class App {
    constructor() {
        this.app = express();

        this.app.use(cors());
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')));
        this.app.use('/categories-file', express.static(resolve(__dirname, '..', 'uploads')));
    }

    

    routes() {
        this.app.use(routes);
    }
}

export default new App().app