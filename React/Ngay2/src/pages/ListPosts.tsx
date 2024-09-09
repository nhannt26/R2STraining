import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Post from '../components/Post'
import useApi from '../hooks/useApi'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PostModel } from '../types/post'
import { AppDispatch } from '../store'
import { fetchListPosts } from '../store/reducers/postReducer'


function ListPosts() {
  // const [postData, setPostData] = useState(posts)
  // const { data: postsData, setData: setPostsData } = useApi('/posts', [])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  const totalTitleLength = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>()
  const {auth, posts} = useSelector((state: any) => state)
  const postsData = posts.list ?? [];
  console.log(auth);
  console.log(posts);
  
  useEffect(() => {
    dispatch(fetchListPosts())
  }, [dispatch])
  const addPost = useCallback(() => {
    // setPostsData((prevPosts: any) => {
    //   if (prevPosts) {
    //     return [...prevPosts, post1];
    //   }
    //   return [post1];
    // });
    if (totalTitleLength.current != null) {
      // null, undefined
      // totalTitleLength.current += post1.title.length;
    }
  }, []);

  // const total = useMemo(() => compute(), [])

  const handleIncrease = useCallback(() => {
    // re-render 1 time: batchupdate
    setCount(count + 1); // count 1: 2
    // setCount(count + 1);
    setCount((prevCount) => prevCount + 1); // count 3
    setTime(time + Date.now());
  }, [count, time, setCount, setTime]);

  console.log('re-render LIst post count ', count);

  if (!auth.isLoggedIn) {
    return <Navigate to='/login' replace={true} />;
  }

  if (posts.loading === 'loading'){
    return <p>loading ...</p>
  }

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={addPost}>Add post</button>
      {postsData.map((post: PostModel) =>
        post ? (
          <Post
            key={post.id} // 1, 2, 3 1,
            postDetail={{ post, count: postsData.length }}
          />
        ) : null
      )}
    </>
  );
}

export default ListPosts
