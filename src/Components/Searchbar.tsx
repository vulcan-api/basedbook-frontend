import React, {ReactElement} from 'react';
import Input from "../Components/Input";
import LinkBase, { LinkBaseType } from './LinkBase'
import classes from './Searchbar.module.css';
import linkClasses from './LinkSection.module.css';

const Searchbar = (props: LinkBaseType) => {
    return (
        <>
            <li>
                <div className={`${linkClasses.link} ${linkClasses.clickable}`}>
                    <LinkBase icon={props.icon} label={props.label} />
                </div>
            </li>
            <div className={classes.searchCont}>
                <Input placeholder={'Szukaj'}/>
            </div>
        </>
    )
}

export default Searchbar;