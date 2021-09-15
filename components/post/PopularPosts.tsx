import { PropsIndexType } from '../../util';
import { Navigation } from '../navigation';
import { Post } from './Post';

export const PopularPosts = ({ after, before, posts }: PropsIndexType) => {
  return (
    <>
      <section>
        <Navigation />
        <div className="posts">
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </div>
      </section>
      <style jsx>
        {`
          .posts {
            @apply md:w-8/12 w-full my-3;
          }
        `}
      </style>
    </>
  );
};
