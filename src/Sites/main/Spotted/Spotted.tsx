import React, { useEffect } from 'react';
import classes from './Spotted.module.css';
import Button from '../../../Components/Button';
import * as Icon from 'react-bootstrap-icons';
import Wrapper from '../../../Layout/Wrapper';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Spotted = () => {
    const [posts, setPosts] = useState([
        {
            id: 69,
            createdAt: new Date("2023-02-06T19:21:38.727Z"),
            authorId: 1,
            title: "Lekcja z symfony u stopiarza",
            text: "Chciałem się pochwalić że prowadziłem lekcje u stopiarza",
            isAnonymous: false,
            isLiked: false,
            likes: 69,
            username: "jajco",
        },
    ]);

    const [listType, setListType] = useState({
        width: '40%',
    });

    const [isActive, setIsActive] = useState(true);

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
        setListType({
            width: length + '%',
        });
    }

    function likeHandler(post: any) {
        let postsCopy = [...posts];
        let index = postsCopy.indexOf(post);
        if (posts[index].isLiked) {
            posts[index].isLiked = false;
            posts[index].likes -= 1;
            like(posts[index].id);
            setPosts(postsCopy);
            
        } else {
            posts[index].isLiked = true;
            posts[index].likes += 1;
            like(posts[index].id);
            setPosts(postsCopy);
        }
    }

    const like = async (id:Number) => {
        await fetch(`http://localhost:3000/spotted/post/${id}/like`, {
          method: "POST",
          credentials: "include",
        })
          .then((res) => res.json())
          .then(() => {
            console.log("Polikeowano");
          })
          .catch((err) => {
            console.error(err);
          });
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    async function getAllPosts() {
        try {
        fetch('http://localhost:3000/spotted/post', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(setPosts);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {window.location.pathname === '/spotted' && <div className={classes.menu}>
                <div>
                    <Icon.List className={isActive ? '' : classes.active}
                               onClick={() => changeListTypeHandler(100, 1)}/>
                    <Icon.GridFill className={isActive ? classes.active : ''}
                                   onClick={() => changeListTypeHandler(40, 0)}/>
                </div>
                <Link to="/spotted/add"><Button buttonText="Dodaj post" className='alternate'/></Link>
            </div>
            }
            {window.location.pathname === '/spotted' && <div className={classes.posts}>
                {posts.map((post) => {
                    return (
                        <div key={post.id} style={listType}>
                            <Wrapper className={classes.post}>
                                <div className={classes.topData}>
                                    <div>
                                        <Icon.PersonFill/>
                                        {post.isAnonymous ? ('anonim') : post.username}
                                    </div>
                                    <>
                                        <Icon.CalendarDate/>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </>

                                    <div>
                                        <Icon.Clock/>
                                        {new Date(post.createdAt).getHours() + ':' + new Date(post.createdAt).getMinutes()}
                                    </div>
                                    <Icon.FlagFill/>
                                </div>
                                <div className={classes.content}>
                                    {post.text}
                                </div>
                                <div className={classes.bottomData}>
                                    <div onClick={() => {
                                        likeHandler(post)
                                    }}>
                                        {post.isLiked && <Icon.HeartFill style={{color: 'var(--add1-500)'}}/>}
                                        {!post.isLiked && <Icon.Heart/>}
                                        <p style={post.isLiked ? {color: 'var(--add1-500)'} : {}}>{post.likes}</p>
                                    </div>
                                    {/* <div>
                                        <Icon.ChatLeftText/>
                                        {post.comments + ' komentarzy'}
                                    </div> */}
                                </div>
                            </Wrapper>
                        </div>)
                })}
            </div>}
        </>
    )
}

export default Spotted;