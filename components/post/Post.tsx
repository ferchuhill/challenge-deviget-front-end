import { BiComment, BiHide, BiBookReader } from 'react-icons/bi';
import { PostType } from '../../util';
import { PostMedia } from './PostMedia';

//Is show the post details, or the skeleton when is empty.
export const Post = ({ post }: { post: PostType | undefined }) => {
  return (
    <>
      {post ? (
        <article>
          <div className="article_header">
            <div>{post.author}</div>
            <div>{post.created}</div>
          </div>
          <div className="article_title">
            {post.title} <div className="new_post">new</div>
          </div>
          <div className="article_thumbnail">
            <PostMedia
              thumbnail={post.thumbnail}
              full_imagen={post.full_imagen}
              title={post.title}
              isVideo={post.is_video}
              videoUrl={post.videoUrl}
            />
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
      ) : (
        <article className="skeleton">
          <div className="article_header"></div>
          <div className="article_title"></div>
          <div className="article_thumbnail"></div>
          <div className="article_footer">
            <div className="article_footer-element"></div>
            <div className="article_footer-element"></div>
            <div className="article_footer-element"></div>
          </div>
        </article>
      )}
      <style jsx>
        {`
          article {
            @apply w-full bg-white border p-5  border-gray-300 text-gray-900 rounded-md flex flex-col mb-3;
          }
          .article_header {
            @apply text-sm text-gray-500 flex flex-row;
          }

          .article_title {
            @apply text-xl text-black my-3 flex flex-row items-center;
          }

          .new_post {
            @apply bg-reddit-light  border-reddit-dark ring-reddit-light rounded-full;
            @apply text-white text-center text-xs w-12 h-4  ml-4;
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

          .skeleton {
            @apply relative overflow-hidden;
          }

          .skeleton .article_title,
          .skeleton .article_footer-element {
            @apply bg-gray-200 text-gray-200 h-10 rounded;
          }

          .skeleton .article_footer-element {
            @apply w-10 ml-2;
          }

          .skeleton .article_thumbnail {
            @apply max-h-96 h-96 w-full bg-gray-200;
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
