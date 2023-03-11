import React, { useRef, useState, useEffect, RefObject, useCallback } from "react";
import defaultAvatar from "../Sites/User/Graphics/default.png";
import Input from "../Components/Input";
import LinkBase, { LinkBaseType } from "./LinkBase";
import classes from "./Searchbar.module.css";
import linkClasses from "./LinkSection.module.css";
import SearchResult from "./SearchResult";

const Searchbar = (props: {
  link: LinkBaseType;
  forwardedRef: RefObject<HTMLDivElement>;
}) => {
  const parentRef = props.forwardedRef;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [parentWidth, setParentWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [users, setUsers] = useState([]);

  const setupHeight = useCallback(() => {
    if (parentRef.current) setParentWidth(parentRef.current.offsetWidth);
    if (ref.current) setHeight(ref.current.offsetHeight * -1);
  }, [parentRef]);

  useEffect(() => {
    setupHeight();
  }, [setupHeight]);

  const searchHandler = () => {
    if (isSearching) {
      setIsSearching(false);
      setupHeight();
    } else {
      setIsSearching(true);
      setHeight(0);
      inputRef.current?.focus();
    }
  };

  const fetchUsers = async () => {
    const val = inputRef.current?.value;
    await fetch(`http://localhost:3000/user/?name=${val}`)
      .then((res) => res.json())
      .then((json) => setUsers(json));
  };

  window.addEventListener("keydown", (ev) => {
    ev.key === "Escape" && searchHandler();
  });

  return (
    <>
      {isSearching && (
        <div className={classes.hide} onClick={searchHandler}></div>
      )}
      <div
        className={`${linkClasses.link} ${linkClasses.clickable}`}
        onClick={searchHandler}
      >
        <LinkBase
          icon={props.link.icon}
          label={props.link.label}
          style={isSearching ? { color: "var(--add1-500)" } : {}}
        />
      </div>
      <div
        ref={ref}
        className={`${classes.searchCont} ${
          isSearching ? classes.enabled : classes.disabled
        }`}
        style={{ left: parentWidth, top: height }}
      >
        <div className={classes.inputsContainer}>
          <Input placeholder={"Szukaj"} ref={inputRef} onChange={fetchUsers} />
        </div>
        <div>
          {users.map((result) => {
            return (
              <SearchResult
                key={result["id"]}
                id={result["id"]}
                name={`${result["name"]} ${result["surname"]} - ${result["username"]}`}
                image={defaultAvatar}
                onClick={() => {
                  searchHandler();
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
