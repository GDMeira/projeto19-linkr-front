import { useContext } from "react"
import { styled } from "styled-components";
import { API_URL, headersAuth } from "../routes/routes";
import UserContext from "../contexts/UserContext"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { IonIcon } from '@ionic/react';
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';
import { useState } from "react";
import SearchBar from "./SearchBar";



export default function NavBar({ intervalId }) {
    const [arrow, setArrow] = useState(false)
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    function arrowChange() {
        if (!arrow) {
            setArrow(true)
        } else {
            setArrow(false)
        }
    }

    function logOut() {
        axios.delete(`${API_URL}/logout`, headersAuth(user.token))
            .then(resposta => {
                navigate('/')
                setUser('')
                localStorage.clear();
            }

            )
            .catch((error) => {
                alert(error.response.message)

            })
    }


    return (
        <>

            <HeaderUp>
                <Logo onClick={() => navigate('/timeline')}>
                    Linkr
                </Logo>

                <SearchBar />

                <Picture>
                    <IonIcon onClick={arrowChange} icon={arrow ? chevronUpOutline : chevronDownOutline} style={{ fontSize: '24px', color: 'white', backgroundColor: '#151515' }} />
                    <img data-test="avatar" src={user.image || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXwBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAIIAggMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABQYHAQIDBP/EADoQAAICAQIDBAcECQUAAAAAAAABAgMEBREGITESQVFxEyJhkaHB0UJScrEUMjNDU4GSsuEVIyQlc//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC5gAAAAB1nOMIuUmoxS3bb6HYpfG+rTjOOnUycVsp2td/gvn7gONa4yl2pUaXyS5O+S6/hRVLsq/Is9JfdZZPr2pSbZ4gCTw+IdTwmvRZU5RX2LPWXxLXpXGWNkuNefH9Gn99c4P6FBG4GyRnGcVKLUovmmue52M84U12zCy68S+bli2y7KT+xJ9NvYaGAAAAAAAAAAAAAADMOK23xDmb9zjt/SjTzN+Mq1DX7WtvXhGXw2+QECAAAAA9MdtX1tde2tvebCuiMj06Cs1DFg3spXRTb80a6AAAAAAAAAAAAAAcMyrXoTr1vOjY236aT5+De6+GxqxR+O8CNd9OdD956k/NdPh+QFRAAAAAcxTb2S3b5I1/EhKvFphNtyjCKbfjsZxwrgRz9ZrjYm66l6WXt222XvNNAAAAAAAAAAAAAABG69p/+p6Vdjx/abdqv8S6fQkjhgY3KLjJxkmmns0+44LnxZw7OdktQwa3JvndXFc9/vJfmUzYABsTvDmgWarfG26LhiQfrS6dv2L5gWLgnTXjafLLsW08h+r+FdPeWc6wjGEVGKUYpbJLuOwAAAAAAAAAAAAeV99WPTK26ahXBbyk3skVDU+N2pSr02lbfxbO/yQFxssjXBzslGMVzbk9kis6xxjj46lVpyV9v8R/qL6lNztTzNQlvl5E7PCO+0V/LofIBO6ZxTnYeVKy+csmuyW84zf8Ab4E66uGteXpO3HGvl12kq5b+XRlFAF5Wi8N6Y/S5OUrWuajZan8F1I3WuKnfV+iaXB4+Ml2e0l2ZNeC26IrAAtuicYzpjGjU1KyC5K6POS813lyxczHzKlbjXQtg++L3MgPXGyb8S1WY9s6prvi9gNhBQNP41zKNo5sI5MPvL1ZfQuem6ni6nR6XFs7S6Si+Ti/agPsAAAAAACP13LeDpGVfF7SUGov2vkgKVxZrUs/Nlj1S/wCNRLZJfakur+hXg3uAAAAAAAAAAAAH26VqV2mZsMil9OU490o96PiAGwYuRXl41V9L3rsipRZ7FW4EzHdp12NJ7ume8V4Rf+dy0gAAAK3x1a69EjBfvLoxfls38kWQq/Hq/wCpofd6df2yAoIAAAAAAAAAAAAAAALRwFa46pkVfZnT2v5qS+rL8Z7wIt9bs9lEvziaEAAAAgOM6fS6DY0t3XOM/l8yfPHLxq8zGtx7lvXZFxlt1Ax8FwzeBrE3LByYyXdG1bP3og8nh3Vcbft4dkku+G0l8AIsHeyqyqXZthKD8JLY6AAAAAAAA5UXJpRW7fRIDgH34+i6lk/scK5rxceyviTOFwTm2tPKtroj3petL6Ae3AFO+Rl3tclBQT83v8i8Efo+kUaPjypx3KXbl2pSm+bZIAAAAAAHDAAHVxjNbTipLwa3PgzNPw5frYlD860ABWNSw8aDl2MemPlBIrmRGMW9opeSAA86km+aTJvTcaie3bprl5xTAAtmDp2ElFrDx0//ACj9CVhTVUv9uuEPwxSAA7roAAOQAAAAH//Z'} alt="pictureUrl" />
                </Picture>

            </HeaderUp>

            <HeaderDown data-test="menu" style={{ display: arrow ? 'flex' : 'none' }}>
                <button onClick={logOut} data-test="logout"> Logout </button>
            </HeaderDown>
        </>


    )
}

const HeaderUp = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    justify-content:space-between; 
    align-items: center;
    width: 100%;
    height: 72px;
    background-color: #151515;
    color: white;
  

`;

const Logo = styled.div`
    width: 108px;
    height: 54px;
    font-weight: 700;
    font-size: 50px;
    cursor: pointer;
   
    padding-left: 15px;
    background-color: #151515
`;

const Picture = styled.div`
    background-color: #151515;
    padding-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-left: 15px;
    }
`;

const HeaderDown = styled.div`
    //display: flex;
    justify-content: center;
    align-items:center;
    position: fixed;
    top: 72px;
    right: 0;
    z-index: 100;
    justify-content:space-between; 
    align-items: center;
    width: 150px;
    height: 47px;
    background-color: #151515;
    color: white;
    border-bottom-left-radius: 40px 35px;
    h3{
        margin:auto;
    }
    button {
        background: none;
    }

`;

//