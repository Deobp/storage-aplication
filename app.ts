import mongoose from 'mongoose';
import { connectDB } from './utils/db.ts';
import { User } from './models/user';
import { Tool } from './models/tool';
import { Material } from './models/material';

  try {
    await connectDB();

    console.log('Connected to MongoDB.');

    const newUser = await User.create({
      name: 'Jon Tramp',
      age: 14,
    });

    console.log('New User Created:', newUser);

    const newScrewdriver = await Tool.create({
      name: 'Screwdriver',
      amount: 2,
      cost: 20,
      usage: 'Hammering',
      borrowedBy: [],
      condition: 100,
    });

    const newHammer= await Tool.create({
      name: 'Hammer',
      amount: 3,
      cost: 32,
      usage: 'Screwing',
      borrowedBy: [],
      condition: 100,
    });

    const newWood = await Material.create({
      name: 'Wood',
      amount: 50,
      cost: 3,
      supplier: 'Wood Supplier Ltd',
      quality: 'High',
    });

    const newMetal = await Material.create({
      name: 'Metal',
      amount: 30,
      cost: 10,
      supplier: 'Metal Supplier Inc',
      quality: 'Medium',
    });

    await newUser.buildSomething({
      hammer: 1,
      screwdriver: 1,
      wood: 20,
      metal: 10,
    });

    const tools = await Tool.find({});
    console.log('All Tools:', tools);

    const materials = await Material.find({});
    console.log('All Materials:', materials);

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    mongoose.connection.close();
  }


