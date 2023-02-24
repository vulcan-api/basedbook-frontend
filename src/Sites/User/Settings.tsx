import React from "react";
import classes from "./Settings.module.css"
import Section from "../../Layout/Section";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import turtle from "./Graphics/turtle.jpg"

const Settings = () => {
    return (
        <>
            <Section>
                <h2>Profil</h2>
                <div className={classes.twoInputs}>
                    <Input/>
                    <Button/>
                </div> 
                <div className={classes.twoInputs}>
                    <Input/>
                    <Input/>
                </div> 
                <div className={classes.twoInputs}>
                    <Input/>
                    <Input/>
                </div> 
                <div className={classes.twoInputs}>
                    <Textarea />
                    <div className={classes.avatar}>
                        <img className={classes.avImage} src={turtle} alt="" />
                    </div> 
                </div> 
            </Section> 
            <Section>
                <h2>Preferencje</h2>
            </Section> 
            <Section>
                <h2>Dziennik</h2>
            </Section> 
            <Section>
                <h2>Konto</h2>
            </Section> 
        </>
    );
}

export default Settings;