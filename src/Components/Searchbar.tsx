import React, { useRef, useState, useLayoutEffect, RefObject } from 'react';
import turtle from "../Sites/User/Graphics/turtle.jpg";
import Input from "../Components/Input";
import LinkBase, { LinkBaseType } from './LinkBase'
import classes from './Searchbar.module.css';
import linkClasses from './LinkSection.module.css';
import Button from './Button';
import { Search } from 'react-bootstrap-icons';
import SearchResult from './SearchResult';

const Searchbar = (props: {link: LinkBaseType, forwardedRef: RefObject<HTMLDivElement>}) => {
  const parentRef = props.forwardedRef;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [ isSearching, setIsSearching ] = useState(false);
  const [ parentWidth, setParentWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);
  const [ users, setUsers ] = useState([]);
  
  const searchHandler = () => {
      if(isSearching) {
        setIsSearching(false) 
        setupHeight();
      } else {
        setIsSearching(true);
        setHeight(0);
        inputRef.current?.focus();
      }
  }

  const fetchUsers = async () => {
    const val = inputRef.current?.value;
    await fetch(`http://localhost:3000/user/?name=${val}`)
      .then(res => res.json())
      .then(json => setUsers(json));
  }

  const setupHeight = () => {
    if(ref.current != null)
      setHeight(ref.current.offsetHeight*-1);
  }

  useLayoutEffect(() => {
    parentRef.current && setParentWidth(parentRef.current.offsetWidth);
    setupHeight();
  }, [parentRef]);
  return (
    <>
        <div
          className={`${linkClasses.link} ${linkClasses.clickable}`}
          onClick={searchHandler}
        >
          <LinkBase icon={props.link.icon} label={props.link.label} />
        </div>
        <div 
          ref={ref}
          className={`${classes.searchCont} ${isSearching ? classes.enabled : classes.disabled}`}
          style={{left: parentWidth, top: height}}
        >
          <div className={classes.inputsContainer}>
            <Input 
              placeholder={"Szukaj"} 
              ref={inputRef} 
              onChange={fetchUsers}
              />
          </div>
          <div>
            {users.map(result => {return <SearchResult name={`${result['name']} ${result['surname']} - ${result['username']}`} image={turtle} />})}
          </div>
        </div>
    </>
  );
}

export default Searchbar;