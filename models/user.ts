import mongoose, { Schema, Document } from 'mongoose';
import { Tool } from './tool';
import { Material } from './material';

export interface UserInterface extends Document {
    name: string;
    age: number;
    usedItems: string[];
    useItem: (item: string) => void;
    buildSomething: (consumables: any) => void;
}

const userSchema = new Schema<UserInterface>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    usedItems: [{ type: String }],
})

userSchema.methods.useItem = function (item: string): void {
    this.usedItems.push(item);
  };
  
  userSchema.methods.buildSomething = async function (consumables: { [key: string]: number }): Promise<void> {
    try {
      for (const [item, amount] of Object.entries(consumables)) {
        const tool = await Tool.findOne({ name: item });
        const material = await Material.findOne({ name: item });
  
        if (tool) {
          if (tool.condition > 15) {
            tool.condition -= 10;
            await tool.save();
            this.usedTools.push(tool._id);
          } else {
            console.log(`not enough condition of ${item}.`);
          }
        } else if (material) {
          if (material.amount >= amount) {
            material.amount -= amount;
            await material.save();
          } else {
            console.log(`Not enough of material: ${item}. Available: ${material.amount}, required: ${amount}`);
          }
        } else {
          console.log(`${item} not found in tools or materials.`);
        }
      }
  
      await this.save();
  
    } catch (error) {
      console.error('Error in buildSomething:', error);
    }
  }

  export const User = mongoose.model<UserInterface>('User', userSchema);
