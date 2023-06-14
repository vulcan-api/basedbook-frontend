import React, { useRef, useState, useEffect, useCallback } from "react";
import defaultAvatar from "../Sites/User/Graphics/default.png";
import Input from "../Components/Input";
import classes from "./Searchbar.module.css";
import SearchResult from "./SearchResult";

const Searchbar = (props: {
  sidebarWidth?: number,
  isSearching?: boolean,
  onResClick?: Function 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [height, setHeight] = useState(0);
  const [users, setUsers] = useState([]);

  const getHeight = ():number => {
    if(props.isSearching) {
      inputRef.current?.focus();
      return 0;
    }
    return height;
  }

  const setupHeight = useCallback(() => {
    if (ref.current) setHeight(ref.current.offsetHeight * -1);
  },[]);

  useEffect(() => {
    setupHeight();
  }, [setupHeight]);

  const fetchUsers = async () => {
    const val = inputRef.current?.value;
    await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/?name=${val}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setUsers(json));
  };

  return (
    <>
      <div
        ref={ref}
        className={`${classes.searchCont} ${
          props.isSearching ? classes.enabled : classes.disabled
        }`}
        style={{ left: props.sidebarWidth, top: getHeight()}}
      >
        <div className={classes.inputsContainer}>
          <Input placeholder={"Szukaj"} ref={inputRef} onChange={fetchUsers} />
        </div>
        <div>
          {Array.isArray(users) && users.map((result) => {
            return (
              <SearchResult
                key={result["id"]}
                id={result["id"]}
                name={`${result["name"]} ${result["surname"]} - ${result["username"]}`}
                image={defaultAvatar}
                onClick={() => { if(props.onResClick) props.onResClick()}}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
