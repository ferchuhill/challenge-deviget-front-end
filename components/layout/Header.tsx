import { useAppDispatch } from '../../hook/useRedux';
import { findPost } from '../../redux/slice/postsSlice';
import { IcoLogo, IcoLogoName } from '../icon';

// The header component, tah show the logo and the name
export const Header = () => {
  const dispatch = useAppDispatch();
  const handlerClick = () => {
    dispatch(findPost());
  };

  return (
    <>
      <header>
        <div className="logo">
          <button onClick={handlerClick}>
            <IcoLogo width={32} height={32} />
            <IcoLogoName height={18} />
          </button>
        </div>
      </header>
      <style jsx>
        {`
          header {
            @apply bg-white h-12 w-screen sticky top-0 z-50;
          }
          .logo {
            @apply px-4 flex flex-row items-center h-full;
          }
          .logo button {
            @apply flex flex-row items-center;
          }
          .logo :global(svg) {
            @apply mr-2;
          }
        `}
      </style>
    </>
  );
};
