import { BiComment, BiHide, BiBookReader } from 'react-icons/bi';
import { PostType } from '../../util';
import { PostMedia } from './PostMedia';

export const Post = ({ post }: { post: PostType }) => {
  return (
    <>
      <article>
        <div className="article_header">
          <div>{post.author}</div>
          <div>{post.created}</div>
        </div>
        <div className="article_title">
          {post.title} <div className="new_post">new</div>
        </div>
        <div className="article_thumbnail">
          <PostMedia thumbnail={post.thumbnail} title={post.title} isVideo={post.is_video} videoUrl={post.videoUrl} />
        </div>
        <div className="article_footer">
          <div className="article_footer-element">
            <BiComment /> <div>{post.num_comments} Comments</div>
          </div>
          <div className="article_footer-element">
            <BiBookReader /> <div>Mark as read</div>
          </div>
          <div className="article_footer-element">
            <BiHide /> <div>Hide</div>
          </div>
        </div>
      </article>
      <style jsx>
        {`
          article {
            @apply w-full bg-white border p-5  border-gray-300 text-gray-900 rounded-md flex flex-col mb-3;
          }
          .article_header {
            @apply text-sm text-gray-500 flex flex-row;
          }
          .article_header div {
            @apply mr-2;
          }

          .article_title {
            @apply text-xl text-black my-3 flex flex-row items-center;
          }

          .new_post {
            @apply bg-reddit-light  border-reddit-dark ring-reddit-light rounded-full;
            @apply text-white text-center text-xs w-12 h-4  ml-4;
          }

          .article_thumbnail {
          }

          .article_footer {
            @apply mt-3 text-sm text-gray-500 flex flex-row;
          }

          .article_footer-element {
            @apply flex flex-row  items-center p-2 cursor-pointer;
            @apply hover:bg-gray-300  focus:border-gray-300 focus:bg-gray-300 focus:ring-gray-300 rounded-full;
          }
          .article_footer-element div {
            @apply ml-1;
          }
        `}
      </style>
    </>
  );
};
