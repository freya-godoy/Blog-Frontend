import React from "react";
import { useState,useEffect } from "react";
import {useParams}  from "react-router-dom";
import useForm from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";


const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);
  const conseguirArticulo = async () => {
    const { datos} = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  };

  const editarArticulo = async (e) => {
    e.preventDefault();
    //Recoger datos formulario
    let nuevoArticulo = formulario;

    //Guardar articulos en el backend
    const { datos } = await Peticion(
      Global.url + "/articulo/"+params.id,
      "PUT",
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
      <h1>Editar articulo:</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>{resultado == "guardado" ? "Articulo guardado!!" : ""}</strong>
      <strong>
        {resultado == "error"
          ? "los datos proporcionados son incorrectos!!"
          : ""}
      </strong>
      {/* Montar el Formulario */}
      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">
            {articulo.imagen != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen}></img>
            )}
            {!articulo.imagen == "default.png" && (
              <img src="https://i0.wp.com/puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg?resize=768%2C511&ssl=1"></img>
            )}
          </div>
          <input type="file" id="file" name="file0" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Editar;
