//import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Actors from './pages/Actors';
import Actor from './pages/Actor';
import { RootLayout } from './pages/RootLayout';
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children:[
            {
                index: true,
                element:<Home />
            },
            {
                path: '/characters',
                children: [
                  {
                    index: true,
                    element: <Actors />,
                  },
                  {
                      path: ':characterId',
                      element: <Actor />,
                  },
                ]
            },
        ]
    },
    
]);
//...
ReactDOM.createRoot(document.getElementById("root")).render(
//  <React.StrictMode>
      <RouterProvider router={router} />
      alert('a')
//  </React.StrictMode>
);
//...