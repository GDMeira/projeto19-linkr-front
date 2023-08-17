
import { useState } from "react";
import NavBar from "../components/NavBar"
import PostCard from "../components/PostCard";
import styled from "styled-components";

export default function HomePage() {
    const { auth, login, user, localUser } = useAuth();
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [allPosts, setAllPosts] = useState([[]])


    useEffect(() => {
        if (!auth && !auth.token) {
          navigate("/");
        }
        const promise = getPosts(auth)
        promise.then( (answer) => setAllPosts(answer.data))
        promise.catch(error => console.log(error.response.data))
    }, []);


    function postLinkr(e) {
        e.preventDefault();
    
        const post = {email, password};
        
        const promise = newPost(link, description);
    
        promise.then( response => {




        });
        promise.catch( err  => alert(err.response.data.message));
      }

    return (
        <>
        <TimelineContainer>
        <h1>Timeline</h1>

            <PostContainer  data-test="publish-box">
                <Left>
                    <img src={user.pictureUrl}></img>
                </Left>
                <Right>
                <form onSubmit={postLinkr}>
                    What are you going to share today?
                    <input placeholder="http://..." data-test="link" type="texy" value={link} onChange={(e) => setLink(e.target.value)}/>
                    <input placeholder="Awesome article about #javascript" data-test="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button data-test="publish-btn">Publish</button>
                </form>
                </Right>
            </PostContainer>
            <LinksContainer>
                {allPosts.map(post => (<PostCard key={post.id} post={post} />))}
                {allServices.length < 1 && <p data-test="message" >Ainda Não Existe serviço disponível</p> } 
            </LinksContainer>
        </TimelineContainer>
        </>
    )
}
const LinksContainer = styled.div`
    width: 611px;

`

const Left = styled.div`
    padding:7px;
    width: 50px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }
`

const Right = styled.div`
    width: 503px;
    height: 209px;
    input {
        font-size: 20px;
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
        justify-content: left;
        align-items: center;
        gap: 5px;
        width: 95%;
        border-radius: 5px;
    }
    button {
        align-self: right;
        outline: none;
        border: none;
        border-radius: 5px;
        background: #1877F2;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: 112px;
        height: 31px;
        padding: 12px;
    }
`

const PostContainer = styled.div`
    background: #FFFFFF;
    width: 611px;
    height: 209px;
    border-radius: 16px;
`

const TimelineContainer = styled.div`
    Width: 611px;
    text-align: left;
`

