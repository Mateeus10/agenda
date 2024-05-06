import { Router } from 'express';

const route = Router();

import UserController from '../controllers/UserController.js';

route.get('/', UserController.index);
route.post('/', UserController.store);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);

export default route;