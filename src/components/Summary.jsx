import React from "react";
import styled from "@emotion/styled";
import { capitalize } from "../Helper";
import PropTypes from "prop-types";

const SumaryContainer = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Summary = ({ data }) => {
  const { marca, year, plan } = data;

  if (marca === "" || year === "" || plan === "") return null;
  return (
    <SumaryContainer>
      <h2>Resumen cotización</h2>
      <ul>
        <li>Marca: {capitalize(marca)}</li>
        <li>Plan: {capitalize(plan)}</li>
        <li>Año del automovil: {year}</li>
      </ul>
    </SumaryContainer>
  );
};

Summary.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Summary;
