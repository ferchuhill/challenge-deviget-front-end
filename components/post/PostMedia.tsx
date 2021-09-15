import Image from 'next/image';
import { ThumbnailType } from '../../util';

export const PostMedia = ({
  thumbnail,
  title,
  isVideo,
  videoUrl,
}: {
  thumbnail: ThumbnailType;
  title: string;
  isVideo: boolean;
  videoUrl?: string;
}) => {
  return (
    <>
      <div className="article_thumbnail_image">
        {isVideo ? (
          <video width="auto" height="auto" poster={thumbnail.url} autoPlay muted controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : thumbnail.height < thumbnail.width ? (
          <Image src={thumbnail.url} layout="fill" alt={title} />
        ) : (
          <Image
            src={thumbnail.url}
            layout="fixed"
            height={parseInt(thumbnail.height) <= 384 ? thumbnail.height : 384}
            width={thumbnail.width}
            alt={title}
          />
        )}
      </div>
      <style jsx>
        {`
          video[poster] {
            @apply w-full h-full;
          }

          .article_thumbnail_image {
            @apply flex justify-center items-center max-h-96 h-96 w-full;
            @apply relative top-0 left-0 right-0 h-96 w-full;
          }
        `}
      </style>
    </>
  );
};
