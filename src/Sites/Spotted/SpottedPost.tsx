import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../../Layout/Wrapper";
import classes from "./SpottedPost.module.css";
import * as Icon from "react-bootstrap-icons";
import Modal from "../../Layout/ModalComponents/Modal";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import CommentList from "./CommentList";

const SpottedPost = () => {
  const [post, setPost] = useState({
    id: 69,
    createdAt: new Date(""),
    author: {
      id: 4,
      username: "",
    },
    title: "",
    text: "",
    isAnonymous: false,
    isLiked: false,
    likes: 69,
    username: "",
    isOwned: true,
    comments: [
      {
        id: 1,
        text: "wew",
        postId: 8,
        parentId: null,
        user: {
          id: 7,
          username: "test",
        },
        replies: {
          2: {
            id: 2,
            text: "yes",
            postId: 8,
            parentId: 1,
            user: {
              id: 7,
              username: "test",
            },
            replies: null,
          },
        },
      },
    ],
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("report");
  const [modalPostId, setModalPostId] = useState(-100);
  const { postId = 1 } = useParams();

  const fetchPost = async (id: any) => {
    setIsLoading(true);
    setIsError(false);
    setError("");
    await fetch(`http://localhost:3000/spotted/post/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          setError("Wystąpił błąd podczas pobierania posta!");
          return;
        }
        return res.json();
      })
      .then(setPost)
      .catch((err) => {
        console.error(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  function likeHandler(postData: any) {
    let post = JSON.parse(JSON.stringify(postData));
    if (post.isLiked) {
      post.isLiked = false;
      post.likes -= 1;
      unlike();
      setPost(post);
    } else {
      post.isLiked = true;
      post.likes += 1;
      like();
      setPost(post);
    }
  }

  const like = async () => {
    await fetch(`http://localhost:3000/spotted/post/${postId}/like`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  const unlike = async () => {
    await fetch(`http://localhost:3000/spotted/post/${postId}/unlike`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isError && <h3>{error}</h3>}
      {showModal && (
        <Modal
          postId={modalPostId}
          onBgClick={closeModal}
          onClose={closeModal}
          modalContent={modalContent}
        />
      )}
      {!isLoading && !isError && (
        <div className={classes.main}>
          <div>
            <Link to="/spotted" className={classes.back}>
              <Icon.ArrowLeft />
              Powrót
            </Link>
            <Wrapper className={classes.post}>
              <div className={classes.topData}>
                {post.isAnonymous ? (
                  <div>
                    <p>{post.isAnonymous ? "Anonim" : post.author.username}</p>
                  </div>
                ) : (
                  <div>
                    <Link to={`/profile/${post.author.id}`}>
                      <Icon.PersonFill />
                      <p>
                        {post.isAnonymous ? "Anonim" : post.author.username}
                      </p>
                    </Link>
                  </div>
                )}
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
                {!post.isOwned && (
                  <Icon.FlagFill
                    onClick={() => {
                      setShowModal(true);
                      setModalPostId(post.id);
                      setModalContent("report");
                    }}
                    className={classes.report}
                  />
                )}
                {post.isOwned && (
                  <Icon.TrashFill
                    onClick={() => {
                      setShowModal(true);
                      setModalPostId(post.id);
                      setModalContent("delete");
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
          <Wrapper className={classes.comments}>
            <h2>Komentarze</h2>
            <CommentList comments={post.comments} />
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default SpottedPost;
