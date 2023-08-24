import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { styled } from "styled-components";


export default function CommentCard({ comment, userName }) {
    // const [subtitle, setSubtitle] = useState(undefined);
    let subtitle = undefined;

    if (comment.userName === userName) {
        // setSubtitle('• post’s author');
        subtitle = '• post’s author';
    } else if (comment.isFollowed) {
        // setSubtitle('• following')
        subtitle = '• following';
    }

    return (
        <Flex justifyContent='flex-start' alignItems='center' flexWrap='wrap' h='70px' w='90%'>
            <Image
                alt={comment.userName}
                src={comment.pictureUrl}
                w='40px'
                h='40px'
                borderRadius='50%'
            />

            <Box ml={15}>
                <Flex flexWrap='wrap' alignItems='center' justifyContent='flex-start'>
                    <Text color='#F3F3F3' fontWeight={700}>{comment.userName}</Text>
                    {subtitle ? (
                        <Text color='#565656' ml={5}>{subtitle}</Text>
                    ) : (
                        null
                    )}
                </Flex>
                <Text color='#ACACAC' mt={5}>{comment.comment}</Text>
            </Box>
            <Spacer />
        </Flex>
    )
}

const Spacer = styled.hr`
    border: #353535 1px solid;
    width: 100%;
`