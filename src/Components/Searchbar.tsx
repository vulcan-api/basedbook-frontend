import React, { useRef, useState, useLayoutEffect, RefObject } from 'react';
import Input from "../Components/Input";
import LinkBase, { LinkBaseType } from './LinkBase'
import classes from './Searchbar.module.css';
import linkClasses from './LinkSection.module.css';

const Searchbar = (props: {link: LinkBaseType, forwardedRef: RefObject<HTMLDivElement>}) => {
  const parentRef = props.forwardedRef;
  const ref = useRef<HTMLDivElement>(null);

  const [ isSearching, setIsSearching ] = useState(false);
  const [ parentWidth, setParentWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);
  
  const searchHandler = () => {
      if(isSearching) {
        setIsSearching(false) 
        setupHeight();
      } else {
        setIsSearching(true);
        setHeight(0);
      }
  }

  const setupHeight = () => {
    if(ref.current != null)
      setHeight(ref.current.offsetHeight*-1);
  }

  useLayoutEffect(() => {
    if(parentRef.current != null)
      setParentWidth(parentRef.current.offsetWidth);
    setupHeight();
    
  }, []);
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
          <Input placeholder={"Szukaj"} />
        </div>
    </>
  );
}

export default Searchbar;