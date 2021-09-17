export type RedditPostType = {
  [key: string]: any;
};

export type PostType = {
  [key: string]: any;
};

export type PropsIndexType = {
  after: string;
  before: string;
  posts: any[];
};

export type ThumbnailType = {
  url: string;
  width: string;
  height: string;
};

export type PostReadAction = {
  id: string;
  read: boolean;
};

export type PostDissmisAction = {
  id: string;
};

export type PostDissmisAllAction = {
  id: string[];
};
