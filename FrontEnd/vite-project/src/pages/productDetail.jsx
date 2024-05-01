import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import FormButton from "../components/formButton";
import useCartStore from "../store/useCart";
import parsePrice from "../fuctions/parsePrice";

const ProductDetailContainer = styled.section`
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10px;
  width: 75vw;
  padding: 2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Flex Normal";
  margin: auto;

  .product-img img {
    width: 50vw;
  }
  .product-general {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 5rem;
  }
  button {
    border-radius: 10px;
    border: 0;
    font-size: 1.5rem;
    padding: 1rem;

    color: #ffffff;
  }
  .product-detail {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
  }
  .toCart {
    background-color: #3a6ea5;
  }
  .toCart:hover {
    background-color: #3a7ea5;
  }
  button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1080px) {
    width: 80vw;
    padding: 4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5rem;
    .product-img img {
      width: 30vw;
    }
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addItem } = useCartStore();

  useEffect(() => {
    async function getProducts() {
      const result = await fetch("http://localhost:3000/products/" + id);
      const response = await result.json();
      setProduct(response.data);
    }
    getProducts();
  }, []);
  
  return (
    <ProductDetailContainer>
      <div className="product-img">
        <img src={product?.img} />
      </div>
      <div className="product-general">
        <div className="product-detail">
          <h1 style={{ fontSize: "1.7rem" }}>{product?.name}</h1>
          <h2 style={{ fontSize: "2rem" }}>${parsePrice(product?.price)}</h2>
        </div>
          <FormButton
            onClick={() => {
              addItem(product);
            }}
            className="toCart"
          >
            <Link
              to={"/cart"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Agregar al carrito
            </Link>
          </FormButton>
          <div className="product-detail">
            <h4 style={{ fontSize: "2rem", textAlign: "center" }}>
              Especificaciones
            </h4>
            <p style={{ fontSize: "1.5rem" }}>
              {product?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
            </p>
          </div>
      </div>
    </ProductDetailContainer>
  );
}

export default ProductDetail;
