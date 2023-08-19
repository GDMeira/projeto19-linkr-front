import styled from "styled-components";
import React from "react";


export default function PostCard({post}) {
    
    const {id, link, title, linkDescription, image, postDescription, userImage, userName} = post

    function goToUrl(id) {
        return  window.location.href = link;
    }

return (
    <ListServiceContainer key={id} data-test="post">
        <Left>
            <img src={userImage} alt="foto do criador" />
            {/* no futuro likes */}
        </Left>
        <Right>
            <h1 data-test="username"><strong>{userName}</strong></h1>
            <h2 data-test="description">{postDescription}</h2>
            <Linkr  data-test="link">
                <Info onClick={() => goToUrl(link)}>
                    <h3>{title}</h3>
                    <h4>{linkDescription}</h4>
                    <h5>{link}</h5>
                </Info>
                <Image>
                    <img src={image} alt="link" />
                </Image>
            </Linkr>
        </Right>
    </ListServiceContainer>
)}

const Info = styled.div`
`

const Image = styled.div`
    height: 155px;
    width: 155px;
`

const Left = styled.div`
    padding:7px;
    width: 50px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }
`

const Right = styled.div`
    width: 503px;
    height: 276px;
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
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 16px;

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
        height: 155px;
        width: 155px;
    }
`

const ListServiceContainer = styled.div`
    width: 611px;
    height: 276px;
    top: 470px;
    left: 241px;
    border: 1px;

    display: flex;
    flex-direction:column;
    background: #171717;
    border-radius: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

`