import { Flex, Text } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { API_URL, headersAuth } from "../routes/routes";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { Tooltip } from "react-tooltip";
import { Button } from "@chakra-ui/react";

export default function Likes({ likers, postId }) {
    const { user } = useContext(UserContext);
    const [states, setStates] = useState({
        likeNumber: likers?.length || 0,
        liked: likers?.includes(user.userName)
    });

    function toggleLike() {
        if (states.liked) {
            axios.delete(`${API_URL}/posts/${postId}/dislike`, headersAuth(user.token))
                .then()
                .catch(err => alert(err.response.data))
        } else {
            axios.post(`${API_URL}/posts/${postId}/like`, {}, headersAuth(user.token))
                .then()
                .catch(err => alert(err.response.data))
        }

        setStates({
            liked: !states.liked,
            likeNumber: states.likeNumber + (states.liked ? -1 : 1)
        })
    }

    function tooltipContent() {
        if (!likers) return '';

        if (states.liked) {
            if (likers.length < 2) {
                return 'Você';
            } else if (likers.length < 3) {
                return `Você, ${likers.find(liker => liker !== user.userName)}`
            } else {
                return `Você, ${likers.find(liker => liker !== user.userName)} e outras ${likers.length - 2} pessoas`
            }
        } else {
            if (likers.length < 1) {
                return '';
            } else if (likers.length < 2) {
                return likers[0];
            } else if (likers.length < 3) {
                return `${likers[0]}, ${likers[1]}`
            } else {
                return `${likers[0]}, ${likers[1]} e outras ${likers.length - 2} pessoas`
            }
        }
    }

    return (
        <Flex direction="column" w='100%' h="6vh" align='center' justifyContent='space-between'>
            <Button data-test="like-btn" bg="none" onClick={toggleLike} >
                {states.liked ? (
                    <AiFillHeart color="red" size={30} />
                ) : (
                    <AiOutlineHeart color="white" size={30} />
                )}
            </Button>
            <Text
                color='white'
                fontSize={14}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={tooltipContent()}
                data-tooltip-place="bottom"
                data-test="counter"
            >
                {states.likeNumber} likes

            </Text>
            <Tooltip id="my-tooltip" data-test="tooltip" />
        </Flex>
    )
}