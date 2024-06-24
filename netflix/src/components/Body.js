import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';

const ErrorBoundary = ({ error }) => {
  return <div>Error: {error.message}</div>;
};

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorBoundary />
    },
    {
      path: '/browse',
      element: <Browse />,
      errorElement: <ErrorBoundary />
    }
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;
