import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guardarComidas } from "../slices/comidasSlice";

const ObtenerOpcionesComidas = () => {

    const urlBase = useSelector(state => state.urlBase.url );
    const dispatch = useDispatch();
    const comidasDelEstado = useSelector(state => state.comidas.comidas);

    //Chequear user logueado
    
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
        
		fetch(`${urlBase}/alimentos.php`, requestOptions)
            .then(response => response.json())
            .then(rjson => {
                //console.log(rjson);
                dispatch(guardarComidas(rjson.alimentos));
		})
        .catch(error => {
                console.log("ListarComidas error: " + error);
            }
        );
	}, [urlBase, dispatch]);

    return (
        (comidasDelEstado) ?
        <>
            { /*comidasObtenidas.map(c => <option value={c.id} key={"alimento_" + c.id} sufijo={c.porcion[c.porcion.length -1]}>{c.nombre}</option>) */}
            { comidasDelEstado.map(c => <option value={c.id} key={"alimento_" + c.id} sufijo={c.porcion[c.porcion.length -1]}>{c.nombre}</option>) }
            
            {/* comidasObtenidas.map(c => <><option value={c.id} key={c.id}>{c.nombre}</option><span key={"sufijo" + c.id}>{c.porcion[c.porcion.length -1]}</span></> ) */}
        </> : <></>
    )
}

export default ObtenerOpcionesComidas