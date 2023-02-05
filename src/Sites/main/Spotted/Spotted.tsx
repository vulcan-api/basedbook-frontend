import React from 'react';
import classes from './Spotted.module.css';
import Button from '../../../Components/Button';
import * as Icon from 'react-bootstrap-icons';
import Wrapper from '../../../Layout/Wrapper';
import { useState } from 'react';

const Spotted = () => {
    let posts = [
        {
            id: '1',
            user: 'anonim',
            date: '6.9.2137',
            time: '21:37',
            content: 'Treść posta na spotted. Jakieś gówno, obgadywanie ludzi',
            likes: '69420',
            comments: '420',
        },
        {
            id: '2',
            user: 'twoja mama',
            date: '9.6.2137',
            time: '21:37',
            content: 'post 2 jebać disa',
            likes: '69420',
            comments: '420',
        },
    ]

    const [listType, setListType] = useState({
        width: '40%',
    });

    const [isActive, setIsActive] = useState(true);

    function changeListTypeHandler(length:Number, id:Number) {
        setIsActive(!id);
        setListType({
            width: length+'%',
        });
    }

    const posty = posts.map((post) => {
                    return (
                    <Wrapper klucz={post.id} style={listType}>
                        <div className={classes.topData}>
                            <div>
                                <Icon.PersonFill />
                                {post.user}
                            </div>
                            <div>
                                <Icon.CalendarDate />
                                {post.date}
                            </div>
                            <div>
                                <Icon.Clock />
                                {post.time}
                            </div>
                            <Icon.FlagFill />
                        </div>
                        <div className={classes.content}>
                            {post.content}
                        </div>
                        <div className={classes.bottomData}>
                            <div>
                                <Icon.Heart />
                                {post.likes}
                            </div>
                            <div>
                                <Icon.ChatLeftText />
                                {post.comments + ' komentarzy'}
                            </div>
                        </div>
                    </Wrapper>)
                })

    return (
        <>
            <div className={classes.menu}>
                <div>
                    <Icon.List className={isActive ? '' : classes.active} onClick={() => changeListTypeHandler(100, 1)}/>
                    <Icon.GridFill className={isActive ? classes.active : ''} onClick={() => changeListTypeHandler(40, 0)}/>
                </div>
                <Button className='alternate' buttonText='Dodaj post'/>
            </div>
            <div className={classes.posts}>
                {posty}
            </div>
        </>
    )
}

export default Spotted;