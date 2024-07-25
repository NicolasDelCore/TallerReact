import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guardarComidasBorradas } from "../slices/comidasBorradasSlice";
import Tostadora from "./Tostadora";

const BorrarRegistrosComidas = ({idComida}) => {

    const dispatch = useDispatch();
    const urlBase = useSelector((state) => state.urlBase.url);
    
    //Manejo de tostadas
    const [mensajeTostada, setMensajeTostada] = useState(""); // Mensaje de la tostada
    const [tostadaKey, setTostadaKey] = useState(""); // Key de la tostada
  
    //Remover registros
    const removerRegistro = (idComida) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("apikey", localStorage.getItem("apiKey"));
      myHeaders.append("iduser", localStorage.getItem("id"));
  
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };
  
      fetch(`${urlBase}/registros.php?idRegistro=${idComida}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.codigo === 200) {
            //comidasRegistradasPorUsuario(); // llamar al fetch de nuevo
            dispatch(guardarComidasBorradas(result));
          } else {
            throw new Error(
              "Error inesperado. Vuelva a loguearse y reintente en un rato."
            );
          }
        })
        .catch((error) => {
          //console.log("ListarRegistrosComidas error: ", error);
          console.log(error.message);
          setMensajeTostada(error.message);
          setTostadaKey("BorrarAlimentos" + Date.now());
        });
    };
  
  return (
    <>
      <Tostadora
            titulo="BORRADO DE ALIMENTOS"
            mensaje={mensajeTostada}
            tostKey={tostadaKey}
            id={"tostadoraBorradoDeAlimentos"}
      />

      <input
        type="button"
        className="btn btn-outline-dark"
        value="Borrar Registro"
        id={"borrarComida" + idComida}
        onClick={() => removerRegistro(idComida)}
      />    
    </>
  )
}

export default BorrarRegistrosComidas