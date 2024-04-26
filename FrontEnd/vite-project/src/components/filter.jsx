import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "./formButton";

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
  
  input, select{
    width:7vw;
    padding: 0.9rem;
    background-color: #E6E2E4;
    border-radius: 30px;
    border: 1px solid #C0C0C0;
    font-size: 0.9rem;
  }
  .order{
    display:flex;
    flex-direction: column-reverse;
  }
  label{
    font-size: 0.7rem;
  }

  @media (min-width: 1080px) {
    input, select{
      width:13vw;
    }
    label{
      font-size: 1rem;
    }
  }
`;

const getCategories = async () => {
  const response = await fetch("http://localhost:3000/category");
  const data = await response.json();
  console.log(data);
  return data;
};

function Filter({ handleSearch }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(name, price, category, order);
  }

  useEffect(() => {
    getCategories().then((response) => setCategories(response.data));
    console.log(categories);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <FilterContainer>
        <div>Filtro</div>
        <input
          style={formInputsStyles}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Buscar nombre"
        />
        <input
          style={formInputsStyles}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Bucar precio"
        />
        <select
          style={formInputsStyles}
          name="categorys"
          id="categorys"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          defaultValue={"select"}
        >
          <option value="select" disabled>
            Selecciona una categoria
          </option>
          {categories.map((c) => {
            return (
              <option value={c.id_category} key={c.id_category}>
                {c.name}
              </option>
            );
          })}
        </select>
        <div className="order">
        <input
          type="checkbox"
          checked={order}
          onChange={() => setOrder((prev) => !prev)}
        />
        <label>
          Ordenar alfabeticamente
        </label>
        </div>
        <FormButton>Buscar</FormButton>
      </FilterContainer>
    </form>
  );
}

export default Filter;
