import { Router } from 'express';

const route = Router();

import loginRequired from '../middlewares/index.js';

import UserController from '../controllers/UserController.js';

route.get('/', loginRequired, UserController.index);
route.post('/', UserController.store);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);

export default route;