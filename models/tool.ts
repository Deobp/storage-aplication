import mongoose, { Schema, Document } from 'mongoose';
import {ItemInterface,  Item } from './item';

export interface ToolInterface extends  ItemInterface {
    usage: string;
    borrowedBy: string[];
    condition: number;
    useTool: (userName: string) => void;
    fixTool: () => void;
};

const toolSchema = new Schema<ToolInterface>({
    usage: {type: String, required: true, trim: true},
    borrowedBy: [{type: String}],
    condition:  {type: Number, default: 100, min: 0, max: 100},
});

toolSchema.methods.useTool = function(userName: string): void {
    if (this.condition > 15) {
        this.condition -= 10;
        this.borrowedBy.push(userName);
    } else {
        throw new Error('Not enough condition to use tool.');
    }
}

toolSchema.methods.fixTool = function(): void {
    this.condition += 20;
}

export const Tool = Item.discriminator<ToolInterface>('Tool', toolSchema);
