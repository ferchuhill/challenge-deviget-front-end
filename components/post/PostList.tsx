import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from '.';
import { PostType } from '../../util';
import { IcoClose } from '../icon/icoClose';

export const PostList = ({ post }: { post: PostType | undefined }): JSX.Element => {
  const [isVisiblePost, setIsVisiblePost] = useState<boolean>(false);
  const [classNameListItem, setClassNameListItem] = useState<string>('list_item');

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisiblePost(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  const handlerDismiss = () => {
    isVisiblePost ? setClassNameListItem('list_item') : setClassNameListItem('list_item showing_detail');
    setIsVisiblePost(!isVisiblePost);
  };

  return (
    <>
      {post ? (
        <div className="list" ref={ref}>
          <div className={classNameListItem} onClick={handlerDismiss}>
            <div className="list_item__header">
              <div>{post.author}</div>
              <div>{post.created}</div>
            </div>
            <div className="list_item_title">
              {post.title}
              {post.read === false && <div className="list_item_new_post">new</div>}
            </div>
          </div>
          <div className="list_post">
            {isVisiblePost && (
              <div>
                <button onClick={handlerDismiss}>
                  <IcoClose />
                </button>
                <Post post={post} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="skeleton">
          <div className="list_skeleton">
            <div className="list_item__header"></div>
            <div className="list_item_title"></div>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .list {
            @apply flex flex-col md:flex-row;
          }
          .list_item,
          .list_post {
            @apply w-full md:w-1/2;
            @apply transition duration-500 ease-in-out;
          }

          .list_item.showing_detail {
            @apply hidden md:flex max-h-32;
          }

          .list_item {
            @apply bg-white border p-5  border-gray-300 text-gray-900 rounded-md flex flex-col mb-3;
            transition: transform ease-out 0.3s;
          }

          .list_post {
            @apply static md:fixed md:top-20 p-0 right-0;
          }
          .list_post div {
            @apply shadow-xl md:shadow-none md:mr-12 md:mt-1;
          }

          .list_post button {
            @apply w-6 right-10 cursor-pointer text-white text-center float-right p-1;
            @apply bg-white border-reddit-dark ring-reddit-light rounded-full;
          }

          .list_item__header {
            @apply text-sm text-gray-500 flex flex-row items-end;
          }

          .list_item_title {
            @apply text-xl text-black my-3 flex flex-row items-center;
          }

          .list_item_new_post {
            @apply bg-reddit-light  border-reddit-dark ring-reddit-light rounded-full;
            @apply text-white text-center text-xs w-12 h-4  ml-4;
          }

          .skeleton {
            @apply relative overflow-hidden w-full md:w-1/2;
          }

          .list_skeleton {
            @apply flex flex-col bg-white w-full p-2;
          }

          .skeleton .list_item__header,
          .skeleton .list_item_title {
            @apply bg-gray-200 text-gray-200 h-7 rounded text-xs md:text-base;
          }

          @keyframes loading {
            0% {
              transform: skewX(-10deg) translateX(-100%);
            }
            100% {
              transform: skewX(-10deg) translateX(200%);
            }
          }
          .skeleton::before {
            @apply absolute top-0 left-0 h-full md:w-8/12 w-full;
            content: '';
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
            animation: loading 0.6s infinite;
          }
        `}
      </style>
    </>
  );
};
