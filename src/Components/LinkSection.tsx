import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowFunction } from 'typescript';
import classes from './LinkSection.module.css';

interface BaseSectionProperties {
    label: string, 
    icon: any
}

interface LinkProperties extends BaseSectionProperties {
    destination: string, 
}

interface SectionProperties extends BaseSectionProperties {
    onClick: Function
}

const isLink = (object: LinkProperties | SectionProperties): object is LinkProperties => {
    return true;
} 

const LinkSection = (props: {elements: (LinkProperties | SectionProperties)[]}) => {
    return (
        <>
        <ul className={classes.linkList}>
        {
            props.elements.map((item, index) => {
                return (
                <li key={index}>
                    {
                        // TODO: make it work
                        isLink(item) ?

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
                        <div 
                            className={classes.link}
                            //onClick={item.onClick}
                            >
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