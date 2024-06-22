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
