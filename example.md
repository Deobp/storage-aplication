import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Item model
export interface IItem extends Document {  // Extending from Document
  name: string;
  amount: number;
  cost: number;
  worth: () => number;
  newArrival: (quantity: number) => void;
}

// Define the schema for the Item model
const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
});

// Define methods for the schema
itemSchema.methods.worth = function (): number {
  return this.amount * this.cost;
};

itemSchema.methods.newArrival = function (quantity: number): void {
  this.amount += quantity;
};

// Create the model
export const Item = mongoose.model<IItem>('Item', itemSchema);
