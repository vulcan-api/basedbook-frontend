import React, {useCallback, useEffect, useState} from "react";
import classes from "./Settings.module.css"
import Section from "../../Layout/Section";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import turtle from "./Graphics/turtle.jpg"
import {BrightnessHighFill, MoonFill, PencilFill, CheckSquareFill} from "react-bootstrap-icons";
//import Checkbox from "../../Components/Checkbox";
import {Link, useNavigate} from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const Settings = () => {
    const navigate = useNavigate();
    //const [darkTheme, setDarkTheme] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState({
        "username": "",
        "email": "",
        "name": "",
        "surname": "",
        "facebook": null,
        "instagram": null,
        "youtube": null,
        "website": null,
        "profileDesc": "",
        "darkTheme": false
    });


    async function getSettings() {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/user/settings/get", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setSettings(data));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    async function updateSettings(event: any) {
        event.preventDefault();
        const filteredSettings = Object.fromEntries(
            Object.entries(settings).filter(([_, value]) => value !== null)
        );
        const throwObject = {};
        console.log(filteredSettings);
        const settingsRequest = await fetch("http://localhost:3000/user/settings/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(filteredSettings),
        })
            .then((res) => res.text()).then(() => {
                NotificationManager.success("Udało się zaktualizować ustawienia.", "Sukces!", 3000);
                navigate("/profile");
            })
            .catch((err) => {
                console.error(err);
                return throwObject;
            });
        // if (settingsRequest.statusCode === 200 || Array.isArray(settings)) {
        //     NotificationManager.success("Udało się zaktualizować ustawienia.", "Sukces!", 3000);
        //     navigate("/profile");
        // }
    }

    const handleUserNameChange = (event: any) => {
        setSettings({
            ...settings,
            username: event.target.value,
        });
    };
    const handleFacebookChange = (event: any) => {
        setSettings({
            ...settings,
            facebook: event.target.value,
        });
    };
    const handleInstagramChange = (event: any) => {
        setSettings({
            ...settings,
            instagram: event.target.value,
        });
    };
    const handleYTChange = (event: any) => {
        setSettings({
            ...settings,
            youtube: event.target.value,
        })
    };
    const handleWebsiteChange = (event: any) => {
        setSettings({
            ...settings,
            website: event.target.value,
        });
    };
    const handleDescChange = (event: any) => {
        setSettings({
            ...settings,
            profileDesc: event.target.value,
        });
    };

    useEffect(() => {
        getSettings();
    }, [])
    return (
        <>
            {!isLoading && (
                <><Section>
                    <h2>Profil</h2>
                    <div className={classes.twoInputs}>
                        <Input placeholder="Nazwa użytkownika" value={settings.username}
                               onChange={handleUserNameChange}/>
                        <Button buttonText="Zmień hasło"/>
                    </div>
                    <div className={classes.twoInputs}>
                        <Input placeholder="Link do konta facebook" value={settings.facebook}
                               onChange={handleFacebookChange}/>
                        <Input placeholder="Link do konta instagram" value={settings.instagram}
                               onChange={handleInstagramChange}/>
                    </div>
                    <div className={classes.twoInputs}>
                        <Input placeholder="Link do kanału na youtube" value={settings.youtube}
                               onChange={handleYTChange}/>
                        <Input placeholder="Link do strony internetowej" value={settings.website}
                               onChange={handleWebsiteChange}/>
                    </div>
                    <div className={classes.twoInputs}>
                        <div className={classes.inputHolder}>
                            <Textarea placeholder="Opis profilu" value={settings.profileDesc}
                                      onChange={handleDescChange}/>
                        </div>
                        <div className={classes.inputHolder}>
                            <div className={classes.avatar}>
                                <span className={`${classes.coverer} ${classes.hidden}`}>
                                    <PencilFill className={classes.covererIcon}/>
                                </span>
                                <img className={classes.avImage} src={turtle} alt=""/>
                            </div>
                        </div>
                    </div>
                </Section>
                    {/*<Section>*/}
                    {/*    <h2>Preferencje</h2>*/}
                    {/*    <div className={classes.inliner}>*/}
                    {/*        <div*/}
                    {/*            className={classes.switchContainer}*/}
                    {/*            onClick={() => {*/}
                    {/*                setDarkTheme(!darkTheme);*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <div className={classes.themeSwitch}>*/}
                    {/*                <div*/}
                    {/*                    className={`${classes.ballWrapper} ${darkTheme ? classes.right : classes.left}`}*/}
                    {/*                >*/}
                    {/*                    <BrightnessHighFill*/}
                    {/*                        className={darkTheme || classes.current}/>*/}
                    {/*                    <MoonFill className={darkTheme && classes.current}/>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <label className={classes.label}>Ciemny motyw</label>*/}
                    {/*        </div>*/}
                    {/*        <Checkbox label="Weryfikacja dwuetapowa" id="verifationCheckbox"/>*/}
                    {/*    </div>*/}
                    {/*</Section>*/}
                    <Section>
                        <h2>Dziennik</h2>
                        <div>
                            <p>
                                <p>Kliknij <Link to="vulcan" style={{color: "var(--add2-500)"}}>tutaj</Link>, aby
                                    połączyć
                                    swój
                                    dziennik Vulcan z aplikacją Basedbook</p>
                            </p>
                        </div>
                    </Section><Section>
                        <h2>Konto</h2>
                        <div className={classes.bottomButtons}>
                            <Button buttonText="Usuń konto" className="alternate"/>
                            <Button
                                buttonText={<span
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        columnGap: ".3rem",
                                    }}
                                    onClick={updateSettings}
                                >
                                    Zapisz{" "}
                                    <CheckSquareFill
                                        style={{
                                            width: "1.2rem",
                                            height: "1.2rem",
                                            paddingTop: ".4rem",
                                        }}/>
                                </span>}/>
                        </div>
                    </Section></>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    );
}

export default Settings;