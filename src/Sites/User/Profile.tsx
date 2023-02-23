import React, { useState } from "react";
import classes from "./Profile.module.css";
import turtle from "./Graphics/turtle.jpg"
import Button from "../../Components/Button";
import { Instagram } from "react-bootstrap-icons";

const Profile = () => {
    const [isSended, setIsSended] = useState(false);
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
                    <Button buttonText="Dodaj do znajomych" disabled={isSended} onClick={()=>{setIsSended(true)}}/>
                    <Button buttonText={<span style={{display: 'flex', flexDirection: 'row', columnGap: ".3rem"}}>Sociale <Instagram style={{width: '1.2rem', height: '1.2rem', paddingTop: '.3rem'}}/></span>} className="alternate"/>
                </div>
            </div>
        </div>
    </>);
}

export default Profile;