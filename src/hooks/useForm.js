import { useState } from "react";

const useForm = (objetoInicial = {}) => {
  const [formulario, setFormulario] = useState(objetoInicial);

  const serializarFormulario = (formulario) => {
    const formData = new formData(formulario);
    const objetoCompleto = {};
    for (let [name, value] of formData) {
      objetoCompleto[name] = value;
      return objetoCompleto;
    }
  };

  const enviado = (e) => {
    e.preventDefault();
    console.log("preventDeFault");

    let curso = serializarFormulario(e.target);

    setFormulario(curso);
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };
  return {
    formulario,
    enviado,
    cambiado
  };
};

export default useForm;
