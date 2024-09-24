import mongoose, { Schema, Document } from 'mongoose';
import { Interface } from 'readline';

  export interface ItemInterface extends Document {
    name: string,
    amount: number,
    cost: number,
    worth: () => number,
    newArrival: (quantity: number) => void,
  };

  const itemSchema = new Schema<ItemInterface>({
    name: {type: String, required: true, minLength: 3, trim: true },
    amount: {type : Number, required: true, min: 0},
    cost: {type : Number, required: true, min: 0},
  });

  itemSchema.methods.worth = function(): number {
    return this.amount * this.cost;
  };

  itemSchema.methods.worth = function(quantity: number): void {
    this.amount += quantity;
  };

  export const Item = mongoose.model<ItemInterface>('Item', itemSchema);