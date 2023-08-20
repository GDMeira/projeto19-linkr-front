import styled from "styled-components";
import React from "react";
import PostText from "./PostText";
import Likes from "./Likes";


export default function PostCard({ post }) {
    const { id, url, linkTitle, linkDescription, linkImage, postDescription, pictureUrl, userName, likers } = post;

    function goToUrl(link) {
        return window.location.href = link;
    }

    return (
        <ListServiceContainer data-test="post">
            <Left>
                <img src={pictureUrl} alt="foto do criador" />
                <Likes likers={likers} postId={id}/>
            </Left>
            <Right>
                <h1 data-test="username"><strong>{userName}</strong></h1>
                <PostText>{postDescription}</PostText>
                <Linkr data-test="link">
                    <Info onClick={() => goToUrl(url)}>
                        <h3>{linkTitle}</h3>
                        <h4>{linkDescription}</h4>
                        <h5>{url}</h5>
                    </Info>
                    <img src={linkImage} alt="link" />
                </Linkr>
            </Right>
        </ListServiceContainer>
    )
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
`

const Image = styled.div`
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
    justify-content: flex-start;

    img {
        width: 3.5vw;
        height: 3.5vw;
        border-radius: 50%;
    }
`

const Right = styled.div`
    width: 37vw;
    height: 25vh;
    margin: 2vh 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}
`


const Linkr = styled.div`
    width: 33vw;
    height: 16vh;
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;

    h3{
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
    }
    h4 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #9B9595;
    }
    h5 {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: #CECECE;
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