import React, { useCallback, useMemo, useRef, useState } from 'react'
import Post from '../components/Post'
import useApi from '../hooks/useApi'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PostModel } from '../types/post'

const post1 = {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
const post2 = {
  "userId": 9,
  "id": 86,
  "title": "placeat quia et porro iste",
  "body": "quasi excepturi consequatur iste autem temporibus sed molestiae beatae\net quaerat et esse ut\nvoluptatem occaecati et vel explicabo autem\nasperiores pariatur deserunt optio"
}
const post3 = {
  "userId": 9,
  "id": 85,
  "title": "dolore veritatis porro provident adipisci blanditiis et sunt",
  "body": "similique sed nisi voluptas iusto omnis\nmollitia et quo\nassumenda suscipit officia magnam sint sed tempora\nenim provident pariatur praesentium atque animi amet ratione"
}

const posts = [post1, post2, post3]

function ListPosts() {
  // const [postData, setPostData] = useState(posts)
  const { data: postsData, setData: setPostsData } = useApi('/posts', [])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  const totalTitleLength = useRef<number>(0);
  const auth = useSelector((state: any) => state.auth)
  const addPost = useCallback(() => {
    setPostsData((prevPosts: any) => {
      if (prevPosts) {
        return [...prevPosts, post1];
      }
      return [post1];
    });
    if (totalTitleLength.current != null) {
      // null, undefined
      totalTitleLength.current += post1.title.length;
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
