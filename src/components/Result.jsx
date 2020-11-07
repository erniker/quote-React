import React from "react";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const Message = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;

const PriceResult = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;

const PriceText = styled.p`
  color: #00838f;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Result = ({ price }) => {
  return price === 0 ? (
    <Message>Elige marca, año, y tipo de seguro</Message>
  ) : (
    <PriceResult>
      <TransitionGroup component="span" className="result">
        <CSSTransition
          classNames="result"
          key={price}
          timeout={{ enter: 500, exit: 500 }}
        >
          <PriceText>
            El total es: € <span>{price}</span>{" "}
          </PriceText>
        </CSSTransition>
      </TransitionGroup>
    </PriceResult>
  );
};

Result.prototypes = {
  price: PropTypes.number.isRequired,
};

export default Result;
