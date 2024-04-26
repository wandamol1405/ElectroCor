import React from "react";
import styled from "styled-components";
import Card from "./card";

const Products = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
gap: 20px;
padding: 1rem;
background-color: #f4f4f4;
@media (min-width: 1080px) {
  width: 59vw;
`;

function ProductsContainer({ data = [] }) {
  return (
    <Products>
      {data.map((producto) => (
        <Card
          key={producto.id_product}
          title={producto.name}
          price={producto.price}
          img={producto.img}
          id={producto.id_product}
        />
      ))}
    </Products>
  );
}

export default ProductsContainer;
