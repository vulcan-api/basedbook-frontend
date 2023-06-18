import React from "react";
import classes from "./CommentList.module.css";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";


interface Comment {
  id: number;
  text: string;
  postId: number;
  parentId: number | null;
  user: {
    id: number;
    username: string;
  };
  isOwned: boolean;
  replies: { [key: number]: Comment } | null;
}


const CommentList = (props: any) => {


  if (!props.comments)
    return <p className={classes.centered}>Brak komentarzy</p>;

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className={classes.comment}>
      <div className={classes.main}>
        <div className={classes.author}>
          <div>
            <Icon.PersonCircle />
            <Link
              to={`/profile/${comment.user.id}`}
              style={{ color: "var(--main-400)" }}
            >
              {comment.user.username}
            </Link>
          </div>
          {(comment.isOwned || props.isPostOwned) && (
            <Icon.Trash
              onClick={() => props.deleteHandler(comment.id)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <p>{comment.text}</p>
        <p
          className={classes.reply}
          onClick={() => props.replyHandler(comment)}
        >
          Odpowiedz
        </p>
      </div>
      {comment.replies && (
        <>
          <p
            style={{ color: "var(--main-400)" }}
            className={classes.replyTo}
          >
            Odpowiedzi na {comment.text} :
          </p>
          <div>
            {Object.values(comment.replies).map((reply) =>
              renderComment(reply)
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={classes.comments}>
      {props.comments.map((comment: any) => renderComment(comment))}
    </div>
  );
};

export default CommentList;
