import React, { useState } from 'react'
import Post from '../components/Post'

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
  const [postData, setPostData] = useState(posts)
  const [count, setCount] = useState(postData.length)
  const addPost = () => {
    setPostData((prePosts) => [...prePosts, post1])
  }

  const handlePostClick = (postId: number) => {
    const postIndex = posts.findIndex(post => post.id === postId);

    const newPosts = [...posts];
    const post = newPosts.splice(postIndex, 1)[0];

    newPosts.unshift(post);

    setPostData(newPosts);
  };

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={addPost}>Add post</button>
      {postData.map((post) => (
        <Post
          id={post.id}
          title={post.title}
          body={post.body}
          count={postData.length}
          onTop={() => handlePostClick(post.id)}
        />
      ))}
    </>
  );
}

export default ListPosts
