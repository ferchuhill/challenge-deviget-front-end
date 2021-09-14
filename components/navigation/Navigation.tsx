import { BiBarChartAlt2 } from 'react-icons/bi';

import Link from 'next/link';

export const Navigation = () => {
  return (
    <>
      <nav>
        <Link href="/">
          <div className="nav_element active">
            <div>
              <BiBarChartAlt2 size={22} />
            </div>
            <div className="nav_element-label">Top</div>
          </div>
        </Link>
      </nav>
      <style jsx>
        {`
          nav {
            @apply md:w-8/12 w-full bg-white border p-5  border-gray-300 text-gray-600 rounded-md flex flex-row;
          }
          .nav_element {
            @apply flex flex-row text-base p-2 cursor-pointer;
            @apply hover:bg-gray-300  focus:border-gray-300 focus:bg-gray-300 focus:ring-gray-300 rounded-full;
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
