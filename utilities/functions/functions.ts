export const response = (body: any, error?: boolean, message?: string) => {
  if (error) {
    return JSON.stringify({
      error: true,
      message: message || body.message || 'An error occurred',
      body: error,
    });
  }
  return JSON.stringify({
    error: false,
    message: message || 'Success',
    ...(body && { body }),
  });
};
