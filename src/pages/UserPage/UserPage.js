
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar"
import PostCard from "../../components/PostCard";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId, newPost } from "../../Services/api";
import Trending from "../../components/Trending";
import { ThreeDots } from "react-loader-spinner"
import { all } from "axios";

export default function UserPage() {
    const { user } = useContext(UserContext)
    const {id} = useParams()

    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    let [userInfo, setUserInfo] = useState([[]])
    const [allPosts, setAllPosts] = useState([[]])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        console.log(user.token)
        const fetchData = () => {
            getPostsByUserId( id, user.token)
                .then(answer => {
                    setUserInfo(answer.data)
                    setLoading(false)
                    console.log(all)
                    setAllPosts(answer.data.posts);
                })
                .catch(error => alert("An error occured while trying to fetch the posts, please refresh the page"));
        };

        fetchData();

        const intervalId = setInterval(fetchData, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [user]);

    


    return (
        <>
            <NavBar />

            

            <PageSC>
            
            {loading ? (
                <LoadingContainer>
                    <ThreeDots color="#FFF" height={80} width={80} />
                </LoadingContainer>
            ) : (
                    <NewPostContainer>
                
                <TitleSC>
                    <Flex>
                    <img src={userInfo.pictureUrl} alt='user'></img>
                    </Flex>
                    
                    {userInfo.userName}'s posts 
                
                

                </TitleSC>
                

                <ContainerSC>
                    <PostContainerSC>

                        {allPosts.length < 1 ? (
                            <p data-test="message" >O usuário não possui publicações</p>
                        ) : (
                            allPosts.map(post => (<PostCard key={post.id} post={post} />))
                        )}
                    </PostContainerSC>
                    <Trending />
                </ContainerSC>
            </NewPostContainer>
                )}
            </PageSC>
            
            
        </>
    )
}

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


const Flex = styled.div`
margin-left: 30px;
margin-right: 20px;
width: 3.5vw;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;

img {
    width: 3.5vw;
    height: 3.5vw;
    border-radius: 50%;
}

 `

const NewPostContainer = styled.div`
`
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

const TitleSC = styled.div`
    color: #FFF;
    font-family: Oswald, monospace;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;
    margin-top: 125px;
    margin-bottom: 40px;
    width: 65vw;
    display: flex;

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