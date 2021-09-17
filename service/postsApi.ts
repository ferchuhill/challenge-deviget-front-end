import { PropsIndexType } from '../util';

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
