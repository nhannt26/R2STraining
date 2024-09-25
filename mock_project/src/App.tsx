import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProductLists from './pages/ProductLists';
import Colors from './pages/Colors';

const router = createBrowserRouter([
  {
    path: '/product',
    element: <ProductLists/>
  },
  {
    path: '/color',
    element: <Colors/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
