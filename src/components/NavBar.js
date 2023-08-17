import styled from "styled-components"
import { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function NavBar() {
   const { auth, login, user, localUser } = useAuth();
    return (
        <NavBarStyle>
            <Link to='/home'>Linkr</Link>
            <img src={user.image} alt="" />
        </NavBarStyle>
    )
}

const NavBarStyle = styled.div`
    width: 100%;
    height: 50px;
    background: #171717;
;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    position:fixed;
    top: 0;
    left: 0;
    z-index: 1;
        span {
            margin-left: 30px;
            
        }

        h1 {
            font-family: 'Helvetica';
            width: 35%;
            font-size: 30px;
            color: #FFFFFF;
        }
`
