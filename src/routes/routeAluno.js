import { Router } from 'express';

const route = Router();

import AlunoController from '../controllers/AlunoController';

//route.get('/', AlunoController.index);
route.post('/', AlunoController.store);
// route.put('/:id', AlunoController.update);
// route.delete('/:id', AlunoController.delete);

export default route;