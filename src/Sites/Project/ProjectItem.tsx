import Wrapper from "../../Layout/Wrapper";
import classes from "./Project.module.css";
import * as Icon from "react-bootstrap-icons";
import Button from "../../Components/Button";
import React from "react";


const ProjectItem = (props: any) => {
    const project = props.project;
    return (
        <div style={props.listType}>
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
                        props.openModal(project.id);
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
                        <Button buttonText="Zgłoś się" onClick={(event: any) => {
                            props.applyToProject(event, project.id);
                        }}/>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default ProjectItem;