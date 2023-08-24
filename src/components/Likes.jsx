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
        const likersWithoutUser = likers.filter(liker => liker !== user.userName);

        if (states.liked) {
            if (likersWithoutUser.length < 1) {
                return 'Você';
            } else if (likersWithoutUser.length < 2) {
                return `Você e ${likersWithoutUser[0]}`
            } else {
                return `Você, ${likersWithoutUser[0]} e outras ${likersWithoutUser.length - 1} pessoas`
            }
        } else {
            if (likersWithoutUser.length < 1) {
                return '';
            } else if (likersWithoutUser.length < 2) {
                return likersWithoutUser[0];
            } else if (likersWithoutUser.length < 3) {
                return `${likersWithoutUser[0]} e ${likersWithoutUser[1]}`
            } else {
                return `${likersWithoutUser[0]}, ${likersWithoutUser[1]} e outras ${likersWithoutUser.length - 2} pessoas`
            }
        }
    }

    return (
        <Flex direction="column" align='center'>
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