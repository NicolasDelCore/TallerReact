import React from 'react';
import {Link , Outlet} from "react-router-dom";
import Countdown from './Countdown';
import ListarRegistroComidas from "./ListarRegistrosComidas"
import { estadoLogin } from '../slices/usuarioLogueadoSlice';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import IngresarAlimentos from "./IngresarAlimentos";
import CaloriasDiarias from './CaloriasDiarias';
import CaloriasTotales from './CaloriasTotales';
import Analisis from "./Analisis";
import UsuariosPorPais from "./UsuariosPorPais";
import ScrollToTopButton from "./ScrollToTopButton";

const Alimentos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
	  dispatch( estadoLogin() ); //Chequear si hay usuario logueado y actualizar menú
	}, [dispatch]);

  const usuarioLogueado = useSelector( state => state.usuarioLogueado.existe );
  //console.log(usuarioLogueado);
    
  return (
    <>
        {(usuarioLogueado) ? 
          <>
          <ScrollToTopButton/>
            <UsuariosPorPais />
            <IngresarAlimentos />
            <ListarRegistroComidas />
            <Analisis/>
            <CaloriasDiarias />
            <CaloriasTotales />
            <div>
            <Countdown targetDate="2024-03-31T00:00:00" />
            </div>
          </>
        : <div>Debe iniciar sesión, buen señor/a</div>}
        <Outlet />
    </>
  )
}

export default Alimentos