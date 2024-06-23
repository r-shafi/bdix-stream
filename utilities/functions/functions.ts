export const response = (
  body: any,
  error: boolean = false,
  message: string
) => {
  if (error) {
    return JSON.stringify({
      error: true,
      message: body.message || message || 'An error occurred',
      body: error,
    });
  }
  return JSON.stringify({ error: false, message: message || 'Success', body });
};
