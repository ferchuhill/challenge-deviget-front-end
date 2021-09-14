import { BiComment, BiHide, BiBookReader } from 'react-icons/bi';
import Image from 'next/image';

export const Post = () => {
  return (
    <>
      <article>
        <div className="article_header">
          <div>Posted by Author</div>
          <div>x hours ago</div>
        </div>
        <div className="article_title">
          Title <div className="new_post">new</div>
        </div>
        <div className="article_thumbnail">
          <div className="article_thumbnail-image">
            <Image
              src={
                'https://preview.redd.it/71w9peabkgn71.jpg?width=604&format=pjpg&auto=webp&s=7f7e79ed4c2787e92d0b3f2859c3af80c2c38972'
              }
              layout="fill"
              alt="thumbnail"
            />
          </div>
        </div>
        <div className="article_footer">
          <div className="article_footer-element">
            <BiComment /> <div>3 Comments</div>
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
          .article_thumbnail-image {
            @apply relative top-0 left-0 right-0 h-96 w-full flex justify-center items-center;
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
