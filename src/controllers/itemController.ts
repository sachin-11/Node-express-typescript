import { Request, Response } from 'express';
import { ItemModel, Item } from '../models/ItemModel';
import { sendSuccessResponse, sendErrorResponse } from '../utils/common';
import { itemSchema } from '../controllers/validation/itemValidation';


export const getAllItems = async (req: Request, res: Response) => {
    try {
      const items = await ItemModel.find();
      sendSuccessResponse(res, 201, items);
    } catch (error) {
      sendErrorResponse(res, 500, error instanceof Error ? error.message : 'Intervel Server Error');
    }
  };

  export const getItemById = async (req: Request, res: Response) => {
    try {
      const item = await ItemModel.findById(req.params.id);
      if (!item) {
        return sendErrorResponse(res, 404, 'Item not found');
      }
      sendSuccessResponse(res, 200, item);
    } catch (error) {
      sendErrorResponse(res, 500, error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  export const createItem = async (req: Request, res: Response) => {

    // Validate request body against Joi schema
    const { error } = itemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newItem: { name: string, description: string } = {
      name: req.body.name,
      description: req.body.description,
    };
  
    try {
      const savedItem = await ItemModel.create(newItem);
      sendSuccessResponse(res, 201, savedItem);
    } catch (error) {
      sendErrorResponse(res, 500, error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  export const updateItem = async (req: Request, res: Response) => {
    try {

       // Validate request body against Joi schema
      const { error } = itemSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const updatedItem = await ItemModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedItem) {
        return sendErrorResponse(res, 404, 'Item not found');
      }
      sendSuccessResponse(res, 200, updatedItem);
    } catch (error) {
      sendErrorResponse(res, 500, error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  export const deleteItem = async (req: Request, res: Response) => {
    try {
      const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return sendErrorResponse(res, 404, 'Item not found');
      }
      sendSuccessResponse(res, 200, { message: 'Item deleted successfully' });
    } catch (error) {
      sendErrorResponse(res, 500, error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };