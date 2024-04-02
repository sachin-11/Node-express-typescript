import express from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController';

export const router = express.Router();

router.get('/items', getAllItems);
router.get('/items/:id', getItemById);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);