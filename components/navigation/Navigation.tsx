import { BiBarChartAlt2, BiListUl, BiGridVertical } from 'react-icons/bi';

import { useCallback, useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../hook/useRedux';
import { getViewType, setView } from '../../redux/slice/viewTypeSlice';
import { findPost } from '../../redux/slice/postsSlice';

// This component is use to see the diferent option in the main part,
// contains the different option to navigate
export const Navigation = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const viewTypeSelected = useAppSelector(getViewType);

  const [isGridView, setIsGridView] = useState<boolean>(viewTypeSelected === 'grid');

  const handlerClick = () => {
    setIsGridView(!isGridView);
  };

  const handlerClickGetTop = () => {
    dispatch(findPost());
  };

  const changeTypeView = useCallback(
    ({ isGrid }: { isGrid: boolean }) => {
      isGrid ? dispatch(setView({ value: 'grid' })) : dispatch(setView({ value: 'list' }));
    },
    [dispatch]
  );

  useEffect(() => {
    changeTypeView({ isGrid: isGridView });
  }, [changeTypeView, isGridView]);

  return (
    <>
      <nav>
        <button onClick={handlerClickGetTop}>
          <div className="nav_element active">
            <div>
              <BiBarChartAlt2 size={22} />
            </div>
            <div className="nav_element-label">Top</div>
          </div>
        </button>
        <button onClick={handlerClick}>
          <div className="nav_element">
            {isGridView ? (
              <>
                <div>
                  <BiListUl size={22} />
                </div>
                <div className="nav_element-label">List</div>
              </>
            ) : (
              <>
                <div>
                  <BiGridVertical size={22} />
                </div>
                <div className="nav_element-label">Grid</div>
              </>
            )}
          </div>
        </button>
      </nav>
      <style jsx>
        {`
          nav {
            @apply md:w-8/12 w-full bg-white border p-5  border-gray-300 text-gray-600 rounded-md flex flex-row  justify-between;
          }
          .nav_element {
            @apply flex flex-row text-base p-2 cursor-pointer;
            @apply hover:bg-gray-300  focus:border-gray-300 focus:bg-gray-300 focus:ring-gray-300 rounded-full;
          }

          nav button {
            @apply flex flex-row w-24 justify-center items-center;
          }

          .nav_element-label {
            @apply ml-1;
          }

          .active {
            @apply text-reddit-dark bg-gray-100  border-gray-100 ring-gray-100 rounded-full font-semibold;
          }
        `}
      </style>
    </>
  );
};
