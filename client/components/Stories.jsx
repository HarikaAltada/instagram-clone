import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from "./Post";

const Stories = ({ onNewPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  useEffect(() => {
    if (onNewPost) {
      setPosts((prevPosts) => [onNewPost, ...prevPosts]);
    }
  }, [onNewPost]);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };
  return (
    <>
      <section className="main">
        <div className="wrapper">
          <div className="left-col">
            <div className="status-wrapper">
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/lamha2.jpg" alt="" />
                </div>
                <p className="username">payeeelll</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/lamha.jpg" alt="" />
                </div>
                <p className="username">naf1r_</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/lamha3.jpg" alt="" />
                </div>
                <p className="username">hassan_pial</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/dristy.jpg" alt="" />
                </div>
                <p className="username">maybedristy</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/mishkat.jpg" alt="" />
                </div>
                <p className="username">tanveer__ahamed</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/messenger.PNG" alt="" />
                </div>
                <p className="username">rima_akter_25</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/mr.jpg" alt="" />
                </div>
                <p className="username">ismail_hoss...</p>
              </div>
              <div className="status-card">
                <div className="profile-pic">
                  <img src="./img/mr.jpg" alt="" />
                </div>
                <p className="username">oh_achah...</p>
              </div>
            </div>
            <div className="all-post">
              {posts.map((post) => (
                <Post key={post._id} post={post} onDelete={handleDeletePost} />
              ))}
            </div>
          </div>

          <div className="right-col">
            <div className="profile-card">
              <div className="profile-pic">
                <img src="./img/messenger.PNG" alt="" />
              </div>
              <div>
                <p className="username">ovito_uzumaki</p>
                <p className="sub-text">Md Obidur Rahman (Ovi)</p>
              </div>
              <button className="action-btn">switch</button>
            </div>
            <p className="suggestion-text">Suggestions for you</p>
            <div className="profile-card">
              <div className="profile-pic">
                <img src="./img/mr.jpg" alt="" />
              </div>
              <div>
                <p className="username">kaiful_islam_safin</p>
                <p className="sub-text">Followed by __hasnat_ali_siddique_</p>
              </div>
              <button className="action-btn">follow</button>
            </div>
            <div className="profile-card">
              <div className="profile-pic">
                <img src="./img/cat.jpg" alt="" />
              </div>
              <div>
                <p className="username">psychedelic_pulp</p>
                <p className="sub-text">New to Instagram</p>
              </div>
              <button className="action-btn">follow</button>
            </div>
            <div className="profile-card">
              <div className="profile-pic">
                <img src="./img/pexels-ron-lach-7801149.jpg" alt="" />
              </div>
              <div>
                <p className="username">ijaj_emon_</p>
                <p className="sub-text">Followed by g.s.hasan + 2 more</p>
              </div>
              <button className="action-btn">follow</button>
            </div>
            <div className="profile-card">
              <div className="profile-pic">
                <img src="./img/pexels-kaan-5670982.jpg" alt="" />
              </div>
              <div>
                <p className="username">ku_tu_sh</p>
                <p className="sub-text">Followed by tasir.01 + 1 more</p>
              </div>
              <button className="action-btn">follow</button>
            </div>
            <div className="profile-card">
              <div className="profile-pic">
                <img src="./img/mahirkawai.jpg" alt="" />
              </div>
              <div>
                <p className="username">m_r_bhuiyan726</p>
                <p className="sub-text">Followed by md_alauddin_nepu</p>
              </div>
              <button className="action-btn">follow</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stories;
