import React from "react";
import Wrapper from "../../Layout/Wrapper";
import getUserObject from "../../Lib/getUser";
import Spotted from "../Spotted/Spotted";

const Homepage = () => {
  let user: any;
  // @ts-ignore
  user = getUserObject("user_info");

  return (
    <>
      <div>
        <h1>
          Witaj {user.name} {user.surname}!
        </h1>
      </div>
      <Wrapper>
        <h2>Aktualności</h2>
        <p>\\ Wkrótce //</p>
      </Wrapper>
      <Wrapper>
        <h2>Spotted</h2>
        <Spotted hideNav={true}/>
      </Wrapper>
    </>
  );
};

export default Homepage;
