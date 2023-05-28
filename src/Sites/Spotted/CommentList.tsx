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
  replies: { [key: number]: Comment } | null;
}

interface Props {
  comments?: Comment[];
}

const CommentList: React.FC<Props> = ({ comments }) => {
  if (!comments) return <p>Brak komentarzy</p>;

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className={classes.comment}>
      <div className={classes.main}>
        <div className={classes.author}>
          <Icon.PersonCircle />
          <Link to={`/profile/${comment.user.id}`} style={{color: "var(--main-400)"}}>{comment.user.username}</Link>
        </div>
        <p>{comment.text}</p>
      </div>
      {comment.replies && <p style={{color: "var(--main-400)"}} className={classes.replyTo}>
        Odpowiedź na {comment.text} :
      </p>}
      {comment.replies && (
        <div style={{ marginLeft: "2rem" }}>
          {Object.values(comment.replies).map((reply) => renderComment(reply))}
        </div>
      )}
    </div>
  );

  return <div>{comments.map((comment) => renderComment(comment))}</div>;
};

export default CommentList;
