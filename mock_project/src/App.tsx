import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProductLists from './pages/ProductLists';
import Colors from './pages/Colors';
import Categories from './pages/Categories';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/product',
        element: <ProductLists />
      },
      {
        path: '/category',
        element: <Categories />
      },
      {
        path: '/color',
        element: <Colors />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
