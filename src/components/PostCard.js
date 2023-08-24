import styled from "styled-components";
import React, { useState } from "react";
import PostText from "./PostText";
import Likes from "./Likes";
import { useNavigate } from "react-router-dom";
import CommentsNumber from "./CommentsNumber";
import CommentsText from "./CommentsText";



export default function PostCard({ post }) {
    let { id, url, userId, linkTitle, linkDescription, linkImage, postDescription, pictureUrl, userName, likers, comments } = post
    const [showComments, setShowComments] = useState(false);

    if (!linkImage) linkImage = "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg";

    function goToUrl(link) {
        return window.open(link)
        //return window.location.href = link;
    }

    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/user/${userId}`);
    };

    return (
        <>
            <ListServiceContainer data-test="post">
                <Left>
                    <img onClick={goToUserPage} src={pictureUrl} alt="foto do criador" />
                    <Likes likers={likers} postId={id} />
                    <CommentsNumber comments={comments} postId={id} setShowComments={setShowComments} />
                </Left>
                <Right>
                    <h1 onClick={goToUserPage} data-test="username"><strong>{userName}</strong></h1>
                    <PostText>{postDescription}</PostText>
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
    margin: 0 30px;
    padding-top: 20px;
    width: 3.5vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: space-between;

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
    gap: 5px;
    padding-top: 5px;
}
}
`

const Right = styled.div`
    padding-right: 20px;
    width: 37vw;
    height: 23vh;
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
    margin-top: 5px;
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
    z-index: 1;
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