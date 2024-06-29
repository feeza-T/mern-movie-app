// Body.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import Search from './Search';
import MovieDetail from './MovieDetail';
import List from './List';

const staticMovies = [
  {
    id: 1,
    name: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7825626_p_v8_ae.jpg',
  },
  {
    id: 2,
    name: 'Interstellar',
    description: 'In Earth\'s future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth\'s population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind\'s new home.',
    imageUrl: 'https://ebertfest.com/sites/default/files/large_lbGGuk9K1kNQqDabaMyFz1L9iTg.jpg',
  },
];

const ErrorBoundary = ({ error }) => {
  return <div>Error: {error?.message || 'An unknown error occurred'}</div>;
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
    },
    {
      path: '/search',
      element: <Search />,
      errorElement: <ErrorBoundary />
    },
    {
      path: '/movie/:id',
      element: <MovieDetail movies={staticMovies} />,
      errorElement: <ErrorBoundary />
    },
    {
      path: '/list',
      element: <List />,
      errorElement: <ErrorBoundary />
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;

