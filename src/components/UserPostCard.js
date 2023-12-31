import styled from "styled-components";
import React, { useContext, useEffect, useRef, useState } from "react";
import PostText from "./PostText";
import Likes from "./Likes";
import { trashOutline, pencilOutline } from "ionicons/icons";
import { IonIcon } from '@ionic/react';
import { useNavigate } from "react-router-dom";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter, Button, useDisclosure,} from "@chakra-ui/react"
import UserContext from "../contexts/UserContext";
import { postEdit, postDelete } from "../Services/api";
import CommentsText from "./CommentsText";
import CommentsNumber from "./CommentsNumber";




export default function UserPostCard({ post }) {
    let { id, url, userId, linkTitle, linkDescription, linkImage, postDescription, pictureUrl, userName, likers, comments } = post
    const { user } = useContext(UserContext)
    const [description, setDescription] = useState(postDescription)
    const [editing, setEditing] = useState(false)
    const [focusRef, setFocusRef] = useState(null);
    const [showComments, setShowComments] = useState(false);
    //console.log(post)

    if (!linkImage) linkImage = "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg";

    useEffect(() => {
        if (!focusRef) return;


        focusRef.focus();
    }, [focusRef]);

    function goToUrl(link) {
        return window.open(link)
        //return window.location.href = link;
    }

    function edit() {
        editing ? setEditing(false) : setEditing(true)
    }
    function editPost(e) {
        e.preventDefault();
        console.log(id, user)
        console.log(description)

        const promise = postEdit(description, id, user.token);
        promise.then(answer => {
            setEditing(false)
        })
        promise.catch(error => {
            alert("An error occured while trying to edit the post, please try again");
            setEditing(true)
            setDescription(description)
        })
    };

    function handleKeyDown(e) {
        if (e.keyCode === 27) {
            console.log('You pressed the escape key!')
            setEditing(false)
        }
    }


    function deletePost() {
        onClose();
        const promise = postDelete(id, user.token);
        promise.then(answer => {

        });
        promise.catch(error => {
            alert("An error occured while trying to delete the post, please try again");
        })

    }

    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/user/${userId}`);
    };


    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay >
                    <ModalContent background="black">
                        <ModalHeader color="white">Are you sure you want to delete this post?</ModalHeader>
                        <ModalFooter>
                            <Button color="blue" background="white" mr={3} onClick={onClose}>No, go back</Button>
                            <Button colorScheme="blue" onClick={deletePost}>Yes, delete it</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            <ListServiceContainer data-test="post">
                <Left>
                    <img onClick={goToUserPage} src={pictureUrl} alt="foto do criador" />
                    <Likes likers={likers} postId={id} />
                    <CommentsNumber comments={comments} postId={id} setShowComments={setShowComments} />
                </Left>
                <Right>
                    <PostController>
                        <h1 onClick={goToUserPage} data-test="username"><strong>{userName}</strong></h1>
                        <EditDelete>
                            <IonIcon onClick={edit} icon={pencilOutline} style={{ fontSize: '20px', color: 'white', backgroundColor: '#151515' }} />
                            <IonIcon onClick={onOpen} icon={trashOutline} style={{ fontSize: '20px', color: 'white', backgroundColor: '#151515' }} />
                        </EditDelete>
                    </PostController>

                    <PostText>{editing ? (<form onSubmit={editPost}>
                        <input placeholder={description} ref={setFocusRef} onKeyDown={handleKeyDown}
                            data-test="edit-input" type="text" value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </form>) : postDescription}</PostText>
                    <Linkr data-test="link" onClick={() => goToUrl(url)}>
                        <Info >
                            <h3>{linkTitle}</h3>
                            <h4>{linkDescription}</h4>
                            <h5>{url}</h5>
                        </Info>
                        <Image src={linkImage} alt="link" />
                    </Linkr>
                </Right>
            </ListServiceContainer>
            {showComments && <CommentsText post={post} />}
        </>
    )
}
const EditDelete = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
`

const PostController = styled.div`
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 20px;
    width: 25vw;
    overflow: hidden;
`

const Image = styled.img`
    height: 155px;
    width: 155px;
`

const Left = styled.div`
    margin: 0 10px;
    padding-top: 10px;
    width: 6vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: space-evenly;

    img {
        width: 3.5vw;
        height: 3.5vw;
        border-radius: 50%;
    }
    @media (max-width: 768px) {
    width: 10vw;
    img {
    width: 5vh;
    height: 5vh;
}
}
`

const Right = styled.div`
        padding-right: 20px;
    width: 37vw;
    height: 25vh;
    margin: 2vh 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 768px){
        width: 90vw;
    }   
    h1{
        color: #FFFFFF;
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
    }
    h2{
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: linear-gradient(0deg, #B7B7B7, #B7B7B7),linear-gradient(0deg, #FFFFFF, #FFFFFF);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
        -webkit-box-orient: vertical;
}
`


const Linkr = styled.div`
    width: 33vw;
    height: 16vh;
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 100%;
    }

    h3{
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
    h4 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #9B9595;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
    h5 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
    img {
        height: 16vh;
        border-radius: 0 16px 16px 0;
    }
`

const ListServiceContainer = styled.div`
    width: 100%;
    height: 27vh;
    top: 470px;
    left: 241px;
    border: 1px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #171717;
    border-radius: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
`