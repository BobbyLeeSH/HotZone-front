import React from "react";
import styled from "styled-components";

const FieldContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;
  justify-content: flex-start;
`;

const DisplayField = styled.div`
  display: flex;
  width: 300px;
  justify-content: flex-start;
  padding-bottom: 5px;
`;
const FieldDisplay = ({field, value}) => {
  return (
    <FieldContainer>
      <DisplayField>{field}:</DisplayField>
      <DisplayField>{value}</DisplayField>
    </FieldContainer>
  )
}

export default FieldDisplay;
