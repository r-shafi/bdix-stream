const forms = {
  loginForm: [
    {
      label: 'Username',
      type: 'text',
      required: true,
      placeholder: 'Username',
      name: 'username',
      autocomplete: 'given-name',
      validation: {
        minLen: 5,
        maxLen: 32,
        pattern: /^[a-zA-Z0-9_]+$/,
      },
    },
    {
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: '****',
      name: 'password',
      autocomplete: 'current-password',
      validation: {
        minLen: 6,
        maxLen: 32,
      },
    },
  ],
  registerForm: [
    {
      label: 'Username',
      type: 'text',
      required: true,
      placeholder: 'Username',
      name: 'username',
      autocomplete: 'given-name',
      validation: {
        minLen: 5,
        maxLen: 32,
        pattern: /^[a-zA-Z0-9_]+$/,
      },
    },
    {
      label: 'Email',
      type: 'email',
      required: false,
      placeholder: 'Email (optional)',
      name: 'email',
      autocomplete: 'email',
      validation: {
        minLen: 5,
        maxLen: 64,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    {
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: '****',
      name: 'password',
      autocomplete: 'current-password',
      validation: {
        minLen: 6,
        maxLen: 32,
      },
    },
  ],
  createStreamForm: [
    {
      label: 'Title',
      type: 'text',
      required: true,
      placeholder: 'T-Sports - Ban vs Aus',
      name: 'title',
    },
    {
      label: 'Description',
      type: 'text',
      required: false,
      name: 'description',
    },
    {
      label: 'URL',
      type: 'url',
      required: true,
      name: 'url',
    },
    {
      label: 'Stream Type',
      type: 'select',
      required: true,
      options: [
        { value: 'cricket', label: 'Cricket' },
        { value: 'football', label: 'Football' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'news', label: 'News' },
      ],
      name: 'type',
    },
  ],
} as any;

export default forms;
