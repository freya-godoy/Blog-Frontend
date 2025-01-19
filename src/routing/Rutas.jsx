import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Inicio from "../components/pages/Inicio";
import Articulos from "../components/pages/Articulos";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Crear from "../components/pages/Crear";
import Busqueda from "../components/pages/Busqueda";
import Articulo from "../components/pages/Articulo";
import Editar from "../components/pages/Editar";
export const Rutas = () => {
  return (
    <BrowserRouter>
      {/*LAYOUT*/}
      <Header></Header>
      <Nav></Nav>
      {/** Contenido central y navegacion */}
      <section id="constent" className="content">
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/inicio" element={<Inicio />}></Route>
          <Route path="/articulos" element={<Articulos />}></Route>
          <Route path="/crear-articulos" element={<Crear />}></Route>
          <Route path="/buscar/:busqueda" element={<Busqueda />}></Route>
          <Route path="/articulo/:id" element={<Articulo/>}></Route>
          <Route path="/editar/:id" element={<Editar/>}></Route>

          <Route
            path="*"
            element={
              <div className="jumbo">
                <h1>Error 404</h1>
              </div>
            }
          ></Route>
        </Routes>
      </section>
      <Sidebar></Sidebar>
      <Footer></Footer>
    </BrowserRouter>
  );
};
