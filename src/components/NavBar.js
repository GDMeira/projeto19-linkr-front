import { useContext } from "react"
import { styled } from "styled-components";
import { API_URL } from "../routes/routes";
import UserContext from "../contexts/UserContext"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { IonIcon } from '@ionic/react';
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';
import { useState } from "react";



export default function NavBar() {

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
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`,
            }
        }
        axios.get(`${API_URL}/logout`, config)
            .then(resposta => {

                if (resposta) {
                    setUser('')
                    localStorage.clear();
                    navigate('/')
                }

            }

            )
            .catch((error) => {
                alert(error.response.message)

            })
    }


    return (
        <>

            <HeaderUp>
                <Logo onClick={() => navigate('/home')}>
                    Linkr
                </Logo>

                <Picture>
                    <IonIcon onClick={arrowChange} icon={arrow ? chevronUpOutline : chevronDownOutline} style={{ fontSize: '24px', color: 'white', backgroundColor: '#151515' }} />
                    <img src={user.image} alt="pictureUrl" />
                </Picture>

            </HeaderUp>

            <HeaderDown onClick={logOut} style={{ display: arrow ? 'flex' : 'none' }}>
                <h3> Logout </h3>
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
  

`;

//