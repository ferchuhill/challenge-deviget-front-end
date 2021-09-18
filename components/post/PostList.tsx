import { useState } from 'react';
import { Post } from '.';
import { PostType } from '../../util';
import { IcoClose } from '../icon/icoClose';

export const PostList = ({ post }: { post: PostType }) => {
  const [isVisiblePost, setIsVisiblePost] = useState<boolean>(false);
  const [classNameListItem, setClassNameListItem] = useState<string>('list_item');

  const handlerDismiss = () => {
    isVisiblePost ? setClassNameListItem('list_item') : setClassNameListItem('list_item showing_detail');
    setIsVisiblePost(!isVisiblePost);
  };

  return (
    <>
      <div className="list">
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
      <style jsx>
        {`
          .list {
            @apply flex flex-col md:flex-row;
          }
          .list_item,
          .list_post {
            @apply w-full md:w-1/2;
          }

          .list_item.showing_detail {
            @apply hidden md:flex;
          }

          .list_item {
            @apply bg-white border p-5  border-gray-300 text-gray-900 rounded-md flex flex-col mb-3;
            transition: transform ease-out 0.3s;
          }

          .list_post {
            @apply m-3;
          }
          .list_post div {
            @apply shadow-xl;
          }

          .list_post button {
            @apply w-6 right-10 cursor-pointer text-white text-center float-right;
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
        `}
      </style>
    </>
  );
};
