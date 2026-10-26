import express from 'express';
import * as snippetController from '../controllers/reply-snippet.controller.js';

const router = express.Router();

// Route to get a list (or search) snippets
router.get('/', snippetController.list);

// Route to create a new snippet
router.post('/', snippetController.create);

// Route to update a snippet
router.put('/:snippetId', snippetController.update);

// Route to delete a snippet
router.delete('/:snippetId', snippetController.remove);

export default router;