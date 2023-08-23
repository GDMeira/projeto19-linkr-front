import { useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getTrendings } from "../Services/api";
import { useAllContexts } from "../hooks/useAllContexts";

export default function Trending() {
    const navigate = useNavigate();
    const { trending, setTrending, allPosts, user } = useAllContexts();

    useEffect(() => {
        getTrendings(user.token, setTrending);
    }, [allPosts, user]);

    return (
        <TrendingContainerSC data-test="trending">
            <h1>trending</h1>
            <hr />
            {!trending ? (
                <h1>Loading...</h1>
            ) : (
                <ul>
                    {trending.map(t => (
                        <li
                            key={t.name}
                            onClick={() => navigate(`/hashtag/${t.name}`)}
                            data-test="hashtag"
                        >
                            # {t.name}
                        </li>)
                    )}
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
        display: none;
        width: 100vw;
        position: static;
        margin-top: 15px;
    }
`;