import { useEffect, useState } from 'react';
import { ThumbnailType } from '../../util';

import disableScroll from 'disable-scroll';

import { PostImage } from './PostImage';
import { PostImageModal } from './PostImageModal';

//Encharge to recive media (video, images) from a post.
// Add the handler to show the modal and listener when click outside  of the modal,
// and have a handler to stop the scroll the the modal is showing
export const PostMedia = ({
  thumbnail,
  title,
  isVideo,
  videoUrl,
  full_imagen,
}: {
  thumbnail: ThumbnailType;
  title: string;
  isVideo: boolean;
  videoUrl?: string;
  full_imagen: ThumbnailType;
}): JSX.Element => {
  const [showFullImage, setShowFullImage] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      disableScroll.off();
    };
  });

  useEffect(() => {
    showFullImage ? disableScroll.on() : disableScroll.off();
  }, [showFullImage]);

  const handleClick = () => {
    setShowFullImage(!showFullImage);
  };

  return (
    <>
      {(isVideo || thumbnail) && (
        <div className="article_thumbnail_image">
          {isVideo ? (
            <video width="auto" height="auto" poster={thumbnail.url} autoPlay muted controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <PostImage thumbnail={thumbnail} title={title} handleClick={handleClick} />
          )}
        </div>
      )}
      {showFullImage && <PostImageModal title={title} full_imagen={full_imagen} handleClick={handleClick} />}
      <style jsx>
        {`
          video[poster] {
            @apply w-full h-full;
          }

          .article_thumbnail_image {
            @apply flex justify-center items-center max-h-96 h-96 w-full;
            @apply relative top-0 left-0 right-0;
          }
        `}
      </style>
    </>
  );
};
