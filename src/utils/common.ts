import { Response } from 'express';

// Function to send success response
export const sendSuccessResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json({ success: true, data });
};

// Function to send error response
export const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ success: false, error: message });
};