import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { API_URL, headersAuth } from "../../routes/routes";
import axios from "axios";
import Trending from "../../components/Trending";
import UserContext from "../../contexts/UserContext";
import NavBar from "../../components/NavBar";
import PostCard from "../../components/PostCard";

export default function HashtagPage() {
    const { user } = useContext(UserContext);
    const { hashtag } = useParams();
    const [tweets, setTweets] = useState(undefined);

    // useEffect(() => {
    //     const fetchData = () => {
    //         axios.get(`${API_URL}/hashtags/${hashtag}`, headersAuth(user.token))
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setTweets(res.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 // alert(err.response.data);
    //             });
    //     }

    //     fetchData();

    //     const intervalId = setInterval(fetchData, 10000);

    //     return () => clearInterval(intervalId);
    // })
    useEffect(() => {
            axios.get(`${API_URL}/hashtags/${hashtag}`, headersAuth(user.token))
                .then((res) => {
                    setTweets(res.data);
                })
                .catch((err) => {
                    alert(err.response.data);
                });
    }, [hashtag]);


    return (
        <>
            <NavBar />
            <PageSC>
                <TitleSC data-test="hashtag-title"># {hashtag}</TitleSC>
                <ContainerSC>
                    <PostContainerSC>
                        {!tweets ? (
                            <h1>Loading</h1>
                        ) : (
                            tweets.map((tweet, i) => <PostCard key={i} post={tweet}>{tweet.postDescription} </PostCard>)
                        )}
                    </PostContainerSC>
                    <Trending />
                </ContainerSC>
            </PageSC>
        </>
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
        align-items: center;
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
        width: 95vw;
        font-size: 33px;
        margin-top: 91px;
        margin-bottom: 19px;
        margin-left: 17px;
    }
`;

const PostContainerSC = styled.div`
    width: 42.4vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-right: 1.7vw;

    @media (max-width: 768px) {
        width: 100vw;
        margin-right: 0px;
    }
`;