import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import List from './List'; // Import the List component
import PaymentSection from './PaymentSection'; // Import the PaymentSection

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
            path: "/payment",  // Add this route
            element: <PaymentSection />
        }
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;
