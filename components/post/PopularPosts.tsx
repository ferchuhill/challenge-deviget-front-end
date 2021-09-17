import { PropsIndexType } from '../../util';
import { Navigation } from '../navigation';
import { Post } from './Post';

import { useAppSelector, useAppDispatch } from '../../hook/useRedux';
import { setPosts, findPost, getPost } from '../../redux/slice/postsSlice';
import { useEffect, useState } from 'react';

// this component is showwing all the Posts, or show the loading process
export const PopularPosts = () => {
  const dispatch = useAppDispatch();
  const postsRedux = useAppSelector(getPost);

  useEffect(() => {
    dispatch(findPost());
  }, []);

  return (
    <>
      <section>
        <Navigation />
        <div className="posts">
          {postsRedux.posts.length > 0 ? (
            postsRedux.posts.map((post) => {
              return <Post key={post.id} post={post} />;
            })
          ) : (
            <Post post={undefined} />
          )}
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
