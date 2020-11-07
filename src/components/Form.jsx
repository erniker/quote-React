import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { getYearDiference, calculateBrand, getPlan } from "../Helper";

const Field = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  --webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = ({ saveSummary, setLoading }) => {
  const [data, setData] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState(false);

  // Extraer valores del state
  const { marca, year, plan } = data;

  // Leer datos del form y colocarlos en el stage
  const getInformation = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    // Una base de 2000
    let result = 2000;

    // Obtener la diferencia de años
    const diference = getYearDiference(year);

    // Por cada año hay que restar el 3% al valor base
    result -= (diference * 3 * result) / 100;

    // Americano 15%
    // Asiatico 5%
    // Europeo 30%
    result = calculateBrand(marca) * result;

    // Plan Básico aumenta 20%
    // Plan Completo aumentan 50%
    const incrementPlan = getPlan(plan);
    result = parseFloat(incrementPlan * result).toFixed(2);

    // cargar spinner
    setLoading(true);

    setTimeout(() => {
      // Eliminar spinner
      setLoading(false);

      // Pasar informacion al componente principal
      saveSummary({
        price: Number(result),
        data,
      });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Field>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={getInformation}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Field>

      <Field>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={getInformation}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Field>
      <Field>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={getInformation}
        />
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={getInformation}
        />
        Completo
      </Field>
      <Button type="submit">Cotizar</Button>
    </form>
  );
};

Form.propTypes = {
  saveSummary: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Form;
