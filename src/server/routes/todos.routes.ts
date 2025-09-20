import { Router } from 'express';
import { TodosController } from '../controllers/todos.controller';

export const todosRouter = Router();

todosRouter.get('/', TodosController.list);
todosRouter.post('/', TodosController.create);
todosRouter.patch('/:id', TodosController.patch);
todosRouter.put('/:id', TodosController.put);
todosRouter.delete('/:id', TodosController.remove);
