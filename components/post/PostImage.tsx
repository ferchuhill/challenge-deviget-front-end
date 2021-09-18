import { ThumbnailType } from '../../util';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

//Show the imagen Thumbnail of a post
export const PostImage = ({
  thumbnail,
  title,
  handleClick,
}: {
  thumbnail: ThumbnailType;
  title: string;
  handleClick: MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <>
      {!thumbnail ? (
        <></>
      ) : thumbnail.height < thumbnail.width ? (
        <div onClick={handleClick}>
          <Image src={thumbnail.url} layout="fill" alt={title} />
        </div>
      ) : (
        <div onClick={handleClick}>
          <Image
            src={thumbnail.url}
            layout="fixed"
            height={parseInt(thumbnail.height) <= 384 ? thumbnail.height : 384}
            width={thumbnail.width}
            alt={title}
          />
        </div>
      )}
    </>
  );
};
