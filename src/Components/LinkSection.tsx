import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowFunction } from 'typescript';
import classes from './LinkSection.module.css';

interface LinkProperties {
    label: string, 
    icon: any
    destination?: string, 
    onClick?: Function
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
                        // TODO: make it work
                        item.destination?

                        <NavLink 
                            to={item.destination} 
                            className={classes.link} 
                            style={({ isActive }) => isActive ? {color: 'var(--add1-500)'} : {color: 'var(--add2-500)'}}
                            >
                            <span className={classes.linkIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>

                        :
                        
                        // TODO: implement onClick to show searchbox
                        <span 
                            className={`${classes.link} ${classes.clickable}`}
                            onClick={() => item.onClick!}
                            >
                            <span className={classes.linkIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </span>

                    }
                </li>)
            })
        }
        </ul>
        </>
    )
}

export default LinkSection;
