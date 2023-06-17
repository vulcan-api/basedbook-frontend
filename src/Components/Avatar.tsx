import { useState, useCallback, useEffect } from 'react';
import defaultAvatar from "./Graphics/default.png";
import classes from "../Sites/User/Settings.module.css"

const Avatar = (props: { userId?: number; className?: any; imgClassName?: any; override?: string }) => {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [isLoading, setIsLoading] = useState(true);

  const getAvatarUrl = useCallback(async (): Promise<void> => {
    if(props.userId)
    fetch(
      `${process.env.REACT_APP_REQUEST_URL}/user/settings/avatar/${props.userId}`,
      {
        credentials: "include",
        method: 'GET'
      }
    )
      .then((res: Response) => {
        if (!res.ok) throw new Error();
        return res.blob();
      })
      .then((blob) => setAvatarUrl(URL.createObjectURL(blob)))
      .catch(err => { console.log('Could not download avatar correctly')})
      .finally(() => { setIsLoading(false)});
      else
    setIsLoading(false)
  }, [props.userId, setIsLoading]);

  useEffect(() => {
    getAvatarUrl();
  }, [getAvatarUrl]);

  return (
    <div className={props.className}>
      <img
        className={`${classes.avImage} ${isLoading ? classes.hide : ''} ${props.imgClassName}`}
        src={props.override ? props.override : avatarUrl}
        alt="User's avatar"
      />
    </div>
  );
};

export default Avatar;