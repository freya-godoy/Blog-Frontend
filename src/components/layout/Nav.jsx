import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
       {/* <!--Barra de navegación--> */}
       <nav className="nav">
            <ul>
                <li><NavLink to="/inicio">Inicio</NavLink></li>
                <li><NavLink to="/articulos">Articulos</NavLink></li>
                <li><NavLink to="/crear-articulos">Crear Articulos</NavLink></li>
                <li><a href='#'>Contacto</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Nav
