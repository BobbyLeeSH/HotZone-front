import React, {useLayoutEffect, useState} from "react";

import axios from "axios";
import styled from "styled-components";

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
  background-color: #61dafb;
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
  return (
    <ContainerWrapper>
      <MainContainer>
        <h1>this is case detail page</h1>
        {cases.map((cases, index) => (
          <div key={index}>
            <h3>{cases.id}</h3>
            <h3>{cases.patient.name}</h3>
            <h3>{cases.patient.date_of_birth}</h3>
            <h3>{cases.virus.name}</h3>
            <h3>{cases.origin}</h3>
            <h3>{cases.confirmed_date}</h3>
          </div>
        ))}
      </MainContainer>

    </ContainerWrapper>
  )
};

export default Case;