import { Flex } from "@chakra-ui/layout";
import CommentCard from "./CommentCard";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useAllContexts } from "../hooks/useAllContexts";
import { Image } from "@chakra-ui/image";
import { FiSend } from "react-icons/fi";
import { styled } from "styled-components";
import { FormControl } from "@chakra-ui/form-control";
import { useState } from "react";
import { postComment } from "../Services/api";
import { Spinner } from "@chakra-ui/spinner";
import { Button } from "@chakra-ui/react";

export default function CommentsText({ post }) {
    const { comments, id, userName } = post;
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAllContexts();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        if (text.length === 0) {
            alert("Please enter a comment");
            setIsLoading(false);
            
            return;
        }

        try {
            await postComment(user.token, id, text);
            setText('');
            setIsLoading(false);
        } catch (error) {
            alert(error.response.message);
            setIsLoading(false);
        }
    }

    return (
        <Flex
            direction='column'
            justifyContent='flex-start'
            alignItems='center'
            bgColor='#1E1E1E;'
            borderRadius='16px'
            w='100%'
            mt='-30px'
            pt='35px'
            zIndex='0'
        >
            {comments.map(comment => <CommentCard key={comment.comment} comment={comment} userName={userName} />)}
            <Flex w='90%' alignItems='center' justifyContent='space-between' height='71px'>
                    <>
                        <Image
                            alt={user.userName}
                            src={user.image}
                            w='40px'
                            h='40px'
                            borderRadius='50%'
                        />
                        <FormControl w='92%'>


                            <InputGroup>
                                <Input
                                    type='text'
                                    w='100%'
                                    h='40px'
                                    backgroundColor='#252525'
                                    border='none'
                                    placeholder="write a conmment..."
                                    color='white'
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    autoFocus
                                    required
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleSubmit(e);
                                        }
                                    }}
                                />
                                <InputRightElement >
                                    <Button 
                                        bg='none'
                                        type="submit"
                                        onClick={handleSubmit}
                                        isLoading={isLoading}
                                    >
                                        <FiSend size={20} color="white" />
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </>
            </Flex>

        </Flex>


    )
}