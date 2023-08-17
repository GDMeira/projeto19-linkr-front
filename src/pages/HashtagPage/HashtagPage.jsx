import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { API_URL, headersAuth } from "../../routes/routes";
import { UserContext } from "../../Contex/UserContext";
import axios from "axios";

export default function HashtagPage() {
    const { user } = useContext(UserContext);
    const { hashtag } = useParams();
    const [tweets, setTweets] = useState(undefined);

    useEffect(() => {
        axios.get(`${API_URL}/hashtags/${hashtag}`, headersAuth(user.token))
        .then((res) => {
            setTweets(res.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    }, [hashtag])
    

    return (
        <PageSC>
            <TitleSC># {hashtag}</TitleSC>
            <ContainerSC>
                <PostContainerSC>
                    Cards e cards
                </PostContainerSC>
                <TrendingContainerSC>
                    asuhdaiusdhias
                </TrendingContainerSC>
            </ContainerSC>
        </PageSC>
    )
}

const PageSC = styled.div`
    background: #333;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContainerSC = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

const TitleSC = styled.h1`
    color: #FFF;
    font-family: Oswald, monospace;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;
    margin-top: 125px;
    margin-bottom: 43px;
    width: 65vw;

    @media (max-width: 768px) {
        width: 100%;
        font-size: 33px;
        margin-top: 91px;
        margin-bottom: 19px;
    }
`;

const PostContainerSC = styled.div`
    width: 42.4vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 1500px;
    background-color: #350808;
    margin-right: 1.7vw;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const TrendingContainerSC = styled.div`
    position: sticky;
    top: 211px;
    width: 20.9vw;
    height: 406px;
    background-color: #0d0d51;
    @media (max-width: 768px) {
        width: 100%;
    }
`;