import { Router } from 'express';

const route = Router();

import tokenController from '../controllers/TokenController.js';

route.post('/', tokenController.store);

export default route;