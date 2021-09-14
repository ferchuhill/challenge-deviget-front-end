import { Navigation } from '../navigation';
import { Post } from './Post';

export const PopularPosts = () => {
  return (
    <>
      <section>
        <Navigation />
        <div className="posts">
          <Post />
          <Post />
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
