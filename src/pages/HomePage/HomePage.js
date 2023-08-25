
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar"
import PostCard from "../../components/PostCard";
import styled from "styled-components";
import { getPosts, newPost, getFolloweds, getTrendings } from "../../Services/api";
import Trending from "../../components/Trending";
import { ThreeDots } from "react-loader-spinner"
import { useAllContexts } from "../../hooks/useAllContexts";
import { navigate } from "ionicons/icons";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const { user, allPosts, setAllPosts, setTrending } = useAllContexts()
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [haveFollowed, setHaveFollowed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingPost, setLoadingPost] = useState(false)
    const navigate = useNavigate();

    
            

    

    useEffect(() => {
        function fetchData() {
            getFolloweds(user.token)
            .then(answer => {
                if (answer.data.length > 0) {
                    
                    setHaveFollowed(true)
                    
                }
            })
            .catch(error => alert("An error occured while trying to fetch the posts, please refresh the page"));

            getPosts(user.token)
                .then(answer => {
                    setAllPosts(answer.data);
                    console.log(answer.data)
                    setLoadingPost(false)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        localStorage.clear();
                        navigate('/');
                        return;
                    }
                    alert("An error occured while trying to fetch the posts, please refresh the page")
                });
        };

        if (!allPosts) setLoadingPost(true);
        fetchData();

        const intervalId = setInterval(fetchData, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    async function postLinkr(e) {
        e.preventDefault();
        setLoading(true)

        try {
            await newPost({ link, postDescription: description }, user.token);
            getTrendings(user.token, setTrending);
            setLink('');
            setDescription('');
            const answer = await getPosts(user.token);
            setAllPosts(answer.data);
            setLoading(false)
        } catch (error) {
            alert("An error occured while trying to fetch the posts, please refresh the page")
            setLoading(false)
        }
    }

    return (
        <>
            <NavBar />

            <PageSC>
                <TitleSC>timeline</TitleSC>

                {loadingPost ? (
                    <LoadingContainer>
                        <ThreeDots color="#FFF" height={80} width={80} />
                    </LoadingContainer>
                ) : (

                    <ContainerSC>
                        <PostContainerSC>
                            <NewPostContainer data-test="publish-box">
                                <Left>
                                    <img src={user.image} alt='user'></img>
                                </Left>
                                <Right>
                                    <h1>What are you going to share today?</h1>
                                    <form onSubmit={postLinkr}>
                                        <input placeholder="http://..." data-test="link" type="texy" value={link} onChange={(e) => setLink(e.target.value)} />
                                        <input placeholder="Awesome article about #javascript" data-test="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        <button 
                                            data-test="publish-btn" 
                                            disabled={loading} type="submit" 
                                            value="Submit">{!loading ? 'Publish' : <ThreeDots
                                            color="#FFFFFF"
                                            height="30"
                                            width="60"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClassName=""
                                            visible={true}
                                        />}
                                        </button>
                                    </form>
                                </Right>
                            </NewPostContainer>

                        {!haveFollowed ? <TitleSC2 data-test='message'>You don't follow anyone yet. Search for new friends!</TitleSC2> : allPosts.length == 0 ? (
                            <TitleSC2 data-test='message' >No posts found from your friends</TitleSC2>
                        ) : (
                            allPosts.map(post => (<PostCard key={post.id} post={post} />))
                        )}
                    </PostContainerSC>
                    <Trending />
                </ContainerSC>
            )}
            </PageSC>
        </>
    )
}

const TitleSC2 = styled.div`
    color: #FFF;
    font-family: Oswald, monospace;
    font-size: 43px;
    padding-top: 80px;
    font-style: normal;
    font-weight: 700;
    text-align: center;

    @media (max-width: 768px) {
        
        font-size: 33px;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 100vh; /* Set to the full viewport height */
    background-color: rgba(0, 0, 0, 0.5); /* Add a semi-transparent background */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999; /* Ensure it's above other content */
`;


const Left = styled.div`
    margin: 20px 0 0 25px;
    width: 3.5vw;
    img {
        width: 3.5vw;
        height: 3.5vw;
        border-radius: 50%;
    }
    @media (max-width: 768px){
    display: none;
}
`

const Right = styled.div`
    width: 37vw;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    @media (max-width: 768px) {
    width: 90vw;
}
    h1 {
        font-size: 20px;
        color: #707070;
        margin-left: 20px;
        margin-bottom: 5px;
    }
    input {
        font-size: 15px;
        width: calc(100% - 20px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
        gap: 5px;
        width: 95%;
        border-radius: 5px;
    }
    button {
        outline: none;
        border: none;
        border-radius: 5px;
        background: #1877F2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: 112px;
        height: 45px;
    }
`

const NewPostContainer = styled.div`
    background: #FFFFFF;
    width: 100%;
    height: 27vh;
    border-radius: 16px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 15px;
    @media (max-width: 768px) {
    border-radius: 0;
    height: 230px;
}
`
const PageSC = styled.div`
    background: #333;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 100vw;
        margin-right: 0px;
    }
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
