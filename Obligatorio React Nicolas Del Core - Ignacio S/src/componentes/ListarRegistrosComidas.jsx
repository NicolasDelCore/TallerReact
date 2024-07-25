import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tostadora from "./Tostadora";
import Analisis from "./Analisis";
import { guardarComidasRegistradas } from "../slices/comidasRegistradasSlice";
import UsuariosPorPais from "./UsuariosPorPais";
import BorrarRegistrosComidas from "./BorrarRegistrosComidas";

const ListarRegistrosComidas = () => {
  const urlBase = useSelector((state) => state.urlBase.url);
  const urlImagenes = useSelector((state) => state.urlBase.urlImg);

  const [mensajeTostada, setMensajeTostada] = useState(""); // Tostada mensaje
  const [tostadaKey, setTostadaKey] = useState(""); // Tostada key
  const [arrayRegistros, setArrayRegistros] = useState([]); //Guarda todos los registros en memoria (por si el filtro de fecha se limpia, para ahorrar fetch)
  const [arrayFiltradoFecha, setArrayFiltradoFecha] = useState([]); //Guarda los registros filtrados por fecha en memoria

  const dispatch = useDispatch();

  const comidasDelEstado = useSelector(state => state.comidas.comidas); //Todas las comidas de la API
  //const comidasRegistradasDelEstado = useSelector(state => state.comidasRegistradas.comidasRegistradas); //Comidas registradas por el usuario
  const comidasIngresadasAlEstado = useSelector(state => state.comidasIngresadas.comidasIngresadas); //Cada vez que el usuario agrega comida
  const comidasBorradasDeEstado = useSelector(state => state.comidasBorradas.comidasBorradas); //Comidas vez que el usuario borra comida

  //Actualización cada vez que el usuario borra o registra una comida
  useEffect(() => {
    comidasRegistradasPorUsuario();
  }, [comidasIngresadasAlEstado, comidasBorradasDeEstado]);

  const comidasRegistradasPorUsuario = () => {
    let userId = localStorage.getItem("id");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("apiKey"));
    myHeaders.append("iduser", userId);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${urlBase}/registros.php?idUsuario=${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(guardarComidasRegistradas(result.registros));
        setArrayRegistros(result.registros);
        setArrayFiltradoFecha(result.registros); // Configuramos el filtro por fecha con los registros completos primero
      })
      .catch((error) => {
        console.log("ListarRegistrosComidas error: ", error);
        setMensajeTostada(error.message);
        setTostadaKey("ListarAlimentos" + Date.now());
      });
  };


  const filtradoUltimo = () =>{
   
   let filtro = document.querySelector("#slcFiltroFechas").value
   const today = new Date();
   const sevenDaysAgo = new Date(today);
   const thirtyDaysAgo = new Date(today);
   
   switch (filtro) {
    case "mes":
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const filtroMes = arrayRegistros.filter(
        (registro) => new Date(registro.fecha) >= thirtyDaysAgo
      );
      setArrayFiltradoFecha(filtroMes);
      break;
    case "semana":
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const filtroSemana = arrayRegistros.filter(
        (registro) => new Date(registro.fecha) >= sevenDaysAgo
      );
      setArrayFiltradoFecha(filtroSemana);
      break;
    default:setArrayFiltradoFecha(arrayRegistros);
      break;
   }
  }




  return (
    <>
      <Tostadora
        titulo="LISTADO DE ALIMENTOS" 
        mensaje={mensajeTostada}
        tostKey={tostadaKey}
        id={"tostadoraIngresoAlimento"}
      />

      <div className="container pt-3">
        <div className="row text-center">
          <h2>Registros ingresados por el usuario</h2>
        </div>
        <div className="row justify-content-start col-2 pt-4"> 
        <select name="" id="slcFiltroFechas" onChange={filtradoUltimo}>
            <option value="todos" defaultValue>Todos</option>
            <option value="mes">Ultimo Mes</option>
            <option value="semana">Ultima Semana</option>
          </select>
        </div>
        <div className="row " id="inicioTabla">
          <table border="1" id="tRegistros" className="table table-light table-striped text-center">
            <thead id="tRegistrosBody">
              <tr>
                <th></th>
                <th>Alimento</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { (arrayFiltradoFecha) ? 
              <>
                { arrayFiltradoFecha.map((unR) => (
                  <tr key={unR.id}>
                    { (comidasDelEstado.length > 0) ? 
                      <>
                        <td>
                          <img src={urlImagenes + comidasDelEstado.find( comida => comida.id === unR.idAlimento).imagen + ".png"} alt="Img alimento" /> 
                        </td>
                        <td>{ comidasDelEstado.find( comida => comida.id === unR.idAlimento).nombre }</td>
                      </>
                    : 
                    <>
                      <td></td>
                      <td></td>
                    </>
                    }
                    <td>{unR.cantidad}</td>
                    <td>{unR.fecha}</td>
                    <td>
                      <BorrarRegistrosComidas idComida={unR.id} />
                    </td>
                  </tr>
                ))}
              </>
              :
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      
      
    </>
  );
};

export default ListarRegistrosComidas;
