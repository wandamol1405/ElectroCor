import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "../components/formInput";
import FormButton from "../components/formButton";
import { useNavigate } from "react-router-dom";
import useLogin from "../store/useLogin";
import Title from "../components/title";

const RegisterContainer = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  width: 95vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: auto;
  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .form,
  .name-surname,
  .birth-cp {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .form-content input {
    width: 40vw;
  }
  .form label, h2 {
    font-size: 1.1rem;
  }
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  button {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
  .error{
    font-size:1.25rem;
    color: red;
  }
  @media (min-width: 1080px) {
    width: 80vw;
    .form label,h2 {
      font-size: 1.5rem;
    }
    .form-content input {
      width: 42vw;
    }
    .form {
      gap: 2rem;
    }
    .name-surname,
    .birth-cp {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }
    .name-surname input,
    .birth-cp input {
      width: 20vw;
    }
  }
`;

function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFound = false;

    if (
      !user ||
      user.length < 5 ||
      !firstName ||
      !lastName ||
      !birthDate ||
      !postalCode
    ) {
      setErrors((prev) => ({
        ...prev,
        general: { message: "Falta completar campos requeridos" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        user: null,
      }));
    }

    if (!password || password.length < 5) {
      setErrors((prev) => ({
        ...prev,
        password: { message: "Ingrese una contraseña de 5 caracteres o más" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: null,
      }));
    }

    if (!email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: { message: "Ingrese una email valido" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: null,
      }));
    }

    if (errorFound) {
      return;
    }

    try {
      const newProduct = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        usuario: user,
        password: password,
        birth_date: birthDate,
        postal_code: postalCode,
        address: address
      };
      const response = await fetch("http://localhost:3000/users/register", {
        method: "post",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Ocurrió un error inesperado");
      }

      login(user);
      navigate("/");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: { message: "Credenciales invalidas" },
      }));

      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          form: null,
        }));
      }, 3000);
    }
  };
  return (
    <RegisterContainer>
      <Title><h1>Completa el formulario para registrarte</h1></Title>
      {errors.general && <h2 className="error">{errors.general.message}</h2>}
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="name-surname">
            <div className="form-content">
              <label for="first_name">Nombre:</label>
              <FormInput
                type="text"
                name="first_name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-content">
              <label for="last_name">Apellido:</label>
              <FormInput
                type="text"
                name="last_name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-content">
            <label for="email">E-mail:</label>
            <FormInput
              type="email"
              name="mail"
              placeholder="Ej: wandamol14@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-content">
            <label for="usuario">Usuario:</label>
            <FormInput
              type="text"
              name="usuario"
              placeholder="Ej: wandamol14"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="form-content">
            <label for="password">Contraseña:</label>
            <FormInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="form-content">
            <label for="address">Domicilio:</label>
            <FormInput
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="birth-cp">
            <div className="form-content">
              <label for="birth-date">Fecha de nacimiento:</label>
              <FormInput
                type="date"
                name="birth-date"
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="form-content">
              <label for="cp">Código postal:</label>
              <FormInput
                type="number"
                name="cp"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form">
          {" "}
          <FormButton type="submit">Registrarse</FormButton>
        </div>
      </form>
    </RegisterContainer>
  );
}

export default Register;
