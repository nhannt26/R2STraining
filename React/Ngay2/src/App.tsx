import React from 'react';
import './App.css';
import Login from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ListPosts from './pages/ListPosts';
import PostDetail from './pages/PostDetail';

// import Post from './components/Post';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '',
        element: <ListPosts />,
      },
      {
        path: 'post/:postId',
        element: <PostDetail />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
