import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL, headersAuth } from '../routes/routes';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

function Follow({ Followers, FollowingId }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(Followers.includes(user.userName));

    useEffect(() => {
        setIsFollowing(Followers.includes(user.userName));
    }, [Followers, user.userName]);

    async function toggleFollow() {
        setLoading(true);


        try {
            


            if (isFollowing) {
                await axios
                .delete(`${API_URL}/unfollow/${FollowingId}`, headersAuth(user.token));
                
            } else {
                await axios.post(`${API_URL}/follow/${FollowingId}`, {}, headersAuth(user.token));
            }

            setIsFollowing(prevIsFollowing => !prevIsFollowing);
            setLoading(false);

        } catch (err) {
            alert(err.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ButtonFollow
            disabled={loading}
            onClick={toggleFollow}
            isFollowing={isFollowing}
            following={Followers}
            user={user}
        >
            {loading ? <ThreeDots color={isFollowing ? "#1877F2" : "#FFFFFF"} height={13} width={51} /> :
            (isFollowing ? "Unfollow" : "Follow")}
        </ButtonFollow>
    );
}

const ButtonFollow = styled.button`
    width: 112px;
    height: 31px;
    background: ${props => (props.isFollowing ? "#FFFFFF" : "#1877F2")};
    border-radius: 5px;
    border: none;
    color: ${props => (props.isFollowing ? "#1877F2" : "#FFFFFF")};
    font-family: Lato, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 125px;
    margin-bottom: 40px;
    
`;

export default Follow;
