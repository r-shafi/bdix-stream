'use server';

import { StreamModel } from '@/schemas/stream.schema';
import { VoteModel } from '@/schemas/vote.schema';
import { revalidatePath } from 'next/cache';
import { getSession } from '../functions/auth';
import { response } from '../functions/functions';

export async function getStreams(type?: string, hours?: number) {
  try {
    let query: any = {};

    if (type) {
      if (type === 'sports') {
        query.type = { $in: ['cricket', 'football'] };
      } else {
        query.type = { $in: ['entertainment', 'news'] };
      }
    }

    if (hours) {
      query.createdAt = {
        $gte: new Date(Date.now() - hours * 60 * 60 * 1000),
      };
    }

    const streams = await StreamModel.find(query, '-__v -updatedAt')
      .populate('user', 'username role')
      .sort({
        ...(hours && {
          upvotes: -1,
        }),
        createdAt: -1,
      });

    return response({ body: streams });
  } catch (error) {
    console.log(error);
    return response({ error: true, body: error });
  }
}

export async function createStream(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return response({
      error: true,
      body: undefined,
      message: 'You must be logged in to create a stream',
    });
  }

  const stream = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    url: formData.get('url') as string,
    type: formData.get('type') as string,
    user: session.id,
  };

  try {
    const existingStream = await StreamModel.findOne({ url: stream.url });

    if (existingStream) {
      return response({
        error: true,
        body: undefined,
        message: 'Stream already exists',
      });
    }

    await StreamModel.create(stream);

    return response({ error: false, body: undefined, message: 'Stream added' });
  } catch (error) {
    console.log(error);
    return response({ error: true, body: error });
  }
}

export async function voteStream(id: string, vote: 'upvote' | 'downvote') {
  const session = await getSession();

  if (!session) {
    return response({
      error: true,
      body: undefined,
      message: 'You must be logged in to vote',
    });
  }

  try {
    const stream = await StreamModel.findById(id, 'upvotes downvotes');

    if (!stream) {
      return response({
        error: true,
        body: undefined,
        message: 'Stream not found',
      });
    }

    const existingVote = await VoteModel.findOne(
      {
        user: session.id,
        stream: id,
      },
      'type'
    );

    if (existingVote) {
      if (existingVote.type === vote) {
        await VoteModel.findByIdAndDelete(existingVote.id);

        stream[`${vote}s`] -= 1;
        await stream.save();

        revalidatePath('/');
        return response({
          error: false,
          body: undefined,
          message: 'Vote removed',
        });
      } else {
        stream[`${existingVote.type}s`] -= 1;
        stream[`${vote}s`] += 1;
        await stream.save();

        existingVote.type = vote;
        await existingVote.save();

        revalidatePath('/');
        return response({
          error: false,
          body: undefined,
          message: 'Vote changed',
        });
      }
    }

    await VoteModel.create({
      user: session.id,
      stream: id,
      type: vote,
    });

    stream[`${vote}s`] += 1;
    await stream.save();

    revalidatePath('/');
    return response({
      error: false,
      body: undefined,
      message: 'Vote added',
    });
  } catch (error) {
    console.log(error);
    return response({ error: true, body: error });
  }
}
