'use server';

import { StreamModel } from '@/schemas/stream.schema';

export async function getStreams(type?: string) {
  try {
    const streams = await StreamModel.find(
      type ? { type } : {},
      '-__v -updatedAt'
    )
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(streams));
  } catch (error) {
    console.log(error);
    return [];
  }
}
