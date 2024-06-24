import { Router } from 'express';

const route = Router();

import AlunoController from '../controllers/AlunoController';
import LoginRequired from '../middlewares/index.js';

route.get('/', AlunoController.index);
route.get('/:id', AlunoController.show);
route.post('/', LoginRequired, AlunoController.store);
route.put('/:id', LoginRequired, AlunoController.update);
route.delete('/:id', LoginRequired, AlunoController.delete);

export default route;