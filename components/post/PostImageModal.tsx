import Image from 'next/image';

import { IcoClose } from '../icon/icoClose';
import { BiCloudDownload } from 'react-icons/bi';
import { ThumbnailType } from '../../util';
import { MouseEventHandler } from 'react';

import FileSaver from 'file-saver';

//show a modal imagen of a post, recive a full imagen
export const PostImageModal = ({
  title,
  full_imagen,
  handleClick,
}: {
  title: string;
  full_imagen: ThumbnailType;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const saveFileHandler = () => {
    FileSaver.saveAs(full_imagen.url);
  };

  return (
    <>
      <div className="modal">
        <div className="modal_content">
          <div className="modal_content_inner">
            {title}
            <div className="modal-close cursor-pointer z-50">
              <button onClick={handleClick}>
                <IcoClose width="18" height="18" />
              </button>
            </div>
          </div>
          <div className=" model_content_image ">
            <div className=" model_content_image_wrapper">
              <Image src={full_imagen.url} layout="fill" alt={title} className="object-contain  w-full relative" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button className="modal_action" onClick={saveFileHandler}>
              <BiCloudDownload /> <span>Download</span>
            </button>
            <button onClick={handleClick} className="modal_close ">
              Close
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            @apply fixed top-0 left-0 h-screen w-screen z-50 bg-gray-50 bg-opacity-90 overflow-hidden;
          }
          .modal_content {
            @apply bg-white  text-left py-4 px-6 md:m-10 md:w-11/12 w-full shadow;
          }

          .modal_content_inner {
            @apply flex justify-between items-center pb-3;
          }

          .model_content_image {
            @apply flex justify-center items-center w-full overflow-y-auto;
          }

          .model_content_image_wrapper {
            @apply relative w-full h-96 top-0 left-0 right-0 object-contain;
          }

          .modal_action {
            @apply px-4 bg-transparent p-3 rounded-lg text-reddit hover:bg-gray-100 hover:text-reddit-dark mr-2 flex flex-row justify-center items-center;
          }

          .modal_action span {
            @apply ml-1;
          }

          .modal_close {
            @apply px-4 bg-reddit p-3 rounded-lg text-white hover:bg-reddit-dark;
          }
        `}
      </style>
    </>
  );
};
