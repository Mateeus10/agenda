import { Router } from 'express';

const route = Router();

import HomeController from '../controllers/HomeController';

route.get('/', HomeController.index);

export default route;