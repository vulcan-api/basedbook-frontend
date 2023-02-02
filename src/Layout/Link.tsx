import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'yargs';
import classes from './Link.module.css';

const LinkSection = (props: {elements: {destination: string, label: string, icon: any}[]}) => {
    return (
        <>
        <ul className={classes.linkList}>
        {
            props.elements.map((item) => {
                return (
                <li>
                    <Link to={item.destination} className={classes.link}>
                        <span className={classes.linkIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                </li>)
            })
        }
        </ul>
        </>
    )
}

export default LinkSection;