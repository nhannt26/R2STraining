import React from 'react'

type Props = {
  id: number,
  title: string;
  body: string;
  count: number;
  onTop:() => void
}

const Post = ({ title, body, count, id, onTop }: Props) => {
  return (
    <div>
      <p>Id: {id}</p>
      <strong>{title}</strong>
      <p>{body}</p>
      {count && <p>{count}</p>}
      <button onClick={onTop}>On Top</button>
    </div>
  )
}

export default Post