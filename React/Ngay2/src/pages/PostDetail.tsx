import { useState } from "react"
import { PostModel } from "../types/post"
import { useParams } from "react-router-dom"
import useApi from "../hooks/useApi"

const PostDetail = () => {
  const { postId } = useParams() || {}
  const { data: post, setData: setPost } = useApi('/posts' + postId, null)
  if (!post) {
    return null;
  }
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  )
}

export default PostDetail