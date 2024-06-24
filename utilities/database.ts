'use server';

import mongoose from 'mongoose';

const userModel = require('./../schemas/user.schema');
const streamModel = require('./../schemas/stream.schema');
const voteModel = require('./../schemas/vote.schema');

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE as string);
    console.log('[Database] Connected!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { databaseConnect };
