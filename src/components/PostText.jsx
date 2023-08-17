import { Link } from "react-router-dom"
import { styled } from "styled-components"
import reactStringReplace from 'react-string-replace'

export default function PostText({ children }) {
    return (
        <TextSC>
            {reactStringReplace(children, /#(\w+)/g, (match, i) => (
                <LinkSC key={match + i} to={`/hashtag/${match}`} >#{match}</LinkSC>
            ))}
        </TextSC>
    )
}

const TextSC = styled.span`
    color: #B7B7B7;
    font-family: Lato, Arial, sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    @media (max-width:500px) {
        font-size: 15px;
    }
`

const LinkSC = styled(Link)`
    color: #FFF;
    font-size: 17px;
    font-weight: 700;

    @media (max-width:500px) {
        font-size: 15px;
    }
`