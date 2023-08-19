//import { useContext, useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { styled } from "styled-components";
//import { API_URL, headersAuth } from "../../routes/routes";
//import { UserContext } from "../../Contex/UserContext";
//import axios from "axios";
import { IonIcon } from '@ionic/react';
import { chevronUpOutline } from 'ionicons/icons';
//import { useContext } from "react";
//import UserContext from "../contexts/UserContext";

export default function HomePage() {
    //const { user } = useContext(UserContext)
    return (
    
        <Header>
            <Logo>
                Linkr
            </Logo>
         
            <Picture>
                <IonIcon icon={chevronUpOutline} style={{ fontSize: '24px', color: 'white', backgroundColor:'#151515' }} />
                <img src="https://shorturl.at/lCS38" alt="pictureUrl" />
            </Picture>
            
        </Header>
       
    
    )
}


const Header = styled.div`
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