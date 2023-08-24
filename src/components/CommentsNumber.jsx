import { Flex, Text } from "@chakra-ui/layout";
import { PiWechatLogoThin } from "react-icons/pi";

export default function CommentsNumber({ comments, postId, setShowComments }) {

    return (
        <Flex direction="column" align='center'>
            <PiWechatLogoThin
                size={30}
                color="white"
                onClick={() => setShowComments(prev => !prev)}
                cursor='pointer'
            />
            <Text
                color='white'
                fontSize={13}
            >
                {comments ? comments.length : 0} comments
            </Text>
        </Flex>
    )

}