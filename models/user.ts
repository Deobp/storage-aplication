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
      // Loop through each tool/material in the provided object
      for (const [item, amount] of Object.entries(consumables)) {
        // Check if the item is a tool or material by its name
        const tool = await Tool.findOne({ name: item });
        const material = await Material.findOne({ name: item });
  
        if (tool) {
          // If it's a tool, check if it's in good condition
          if (tool.condition > 15) {
            // Reduce the tool condition by 10
            tool.condition -= 10;
            await tool.save();
  
            // Track the tool usage by this user (add tool to user's usedTools)
            this.usedTools.push(tool._id);
  
            console.log(`Using tool: ${item}, condition reduced to ${tool.condition}`);
          } else {
            console.log(`Cannot use tool: ${item}. Condition is too poor.`);
          }
        } else if (material) {
          // If it's a material, reduce the amount in storage
          if (material.amount >= amount) {
            material.amount -= amount;
            await material.save();
  
            console.log(`Used ${amount} of material: ${item}, remaining: ${material.amount}`);
          } else {
            console.log(`Not enough of material: ${item}. Available: ${material.amount}, required: ${amount}`);
          }
        } else {
          console.log(`Item: ${item} not found in tools or materials.`);
        }
      }
  
      // After using the tools, save the user to record used tools
      await this.save();
      console.log('Building process complete and user data updated.');
  
    } catch (error) {
      console.error('Error in buildSomething:', error);
    }
  }

  export const User = mongoose.model<UserInterface>('User', userSchema);
