import React, {useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const MainContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  max-width: 1080px;
  width: 100%;
  background-color: #61dafb;
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
const Case = () => {
  const [cases, setCases] = useState([]);
  useLayoutEffect(() => {
    axios.get(
      `http://localhost:8000/cases/`
    ).then(res => {
      console.log(res.data)
      setCases(res.data);
    }).catch(err =>
      console.log(err)
    )
  }, [])
  const history = useHistory();
  const handleRowClick = (case_id) => {
    history.push(`/cases/${case_id}`);
  }
  return (
    <ContainerWrapper>
      <MainContainer>
        <HeaderDiv>HOTZONE</HeaderDiv>
        <TitleDiv>Case list</TitleDiv>
        <LocationTable>
          <thead>
          <tr>
            <LocationTh>case ID</LocationTh>
            <LocationTh>patient name</LocationTh>
            <LocationTh>DoB</LocationTh>
            <LocationTh>virus</LocationTh>
            <LocationTh>origin</LocationTh>
            <LocationTh>confirmed date</LocationTh>
          </tr>
          </thead>
          <tbody>
          {cases.map((cases, index) => (
            <tr key={index} onClick={()=> handleRowClick(cases.id)}>
              <LocationTd>{cases.id}</LocationTd>
              <LocationTd>{cases.patient.name}</LocationTd>
              <LocationTd>{cases.patient.date_of_birth}</LocationTd>
              <LocationTd>{cases.virus.name}</LocationTd>
              <LocationTd>{cases.origin}</LocationTd>
              <LocationTd>{cases.confirmed_date}</LocationTd>
            </tr>
          ))}
          </tbody>
        </LocationTable>

      </MainContainer>

    </ContainerWrapper>
  )
};

export default Case;