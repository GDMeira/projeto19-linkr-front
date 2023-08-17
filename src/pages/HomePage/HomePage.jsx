
import { useState } from "react";
import NavBar from "../../components/NavBar"
import PostCard from "../../components/PostCard";
import styled from "styled-components";

export default function HomePage() {
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [allPosts, setAllPosts] = useState([[]])

    useEffect(() => {
        if (auth && auth.token) {
          navigate("/");
        }
        const promise = getPosts(auth)
        promise.then( (answer) => setAllPosts(answer.data))
        promise.catch(error => console.log(error.response.data))
    }, []);


    function postLinkr(e) {
        e.preventDefault();
    
        const user = {email, password};
        
        const promise = signIn(user);
    
        promise.then( response => {

        //getToken(response.data.token)     
          console.log(response.data.user.rows[0])
          console.log(response.data.token)
        localUser(response.data.user.rows[0])
        login(response.data.token);
        // navegar para pagina de entrada
        //home

        navigate('/home');
        });
        promise.catch( err  => alert(err.response.data.message));
      }

    return (
        <>
        <TimelineContainer>
        <h1>Timeline</h1>

            <PostContainer>
                <Left>
                    <img></img>
                </Left>
                <Right>
                <form onSubmit={postLinkr}>
                    What are you going to share today?
                    <input placeholder="http://..." type="" value={link} onChange={(e) => setLink(e.target.value)}/>
                    <input placeholder="Awesome article about #javascript" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button >Publish</button>
                </form>
                </Right>
            </PostContainer>
            <LinksContainer>
                {allPosts.map(post => (<PostCard key={post.id} post={post} />))}
                
            </LinksContainer>
        </TimelineContainer>
        </>
    )
}

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
        width: 100%;
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

