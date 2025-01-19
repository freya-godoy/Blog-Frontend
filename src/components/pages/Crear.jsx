import React from "react";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

const Crear = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();
    //Recoger datos formulario
    let nuevoArticulo = formulario;

    //Guardar articulos en el backend
    const { datos } = await Peticion(
      Global.url + "crear",
      "POST",
      nuevoArticulo
    );
    if (datos.status === "success") {
      setResultado("guardado");

      // Subir imagen
      const fileInput = document.querySelector("#file");

      const formData = new FormData();
      formData.set("file0", fileInput.files[0], fileInput.files[0].name);

      const subida = await Peticion(
        Global.url + "subir-imagen/" + datos.articulo._id,
        "POST",
        formData,
        true
      );

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear articulo:</h1>
      <p>Formulario para crear articulo</p>

      <strong>{resultado == "guardado" ? "Articulo guardado!!" : ""}</strong>
      <strong>
        {resultado == "error"
          ? "los datos proporcionados son incorrectos!!"
          : ""}
      </strong>
      {/* Montar el Formulario */}
      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            value={formulario.titulo || ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            name="contenido"
            onChange={cambiado}
            value={formulario.contenido || ""}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" id="file" name="file0" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Crear;
