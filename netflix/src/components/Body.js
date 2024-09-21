import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import List from './List';
import PaymentSection from './PaymentSection';
import Footer from './Footer';
import ReviewSection from './reviewSection';
import MovieRequestForm from './MovieRequestForm'; // Import the form component

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/list",
            element: <List />
        },
        {
            path: "/payment",
            element: <PaymentSection />
        },
        {
            path: "/review",
            element: <ReviewSection/>  
        },
       
        {
            path: "/form",
            element:  <MovieRequestForm />  
        },
        
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
          
          
        </div>
    );
}

export default Body;
