import { Router } from 'express';

const route = Router();

import UserController from '../controllers/UserController.js';
import LoginRequired from '../middlewares/index.js';

// route.get('/', UserController.index);
// route.get('/:id', UserController.show);
route.post('/', UserController.store);
route.put('/:id', LoginRequired, UserController.update);
route.delete('/:id', LoginRequired, UserController.delete);

export default route;