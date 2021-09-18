import { PropsIndexType } from '../util';

// call the internal api to recive all the post .
export async function fetchPosts({
  after,
  before,
}: {
  after: string | undefined;
  before: string | undefined;
}): Promise<PropsIndexType> {
  const internalApi = process.env.NEXT_PUBLIC_INTERNAL_API;
  let url = `${internalApi}/api/post`;

  if (after) {
    url += `/after/${after}`;
  }
  if (before) {
    url += `/before/${before}`;
  }
  const response = await fetch(url);
  const results = await response.json();

  const data = {
    after: results.data.after || '',
    before: results.data.before || '',
    posts: results.data.posts || [],
  };

  return data;
}
