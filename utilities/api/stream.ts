'use server';

import { StreamModel } from '@/schemas/stream.schema';
import { VoteModel } from '@/schemas/vote.schema';
import { revalidatePath } from 'next/cache';
import { getSession } from '../functions/auth';
import { response } from '../functions/functions';

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

export async function voteStream(id: string, vote: 'upvote' | 'downvote') {
  const session = await getSession();

  if (!session) {
    return response(undefined, true, 'You must be logged in to vote');
  }

  try {
    const stream = await StreamModel.findById(id, 'upvotes downvotes');

    if (!stream) {
      return response(undefined, true, 'Stream not found');
    }

    const existingVote = await VoteModel.findOne(
      {
        user: session.id,
        stream: id,
      },
      'type'
    );

    if (existingVote && existingVote.type === vote) {
      existingVote.type = 'removed';
      await existingVote.save();

      stream[`${vote}s`] -= 1;
      await stream.save();

      return response(undefined, false, 'Vote removed');
    }

    const newVote = await VoteModel.create({
      user: session.id,
      stream: id,
      type: vote,
    });

    vote === 'upvote' ? (stream.upvotes += 1) : (stream.downvotes += 1);
    await stream.save();

    revalidatePath('/');
    return response(undefined, false, 'Vote added');
  } catch (error) {
    console.log(error);
    return response(error, true);
  }
}
