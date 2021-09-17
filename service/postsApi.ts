import { PropsIndexType } from '../util';

// call the internal api to recive all the post .
export async function fetchPosts({
  after,
  before,
}: {
  after: string | undefined;
  before: string | undefined;
}): Promise<PropsIndexType> {
  const internalApi = process.env.INTERNAL_API || 'http://localhost:3000';
  let url = `${internalApi}/api/post`;

  console.log(after, before);

  if (after) {
    url += `/after/${after}`;
  }
  if (before) {
    url += `/before/${before}`;
  }
  console.log(url);
  const response = await fetch(url);
  const results = await response.json();

  const data = {
    after: results.data.after || '',
    before: results.data.before || '',
    posts: results.data.posts || [],
  };

  return data;
}
