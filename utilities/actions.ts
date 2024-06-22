'use server';

import { AnalyticsModel } from '@/schemas/analytics.schema';
import { LinkModel } from '@/schemas/link.schema';
import { UserModel } from '@/schemas/user.schema';
import { VoteModel } from '@/schemas/vote.schema';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.SECRET as string);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4 weeks')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });

  return payload;
}

export async function login(formData: FormData) {
  const username = (formData.get('Username') as string).toLowerCase();
  const password = formData.get('Password') as string;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
      });

      return createSession(newUser);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 401, body: 'Invalid password' };
    }

    return createSession(user);
  } catch (error) {
    return { status: 500, error };
  }
}

async function createSession(user: any) {
  const expires = new Date(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
  const session = await encrypt({ id: user._id, expires });
  cookies().set('session', session, { expires, httpOnly: true });

  return { status: 200, body: 'User authenticated' };
}

export async function addNewStream(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return { status: 401, body: 'Unauthorized' };
  }

  const stream = {
    title: formData.get('Title') as string,
    description: formData.get('Description') as string,
    url: formData.get('URL') as string,
    type: formData.get('type') as string,
    user: session.id,
  };

  try {
    const existingStream = await LinkModel.findOne({ url: stream.url });

    if (existingStream) {
      return { status: 409, body: 'Stream already exists' };
    }

    await LinkModel.create(stream);

    return { status: 200, body: 'Stream added' };
  } catch (error) {
    return { status: 500, body: error };
  }
}

export async function getStreams(type?: string) {
  try {
    const streams = await LinkModel.find(
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

export async function analytics() {
  try {
    const visitors = await AnalyticsModel.findOne().select('visitorCount');
    const users = await UserModel.countDocuments();
    const streams = await LinkModel.countDocuments();

    return { visitors, users, streams };
  } catch (error) {
    console.log(error);
    return { visitors: 0, users: 0, streams: 0 };
  }
}

export async function voteStream(id: string, vote: 'upvote' | 'downvote') {
  const session = await getSession();

  if (!session) {
    return { status: 401, body: 'Unauthorized' };
  }

  try {
    const stream = await LinkModel.findById(id, 'upvotes downvotes');

    if (!stream) {
      return { status: 404, body: 'Stream not found' };
    }

    const existingVote = await VoteModel.findOne(
      {
        user: session.id,
        link: id,
      },
      'type'
    );

    if (existingVote) {
      return { status: 409, body: 'Vote already exists' };
    }

    if (vote === 'upvote') {
      stream.upvotes += 1;
    } else {
      stream.downvotes += 1;
    }

    await stream.save();

    revalidatePath('/');

    return { status: 200, body: 'Vote added' };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}
