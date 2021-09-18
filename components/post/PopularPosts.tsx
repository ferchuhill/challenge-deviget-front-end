import { BiHide } from 'react-icons/bi';
import { Navigation } from '../navigation';
import { Post } from './Post';

import { useAppSelector, useAppDispatch } from '../../hook/useRedux';
import { findPost, getPost, setDismissAllPost } from '../../redux/slice/postsSlice';
import { getViewType } from '../../redux/slice/viewTypeSlice';
import { useEffect, useState } from 'react';
import { PostList } from './PostList';

// this component is showwing all the Posts, or show the loading process
export const PopularPosts = () => {
  const dispatch = useAppDispatch();
  const postsRedux = useAppSelector(getPost);
  const viewType = useAppSelector(getViewType);

  const [isGridView, setIsGridView] = useState<boolean>(viewType === 'grid');

  const findPrevious = () => {
    dispatch(findPost({ after: undefined, before: postsRedux.before }));
    window.scrollTo(0, 0);
  };

  const findNext = () => {
    dispatch(findPost({ after: postsRedux.after, before: undefined }));
    window.scrollTo(0, 0);
  };

  const handlerDismissAllPost = () => {
    const ids = postsRedux.posts.map((post) => {
      return post.id;
    });
    dispatch(setDismissAllPost({ id: ids }));
  };

  useEffect(() => {
    dispatch(findPost({}));
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
            {postsRedux.posts.map((post) => {
              return <PostList key={post.id} post={post} />;
            })}
          </div>
        )}
        <div className="paginator">
          <div>
            <button onClick={findPrevious}>Anterior</button>
          </div>
          <div>
            <button onClick={findNext}>Siguiente</button>
          </div>
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
          .list {
            @apply w-full my-3;
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
