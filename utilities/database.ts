import mongoose from 'mongoose';

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
