import './style.scss';

import react, { useState, useEffect } from 'react';

import useModal from '../../../hooks/useModal';

import api from '../../../services/api';

import usuario from '../../../utils/images/usuario_default.png';
import like from '../../../utils/images/like.svg';
import dislike from '../../../utils/images/dislike.svg';

export default function CommentCard(props) {

  const { successModal, errorModal } = useModal();
  const [liked, setLiked] = useState(props.hasLiked);

  function handleLike() {
    if(!liked)
      addLike();
    else
      removeLike();
  }

  async function addLike() {
    try {
      await api.post(`/comments/${props.commentId}/like`, { username: props.username });
      setLiked(!liked);

    } catch(err) {
      errorModal("Não foi possível curtir comentário, tente novamente");
    }
  }

  async function removeLike() {
    try {
      await api.post(`/comments/${props.commentId}/unlike`, { username: props.username });
      setLiked(!liked);

    } catch(err) {
      errorModal("Não foi possível descurtir comentário, tente novamente");
    }
  }

  // Além de retornar a data de criação, valida para ver se a data passada não "está no futuro", um dia a frente, por exemplo
  function getCreatedAt() {

    let createdAt = props.createdAt.substring(0,10).split('-');

    let ano = createdAt[0];
    let mes = createdAt[1];
    let dia = createdAt[2];

    let now = new Date();
    let posted = new Date(ano, mes-1, dia);

    let timeDiff = now - posted;

    if(timeDiff < 0)
      return "";

    let diffDays = timeDiff / (1000 * 3600 * 24);

    if(diffDays < 1)
      return Math.floor(diffDays * 24) + "h";
    else
      return Math.floor(diffDays) + "d";
  }

  return(
    getCreatedAt() != "" ? (
      <div className="comment-container">
        <img className="comment-img" src={props.avatar ? props.avatar : usuario} alt="Comment User avatar" />

        <div className="comment-body">
          <div className="comment-content">
            <span className="comment-username">{props.username}</span>
            {props.message}
          </div>

          <div className="comment-details">
            <span className="comment-created-at">{getCreatedAt()}</span>
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
    ) : <></>
  );
}