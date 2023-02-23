import React from "react";
import Wrapper from "../../Layout/Wrapper";
import classes from "./Profile.module.css";
import turtle from "./Graphics/turtle.jpg"
import Button from "../../Components/Button";

const Profile = () => {
    return (<>
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
                    <Button buttonText="Dodaj do znajomych" className="alternate"/>
                    <Button buttonText="Sociale" className="alternate"/>
                </div>
            </div>
        </div>
        <div>

        </div>
    </>);
}

export default Profile;