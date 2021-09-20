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
      ) : (
        <div onClick={handleClick}>
          <Image src={thumbnail.url} layout="fill" alt={title} className="object-contain  w-full relative" />
        </div>
      )}
    </>
  );
};
