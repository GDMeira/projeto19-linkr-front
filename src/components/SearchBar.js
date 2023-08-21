import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import styled from 'styled-components';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);
    setLoading(true);

    if (newSearchTerm.length >= 3) {
      try {
        const response = await axios.get(`YOUR_SEARCH_ENDPOINT?query=${newSearchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }

    setLoading(false);
  };

  return (
    <SearchContainer>
      <DebounceInputStyled
        minLength={3}
        debounceTimeout={300}
        placeholder="Search for People"
        value={searchTerm}
        onChange={handleSearch}
      />
      <SearchResults>
        {loading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : (
          searchResults.map((result) => (
            <SearchResult key={result.id}>
              <ProfileImage src={result.profileImage} alt="Profile" />
              <Name>{result.name}</Name>
            </SearchResult>
          ))
        )}
      </SearchResults>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const DebounceInputStyled = styled(DebounceInput)`
  width: 563px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #FFF;
  padding: 10px 20px;
  border: 1px solid #ccc;
  font-size: 19px;
  color: #333333;
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ::placeholder {
    color: #C6C6C6;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:focus {
        color: #333; // Darker color when focused
      }
  }
`;

const SearchResults = styled.div`
  margin-top: 10px;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 16px;
  background-color: #E7E7E7;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileImage = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  margin-right: 15px;
`;

const Name = styled.div`
  color: #515151;
  font-family: Lato;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoadingMessage = styled.div`
  color: #888;
`;

export default SearchBar;
