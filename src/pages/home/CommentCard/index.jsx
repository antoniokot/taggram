import './style.scss';

import react, { useState, useEffect } from 'react';

import api from '../../../services/api';

import usuario from '../../../utils/images/usuario_default.png';
import like from '../../../utils/images/like.svg';
import dislike from '../../../utils/images/dislike.svg';

export default function CommentCard(props) {

  const [liked, setLiked] = useState(props.hasLiked);

  function handleLike() {
    setLiked(!liked);

    if(!liked)
      addLike();
    else
      removeLike();
  }

  async function addLike() {
    try {
      await api.post(`/comments/${props.commentId}/like`);
    } catch(err) {
      console.error(err);
    }
  }

  async function removeLike() {
    try {
      await api.post(`/comments/${props.commentId}/unlike`);
    } catch(err) {
      console.error(err);
    }
  }

  return(
    <div className="comment-container">
      <img className="comment-img" src={props.avatar ? props.avatar : usuario} alt="Comment User avatar" />

      <div className="comment-body">
        <div className="comment-content">
          <span className="comment-username">{props.username}</span>
          {props.message}
        </div>

        <div className="comment-details">
          <span className="comment-created-at">{props.createdAt}</span>
          <span className="comment-likes-number">{liked ? props.likeCount + 1 : props.likeCount} curtidas</span>
        </div>
      </div>

      <img 
        className="comment-like-button" 
        src={liked ? like : dislike} 
        alt="Like button" 
        onClick={handleLike} 
      />
    </div>
  );
}