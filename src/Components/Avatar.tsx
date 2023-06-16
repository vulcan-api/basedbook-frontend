import { useState, useCallback, useEffect } from 'react';
import defaultAvatar from "./Graphics/default.png";

const Avatar = (props: { userId: number; className?: any; imgClassName?: any; }) => {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);

  const getAvatarUrl = useCallback(async (): Promise<void> => {
    fetch(
      `${process.env.REACT_APP_REQUEST_URL}/user/settings/avatar/${props.userId}`,
      {
        credentials: "include",
      }
    )
      .then((res: Response) => {
        console.log(res);
        if (!res.ok) throw new Error();
        return res.blob();
      })
      .then((blob) => setAvatarUrl(URL.createObjectURL(blob)));
  }, [props.userId]);

  useEffect(() => {
    getAvatarUrl();
  }, [getAvatarUrl]);

  return (
    <div className={props.className}>
      <img
        className={`${props.imgClassName}`}
        src={avatarUrl}
        alt="User's avatar"
      />
    </div>
  );
};

export default Avatar;