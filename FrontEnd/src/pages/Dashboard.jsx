import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TopBar from "../Components/TopBar/TopBar"

import dashboard from '../Images/dashboard.png'
import MonthYearPicker from '../Components/MonthYearPicker'
import ChevronRightIco from '../Icons/ChevronRightIco'
import TripsIco from '../Icons/TripsIco'

const Container = styled.div`
    width: auto;
    height: 75vh;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 16px 20px;
    overflow: auto;
`
const MonthYearWrapper = styled.div`
  padding: 10px;
`
const SummaryWrapper = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Tile = styled.div`
  width: 29%;
  display: flex;
  flex-direction: column;
  background-color: #F3F6FF;
  border-radius: 16px;
`
const TileText = styled.div`
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: #2D3648;
  font-size: x-large;
`
const TileDesc = styled.div`
  color: #2D3648;
  font-size: small;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`
const ImgageCardWrapper = styled.div`
  width: 96%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const DashImage = styled.img`
  width: 100%;
`
const CardWrapper = styled.div`
  width: 92%;
  background-color: #F3F6FF;
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-radius: 16px;
  justify-content: space-around;
  margin: 2%;
`
const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TextBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`
const IconTripWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const IconWrapper = styled.div`
  padding: 5px;
`
const ManageWrapper = styled.div`
  padding: 5px;
  font-size: large;
  
`
const TextDesc = styled.div`
  font-size: medium;
  font-weight: 300;
`
const LearnMore = styled.div`
  padding-top: 10px;
  color: #009479;
  text-decoration: underline;
`

const Dashboard = () => {

  const [dateFilter, setDateFilter] = useState(
    { 
      month: (new Date()).getMonth(), 
      year: (new Date()).getFullYear()
    }
  )

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`${base_api_url}/expense`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${gian}`
        }
      })
      if (!res.ok) {
        throw new Error("Failed to fetch")
      }
      setTrips(await res.json());
      setLoading(false);
    })()
  }, [])

  return (
    <>
      <TopBar headerTitle="Welcome, Emily" />
      <Container>
        <MonthYearWrapper>
          <MonthYearPicker setDateFilter={setDateFilter}/>
        </MonthYearWrapper>
        <SummaryWrapper>
          <Tile>
            <TileText>50</TileText>
            <TileDesc>Miles Driven</TileDesc>
          </Tile>
          <Tile>
            <TileText>17</TileText>
            <TileDesc>Total Trips</TileDesc>
          </Tile>
          <Tile>
            <TileText>$50</TileText>
            <TileDesc>Logged</TileDesc>
          </Tile>
        </SummaryWrapper>
        <ImgageCardWrapper>
          <DashImage src={dashboard}/>
          <CardWrapper>
            <TextBlockWrapper>
              <IconTripWrapper>
                <IconWrapper>
                  <TripsIco />
                </IconWrapper>
                <ManageWrapper>
                  Manage trips
                </ManageWrapper>
              </IconTripWrapper>
              <TextDesc>
                At tax time, you can claim a standard mileage rate for every mile driven
              </TextDesc>
              <LearnMore>
                Learn More
              </LearnMore>
            </TextBlockWrapper>
            <ArrowWrapper>
              <ChevronRightIco />
            </ArrowWrapper>
          </CardWrapper>
          <CardWrapper>
            <TextBlockWrapper>
              <IconTripWrapper>
                <IconWrapper>
                  <TripsIco />
                </IconWrapper>
                <ManageWrapper>
                  Manage expenses
                </ManageWrapper>
              </IconTripWrapper>
              <TextDesc>
                Keep track of expenses, such as parking, tolls, and registration fees
              </TextDesc>
              <LearnMore>
                Learn More
              </LearnMore>
            </TextBlockWrapper>
            <ArrowWrapper>
              <ChevronRightIco />
            </ArrowWrapper>
          </CardWrapper>
        </ImgageCardWrapper>

      </Container>
    </>

  )
}

export default Dashboard

