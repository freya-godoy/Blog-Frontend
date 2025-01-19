import React from "react";
import { useState, useEffect } from "react";
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import Listado from "./Listado";
import { useParams } from "react-router-dom";

const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos, cargando } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
    setCargando(false);
    console.log(articulo);
  };

  return (
    <div className="jumbo">
      {cargando ? (
        "Cargando..."
      ) : (
        <>
          <div className="mascara">
            {articulo.imagen != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen}></img>
            )}
            {!articulo.imagen == "default.png" && (
              <img src="https://i0.wp.com/puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg?resize=768%2C511&ssl=1"></img>
            )}
          </div>
          <h1>{articulo.titulo}</h1>
          <span>{articulo.fecha}</span>
          <p>{articulo.contenido}</p>
        </>
      )}
    </div>
  );
};

export default Articulo;
