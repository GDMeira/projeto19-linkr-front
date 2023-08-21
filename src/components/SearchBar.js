import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from "../contexts/UserContext";
import { useContext } from "react"
import { searchUser } from '../Services/api.js';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)
    const navigate = useNavigate()

    function goToUserPage(id) {
        navigate(`/user/${id}`);
    };


  const handleSearch = async (event) => {
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);
    setLoading(true);

    if (newSearchTerm.length >= 3) {
        
      try {
        const response = await searchUser(newSearchTerm, user.token);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
    
      setSearchResults([]);
      setLoading(false)
    }

    
  };

  return (
    <SearchContainer>
      <DebounceInputStyled
        data-test="search"
        minLength={3}
        debounceTimeout={300}
        placeholder="Search for People"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchResults.length > 0 && (
        <ResultsContainer>
          <ResultsDropdown>
            {searchResults.map((result) => (
                console.log(result),
              <SearchResult data-test="user-search" onClick={() => goToUserPage(result.id)} key={result.id}>
                <ProfileImage src={result.pictureUrl} alt="Profile" />
                <Name>{result.userName}</Name>
              </SearchResult>
            ))}
          </ResultsDropdown>
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DebounceInputStyled = styled(DebounceInput)`
  width: 563px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  padding: 10px 20px;
  font-size: 19px;
  color: #333333;
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ::placeholder {
    color: #C6C6C6;
  }
`;

const ResultsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 60px; /* Distance from the search bar */
  left: 0;
`;

const ResultsDropdown = styled.div`
  background-color: #e7e7e7;
  border-radius: 10px;
  padding: 10px;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 10px; /* Rounded borders */
  margin-bottom: 8px;
`;

const ProfileImage = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Name = styled.div`
  
  color: #515151;
font-family: Lato;
font-size: 19px;
font-style: normal;
font-weight: 400;
line-height: normal; 
`;



export default SearchBar;
