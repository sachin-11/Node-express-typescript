import mongoose, { Document, Schema } from 'mongoose';

export interface Item extends Document {
  name: string;
  description: string;
}

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const ItemModel = mongoose.model<Item>('Item', ItemSchema);