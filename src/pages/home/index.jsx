import './style.scss';

import react, { useState, useEffect } from 'react';

import api from '../../services/api';

import CommentCard from './CommentCard/index';

import logo from '../../utils/images/Taggram.svg';
import usuario from '../../utils/images/usuario_default.png';
import post from '../../utils/images/fiorde.jpg';
import tagview from '../../utils/images/tagview.svg';

export default function Home() {

  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState(null);

  useEffect(() => {
    getRandomUser();
    getRandomPost();

  }, []);

  async function getRandomUser() {
    try {
      let response = await api.get('/me');

      if(response.data) 
        setUser(response.data);

    } catch(err) {
      console.error(err);
    }
  }

  async function getRandomPost() {
    try { 
      let responseRandomUser = await api.get('/me');

      if(responseRandomUser.data) {
        try {
          let responseRandomPost = await api.get(`/post?username=${responseRandomUser.data.username}`);
          

          if(responseRandomPost.data) {
            setPost(responseRandomPost.data);

            try {
              let reponseRelated = await api.get(`/posts/${responseRandomPost.data.uuid}/related`);

              if(reponseRelated.data)
                setRelated(reponseRelated.data);

            } catch(err) {
              console.error(err);
            }
          } 
        } catch(err) {
          console.error(err);
        }
      }
    } catch(err) {
      console.error(err);
    }
  }

  return(
    <div className="home-container">
      <div className="top-bar">
        <div className="top-bar-content">
          <img className="logo-img" src={logo} alt="Taggram logo" />

          <div className="profile-data">
            <span>{user ? user.username : ""}</span>
            <img className="avatar-img" src={ user ? user.avatar ? user.avatar : usuario : usuario} alt="Avatar" />
          </div>
        </div>
      </div>

      <main className="post">
        <img className="post-img" src={post ? post.photo : ""} alt="Post image" />

        <div className="comments">
          <div className="owner-description">
            <img className="owner-img" src={post ? post.user.avatar ? post.user.avatar : usuario : usuario} alt="User avatar" />

            <div className="owner-info">
              <span className="owner-name">{post ? post.user.username : ""}</span>
              <span className="owner-location">{ post ? post.location.city + ", " + post.location.country : ""}</span>
            </div>
          </div>

          <div className="comments-area">
            {
              post ? post.comments.map(c => (
                <CommentCard
                  commentId={c.uuid}
                  username={c.user.username}
                  avatar={c.user.avatar}
                  message={c.message}
                  hasLiked={c.has_liked}
                  createdAt={c.created_at}
                  likeCount={c.like_count}
                />
              )) : null
            }
          </div>

          <div className="other-infos">
            <span className="comments-number">{post ? post.comments.length : 0} comentários</span>
            <span className="post-date">{post ? post.created_at : ""}</span>
          </div>
        </div>
      </main>

      <div className="more">
        <span>Mais publicações</span>

        <div className="more-posts">
          {
            related ? related.map(r => (
              <img className="related-img" src={r.photo} alt="Related post" />
            )) : null
          }
        </div>
      </div>

      <footer>
          <img className="tagview-logo" src={tagview} alt="Tagview's logo" />
      </footer>

    </div>
  );
}