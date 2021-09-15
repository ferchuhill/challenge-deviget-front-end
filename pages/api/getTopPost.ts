// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import { parseRedditPostToPost, PostType } from '../../util';

type Data = {
  data: PostType | string;
  status: 'error' | 'ok';
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'GET') {
    res.status(400).json({ status: 'error', data: 'Method not support' });
  }

  const { REDDIT_API } = process.env;

  const response: {
    data: {
      after: String;
      before: String;
      children: Object[];
    };
  } = await got(`${REDDIT_API}/top.json?count=2&show=true`).json();

  const results: PostType = {
    after: response.data.after,
    before: response.data.before,
    posts: response.data.children.map((post) => parseRedditPostToPost(post)),
  };

  res.status(200).json({ status: 'ok', data: results });
};

export default handler;
