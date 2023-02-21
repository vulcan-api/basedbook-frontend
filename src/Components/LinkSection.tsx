import React, {ReactElement} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './LinkSection.module.css';
import LinkBase, {LinkBaseType} from './LinkBase';
import Searchbar from '../Components/Searchbar';
import * as Icon from 'react-bootstrap-icons';

interface LinkProperties extends LinkBaseType {
    destination?: string, 
    componentOverride?: ReactElement,
    onClick?: any,
}

const LinkSection = (props: {elements: LinkProperties[]}) => {
    return (
        <>
        <ul className={classes.linkList}>
            <Searchbar label={'Szukaj'} icon={<Icon.Search/>}/>
        {
            props.elements.map((item, index) => {
                if(item.componentOverride) {
                    return item.componentOverride;
                }
                return (
                <li key={index + 1}>
                    {
                        item.destination ?

                        <NavLink 
                            to={item.destination} 
                            className={classes.link} 
                            style={({ isActive }) => isActive ? {color: 'var(--add1-500)'} : {color: 'var(--add2-500)'}}
                            >
                                <LinkBase icon={item.icon} label={item.label} />
                        </NavLink>

                        :
                        
                        <div className={`${classes.link} ${classes.clickable}`} onClick={item.onClick}>
                            <LinkBase icon={item.icon} label={item.label} />
                        </div>

                    }
                </li>)
            })
        }
        </ul>
        </>
    )
}

export default LinkSection;
