import React from "react";

interface Comment {
  id: number;
  text: string;
  postId: number;
  parentId: number | null;
  authorId: number;
  replies: { [key: number]: Comment } | null;
}

interface Props {
  comments?: Comment[];
}

const CommentList: React.FC<Props> = ({ comments }) => {
  if (!comments) return <p>Brak komentarzy</p>;

  const renderComment = (comment: Comment) => (
    <div key={comment.id}>
      <p>{comment.text}</p>
      {comment.replies && (
        <div style={{ marginLeft: "20px" }}>
          {Object.values(comment.replies).map((reply) => renderComment(reply))}
        </div>
      )}
    </div>
  );

  return <div>{comments.map((comment) => renderComment(comment))}</div>;
};

export default CommentList;
