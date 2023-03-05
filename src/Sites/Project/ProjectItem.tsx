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
            <Icon.PersonFill />
            {project.author.username}
          </div>
          <div>
            <Icon.CalendarDate />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <div>
            <Icon.Clock />
            {new Date(project.createdAt).getHours() +
              ":" +
              new Date(project.createdAt).getMinutes()}
          </div>
          <div
            onClick={() => {
              props.openModal(project.id, "report");
            }}
          >
            <Icon.FlagFill />
          </div>
        </div>
        <h2>{project.title}</h2>
        <p className={classes.content}>{project.text}</p>
        <div className={classes.bottomData}>
          <Button
            buttonText={project.hasAlreadyApplied ? "Wypisz się" : "Zapisz się"}
            onClick={(event: any) => {
              props.applyToProject(event, project.id);
            }}
            className={project.hasAlreadyApplied ? "alternate" : ""}
          />
          <Icon.PersonFillCheck
            onClick={() => {
              props.openModal(project.id, "projectAppliedUsers");
            }}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default ProjectItem;
