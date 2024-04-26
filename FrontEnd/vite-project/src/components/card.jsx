import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Product = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 75vw;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;

  img {
    width: 8rem;
    height: 8rem;
  }
  .product-description {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .product-description h4 {
    font-size: 1.5rem;
  }

  @media (min-width: 1080px) {
    width: 15vw;
    flex-direction: column;
    align-items: center;

    .product-description h4 {
      font-size: 1.3rem;
    }
  }
`;

const TitleLinked = styled(Link)`
font-size: 1.4rem;
@media (min-width: 1080px) {
  font-size: 1.1rem;
}
`;

function Card({ title, price, img, id }) {
  return (
    <Product>
      <img src={img} />
      <div className="product-description">
        <TitleLinked to={`/products/${id}`}>{title}</TitleLinked>
        <h4>${price}</h4>
      </div>
    </Product>
  );
}

export default Card;
