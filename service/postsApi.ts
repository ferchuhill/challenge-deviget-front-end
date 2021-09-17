import { PropsIndexType } from '../util';

// call the internal api to recive all the post .
export async function fetchPosts(): Promise<PropsIndexType> {
  const internalApi = process.env.INTERNAL_API || 'http://localhost:3000';
  const response = await fetch(`${internalApi}/api/getTopPost`);
  const results = await response.json();

  const data = {
    after: results.data.after || '',
    before: results.data.before || '',
    posts: results.data.posts || [],
  };

  return data;
}
