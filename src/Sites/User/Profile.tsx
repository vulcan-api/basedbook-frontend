import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import turtle from "./Graphics/turtle.jpg";
import Button from "../../Components/Button";
import { Instagram } from "react-bootstrap-icons";
import * as Icon from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import getUserObject from "../../Lib/getUser";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Wrapper from "../../Layout/Wrapper";
import Modal from "../../Layout/Modal";

const Profile = () => {
  const [isSended, setIsSended] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSpottedPosts, setShowSpottedPosts] = useState(false);
  const [reportedPostId, setReportedPostId] = useState(-100);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 69,
      createdAt: new Date("2023-02-06T19:21:38.727Z"),
      authorId: 1,
      title: "Lekcja z symfony u stopiarza",
      text: "Chciałem się pochwalić że prowadziłem lekcje u stopiarza",
      isAnonymous: false,
      isLiked: false,
      likes: 69,
      username: "jajco",
    },
  ]);

  const { userId } = useParams();

  function likeHandler(post: any) {
    let postsCopy = [...posts];
    let index = postsCopy.indexOf(post);
    if (posts[index].isLiked) {
      posts[index].isLiked = false;
      posts[index].likes -= 1;
      unlike(posts[index].id);
      setPosts(postsCopy);
    } else {
      posts[index].isLiked = true;
      posts[index].likes += 1;
      like(posts[index].id);
      setPosts(postsCopy);
      NotificationManager.success("Udało się polubić post.", "Sukces!", 3000);
    }
  }

  const like = async (id: Number) => {
    await fetch(`http://localhost:3000/spotted/post/${id}/like`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  const unlike = async (id: Number) => {
    await fetch(`http://localhost:3000/spotted/post/${id}/unlike`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  async function getUserPosts() {
    setIsLoading(true);
    try {
      await fetch(`http://localhost:3000/user/${userId}/spottedPosts`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setPosts);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUserPosts();
  }, []);

  const showSpottedPostsHandler = (isShowed: Boolean) => {
    setShowSpottedPosts(!isShowed);
  };

  let user: any;
  // @ts-ignore
  user = getUserObject("user_info");

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={classes.personContainer}>
        <div className={classes.avatar}>
          <img className={classes.avImage} src={turtle} alt="" />
        </div>
        <div className={classes.managementContainer}>
          <div className={classes.detailsContainer}>
            <h2>{user.username}</h2>
            <p className={classes.ovColor}>
              {user.name +
                " " +
                user.surname +
                " " +
                (user.class_name ? user.class_name.toUpperCase() : "")}
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
              cupiditate aspernatur sunt aliquam hic placeat porro rem non
              tenetur corporis facere animi, quidem, illo recusandae libero
              odio. Iure, minus nemo!
            </p>
          </div>
          <div className={classes.buttonsArea}>
            <Button
              buttonText="Dodaj do znajomych"
              disabled={isSended}
              onClick={() => {
                setIsSended(true);
                NotificationManager.success(
                  "Udało się zaprosić użytkownika do znajomych.",
                  "Sukces!",
                  3000
                );
              }}
            />
            <Button
              buttonText={
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: ".3rem",
                  }}
                >
                  Sociale{" "}
                  <Instagram
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      paddingTop: ".3rem",
                    }}
                  />
                </span>
              }
              className="alternate"
            />
          </div>
        </div>
      </div>
      <div className={classes.creations}>
        <Button
          buttonText="Wpisy na spotted"
          className={showSpottedPosts ? "gray" : ""}
          onClick={() => showSpottedPostsHandler(true)}
        />
        <Button
          buttonText="Projekty"
          className={!showSpottedPosts ? "gray" : ""}
          onClick={() => showSpottedPostsHandler(false)}
        />
      </div>
      <div className={classes.profileContent}>
        {showModal && (
          <Modal
            postId={reportedPostId}
            onBgClick={closeModal}
            onClose={closeModal}
          />
        )}
        {!showSpottedPosts && posts.map((post) => {
          return (
            <div key={post.id} className={classes.postWrapper}>
              <Wrapper className={classes.post}>
                <div className={classes.topData}>
                  <div>
                    <Icon.PersonFill />
                    {post.isAnonymous ? "Anonim" : post.username}
                  </div>
                  <div>
                    <Icon.CalendarDate />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <Icon.Clock />
                    {new Date(post.createdAt).getHours() +
                      ":" +
                      new Date(post.createdAt).getMinutes()}
                  </div>
                  <div
                    onClick={() => {
                      setShowModal(true);
                      setReportedPostId(post.id);
                    }}
                  >
                    <Icon.FlagFill />
                  </div>
                </div>
                <div className={classes.content}>{post.text}</div>
                <div className={classes.bottomData}>
                  <div
                    onClick={() => {
                      likeHandler(post);
                    }}
                  >
                    {post.isLiked && (
                      <Icon.HeartFill style={{ color: "var(--add1-500)" }} />
                    )}
                    {!post.isLiked && <Icon.Heart />}
                    <p style={post.isLiked ? { color: "var(--add1-500)" } : {}}>
                      {post.likes}
                    </p>
                  </div>
                </div>
              </Wrapper>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;