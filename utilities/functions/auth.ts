'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { response } from './functions';

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

export async function createSession(user: any) {
  const expires = new Date(
    Date.now() +
      (Number(process.env.SESSION_EXPIRE) || 4 * 7 * 24 * 60 * 60 * 1000)
  );
  const session = await encrypt({ id: user._id, expires });
  cookies().set('session', session, { expires, httpOnly: true });

  return response({
    error: false,
    message: 'User authenticated',
    body: undefined,
  });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}
