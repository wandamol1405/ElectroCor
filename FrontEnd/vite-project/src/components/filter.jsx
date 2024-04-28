import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "./formButton";
import FormInput from "./formInput";

const formInputsStyles = { borderRadius: "5px", padding: "0.3rem" };
const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 75vw;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: "Roboto Flex Normal";
  color: #4b484d;
  font-size: 1.3rem;

  select {
    padding: 1rem;
    background-color: #e6e2e4;
    border-radius: 30px;
    border: 1px solid #c0c0c0;
    font-size: 1.2rem;
    margin: 0.5rem;
  }
  .order {
    display: flex;
    flex-direction: column-reverse;
  }
  label {
    font-size: 0.7rem;
  }
  button{
    font-size: 1.2rem;
  }

  @media (min-width: 1080px) {
    width: 58vw;
    input,
    select {
      width: 10vw;
      padding: 0.9rem;
    }
    label {
      font-size: 1rem;
    }
  }
`;

const getCategories = async () => {
  const response = await fetch("http://localhost:3000/category");
  const data = await response.json();
  return data;
};

function Filter({ handleSearch }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    getCategories().then((response) => setCategories(response.data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(name, price, category, order);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FilterContainer>
        <div>Filtro</div>
        <FormInput
          style={formInputsStyles}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Buscar nombre"
        />
        <FormInput
          style={formInputsStyles}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Buscar precio"
        />
        <select
          style={formInputsStyles}
          name="categorys"
          id="categorys"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="0">Selecciona una categoría</option>
          {categories.map((c) => (
            <option value={c.id_category} key={c.id_category}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="order">
          <input
            type="checkbox"
            checked={order}
            onChange={() => setOrder((prev) => !prev)}
          />
          <label>Ordenar alfabéticamente</label>
        </div>
        <FormButton>Buscar</FormButton>
      </FilterContainer>
    </form>
  );
}

export default Filter;
