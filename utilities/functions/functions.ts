import { Response } from '@/types/interface';

export const response = (payload: {
  body: any;
  error?: boolean;
  message?: string;
}): Response => {
  if (payload.error) {
    return {
      error: true,
      message: payload.message || payload.body.message || 'An error occurred',
      body: payload.body || undefined,
    };
  }

  return {
    error: false,
    message: payload.message || 'Success',
    body: payload.body,
  };
};
