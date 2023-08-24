import { Flex, Text } from "@chakra-ui/layout";
import { PiWechatLogoThin } from "react-icons/pi";

export default function CommentsNumber({ comments, postId, setShowComments }) {

    return (
        <Flex direction="column" align='center'>
            <PiWechatLogoThin
                size={25}
                color="white"
                onClick={() => setShowComments(prev => !prev)}
                cursor='pointer'
            />
            <Text
                color='white'
                fontSize={14}
            >
                {comments ? comments.length : 0} {window.screen.width > 768 && ' comments' }
            </Text>
        </Flex>
    )

}