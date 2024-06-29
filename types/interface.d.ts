export interface StreamLink {
  _id: string;
  user: {
    _id: string;
    username: string;
    role: 'user' | 'admin' | 'moderator';
  };
  title: string;
  description?: string;
  url: string;
  upvotes: number;
  downvotes: number;
  type: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Field {
  label: string;
  type: string;
  name: string;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
  autocomplete?: string;
  validation?: {
    minLen?: number;
    maxLen?: number;
    pattern?: RegExp;
  };
}

export interface FormProps {
  form: string;
  action: (formData: FormData) => Promise<Response>;
  buttonTitle: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface Response {
  error: boolean;
  message: string;
  body: any;
}
