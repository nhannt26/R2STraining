/** @format */

import {
  useState,
  useCallback,
  useRef,
  lazy,
  Suspense,
  useMemo,
  useEffect,
} from 'react';
import { debounce } from 'lodash'; //
import { PostModel } from './../types/post';
import { Navigate } from 'react-router-dom';
import Input from './../components/Input';
import { useFetchPosts } from './../hooks/useFetchPosts';

const Post = lazy(() => import('../components/Post'));
/**
 * How useMemo works:
 * const compute = () => {
  let i = 0;
  let total = 0;
  while (i < 1000000000) {
    total += i;
    i++;
  }
  return total;
};
 */

function ListPosts() {
  const [count, setCount] = useState(0); // asynchronous  (batch update)
  const [time, setTime] = useState(0);
  const [searchText, setSearchText] = useState('');

  const totalTitleLength = useRef<number>(0); // ref

  const { isLoggedIn, postIds, postsData, userData, isLoading } =
    useFetchPosts();

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

  const handleIncrease = useCallback(() => {
    // re-render 1 time: batchupdate
    setCount(count + 1); // count 1: 2
    setCount((prevCount) => prevCount + 1); // count 3
    setTime(time + Date.now());
  }, [count, time, setCount, setTime]);

  const debounceSearch = useMemo(() => {
    return debounce(setSearchText, 300);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchText) return postIds;
    return postIds.filter((id: PostModel['id']) => {
      const title = postsData[id].title;
      return title.includes(searchText);
    });
  }, [postsData, postIds, searchText]);

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  if (!isLoggedIn) {
    return <Navigate to='/login' replace={true} />;
  }

  if (postIds.length === 0 && isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={addPost}>Add post</button>
      <Input label='Search' onChange={debounceSearch} />
      <Suspense fallback={<p>Loading list ...</p>}>
        {searchResults.map((id: PostModel['id']) => {
          const post = postsData[id];
          const postWithUser = post
            ? { ...post, name: userData[post.userId].name }
            : null;
          return postWithUser ? (
            <Post
              key={postWithUser.id} // 1, 2, 3 1,
              post={postWithUser}
            />
          ) : null;
        })}
      </Suspense>
    </>
  );
}

export default ListPosts;

// Challenge 16:
/**
 * 1. debounce
 * 2. custom hook for search function
 */
