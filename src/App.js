import React, { useState } from "react";
import Header from "./components/Header";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Summary from "./components/Summary";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 3rem;
`;

function App() {
  const [summary, saveSummary] = useState({
    price: 0,
    data: {
      marca: "",
      year: "",
      plan: "",
    },
  });

  const [loading, setLoading] = useState(false);

  // Extraer datos
  const { price, data } = summary;
  return (
    <Container>
      <Header title="Cotizador de seguros" />
      <FormContainer>
        <Form saveSummary={saveSummary} setLoading={setLoading} />

        {loading ? <Spinner /> : null}

        <Summary data={data} />

        {!loading ? <Result price={price} /> : null}
      </FormContainer>
    </Container>
  );
}

export default App;
