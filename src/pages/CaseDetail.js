import React, {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FieldDisplay from "../components/FieldDisplay";

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  max-width: 1080px;
  width: 100%;
  height: 100vh;
  background-color: #c6c6c6;
  padding: 0 10px;
`;

const HeaderDiv = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
`;

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  font-size: 2rem;
  justify-content: flex-start;
  font-weight: 800;
  padding-top: 20px;
`;

const LocationTable = styled.table`
  width: 100%;
  border: 1px solid black;
`;

const LocationTh = styled.th`
  border: 1px solid black;
`;

const LocationTd = styled.td`
  border: 1px solid black;
  text-align: center;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.5rem;
  padding: 5px;
`;

const SearchLabel = styled.span`
  width: 20%;
`;

const SearchInput = styled.input`
  width: 55%;
`;

const SearchButton = styled.button`
  width: 20%;
`;

const DetailInput = styled.input`
  width: 95%;
`;

const AddButton = styled.button`
  width: 150px;
  font-size: 1.5rem;
  padding: 5px;
  margin-top: 10px;
`;

const CaseDetail = () => {
  const [singleCase, setSingleCase] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");
  const [update, setUpdate] = useState(0)


  const {caseId} = useParams();
  useLayoutEffect(() => {
    axios.get(
      `https://stark-woodland-81700.herokuapp.com/cases/${caseId}/`
    ).then(res => {
      setSingleCase(res.data);
    }).catch(err =>
      console.log(err)
    )
  }, [caseId, update])

  const searchLocation = (e) => {
    e.preventDefault();
    axios.get(
      `https://stark-woodland-81700.herokuapp.com/locations/search/${searchInput}/`
    ).then(res => {
      setSearchResult(res.data)
    }).catch(err => {
      alert("an error has occurred")
    })
  };

  const addCaseLocation = (e) => {
    e.preventDefault();
    axios.post(
      `https://stark-woodland-81700.herokuapp.com/case-locations/`,
      {
        id: 0,
        date_from: dateFrom,
        date_to: dateTo,
        category: category,
        location: searchResult.id,
        case: singleCase.id
      }
    ).then(res => {
      alert("Visited location is successfully added!")
      setUpdate(up => up+1)
      setCategory("")
      setDateFrom("")
      setDateTo("")
      setSearchResult(null)
      setSearchInput("")

    }).catch(err => {
      alert("an error has occurred")
    })
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleDateFromInputChange = (e) => {
    const value = e.target.value;
    setDateFrom(value);
  };

  const handleDateToInputChange = (e) => {
    const value = e.target.value;
    setDateTo(value);
  };

  const handleCategoryInputChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  return (
    <ContainerWrapper>
      <MainContainer>
        <HeaderDiv>HOTZONE</HeaderDiv>
        <TitleDiv>Case Information</TitleDiv>
        <FieldDisplay
          field="case ID"
          value={singleCase.id}
        />
        <FieldDisplay
          field="date confirmed"
          value={singleCase.confirmed_date}
        />
        <FieldDisplay
          field="Origin"
          value={singleCase.origin}
        />

        <TitleDiv>Patient Info</TitleDiv>
        <FieldDisplay
          field="name"
          value={singleCase.patient ? singleCase.patient.name : null}
        />
        <FieldDisplay
          field="date of birth"
          value={singleCase.patient ? singleCase.patient.date_of_birth : null}
        />
        <FieldDisplay
          field="virus"
          value={singleCase.virus ? singleCase.virus.common_name : null}
        />

        <TitleDiv>Visited Locations</TitleDiv>
        <LocationTable>
          <thead>
          <tr>
            <LocationTh>Location</LocationTh>
            <LocationTh>Address</LocationTh>
            <LocationTh>X Coord</LocationTh>
            <LocationTh>Y Coord</LocationTh>
            <LocationTh>Date From</LocationTh>
            <LocationTh>Date To</LocationTh>
            <LocationTh>category</LocationTh>
          </tr>
          </thead>
          <tbody>
          {singleCase.case_locations ? singleCase.case_locations.map((location, index) => (
            <tr key={index}>
              <LocationTd>{location.location.name}</LocationTd>
              <LocationTd>{location.location.address}</LocationTd>
              <LocationTd>{location.location.x_coord}</LocationTd>
              <LocationTd>{location.location.y_coord}</LocationTd>
              <LocationTd>{location.date_from}</LocationTd>
              <LocationTd>{location.date_to}</LocationTd>
              <LocationTd>{location.category}</LocationTd>
            </tr>
          )) : null}
          </tbody>
        </LocationTable>

        <TitleDiv>Add New Visited Locations</TitleDiv>
        <SearchDiv>
          <SearchLabel>Location to search:</SearchLabel>
          <SearchInput
            onChange={handleSearchInputChange}
            value={searchInput}
          />
          <SearchButton
            type="button"
            onClick={searchLocation}>Search</SearchButton>
        </SearchDiv>
        <LocationTable>
          <thead>
          <tr>
            <LocationTh>Location</LocationTh>
            <LocationTh>Address</LocationTh>
            <LocationTh>X Coord</LocationTh>
            <LocationTh>Y Coord</LocationTh>
            <LocationTh>Date From</LocationTh>
            <LocationTh>Date To</LocationTh>
            <LocationTh>category</LocationTh>
          </tr>
          </thead>
          <tbody>
          {searchResult ?
            (
              <tr>
                <LocationTd>{searchResult.name}</LocationTd>
                <LocationTd>{searchResult.address}</LocationTd>
                <LocationTd>{searchResult.x_coord}</LocationTd>
                <LocationTd>{searchResult.y_coord}</LocationTd>
                <LocationTd>
                  <DetailInput
                    onChange={handleDateFromInputChange}
                  />
                </LocationTd>
                <LocationTd>
                  <DetailInput
                    onChange={handleDateToInputChange}
                  />
                </LocationTd>
                <LocationTd>
                  <DetailInput
                    onChange={handleCategoryInputChange}
                  />
                </LocationTd>
              </tr>
            ) : null}

          </tbody>
        </LocationTable>
        <AddButton
          type="button"
          onClick={addCaseLocation}>Add</AddButton>
      </MainContainer>
    </ContainerWrapper>
  )
};

export default CaseDetail;