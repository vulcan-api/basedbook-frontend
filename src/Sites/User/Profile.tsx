import React, { useState } from "react";
import classes from "./Profile.module.css";
import turtle from "./Graphics/turtle.jpg"
import Button from "../../Components/Button";
import { Instagram } from "react-bootstrap-icons";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const Profile = () => {
    const [isSended, setIsSended] = useState(false);
    const [showSpottedPosts, setShowSpottedPosts] = useState(false);

    const showSpottedPostsHandler = (isShowed: Boolean) => {
        setShowSpottedPosts(!isShowed);
    }

    return (
      <>
        <div className={classes.personContainer}>
            <div className={classes.avatar}>
                <img className={classes.avImage} src={turtle} alt="" />
            </div> 
            <div className={classes.managementContainer}>
                <div className={classes.detailsContainer}>
                    <h2>Twoja Mama 69</h2>
                    <h2 className={classes.ovColor}>Oliwka Brazil klasa 2p</h2>
                    <p>Bardzo śmieszny opis tej jakże śmiesznej baby.</p>
                </div>
                <div className={classes.buttonsArea}>
                    <Button buttonText="Dodaj do znajomych" disabled={isSended} onClick={()=>{setIsSended(true); NotificationManager.success("Udało się zaprosić użytkownika do znajomych.", "Sukces!", 3000); }}/>
                    <Button buttonText={<span style={{display: 'flex', flexDirection: 'row', columnGap: ".3rem"}}>Sociale <Instagram style={{width: '1.2rem', height: '1.2rem', paddingTop: '.3rem'}}/></span>} className="alternate"/>
                </div>
            </div>
          <div className={classes.avatar}>
            <img className={classes.avImage} src={turtle} alt="" />
          </div>
          <div className={classes.managementContainer}>
            <div className={classes.detailsContainer}>
              <h2>Twoja Mama 69</h2>
              <p className={classes.ovColor}>Oliwka Brazil klasa 2p</p>
              <p>Bardzo śmieszny opis tej jakże śmiesznej baby.</p>
            </div>
            <div className={classes.buttonsArea}>
              <Button buttonText="Dodaj do znajomych" />
              <Button buttonText="Sociale" className="alternate" />
            </div>
          </div>
        </div>
        <div className={classes.creations}>
          <Button
            buttonText="Wpisy na spotted"
            className={showSpottedPosts && "alternate"}
            onClick={() => showSpottedPostsHandler(true)}
          />
          <Button
            buttonText="Projekty"
            className={!showSpottedPosts && "alternate"}
            onClick={() => showSpottedPostsHandler(false)}
          />
        </div>
      </>
    );
}

export default Profile;