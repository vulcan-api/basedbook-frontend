import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './LinkSection.module.css';

interface LinkProperties {
    label: string, 
    icon: any
    destination?: string, 
    onClick?: any
}

const LinkSection = (props: {elements: LinkProperties[]}) => {
    return (
        <>
        <ul className={classes.linkList}>
        {
            props.elements.map((item, index) => {
                return (
                <li key={index}>
                    {
                        item.destination ?

                        <NavLink 
                            to={item.destination} 
                            className={classes.link} 
                            style={({ isActive }) => isActive ? {color: 'var(--add1-500)'} : {color: 'var(--add2-500)'}}
                            >
                            <span className={classes.linkIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>

                        :
                        
                        <div className={`${classes.link} ${classes.clickable}`} onClick={item.onClick}>
                            <span className={classes.linkIcon}>{item.icon}</span>
                            <span>{item.label}</span>
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
