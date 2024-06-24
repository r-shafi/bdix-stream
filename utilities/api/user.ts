'use server';
import { UserModel } from '@/schemas/user.schema';
import bcrypt from 'bcrypt';
import { createSession } from '../functions/auth';
import { response } from '../functions/functions';

export async function login(formData: FormData) {
  const username = (formData.get('username') as string).toLowerCase();
  const password = formData.get('password') as string;
  const email = formData.get('email') as string;

  try {
    if (email) {
      const user = await UserModel.findOne({ email }, '_id');

      if (user) {
        return response({
          error: true,
          message: 'User with that email already exists',
          body: undefined,
        });
      }

      const userWithUsername = await UserModel.findOne({ username }, '_id');

      if (userWithUsername) {
        return response({
          error: true,
          message: 'User with that username already exists',
          body: undefined,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      return createSession(newUser);
    } else {
      const user = await UserModel.findOne({ username }, 'password');

      if (!user) {
        return response({
          error: true,
          message: 'User not found',
          body: undefined,
        });
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
    }
  } catch (error) {
    console.log(error);
    return response({
      error: true,
      message: 'An error occurred',
      body: undefined,
    });
  }
}
