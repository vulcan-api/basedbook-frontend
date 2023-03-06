import React, { useEffect } from "react";
import classes from "./Project.module.css";
import Button from "../../Components/Button";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Modal from "../../Layout/ModalComponents/Modal";
import ProjectItem from "./ProjectItem";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const Project = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      createdAt: new Date("2023-02-14T18:09:09.433Z"),
      title: "BusinessAssistant+",
      text: "Hej! Szukamy ludzi do przepisania naszego projektu w JS/TS",
      author: {
        name: String,
        surname: String,
        username: String,
      },
      hasAlreadyApplied: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
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
        .then(setProjects);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const applyToProjectHandler = (post:any) => {
    let projectsCopy = [...projects];
    let index = projectsCopy.indexOf(post);
    if (projects[index].hasAlreadyApplied) {
      projects[index].hasAlreadyApplied = false;
      leaveProject(projects[index].id);
      setProjects(projectsCopy);
    } else {
      projects[index].hasAlreadyApplied = true;
      applyToProject(projects[index].id);
      setProjects(projectsCopy);
    }
  }

  async function applyToProject(id: any) {
    const applyProject = {
      projectId: id,
    };
    const response = await fetch("http://localhost:3000/project/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applyProject),
    });
    if (response.ok) {
      NotificationManager.success(
        "Udało się zgłosić do projektu.",
        "Sukces!",
        3000
      );
    } else {
      NotificationManager.error(
        "Zgłosiłeś się już do tego projektu!.",
        "Błąd!",
        3000
      );
    }
  }
  async function leaveProject(id: any) {
    const leaveProjectObject = {
      projectId: id,
    };
    const response = await fetch("http://localhost:3000/project/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(leaveProjectObject),
    });
    if (response.ok) {
      NotificationManager.success(
        "Udało się opuscic projekt.",
        "Sukces!",
        3000
      );
    } else {
      NotificationManager.error(
        "Wystąpił błąd!.",
        "Błąd!",
        3000
      );
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = (id: any, modalContent:any) => {
    setModalContent(modalContent);
    setShowModal(true);
    setReportedProjectId(id);
  };
  return (
    <>
      {showModal && (
        <Modal
          projectId={reportedProjectId}
          onBgClick={closeModal}
          onClose={closeModal}
          modalContent={modalContent}
        />
      )}
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
            <Button buttonText="Dodaj projekt" className="alternate" />
          </Link>
        </div>
      )}
      {!isLoading && (
        <div className={classes.posts}>
          {projects.map((project) => {
            return (
              <div key={project.id} style={listType}>
                <ProjectItem
                  project={project}
                  openModal={openModal}
                  applyToProject={() => applyToProjectHandler(project)}
                />
              </div>
            );
          })}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default Project;
