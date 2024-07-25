import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guardarUsuariosPorPais } from "../slices/usuariosPorPaisSlice";

const UsuariosPorPais = () => {

    const urlBase = useSelector(state => state.urlBase.url );
    const dispatch = useDispatch();
    
    //FETCH    
    useEffect( () => {
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", localStorage.getItem('apiKey'));
        myHeaders.append("iduser", localStorage.getItem('id'));
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
		fetch(`${urlBase}/usuariosPorPais.php`, requestOptions)
            .then(response => response.json())
            .then(rjson => {
                //console.log(rjson);
                
                //FILTRAME ACÁ

                dispatch(guardarUsuariosPorPais(rjson.paises));
		})
        .catch(error => {
                console.log("ListarComidas error: " + error);
            }
        );
	}, [urlBase, dispatch]);

  return (
    <>
    </>
  )
}

export default UsuariosPorPais