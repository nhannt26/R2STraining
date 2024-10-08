/** @format */
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useEditingPost, { PostModel } from '../hooks/useEditingPost';

type Props = {
  post: PostModel;
};

const Post = ({ post }: Props) => {
  const dispatch = useDispatch();
  const {
    editingField,
    changingInput,
    setEdingField,
    handleChangeInput,
    handleSave,
  } = useEditingPost(post, dispatch);

  return (
    <div>
      <Link to={'post/' + post.id}>
        <strong>{post.title}</strong>
      </Link>
      <div>
        {editingField === 'body' ? (
          <>
            <input
              data-testid='bodyInput'
              type='text'
              value={changingInput[editingField]}
              onChange={(e) => handleChangeInput(e, 'body')}
            />
            <button onClick={() => handleSave()}>Save</button>
          </>
        ) : (
          <p
            onDoubleClick={() => {
              setEdingField('body');
            }}>
            {post.body}
          </p>
        )}
      </div>
      {editingField === 'author' ? (
        <>
          <input
            type='text'
            data-testid='authorInput'
            value={changingInput[editingField]}
            onChange={(e) => handleChangeInput(e, 'author')}
          />
          <button onClick={() => handleSave()}>Save</button>
        </>
      ) : (
        post.name && (
          <i
            data-testid='author'
            onDoubleClick={() => {
              setEdingField('author');
            }}>
            Author: {post.name}
          </i>
        )
      )}
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.post.body === nextProps.post.body &&
    prevProps.post.name === nextProps.post.name
  );
};

export default memo(Post, arePropsEqual); // shallow compare

// Chanllenge: 15
/**
 * 1. Complete the editing function
 * 2. Handle Deleting function
 */
