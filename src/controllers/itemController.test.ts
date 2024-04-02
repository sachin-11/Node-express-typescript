import { Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';
import * as itemController from './itemController';
import { ItemModel } from '../models/ItemModel';
import { sendSuccessResponse, sendErrorResponse } from '../utils/common';

jest.mock('../models/ItemModel');
jest.mock('../utils/common');

describe('Item Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllItems', () => {
    it('should return all items', async () => {
      const items = [{ _id: '1', name: 'Item 1', description: 'Description 1' }];
      mocked(ItemModel.find).mockResolvedValue(items);

      await itemController.getAllItems(req as Request, res as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(res as Response, 201, items);
    });

    it('should handle error when fetching items', async () => {
      const error = new Error('Database error');
      mocked(ItemModel.find).mockRejectedValue(error);

      await itemController.getAllItems(req as Request, res as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(res as Response, 500, error.message);
    });
  });

  describe('getItemById', () => {
    it('should return item by ID', async () => {
      const itemId = '1';
      const item = { _id: itemId, name: 'Item 1', description: 'Description 1' };
      req.params = { id: itemId };
      mocked(ItemModel.findById).mockResolvedValue(item);

      await itemController.getItemById(req as Request, res as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(res as Response, 200, item);
    });

    it('should handle not found error', async () => {
      const itemId = '1';
      req.params = { id: itemId };
      mocked(ItemModel.findById).mockResolvedValue(null);

      await itemController.getItemById(req as Request, res as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(res as Response, 404, 'Item not found');
    });

    it('should handle error when fetching item by ID', async () => {
      const itemId = '1';
      const error = new Error('Database error');
      req.params = { id: itemId };
      mocked(ItemModel.findById).mockRejectedValue(error);

      await itemController.getItemById(req as Request, res as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(res as Response, 500, error.message);
    });
  });

  // Add similar tests for createItem, updateItem, and deleteItem endpoints
});
