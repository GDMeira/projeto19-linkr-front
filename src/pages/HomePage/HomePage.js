
import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar"
import PostCard from "../../components/PostCard";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { getPosts, newPost } from "../../Services/api";
import Trending from "../../components/Trending";
import { ThreeDots } from "react-loader-spinner"

export default function HomePage() {
    const { user } = useContext(UserContext)

    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [allPosts, setAllPosts] = useState([[]])
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     const fetchData = () => {
    //         getPosts(user.token)
    //             .then(answer => {
    //                 setAllPosts(answer.data);
    //             })
    //             .catch(error => alert("An error occured while trying to fetch the posts, please refresh the page"));
    //     };

    //     fetchData();

    //     const intervalId = setInterval(fetchData, 10000);

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // });

    useEffect(() => {
        getPosts(user.token)
            .then(answer => {
                setAllPosts(answer.data);
            })
            .catch(error => alert("An error occured while trying to fetch the posts, please refresh the page"));
    });


    function postLinkr(e) {
        e.preventDefault();
        setLoading(true)
        const promise = newPost({ link, postDescription: description }, user.token);

        promise.then(response => {
            setLink('')
            setDescription('')
            setLoading(false)
        });
        promise.catch(err => alert("An error occured while trying to fetch the posts, please refresh the page"));
    }

    return (
        <>
            <NavBar />

            <PageSC>
                <TitleSC>timeline</TitleSC>



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
                                    <button data-test="publish-btn" disabled={loading} type="submit" value="Submit">{!loading ? 'Publish' : <ThreeDots
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

                        {allPosts.length < 1 ? (
                            <p data-test="message" >Ainda Não Existe serviço disponível</p>
                        ) : (
                            allPosts.map(post => (<PostCard key={post.id} post={post} />))
                        )}
                    </PostContainerSC>
                    <Trending />
                </ContainerSC>
            </PageSC>
        </>
    )
}

const Left = styled.div`
    margin: 20px 30px;
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
    height: 16vh;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: 112px;
        height: 45px;
        padding: 12px;
    }
`

const NewPostContainer = styled.div`
    background: #FFFFFF;
    width: 100%;
    height: 209px;
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
