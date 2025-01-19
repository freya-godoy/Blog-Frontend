import React from "react";
import { useState, useEffect } from "react";
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import Listado from "./Listado";
import { useParams } from "react-router-dom";

const Busqueda = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulos();
  }, []);

  useEffect(() => {
    conseguirArticulos();
  }, [params]);

  const conseguirArticulos = async () => {
    const { datos, cargando } = await Peticion(Global.url + "buscar/" + params.busqueda, "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }else{
        setArticulos([]);
    }
    setCargando(false);
  };

  return (
    <>
      {cargando ? (
        "Cargando..."
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos}></Listado>
      ) : (
        <h1>No hay articulos</h1>
      )}
    </>
  );
};

export default Busqueda;

