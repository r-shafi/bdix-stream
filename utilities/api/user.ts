'use server';

import bcrypt from 'bcrypt';

import { UserModel } from '@/schemas/user.schema';
import { createSession } from '../functions/auth';
import { response } from '../functions/functions';

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
      return response({
        error: true,
        message: 'Invalid password',
        body: undefined,
      });
    }

    return createSession(user);
  } catch (error) {
    console.log(error);
    return response({ error: true, body: error });
  }
}
