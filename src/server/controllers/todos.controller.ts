import type { Request, Response } from 'express';
import { logger } from '../logger';
import { TodosService } from '../services/todos.service';

export const TodosController = {
  async list(req: Request, res: Response) {
    try {
      const data = await TodosService.list();
      res.json(data);
    } catch (error) {
      logger.error({ err: error }, 'list todos failed');
      return res.status(503).json({ message: 'Internal Server Error' });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ message: 'invalid id' });
      }
      const data = await TodosService.get(id);

      if (!data) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      res.json(data);
    } catch (error) {
      logger.error({ err: error }, 'get todo failed');
      return res.status(503).json({ message: 'Internal Server Error' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title } = req.body ?? {};
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'title is required' });
      }
      const data = await TodosService.create({ title });
      res.json(data);
    } catch (error) {
      logger.error({ err: error }, 'create todo failed');
      return res.status(503).json({ message: 'Internal Server Error' });
    }
  },

  async patch(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ message: 'invalid id' });
      }

      const existing = await TodosService.get(id);
      if (!existing) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      const data = await TodosService.patch(id, req.body ?? {});
      res.json(data);
    } catch (error) {
      logger.error({ err: error }, 'patch todo failed');
      return res.status(503).json({ message: 'Internal Server Error' });
    }
  },

  async put(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ message: 'invalid id' });
      }

      const existing = await TodosService.get(id);
      if (!existing) {
        return res.status(404).json({ message: 'ToDo not found' });
      }
      
      const data = await TodosService.put(id, req.body ?? {});
      
      res.json(data);
    } catch (error) {
      logger.error({ err: error }, 'put todo failed');
      return res.status(503).json({ message: 'Internal Server Error' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ message: 'invalid id' });
      }

      const existing = await TodosService.get(id);
      if (!existing) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      const data = await TodosService.remove(id);
      res.json(data);
    } catch (error) {
      logger.error({ err: error }, 'remove todo failed');
      return res.status(503).json({ message: 'Internal Server Error' });
    }
  },
};
