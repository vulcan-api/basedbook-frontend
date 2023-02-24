import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProfileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <></>;
};

export default ProfileRedirect;
