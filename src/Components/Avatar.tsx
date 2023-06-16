import classes from './Avatar.module.css';
import { useState, useCallback, useEffect } from 'react';
import defaultAvatar from "./Graphics/default.png";

export const Avatar = (props: { userId: number }) => {

    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);

    const getAvatarUrl = useCallback(
    async (): Promise<void> => {
      fetch(`${process.env.REACT_APP_REQUEST_URL}/user/settings/avatar/${props.userId}`, {
	      credentials: "include",
      })
	.then((res: Response) => {
       console.log(res);
    	  if (!res.ok)
    	    throw new Error();
    	  return res.blob();
	})
	.then(blob => setAvatarUrl(URL.createObjectURL(blob)))
    }, [props.userId]);

    useEffect(() => {
        getAvatarUrl();
        return () => URL.revokeObjectURL(avatarUrl);
    }, [getAvatarUrl])


    return (
        <div className={classes.avatar}>
            <img className={classes.avImage} src={avatarUrl} alt="User's avatar" />
        </div>
    )
}