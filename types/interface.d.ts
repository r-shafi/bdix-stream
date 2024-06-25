export interface StreamLink {
  _id: string;
  user: {
    _id: string;
    username: string;
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
}

export interface FormProps {
  fields: Field[];
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
