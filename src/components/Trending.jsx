import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { API_URL, headersAuth } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Trending() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [trending, setTrending] = useState(undefined);

    // useEffect(() => {
    //     const fetchData = () => {
    //         axios
    //             .get(`${API_URL}/trending`, headersAuth(user.token))
    //             .then((res) => {
    //                 setTrending(res.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }

    //     fetchData();

    //     const intervalId = setInterval(fetchData, 10000);
    //     return () => clearInterval(intervalId)
    // }, []);

    useEffect(() => {
            axios
                .get(`${API_URL}/trending`, headersAuth(user.token))
                .then((res) => {
                    setTrending(res.data);
                })
                .catch((err) => {
                    alert(err.response.data);
                });
    }, []);

    return (
        <TrendingContainerSC>
            <h1>trending</h1>
            <hr />
            {!trending ? (
                <h1>Loading...</h1>
            ) : (
                <ul>
                    {trending.map(t => <li key={t.name} onClick={() => navigate(`/hashtag/${t.name}`)}># {t.name}</li>)}
                </ul>
            )}
        </TrendingContainerSC>
    )
}

const TrendingContainerSC = styled.div`
    position: sticky;
    top: 211px;
    width: 20.9vw;
    height: 406px;
    border-radius: 16px;
    background: #171717;

    h1 {
        color: #FFF;
        font-family: Oswald, sans-serif;
        font-size: 27px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 10px 0 10px 20px;
    }
    
    ul {
        margin-top: 20px;
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
    }

    li {
        color: #FFF;
        font-family: Lato, sans-serif;
        font-size: 19px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.95px;
        margin-left: 20px;
    }

    hr {
        border: 1px solid #484848;
    }

    @media (max-width: 768px) {
        width: 100vw;
        position: static;
        margin-top: 15px;
    }
`;