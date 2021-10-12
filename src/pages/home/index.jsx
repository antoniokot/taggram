import './style.scss';

import React, { useState } from 'react';

import logo from '../../utils/images/Taggram.svg';
import usuario from '../../utils/images/padrao.jpg';
import post from '../../utils/images/fiorde.jpg';

export default function Home() {
  return(
    <div className="home-container">
      <div className="top-bar">
        <img className="logo-img" src={logo} alt="Taggram logo" />

        <div className="profile-data">
          <span>Marcela</span>
          <img className="avatar-img" src={usuario} alt="Avatar" />
        </div>
      </div>

      <main className="post">
        <img className="post-img" src={post} alt="Post image" />

        <div className="comments">
          <div className="owner-description">
            <img className="owner-img" src={usuario} alt="User avatar" />

            <div className="owner-info">
              <span className="owner-name">Marcela</span>
              <span className="owner-location">Stara Huta, Ucrânia</span>
            </div>
          </div>

          {/* Comentários */}
        </div>
      </main>

    </div>
  );
}