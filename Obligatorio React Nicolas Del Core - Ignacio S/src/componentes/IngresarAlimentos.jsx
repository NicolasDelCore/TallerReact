import ObtenerOpcionesComidas from "./ObtenerOpcionesComidas";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tostadora from "./Tostadora";
import { guardarComidasIngresadas } from "../slices/comidasIngresadasSlice";

const IngresarAlimentos = () => {
  const urlBase = useSelector((state) => state.urlBase.url);
  const [sufijo, setSufijo] = useState("");
  const selectIngresoAlimentos = useRef("");
  const cantidadAlim = useRef("");
  const fecha = useRef("");
  const dispatch = useDispatch();

  //Manejo de tostadas
  const [mensajeTostada, setMensajeTostada] = useState(""); // Mensaje de la tostada
  const [tostadaKey, setTostadaKey] = useState(""); // Key de la tostada

  //obtenerSufijo en la primer carga del componente: evento onLoad, obtenerSufijo luego de cada selección: evento onChange
  const obtenerSufijo = () => {
    let selectedOpt =
      selectIngresoAlimentos.current[
        selectIngresoAlimentos.current.value
      ].getAttribute("sufijo");
    setSufijo(selectedOpt); //console.log(selectedOpt);
  };

  const agregarRegistroFetch = () => {
    let userId = localStorage.getItem("id");
    let alimSeleccionado = selectIngresoAlimentos.current.value;
    //Manejo de errores:
    try {
      if (!userId) throw new Error("Por favor, vuelva a iniciar sesión.");
      if (cantidadAlim.current.value <= 0)
        throw new Error("Cantidad debe ser mayor a 0.");
      if (alimSeleccionado === "-1")
        throw new Error("Debe seleccionar un alimento.");
      if (fecha.current.value === "" || fecha.current.value === null)
        throw new Error("Debe seleccionar una fecha, no mayor al día de hoy.");
      let fechaHoy = new Date();
      let fechaIngresada = new Date(`${fecha.current.value}\n`); //NOTA: NO SÉ POR QUÉ, pero esta \n es la única forma "prolija" que el new Date no me reste un día a la fecha... https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
      if (fechaIngresada > fechaHoy)
        throw new Error(
          "Ud. no puede viajar en el tiempo. Por favor, seleccione una fecha decente."
        );

      //FETCH
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("apikey", localStorage.getItem("apiKey"));
      myHeaders.append("iduser", userId);

      let raw = JSON.stringify({
        idAlimento: alimSeleccionado,
        idUsuario: userId,
        cantidad: cantidadAlim.current.value,
        fecha: fechaIngresada,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${urlBase}/registros.php`, requestOptions)
        .then((response) => response.json())
        //.then(result => console.log(result.mensaje))
        .then((result) => {
          if (result.codigo === 200) {
            //console.log (result)
            setMensajeTostada(result.mensaje);
            setTostadaKey("IngresarAlimentos" + Date.now());
            //recarga();
            dispatch(guardarComidasIngresadas(result.idRegistro));
          }
        })
        .catch((error) => console.log("error", error));
      //FALTA MANEJO DE RESPUTAS HTTP (401, 404, 500, etc)
    } catch (error) {
      setMensajeTostada(error.message);
      setTostadaKey("IngresarAlimentos" + Date.now());
    }
  };

  return (
    <>
      {/*Renderizado de la tostadora*/}
      {
        <Tostadora
          titulo="INGRESO DE ALIMENTOS"
          mensaje={mensajeTostada}
          tostKey={tostadaKey}
          id={"tostadoraIngresoAlimento"}
        />
      }

      {/*Renderizado del componente*/}
      <div className="container">
        <div className="row pb-3 pt-3 src/componentes/Menu.jsx">
          <h2 className="text-center">Registrar comidas</h2>
        </div>
        <div className="row ">
          <input type="number" id="cantidadAlimento" ref={cantidadAlim} placeholder="Ingrese Cantidad"  className="col-2"/>
          <span key="unidadAlimento" id="unidadAlimento" className="col-1">
            {sufijo}
          </span>
             <input type="date" id="fechaAlimento" ref={fecha} className="col-2 offset-2"/>
          <select
            name="selectIngresoAlimentos"
            className="col-2 offset-3 "
            defaultValue="-1"
            id="selectIngresoAlimentos"
            ref={selectIngresoAlimentos}
            onChange={obtenerSufijo}
            onLoad={obtenerSufijo}
          >
            <option disabled hidden value="-1">
              Seleccione alimento
            </option>
            <ObtenerOpcionesComidas />
          </select>
          </div>
          <div className="row justify-content-center p-2">
          <input
            type="button"
            value="Registrar Alimento"
            id="btnRegistroAlimento"
            onClick={agregarRegistroFetch}
            className="btn btn-outline-secondary col-4"
          />
          </div>
          
        
      </div>
    </>
  );
};

export default IngresarAlimentos;
