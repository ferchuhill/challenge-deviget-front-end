import { ReactNode } from 'react';
import { Header } from './';

// encharge to generate the layout use in the application
export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <div>{children}</div>
      </main>
      <style jsx>
        {`
          main {
            @apply mt-12 p-2 bg-gray-200;
          }
          main div {
            @apply container mx-auto;
          }
        `}
      </style>
    </>
  );
};
