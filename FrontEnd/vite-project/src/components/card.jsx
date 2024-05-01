import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import parsePrice from "../fuctions/parsePrice";

const Product = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 75vw;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  text-decoration: none;

  img {
    width: 8rem;
    height: 8rem;
  }
  .product-description {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    color: #4b484d;
  }
  .product-description h4 {
    font-size: 1.5rem;
  }

  @media (min-width: 1080px) {
    width: 15vw;
    flex-direction: column;
    align-items: center;

    .product-description h4 {
      font-size: 1.5rem;
    }
  }
`;

function Card({ title, price, img, id }) {
  return (
    <Product to={`/products/${id}`}>
      <img src={img} />
      <div className="product-description">
        <h1 style={{ fontSize: "1.4rem" }}>{title}</h1>
        <h4>${parsePrice(price)}</h4>
      </div>
    </Product>
  );
}

export default Card;
