import React, {useEffect} from "react";
import classes from "./Project.module.css";
import Button from "../../Components/Button";
import * as Icon from "react-bootstrap-icons";
import Wrapper from "../../Layout/Wrapper";
import {useState} from "react";
import {Link} from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Modal from "../../Layout/Modal";

const Project = () => {
    const [projects, setProject] = useState([
        {
            id: 1,
            createdAt: new Date("2023-02-14T18:09:09.433Z"),
            title: "BusinessAssistant+",
            text: "Hej! Szukamy ludzi do przepisania naszego projektu w JS/TS",
            username: "Seweryn Pajor"
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reportedProjectId, setReportedProjectId] = useState(-100);
    const [listType, setListType] = useState({
        width: "40%",
    });

    const [isActive, setIsActive] = useState(true);

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
        setListType({
            width: length + "%",
        });
    }


    useEffect(() => {
        getAllProjects();
    }, []);

    async function getAllProjects() {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/project?take=20", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then(setProject);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }


    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && <Modal projectId={reportedProjectId} onBgClick={closeModal} onClose={closeModal}/>}
            {!isLoading && (
                <div className={classes.menu}>
                    <div>
                        <Icon.List
                            className={isActive ? "" : classes.active}
                            onClick={() => changeListTypeHandler(100, 1)}
                        />
                        <Icon.GridFill
                            className={isActive ? classes.active : ""}
                            onClick={() => changeListTypeHandler(40, 0)}
                        />
                    </div>
                    <Link to="/project/add">
                        <Button buttonText="Dodaj projekt" className="alternate"/>
                    </Link>
                </div>
            )}
            {!isLoading && (
                <div className={classes.posts}>
                    {projects.map((project) => {
                        return (
                            <div key={project.id} style={listType}>
                                <Wrapper className={classes.post}>
                                    <div className={classes.topData}>
                                        <div>
                                            <Icon.PersonFill/>
                                            {project.username}
                                        </div>
                                        <div>
                                            <Icon.CalendarDate/>
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <Icon.Clock/>
                                            {new Date(project.createdAt).getHours() +
                                                ":" +
                                                new Date(project.createdAt).getMinutes()}
                                        </div>
                                        <div onClick={() => {
                                            setShowModal(true);
                                            setReportedProjectId(project.id);
                                        }}>
                                            <Icon.FlagFill/>
                                        </div>
                                    </div>
                                    <div>
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className={classes.content}>{project.text}</div>
                                    <div className={classes.bottomData}>
                                        <div>
                                            <Button type="submit" buttonText="Zgłoś się"/>
                                        </div>
                                    </div>
                                </Wrapper>
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    );
};

export default Project;
