import mongoose, { Schema, Document } from 'mongoose';
import {ItemInterface,  Item } from './item';

export interface MaterialInterface extends ItemInterface {
    supplier: string;
    quality: string;
    use: (quantity: number) => void;
}

const materialSchema = new Schema<MaterialInterface>({
    supplier: {type: String,  required: true, trim: true, minLength: 3},
    quality: {type: String,  required: true, trim: true, minLength: 3},
})

materialSchema.methods.use = function(quantity: number): void {
    if (this.amount >= quantity) {
        this.amount -= quantity;
    } else {
        throw new Error('not enough material');
    }
}

export const Material = Item.discriminator('Material', materialSchema);