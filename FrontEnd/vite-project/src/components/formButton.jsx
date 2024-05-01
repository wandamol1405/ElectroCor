import styled from "styled-components";

const FormButton = styled.button`
  padding: 0.8rem 1rem;
  background-color: #004E98;
  color: #EBEBEB;
  border: 0;
  border-radius: 7px;
  font-size: 1rem;
  align-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #006e98;
    color: white;
  }
`;

export default FormButton;