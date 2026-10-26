import express from 'express';
import * as tagController from '../controllers/tag.controller.js';

const router = express.Router();

// Define CRUD routes for tags
router.post('/', tagController.create);
router.get('/', tagController.list);
router.put('/:tagId', tagController.update);
router.delete('/:tagId', tagController.remove);

export default router;