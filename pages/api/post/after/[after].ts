import type { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import { parseRedditPostToPost, PostType } from '../../../../util';

type Data = {
  data: PostType | string;
  status: 'error' | 'ok';
};

// Internal api, the function is to search to the reddit api, when recive the data, is parse and return
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'GET') {
    res.status(400).json({ status: 'error', data: 'Method not support' });
  }

  const afterQuery = req.query.after;
  const { REDDIT_API } = process.env;

  let query = `?limit=10&count=10&show=true`;
  if (afterQuery) {
    query += `&after=${afterQuery}`;
  }

  const response: {
    data: {
      after: String;
      before: String;
      children: Object[];
    };
  } = await got(`${REDDIT_API}/top.json${query}`).json();

  const results: PostType = {
    after: response.data.after,
    before: response.data.before,
    posts: response.data.children.map((post) => parseRedditPostToPost(post)),
  };

  res.status(200).json({ status: 'ok', data: results });
};

export default handler;
