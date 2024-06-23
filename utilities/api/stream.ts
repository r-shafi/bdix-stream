'use server';

import { StreamModel } from '@/schemas/stream.schema';
import { response } from '../functions/functions';
import { getSession } from './actions';

export async function getStreams(type?: string) {
  try {
    const streams = await StreamModel.find(
      type ? { type } : {},
      '-__v -updatedAt'
    )
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    return response(streams);
  } catch (error) {
    console.log(error);
    return response(error, true);
  }
}

export async function createStream(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return response(undefined, true, 'Unauthorized');
  }

  const stream = {
    title: formData.get('Title') as string,
    description: formData.get('Description') as string,
    url: formData.get('URL') as string,
    type: formData.get('type') as string,
    user: session.id,
  };

  try {
    const existingStream = await StreamModel.findOne({ url: stream.url });

    if (existingStream) {
      return response(undefined, true, 'Stream already exists');
    }

    await StreamModel.create(stream);

    return response(undefined, false, 'Stream added');
  } catch (error) {
    console.log(error);
    return response(error, true);
  }
}
