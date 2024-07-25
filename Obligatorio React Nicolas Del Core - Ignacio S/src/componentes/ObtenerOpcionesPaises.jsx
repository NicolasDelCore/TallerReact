import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guardarPaises } from "../slices/paisesSlice";

const ObtenerOpcionesPaises = () => {

    const urlBase = useSelector(state => state.urlBase.url );
    //console.log(urlBase)
    //const [paisesObtenidos, setPaises] = useState([]);
    const dispatch = useDispatch();
    const paisesDelEstado = useSelector(state => state.paises.paises);
    
    useEffect( () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
		fetch(`${urlBase}/paises.php`, requestOptions)
            .then(response => response.json())
            .then(rjson => {
                //console.log(rjson);
                //setPaises(rjson.paises);
                dispatch(guardarPaises(rjson.paises));
		})
        .catch(error => {
                console.log("ListarPaises error: " + error);
                //Acá podríamos mandar una tostada para avisar que hubo un problema con los países y loguear a un txt o algo
            }        
        );
	}, [urlBase, dispatch]);
    
    return (
        <>
            { (paisesDelEstado.length > 0) ?
                paisesDelEstado.map(p => <option value={p.id} key={p.id}>{p.name}</option>)
                : <></>
            }
        </>
    )
}

export default ObtenerOpcionesPaises