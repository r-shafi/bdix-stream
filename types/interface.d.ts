export interface StreamLink {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  title: string;
  description: string;
  url: string;
  upvotes: number;
  downvotes: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Field {
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  options?: Option[];
}

export interface FormProps {
  fields: Field[];
  action: (formDa: FormData) => void;
  buttonTitle: string;
}

export interface Option {
  value: string;
  label: string;
}
