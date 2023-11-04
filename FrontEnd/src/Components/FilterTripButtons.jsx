import React, { useState } from 'react';
import styled from 'styled-components';
import CarProfile from '../Icons/CarProfile.svg'
import Briefcase from '../Icons/briefcase.svg'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const Bubble = styled.div`
    background-color: white;
    border-color: #2D3648;
    color: #2D3648;
    border: solid;
    border-width: 1px;
    display: flex;
    flex-direction: row;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 20px;
    width: auto;
    margin: 5px;
    font-size: small;
    align-items: center;

    &:active {
        background-color: #009479;
        color: white;
        border-color: #009479;
    }
`

const IconImage = styled.img`
    padding-right: 3px;
    
`

const FilterableList = () => {
  const [filter, setFilter] = useState('all');
  const items = [
    { id: 1, name: 'All Trips', category: 'A' },
    { id: 2, name: 'Business', category: 'B' },
    { id: 3, name: 'Other', category: 'C' },
    // Add more items here...
  ];

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <div>
      <Container>
        <Bubble onClick={() => setFilter('All Trips')}>
            <IconImage src={CarProfile} />
            All Trips
        </Bubble>


        <Bubble onClick={() => setFilter('Business')}>
        <IconImage src={Briefcase} />
            Business
        </Bubble>

        <Bubble onClick={() => setFilter('Other')}>
        <IconImage src={CarProfile} />
            Other
        </Bubble>
      </Container>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterableList;