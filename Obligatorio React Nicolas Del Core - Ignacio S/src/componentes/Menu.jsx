import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Registro from "./Registro";
import Login from "./Login";
import Logout from "./Logout";
import { estadoLogin } from "../slices/usuarioLogueadoSlice";
import { Link, Outlet } from "react-router-dom";
//import Tostadora from "./Tostadora";

const Menu = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(estadoLogin()); //Chequear si hay usuario logueado y actualizar menú
  }, [dispatch]);

  const usuarioLogueado = useSelector((state) => state.usuarioLogueado.existe);
  const usuarioNombre = useSelector((state) => state.usuarioLogueado.nombre);

  return (
    <>
    <div className="container-fluid" id="headerMenu">
      <div className="row ">
      { (usuarioLogueado) ?
        <ul className="nav nav-tabs bg-dark p-2 justify-content-between">
          
          <li className="nav-item ">
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-text">
                  <span>Bienvenido <span className="text-light">{usuarioNombre}</span> !</span>
                </span>
              </div>
            </nav>
          </li>
          <li className="nav-item ">
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-text">
                  <nav><a href="#inicioGraficas" className="text-decoration-none"><span >Graficas</span></a></nav>
                  
                </span>
              </div>
            </nav>
          </li>
          <li className="nav-item ">
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-text">
                  <nav><a href="#inicioMapa" className="text-decoration-none"><span>Mapa</span></a></nav>
                  
                </span>
              </div>
            </nav>
          </li>
          <li className="nav-item ">
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-text">
                  <nav><a href="#inicioMisc" className="text-decoration-none"><span>Misc.</span></a></nav>
                  
                </span>
              </div>
            </nav>
          </li>
          <li className="nav-item">
            <Logout />
          </li>
        </ul>
      : 
        <ul className="nav nav-tabs bg-dark p-2">
          <li className="nav-item">
            <Registro />
          </li>
          <li className="nav-item">
            <Login />
          </li>
          <hr /> <br />
          <Outlet />
        </ul>
      }
      </div>
    </div>
      
    </>
  );
}

export default Menu;
