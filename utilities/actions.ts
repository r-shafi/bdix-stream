'use server';

import { UserModel } from '@/schemas/user.schema';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
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
  const user = {
    username: formData.get('Username') as string,
    password: formData.get('Password') as string,
  };

  try {
    const existingUser = await UserModel.findOne(
      { username: user.username },
      'password'
    );

    if (!existingUser) {
      const hash = await bcrypt.hash(user.password, 10);
      await UserModel.create({ ...user, password: hash });
    } else {
      const match = await bcrypt.compare(user.password, existingUser.password);

      if (!match) {
        return { status: 401, body: 'Invalid password' };
      }
    }

    const expires = new Date(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    cookies().set('session', session, { expires, httpOnly: true });
  } catch (error) {
    return { status: 500, body: error };
  }
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}
