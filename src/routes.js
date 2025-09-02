import Router from 'express'
import multer from 'multer';
import multerConfig from './config/multer'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductsController from './app/controllers/ProductsController'
import CategoryController from './app/controllers/CategoryController'
import authMiddleware from './app/middleware/auth'
import OrderController from './app/controllers/OrderController';

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserController.store);
routes.post('/Session', SessionController.store);

routes.use(authMiddleware); //todas as rotas abaixo desse middleware precisam de autenticação
routes.post('/products', upload.single('file'), ProductsController.store);
routes.get('/products', ProductsController.index);
routes.put('/products/:id', upload.single('file'), ProductsController.update);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes