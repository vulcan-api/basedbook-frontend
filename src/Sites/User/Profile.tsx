import React, { useState, useEffect, useCallback } from "react";
import classes from "./Profile.module.css";
import Button from "../../Components/Button";
import { Instagram } from "react-bootstrap-icons";
import * as Icon from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Wrapper from "../../Layout/Wrapper";
import Modal from "../../Layout/ModalComponents/Modal";
import ProjectItem from "../Project/ProjectItem";
import getUserObject from "../../Lib/getUser";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '../../Components/Avatar';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSpottedPosts, setShowSpottedPosts] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [projectId, setProjectId] = useState<any>(null);
  const [postId, setPostId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 69,
      createdAt: new Date("2023-02-06T19:21:38.727Z"),
      author: {
        name: String,
        surname: String,
        username: String,
        id: 0,
      },
      title: "Lekcja z symfony u stopiarza",
      text: "Chciałem się pochwalić że prowadziłem lekcje u stopiarza",
      isAnonymous: false,
      isLiked: false,
      likes: 69,
      username: "jajco",
      comments: 2,
    },
  ]);
  const [projects, setProjects] = useState([
    {
      id: 1,
      createdAt: new Date("2023-02-14T18:09:09.433Z"),
      title: "BusinessAssistant+",
      text: "Hej! Szukamy ludzi do przepisania naszego projektu w JS/TS",
      author: {
        name: String,
        surname: String,
        username: String,
        id: 0,
      },
      hasAlreadyApplied: true,
    },
  ]);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    class_name: "",
    profileDesc: "",
    email: "",
    Followers: 0,
    Following: 0,
    isAlreadyFollowed: true,
  });

  const loggedUser = getUserObject();

  const { userId } = useParams();

  const navigate = useNavigate();

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
    }
  }

  const like = async (id: Number) => {
    await fetch(`${process.env.REACT_APP_REQUEST_URL}/spotted/post/${id}/like`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  const unlike = async (id: Number) => {
    await fetch(`${process.env.REACT_APP_REQUEST_URL}/spotted/post/${id}/unlike`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  const getPublicInfo = useCallback(
    async function getPublicInfo() {
      setIsLoading(true);
      try {
        await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/${userId}`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode >= 400) {
              navigate("/404");
            } else {
              setUser(data);
            }
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        console.error(error);
      }
    },
    [userId, navigate]
  );

  const getUserPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/${userId}/spottedPosts`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setPosts);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [userId]);

  const getUserProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/${userId}/projects`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setProjects);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getPublicInfo();
    getUserPosts();
    getUserProjects();

  }, [getUserPosts, getUserProjects, getPublicInfo]);

  const closeModal = () => {
    setShowModal(false);
    setPostId(null);
    setProjectId(null);
  };

  const applyToProjectHandler = (post: any) => {
    let projectsCopy = [...projects];
    let index = projectsCopy.indexOf(post);
    if (projects[index].hasAlreadyApplied) {
      projects[index].hasAlreadyApplied = false;
      leaveProject(projects[index].id);
      setProjects(projectsCopy);
    } else {
      projects[index].hasAlreadyApplied = true;
      applyToProject(projects[index].id);
      setProjects(projectsCopy);
    }
  };

  async function applyToProject(id: any) {
    const applyProject = {
      projectId: id,
    };
    const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/project/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applyProject),
    });
    if (response.ok) {
      NotificationManager.success(
        "Udało się zgłosić do projektu.",
        "Sukces!",
        3000
      );
    } else {
      NotificationManager.error("Wystąpił błąd!", "Błąd!", 3000);
    }
  }
  async function leaveProject(id: any) {
    const leaveProjectObject = {
      projectId: id,
    };
    const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/project/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(leaveProjectObject),
    });
    if (!response.ok) {
      NotificationManager.error("Wystąpił błąd!", "Błąd!", 3000);
    }
  }

  const followUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/follows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: userId,
      }),
    });
    if (!response.ok) {
      NotificationManager.error("Wystąpił błąd!", "Błąd!", 3000);
    } else {
      NotificationManager.success("Wystąpił sukces!", "Sukces!", 3000);
    }
  };

  const unFollowUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/follows`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: userId,
      }),
    });
    if (!response.ok) {
      NotificationManager.error("Wystąpił błąd!", "Błąd!", 3000);
    } else {
      NotificationManager.success("Wystąpił sukces!", "Sukces!", 3000);
    }
  };

  const followHandler = () => {
    let userCopy = JSON.parse(JSON.stringify(user));
    if (user.isAlreadyFollowed) {
      userCopy.Followers -= 1;
      userCopy.isAlreadyFollowed = false;
      unFollowUser();
      setUser(userCopy);
    } else {
      userCopy.Followers += 1;
      userCopy.isAlreadyFollowed = true;
      followUser();
      setUser(userCopy);
    }
  };



  return (
    <>
      {showModal && (
        <Modal
          projectId={projectId}
          postId={postId}
          onBgClick={closeModal}
          onClose={closeModal}
          modalContent={modalContent}
          userId={userId}
        />
      )}
      {isLoading && <LoadingSpinner />}
      <div className={classes.personContainer}>
        <Avatar userId={userId ? +userId : -1} className={classes.avatar} imgClassName={classes.avImage}/>
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
            <p>{user.profileDesc}</p>
          </div>
          <div className={classes.buttonsArea}>
            {user.Followers < 1 ? (
              <p>Obserwujący: 0</p>
            ) : (
              <p
                onClick={() => {
                  setShowModal(true);
                  setModalContent("followers");
                }}
                className={classes.activeFollowing}
              >
                Obserwujący: {user.Followers}
              </p>
            )}
            {user.Following < 1 ? (
              <p>Obserwuje: 0</p>
            ) : (
              <p
                onClick={() => {
                  setShowModal(true);
                  setModalContent("following");
                }}
                className={classes.activeFollowing}
              >
                Obserwuje: {user.Following}
              </p>
            )}
            {loggedUser.id !== +userId! && (
              <Button
                className={user.isAlreadyFollowed ? "alternate" : ""}
                buttonText={user.isAlreadyFollowed ? "Obserwujesz" : "Obserwuj"}
                onClick={followHandler}
              />
            )}
            <Button
              onClick={() => {
                setModalContent("socials");
                setShowModal(true);
              }}
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
          onClick={() => setShowSpottedPosts(false)}
        />
        <Button
          buttonText="Projekty"
          className={!showSpottedPosts ? "gray" : ""}
          onClick={() => console.log(projects)}
        />
      </div>
      <div className={classes.profileContent}>
        {showSpottedPosts &&
          (projects.length < 1 ? (
            <p>Brak projektów użytkownika.</p>
          ) : (
            projects.map((project) => {
              return (
                <div key={project.id} className={classes.postWrapper}>
                  <ProjectItem
                    project={project}
                    setShowModal={setShowModal}
                    setModalProjectId={setProjectId}
                    setModalContent={setModalContent}
                    applyToProject={() => applyToProjectHandler(project)}
                  />
                </div>
              );
            })
          ))}
        {!showSpottedPosts &&
          (posts.length < 1 ? (
            <p className={classes.textCenter}>Brak postów użytkownika.</p>
          ) : (
            posts.map((post) => {
              let comments: any;
              switch (post.comments) {
                case 0:
                  comments = "Brak komentarzy";
                  break;
                case 1:
                  comments = "1 komentarz";
                  break;
                default:
                  if (post.comments.toString().slice(-1) === "1") {
                    comments = `${post.comments} komentarzy`;
                  } else if (+post.comments.toString().slice(-1) < 5) {
                    comments = `${post.comments} komentarze`;
                  } else {
                    comments = `${post.comments} komentarzy`;
                  }
                  break;
              }

              return (
                <div key={post.id} className={classes.postWrapper}>
                  <Wrapper className={classes.post}>
                    <div className={classes.topData}>
                      <div>
                        <Icon.CalendarDate />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <Icon.Clock />
                        {new Date(post.createdAt).getHours() + ":"}
                        {new Date(post.createdAt).getMinutes() < 10
                          ? "0" + new Date(post.createdAt).getMinutes()
                          : new Date(post.createdAt).getMinutes()}
                      </div>
                      {post.author.id === loggedUser.id ? (
                        <Icon.TrashFill
                          onClick={() => {
                            setShowModal(true);
                            setPostId(post.id);
                            setModalContent("delete");
                          }}
                          className={classes.report}
                        />
                      ) : (
                        <Icon.FlagFill
                          onClick={() => {
                            setShowModal(true);
                            setPostId(post.id);
                            setModalContent("report");
                          }}
                          className={classes.report}
                        />
                      )}
                    </div>
                    <div className={classes.content}>{post.text}</div>
                    <div className={classes.bottomData}>
                      <div
                        onClick={() => {
                          likeHandler(post);
                        }}
                      >
                        {post.isLiked ? (
                          <Icon.HeartFill
                            style={{ color: "var(--add1-500)" }}
                          />
                        ) : (
                          <Icon.Heart />
                        )}
                        <p
                          style={
                            post.isLiked
                              ? { color: "var(--add1-500)" }
                              : { color: "var(--main-400)" }
                          }
                        >
                          {post.likes}
                        </p>
                      </div>
                      <Link
                        to={`/spotted/post/${post.id}`}
                        className={classes.comments}
                      >
                        <Icon.ChatLeftTextFill />
                        <p style={{ color: "var(--main-400)" }}>{comments}</p>
                      </Link>
                    </div>
                  </Wrapper>
                </div>
              );
            })
          ))}
      </div>
    </>
  );
};

export default Profile;
