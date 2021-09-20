/* eslint-disable react-hooks/exhaustive-deps */
import { BiHide } from 'react-icons/bi';
import { Navigation } from '../navigation';
import { Post } from './Post';

import { useAppSelector, useAppDispatch } from '../../hook/useRedux';
import { findPost, findPostAfter, findPostBefore, getPost, setDismissAllPost } from '../../redux/slice/postsSlice';
import { getViewType } from '../../redux/slice/viewTypeSlice';
import { useEffect, useState } from 'react';
import { PostList } from './PostList';

// this component is showwing all the Posts, or show the loading process
export const PopularPosts = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const postsRedux = useAppSelector(getPost);
  const viewType = useAppSelector(getViewType);

  const [isGridView, setIsGridView] = useState<boolean>(viewType === 'grid');

  const findPrevious = () => {
    dispatch(findPostBefore({ before: postsRedux.before }));
    window.scrollTo(0, 0);
  };

  const findNext = () => {
    dispatch(findPostAfter({ after: postsRedux.after }));
    window.scrollTo(0, 0);
  };

  const handlerDismissAllPost = async () => {
    const ids = postsRedux.posts.map((post) => {
      return post.id;
    });
    dispatch(setDismissAllPost({ id: ids }));

    //wait for reload the next page
    findNext();
  };

  useEffect(() => {
    postsRedux.posts.length < 1 && dispatch(findPost());
  }, []);

  useEffect(() => {
    viewType === 'grid' ? setIsGridView(true) : setIsGridView(false);
  }, [viewType]);

  return (
    <>
      <section>
        <Navigation />
        {isGridView ? (
          <div className="grid">
            {postsRedux.posts.length > 0 ? (
              <>
                {postsRedux.posts.map((post) => {
                  return <Post key={post.id} post={post} />;
                })}
              </>
            ) : (
              <Post post={undefined} />
            )}
          </div>
        ) : (
          <div className="list">
            {postsRedux.posts.length > 0 ? (
              <>
                {postsRedux.posts.map((post) => {
                  return <PostList key={post.id} post={post} />;
                })}
              </>
            ) : (
              <PostList post={undefined} />
            )}
          </div>
        )}
        <div className="paginator">
          <button onClick={findPrevious}>
            <div>Anterior</div>
          </button>
          <button onClick={findNext}>
            <div>Siguiente</div>
          </button>
        </div>
        <div className="dismiss_all">
          <button onClick={handlerDismissAllPost}>
            <BiHide />
            <span>All</span>
          </button>
        </div>
      </section>
      <style jsx>
        {`
          .grid {
            @apply md:w-8/12 w-full my-3;
          }

          .grid :global(article) {
            @apply cursor-pointer hover:border-gray-600;
          }
          .list {
            @apply w-full my-3 md:relative;
          }
          .paginator {
            @apply flex flex-row w-full justify-start items-center;
          }
          .paginator div {
            @apply text-xs w-28 px-2 bg-reddit p-3 rounded-lg text-white hover:bg-reddit-dark font-light mr-2  text-center;
          }

          .dismiss_all {
            @apply sticky float-right bottom-2 right-0 w-20 bg-reddit-dark p-2 rounded-lg text-white hover:bg-reddit font-light mr-2 text-center mb-2;
          }

          .dismiss_all button {
            @apply flex flex-row items-center justify-center text-xs w-full;
          }
          .dismiss_all span {
            @apply mr-1 text-xs;
          }
        `}
      </style>
    </>
  );
};
