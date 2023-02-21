import React, { useState } from 'react';
import Input from "../Components/Input";
import LinkBase, { LinkBaseType } from './LinkBase'
import classes from './Searchbar.module.css';
import linkClasses from './LinkSection.module.css';

const Searchbar = (props: LinkBaseType) => {
    const [ isSearching, setIsSearching ] = useState(false);
    
    const searchHandler = () => {
        isSearching ? setIsSearching(false) : setIsSearching(true);
    }

    return (
      <>
          <div
            className={`${linkClasses.link} ${linkClasses.clickable}`}
            onClick={searchHandler}
          >
            <LinkBase icon={props.icon} label={props.label} />
          </div>
        {isSearching &&
          <div className={classes.searchCont}>
            <Input placeholder={"Szukaj"} />
          </div>
        }
      </>
    );
}

export default Searchbar;