import './style.scss';

import react, { useState } from 'react';

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

    // Verifica para ver se a data já está no formato correto
    if(props.createdAt.indexOf('h') > 0)
      return props.createdAt;

    let createdAt = new Date(props.createdAt);
    let now = new Date();

    // Calcula a diferença entre as datas
    let timeDiff = now - createdAt;

    // Se a diferença for negativa, a data de criação do comentário "está no futuro"
    if(timeDiff < 0)
      return "";

    let diffDays = timeDiff / (1000 * 3600 * 24);

    if(diffDays * 24 * 60 < 1)
      return Math.floor(diffDays * 24 * 60 * 60) + "s";
    if(diffDays * 24 < 1) 
      return Math.floor(diffDays * 24 * 60) + "m";
    if(diffDays < 1)
      return Math.floor(diffDays * 24) + "h";
    if(diffDays < 7) 
      return Math.floor(diffDays) + "d";
    else
      return Math.floor(diffDays / 7) + "w";
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